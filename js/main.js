const USERNAME = "prashnaraa-byte";

// Fallback projects in case projects-data.js isn't loaded or has a typo
const FALLBACK_PROJECTS = [
  {
    id: "wearcast",
    title: "WearCast — Automated Outfit & Weather Notifier",
    subtitle: "Weather-driven daily outfit recommendations pushed to Telegram",
    category: "python",
    badgeClass: "badge-blue",
    icon: "☁️",
    role: "Team Member 3 · 4-Person Team",
    repoUrl: "https://github.com/prashnaraa-byte",
    liveUrl: "",
    summaryBullets: [
      "Built the Telegram notification module linking weather API forecasts to AI outfit suggestions.",
      "Formatted structured group alert messages with temperature, precipitation, and styling tips."
    ],
    architectureBullets: [
      "Notification Pipeline: Consumes weather forecasts and outfit outputs to dispatch Telegram alerts.",
      "Modular Python design with environment-based configuration."
    ],
    tags: ["Python", "Telegram API", "Weather API", "Automation"],
    screens: []
  },
  {
    id: "yolo-autolabel",
    title: "YOLO Face-Detection & Webcam Auto-Labeler",
    subtitle: "Real-time custom face detection paired with automated dataset annotation",
    category: "ai",
    badgeClass: "badge-rose",
    icon: "🎯",
    role: "Solo Developer",
    repoUrl: "https://github.com/prashnaraa-byte",
    liveUrl: "",
    summaryBullets: [
      "Trained a custom Ultralytics YOLO face-detection model for real-time webcam inference.",
      "Built a web workflow to capture live frames and generate bounding-box labels."
    ],
    architectureBullets: [
      "Inference Engine: Runs custom YOLO weights on webcam streams.",
      "Auto-Labeling Flow: Exports bounding boxes for dataset expansion."
    ],
    tags: ["Python", "Ultralytics YOLO", "Computer Vision", "Web App"],
    screens: []
  },
  {
    id: "cyworld-homepage",
    title: "Cyworld-Inspired Interactive Mini-Homepage",
    subtitle: "Retro social mini-homepage built with Next.js & Python",
    category: "web",
    badgeClass: "badge-emerald",
    icon: "🏠",
    role: "Solo Developer",
    repoUrl: "https://github.com/prashnaraa-byte",
    liveUrl: "",
    summaryBullets: [
      "Built an interactive retro mini-homepage interface using Next.js.",
      "Connected dynamic profile and guestbook endpoints to a Python backend."
    ],
    architectureBullets: [
      "Frontend: Next.js tabbed UI and mini-room layout.",
      "Backend: Python API handling profile state and entries."
    ],
    tags: ["Next.js", "Python", "Full-Stack", "UI/UX"],
    screens: []
  },
  {
    id: "cli-minigames",
    title: "CLI Mini-Games Suite (Tic-Tac-Toe & Hangman)",
    subtitle: "Terminal mini-games with Pytest unit tests",
    category: "python",
    badgeClass: "badge-amber",
    icon: "🎮",
    role: "Team Contributor",
    repoUrl: "https://github.com/hwangjh0220/minigame_poject",
    liveUrl: "",
    summaryBullets: [
      "Built custom terminal Tic-Tac-Toe and Hangman modules in Python.",
      "Added Pytest unit tests and contributed via Git feature branches and PRs."
    ],
    architectureBullets: [
      "Game Logic: Clean board state and win/draw checks.",
      "Testing: Automated test cases with Pytest."
    ],
    tags: ["Python", "Pytest", "CLI", "Git"],
    screens: []
  }
];

function getProjectsList() {
  if (typeof FEATURED_PROJECTS !== "undefined" && Array.isArray(FEATURED_PROJECTS) && FEATURED_PROJECTS.length > 0) {
    return FEATURED_PROJECTS;
  }
  return FALLBACK_PROJECTS;
}

// Theme toggle
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
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

function goToDetail(url) {
  window.location.href = url;
}

function initHomePage() {
  const featuredGrid = document.getElementById("featured-grid");
  if (!featuredGrid) return;

  const projects = getProjectsList();

  function renderFeatured(filter = "all") {
    const filtered = projects.filter((p) => filter === "all" || p.category === filter);

    featuredGrid.innerHTML = filtered
      .map(
        (p) => `
        <article class="card" onclick="goToDetail('./project.html?id=${encodeURIComponent(p.id)}')">
          <div class="card-top-row">
            <div class="icon-badge ${p.badgeClass || "badge-blue"}">${p.icon || "⚡"}</div>
            <div class="circle-actions" onclick="event.stopPropagation()">
              <a href="./project.html?id=${encodeURIComponent(p.id)}" class="circle-btn" title="Project Details">→</a>
              <a href="${p.repoUrl}" target="_blank" rel="noreferrer" class="circle-btn" title="GitHub Repository">⌘</a>
            </div>
          </div>

          <div>
            <h3 class="card-title">${p.title}</h3>
            <p class="card-subtitle">${p.subtitle}</p>
          </div>

          <div class="role-badge">👤 ${p.role}</div>

          <ul class="card-bullets">
            ${(p.summaryBullets || []).map((b) => `<li>${b}</li>`).join("")}
          </ul>

          <div class="tags">
            ${(p.tags || []).map((t) => `<span>${t}</span>`).join("")}
          </div>
        </article>
      `
      )
      .join("");
  }

  renderFeatured("all");

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderFeatured(btn.dataset.filter);
    });
  });

  loadAllRepos();
}

async function loadAllRepos() {
  const repoGrid = document.getElementById("repo-grid");
  const repoCount = document.getElementById("repo-count");
  if (!repoGrid) return;

  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const repos = await res.json();
    const list = repos.filter((r) => r.name.toLowerCase() !== `${USERNAME}.github.io`);

    if (repoCount) {
      repoCount.textContent = `${list.length} public repositories`;
    }

    if (list.length === 0) {
      repoGrid.innerHTML = `<p class="card-subtitle">No public repositories found on GitHub yet.</p>`;
      return;
    }

    repoGrid.innerHTML = list
      .map((repo) => {
        const updated = new Date(repo.updated_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const desc = repo.description || "Click to inspect repository details and source code.";
        const detailUrl = `./project.html?repo=${encodeURIComponent(repo.name)}`;

        return `
          <article class="card" onclick="goToDetail('${detailUrl}')">
            <div class="card-top-row">
              <div class="icon-badge badge-blue">📁</div>
              <div class="circle-actions" onclick="event.stopPropagation()">
                <a href="${detailUrl}" class="circle-btn" title="Project Details">→</a>
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
  } catch (err) {
    if (repoCount) {
      repoCount.textContent = `View on github.com/${USERNAME}`;
    }
    repoGrid.innerHTML = `<p class="card-subtitle">Could not fetch GitHub API automatically (${err.message}). Visit <a href="https://github.com/${USERNAME}" target="_blank" rel="noreferrer">github.com/${USERNAME}</a>.</p>`;
  }
}

async function initDetailPage() {
  const root = document.getElementById("detail-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const repoName = params.get("repo");
  const projects = getProjectsList();

  if (projectId) {
    const project = projects.find((p) => p.id === projectId) || projects[0];
    document.title = `${project.title} | Portfolio`;
    const topLink = document.getElementById("repo-top-link");
    if (topLink) topLink.href = project.repoUrl;

    const screensHtml =
      project.screens && project.screens.length > 0
        ? project.screens
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
          .join("")
        : `<div class="screen-card"><div class="screen-placeholder">Add screenshots in assets/images/ and link them in js/projects-data.js to show verified screens here.</div></div>`;

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
          </div>
        </div>

        <h3 style="margin-bottom: 12px; font-size: 1.05rem;">Implementation &amp; Architecture</h3>
        <ul class="card-bullets">
          ${(project.architectureBullets || project.summaryBullets || []).map((b) => `<li>${b}</li>`).join("")}
        </ul>

        <div class="tags" style="margin-top: 18px;">
          ${(project.tags || []).map((t) => `<span>${t}</span>`).join("")}
        </div>
      </section>

      <section class="detail-box">
        <h2 style="font-size: 1.2rem; margin-bottom: 6px;">Verified Screens &amp; Output</h2>
        <p class="card-subtitle">Captured test runs, dashboards, and live execution proof.</p>
        <div class="verified-grid">${screensHtml}</div>
      </section>
    `;
    return;
  }

  if (repoName) {
    root.innerHTML = `<div class="detail-box"><p class="card-subtitle">Loading ${repoName} from GitHub...</p></div>`;
    try {
      const res = await fetch(`https://api.github.com/repos/${USERNAME}/${encodeURIComponent(repoName)}`);
      if (!res.ok) throw new Error("Repository not found");
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
            </div>
          </div>

          <ul class="card-bullets">
            <li><strong>Primary Language:</strong> ${repo.language || "Not specified"}</li>
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
  } else {
    root.innerHTML = `<div class="detail-box"><p>No project selected. <a href="./index.html">Return to Portfolio</a></p></div>`;
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