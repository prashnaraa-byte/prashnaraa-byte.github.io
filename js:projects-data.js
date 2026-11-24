const FEATURED_PROJECTS = [
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
            "Built the Telegram notification module (modules/notifier.py) linking weather API forecasts to AI outfit suggestions.",
            "Formatted structured group alert messages with temperature, precipitation, and daily styling tips.",
            "Designed modular error handling and clean configuration for automated scheduled delivery."
        ],
        architectureBullets: [
            "Notification Pipeline: Consumes parsed weather metrics and LLM outfit outputs to dispatch formatted Telegram alerts.",
            "Environment & Reliability: Uses environment-based bot tokens/chat IDs with retry-safe HTTP requests.",
            "Team Workflow: Integrated via Git feature branches alongside weather-fetching and recommendation modules."
        ],
        tags: ["Python", "Telegram API", "REST API", "Automation"],
        screens: [
            {
                label: "Telegram Alert & Workflow Output",
                caption: "Add a screenshot to assets/images/wearcast-demo.png to display your live bot message here.",
                image: ""
            }
        ]
    },
    {
        id: "yolo-autolabel",
        title: "YOLO Face-Detection & Webcam Auto-Labeler",
        subtitle: "Real-time custom face detection paired with automated dataset annotation",
        category: "ai",
        badgeClass: "badge-rose",
        icon: "🎯",
        role: "Solo Developer · 1인 개발",
        repoUrl: "https://github.com/prashnaraa-byte",
        liveUrl: "",
        summaryBullets: [
            "Trained a custom Ultralytics YOLO face-detection model (prasna.pt) for real-time webcam inference.",
            "Built a web application that captures live frames and automatically generates bounding-box labels.",
            "Eliminated repetitive manual annotation work when expanding custom computer vision datasets."
        ],
        architectureBullets: [
            "Inference Engine: Runs custom YOLO weights over live USB/webcam streams with confidence filtering.",
            "Auto-Labeling Interface: Exports bounding-box coordinates directly in YOLO annotation format.",
            "Web Stack: Lightweight browser UI connected to Python inference endpoints."
        ],
        tags: ["Python", "Ultralytics YOLO", "Computer Vision", "Web App"],
        screens: [
            {
                label: "Live Webcam Detection & Auto-Labeling UI",
                caption: "Add a screenshot to assets/images/yolo-demo.png to showcase bounding-box detection.",
                image: ""
            }
        ]
    },
    {
        id: "cyworld-homepage",
        title: "Cyworld-Inspired Interactive Mini-Homepage",
        subtitle: "Retro Korean social mini-homepage rebuilt with Next.js & Python",
        category: "web",
        badgeClass: "badge-emerald",
        icon: "🏠",
        role: "Solo Developer · 1인 개발",
        repoUrl: "https://github.com/prashnaraa-byte",
        liveUrl: "",
        summaryBullets: [
            "Recreated the classic Cyworld mini-room and guestbook experience with modern interactive UI components.",
            "Built a responsive Next.js frontend backed by a Python API server for profile and post interactions.",
            "Styled custom tabs, status moods, and visitor sections for a nostalgic yet snappy UX."
        ],
        architectureBullets: [
            "Frontend: Next.js component architecture with tabbed navigation and interactive profile widgets.",
            "Backend: Python REST backend handling guestbook entries and dynamic profile state.",
            "UI/UX: Custom retro-modern layout faithful to classic mini-homepage proportions."
        ],
        tags: ["Next.js", "Python", "Full-Stack", "UI/UX"],
        screens: [
            {
                label: "Mini-Homepage Main View",
                caption: "Add a screenshot to assets/images/cyworld-demo.png to show your mini-room interface.",
                image: ""
            }
        ]
    },
    {
        id: "cli-minigames",
        title: "CLI Mini-Games Suite (Tic-Tac-Toe Deluxe & Hangman)",
        subtitle: "Modular terminal games with automated Pytest test suites",
        category: "python",
        badgeClass: "badge-amber",
        icon: "🎮",
        role: "Contributor · Collaborative Repo",
        repoUrl: "https://github.com/hwangjh0220/minigame_poject",
        liveUrl: "",
        summaryBullets: [
            "Engineered a custom-themed CLI Tic-Tac-Toe Deluxe game and Hangman module in Python.",
            "Wrote comprehensive unit tests (tests/test_tictactoe.py) validating win states, draws, and input guards.",
            "Shipped cleanly via feature branches and Pull Requests in a collaborative repository."
        ],
        architectureBullets: [
            "Game Logic: Decoupled board state evaluation from terminal rendering for deterministic unit testing.",
            "Quality Assurance: Automated Pytest test suite covering edge-case moves and board resets.",
            "Git Collaboration: Structured feature/tictactoe branch workflow with code review."
        ],
        tags: ["Python", "Pytest", "CLI", "Git PRs"],
        screens: [
            {
                label: "Terminal Gameplay & Pytest Output",
                caption: "Add a screenshot to assets/images/minigame-demo.png to display terminal gameplay.",
                image: ""
            }
        ]
    }
];