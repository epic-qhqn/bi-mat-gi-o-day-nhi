/**
 * CELESTIAL WEATHER ORRERY 360° ENGINE (PHASE 4 - ZERO-LAG 120FPS & HARMONIC WAYFINDING)
 * Antique brass astrolabe armillary dial in the sky canopy.
 * 360° pointer needle arm with sunstone head & crescent counterweight tail.
 * 4 astrological seasons (Spring Dew, Summer Solstice, Autumn Breeze, Aurora Night).
 * Butter-smooth 60/120fps requestAnimationFrame lerp, inertia momentum physics,
 * cached-rect layout optimization, 4 Celestial Resonance bearings & Center Jewel Symphony.
 */
(function() {
    'use strict';

    const celestialOrreryEl = document.getElementById('celestial-weather-orrery');
    const orreryFrameEl = document.getElementById('orrery-frame');
    const orreryPointerArmEl = document.getElementById('orrery-pointer-arm');
    const orreryCenterJewelEl = document.getElementById('orrery-center-jewel');
    const orreryStatusBadgeEl = document.getElementById('orrery-status-badge');
    const orrerySeasonIconEl = document.getElementById('orrery-season-icon');
    const orrerySeasonTextEl = document.getElementById('orrery-season-text');
    const orreryDegreeValEl = document.getElementById('orrery-degree-val');
    const orreryLodestarBtnEl = document.getElementById('orrery-lodestar-btn');
    const orreryCollapseBtnEl = document.getElementById('orrery-collapse-btn');
    const lodestarSeasonPipEl = document.getElementById('lodestar-season-pip');

    let currentOrreryDeg = 45; // Starts at 45° (Spring Dew)
    let targetOrreryDeg = 45;
    let renderedOrreryDeg = 45;
    let isDraggingOrrery = false;
    let currentOrrerySeasonKey = 'spring';

    // Physics & Inertia
    let cachedCenter = null;
    let lastPointerTime = 0;
    let lastPointerDeg = 45;
    let angularVelocity = 0;
    let inertiaRaf = null;
    let renderRaf = null;

    // Throttling weather triggers during fast rotations
    let lastClimateTriggerTime = 0;
    let pendingClimateSeason = null;
    let climateThrottleTimer = null;

    // 4 Celestial Resonance Bearings (Kinh độ kỳ diệu)
    const CELESTIAL_RESONANCES = [
        { deg: 45, name: 'Sương Mai Thức Tỉnh', quote: 'Sương mai đọng lá biếc, mầm xanh ngập tràn sức sống! 🌸💧' },
        { deg: 135, name: 'Hạ Chí Vàng Kim', quote: 'Nắng hạ chiếu chan hòa, tình yêu bừng sắc thắm! ☀️🌾' },
        { deg: 225, name: 'Gió Mùa Trăng Thu', quote: 'Gió thu vờn hoa cúc, gửi trao nụ cười dịu dàng! 🍃🌼' },
        { deg: 315, name: 'Bắc Đẩu Dạ Nguyệt', quote: 'Vạn tinh tú phương Bắc dẫn lối ước nguyện thành đôi! 🌌✨' }
    ];
    let lastResonatedBearing = -1;

    // Direction-zone audio: state machine with lockout
    const ZONE_LOCK_MS = 200;
    const zoneSound = typeof window.createZoneSoundTrigger === 'function'
        ? window.createZoneSoundTrigger({ lockMs: ZONE_LOCK_MS, play: (zoneKey, opts) => window.playOrreryZoneTrack(zoneKey, opts) })
        : { enter: () => 'silent', isLocked: () => false };

    const ORRERY_SEASONS = {
        spring: {
            key: 'spring',
            name: 'Mưa Sương Mai',
            icon: '🌧️',
            minDeg: 0,
            maxDeg: 90,
            centerDeg: 45,
            color: '#38bdf8'
        },
        summer: {
            key: 'summer',
            name: 'Nắng Hạ Chí',
            icon: '☀️',
            minDeg: 90,
            maxDeg: 180,
            centerDeg: 135,
            color: '#f59e0b'
        },
        autumn: {
            key: 'autumn',
            name: 'Gió Thu Khởi Sắc',
            icon: '🍃',
            minDeg: 180,
            maxDeg: 270,
            centerDeg: 225,
            color: '#10b981'
        },
        aurora: {
            key: 'aurora',
            name: 'Cực Quang Tinh Tú',
            icon: '🌌',
            minDeg: 270,
            maxDeg: 360,
            centerDeg: 315,
            color: '#818cf8'
        }
    };

    const getOrrerySeasonByDeg = (deg) => {
        const norm = ((deg % 360) + 360) % 360;
        if (norm >= 0 && norm < 90) return ORRERY_SEASONS.spring;
        if (norm >= 90 && norm < 180) return ORRERY_SEASONS.summer;
        if (norm >= 180 && norm < 270) return ORRERY_SEASONS.autumn;
        return ORRERY_SEASONS.aurora;
    };

    // Helper: update Center Coordinates cache on pointer down or resize (zero layout thrashing)
    const updateCachedCenter = () => {
        if (!orreryFrameEl) return;
        const rect = orreryFrameEl.getBoundingClientRect();
        cachedCenter = {
            cx: rect.left + rect.width / 2,
            cy: rect.top + rect.height / 2
        };
    };

    // =========================================================================
    // 60/120FPS REQUEST ANIMATION FRAME RENDERING & LERP
    // =========================================================================
    const renderTick = () => {
        if (isDraggingOrrery) {
            // Direct responsive follow with micro-smoothing
            let diff = targetOrreryDeg - renderedOrreryDeg;
            // Shortest rotational path
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;

            renderedOrreryDeg += diff * 0.42;
            renderedOrreryDeg = ((renderedOrreryDeg % 360) + 360) % 360;

            applyAngleToDOM(renderedOrreryDeg);
        }

        renderRaf = requestAnimationFrame(renderTick);
    };

    const applyAngleToDOM = (normDeg) => {
        currentOrreryDeg = normDeg;

        if (orreryPointerArmEl) {
            orreryPointerArmEl.style.setProperty('--orrery-deg', `${normDeg.toFixed(2)}deg`);
            orreryPointerArmEl.setAttribute('aria-valuenow', Math.round(normDeg));
        }

        if (orreryFrameEl) {
            orreryFrameEl.style.setProperty('--orrery-deg', `${normDeg.toFixed(2)}deg`);
        }

        const season = getOrrerySeasonByDeg(normDeg);
        currentOrrerySeasonKey = season.key;

        // Active Quadrant Highlight
        const quadrants = document.querySelectorAll('.orrery-quadrant');
        quadrants.forEach(q => {
            if (q.dataset.quadrant === season.key) {
                q.classList.add('is-active');
            } else {
                q.classList.remove('is-active');
            }
        });

        // Degree readout
        if (orrerySeasonIconEl) orrerySeasonIconEl.textContent = season.icon;
        if (orrerySeasonTextEl) orrerySeasonTextEl.textContent = season.name;
        if (orreryDegreeValEl) orreryDegreeValEl.textContent = `${Math.round(normDeg)}°`;
        if (lodestarSeasonPipEl) lodestarSeasonPipEl.textContent = season.icon;

        if (orreryStatusBadgeEl) {
            orreryStatusBadgeEl.style.borderColor = `${season.color}66`;
            orreryStatusBadgeEl.style.boxShadow = `0 4px 18px ${season.color}33`;
        }

        // Check for Celestial Resonance Bearings (within ±4.5°)
        checkCelestialResonance(normDeg);
    };

    // Check secret harmonic bearings
    const checkCelestialResonance = (normDeg) => {
        let matchedBearing = -1;
        for (let i = 0; i < CELESTIAL_RESONANCES.length; i++) {
            const b = CELESTIAL_RESONANCES[i];
            const dist = Math.abs(normDeg - b.deg);
            if (dist <= 4.5 || dist >= 355.5) {
                matchedBearing = i;
                break;
            }
        }

        if (matchedBearing !== -1 && matchedBearing !== lastResonatedBearing) {
            lastResonatedBearing = matchedBearing;
            const b = CELESTIAL_RESONANCES[matchedBearing];

            if (orreryCenterJewelEl) orreryCenterJewelEl.classList.add('resonant');

            if (typeof window.playOrreryTickSFX === 'function') {
                window.playOrreryTickSFX(true);
            }

            if (typeof window.showMascotSpeech === 'function' && Math.random() < 0.6) {
                window.showMascotSpeech(`✦ Phương Vị ${b.name}: ${b.quote}`, 3600);
            }
        } else if (matchedBearing === -1 && lastResonatedBearing !== -1) {
            lastResonatedBearing = -1;
            if (orreryCenterJewelEl) orreryCenterJewelEl.classList.remove('resonant');
        }
    };

    const scheduleClimateShift = (seasonKey, angleDeg, options = {}) => {
        const now = Date.now();
        const { force = false, playSound = true, triggerTransition = false, glide = false } = options;

        pendingClimateSeason = seasonKey;

        // Ensure zone audio outcome is checked
        const outcome = zoneSound.enter(seasonKey, {
            replay: triggerTransition,
            silent: !playSound,
            glide
        });

        // If force (on pointer up or click) or sufficient time passed, trigger immediately
        if (force || now - lastClimateTriggerTime > 260) {
            lastClimateTriggerTime = now;
            clearTimeout(climateThrottleTimer);
            handleOrreryClimateShift(seasonKey, angleDeg, { userTriggered: outcome === 'replayed', playSound });
        } else {
            clearTimeout(climateThrottleTimer);
            climateThrottleTimer = setTimeout(() => {
                lastClimateTriggerTime = Date.now();
                handleOrreryClimateShift(pendingClimateSeason, angleDeg, { userTriggered: outcome === 'replayed', playSound });
            }, 180);
        }
    };

    const setOrreryAngle = (deg, options = {}) => {
        const {
            smooth = false,
            playSound = true,
            triggerTransition = false,
            glide = false
        } = options;

        const norm = ((deg % 360) + 360) % 360;
        targetOrreryDeg = norm;

        if (smooth) {
            if (orreryPointerArmEl) {
                orreryPointerArmEl.style.transition = 'transform 0.4s cubic-bezier(0.18, 0.9, 0.32, 1.15)';
                setTimeout(() => {
                    if (!isDraggingOrrery && orreryPointerArmEl) orreryPointerArmEl.style.transition = '';
                }, 420);
            }
            renderedOrreryDeg = norm;
            applyAngleToDOM(norm);
        } else {
            if (!isDraggingOrrery) {
                renderedOrreryDeg = norm;
                applyAngleToDOM(norm);
            }
        }

        const season = getOrrerySeasonByDeg(norm);
        scheduleClimateShift(season.key, norm, { force: smooth, playSound, triggerTransition, glide });
    };

    // =========================================================================
    // REAL-TIME CLIMATE SHIFT & PLANT GROWTH ENGINE
    // =========================================================================
    let activeClimateSeason = null;

    const getSeedOrSproutCenter = () => (
        typeof window.getSeedOrSproutCenter === 'function'
            ? window.getSeedOrSproutCenter()
            : { x: window.innerWidth / 2, y: Math.min(window.innerHeight * 0.65, window.innerHeight - 150) }
    );

    const triggerOrrerySpringDew = () => {
        if (window.WeatherFX) window.WeatherFX.rain({ target: getSeedOrSproutCenter() });
        const miniRainbow = document.getElementById('mini-rainbow-layer');
        if (miniRainbow) {
            miniRainbow.classList.add('visible');
            setTimeout(() => {
                if (miniRainbow) miniRainbow.classList.remove('visible');
            }, 3500);
        }
    };

    const triggerOrrerySummerSun = () => {
        const target = getSeedOrSproutCenter();
        const pollenLayer = document.getElementById('golden-pollen-layer') || document.body;

        let focusedRay = document.querySelector('.sunbeam-focused');
        if (!focusedRay) {
            focusedRay = document.createElement('div');
            focusedRay.className = 'sunbeam-focused';
            pollenLayer.appendChild(focusedRay);
        }
        focusedRay.style.left = `${target.x}px`;
        focusedRay.classList.add('active');
        setTimeout(() => {
            if (focusedRay) focusedRay.classList.remove('active');
        }, 3200);

        if (window.WeatherFX) window.WeatherFX.sunlight({ target, holdMs: 3200 });
    };

    const triggerOrreryAutumnBreeze = () => {
        if (window.WeatherFX) window.WeatherFX.breeze();
    };

    let harpTimers = [];
    const cancelHarp = () => { harpTimers.forEach(clearTimeout); harpTimers = []; };
    const pluckHarp = (notes) => {
        if (typeof window.pluckHarpStringByIndex !== 'function') return;
        notes.forEach(([stringIndex, delayMs]) => {
            harpTimers.push(setTimeout(() => window.pluckHarpStringByIndex(stringIndex), delayMs));
        });
    };

    const handleOrreryClimateShift = (seasonKey, angleDeg, options = {}) => {
        const { userTriggered = false, playSound = true } = options;
        const isSeasonChanged = seasonKey !== activeClimateSeason;

        if (!isSeasonChanged && !userTriggered) return;
        activeClimateSeason = seasonKey;

        cancelHarp();
        const pluckHarpIfAudible = playSound ? pluckHarp : () => {};
        const isReadable = document.body.classList.contains('readable-font');

        // 1. Shift Ambient Sky Color Gradient
        const seasonSkyClasses = {
            spring: 'sky-dawn',
            summer: 'sky-day',
            autumn: 'sky-dusk',
            aurora: 'sky-night'
        };

        const targetSkyClass = seasonSkyClasses[seasonKey] || 'sky-day';
        document.body.className = targetSkyClass;
        if (isReadable) document.body.classList.add('readable-font');

        // 2. Audio & Visual VFX
        const gardenMsg = document.getElementById('garden-message');
        const state = window.gardenState || { currentStage: 0 };

        if (seasonKey === 'spring') {
            triggerOrrerySpringDew();
            pluckHarpIfAudible([[1, 200], [3, 500]]);

            if (state.currentStage <= 2 && !state.isWatered) {
                state.isWatered = true;
                if (gardenMsg) gardenMsg.textContent = "🌸 Vòng xoay Thiên văn Mùa Xuân: Mưa sương mai tắm mát chồi non!";
                if (typeof window.triggerMascotWatering === 'function') window.triggerMascotWatering();
                if (typeof window.showMascotSpeech === 'function') {
                    window.showMascotSpeech("Mưa xuân tắm mát mầm non rồi kìa! 🌧️✨", 3500);
                }
                if (typeof window.checkGrowth === 'function') {
                    setTimeout(() => window.checkGrowth(), 600);
                }
            } else if (gardenMsg) {
                gardenMsg.textContent = "🌧️ Mùa Xuân: Mưa sương mai mát lành đang rơi...";
            }
        }
        else if (seasonKey === 'summer') {
            triggerOrrerySummerSun();
            pluckHarpIfAudible([[2, 200], [4, 500]]);

            if (state.currentStage <= 2 && !state.isFertilized) {
                state.isFertilized = true;
                if (gardenMsg) gardenMsg.textContent = "☀️ Vòng xoay Thiên văn Mùa Hạ: Nắng ấm ban mai sưởi ấm mầm cây!";
                if (typeof window.triggerMascotFertilizing === 'function') window.triggerMascotFertilizing();
                if (typeof window.showMascotSpeech === 'function') {
                    window.showMascotSpeech("Nắng ấm vàng ươm giúp cây lớn nhanh quá! ☀️🌸", 3500);
                }
                if (typeof window.checkGrowth === 'function') {
                    setTimeout(() => window.checkGrowth(), 600);
                }
            } else if (gardenMsg) {
                gardenMsg.textContent = "☀️ Mùa Hạ: Ánh nắng ấm chan hòa khắp khu vườn...";
            }
        }
        else if (seasonKey === 'autumn') {
            triggerOrreryAutumnBreeze();
            pluckHarpIfAudible([[0, 180], [2, 480]]);

            if (gardenMsg) {
                gardenMsg.textContent = "🍃 Vòng xoay Thiên văn Mùa Thu: Gió thu khẽ hát ru ngàn lá biếc...";
            }
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Gió mùa thu mát rượi và êm dịu ghê! 🍂🌾", 3000);
            }
        }
        else if (seasonKey === 'aurora') {
            pluckHarpIfAudible([[3, 180], [4, 480]]);

            if (gardenMsg) {
                gardenMsg.textContent = "🌌 Vòng xoay Cực Quang: Bầu trời đêm lung linh vạn vì sao!";
            }
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Cực quang trên bầu trời đêm huyền ảo quá! 🌌✨", 3200);
            }
        }
    };

    window.handleOrreryClimateShift = handleOrreryClimateShift;

    // =========================================================================
    // HÒA ĐIỆU THIÊN HÀ (CENTER ASTROLABE JEWEL SYMPHONY)
    // =========================================================================
    const triggerCelestialJewelSymphony = () => {
        if (!orreryCenterJewelEl) return;

        orreryCenterJewelEl.classList.add('pulsing');
        setTimeout(() => orreryCenterJewelEl.classList.remove('pulsing'), 900);

        // Phát chuỗi hợp âm ngân nga C5 -> D5 -> E5 -> G5 -> A5
        if (typeof window.triggerHarpStringGlissando === 'function') {
            window.triggerHarpStringGlissando('up', 95);
        } else if (typeof window.playMelodicHarpChime === 'function') {
            [0, 1, 2, 3, 4].forEach((idx, step) => {
                setTimeout(() => window.playMelodicHarpChime(idx), step * 95);
            });
        }

        // Bắn pháo hoa tinh tú quanh la bàn
        createLodestarPuff();

        // Chú bé vui sướng
        if (typeof window.showMascotSpeech === 'function') {
            window.showMascotSpeech("Hòa Điệu Thiên Hà ngân vang! Chúc bạn 20/10 vạn điều may mắn! (⁄ ⁄•⁄ω⁄•⁄ ⁄) ♡", 4000);
        }
        if (typeof window.triggerMascotCelebrate === 'function') {
            window.triggerMascotCelebrate();
        }
    };

    // =========================================================================
    // CELESTIAL LODESTAR MINIMIZE & EXPAND ENGINE
    // =========================================================================
    const createLodestarPuff = () => {
        if (!celestialOrreryEl) return;
        const rect = celestialOrreryEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const particleCount = 10;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'lodestar-sparkle-puff';
            const angle = (i / particleCount) * Math.PI * 2;
            const dist = 20 + Math.random() * 28;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            document.body.appendChild(particle);
            setTimeout(() => {
                if (particle.parentNode) particle.parentNode.removeChild(particle);
            }, 650);
        }
    };

    const minimizeCelestialOrrery = (options = {}) => {
        if (!celestialOrreryEl) return;
        const { silent = false } = options;
        if (celestialOrreryEl.classList.contains('orrery-minimized')) return;

        celestialOrreryEl.classList.add('orrery-minimized');
        createLodestarPuff();

        if (lodestarSeasonPipEl && ORRERY_SEASONS[currentOrrerySeasonKey]) {
            lodestarSeasonPipEl.textContent = ORRERY_SEASONS[currentOrrerySeasonKey].icon;
        }

        if (!silent && typeof window.playMelodicHarpChime === 'function') {
            window.playMelodicHarpChime(3);
        }
    };

    const expandCelestialOrrery = (options = {}) => {
        if (!celestialOrreryEl) return;
        const { silent = false } = options;
        if (!celestialOrreryEl.classList.contains('orrery-minimized')) return;

        celestialOrreryEl.classList.remove('orrery-minimized');
        createLodestarPuff();

        if (!silent && typeof window.playMelodicHarpChime === 'function') {
            window.playMelodicHarpChime(1);
        }
    };

    const toggleCelestialOrrery = () => {
        if (!celestialOrreryEl) return;
        if (celestialOrreryEl.classList.contains('orrery-minimized')) {
            expandCelestialOrrery();
        } else {
            minimizeCelestialOrrery();
        }
    };

    // =========================================================================
    // INITIALIZATION & OPTIMIZED POINTER GESTURES
    // =========================================================================
    const initCelestialOrrery = () => {
        if (!orreryFrameEl) return;

        updateCachedCenter();
        window.addEventListener('resize', updateCachedCenter, { passive: true });
        window.addEventListener('scroll', updateCachedCenter, { passive: true });

        // Khởi động RAF loop
        if (!renderRaf) {
            renderRaf = requestAnimationFrame(renderTick);
        }

        setOrreryAngle(45, { smooth: false, playSound: false });

        // Tối ưu: O(1) toán học thuần túy, không getBoundingClientRect() khi move
        const calcAngleFromPointer = (clientX, clientY) => {
            if (!cachedCenter) updateCachedCenter();
            const cx = cachedCenter.cx;
            const cy = cachedCenter.cy;
            const rad = Math.atan2(clientY - cy, clientX - cx);
            return ((rad * 180 / Math.PI) + 90 + 360) % 360;
        };

        const onPointerDown = (e) => {
            if (e.button !== undefined && e.button !== 0) return;
            // Stop inertia animation
            if (inertiaRaf) {
                cancelAnimationFrame(inertiaRaf);
                inertiaRaf = null;
            }

            updateCachedCenter();
            isDraggingOrrery = true;
            angularVelocity = 0;
            lastPointerTime = performance.now();

            if (celestialOrreryEl) celestialOrreryEl.classList.add('is-dragging');
            try { orreryFrameEl.setPointerCapture(e.pointerId); } catch (_) {}

            const deg = calcAngleFromPointer(e.clientX, e.clientY);
            targetOrreryDeg = deg;
            lastPointerDeg = deg;

            setOrreryAngle(deg, { smooth: false, playSound: true, triggerTransition: true });
        };

        const onPointerMove = (e) => {
            if (!isDraggingOrrery) return;

            const deg = calcAngleFromPointer(e.clientX, e.clientY);
            targetOrreryDeg = deg;

            // Tính vận tốc góc để tạo quán tính xoay khi thả tay
            const now = performance.now();
            const dt = Math.max(1, now - lastPointerTime);
            let dDeg = deg - lastPointerDeg;
            if (dDeg > 180) dDeg -= 360;
            if (dDeg < -180) dDeg += 360;

            angularVelocity = (dDeg / dt) * 16.6; // normalized to 60fps frame
            lastPointerDeg = deg;
            lastPointerTime = now;

            // Xoay nhẹ nhàng, âm thanh và hiệu ứng được quản lý bởi scheduleClimateShift
            const season = getOrrerySeasonByDeg(deg);
            scheduleClimateShift(season.key, deg, { force: false, playSound: true, triggerTransition: false });
        };

        const onPointerUp = (e) => {
            if (isDraggingOrrery) {
                isDraggingOrrery = false;
                if (celestialOrreryEl) celestialOrreryEl.classList.remove('is-dragging');
                try { orreryFrameEl.releasePointerCapture(e.pointerId); } catch (_) {}

                // Quán tính trượt (Inertia Momentum)
                if (Math.abs(angularVelocity) > 1.2) {
                    const runInertia = () => {
                        angularVelocity *= 0.92;
                        targetOrreryDeg = ((targetOrreryDeg + angularVelocity) % 360 + 360) % 360;
                        renderedOrreryDeg = targetOrreryDeg;
                        applyAngleToDOM(targetOrreryDeg);

                        if (Math.abs(angularVelocity) > 0.15) {
                            inertiaRaf = requestAnimationFrame(runInertia);
                        } else {
                            // Settle and snap softly
                            angularVelocity = 0;
                            const currentSeason = getOrrerySeasonByDeg(targetOrreryDeg);
                            scheduleClimateShift(currentSeason.key, targetOrreryDeg, { force: true, playSound: true });
                            if (!zoneSound.isLocked() && typeof window.playOrreryTickSFX === 'function') {
                                window.playOrreryTickSFX(true);
                            }
                        }
                    };
                    inertiaRaf = requestAnimationFrame(runInertia);
                } else {
                    const currentSeason = getOrrerySeasonByDeg(targetOrreryDeg);
                    scheduleClimateShift(currentSeason.key, targetOrreryDeg, { force: true, playSound: true });
                    if (!zoneSound.isLocked() && typeof window.playOrreryTickSFX === 'function') {
                        window.playOrreryTickSFX(true);
                    }
                }
            }
        };

        orreryFrameEl.addEventListener('pointerdown', onPointerDown);
        orreryFrameEl.addEventListener('pointermove', onPointerMove);
        orreryFrameEl.addEventListener('pointerup', onPointerUp);
        orreryFrameEl.addEventListener('pointercancel', onPointerUp);

        // Nút ngọc trung tâm: Hòa Điệu Thiên Hà
        if (orreryCenterJewelEl) {
            orreryCenterJewelEl.addEventListener('click', (e) => {
                e.stopPropagation();
                triggerCelestialJewelSymphony();
            });
            orreryCenterJewelEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    triggerCelestialJewelSymphony();
                }
            });
        }

        // Bàn phím điều hướng
        const onKeyDown = (e) => {
            let delta = 0;
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                delta = 15;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                delta = -15;
            } else if (e.key === 'Home') {
                delta = -currentOrreryDeg;
            } else if (e.key === 'End') {
                delta = 360 - currentOrreryDeg;
            }

            if (delta !== 0) {
                e.preventDefault();
                const newDeg = ((currentOrreryDeg + delta) % 360 + 360) % 360;
                setOrreryAngle(newDeg, { smooth: true, playSound: true, triggerTransition: false });
            }
        };

        orreryFrameEl.addEventListener('keydown', onKeyDown);

        // Nhấp vào góc phân vị mùa
        const quadrants = document.querySelectorAll('.orrery-quadrant');
        quadrants.forEach(q => {
            const onQuadrantClick = (e) => {
                e.stopPropagation();
                const seasonKey = q.dataset.quadrant;
                const seasonData = ORRERY_SEASONS[seasonKey];
                if (seasonData) {
                    setOrreryAngle(seasonData.centerDeg, { smooth: true, playSound: true, triggerTransition: true, glide: true });
                }
            };

            q.addEventListener('click', onQuadrantClick);
            q.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onQuadrantClick(e);
                }
            });
        });

        // Lodestar nút thu gọn / mở rộng
        if (orreryLodestarBtnEl) {
            orreryLodestarBtnEl.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                expandCelestialOrrery();
            });
            orreryLodestarBtnEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    expandCelestialOrrery();
                }
            });
        }

        if (orreryCollapseBtnEl) {
            orreryCollapseBtnEl.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                minimizeCelestialOrrery();
            });
            orreryCollapseBtnEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    minimizeCelestialOrrery();
                }
            });
        }
    };

    // Public API
    window.initCelestialOrrery = initCelestialOrrery;
    window.setOrreryAngle = setOrreryAngle;
    window.getOrrerySeasonByDeg = getOrrerySeasonByDeg;
    window.ORRERY_SEASONS = ORRERY_SEASONS;
    window.minimizeCelestialOrrery = minimizeCelestialOrrery;
    window.expandCelestialOrrery = expandCelestialOrrery;
    window.toggleCelestialOrrery = toggleCelestialOrrery;
    window.triggerCelestialJewelSymphony = triggerCelestialJewelSymphony;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCelestialOrrery);
    } else {
        initCelestialOrrery();
    }
})();
