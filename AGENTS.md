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
3. **Clean Workspace Root**: Only core assets allowed (`index.html`, `css/`, `js/`, `img/`, `audio/`, `video/`, `tasks/`, `.rules/`).
   Video files strictly optimized H.264 MP4 under 50MB with `+faststart` (`video/vid_1.mp4` and `video/vid_2.mp4`). Never commit scratch scripts, raw gigabyte videos, or temp files.

---

## 3. FILE DIRECTORY & RESPONSIBILITY MAP

### A. Markup Layer
- `index.html`: Semantic DOM skeleton, stylesheet/script load orders, layered interactive containers, video lightbox modal (`#gift-video-modal`), dual gift boxes deck (`#secret-gift-boxes-deck`), decoupled botanical harp.

### B. Styling Layer (`css/` - 4 Logical Files)
- `css/base.css`: Heritage design tokens, CSS reset, typography rules, shared utilities.
- `css/layout.css`: Spatial layouts, 4-phase diurnal sky, canvas `#wrap`, Áo Dài silhouette, compact minigame HUD, responsive viewports.
- `css/components.css`: Interactive UI widgets (Wax Seal, Orrery, Minigames, Postcard, Letter, Mascot, Guide, Video Lightbox, Dual Lacquer & Gold Gift Boxes, Mobile Harmonization).
- `css/zodiac.css`: Heritage Zodiac atelier card, 12 mythic constellation vector art overlays, responsive star layouts.

### C. Logic Layer (`js/` - 20 Autonomous Modules)
- `js/flowers-data.js`: Dedicated database of 27 heritage flower profiles, matching rules, and accessors.
- `js/content.js`: Static datasets: 8 secret letters (`secretLettersDeck`), 23 colleague wishes, markdown letter introducing 2 sequential heritage gift boxes (zero external Drive link).
- `js/audio-vfx.js`: Web Audio API synthesizer (wind chimes, clicks, wax drops, celestial chimes), BGM playlist manager with 70/30 initial random ratio (`nhac_2.webm` vs `nhac_1.webm`), loop cycle auto-advance on track ended with volume preservation, video lightbox audio ducking/coordination (`pauseBgmForVideo`, `resumeBgmAfterVideo`), Phonk Easter Egg mode.
- `js/environment.js`: Diurnal cycle (Dawn, Day, Dusk, Night), celestial particles, 3D falling petals/leaves, WeatherFX.
- `js/orientation-guard.js`: Bi-directional orientation manager (`setPreferredOrientation('landscape' | 'portrait')`): Dynamic adaptation for Stage 0 atelier / Story 9:16 / Quiz (portrait) vs Stage 1-4 garden (landscape), bypass button fallback (`#rotate-bypass-btn`), zero 20/10 spoilers, and Safari audio unlock delay mitigation.
- `js/wax-seal-ceremony.js`: Time-lock gate, birthday selection, marble wax melting, brass seal stamping, garden awakening (Stage 0).
- `js/zodiac-constellation.js`: 12 Zodiac signs database, astronomical star coordinates & edges, birth date calculation engine, 2-second grand reveal SVG mythological art demonstration, celestial audio VFX coordination, and fallback accessor.
- `js/atmosphere-shifter.js`: Living Weather HUD (rain dewdrops, morning sunbeams, Stage 2 thermal root warmth on double-tap and ground touch, 25s auto-fallback timer).
- `js/botanical-harp.js`: 5-string botanical harp decoupled from `#wrap` autoscale (direct child of `#main-container`), 26px reach tolerance, direct wire pointer listeners, responsive right dock.
- `js/celestial-orrery.js`: 360° seasonal celestial compass wheel, collapsible Lodestar star button (top-left sky dock in mobile landscape).
- `js/garden-minigames.js`: Simon Melody (Chuông Hoa) bilateral acoustic game on safe thumb zones (Landscape: 18%/28% left, 72%/82% right with 44% central corridor; Portrait: 16%/22% and 78%/84% with z-index 2600), Constellation Linker with 4 exclusion zones, and automatic graceful skip fallbacks (5 fails or 40s timer).
- `js/garden-stages.js`: Tree growth lifecycle (Stages 0-4), instant garden polaroid capture engine (`renderGardenPolaroidToCanvas` with `bloomedTreeImage` snapshot cache), stage cleanup manager (`cleanupStage`).
- `js/mascot-companion.js`: Paper cutout puppet, rustic folk dialogues, eye-blink loop, animated expressions, landscape right-docked speech bubble.
- `js/secret-letter.js`: Typewriter letter engine, 3D flip Polaroid card, cursive/legible font toggle, 3D flower quiz, sequential dual heritage gift boxes (`#gift-box-1` red lacquer & `#gift-box-2` imperial gold), unlocking ceremony on 95% video completion with haptic/chime feedback and sessionStorage persistence, zero-lag video lightbox player (`openGiftVideoModal` / `closeGiftVideoModal`).
- `js/boarding-pass-modal.js`: Vietnamese Heritage Postcard modal (flower personality, photo stamp, wax seal, 2-column actions grid on mobile <= 560px, portrait orientation hook).
- `js/boarding-pass-canvas.js`: High-res 1080x1920 Retina Canvas 2D exporter for downloadable Story cards.
- `js/love.js`: Procedural heart-blooming tree canvas engine (virtual coordinate space 1100x680), soft watercolor mist footer gradient.
- `js/experience-guide.js`: Guided journey walkthrough and multi-step onboarding modal with bounded 92dvh flexbox viewport and independent touch scrolling.
- `js/realtime-guide.js`: Dynamic real-time guidance HUD, decoupled top-row horizon layout, 4s auto-dismiss hint bubble, state-driven quest tracking.
- `js/main.js`: Master orchestrator, autoscale engine (`resizeWrap`), bloomed tree snapshot caching (`bloomedTreeImage`), asynchronous stage lifecycle pipeline.

---

## 4. LIFECYCLE STAGES & STATE COORDINATION
1. **5-Stage Progression Pipeline**:
   - `Stage 0 (Awakening & Birthday Atelier)`: Name input, Day & Month birth selection $\rightarrow$ Zodiac calculation, wax melting & stamping in `wax-seal-ceremony.js` (adaptive 1-column atelier on vertical mobile $\le 560\text{px}$, 2-column on landscape) to awaken garden.
   - `Stage 1 (Sprout & Clover)`: Sprout & four-leaf clover emerge in `garden-stages.js`; water & sunbathe.
   - `Stage 2 (Simon Melody - Chuông Hoa)`: `garden-minigames.js` activates acoustic memory sequence on bilateral thumb zones (left 18%/28%, right 72%/82%) leaving an expansive 44% central corridor for sprout growth; `#simon-skip-btn` fallback after 5 fails or 40s. Living Atmosphere HUD sun shifter remains visible, double-tap or root touch warms roots with 25s auto-fallback.
   - `Stage 3 (Zodiac Constellation Linker - Nối Chòm Sao Hoàng Đạo)`: Connect real astronomical stars of user's zodiac sign avoiding 4 exclusion zones (top HUD, central tree, mascot, bottom chimes); catch radius $\ge 48\text{px}$; 2-second grand reveal SVG mythological art demonstration with celestial SFX and mascot cheer; `#constellation-skip-btn` fallback after 5 fails or 40s.
   - `Stage 4 (Full Blossom & Áo Dài)`: Heart tree blooms (`love.js`), Áo Dài appears, reveals keepsake polaroid (using cached bloomed tree snapshot), 9:16 postcard (with 2-column action grid on mobile) & secret typewriter letter with Sequential Dual Heritage Gift Boxes (`video/vid_1.mp4` & `video/vid_2.mp4` under 50MB, zero Google Drive link).
2. **Global State Architecture**:
   - Synchronized via `window.gardenState` (`currentStage`, `isWatered`, `isFertilized`, `userName`, `userBirthday`, `zodiacSign`, `gift1Watched`, etc.).
   - Inter-module communication via window APIs (`window.showMascotSpeech`, `window.cleanupStage`, `window.setPreferredOrientation`, `window.openGiftVideoModal`, `window.unlockGiftBox2`).
3. **Clean Unmount Invariant**: Every stage transition must call `cleanupStage` to cancel listeners, timers, frames, close video lightbox modals, and clean up temporary DOM elements.

---

## 5. DESIGN SYSTEM & RESPONSIVE STANDARDS
1. **Vietnamese Poetic Heritage Design Tokens**:
   - Palette: Dó Paper Ivory (`#FAF7F0`), Lotus Pink (`#D47A88`), Young Rice Green (`#6A8D73`), Rustic Wood (`#4A3728`), Imperial Gold (`#D4AF37`).
   - Shapes: Folded paper corner radii (10px-14px), soft mist shadows. No harsh 999px pills or neon glows.
   - Typography: UI uses `Outfit` & `Be Vietnam Pro`, poetic verses use `Playfair Display` or cursive `Dancing Script`.
2. **Multi-Device Responsive Standards & Zero PC Regression**:
   - Zero horizontal scroll (`scrollWidth <= clientWidth`) across all viewports (320px to 4K).
   - Strict Media Query Scoping: All mobile landscape rules strictly inside `@media (max-height: 540px) and (orientation: landscape)` to guarantee 100% Zero PC Regression on desktop (>= 1025px / height >= 600px).
   - Mobile Portrait Standards ($\le 560\text{px}$): Single-column atelier crafting bench, `vial-bob` keyframe animation for gold sprinkle vial, select descender protection (`line-height: 1.3; padding: 0;`), 2-column postcard action grid (`.ticket-actions-bar`) saving vertical space and guaranteeing $\ge 46\text{px}$ tap targets.
   - Mobile Landscape Standards ($\le 540\text{px}$): Mascot speech bubble side-docked to the right (`left: calc(100% + 8px)`) preventing minigame occlusion; Orrery Lodestar button docked at top-left sky corner; Constellation name badge anchored at `bottom: 27%` in the open lower horizon; low-height rotate overlay ($\le 460\text{px}$) with `overflow-y: auto; touch-action: pan-y;`.
   - Modals & Viewport Constraints: Viewport bounded at `max-height: min(92dvh, ...)` with `flex: 1 1 auto; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch;`, preserving >= 55% scrollable content area on all mobile devices.
   - Touch Targets: Minimum 44px/48px tap area meeting WCAG AA and Apple Human Interface Guidelines.
3. **Anti-Spoiler Policy**:
   - Zero exposure of 20/10 occasion text, dates, or full surprise banners prior to Stage 4 blooming. All guidance, overlays, and badges prior to Stage 4 use poetic garden terminology ("Hoa Bí Mật", "Góc Nhìn Toàn Cảnh", "Khu Vườn Kỷ Niệm").

---

## 6. QUALITY GATES & VERIFICATION
1. **JavaScript Validation**: Every modified JS file must pass syntax check: `node -c js/<file.js>`.
2. **CSS Validation**: All 4 CSS files must maintain strictly balanced braces (`{}` count matches across `base.css`, `layout.css`, `components.css`, `zodiac.css`).
3. **Automated Multi-Device Regression**: Run test suites in `scratch/test_*.js` ensuring 0 regressions across mobile matrix and desktop.
4. **Git Harmony Rule**: Always fetch all branches (`git fetch --all --prune`), harmonize cleanly with concurrent commits from teammates, ensure zero syntax or layout regressions, commit, and push stable state.
