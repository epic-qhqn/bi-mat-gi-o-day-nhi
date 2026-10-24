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

### C. Logic Layer (`js/` - 17 Autonomous Modules)
- `js/content.js`: Static datasets: 8 secret letters (`secretLettersDeck`), 12 heritage flower personality profiles.
- `js/audio-vfx.js`: Web Audio API synthesizer (wind chimes, clicks, wax drops), BGM manager, audio ducking, triggers.
- `js/environment.js`: Diurnal cycle (Dawn, Day, Dusk, Night), celestial particles, 3D falling petals/leaves, WeatherFX.
- `js/wax-seal-ceremony.js`: Time-lock gate, marble wax melting, brass seal stamping, garden awakening (Stage 0).
- `js/atmosphere-shifter.js`: Living Weather HUD (rain dewdrops, morning sunbeams, terrarium touch interaction).
- `js/botanical-harp.js`: 5-string botanical harp, glissando swipe gestures, floating luminous musical notes.
- `js/celestial-orrery.js`: 360° seasonal celestial compass wheel and collapsible Lodestar star button.
- `js/garden-minigames.js`: Simon Melody (Love Tune) acoustic game and Constellation Linker with decoy stars.
- `js/garden-stages.js`: Tree growth lifecycle (Stages 0-4), stage cleanup manager (`cleanupStage`).
- `js/mascot-companion.js`: Paper cutout puppet, rustic folk dialogues, eye-blink loop, animated expressions.
- `js/secret-letter.js`: Typewriter letter engine, 3D flip Polaroid card, cursive/legible font toggle, 3D flower quiz.
- `js/boarding-pass-modal.js`: Vietnamese Heritage Postcard modal (flower personality, photo stamp, wax seal).
- `js/boarding-pass-canvas.js`: High-res 1080x1920 Retina Canvas 2D exporter for downloadable Story cards.
- `js/love.js`: Procedural heart-blooming tree canvas engine (virtual coordinate space 1100x680).
- `js/experience-guide.js`: Guided journey walkthrough and multi-step onboarding modals.
- `js/realtime-guide.js`: Dynamic real-time guidance HUD, animated spotlight reticle, state-driven quest tracking.
- `js/main.js`: Master orchestrator, autoscale engine (`resizeWrap`), asynchronous stage lifecycle pipeline.

---

## 4. LIFECYCLE STAGES & STATE COORDINATION
1. **5-Stage Progression Pipeline**:
   - `Stage 0 (Awakening)`: Name input, wax melting & stamping in `wax-seal-ceremony.js` to awaken garden.
   - `Stage 1 (Sprout & Clover)`: Sprout & four-leaf clover emerge in `garden-stages.js`; water & sunbathe.
   - `Stage 2 (Simon Melody)`: `garden-minigames.js` activates acoustic memory sequence on safe arc.
   - `Stage 3 (Constellation Linker)`: Connect 5 real stars and 2 decoys via Poisson-disk sampling.
   - `Stage 4 (Full Blossom & Áo Dài)`: Heart tree blooms (`love.js`), Áo Dài appears, reveals postcard & letter.
2. **Global State Architecture**:
   - Synchronized via `window.gardenState` (`currentStage`, `isWatered`, `isFertilized`, `userName`, etc.).
   - Inter-module communication via window APIs (`window.showMascotSpeech`, `window.cleanupStage`).
3. **Clean Unmount Invariant**: Every stage transition must call `cleanupStage` to cancel listeners, frames, and DOM elements.

---

## 5. DESIGN SYSTEM & RESPONSIVE STANDARDS
1. **Vietnamese Poetic Heritage Design Tokens**:
   - Palette: Dó Paper Ivory (`#FAF7F0`), Lotus Pink (`#D47A88`), Young Rice Green (`#6A8D73`), Rustic Wood (`#4A3728`).
   - Shapes: Folded paper corner radii (10px-14px), soft mist shadows. No harsh 999px pills or neon glows.
   - Typography: UI uses `Outfit`, poetic verses use `Playfair Display` or cursive `Dancing Script`.
2. **Multi-Device Responsive Standards**:
   - Zero horizontal scroll (`scrollWidth <= clientWidth`) on all viewports (320px to 4K).
   - Autoscale (`resizeWrap`): Desktop fits viewport height; Mobile Portrait fits width (tree at top 38%).
   - Touch Targets: Minimum 44px tap area meeting WCAG and Apple HIG requirements.

---

## 6. QUALITY GATES & VERIFICATION
1. **JavaScript Validation**: Every modified JS file must pass syntax check: `node -c js/<file.js>`.
2. **CSS Validation**: All CSS files must maintain strictly balanced braces (`{}` count matches).
3. **Integrity Rule**: Never leave conflict markers, broken layouts, or syntax errors.
