/**
 * CELESTIAL WEATHER ORRERY 360° ENGINE (PHASE 4.1, 4.2 & 4.3)
 * Antique brass astrolabe armillary dial in the sky canopy.
 * 360° pointer needle arm with sunstone head & crescent counterweight tail.
 * 4 astrological seasons (Spring Dew, Summer Solstice, Autumn Breeze, Aurora Night).
 * Tactile gear escapement tick SFX, dragging, quadrant snapping, and keyboard navigation.
 */
(function() {
    'use strict';

    const celestialOrreryEl = document.getElementById('celestial-weather-orrery');
    const orreryFrameEl = document.getElementById('orrery-frame');
    const orreryPointerArmEl = document.getElementById('orrery-pointer-arm');
    const orreryStatusBadgeEl = document.getElementById('orrery-status-badge');
    const orrerySeasonIconEl = document.getElementById('orrery-season-icon');
    const orrerySeasonTextEl = document.getElementById('orrery-season-text');
    const orreryDegreeValEl = document.getElementById('orrery-degree-val');
    const orreryLodestarBtnEl = document.getElementById('orrery-lodestar-btn');
    const orreryCollapseBtnEl = document.getElementById('orrery-collapse-btn');
    const lodestarSeasonPipEl = document.getElementById('lodestar-season-pip');

    let currentOrreryDeg = 45; // Starts at 45° (Spring Dew / Mưa Sương Mai)
    let lastOrreryTickDeg = 45;
    let isDraggingOrrery = false;
    let currentOrrerySeasonKey = 'spring';

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

    const setOrreryAngle = (deg, options = {}) => {
        const {
            smooth = false,
            playSound = true,
            triggerTransition = false
        } = options;

        const norm = ((deg % 360) + 360) % 360;
        currentOrreryDeg = norm;

        if (orreryPointerArmEl) {
            orreryPointerArmEl.style.setProperty('--orrery-deg', `${norm}deg`);
            orreryPointerArmEl.setAttribute('aria-valuenow', Math.round(norm));
            if (smooth) {
                orreryPointerArmEl.style.transition = 'transform 0.4s cubic-bezier(0.18, 0.9, 0.32, 1.15)';
                setTimeout(() => {
                    if (!isDraggingOrrery && orreryPointerArmEl) orreryPointerArmEl.style.transition = '';
                }, 420);
            }
        }

        if (orreryFrameEl) {
            orreryFrameEl.style.setProperty('--orrery-deg', `${norm}deg`);
        }

        const season = getOrrerySeasonByDeg(norm);
        const seasonChanged = season.key !== currentOrrerySeasonKey;

        if (seasonChanged) {
            currentOrrerySeasonKey = season.key;
            if (playSound && typeof window.playOrreryTickSFX === 'function') {
                window.playOrreryTickSFX(true);
            }
        } else if (playSound && Math.abs(norm - lastOrreryTickDeg) >= 15) {
            lastOrreryTickDeg = norm;
            if (typeof window.playOrreryTickSFX === 'function') {
                window.playOrreryTickSFX(false);
            }
        }

        // Update Quadrant active classes
        const quadrants = document.querySelectorAll('.orrery-quadrant');
        quadrants.forEach(q => {
            if (q.dataset.quadrant === season.key) {
                q.classList.add('is-active');
            } else {
                q.classList.remove('is-active');
            }
        });

        // Update status badge
        if (orrerySeasonIconEl) orrerySeasonIconEl.textContent = season.icon;
        if (orrerySeasonTextEl) orrerySeasonTextEl.textContent = season.name;
        if (orreryDegreeValEl) orreryDegreeValEl.textContent = `${Math.round(norm)}°`;
        if (lodestarSeasonPipEl) lodestarSeasonPipEl.textContent = season.icon;

        if (orreryStatusBadgeEl) {
            orreryStatusBadgeEl.style.borderColor = `${season.color}66`;
            orreryStatusBadgeEl.style.boxShadow = `0 4px 18px ${season.color}33`;
        }

        // Sub-phase 4.2 real-time climate shift
        handleOrreryClimateShift(season.key, norm, { userTriggered: triggerTransition });
    };

    // =========================================================================
    // SUB-PHASE 4.2: REAL-TIME CLIMATE SHIFT & PLANT GROWTH ENGINE
    // =========================================================================
    let activeClimateSeason = null;

    const getSeedOrSproutCenter = () => {
        const seedHint = document.getElementById('seed-hint');
        if (seedHint) {
            const rect = seedHint.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2 + 15
            };
        }
        return {
            x: window.innerWidth / 2,
            y: Math.min(window.innerHeight * 0.65, window.innerHeight - 150)
        };
    };

    const triggerOrrerySpringDew = () => {
        const rainLayer = document.getElementById('summer-rain-layer');
        if (!rainLayer) return;

        const target = getSeedOrSproutCenter();
        const streakCount = 28;
        for (let i = 0; i < streakCount; i++) {
            setTimeout(() => {
                const streak = document.createElement('div');
                streak.className = 'summer-rain-streak';
                const spreadX = (Math.random() - 0.5) * 150;
                const startX = target.x + spreadX;
                const startY = target.y - 130 - Math.random() * 30;
                streak.style.left = `${startX}px`;
                streak.style.top = `${startY}px`;
                streak.style.animationDuration = `${0.35 + Math.random() * 0.15}s`;
                rainLayer.appendChild(streak);

                setTimeout(() => {
                    const splash = document.createElement('div');
                    splash.className = 'rain-splash-ripple';
                    splash.style.left = `${startX + 24}px`;
                    splash.style.top = `${target.y + 10 + (Math.random() - 0.5) * 15}px`;
                    rainLayer.appendChild(splash);
                    setTimeout(() => {
                        if (splash.parentNode) splash.parentNode.removeChild(splash);
                    }, 600);
                    if (streak.parentNode) streak.parentNode.removeChild(streak);
                }, 400);
            }, i * 30);
        }

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

        if (pollenLayer) {
            const pollenCount = 22;
            for (let p = 0; p < pollenCount; p++) {
                setTimeout(() => {
                    const pollen = document.createElement('div');
                    pollen.className = 'golden-pollen-particle';
                    pollenLayer.appendChild(pollen);

                    const startX = target.x + (Math.random() - 0.5) * 70;
                    const startY = target.y - 110 + (Math.random() - 0.5) * 35;
                    const endAngle = Math.random() * Math.PI * 2;
                    const endRadius = 15 + Math.random() * 45;
                    const endX = target.x + Math.cos(endAngle) * endRadius;
                    const endY = target.y + Math.sin(endAngle) * (endRadius * 0.4);

                    pollen.style.left = `${startX}px`;
                    pollen.style.top = `${startY}px`;

                    const anim = pollen.animate([
                        { transform: 'scale(0.3) rotate(0deg)', opacity: 0 },
                        { transform: `translate(${(endX - startX) * 0.5 + (Math.random() - 0.5) * 40}px, ${(endY - startY) * 0.5}px) scale(1.2) rotate(180deg)`, opacity: 1, offset: 0.4 },
                        { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0.6) rotate(360deg)`, opacity: 0 }
                    ], {
                        duration: 1200 + Math.random() * 400,
                        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        fill: 'forwards'
                    });

                    anim.onfinish = () => {
                        if (pollen.parentNode) pollen.parentNode.removeChild(pollen);
                    };
                }, p * 40);
            }
        }
    };

    const triggerOrreryAutumnBreeze = () => {
        let autumnLayer = document.getElementById('autumn-breeze-layer');
        if (!autumnLayer) {
            autumnLayer = document.createElement('div');
            autumnLayer.id = 'autumn-breeze-layer';
            autumnLayer.className = 'autumn-breeze-layer';
            document.body.appendChild(autumnLayer);
        }

        const leafCount = 12;
        const vW = window.innerWidth;
        const vH = window.innerHeight;

        for (let i = 0; i < leafCount; i++) {
            setTimeout(() => {
                const leaf = document.createElement('div');
                leaf.className = 'autumn-leaf-particle';
                const startX = Math.random() * (vW * 0.5);
                const startY = Math.random() * (vH * 0.6);
                leaf.style.left = `${startX}px`;
                leaf.style.top = `${startY}px`;
                leaf.style.animationDuration = `${2.4 + Math.random() * 1.2}s`;
                autumnLayer.appendChild(leaf);

                setTimeout(() => {
                    if (leaf.parentNode) leaf.parentNode.removeChild(leaf);
                }, 3800);
            }, i * 90);
        }
    };

    const handleOrreryClimateShift = (seasonKey, angleDeg, options = {}) => {
        const { userTriggered = false } = options;
        const isSeasonChanged = seasonKey !== activeClimateSeason;

        if (!isSeasonChanged && !userTriggered) return;
        activeClimateSeason = seasonKey;

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
            if (typeof window.playSummerRainSFX === 'function') {
                window.playSummerRainSFX();
            }
            triggerOrrerySpringDew();

            if (typeof window.pluckHarpStringByIndex === 'function') {
                setTimeout(() => window.pluckHarpStringByIndex(1), 200);
                setTimeout(() => window.pluckHarpStringByIndex(3), 500);
            }

            // Growth stimulation: Water the plant
            if (state.currentStage <= 2 && !state.isWatered) {
                state.isWatered = true;
                if (gardenMsg) gardenMsg.textContent = "🌸 Vòng xoay Thiên văn Mùa Xuân: Mưa sương mai tắm mát chồi non!";
                if (typeof window.triggerMascotWatering === 'function') window.triggerMascotWatering();
                if (typeof window.showMascotSpeech === 'function') {
                    window.showMascotSpeech("Mưa xuân tắm mát mầm non rồi kìa! 🤖🌧️✨", 3500);
                }
                if (typeof window.checkGrowth === 'function') {
                    setTimeout(() => window.checkGrowth(), 600);
                }
            } else if (gardenMsg) {
                gardenMsg.textContent = "🌧️ Mùa Xuân: Mưa sương mai mát lành đang rơi...";
            }
        }
        else if (seasonKey === 'summer') {
            if (typeof window.playSunbeamSFX === 'function') {
                window.playSunbeamSFX();
            }
            triggerOrrerySummerSun();

            if (typeof window.pluckHarpStringByIndex === 'function') {
                setTimeout(() => window.pluckHarpStringByIndex(2), 200);
                setTimeout(() => window.pluckHarpStringByIndex(4), 500);
            }

            // Growth stimulation: Fertilize & warm with sun
            if (state.currentStage <= 2 && !state.isFertilized) {
                state.isFertilized = true;
                if (gardenMsg) gardenMsg.textContent = "☀️ Vòng xoay Thiên văn Mùa Hạ: Nắng ấm ban mai sưởi ấm mầm cây!";
                if (typeof window.triggerMascotFertilizing === 'function') window.triggerMascotFertilizing();
                if (typeof window.showMascotSpeech === 'function') {
                    window.showMascotSpeech("Nắng ấm vàng ươm giúp cây lớn nhanh quá! 🤖☀️🌸", 3500);
                }
                if (typeof window.checkGrowth === 'function') {
                    setTimeout(() => window.checkGrowth(), 600);
                }
            } else if (gardenMsg) {
                gardenMsg.textContent = "☀️ Mùa Hạ: Ánh nắng ấm chan hòa khắp khu vườn...";
            }
        }
        else if (seasonKey === 'autumn') {
            if (typeof window.playBreezeSFX === 'function') {
                window.playBreezeSFX();
            }
            triggerOrreryAutumnBreeze();

            if (typeof window.pluckHarpStringByIndex === 'function') {
                setTimeout(() => window.pluckHarpStringByIndex(0), 180);
                setTimeout(() => window.pluckHarpStringByIndex(2), 480);
            }

            if (gardenMsg) {
                gardenMsg.textContent = "🍃 Vòng xoay Thiên văn Mùa Thu: Gió thu khẽ hát ru ngàn lá biếc...";
            }
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Gió mùa thu mát rượi và êm dịu ghê! 🤖🍂", 3000);
            }
        }
        else if (seasonKey === 'aurora') {
            if (typeof window.playChimeSFX === 'function') {
                window.playChimeSFX();
            }

            if (typeof window.pluckHarpStringByIndex === 'function') {
                setTimeout(() => window.pluckHarpStringByIndex(3), 180);
                setTimeout(() => window.pluckHarpStringByIndex(4), 480);
            }

            if (gardenMsg) {
                gardenMsg.textContent = "🌌 Vòng xoay Cực Quang: Bầu trời đêm lung linh vạn vì sao!";
            }
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Cực quang trên bầu trời đêm huyền ảo quá! 🤖🌌✨", 3200);
            }
        }
    };

    window.handleOrreryClimateShift = handleOrreryClimateShift;

    // =========================================================================
    // SUB-PHASE 4.3: CELESTIAL LODESTAR MINIMIZE & EXPAND ENGINE
    // =========================================================================
    const createLodestarPuff = () => {
        if (!celestialOrreryEl) return;
        const rect = celestialOrreryEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const particleCount = 8;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'lodestar-sparkle-puff';
            const angle = (i / particleCount) * Math.PI * 2;
            const dist = 18 + Math.random() * 24;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            document.body.appendChild(particle);
            setTimeout(() => {
                if (particle.parentNode) particle.parentNode.removeChild(particle);
            }, 600);
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

        if (!silent) {
            if (typeof window.playMelodicHarpChime === 'function') {
                window.playMelodicHarpChime(3);
            }
        }
    };

    const expandCelestialOrrery = (options = {}) => {
        if (!celestialOrreryEl) return;
        const { silent = false } = options;
        if (!celestialOrreryEl.classList.contains('orrery-minimized')) return;

        celestialOrreryEl.classList.remove('orrery-minimized');
        createLodestarPuff();

        if (!silent) {
            if (typeof window.playMelodicHarpChime === 'function') {
                window.playMelodicHarpChime(1);
            }
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

    const initCelestialOrrery = () => {
        if (!orreryFrameEl) return;

        setOrreryAngle(45, { smooth: false, playSound: false });

        const calcAngleFromPointer = (clientX, clientY) => {
            const rect = orreryFrameEl.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const rad = Math.atan2(clientY - cy, clientX - cx);
            return ((rad * 180 / Math.PI) + 90 + 360) % 360;
        };

        const onPointerDown = (e) => {
            if (e.button !== undefined && e.button !== 0) return;
            isDraggingOrrery = true;
            if (celestialOrreryEl) celestialOrreryEl.classList.add('is-dragging');
            try { orreryFrameEl.setPointerCapture(e.pointerId); } catch (_) {}

            const deg = calcAngleFromPointer(e.clientX, e.clientY);
            setOrreryAngle(deg, { smooth: false, playSound: true, triggerTransition: true });
        };

        const onPointerMove = (e) => {
            if (!isDraggingOrrery) return;
            const deg = calcAngleFromPointer(e.clientX, e.clientY);
            setOrreryAngle(deg, { smooth: false, playSound: true, triggerTransition: true });
        };

        const onPointerUp = (e) => {
            if (isDraggingOrrery) {
                isDraggingOrrery = false;
                if (celestialOrreryEl) celestialOrreryEl.classList.remove('is-dragging');
                try { orreryFrameEl.releasePointerCapture(e.pointerId); } catch (_) {}
                if (typeof window.playOrreryTickSFX === 'function') {
                    window.playOrreryTickSFX(true);
                }
            }
        };

        orreryFrameEl.addEventListener('pointerdown', onPointerDown);
        orreryFrameEl.addEventListener('pointermove', onPointerMove);
        orreryFrameEl.addEventListener('pointerup', onPointerUp);
        orreryFrameEl.addEventListener('pointercancel', onPointerUp);

        // Keyboard accessibility
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
                setOrreryAngle(newDeg, { smooth: true, playSound: true, triggerTransition: true });
            }
        };

        if (orreryPointerArmEl) {
            orreryPointerArmEl.addEventListener('keydown', onKeyDown);
        }
        orreryFrameEl.addEventListener('keydown', onKeyDown);

        // Quadrant clicks
        const quadrants = document.querySelectorAll('.orrery-quadrant');
        quadrants.forEach(q => {
            const onQuadrantClick = (e) => {
                e.stopPropagation();
                const seasonKey = q.dataset.quadrant;
                const seasonData = ORRERY_SEASONS[seasonKey];
                if (seasonData) {
                    if (typeof window.playOrreryGlideSFX === 'function') {
                        window.playOrreryGlideSFX(seasonKey);
                    }
                    setOrreryAngle(seasonData.centerDeg, { smooth: true, playSound: false, triggerTransition: true });
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
        // Sub-phase 4.3 Lodestar Button & Collapse Button Listeners
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCelestialOrrery);
    } else {
        initCelestialOrrery();
    }
})();
