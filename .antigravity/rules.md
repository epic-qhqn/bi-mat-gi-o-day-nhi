# PROJECT ARCHITECTURE & AGENT COLLABORATION RULES

> **Project**: Dieu Bi Mat Epic - Interactive Floral Web Experience (Vietnamese Poetic Heritage)
> **Architecture**: 100% Full-Static Modular Web (Client-Side Only, Offline-Ready, GitHub Pages Ready)

---

## 1. CORE ARCHITECTURAL INVARIANTS

1. **Strictly 100% Client-Side Static Web**:
   - Technologies: HTML5 Semantic, Vanilla CSS3, Modern ES6+ JavaScript, Web Audio API, Canvas 2D.
   - Prohibited: Node.js/npm runtime in production, Webpack/Vite/bundlers, frameworks (React/Vue), SSR, DB.
   - Zero external API dependencies: no network `fetch()` or `XMLHttpRequest`. Fully offline functional.
2. **Clean Workspace Root**:
   - Root contains only source assets (`index.html`, `css/`, `js/`, `img/`, `audio/`, `tasks/`, `.antigravity/`).
   - Scratch scripts or test files belong in agent scratchpad and must never clutter the repository.

---

## 2. MODULAR ARCHITECTURE & COMPONENT RESPONSIBILITIES

### A. Markup Layer
- `index.html`: Semantic structure, DOM hierarchy, and sequentially loaded stylesheets and scripts.

### B. Styling Layer (`css/` - 3 Logical Files)
- `css/base.css`: Vietnamese Poetic Heritage tokens, typography defaults, CSS reset, shared utilities.
- `css/layout.css`: Spatial layouts, 4-phase sky system, canvas `#wrap`, Áo Dài figure, bottom dock.
- `css/components.css`: Interactive UI widgets (Wax Seal, Atmosphere, Orrery, Minigames, Postcard, Letter).

### C. Logic Layer (`js/` - 15 Autonomous Modules)
- `js/content.js`: Static markdown letters, 8 secret letters (`secretLettersDeck`), 12 flower profiles.
- `js/audio-vfx.js`: Web Audio API synthesizer (chimes, clicks, wax drops, gears), BGM manager, stoppable voices, and edge-triggered zone sound (`createZoneSoundTrigger`).
- `js/environment.js`: Diurnal cycle (Dawn, Day, Dusk, Night), celestial particles, 3D leaves/petals canvas, dynamic meadow grass bed, and viewport-wide `WeatherFX`.
- `js/wax-seal-ceremony.js`: Time-lock gate, marble wax melting, brass seal stamping, and garden awakening.
- `js/atmosphere-shifter.js`: Living Weather HUD (cloud rain dewdrops, morning sunbeam, terrarium touch).
- `js/botanical-harp.js`: 5-string botanical harp with glissando gestures and floating luminous notes.
- `js/celestial-orrery.js`: 360° celestial seasonal compass wheel & collapsible Lodestar star button.
- `js/garden-minigames.js`: Simon Melody (Love Tune) & Constellation Linker with decoy stars.
- `js/garden-stages.js`: Tree growth lifecycle (Stages 1-4), cleanup manager, and replay stage selector.
- `js/mascot-companion.js`: Cutout puppet, rustic folk dialogues, eye-blink loop, and animated expressions.
- `js/secret-letter.js`: Typewriter letter engine, 3D flipping Polaroid card, handwriting/legible toggle.
- `js/boarding-pass-modal.js`: Vietnamese Heritage Postcard modal (flower personality, photo stamp, wax seal).
- `js/boarding-pass-canvas.js`: High-res 1080x1920 Retina Canvas 2D exporter for downloadable Story cards.
- `js/love.js`: Procedural heart-blooming tree canvas engine running on a virtual 1100x680 coordinate space.
- `js/main.js`: Master orchestrator, autoscale engine (`resizeWrap`), and asynchronous stage lifecycle pipeline.

---

## 3. COMPONENT COORDINATION & DATA PIPELINE

1. **Lifecycle Pipeline**:
   - `Stage 0 (Awakening)`: User inputs name, stamps wax seal in `wax-seal-ceremony.js`, awakening the garden.
   - `Stage 1 (Sprout & Clover)`: Sprout emerges with lucky clover in `garden-stages.js`; user waters/sunbathes.
   - `Stage 2 (Simon Melody)`: `garden-minigames.js` triggers acoustic memory game across safe celestial arc.
   - `Stage 3 (Constellation Linker)`: 5 real stars and 2 decoys are connected via Poisson-disk sampling.
   - `Stage 4 (Full Blossom & Áo Dài)`: `main.js` blooms tree, displays Áo Dài figure, reveals postcard & letter.
2. **State Sharing**:
   - Coordinated via `window.gardenState` (`currentStage`, `isWatered`, `isFertilized`, `userName`).
   - Modules communicate via public window APIs (`window.showMascotSpeech`, `window.cleanupStage`, etc.).
3. **Clean Unmount Policy**:
   - `cleanupStage(stageId)` in `garden-stages.js` must deactivate all tools and minigames before new stages.

---

## 4. VIETNAMESE POETIC HERITAGE DESIGN SYSTEM

1. **Color Tokens**:
   - Dó Paper Ivory (`#FAF7F0`), Lotus Pink (`#D47A88`), Young Rice Green (`#6A8D73`), Rustic Wood (`#4A3728`).
2. **Form & Texture**:
   - Folded paper radius (10px-14px) and soft mist wash shadows.
   - Absolutely no harsh 999px pills, glossy buttons, or neon glows.
3. **Typography**:
   - UI elements: `Outfit`, sans-serif. Sentimental verses: `Playfair Display` or cursive `Dancing Script`.

---

## 5. RESPONSIVE ENGINE & MULTI-DEVICE STANDARDS

1. **Zero Horizontal Overflow**:
   - `document.documentElement.scrollWidth <= clientWidth` at all times (from 320px phones to 4K displays).
   - Fixed background elements must use `position: fixed; inset: 0; overflow: hidden; contain: strict;`.
2. **Decoupled Autoscale (`resizeWrap`)**:
   - Desktop: scale fitted by viewport height to fill sky.
   - Mobile Portrait: scale fitted by viewport width, tree positioned at upper 38% for reading comfort.
   - Mobile Landscape: compact scale preserving safe zones above bottom dock.
3. **Touch Targets**: Minimum 44px tap area compliant with WCAG and Apple Human Interface Guidelines.

---

## 6. QUALITY GATES & CONCURRENT GIT PROTOCOL

1. **Validation Standards**:
   - Every JS file must pass syntax validation: `node -c <file.js>`.
   - Every CSS file must maintain strictly balanced braces (`{}` count matches).
2. **Concurrent Git Protocol**:
   - Always run `git fetch origin` before starting work to integrate remote team changes.
   - Develop features in isolated topic branches, verify zero merge conflicts, and push cleanly.
   - Never track ephemeral reference assets (e.g., `20-10.html` must remain gitignored).
