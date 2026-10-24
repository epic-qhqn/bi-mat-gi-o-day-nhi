/**
 * WAX SEAL & TIME LOCK GATEWAY CEREMONY (PHASE 2 & PHASE 3)
 * Artisan stationery desk, time lock gate, vintage letterpress name input,
 * aromatherapy candle, copper melting spoon, marbled swirl wax, brass stamp,
 * and garden awakening light seed liberation.
 */
(function() {
    'use strict';

    // DOM Elements
    const timeLockModal = document.getElementById('time-lock-modal');
    const timeLockInput = document.getElementById('time-lock-input');
    const timeLockBtn = document.getElementById('time-lock-btn');
    const timeLockMsg = document.getElementById('time-lock-msg');
    const timeLockClock = document.getElementById('time-lock-clock');
    const lockSubtitle = document.getElementById('lock-subtitle');

    const nameModal = document.getElementById('name-modal');
    const nameInputEl = document.getElementById('name-input');
    const startBtn = document.getElementById('start-btn');
    const embossWrapEl = document.getElementById('emboss-preview-wrap');

    const artisanCandleEl = document.getElementById('artisan-candle');
    const candleHaloEl = document.getElementById('candle-halo');
    const candleFlameEl = document.getElementById('candle-flame');
    const candleBadgeEl = document.getElementById('candle-badge');
    const matchStrikerStrip = document.getElementById('match-striker-strip');
    const artisanMatchstick = document.getElementById('artisan-matchstick');
    const matchFlameEl = document.getElementById('match-flame');
    const matchSparksWrap = document.getElementById('match-sparks-wrap');

    const brassSpoonEl = document.getElementById('brass-spoon');
    const spoonHeatGlowEl = document.getElementById('spoon-heat-glow');
    const spoonRubyBeadEl = document.getElementById('spoon-ruby-bead');
    const spoonGoldBeadEl = document.getElementById('spoon-gold-bead');
    const spoonThirdBeadEl = document.getElementById('spoon-third-bead');
    const spoonMoltenWaxEl = document.getElementById('spoon-molten-wax');
    const marbledSwirlCanvasEl = document.getElementById('marbled-swirl-canvas');
    const spoonSimmerBubblesEl = document.getElementById('spoon-simmer-bubbles');
    const glassStirringRodEl = document.getElementById('glass-stirring-rod');
    const rodTipBadgeEl = document.getElementById('rod-tip-badge');

    const waxBeadsTray = document.getElementById('wax-beads-tray');
    const beadCountVal = document.getElementById('bead-count-val');
    const hearthQuickDropBtn = document.getElementById('hearth-quick-drop-btn');
    const trayResetBtn = document.getElementById('tray-reset-btn');
    const crestSelectorWrap = document.getElementById('crest-selector-wrap');
    const waxSealGuideTip = document.getElementById('wax-seal-guide-tip');
    const ritualStepBar = document.getElementById('ritual-step-bar');

    const waxStampEl = document.getElementById('wax-seal-stamp');
    const stampEngravingFace = document.getElementById('stamp-engraving-face');
    const stampPressHalo = document.getElementById('stamp-press-halo');
    const waxTargetZoneEl = document.getElementById('wax-target-zone');
    const waxPourStreamEl = document.getElementById('wax-pour-stream');
    const streamLiquidCore = document.getElementById('stream-liquid-core');
    const waxHotPoolEl = document.getElementById('wax-hot-pool');
    const hotWaxBodyEl = document.getElementById('hot-wax-body');
    const hotWaxGlossEl = document.getElementById('hot-wax-gloss');
    const sprinkledGoldFlakes = document.getElementById('sprinkled-gold-flakes');
    const artisanSprinkleVial = document.getElementById('artisan-sprinkle-vial');
    const waxCoolingIndicator = document.getElementById('wax-cooling-indicator');
    const coolingFillRing = document.getElementById('cooling-fill-ring');
    const pressGaugeOverlay = document.getElementById('press-gauge-overlay');
    const pressFillBar = document.getElementById('press-fill-bar');
    const waxSealPuddleEl = document.getElementById('wax-seal-puddle');
    const waxCrestDisplay = document.getElementById('wax-crest-display');
    const waxNameImprintEl = document.getElementById('wax-name-imprint');

    // 6-Step Ritual State
    let currentStep = 1;
    let isMatchLit = false;
    let isCandleLit = false;
    let selectedBeads = []; // up to 3 beads
    let selectedCrest = null; // no engraving pattern is preselected - the user must choose one
    let isWaxMelted = false;
    let isWaxStirred = false;
    let isWaxPoured = false;
    let isFlakesSprinkled = false;
    let isWaxStamping = false;
    let isGardenAwakening = false;
    let failQuoteIndex = 0;
    let prevNameValue = '';

    // =========================================================================
    // 1. TIME LOCK GATEWAY
    // =========================================================================
    const getTimeLockState = () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('relock') === '1') {
            sessionStorage.removeItem('epic_gate_unlocked');
            return 'PASSWORD_REQUIRED';
        }
        if (params.get('unlock') === '1') return 'UNLOCKED';
        if (params.get('teststrict') === '1' || params.get('testlock') === '1') return 'STRICT_LOCK';
        if (params.get('testpass') === '1') {
            sessionStorage.removeItem('epic_gate_unlocked');
            return 'PASSWORD_REQUIRED';
        }

        const now = window.__mockLockDate || new Date();
        const targetDate = new Date(2026, 9, 25, 12, 0, 0); // 12h trưa 25/10/2026

        if (now >= targetDate) return 'UNLOCKED';

        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();
        const hours = now.getHours();

        if (year === 2026 && month === 9 && date === 25 && hours >= 0 && hours < 12) {
            return 'STRICT_LOCK';
        }

        if (sessionStorage.getItem('epic_gate_unlocked') === 'true') {
            return 'UNLOCKED';
        }

        return 'PASSWORD_REQUIRED';
    };

    const showLockError = (msg) => {
        if (timeLockMsg) {
            timeLockMsg.textContent = msg;
            timeLockMsg.className = 'time-lock-msg wrong';
            setTimeout(() => {
                if (timeLockMsg) timeLockMsg.classList.remove('wrong');
            }, 450);
        }
        if (timeLockInput) {
            timeLockInput.value = '';
            timeLockInput.focus();
        }
        if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
    };

    const unlockGateway = (isAuto = false) => {
        sessionStorage.setItem('epic_gate_unlocked', 'true');
        if (timeLockMsg) {
            timeLockMsg.textContent = isAuto 
                ? "Đã qua 12:00 trưa rồi! Cổng bí mật chính thức mở cửa đón bạn! ✨" 
                : "Mở khóa thành công! Chào mừng bạn ghé thăm khu vườn bí mật 20/10... 🌸✨";
            timeLockMsg.className = 'time-lock-msg success';
        }
        if (typeof window.playChimeSFX !== 'undefined') window.playChimeSFX();
        if (typeof window.startGateMusicLow === 'function') window.startGateMusicLow();

        setTimeout(() => {
            if (timeLockModal) timeLockModal.classList.add('hidden');
            if (nameModal) {
                nameModal.classList.remove('hidden');
                if (nameInputEl) setTimeout(() => nameInputEl.focus(), 350);
            }
        }, isAuto ? 1500 : 900);
    };

    const initTimeLockGateway = () => {
        if (!timeLockModal) return;
        const state = getTimeLockState();

        if (state === 'UNLOCKED') {
            timeLockModal.classList.add('hidden');
            if (nameModal) {
                nameModal.classList.remove('hidden');
                if (nameInputEl) setTimeout(() => nameInputEl.focus(), 350);
            }
            return;
        }

        if (nameModal) nameModal.classList.add('hidden');
        timeLockModal.classList.remove('hidden');

        const triggerStartMusicAt20 = () => {
            if (typeof window.startGateMusicLow === 'function') window.startGateMusicLow();
        };

        if (state === 'STRICT_LOCK') {
            if (lockSubtitle) {
                lockSubtitle.innerHTML = 'Cổng thời gian đang giữ bí mật món quà đặc biệt ⏳<br><strong class="highlight-time">Hẹn bạn đúng 12:00 trưa ngày 25/10/2026 cổng sẽ tự động mở nhé!</strong> ✨';
            }
            if (timeLockInput) timeLockInput.placeholder = "Cổng đang tạm đóng...";
        } else {
            if (lockSubtitle) {
                lockSubtitle.innerHTML = 'Hãy nhập mật mã để mở khóa cổng bí mật ✨<br><small style="opacity: 0.85;">(Khu vườn sẽ mở tự do sau 12:00 trưa ngày 25/10/2026)</small>';
            }
            if (timeLockInput) {
                timeLockInput.placeholder = "Nhập mật mã mở sớm...";
                setTimeout(() => timeLockInput.focus(), 350);
                timeLockInput.addEventListener('input', () => {
                    triggerStartMusicAt20();
                    if (timeLockMsg && timeLockMsg.classList.contains('wrong')) timeLockMsg.textContent = '';
                });
                timeLockInput.addEventListener('keydown', triggerStartMusicAt20);
                timeLockInput.addEventListener('focus', triggerStartMusicAt20);
            }
        }

        const updateClock = () => {
            if (!timeLockClock) return;
            const now = window.__mockLockDate || new Date();
            const dStr = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const tStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            timeLockClock.textContent = `Thời gian client: ${tStr} - ${dStr}`;
            if (getTimeLockState() === 'UNLOCKED') unlockGateway(true);
        };
        updateClock();
        const clockTimer = setInterval(updateClock, 1000);

        const handleAttempt = () => {
            const entered = (timeLockInput ? timeLockInput.value : '').trim();
            const currentState = getTimeLockState();

            if (currentState === 'STRICT_LOCK') {
                const strictFailQuotes = [
                    "Chưa tới giờ mở cổng rồi nè! Đúng 12:00 trưa nay khu vườn mới bật mí nhé ⏳✨",
                    "Khu vườn đang được chăm chút những khâu cuối cùng, hẹn bạn đúng 12h trưa quay lại nha! 🌸",
                    "Uống một ngụm trà ấm thảnh thơi chờ tới 12:00 trưa nay nhé 🧋✨",
                    "Cổng thời gian đang giữ kín bất ngờ, đúng 12h trưa nay sẽ tự động mở toang đón bạn! 🚀"
                ];
                const msg = strictFailQuotes[failQuoteIndex % strictFailQuotes.length];
                failQuoteIndex++;
                showLockError(msg);
                return;
            }

            if (entered.toLowerCase() === 'acndaptrai') {
                clearInterval(clockTimer);
                unlockGateway(false);
            } else {
                const normalFailQuotes = [
                    "Mật mã chưa đúng rồi nè, thử nhớ lại xem ai trong team hay tự tin nhất nhé! 😉",
                    "Chưa đúng mật mã rồi~ Gợi ý nhỏ: mật mã liên quan đến một bạn nam rất tự tin trong nhóm ✨",
                    "Sai một chút xíu rồi nha, uống ngụm nước rồi thử lại xem nào 🧋",
                    "Chưa mở được nè! Thử kiểm tra xem có gõ nhầm chữ nào không nhé 🔑",
                    "Vẫn chưa chính xác rồi! Hỏi nhỏ admin ACN để nhận gợi ý mật mã nha ✨"
                ];
                const msg = normalFailQuotes[failQuoteIndex % normalFailQuotes.length];
                failQuoteIndex++;
                showLockError(msg);
            }
        };

        if (timeLockBtn) {
            timeLockBtn.addEventListener('click', triggerStartMusicAt20);
            timeLockBtn.onclick = handleAttempt;
        }
        if (timeLockInput) {
            timeLockInput.onkeydown = (e) => {
                if (e.key === 'Enter') handleAttempt();
            };
        }
    };

    window.__testLockTime = (mockDate) => {
        sessionStorage.removeItem('epic_gate_unlocked');
        window.__mockLockDate = mockDate;
        initTimeLockGateway();
    };

    // =========================================================================
    // 2. VINTAGE BRASS LETTERPRESS EMBOSSING
    // =========================================================================
    const updateLetterpressDisplay = (val) => {
        if (!embossWrapEl) return;
        const trimmed = val ? val.trimStart() : '';
        if (!trimmed) {
            embossWrapEl.innerHTML = `<span class="emboss-placeholder">✦ Gõ tên bạn để xem mẫu dập đồng ✦</span>`;
            prevNameValue = '';
            return;
        }

        const isCharAdded = trimmed.length > prevNameValue.length;
        prevNameValue = trimmed;

        embossWrapEl.innerHTML = '';
        const chars = trimmed.split('');
        chars.forEach((char, idx) => {
            const span = document.createElement('span');
            span.className = char === ' ' ? 'emboss-char space' : 'emboss-char';
            span.textContent = char;
            if (idx === chars.length - 1 && isCharAdded) {
                span.style.animation = 'letterpress-stamp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            } else {
                span.style.animation = 'none';
            }
            embossWrapEl.appendChild(span);
        });

        if (isCharAdded) {
            if (typeof window.playLetterpressSFX === 'function') window.playLetterpressSFX();
            if (typeof window.createBrassDustVFX === 'function') {
                const lastSpan = embossWrapEl.lastElementChild;
                if (lastSpan) {
                    const rect = lastSpan.getBoundingClientRect();
                    window.createBrassDustVFX(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }
            }
        }
    };

    // =========================================================================
    // 3. ARTISAN PALETTE & CREST CONFIGURATION
    // =========================================================================
    const BEAD_CONFIG = {
        lotus: { id: 'lotus', name: 'Cánh Sen', hex: '#E0838A', light: '#FFA8B5', dark: '#9E424B', pitch: 880 },
        matcha: { id: 'matcha', name: 'Cốm Non', hex: '#6B9E78', light: '#A2D5AE', dark: '#355C40', pitch: 780 },
        gold: { id: 'gold', name: 'Hoàng Yến', hex: '#DEB853', light: '#FFF5BD', dark: '#94711E', pitch: 980 },
        ivory: { id: 'ivory', name: 'Trắng Dó', hex: '#F9F5EC', light: '#FFFFFF', dark: '#D4CBBB', pitch: 1100 },
        violet: { id: 'violet', name: 'Bằng Lăng', hex: '#9B72AA', light: '#D7B7E6', dark: '#5F386E', pitch: 840 },
        ruby: { id: 'ruby', name: 'Cánh Sen', hex: '#E0838A', light: '#FFA8B5', dark: '#9E424B', pitch: 880 }
    };

    const CREST_SVG_MAP = {
        lotus: `<svg class="wax-flower-crest crest-svg-lotus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 4 C 10 9, 8 13, 12 18 C 16 13, 14 9, 12 4 Z"/>
            <path d="M12 18 C 6 15, 3 11, 5 7 C 8 9, 10 13, 12 18 Z"/>
            <path d="M12 18 C 18 15, 21 11, 19 7 C 16 9, 14 13, 12 18 Z"/>
            <path d="M5 19 C 9 17, 15 17, 19 19" stroke-width="1.5"/>
        </svg>`,
        daisy: `<svg class="wax-flower-crest crest-svg-daisy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3.2" fill="currentColor"/>
            <path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.1-7.1l-2.8 2.8m-8.2 8.2l-2.8 2.8m0-13.8l2.8 2.8m8.2 8.2l2.8 2.8"/>
        </svg>`,
        butterfly: `<svg class="wax-flower-crest crest-svg-butterfly" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 8 C 10 3, 3 3, 4 10 C 5 15, 12 17, 12 17 C 12 17, 19 15, 20 10 C 21 3, 14 3, 12 8 Z"/>
            <path d="M12 17 C 10 18, 5 19, 6 22 C 8 23, 11 20, 12 18 C 13 20, 16 23, 18 22 C 19 19, 14 18, 12 17 Z"/>
            <line x1="12" y1="6" x2="12" y2="17" stroke-width="2"/>
        </svg>`,
        moon: `<svg class="wax-flower-crest crest-svg-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            <circle cx="15" cy="8" r="1" fill="currentColor"/>
            <circle cx="18" cy="14" r="0.8" fill="currentColor"/>
        </svg>`
    };

    const STEP_HINTS = {
        1: 'Chọn màu sáp & hoa văn con dấu bạn thích nhất 🎨',
        2: 'Sáp thơm đang tan chảy êm đềm bên ánh nến ấm áp 🔥',
        3: 'Dập con dấu để hoàn tất phong thư và mở lối vào vườn hoa 💮'
    };

    const updateStartBtnLabel = () => {
        if (!startBtn) return;
        const btnText = startBtn.querySelector('.seal-text');
        const btnIcon = startBtn.querySelector('.seal-icon');
        if (!btnText) return;

        if (!isCandleLit || selectedBeads.length < 2 || !isWaxMelted) {
            if (btnIcon) btnIcon.textContent = '🔥';
            btnText.textContent = 'Thắp Nến & Đun Sáp ✨';
        } else if (!isWaxPoured) {
            if (btnIcon) btnIcon.textContent = '🍯';
            btnText.textContent = 'Rót Sáp Lên Phong Thư 🍯';
        } else {
            if (btnIcon) btnIcon.textContent = '💮';
            btnText.textContent = 'Dập Con Dấu & Mở Cổng Vườn ✨';
        }
    };

    const setRitualStep = (step) => {
        currentStep = step;
        const phase = step <= 1 ? 1 : (step <= 5 ? 2 : 3);
        if (ritualStepBar) {
            const strandProgress = document.getElementById('ritual-strand-progress');
            if (strandProgress) {
                const pct = phase === 1 ? 0 : (phase === 2 ? 50 : 100);
                strandProgress.style.width = `${pct}%`;
            }
            ritualStepBar.querySelectorAll('.step-dot').forEach(dot => {
                const s = parseInt(dot.getAttribute('data-step'), 10);
                dot.classList.remove('is-active', 'is-done');
                if (s === phase) dot.classList.add('is-active');
                else if (s < phase) dot.classList.add('is-done');
            });
        }
        if (waxSealGuideTip) {
            const hint = STEP_HINTS[phase] || STEP_HINTS[1];
            waxSealGuideTip.innerHTML = `<span>${hint}</span>`;
        }
        updateStartBtnLabel();
    };

    // =========================================================================
    // 4. REAL-TIME FLUID MARBLING CANVAS ENGINE
    // =========================================================================
    let swirlStrokes = [];
    let lastSwirlSoundTime = 0;

    const generateMarbledSwirl = (canvas, fromUser = false) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        const cx = w / 2, cy = h / 2, r = w / 2;

        const beads = selectedBeads.length > 0 
            ? selectedBeads.map(id => BEAD_CONFIG[id] || BEAD_CONFIG.lotus)
            : [BEAD_CONFIG.lotus, BEAD_CONFIG.gold];

        ctx.clearRect(0, 0, w, h);

        // Base circular gradient from primary chosen bead
        const baseGrad = ctx.createRadialGradient(cx * 0.85, cy * 0.75, 4, cx, cy, r);
        baseGrad.addColorStop(0, beads[0].light);
        baseGrad.addColorStop(0.5, beads[0].hex);
        baseGrad.addColorStop(1, beads[0].dark);
        ctx.fillStyle = baseGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
        ctx.clip();

        const ribbonPalette = [
            'rgba(255, 255, 255, 0.95)',
            'rgba(255, 245, 189, 0.9)',
            beads[1] ? beads[1].hex : '#DEB853',
            beads[2] ? beads[2].hex : '#FFF5BD',
            beads[0].light
        ];

        if (fromUser && swirlStrokes.length > 1) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            for (let i = 1; i < swirlStrokes.length; i++) {
                const p0 = swirlStrokes[i - 1];
                const p1 = swirlStrokes[i];
                const col = ribbonPalette[i % ribbonPalette.length];
                ctx.beginPath();
                ctx.strokeStyle = col;
                ctx.lineWidth = 5 + Math.sin(i * 0.45) * 2.5;
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.stroke();
            }
        } else {
            // Procedural ribbon swirls
            const numArms = 5;
            for (let arm = 0; arm < numArms; arm++) {
                const armAngle = (arm * (Math.PI * 2 / numArms));
                ctx.beginPath();
                ctx.strokeStyle = ribbonPalette[arm % ribbonPalette.length];
                ctx.lineWidth = 3.5 + (arm % 3);
                ctx.lineCap = 'round';
                for (let step = 0; step < 35; step++) {
                    const theta = armAngle + step * 0.16;
                    const rad = 3 + step * (r / 35) * 0.92;
                    const x = cx + Math.cos(theta) * rad;
                    const y = cy + Math.sin(theta) * rad;
                    if (step === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        }

        // Sparkling golden flecks
        for (let s = 0; s < 18; s++) {
            const sAngle = (s * 1.37) % (Math.PI * 2);
            const sDist = ((s * 23) % Math.floor(r * 0.8));
            ctx.fillStyle = s % 2 === 0 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 215, 0, 0.9)';
            ctx.beginPath();
            ctx.arc(cx + Math.cos(sAngle) * sDist, cy + Math.sin(sAngle) * sDist, 1.2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        window.currentMarbledPattern = canvas.toDataURL();
    };

    // =========================================================================
    // 5. MATCHBOX & CANDLE IGNITION GESTURES
    // =========================================================================
    const spawnSparkParticles = (clientX, clientY) => {
        if (!matchSparksWrap) return;
        const rect = matchSparksWrap.getBoundingClientRect();
        const originX = clientX - rect.left;
        const originY = clientY - rect.top;

        for (let i = 0; i < 6; i++) {
            const spark = document.createElement('div');
            spark.className = 'match-spark-particle';
            spark.style.left = `${originX}px`;
            spark.style.top = `${originY}px`;
            const tx = (Math.random() - 0.5) * 45;
            const ty = -10 - Math.random() * 35;
            spark.style.setProperty('--tx', `${tx}px`);
            spark.style.setProperty('--ty', `${ty}px`);
            matchSparksWrap.appendChild(spark);
            setTimeout(() => spark.remove(), 350);
        }
    };

    const lightMatch = (e) => {
        if (isMatchLit) return;
        if (!selectedCrest) { promptCrestSelection(); return; }
        isMatchLit = true;
        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.playMatchStrikeSFX === 'function') window.playMatchStrikeSFX();
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('match');

        if (e && e.clientX && e.clientY) {
            spawnSparkParticles(e.clientX, e.clientY);
        } else if (matchStrikerStrip) {
            const r = matchStrikerStrip.getBoundingClientRect();
            spawnSparkParticles(r.left + r.width / 2, r.top + r.height / 2);
        }

        if (matchFlameEl) matchFlameEl.classList.remove('hidden');
        if (artisanMatchstick) artisanMatchstick.classList.add('is-lit');

        // Automatically ignite candle after a brief natural delay
        setTimeout(() => {
            lightCandle();
        }, 550);
    };

    const lightCandle = () => {
        if (isCandleLit) return;
        isCandleLit = true;
        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.playCandleLightSFX === 'function') window.playCandleLightSFX();
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('candle');

        if (candleFlameEl) candleFlameEl.classList.remove('hidden');
        if (candleHaloEl) candleHaloEl.classList.remove('hidden');
        if (artisanCandleEl) artisanCandleEl.classList.add('is-lit');
        if (candleBadgeEl) candleBadgeEl.textContent = 'Đã thắp nến 🔥';
        if (spoonHeatGlowEl) spoonHeatGlowEl.classList.remove('hidden');

        // Extinguish match
        setTimeout(() => {
            if (matchFlameEl) matchFlameEl.classList.add('hidden');
            if (artisanMatchstick) artisanMatchstick.classList.remove('is-lit');
        }, 800);

        if (selectedBeads.length >= 2) {
            meltWaxBeads();
        } else {
            setRitualStep(2);
        }
    };

    // =========================================================================
    // 6. 5-COLOR VIETNAMESE BEAD SELECTION & CREST
    // =========================================================================
    const updateBeadDisplayInSpoon = () => {
        const slots = [spoonRubyBeadEl, spoonGoldBeadEl, spoonThirdBeadEl];
        slots.forEach((el, idx) => {
            if (!el) return;
            if (idx < selectedBeads.length) {
                const beadId = selectedBeads[idx];
                const conf = BEAD_CONFIG[beadId] || BEAD_CONFIG.lotus;
                el.style.background = `radial-gradient(circle at 30% 30%, ${conf.light} 0%, ${conf.hex} 55%, ${conf.dark} 100%)`;
                el.classList.remove('hidden', 'melting');
            } else {
                el.classList.add('hidden');
            }
        });

        if (beadCountVal) beadCountVal.textContent = selectedBeads.length;
        if (trayResetBtn) {
            if (selectedBeads.length > 0) trayResetBtn.classList.remove('hidden');
            else trayResetBtn.classList.add('hidden');
        }
    };

    const selectWaxBead = (beadId) => {
        if (isWaxMelted) return;
        if (selectedBeads.length >= 3) {
            if (waxSealGuideTip) {
                waxSealGuideTip.innerHTML = `<span>Thìa đồng đã đủ 3 hạt sáp! Cùng đun nóng để tạo vân cẩm thạch nhé ✨</span>`;
            }
            return;
        }

        const conf = BEAD_CONFIG[beadId] || BEAD_CONFIG.lotus;
        selectedBeads.push(beadId);

        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.playBeadChimeSFX === 'function') {
            window.playBeadChimeSFX(conf.pitch);
        }
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('tap');

        updateBeadDisplayInSpoon();

        if (selectedBeads.length >= 2) {
            if (isCandleLit) {
                meltWaxBeads();
            } else {
                setRitualStep(1);
            }
        } else {
            if (waxSealGuideTip) {
                waxSealGuideTip.innerHTML = `<span>Đã chọn sắc ${conf.name}. Bạn chọn thêm hạt sáp phối màu nhé 🎨</span>`;
            }
        }
    };

    const resetSelectedBeads = () => {
        if (isWaxMelted) return;
        selectedBeads = [];
        updateBeadDisplayInSpoon();
        document.querySelectorAll('.wax-bead-item').forEach(b => b.classList.remove('is-selected', 'dropped'));
        setRitualStep(2);
    };

    const CREST_NAMES = { lotus: 'Hoa Sen', daisy: 'Cúc Họa Mi', butterfly: 'Cánh Bướm', moon: 'Trăng Non' };

    // Initial / blank state: nothing engraved, nothing highlighted
    const resetCrestMotif = () => {
        selectedCrest = null;
        document.querySelectorAll('.crest-opt-btn').forEach(btn => {
            btn.classList.remove('is-selected');
            btn.setAttribute('aria-checked', 'false');
        });
        if (stampEngravingFace) stampEngravingFace.textContent = '✦';
        if (waxCrestDisplay) waxCrestDisplay.innerHTML = '';
        if (crestSelectorWrap) crestSelectorWrap.classList.remove('needs-attention');
    };

    const selectCrestMotif = (crestId) => {
        if (!CREST_SVG_MAP[crestId]) return;
        selectedCrest = crestId;
        document.querySelectorAll('.crest-opt-btn').forEach(btn => {
            const isMatch = btn.getAttribute('data-crest') === crestId;
            btn.classList.toggle('is-selected', isMatch);
            btn.setAttribute('aria-checked', isMatch ? 'true' : 'false');
        });
        if (crestSelectorWrap) crestSelectorWrap.classList.remove('needs-attention');

        const iconMap = { lotus: '🪷', daisy: '🌼', butterfly: '🦋', moon: '🌙' };
        if (stampEngravingFace) stampEngravingFace.textContent = iconMap[crestId] || '✦';
        if (waxCrestDisplay) waxCrestDisplay.innerHTML = CREST_SVG_MAP[crestId];

        if (waxSealGuideTip) {
            waxSealGuideTip.innerHTML = `<span>Đã khắc hoa văn ${CREST_NAMES[crestId] || ''} lên con dấu đồng ✨</span>`;
        }
        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.playBeadChimeSFX === 'function') window.playBeadChimeSFX(1200);
        if (typeof window.refreshRealtimeGuide === 'function') {
            window.refreshRealtimeGuide();
            setTimeout(window.refreshRealtimeGuide, 120);
        }
    };

    // Gate: the ritual cannot move past "choose wax & crest" until an engraving pattern is picked
    let lastCrestPromptAt = 0;
    const promptCrestSelection = () => {
        const now = Date.now();
        if (now - lastCrestPromptAt < 900) return; // throttle (matchstick drag fires this on every pointermove)
        lastCrestPromptAt = now;

        if (waxSealGuideTip) {
            waxSealGuideTip.innerHTML = `<span>🪷 Hãy chọn một hoa văn khắc triện trước khi thắp nến nhé!</span>`;
        }
        if (crestSelectorWrap) {
            crestSelectorWrap.classList.add('needs-attention');
            crestSelectorWrap.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-6px)' },
                { transform: 'translateX(6px)' },
                { transform: 'translateX(-4px)' },
                { transform: 'translateX(4px)' },
                { transform: 'translateX(0)' }
            ], { duration: 350 });
            if (typeof crestSelectorWrap.scrollIntoView === 'function') {
                crestSelectorWrap.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
            setTimeout(() => crestSelectorWrap.classList.remove('needs-attention'), 2600);
        }
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('medium');
        if (typeof window.refreshRealtimeGuide === 'function') window.refreshRealtimeGuide();
    };

    // =========================================================================
    // 7. WAX SIMMERING & INTERACTIVE SWIRL GESTURES
    // =========================================================================
    const meltWaxBeads = () => {
        if (isWaxMelted) return;
        isWaxMelted = true;
        setRitualStep(3);

        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.playWaxMeltSFX === 'function') window.playWaxMeltSFX();

        const slots = [spoonRubyBeadEl, spoonGoldBeadEl, spoonThirdBeadEl];
        slots.forEach(el => {
            if (el) el.classList.add('melting');
        });

        // Spawn gentle simmering bubbles
        if (spoonSimmerBubblesEl) {
            spoonSimmerBubblesEl.innerHTML = '';
            for (let b = 0; b < 6; b++) {
                setTimeout(() => {
                    if (!spoonSimmerBubblesEl) return;
                    const bub = document.createElement('div');
                    bub.className = 'simmer-bubble';
                    const size = 4 + Math.random() * 6;
                    bub.style.width = `${size}px`;
                    bub.style.height = `${size}px`;
                    bub.style.left = `${16 + Math.random() * 20}px`;
                    bub.style.top = `${16 + Math.random() * 20}px`;
                    spoonSimmerBubblesEl.appendChild(bub);
                    if (typeof window.playSimmerBubbleSFX === 'function') window.playSimmerBubbleSFX();
                    setTimeout(() => bub.remove(), 800);
                }, b * 220);
            }
        }

        setTimeout(() => {
            if (spoonMoltenWaxEl) spoonMoltenWaxEl.classList.remove('hidden');
            generateMarbledSwirl(marbledSwirlCanvasEl, false);
            if (glassStirringRodEl) glassStirringRodEl.classList.remove('hidden');
            setRitualStep(4);
        }, 650);
    };

    const stirMarbledWax = (onComplete) => {
        if (isWaxStirred) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }
        isWaxStirred = true;
        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.playWaxStirSFX === 'function') window.playWaxStirSFX();
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('pour');

        if (glassStirringRodEl) glassStirringRodEl.classList.add('stirring-anim');

        setTimeout(() => {
            generateMarbledSwirl(marbledSwirlCanvasEl, false);
        }, 400);

        setTimeout(() => {
            if (glassStirringRodEl) {
                glassStirringRodEl.classList.remove('stirring-anim');
                glassStirringRodEl.style.opacity = '0.5';
            }
            setRitualStep(5);
            if (typeof onComplete === 'function') onComplete();
        }, 1200);
    };

    // =========================================================================
    // 8. VISCOUS POURING & 24K GOLD FLAKES SPRINKLE
    // =========================================================================
    const pourMoltenWax = (onComplete) => {
        if (isWaxPoured) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }
        isWaxPoured = true;
        if (typeof window.initAudio === 'function') window.initAudio();
        if (brassSpoonEl) brassSpoonEl.classList.add('is-pouring');
        if (spoonMoltenWaxEl) spoonMoltenWaxEl.classList.add('draining');

        // Color stream according to primary palette
        if (streamLiquidCore && selectedBeads.length > 0) {
            const primary = BEAD_CONFIG[selectedBeads[0]] || BEAD_CONFIG.lotus;
            streamLiquidCore.style.background = `linear-gradient(180deg, ${primary.light} 0%, ${primary.hex} 50%, ${primary.dark} 100%)`;
        }

        setTimeout(() => {
            if (waxPourStreamEl) waxPourStreamEl.classList.remove('hidden');
            if (typeof window.playWaxPourSFX === 'function') window.playWaxPourSFX();
            if (typeof window.triggerHaptic === 'function') window.triggerHaptic('pour');
        }, 150);

        setTimeout(() => {
            if (waxHotPoolEl) waxHotPoolEl.classList.remove('hidden');
            if (hotWaxBodyEl && window.currentMarbledPattern) {
                hotWaxBodyEl.style.backgroundImage = `url(${window.currentMarbledPattern})`;
                hotWaxBodyEl.style.backgroundSize = 'cover';
            }
            if (artisanSprinkleVial) artisanSprinkleVial.classList.remove('hidden');
            setRitualStep(6);
        }, 380);

        setTimeout(() => {
            if (waxPourStreamEl) waxPourStreamEl.classList.add('hidden');
            if (brassSpoonEl) brassSpoonEl.classList.remove('is-pouring');
            if (spoonMoltenWaxEl) spoonMoltenWaxEl.classList.add('hidden');
            if (waxTargetZoneEl) waxTargetZoneEl.classList.add('ready-to-stamp');
            if (typeof onComplete === 'function') onComplete();
        }, 850);
    };

    const sprinkleGoldFlakes = () => {
        if (isFlakesSprinkled || !isWaxPoured) return;
        isFlakesSprinkled = true;
        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.playSprinkleFlakesSFX === 'function') window.playSprinkleFlakesSFX();
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('light');

        if (artisanSprinkleVial) {
            artisanSprinkleVial.animate([
                { transform: 'translateX(-50%) rotate(0deg)' },
                { transform: 'translateX(-50%) rotate(-25deg) translateY(-8px)' },
                { transform: 'translateX(-50%) rotate(10deg)' },
                { transform: 'translateX(-50%) rotate(0deg)' }
            ], { duration: 450 });
        }

        if (sprinkledGoldFlakes) {
            sprinkledGoldFlakes.classList.remove('hidden');
            sprinkledGoldFlakes.innerHTML = '';
            for (let i = 0; i < 14; i++) {
                const flake = document.createElement('div');
                flake.className = 'gold-flake-dot';
                const size = 2 + Math.random() * 3.5;
                flake.style.width = `${size}px`;
                flake.style.height = `${size}px`;
                flake.style.left = `${15 + Math.random() * 70}%`;
                flake.style.top = `${15 + Math.random() * 70}%`;
                flake.style.animationDelay = `${Math.random() * 1.5}s`;
                sprinkledGoldFlakes.appendChild(flake);
            }
        }
    };

    // =========================================================================
    // 9. STRICT STEP PROGRESSION & STAMPING PRESS
    // =========================================================================
    const checkStepProgression = () => {
        const inputEl = document.getElementById('name-input');
        const val = inputEl ? inputEl.value.trim() : '';
        if (!val) {
            if (inputEl) {
                inputEl.style.borderColor = '#E53E3E';
                inputEl.focus();
                const brassPlate = document.getElementById('letterpress-brass-plate');
                if (brassPlate) {
                    brassPlate.animate([
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(-6px)' },
                        { transform: 'translateX(6px)' },
                        { transform: 'translateX(-4px)' },
                        { transform: 'translateX(4px)' },
                        { transform: 'translateX(0)' }
                    ], { duration: 350 });
                }
                setTimeout(() => { inputEl.style.borderColor = ''; }, 600);
            }
            if (waxSealGuideTip) {
                waxSealGuideTip.innerHTML = `<span>✨ Hãy ghi tên của bạn lên khuôn đồng trước nhé!</span>`;
            }
            if (typeof window.triggerHaptic === 'function') window.triggerHaptic('medium');
            return { ready: false, step: 0 };
        }

        if (!selectedCrest) {
            promptCrestSelection();
            return { ready: false, step: 0 };
        }

        // Auto-progress Step 1: Light candle if not lit
        if (!isCandleLit) {
            if (selectedBeads.length < 2) {
                selectedBeads = ['lotus', 'gold'];
                updateBeadDisplayInSpoon();
            }
            lightMatch();
            setTimeout(() => {
                meltWaxBeads();
            }, 600);
            return { ready: false, step: 1 };
        }

        // Auto-progress Step 2: Melt wax if not melted
        if (!isWaxMelted) {
            if (selectedBeads.length < 2) {
                selectedBeads = ['lotus', 'gold'];
                updateBeadDisplayInSpoon();
            }
            meltWaxBeads();
            return { ready: false, step: 2 };
        }

        // Auto-progress Step 3: Stir and pour wax if not poured
        if (!isWaxPoured) {
            if (!isWaxStirred) {
                stirMarbledWax(() => {
                    setTimeout(pourMoltenWax, 250);
                });
            } else {
                pourMoltenWax();
            }
            return { ready: false, step: 2 };
        }

        setRitualStep(3);
        return { ready: true, step: 3 };
    };

    const performWaxSealStamp = (onComplete) => {
        const inputEl = document.getElementById('name-input');
        const val = inputEl ? inputEl.value.trim() : '';
        if (!val || !isWaxPoured) {
            const check = checkStepProgression();
            if (!check.ready) return;
        }

        if (isWaxStamping) return;
        isWaxStamping = true;

        window.currentUserName = val;
        if (waxNameImprintEl) waxNameImprintEl.textContent = val.toUpperCase();
        if (typeof window.initAudio === 'function') window.initAudio();

        if (waxStampEl && waxTargetZoneEl) {
            const stampRect = waxStampEl.getBoundingClientRect();
            const targetRect = waxTargetZoneEl.getBoundingClientRect();
            const snapX = (targetRect.left + targetRect.width / 2) - (stampRect.left + stampRect.width / 2);
            const snapY = (targetRect.top + targetRect.height / 2) - (stampRect.top + stampRect.height / 2);

            waxStampEl.style.setProperty('--snap-x', `${snapX}px`);
            waxStampEl.style.setProperty('--snap-y', `${snapY}px`);
            waxStampEl.style.transform = '';
            waxStampEl.classList.remove('dragging');
            waxStampEl.classList.add('animating-stamp');

            // 1. Heavy Impact on Hot Wax
            setTimeout(() => {
                if (typeof window.playWaxStampASMR === 'function') {
                    window.playWaxStampASMR();
                } else if (typeof window.playWaxStampSFX === 'function') {
                    window.playWaxStampSFX();
                }
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('seal');

                if (waxHotPoolEl) waxHotPoolEl.classList.add('squished');
                if (waxTargetZoneEl) waxTargetZoneEl.classList.add('stamped');
                if (typeof window.createBrassDustVFX === 'function') {
                    window.createBrassDustVFX(targetRect.left + targetRect.width / 2, targetRect.top + targetRect.height / 2);
                }

                // 2. Cooling Solidification Phase (1.4s)
                if (waxCoolingIndicator) {
                    waxCoolingIndicator.classList.remove('hidden');
                    if (coolingFillRing) {
                        coolingFillRing.style.strokeDasharray = '100, 100';
                    }
                }
                if (hotWaxBodyEl) hotWaxBodyEl.classList.add('cured-matte');
                if (hotWaxGlossEl) hotWaxGlossEl.classList.add('cured-matte');

                setTimeout(() => {
                    // 3. Satisfying Unmolding Suction Pop
                    if (typeof window.playWaxUnmoldPopASMR === 'function') {
                        window.playWaxUnmoldPopASMR();
                    }
                    if (typeof window.triggerHaptic === 'function') window.triggerHaptic('unmold');

                    if (waxCoolingIndicator) waxCoolingIndicator.classList.add('hidden');
                    if (waxHotPoolEl) waxHotPoolEl.classList.add('hidden');

                    if (waxSealPuddleEl) {
                        waxSealPuddleEl.classList.remove('hidden');
                        if (window.currentMarbledPattern) {
                            waxSealPuddleEl.style.backgroundImage = `url(${window.currentMarbledPattern})`;
                            waxSealPuddleEl.style.backgroundSize = 'cover';
                        }
                    }

                    const flourishEl = document.getElementById('seal-botanical-flourish');
                    if (flourishEl) flourishEl.classList.remove('hidden');
                }, 800);
            }, 650);

            setTimeout(() => {
                waxStampEl.classList.remove('animating-stamp');
                isWaxStamping = false;
                if (typeof onComplete === 'function') onComplete();
            }, 1600);
        } else {
            isWaxStamping = false;
            if (typeof onComplete === 'function') onComplete();
        }
    };

    // =========================================================================
    // 10. GARDEN AWAKENING TRANSITION & COMPLETE PUZZLE
    // =========================================================================
    const startGardenAwakeningTransition = (name) => {
        if (isGardenAwakening) return;
        isGardenAwakening = true;

        const sprig = document.querySelector('.pressed-botanical-branch');
        if (sprig) sprig.classList.add('blooming-glow');
        const flourishEl = document.getElementById('seal-botanical-flourish');
        if (flourishEl) {
            flourishEl.classList.remove('hidden');
            flourishEl.classList.add('blooming-radiance');
        }

        if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
        if (typeof window.playFloralBloomSFX === 'function') window.playFloralBloomSFX();

        const desc = document.getElementById('name-prompt-desc') || document.querySelector('#name-modal .name-panel p');
        if (desc) {
            const recipientName = (name || window.currentUserName || 'BẠN').toUpperCase();
            desc.innerHTML = `✨ Con dấu sáp mang tên <strong>${recipientName}</strong> đã hoàn tất!<br>Khu vườn bí mật đang bừng tỉnh để đón chào bạn... ✨`;
        }

        if (nameModal) nameModal.style.pointerEvents = 'none';

        // Petal bursts
        const sprigRect = sprig ? sprig.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight * 0.28, width: 0, height: 0 };
        const sealEl = document.getElementById('wax-seal-puddle') || document.getElementById('wax-target-zone');
        const sealRect = sealEl ? sealEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight * 0.45, width: 0, height: 0 };

        if (typeof window.createFloralPetalBurstVFX === 'function') {
            window.createFloralPetalBurstVFX(sprigRect.left + sprigRect.width / 2, sprigRect.top + sprigRect.height / 2);
            window.createFloralPetalBurstVFX(sealRect.left + sealRect.width / 2, sealRect.top + sealRect.height / 2);
        }

        // Spawn 16 luminescent seedlings that fly into garden soil
        const targetBaseX = window.innerWidth / 2;
        const targetBaseY = Math.min(window.innerHeight * 0.72, window.innerHeight - 110);

        for (let i = 0; i < 16; i++) {
            setTimeout(() => {
                const seed = document.createElement('div');
                seed.className = 'awakening-light-seed';
                const fromSprig = i % 2 === 0;
                const originX = fromSprig ? (sprigRect.left + sprigRect.width / 2) : (sealRect.left + sealRect.width / 2);
                const originY = fromSprig ? (sprigRect.top + sprigRect.height / 2) : (sealRect.top + sealRect.height / 2);

                seed.style.left = `${originX}px`;
                seed.style.top = `${originY}px`;
                const tx = (targetBaseX + (Math.random() - 0.5) * 110) - originX;
                const ty = (targetBaseY + (Math.random() - 0.5) * 35) - originY;
                seed.style.setProperty('--tx', `${tx}px`);
                seed.style.setProperty('--ty', `${ty}px`);
                document.body.appendChild(seed);

                setTimeout(() => {
                    if (typeof window.createSoilImpactRipple === 'function') {
                        window.createSoilImpactRipple(originX + tx, originY + ty);
                    }
                    if (seed.parentNode) seed.parentNode.removeChild(seed);
                }, 1300);
            }, i * 75);
        }

        // Fade out name modal & start garden
        setTimeout(() => {
            if (nameModal) {
                nameModal.classList.add('awakening-fade-out');
            }
            const wrap = document.getElementById('wrap');
            if (wrap) wrap.classList.add('awakening-garden');
        }, 1150);

        setTimeout(() => {
            completePuzzle();
        }, 1750);
    };

    const completePuzzle = () => {
        if (nameModal) {
            nameModal.classList.add('hidden');
            nameModal.style.pointerEvents = 'none';
            nameModal.style.display = 'none';
        }

        setTimeout(() => {
            document.querySelectorAll('.awakening-light-seed, .ground-seed-ripple, .vfx-flower-petal').forEach(p => p.remove());
        }, 500);

        document.body.classList.remove('stage-1-active', 'stage-2-active', 'stage-3-active', 'stage-4-active');
        document.body.classList.add('stage-1-active');
        const gardenUI = document.getElementById('garden-ui');
        if (gardenUI) gardenUI.style.opacity = '1';
        const livingHud = document.getElementById('living-atmosphere-hud');
        if (livingHud) livingHud.style.opacity = '1';
        const harpWrap = document.getElementById('plant-harp-strings-wrap');
        if (harpWrap) harpWrap.classList.add('visible');
        const celestialOrrery = document.getElementById('celestial-weather-orrery');
        if (celestialOrrery) {
            celestialOrrery.classList.remove('hidden');
            if (window.innerWidth <= 768) {
                celestialOrrery.classList.add('orrery-minimized');
            }
            celestialOrrery.style.display = 'flex';
            celestialOrrery.style.opacity = '1';
            celestialOrrery.style.pointerEvents = 'auto';
        }

        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.startEnvironmentCycle === 'function') window.startEnvironmentCycle();

        if (typeof window.fadeAudioVolume === 'function') {
            window.fadeAudioVolume(0.20, 5000);
        } else if (window.bgAudio && window.bgAudio.paused) {
            window.bgAudio.play().then(() => {
                if (window.musicToggleBtn) window.musicToggleBtn.classList.add('playing');
                if (window.musicIconPath) window.musicIconPath.setAttribute("d", window.pausePath);
            }).catch(e => console.log("Auto-play blocked:", e));
        }
    };

    // =========================================================================
    // 11. INITIALIZATION & CROSS-DEVICE POINTER GESTURES
    // =========================================================================
    const initWaxSealCeremony = () => {
        initTimeLockGateway();

        // 1. Step 1: Matchbox & Candle Gestures
        if (matchStrikerStrip) {
            matchStrikerStrip.addEventListener('click', (e) => lightMatch(e));
        }
        if (artisanMatchstick) {
            let isDraggingMatch = false;
            let matchStartX = 0, matchStartY = 0;

            artisanMatchstick.addEventListener('pointerdown', (e) => {
                if (isCandleLit) return;
                isDraggingMatch = true;
                matchStartX = e.clientX;
                matchStartY = e.clientY;
                artisanMatchstick.setPointerCapture(e.pointerId);
                artisanMatchstick.classList.add('dragging');
            });

            artisanMatchstick.addEventListener('pointermove', (e) => {
                if (!isDraggingMatch || isCandleLit) return;
                const dx = e.clientX - matchStartX;
                const dy = e.clientY - matchStartY;
                artisanMatchstick.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;

                // Check collision with striker strip or candle
                if (matchStrikerStrip && !isMatchLit) {
                    const sR = matchStrikerStrip.getBoundingClientRect();
                    if (e.clientX >= sR.left && e.clientX <= sR.right && e.clientY >= sR.top && e.clientY <= sR.bottom) {
                        lightMatch(e);
                    }
                }
                if (artisanCandleEl && isMatchLit) {
                    const cR = artisanCandleEl.getBoundingClientRect();
                    if (Math.hypot(e.clientX - (cR.left + cR.width / 2), e.clientY - (cR.top + 10)) < 35) {
                        lightCandle();
                    }
                }
            });

            const handleMatchEnd = (e) => {
                if (!isDraggingMatch) return;
                isDraggingMatch = false;
                try { artisanMatchstick.releasePointerCapture(e.pointerId); } catch (_) {}
                artisanMatchstick.classList.remove('dragging');
                artisanMatchstick.style.transform = '';

                if (!isCandleLit && !isMatchLit) {
                    // Tap fallback: auto-strike
                    lightMatch(e);
                }
            };

            artisanMatchstick.addEventListener('pointerup', handleMatchEnd);
            artisanMatchstick.addEventListener('pointercancel', handleMatchEnd);
        }

        if (artisanCandleEl) {
            artisanCandleEl.addEventListener('click', () => {
                if (!isCandleLit) lightMatch();
            });
        }

        // 2. Step 2: 5 Vietnamese Wax Beads & Crest Selector
        document.querySelectorAll('.wax-bead-item').forEach(item => {
            const beadId = item.getAttribute('data-bead-id') || 'lotus';
            item.addEventListener('click', () => selectWaxBead(beadId));
        });

        if (hearthQuickDropBtn) {
            hearthQuickDropBtn.addEventListener('click', () => {
                if (isWaxMelted) return;
                resetSelectedBeads();
                selectWaxBead('lotus');
                selectWaxBead('gold');
                selectWaxBead('ivory');
            });
        }

        if (trayResetBtn) {
            trayResetBtn.addEventListener('click', () => resetSelectedBeads());
        }

        document.querySelectorAll('.crest-opt-btn').forEach(btn => {
            const crest = btn.getAttribute('data-crest') || 'lotus';
            btn.addEventListener('click', () => selectCrestMotif(crest));
        });

        // 3. Step 4: Real-time Marbling Canvas Swirl Gestures
        if (marbledSwirlCanvasEl) {
            let isSwirlingCanvas = false;

            const handleSwirlStart = (e) => {
                if (!isWaxMelted || isWaxPoured) return;
                isSwirlingCanvas = true;
                swirlStrokes = [];
                const rect = marbledSwirlCanvasEl.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * marbledSwirlCanvasEl.width;
                const y = ((e.clientY - rect.top) / rect.height) * marbledSwirlCanvasEl.height;
                swirlStrokes.push({ x, y });
                try { marbledSwirlCanvasEl.setPointerCapture(e.pointerId); } catch (_) {}
                if (glassStirringRodEl) glassStirringRodEl.classList.add('is-swirling');
            };

            const handleSwirlMove = (e) => {
                if (!isSwirlingCanvas || !isWaxMelted || isWaxPoured) return;
                const rect = marbledSwirlCanvasEl.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * marbledSwirlCanvasEl.width;
                const y = ((e.clientY - rect.top) / rect.height) * marbledSwirlCanvasEl.height;
                swirlStrokes.push({ x, y });

                generateMarbledSwirl(marbledSwirlCanvasEl, true);

                const now = performance.now();
                if (now - lastSwirlSoundTime > 110) {
                    lastSwirlSoundTime = now;
                    if (typeof window.playGlassRodSwirlSFX === 'function') {
                        window.playGlassRodSwirlSFX(1.2);
                    }
                }
            };

            const handleSwirlEnd = (e) => {
                if (!isSwirlingCanvas) return;
                isSwirlingCanvas = false;
                try { marbledSwirlCanvasEl.releasePointerCapture(e.pointerId); } catch (_) {}
                if (glassStirringRodEl) glassStirringRodEl.classList.remove('is-swirling');

                isWaxStirred = true;
                setRitualStep(5);
            };

            marbledSwirlCanvasEl.addEventListener('pointerdown', handleSwirlStart);
            marbledSwirlCanvasEl.addEventListener('pointermove', handleSwirlMove);
            marbledSwirlCanvasEl.addEventListener('pointerup', handleSwirlEnd);
            marbledSwirlCanvasEl.addEventListener('pointercancel', handleSwirlEnd);
        }

        if (glassStirringRodEl) {
            glassStirringRodEl.addEventListener('click', () => {
                if (!isWaxMelted) {
                    checkStepProgression();
                    return;
                }
                stirMarbledWax();
            });
        }

        // 4. Step 5: Pouring & Sprinkle Gestures
        if (brassSpoonEl) {
            brassSpoonEl.addEventListener('click', () => {
                if (!isWaxMelted) {
                    checkStepProgression();
                    return;
                }
                if (!isWaxPoured) {
                    if (!isWaxStirred) {
                        stirMarbledWax(() => setTimeout(pourMoltenWax, 250));
                    } else {
                        pourMoltenWax();
                    }
                }
            });
        }

        if (artisanSprinkleVial) {
            artisanSprinkleVial.addEventListener('click', () => sprinkleGoldFlakes());
        }

        // 5. Step 6: Brass Stamp Stamping & Hold-to-Press Gestures
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                const val = nameInputEl ? nameInputEl.value.trim() : '';
                if (!val) {
                    if (nameInputEl) {
                        nameInputEl.style.borderColor = '#E53E3E';
                        nameInputEl.focus();
                        const brassPlate = document.getElementById('letterpress-brass-plate');
                        if (brassPlate) {
                            brassPlate.animate([
                                { transform: 'translateX(0)' },
                                { transform: 'translateX(-6px)' },
                                { transform: 'translateX(6px)' },
                                { transform: 'translateX(-4px)' },
                                { transform: 'translateX(4px)' },
                                { transform: 'translateX(0)' }
                            ], { duration: 350 });
                        }
                        setTimeout(() => { nameInputEl.style.borderColor = ''; }, 600);
                    }
                    if (waxSealGuideTip) {
                        waxSealGuideTip.innerHTML = `<span>✨ Hãy nhập tên của bạn lên khuôn đồng trước nhé!</span>`;
                    }
                    if (typeof window.triggerHaptic === 'function') window.triggerHaptic('medium');
                    return;
                }

                if (!selectedCrest) {
                    promptCrestSelection();
                    return;
                }

                window.currentUserName = val;
                if (waxNameImprintEl) waxNameImprintEl.textContent = val.toUpperCase();
                if (typeof window.initAudio === 'function') window.initAudio();

                // Phase 1: Light candle & melt
                if (!isCandleLit) {
                    if (selectedBeads.length < 2) {
                        selectedBeads = ['lotus', 'gold'];
                        updateBeadDisplayInSpoon();
                    }
                    lightMatch();
                    setTimeout(() => {
                        meltWaxBeads();
                        updateStartBtnLabel();
                    }, 650);
                    return;
                }

                // Phase 2a: Melt
                if (!isWaxMelted) {
                    if (selectedBeads.length < 2) {
                        selectedBeads = ['lotus', 'gold'];
                        updateBeadDisplayInSpoon();
                    }
                    meltWaxBeads();
                    updateStartBtnLabel();
                    return;
                }

                // Phase 2b: Pour into envelope target zone
                if (!isWaxPoured) {
                    if (!isWaxStirred) {
                        stirMarbledWax(() => {
                            setTimeout(() => {
                                pourMoltenWax(() => {
                                    updateStartBtnLabel();
                                });
                            }, 250);
                        });
                    } else {
                        pourMoltenWax(() => {
                            updateStartBtnLabel();
                        });
                    }
                    return;
                }

                // Phase 3: Stamp & Awaken
                performWaxSealStamp(() => {
                    startGardenAwakeningTransition(window.currentUserName);
                });
            });
        }

        if (waxTargetZoneEl) {
            waxTargetZoneEl.addEventListener('click', () => {
                if (isWaxStamping) return;
                if (!isWaxPoured) {
                    if (startBtn) startBtn.click();
                    return;
                }
                performWaxSealStamp(() => startGardenAwakeningTransition(window.currentUserName));
            });
        }

        if (waxStampEl && waxTargetZoneEl) {
            let isDraggingStamp = false, stampStartX = 0, stampStartY = 0, hasMovedStamp = false;

            waxStampEl.addEventListener('pointerdown', (e) => {
                if (isWaxStamping) return;
                if (!isWaxPoured) {
                    if (startBtn) startBtn.click();
                    return;
                }
                isDraggingStamp = true;
                hasMovedStamp = false;
                stampStartX = e.clientX;
                stampStartY = e.clientY;
                waxStampEl.setPointerCapture(e.pointerId);
                waxStampEl.classList.add('dragging');
            });

            waxStampEl.addEventListener('pointermove', (e) => {
                if (!isDraggingStamp || isWaxStamping) return;
                const dx = e.clientX - stampStartX;
                const dy = e.clientY - stampStartY;
                if (Math.hypot(dx, dy) > 5) hasMovedStamp = true;
                waxStampEl.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.15)`;

                const sR = waxStampEl.getBoundingClientRect();
                const tR = waxTargetZoneEl.getBoundingClientRect();
                const dist = Math.hypot((sR.left + sR.width / 2) - (tR.left + tR.width / 2), (sR.top + sR.height / 2) - (tR.top + tR.height / 2));
                if (dist < 70) waxTargetZoneEl.classList.add('drag-over');
                else waxTargetZoneEl.classList.remove('drag-over');
            });

            const handleStampPointerEnd = (e) => {
                if (!isDraggingStamp) return;
                isDraggingStamp = false;
                try { waxStampEl.releasePointerCapture(e.pointerId); } catch (_) {}
                waxStampEl.classList.remove('dragging');

                const isOver = waxTargetZoneEl.classList.contains('drag-over');
                waxTargetZoneEl.classList.remove('drag-over');

                if (isOver || !hasMovedStamp) {
                    performWaxSealStamp(() => startGardenAwakeningTransition(window.currentUserName));
                } else {
                    waxStampEl.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                    waxStampEl.style.transform = '';
                    setTimeout(() => waxStampEl.style.transition = '', 350);
                }
            };

            waxStampEl.addEventListener('pointerup', handleStampPointerEnd);
            waxStampEl.addEventListener('pointercancel', handleStampPointerEnd);
        }

        // Name input letterpress triggers
        if (nameInputEl) {
            const triggerMusic = () => {
                if (typeof window.startGateMusicLow === 'function') window.startGateMusicLow();
            };
            nameInputEl.addEventListener('focus', triggerMusic);
            nameInputEl.addEventListener('input', (e) => {
                triggerMusic();
                updateLetterpressDisplay(e.target.value);
            });
            nameInputEl.addEventListener('keydown', (e) => {
                triggerMusic();
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (startBtn) startBtn.click();
                }
            });
        }

        // Initial setup
        setRitualStep(1);
        resetCrestMotif();
    };

    // Public API
    window.initWaxSealCeremony = initWaxSealCeremony;
    window.completePuzzle = completePuzzle;
    window.startGardenAwakeningTransition = startGardenAwakeningTransition;
    window.performWaxSealStamp = performWaxSealStamp;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWaxSealCeremony);
    } else {
        initWaxSealCeremony();
    }
})();
