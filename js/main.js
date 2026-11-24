< !DOCTYPE html >
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Prashna Singh | Developer Portfolio</title>
            <link rel="stylesheet" href="./css/style.css" />
        </head>
        <body>
            <header class="topbar">
                <div class="container topbar-inner">
                    <a href="./index.html" class="brand">{PRASHNA}</a>
                    <nav class="nav">
                        <a href="#featured">Featured</a>
                        <a href="#all-repos">All Repositories</a>
                        <a href="#about">About</a>
                        <a href="https://github.com/prashnaraa-byte" target="_blank" rel="noreferrer">GitHub ↗</a>
                    </nav>
                </div>
            </header>

            <main class="container">
                <!-- Featured Projects Section -->
                <section id="featured" class="section">
                    <div class="section-header">
                        <h1>Featured Projects</h1>
                        <div class="filter-bar">
                            <button class="filter-btn active" data-filter="all">All</button>
                            <button class="filter-btn" data-filter="python">Python</button>
                            <button class="filter-btn" data-filter="web">Web / AI</button>
                        </div>
                    </div>

                    <div class="grid">
                        <article class="card" data-category="python">
                            <div class="card-top">
                                <h2>WearCast (Autofit Team Project)</h2>
                                <a href="https://github.com/prashnaraa-byte" target="_blank" rel="noreferrer" class="card-link">GitHub ↗</a>
                            </div>
                            <p class="meta">Team Project · Notification &amp; Automation Module</p>
                            <ul class="card-bullets">
                                <li>Built the Telegram notification pipeline connecting real-time weather API data with AI outfit recommendations.</li>
                                <li>Structured modular Python automation workflows for scheduled group alerts.</li>
                            </ul>
                            <div class="tags">
                                <span>Python</span>
                                <span>Telegram Bot API</span>
                                <span>Weather API</span>
                            </div>
                        </article>

                        <article class="card" data-category="web">
                            <div class="card-top">
                                <h2>YOLO Face-Detection &amp; Auto-Labeler</h2>
                                <a href="https://github.com/prashnaraa-byte" target="_blank" rel="noreferrer" class="card-link">GitHub ↗</a>
                            </div>
                            <p class="meta">Solo Project · Computer Vision &amp; Web App</p>
                            <ul class="card-bullets">
                                <li>Trained a custom Ultralytics YOLO face-detection model integrated with a live webcam feed.</li>
                                <li>Automated bounding-box labeling in a browser interface to streamline dataset creation.</li>
                            </ul>
                            <div class="tags">
                                <span>Python</span>
                                <span>Ultralytics YOLO</span>
                                <span>Computer Vision</span>
                            </div>
                        </article>

                        <article class="card" data-category="web">
                            <div class="card-top">
                                <h2>Cyworld-Inspired Mini-Homepage</h2>
                                <a href="https://github.com/prashnaraa-byte" target="_blank" rel="noreferrer" class="card-link">GitHub ↗</a>
                            </div>
                            <p class="meta">Solo Project · Full-Stack Web App</p>
                            <ul class="card-bullets">
                                <li>Designed an interactive retro mini-homepage interface powered by a Next.js frontend.</li>
                                <li>Connected custom REST endpoints via a Python backend for interactive profile features.</li>
                            </ul>
                            <div class="tags">
                                <span>Next.js</span>
                                <span>Python</span>
                                <span>Full-Stack</span>
                            </div>
                        </article>

                        <article class="card" data-category="python">
                            <div class="card-top">
                                <h2>CLI Mini-Games Suite</h2>
                                <a href="https://github.com/hwangjh0220/minigame_poject" target="_blank" rel="noreferrer" class="card-link">Repo ↗</a>
                            </div>
                            <p class="meta">Collaborative Project · Python CLI &amp; Testing</p>
                            <ul class="card-bullets">
                                <li>Developed a custom terminal Tic-Tac-Toe Deluxe module and Hangman game with unit tests.</li>
                                <li>Collaborated via Git feature branches and Pull Requests with automated test checks.</li>
                            </ul>
                            <div class="tags">
                                <span>Python</span>
                                <span>Pytest</span>
                                <span>Git Workflow</span>
                            </div>
                        </article>
                    </div>
                </section>

                <!-- Automatic GitHub Repositories Section -->
                <section id="all-repos" class="section">
                    <div class="section-header">
                        <h2>All GitHub Repositories</h2>
                        <span id="repo-count" class="meta">Loading repositories from GitHub...</span>
                    </div>
                    <div id="repo-grid" class="grid"></div>
                </section>

                <!-- About Section -->
                <section id="about" class="section about-box">
                    <h2>About</h2>
                    <p>
                        Computer Science &amp; Engineering undergraduate building full-stack web applications,
                        Python automation tools, computer vision pipelines, and microcontroller simulations.
                        Explore all repositories directly at
                        <a href="https://github.com/prashnaraa-byte" target="_blank" rel="noreferrer">github.com/prashnaraa-byte</a>.
                    </p>
                </section>
            </main>

            <script src="./js/main.js"></script>
        </body>
    </html>