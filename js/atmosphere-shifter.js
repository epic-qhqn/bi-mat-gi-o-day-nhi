/**
 * LIVING ATMOSPHERE & CLIMATE SHIFTER ENGINE (PHASE 3.1 & 3.2)
 * Natural cloud & sunbeam shifter tokens, summer rain wash, golden pollen,
 * and terrarium touch ASMR (double-tap dewdrop condensation, circular root warmth).
 */
(function() {
    'use strict';

    const cloudShifterEl = document.getElementById('atmosphere-cloud-shifter');
    const sunShifterEl = document.getElementById('atmosphere-sun-shifter');
    const livingHudEl = document.getElementById('living-atmosphere-hud');
    const summerRainLayerEl = document.getElementById('summer-rain-layer');
    const miniRainbowLayerEl = document.getElementById('mini-rainbow-layer');
    const goldenPollenLayerEl = document.getElementById('golden-pollen-layer');

    const terrariumSurfaceEl = document.getElementById('terrarium-touch-surface');
    const terrariumVortexLayerEl = document.getElementById('terrarium-vortex-layer');
    const rootWarmthLayerEl = document.getElementById('root-warmth-layer');

    let isAtmosphereRaining = false;
    let isAtmosphereSunbeaming = false;

    let lastTerrariumTapTime = 0;
    let lastTerrariumTapPos = { x: 0, y: 0 };
    let isRubbingRoots = false;
    let lastRubAngle = 0;
    let cumulativeRubAngle = 0;
    let rubStartTimestamp = 0;

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

    // 1. Summer Rain Shower Action
    const triggerAtmosphereRain = () => {
        if (isAtmosphereRaining) return;
        isAtmosphereRaining = true;

        const target = getSeedOrSproutCenter();

        // Glide cloud gently towards seed center
        if (cloudShifterEl) {
            cloudShifterEl.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            const rect = cloudShifterEl.getBoundingClientRect();
            const targetOffset = target.x - (rect.left + rect.width / 2);
            cloudShifterEl.style.transform = `translate3d(${targetOffset}px, 20px, 0) scale(1.15)`;
        }

        if (typeof window.playSummerRainSFX === 'function') window.playSummerRainSFX();

        setTimeout(() => { if (typeof window.pluckHarpStringByIndex === 'function') window.pluckHarpStringByIndex(1); }, 300);
        setTimeout(() => { if (typeof window.pluckHarpStringByIndex === 'function') window.pluckHarpStringByIndex(3); }, 650);
        setTimeout(() => { if (typeof window.pluckHarpStringByIndex === 'function') window.pluckHarpStringByIndex(4); }, 1050);

        if (typeof window.triggerMascotWatering === 'function') window.triggerMascotWatering();

        if (summerRainLayerEl) {
            const streakCount = window.isLowEndDevice ? 18 : 36;
            for (let i = 0; i < streakCount; i++) {
                setTimeout(() => {
                    const streak = document.createElement('div');
                    streak.className = 'summer-rain-streak';
                    const spreadX = (Math.random() - 0.5) * 160;
                    const startX = target.x + spreadX;
                    const startY = target.y - 140 - Math.random() * 40;
                    streak.style.left = `${startX}px`;
                    streak.style.top = `${startY}px`;
                    streak.style.animationDuration = `${0.35 + Math.random() * 0.15}s`;
                    summerRainLayerEl.appendChild(streak);

                    setTimeout(() => {
                        const splash = document.createElement('div');
                        splash.className = 'rain-splash-ripple';
                        splash.style.left = `${startX + 24}px`;
                        splash.style.top = `${target.y + 10 + (Math.random() - 0.5) * 20}px`;
                        summerRainLayerEl.appendChild(splash);
                        setTimeout(() => {
                            if (splash.parentNode) splash.parentNode.removeChild(splash);
                        }, 600);
                        if (streak.parentNode) streak.parentNode.removeChild(streak);
                    }, 400);
                }, i * 35);
            }
        }

        window.gardenState = window.gardenState || {};
        window.gardenState.isWatered = true;
        const msg = document.getElementById('garden-message');
        if (msg) msg.textContent = "✨ Mưa sương sớm mát lành đã tắm mát cho chồi non!";

        setTimeout(() => {
            if (miniRainbowLayerEl) {
                miniRainbowLayerEl.classList.add('visible');
                setTimeout(() => {
                    if (miniRainbowLayerEl) miniRainbowLayerEl.classList.remove('visible');
                }, 4200);
            }
        }, 850);

        setTimeout(() => {
            if (cloudShifterEl) {
                cloudShifterEl.classList.add('shifter-fading');
                cloudShifterEl.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                cloudShifterEl.style.transform = '';
                setTimeout(() => {
                    cloudShifterEl.classList.add('shifter-completed');
                    cloudShifterEl.style.display = 'none';
                    cloudShifterEl.style.pointerEvents = 'none';
                    cloudShifterEl.style.transition = '';
                    isAtmosphereRaining = false;
                }, 500);
            } else {
                isAtmosphereRaining = false;
            }
            if (typeof window.checkGrowth === 'function') window.checkGrowth();
        }, 1500);
    };

    // 2. Morning Sunbeam Action
    const triggerAtmosphereSunbeam = () => {
        if (isAtmosphereSunbeaming) return;
        isAtmosphereSunbeaming = true;

        const target = getSeedOrSproutCenter();

        if (sunShifterEl) {
            sunShifterEl.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            const rect = sunShifterEl.getBoundingClientRect();
            const targetOffset = target.x - (rect.left + rect.width / 2);
            sunShifterEl.style.transform = `translate3d(${targetOffset}px, 20px, 0) scale(1.18)`;
        }

        if (typeof window.playSunbeamSFX === 'function') window.playSunbeamSFX();
        if (typeof window.triggerMascotFertilizing === 'function') window.triggerMascotFertilizing();

        let focusedRay = document.querySelector('.sunbeam-focused');
        if (!focusedRay) {
            focusedRay = document.createElement('div');
            focusedRay.className = 'sunbeam-focused';
            document.body.appendChild(focusedRay);
        }
        focusedRay.style.left = `${target.x}px`;
        focusedRay.classList.add('active');

        if (goldenPollenLayerEl) {
            const pollenCount = window.isLowEndDevice ? 14 : 28;
            for (let p = 0; p < pollenCount; p++) {
                setTimeout(() => {
                    const pollen = document.createElement('div');
                    pollen.className = 'golden-pollen-particle';
                    goldenPollenLayerEl.appendChild(pollen);

                    const startX = target.x + (Math.random() - 0.5) * 80;
                    const startY = target.y - 120 + (Math.random() - 0.5) * 40;
                    const endAngle = Math.random() * Math.PI * 2;
                    const endRadius = 15 + Math.random() * 50;
                    const endX = target.x + Math.cos(endAngle) * endRadius;
                    const endY = target.y + Math.sin(endAngle) * (endRadius * 0.4);

                    pollen.style.left = `${startX}px`;
                    pollen.style.top = `${startY}px`;

                    const anim = pollen.animate([
                        { transform: 'scale(0.3) rotate(0deg)', opacity: 0 },
                        { transform: `translate(${(endX - startX) * 0.5 + (Math.random() - 0.5) * 50}px, ${(endY - startY) * 0.5}px) scale(1.2) rotate(180deg)`, opacity: 1, offset: 0.4 },
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

        window.gardenState = window.gardenState || {};
        window.gardenState.isFertilized = true;
        const msg = document.getElementById('garden-message');
        if (msg) msg.textContent = "✨ Vệt nắng ấm ban mai và phấn hoa vàng đã tiếp thêm sinh khí!";

        setTimeout(() => {
            if (focusedRay) focusedRay.classList.remove('active');
            if (sunShifterEl) {
                sunShifterEl.classList.add('shifter-fading');
                sunShifterEl.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                sunShifterEl.style.transform = '';
                setTimeout(() => {
                    sunShifterEl.classList.add('shifter-completed');
                    sunShifterEl.style.display = 'none';
                    sunShifterEl.style.pointerEvents = 'none';
                    sunShifterEl.style.transition = '';
                    isAtmosphereSunbeaming = false;
                }, 500);
            } else {
                isAtmosphereSunbeaming = false;
            }
            if (typeof window.checkGrowth === 'function') window.checkGrowth();
        }, 1500);
    };

    // 3. Setup Shifter Gestures
    const setupAtmosphereShifterGestures = (el, onActivate) => {
        if (!el) return;
        let isDragging = false, startX = 0, startY = 0, movedFar = false;

        el.addEventListener('pointerdown', (e) => {
            const state = window.gardenState || {};
            if (el.classList.contains('shifter-completed') && (state.currentStage || 0) === 0) return;
            isDragging = true;
            movedFar = false;
            startX = e.clientX;
            startY = e.clientY;
            el.setPointerCapture(e.pointerId);
            el.classList.add('dragging');
        });

        el.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.hypot(dx, dy) > 8) movedFar = true;
            el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.15)`;
        });

        const handlePointerRelease = (e) => {
            if (!isDragging) return;
            isDragging = false;
            try { el.releasePointerCapture(e.pointerId); } catch (_) {}
            el.classList.remove('dragging');

            const target = getSeedOrSproutCenter();
            const rect = el.getBoundingClientRect();
            const currentCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            const distToTarget = Math.hypot(target.x - currentCenter.x, target.y - currentCenter.y);

            if (distToTarget < 200 || !movedFar) {
                onActivate();
            } else {
                el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.transform = '';
                setTimeout(() => { el.style.transition = ''; }, 400);
            }
        };

        el.addEventListener('pointerup', handlePointerRelease);
        el.addEventListener('pointercancel', handlePointerRelease);
    };

    // 4. Terrarium Touch ASMR
    const triggerDewCondensation = (tapX, tapY) => {
        const target = getSeedOrSproutCenter();

        const vortex = document.createElement('div');
        vortex.className = 'dew-condensation-vortex';
        vortex.style.left = `${tapX}px`;
        vortex.style.top = `${tapY}px`;
        if (terrariumVortexLayerEl) terrariumVortexLayerEl.appendChild(vortex);
        setTimeout(() => { if (vortex.parentNode) vortex.parentNode.removeChild(vortex); }, 600);

        const dew = document.createElement('div');
        dew.className = 'condensed-morning-dew';
        dew.style.left = `${tapX}px`;
        dew.style.top = `${tapY}px`;
        document.body.appendChild(dew);

        const anim = dew.animate([
            { transform: 'translate(-50%, -50%) scale(0.2)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.15)', opacity: 1, offset: 0.25 },
            { transform: `translate(${target.x - tapX}px, ${target.y - tapY}px) scale(0.95)`, opacity: 0.95, offset: 0.88 },
            { transform: `translate(${target.x - tapX}px, ${target.y - tapY}px) scale(0.3)`, opacity: 0, offset: 1.0 }
        ], {
            duration: 750,
            easing: 'cubic-bezier(0.25, 0.9, 0.4, 1)',
            fill: 'forwards'
        });

        anim.onfinish = () => {
            if (dew.parentNode) dew.parentNode.removeChild(dew);

            const ripple = document.createElement('div');
            ripple.className = 'dew-absorb-ripple';
            ripple.style.left = `${target.x}px`;
            ripple.style.top = `${target.y + 10}px`;
            document.body.appendChild(ripple);
            setTimeout(() => { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 750);

            if (typeof window.playDewDropSFX === 'function') window.playDewDropSFX();
            if (typeof window.triggerHarpStringGlissando === 'function') window.triggerHarpStringGlissando('up', 80);
            if (typeof window.triggerMascotWatering === 'function') window.triggerMascotWatering();

            if (cloudShifterEl) {
                cloudShifterEl.classList.add('shifter-fading');
                setTimeout(() => {
                    cloudShifterEl.classList.add('shifter-completed');
                    cloudShifterEl.style.display = 'none';
                    cloudShifterEl.style.pointerEvents = 'none';
                }, 500);
            }

            window.gardenState = window.gardenState || {};
            window.gardenState.isWatered = true;
            const msg = document.getElementById('garden-message');
            if (msg) msg.textContent = "✨ Bạn vừa gõ đúp ngưng tụ hạt sương mai tinh khiết tưới mát cho cây!";
            if (typeof window.checkGrowth === 'function') window.checkGrowth();
        };
    };

    const triggerRootThermalWarmth = (target) => {
        const ring = document.createElement('div');
        ring.className = 'root-thermal-ring';
        ring.style.left = `${target.x}px`;
        ring.style.top = `${target.y + 12}px`;
        if (rootWarmthLayerEl) rootWarmthLayerEl.appendChild(ring);
        setTimeout(() => { if (ring.parentNode) ring.parentNode.removeChild(ring); }, 950);

        const glow = document.createElement('div');
        glow.className = 'root-thermal-glow';
        glow.style.left = `${target.x}px`;
        glow.style.top = `${target.y + 10}px`;
        if (rootWarmthLayerEl) rootWarmthLayerEl.appendChild(glow);
        setTimeout(() => { if (glow.parentNode) glow.parentNode.removeChild(glow); }, 1450);

        for (let i = 0; i < 16; i++) {
            setTimeout(() => {
                const ember = document.createElement('div');
                ember.className = 'warmth-ember-sparkle';
                ember.style.left = `${target.x + (Math.random() - 0.5) * 90}px`;
                ember.style.top = `${target.y + 10 + (Math.random() - 0.5) * 30}px`;
                ember.style.setProperty('--rx', `${(Math.random() - 0.5) * 40}px`);
                if (rootWarmthLayerEl) rootWarmthLayerEl.appendChild(ember);
                setTimeout(() => { if (ember.parentNode) ember.parentNode.removeChild(ember); }, 850);
            }, i * 35);
        }

        if (typeof window.playThermalWarmthSFX === 'function') window.playThermalWarmthSFX();
        if (typeof window.triggerMascotFertilizing === 'function') window.triggerMascotFertilizing();

        if (sunShifterEl) sunShifterEl.classList.add('shifter-completed');

        window.gardenState = window.gardenState || {};
        window.gardenState.isFertilized = true;
        const msg = document.getElementById('garden-message');
        if (msg) msg.textContent = "✨ Hơi ấm từ bàn tay bạn đã sưởi ấm rễ mầm, kích thích cây vươn mình!";
        if (typeof window.checkGrowth === 'function') window.checkGrowth();
    };

    const initAtmosphereShifter = () => {
        setupAtmosphereShifterGestures(cloudShifterEl, triggerAtmosphereRain);
        setupAtmosphereShifterGestures(sunShifterEl, triggerAtmosphereSunbeam);

        if (terrariumSurfaceEl) {
            terrariumSurfaceEl.addEventListener('pointerdown', (e) => {
                const now = Date.now();
                const target = getSeedOrSproutCenter();
                const distToTarget = Math.hypot(e.clientX - target.x, e.clientY - target.y);

                const timeDiff = now - lastTerrariumTapTime;
                const posDist = Math.hypot(e.clientX - lastTerrariumTapPos.x, e.clientY - lastTerrariumTapPos.y);

                if (timeDiff < 380 && posDist < 45) {
                    lastTerrariumTapTime = 0;
                    isRubbingRoots = false;
                    triggerDewCondensation(e.clientX, e.clientY);
                    return;
                }

                lastTerrariumTapTime = now;
                lastTerrariumTapPos = { x: e.clientX, y: e.clientY };

                if (distToTarget < 140) {
                    isRubbingRoots = true;
                    rubStartTimestamp = now;
                    lastRubAngle = Math.atan2(e.clientY - target.y, e.clientX - target.x);
                    cumulativeRubAngle = 0;
                }
            });

            terrariumSurfaceEl.addEventListener('pointermove', (e) => {
                if (!isRubbingRoots) return;
                const target = getSeedOrSproutCenter();
                const distToTarget = Math.hypot(e.clientX - target.x, e.clientY - target.y);

                if (distToTarget > 180) {
                    isRubbingRoots = false;
                    return;
                }

                const currentAngle = Math.atan2(e.clientY - target.y, e.clientX - target.x);
                let delta = currentAngle - lastRubAngle;
                while (delta > Math.PI) delta -= Math.PI * 2;
                while (delta < -Math.PI) delta += Math.PI * 2;
                cumulativeRubAngle += Math.abs(delta);
                lastRubAngle = currentAngle;

                if (Math.random() < 0.35 && rootWarmthLayerEl) {
                    const ember = document.createElement('div');
                    ember.className = 'warmth-ember-sparkle';
                    ember.style.left = `${e.clientX}px`;
                    ember.style.top = `${e.clientY}px`;
                    ember.style.setProperty('--rx', `${(Math.random() - 0.5) * 30}px`);
                    rootWarmthLayerEl.appendChild(ember);
                    setTimeout(() => { if (ember.parentNode) ember.parentNode.removeChild(ember); }, 850);
                }

                if (cumulativeRubAngle >= Math.PI * 1.8 && (Date.now() - rubStartTimestamp) < 3000) {
                    isRubbingRoots = false;
                    triggerRootThermalWarmth(target);
                }
            });

            const handleRubEnd = () => { isRubbingRoots = false; };
            terrariumSurfaceEl.addEventListener('pointerup', handleRubEnd);
            terrariumSurfaceEl.addEventListener('pointercancel', handleRubEnd);
        }
    };

    // Public API
    window.initAtmosphereShifter = initAtmosphereShifter;
    window.triggerAtmosphereRain = triggerAtmosphereRain;
    window.triggerAtmosphereSunbeam = triggerAtmosphereSunbeam;
    window.triggerDewCondensation = triggerDewCondensation;
    window.triggerRootThermalWarmth = triggerRootThermalWarmth;
    window.getSeedOrSproutCenter = getSeedOrSproutCenter;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAtmosphereShifter);
    } else {
        initAtmosphereShifter();
    }
})();
