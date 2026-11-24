const USERNAME = "prashnaraa-byte";

// 1. Dark / Light Theme Toggle (persists across pages)
const savedTheme = localStorage.getItem("portfolio-theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("portfolio-theme", next);
    });
}

// 2. Render Homepage (index.html)
function initHomePage() {
    const featuredGrid = document.getElementById("featured-grid");
    if (!featuredGrid) return;

    function renderFeatured(filter = "all") {
        const filtered = FEATURED_PROJECTS.filter(
            (p) => filter === "all" || p.category === filter
        );

        featuredGrid.innerHTML = filtered
            .map(
                (p) => `
        <article class="card" onclick="window.location.href='./project.html?id=${p.id}'">
          <div class="card-top-row">
            <div class="icon-badge ${p.badgeClass}">${p.icon}</div>
            <div class="circle-actions" onclick="event.stopPropagation()">
              <a href="./project.html?id=${p.id}" class="circle-btn" title="Project Details">→</a>
              <a href="${p.repoUrl}" target="_blank" rel="noreferrer" class="circle-btn" title="GitHub Repository">⌘</a>
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer" class="circle-btn" title="Live Demo">🌐</a>` : ""}
            </div>
          </div>

          <div>
            <h3 class="card-title">${p.title}</h3>
            <p class="card-subtitle">${p.subtitle}</p>
          </div>

          <div class="role-badge">👤 ${p.role}</div>

          <ul class="card-bullets">
            ${p.summaryBullets.map((b) => `<li>${b}</li>`).join("")}
          </ul>

          <div class="tags">
            ${p.tags.map((t) => `<span>${t}</span>`).join("")}
          </div>
        </article>
      `
            )
            .join("");
    }

    renderFeatured();

    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            renderFeatured(btn.dataset.filter);
        });
    });

    // Load all public GitHub repositories
    loadAllRepos();
}

async function loadAllRepos() {
    const repoGrid = document.getElementById("repo-grid");
    const repoCount = document.getElementById("repo-count");
    if (!repoGrid) return;

    try {
        const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`);
        if (!res.ok) throw new Error("GitHub API error");
        const repos = await res.json();
        const list = repos.filter((r) => r.name.toLowerCase() !== `${USERNAME}.github.io`);

        repoCount.textContent = `${list.length} public repositories`;

        repoGrid.innerHTML = list
            .map((repo) => {
                const updated = new Date(repo.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });
                const desc = repo.description || "Click to view repository details, README, and source link.";
                return `
          <article class="card" onclick="window.location.href='./project.html?repo=${encodeURIComponent(repo.name)}'">
            <div class="card-top-row">
              <div class="icon-badge badge-blue">📁</div>
              <div class="circle-actions" onclick="event.stopPropagation()">
                <a href="./project.html?repo=${encodeURIComponent(repo.name)}" class="circle-btn" title="Details">→</a>
                <a href="${repo.html_url}" target="_blank" rel="noreferrer" class="circle-btn" title="Source Code">⌘</a>
              </div>
            </div>
            <div>
              <h3 class="card-title">${repo.name}</h3>
              <p class="card-subtitle">Updated ${updated}</p>
            </div>
            <p style="font-size: 0.9rem; opacity: 0.9;">${desc}</p>
            <div class="tags">
              ${repo.language ? `<span>${repo.language}</span>` : ""}
              ${(repo.topics || []).slice(0, 3).map((t) => `<span>${t}</span>`).join("")}
            </div>
          </article>
        `;
            })
            .join("");
    } catch (e) {
        repoCount.textContent = "Unable to sync right now";
    }
}

// 3. Render Project Detail Page (project.html)
async function initDetailPage() {
    const root = document.getElementById("detail-root");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");
    const repoName = params.get("repo");

    // Case A: Featured project from projects-data.js
    if (projectId) {
        const project = FEATURED_PROJECTS.find((p) => p.id === projectId) || FEATURED_PROJECTS[0];
        document.title = `${project.title} | Portfolio`;
        const topLink = document.getElementById("repo-top-link");
        if (topLink) topLink.href = project.repoUrl;

        root.innerHTML = `
      <section class="detail-box">
        <div class="detail-header">
          <div>
            <div class="role-badge" style="margin-bottom: 10px;">👤 ${project.role}</div>
            <h1>${project.title}</h1>
            <p class="card-subtitle">${project.subtitle}</p>
          </div>
          <div class="hero-links">
            <a href="${project.repoUrl}" target="_blank" rel="noreferrer" class="btn-primary">View on GitHub ↗</a>
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noreferrer" class="btn-secondary">Live Demo ↗</a>` : ""}
          </div>
        </div>

        <h3 style="margin-bottom: 12px; font-size: 1.05rem;">Implementation &amp; Architecture</h3>
        <ul class="card-bullets">
          ${project.architectureBullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>

        <div class="tags" style="margin-top: 18px;">
          ${project.tags.map((t) => `<span>${t}</span>`).join("")}
        </div>
      </section>

      <section class="detail-box">
        <h2 style="font-size: 1.2rem; margin-bottom: 6px;">Verified Screens &amp; Output</h2>
        <p class="card-subtitle">Captured test runs, dashboards, and live execution proof.</p>
        <div class="verified-grid">
          ${project.screens
                .map(
                    (s) => `
            <div class="screen-card">
              <div class="screen-bar">
                <span>${s.label}</span>
                ${s.image ? `<button class="zoom-btn" onclick="openLightbox('${s.image}')">Full Screen</button>` : ""}
              </div>
              ${s.image
                            ? `<img src="${s.image}" alt="${s.label}" />`
                            : `<div class="screen-placeholder">${s.caption}</div>`
                        }
            </div>
          `
                )
                .join("")}
        </div>
      </section>
    `;
        return;
    }

    // Case B: Any GitHub Repository clicked from "All GitHub Repositories"
    if (repoName) {
        root.innerHTML = `<div class="detail-box"><p class="card-subtitle">Loading ${repoName} from GitHub...</p></div>`;
        try {
            const res = await fetch(`https://api.github.com/repos/${USERNAME}/${encodeURIComponent(repoName)}`);
            if (!res.ok) throw new Error("Repo not found");
            const repo = await res.json();

            document.title = `${repo.name} | Portfolio`;
            const topLink = document.getElementById("repo-top-link");
            if (topLink) topLink.href = repo.html_url;

            root.innerHTML = `
        <section class="detail-box">
          <div class="detail-header">
            <div>
              <div class="role-badge" style="margin-bottom: 10px;">📁 GitHub Repository</div>
              <h1>${repo.name}</h1>
              <p class="card-subtitle">${repo.description || "Repository hosted on GitHub."}</p>
            </div>
            <div class="hero-links">
              <a href="${repo.html_url}" target="_blank" rel="noreferrer" class="btn-primary">Open Repository ↗</a>
              ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noreferrer" class="btn-secondary">Live Deployment ↗</a>` : ""}
            </div>
          </div>

          <ul class="card-bullets">
            <li><strong>Primary Language:</strong> ${repo.language || "Multiple / Not specified"}</li>
            <li><strong>Default Branch:</strong> ${repo.default_branch}</li>
            <li><strong>Last Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</li>
          </ul>

          <div class="tags" style="margin-top: 18px;">
            ${repo.language ? `<span>${repo.language}</span>` : ""}
            ${(repo.topics || []).map((t) => `<span>${t}</span>`).join("")}
          </div>
        </section>
      `;
        } catch (e) {
            root.innerHTML = `<div class="detail-box"><p>Could not load repository details. <a href="./index.html">Return to Portfolio</a></p></div>`;
        }
    }
}

function openLightbox(src) {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    if (lb && img) {
        img.src = src;
        lb.classList.add("open");
    }
}

initHomePage();
initDetailPage();