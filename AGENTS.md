# AGENTS.md - PROJECT ARCHITECTURE & COMPREHENSIVE AGENT RULES

> **Project**: Dieu Bi Mat Epic - Vietnamese Poetic Floral Heritage Web Experience.
> **Architecture**: 100% Client-Side Static Web (Offline-ready, GitHub Pages).
> **Mandatory**: All agents must read this file before writing code to preserve tokens.

---

## 1. 3-DEV CONCURRENT TEAM COORDINATION & GIT AUTO-SYNC
- **Pre-Task (Before Coding)**: Run `git fetch --all --prune` across all branches.
  If teammates pushed new commits, cleanly merge/rebase and resolve 100% of conflicts.
- **Safe Branching**: When building new features or avoiding collisions, create a new `feat/<name>` branch.
- **Post-Task (After Coding)**: Run `git fetch origin` to catch concurrent commits from teammates.
  Harmonize cleanly, ensure zero syntax or layout regressions, commit, and push stable state.
- **Silent & Token-Efficient**: Execute all Git routines silently in the background.
  Keep responses ultra-concise; never output verbose Git command logs.

---

## 2. CORE ARCHITECTURAL INVARIANTS
1. **Strictly Pure Static Web**: HTML5, Vanilla CSS3, Modern ES6+ JS, Web Audio API, Canvas 2D only.
2. **Zero External Runtime**: No Node.js/npm runtime, no bundlers (Vite/Webpack), no frameworks (React/Vue).
   Zero network API requests (`fetch`/`XHR`). Fully functional offline on GitHub Pages.
3. **Clean Workspace Root**: Only core assets allowed (`index.html`, `css/`, `js/`, `img/`, `audio/`, `tasks/`).
   Never commit scratch scripts or temp files. Reference assets (`20-10.html`) must remain gitignored.

---

## 3. FILE DIRECTORY & RESPONSIBILITY MAP

### A. Markup Layer
- `index.html`: Semantic DOM skeleton, stylesheet/script load orders, layered interactive containers.

### B. Styling Layer (`css/` - 3 Logical Files)
- `css/base.css`: Heritage design tokens, CSS reset, typography rules, shared utilities.
- `css/layout.css`: Spatial layouts, 4-phase diurnal sky, canvas `#wrap`, Áo Dài silhouette, responsive viewports.
- `css/components.css`: Interactive UI widgets (Wax Seal, Orrery, Minigames, Postcard, Letter, Mascot, Guide).

### C. Logic Layer (`js/` - 19 Autonomous Modules)
- `js/flowers-data.js`: Dedicated database of 27 heritage flower profiles, matching rules, and accessors.
- `js/content.js`: Static datasets: 8 secret letters (`secretLettersDeck`), 23 colleague wishes, markdown text.
- `js/audio-vfx.js`: Web Audio API synthesizer (wind chimes, clicks, wax drops), BGM manager, audio ducking, triggers.
- `js/environment.js`: Diurnal cycle (Dawn, Day, Dusk, Night), celestial particles, 3D falling petals/leaves, WeatherFX.
- `js/orientation-guard.js`: Bi-directional orientation manager (`setPreferredOrientation('landscape' | 'portrait')`): Dynamic adaptation for Stage 0 atelier / Story 9:16 / Quiz (portrait) vs Stage 1-4 garden (landscape), bypass button fallback (`#rotate-bypass-btn`), zero 20/10 spoilers, and Safari audio unlock delay mitigation.
- `js/wax-seal-ceremony.js`: Time-lock gate, marble wax melting, brass seal stamping, garden awakening (Stage 0).
- `js/atmosphere-shifter.js`: Living Weather HUD (rain dewdrops, morning sunbeams, terrarium touch interaction).
- `js/botanical-harp.js`: 5-string botanical harp, glissando swipe gestures, floating luminous musical notes.
- `js/celestial-orrery.js`: 360° seasonal celestial compass wheel and collapsible Lodestar star button.
- `js/garden-minigames.js`: Simon Melody (Chuông Hoa) bilateral acoustic game (2 left / 2 right thumb zones, central corridor >= 280px), Constellation Linker with 4 exclusion zones, and automatic graceful skip fallbacks (5 fails or 40s timer).
- `js/garden-stages.js`: Tree growth lifecycle (Stages 0-4), stage cleanup manager (`cleanupStage`).
- `js/mascot-companion.js`: Paper cutout puppet, rustic folk dialogues, eye-blink loop, animated expressions.
- `js/secret-letter.js`: Typewriter letter engine, 3D flip Polaroid card, cursive/legible font toggle, 3D flower quiz (48px touch targets, portrait-friendly layout).
- `js/boarding-pass-modal.js`: Vietnamese Heritage Postcard modal (flower personality, photo stamp, wax seal, horizontal sticky pill actions bar, portrait orientation hook).
- `js/boarding-pass-canvas.js`: High-res 1080x1920 Retina Canvas 2D exporter for downloadable Story cards.
- `js/love.js`: Procedural heart-blooming tree canvas engine (virtual coordinate space 1100x680).
- `js/experience-guide.js`: Guided journey walkthrough and multi-step onboarding modal with bounded 92dvh flexbox viewport and independent touch scrolling.
- `js/realtime-guide.js`: Dynamic real-time guidance HUD, decoupled top-row horizon layout, 4s auto-dismiss hint bubble, state-driven quest tracking.
- `js/main.js`: Master orchestrator, autoscale engine (`resizeWrap`), asynchronous stage lifecycle pipeline.

---

## 4. LIFECYCLE STAGES & STATE COORDINATION
1. **5-Stage Progression Pipeline**:
   - `Stage 0 (Awakening)`: Name input, wax melting & stamping in `wax-seal-ceremony.js` (adaptive 2-column atelier on landscape, portrait-first on vertical mobile) to awaken garden.
   - `Stage 1 (Sprout & Clover)`: Sprout & four-leaf clover emerge in `garden-stages.js`; water & sunbathe.
   - `Stage 2 (Simon Melody - Chuông Hoa)`: `garden-minigames.js` activates acoustic memory sequence on bilateral thumb zones (left 16%/24%, right 76%/84%) leaving a 572px central corridor for sprout growth; `#simon-skip-btn` fallback after 5 fails or 40s.
   - `Stage 3 (Constellation Linker)`: Connect 5 real stars avoiding 4 exclusion zones (top HUD, central tree, mascot, bottom chimes); catch radius >= 48px; `#constellation-skip-btn` fallback after 5 fails or 40s.
   - `Stage 4 (Full Blossom & Áo Dài)`: Heart tree blooms (`love.js`), Áo Dài appears, reveals keepsake polaroid, 9:16 postcard & secret letter.
2. **Global State Architecture**:
   - Synchronized via `window.gardenState` (`currentStage`, `isWatered`, `isFertilized`, `userName`, etc.).
   - Inter-module communication via window APIs (`window.showMascotSpeech`, `window.cleanupStage`, `window.setPreferredOrientation`).
3. **Clean Unmount Invariant**: Every stage transition must call `cleanupStage` to cancel listeners, timers, frames, and clean up temporary DOM elements.

---

## 5. DESIGN SYSTEM & RESPONSIVE STANDARDS
1. **Vietnamese Poetic Heritage Design Tokens**:
   - Palette: Dó Paper Ivory (`#FAF7F0`), Lotus Pink (`#D47A88`), Young Rice Green (`#6A8D73`), Rustic Wood (`#4A3728`).
   - Shapes: Folded paper corner radii (10px-14px), soft mist shadows. No harsh 999px pills or neon glows.
   - Typography: UI uses `Outfit`, poetic verses use `Playfair Display` or cursive `Dancing Script`.
2. **Multi-Device Responsive Standards & Zero PC Regression**:
   - Zero horizontal scroll (`scrollWidth <= clientWidth`) across all viewports (320px to 4K).
   - Strict Media Query Scoping: All mobile landscape rules strictly inside `@media (max-height: 540px) and (orientation: landscape)` to guarantee 100% Zero PC Regression on desktop (>= 1025px / height >= 600px).
   - Mobile Portrait Standards: Top-38% tree positioning (`#wrap`), horizontal scrolling sticky pill bars (`.ticket-actions-bar`) saving 108px vertical space, 2-column photobooth grids.
   - Modals & Viewport Constraints: Viewport bounded at `max-height: min(92dvh, ...)` with `flex: 1 1 auto; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch;`, preserving >= 55% scrollable content area on all mobile devices (iPhone SE, iPhone 14/15/16, Samsung Galaxy, Pixel, Sony Xperia 21:9, Foldable 320px).
   - Touch Targets: Minimum 44px/48px tap area meeting WCAG AA and Apple Human Interface Guidelines.
3. **Anti-Spoiler Policy**:
   - Zero exposure of 20/10 occasion text, dates, or full surprise banners prior to Stage 4 blooming. All guidance, overlays, and badges prior to Stage 4 use poetic garden terminology ("Hoa Bí Mật", "Góc Nhìn Toàn Cảnh", "Khu Vườn Kỷ Niệm").

---

## 6. QUALITY GATES & VERIFICATION
1. **JavaScript Validation**: Every modified JS file must pass syntax check: `node -c js/<file.js>`.
2. **CSS Validation**: All CSS files must maintain strictly balanced braces (`{}` count matches across `base.css`, `layout.css`, `components.css`).
3. **Automated Multi-Device Regression**: Run test suites in `scratch/test_phase*.js` ensuring 0 regressions across mobile matrix and desktop.
4. **Git Harmony Rule**: Always fetch all branches (`git fetch --all --prune`), harmonize cleanly with concurrent commits from teammates, ensure zero syntax or layout regressions, commit, and push stable state.
