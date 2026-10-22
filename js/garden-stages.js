/**
 * GARDEN STAGES & PROGRESSION CONTROLLER
 * Lifecycle management for Garden Stages (1: Climate & Sprout, 2: Simon, 3: Constellation, 4: Full Blossom).
 * Stage cleanup ("dùng xong phải biến mất"), stage jumping, and replay selector toolbar.
 */
(function() {
    'use strict';

    window.gardenState = window.gardenState || {
        currentStage: 0,
        isWatered: false,
        isFertilized: false
    };

    const cleanupStage = (stageId) => {
        // Stage 0: Seed Hint
        if (stageId === 0 || stageId === 'all') {
            const seedHint = document.getElementById('seed-hint');
            if (seedHint) {
                seedHint.style.opacity = '0';
                seedHint.style.pointerEvents = 'none';
                seedHint.style.display = 'none';
            }
        }

        // Stage 1 (0): Weather tools & climate shifters
        if (stageId === 0 || stageId === 1 || stageId === 'all') {
            const toolWater = document.getElementById('tool-water');
            if (toolWater) {
                toolWater.style.opacity = '0';
                toolWater.style.pointerEvents = 'none';
                toolWater.style.display = 'none';
            }
            const toolFertilize = document.getElementById('tool-fertilize');
            if (toolFertilize) {
                toolFertilize.style.opacity = '0';
                toolFertilize.style.pointerEvents = 'none';
                toolFertilize.style.display = 'none';
            }
            const cloudShifterEl = document.getElementById('atmosphere-cloud-shifter');
            if (cloudShifterEl) {
                cloudShifterEl.style.opacity = '0';
                cloudShifterEl.style.pointerEvents = 'none';
                cloudShifterEl.classList.add('shifter-completed');
                cloudShifterEl.style.display = 'none';
            }
            const sunShifterEl = document.getElementById('atmosphere-sun-shifter');
            if (sunShifterEl) {
                sunShifterEl.style.opacity = '0';
                sunShifterEl.style.pointerEvents = 'none';
                sunShifterEl.classList.add('shifter-completed');
                sunShifterEl.style.display = 'none';
            }
            const livingHudEl = document.getElementById('living-atmosphere-hud');
            if (livingHudEl) {
                livingHudEl.classList.add('hidden');
                livingHudEl.style.opacity = '0';
                livingHudEl.style.pointerEvents = 'none';
                livingHudEl.style.display = 'none';
            }
            const celestialOrrery = document.getElementById('celestial-weather-orrery');
            if (celestialOrrery && (stageId === 2 || stageId === 3 || stageId === 4)) {
                if (typeof window.minimizeCelestialOrrery === 'function') {
                    window.minimizeCelestialOrrery({ silent: true, auto: true });
                }
            } else if (celestialOrrery && stageId === 'all') {
                celestialOrrery.classList.add('hidden');
                celestialOrrery.style.opacity = '0';
                celestialOrrery.style.pointerEvents = 'none';
                celestialOrrery.style.display = 'none';
            }
            const rainLayer = document.getElementById('summer-rain-layer');
            if (rainLayer) rainLayer.innerHTML = '';
            const pollenLayer = document.getElementById('golden-pollen-layer');
            if (pollenLayer) pollenLayer.innerHTML = '';
            const vortexLayer = document.getElementById('terrarium-vortex-layer');
            if (vortexLayer) vortexLayer.innerHTML = '';
            const rootWarmth = document.getElementById('root-warmth-layer');
            if (rootWarmth) rootWarmth.innerHTML = '';
        }

        // Stage 2 (1): Simon Memory minigame
        if (stageId === 1 || stageId === 2 || stageId === 'all') {
            if (typeof window.duckBgmForMinigame === 'function') {
                window.duckBgmForMinigame(false, 2000);
            }
            const simonContainer = document.getElementById('simon-game');
            if (simonContainer) {
                simonContainer.style.opacity = '0';
                simonContainer.style.pointerEvents = 'none';
                simonContainer.classList.add('hidden');
                simonContainer.style.display = 'none';
                simonContainer.innerHTML = '';
            }
            const simonReplayBtn = document.getElementById('simon-replay-btn');
            if (simonReplayBtn) {
                simonReplayBtn.classList.add('hidden');
                simonReplayBtn.style.display = 'none';
                simonReplayBtn.style.pointerEvents = 'none';
            }
        }

        // Stage 3 (2): Constellation minigame
        if (stageId === 2 || stageId === 3 || stageId === 'all') {
            const constContainer = document.getElementById('constellation-game');
            if (constContainer) {
                constContainer.style.opacity = '0';
                constContainer.style.pointerEvents = 'none';
                constContainer.classList.add('hidden');
                constContainer.style.display = 'none';
                constContainer.querySelectorAll('.star-node').forEach(n => n.remove());
                const linesGroup = document.getElementById('constellation-lines-group');
                if (linesGroup) linesGroup.innerHTML = '';
                const previewLine = document.getElementById('constellation-preview-line');
                if (previewLine) previewLine.style.display = 'none';
            }
            if (typeof window.removeConstellationHint === 'function') window.removeConstellationHint();
            if (typeof window.cleanupConstellationDecoys === 'function') window.cleanupConstellationDecoys();
            document.querySelectorAll('.constellation-hint, #constellation-hint-badge, .decoy-smoke-puff, .decoy-sparkle-ember').forEach(el => el.remove());
        }

        // Clean up stray particles from DOM
        document.querySelectorAll('.water-drop, .vfx-water, .vfx-star, .vfx-brass-dust, .vfx-flower-petal, .awakening-light-seed, .ground-seed-ripple, .root-thermal-ring, .tear-sparkle').forEach(p => p.remove());

        // Stage 4: Áo dài figure & Clover cleanup if resetting
        if (stageId === 1 || stageId === 2 || stageId === 3 || stageId === 'all') {
            const aoDaiFig = document.getElementById('ao-dai-viet-stage4');
            if (aoDaiFig) {
                aoDaiFig.classList.remove('hien-thi', 'poem-visible');
                aoDaiFig.classList.add('hidden');
            }
            if (typeof window.hideSecretLetterButton === 'function') window.hideSecretLetterButton();
            if (typeof window.hideBoardingPassButton === 'function') window.hideBoardingPassButton();
            if (typeof window.closeSecretLetterModal === 'function') window.closeSecretLetterModal();
            if (typeof window.closeBoardingPassModal === 'function') window.closeBoardingPassModal();
            const waxDrawer = document.getElementById('wax-ritual-drawer');
            if (waxDrawer) waxDrawer.classList.add('hidden');

            if (stageId === 3 || stageId === 4 || stageId === 'all') {
                const cloverEl = document.getElementById('sprout-lucky-clover');
                if (cloverEl) {
                    cloverEl.classList.remove('visible');
                    cloverEl.classList.add('hidden');
                }
            }
        }
    };

    const syncGrowthProgressVisual = (activeCount) => {
        const fill = document.getElementById('growth-track-fill');
        if (fill) {
            const pct = activeCount <= 0 ? 0 : (activeCount === 1 ? 33 : (activeCount === 2 ? 66 : 100));
            fill.style.width = `${pct}%`;
        }
        const steps = document.querySelectorAll('.growth-progress .step');
        steps.forEach((s, i) => {
            if (i < activeCount) {
                s.classList.add('active', 'completed');
            } else if (i === activeCount && activeCount > 0) {
                s.classList.add('active');
                s.classList.remove('completed');
            } else {
                s.classList.remove('active', 'completed');
            }
        });
    };

    const syncGardenStageSelector = (stageNum) => {
        const selector = document.getElementById('garden-stage-selector');
        if (!selector) return;
        const sliderIndicator = document.getElementById('stage-slider-indicator');
        const buttons = selector.querySelectorAll('.stage-btn');
        let activeBtn = null;
        buttons.forEach(btn => {
            const isActive = parseInt(btn.dataset.stage, 10) === stageNum;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            if (isActive) activeBtn = btn;
        });

        if (sliderIndicator && activeBtn) {
            const groupEl = activeBtn.parentElement;
            if (groupEl) {
                const groupRect = groupEl.getBoundingClientRect();
                const btnRect = activeBtn.getBoundingClientRect();
                if (groupRect.width > 0) {
                    const offsetLeft = btnRect.left - groupRect.left;
                    sliderIndicator.style.transform = `translateX(${offsetLeft}px)`;
                    sliderIndicator.style.width = `${btnRect.width}px`;
                    sliderIndicator.style.opacity = '1';
                }
            }
        }
    };

    const revealGardenStageSelector = () => {
        const selector = document.getElementById('garden-stage-selector');
        if (!selector) return;
        document.body.classList.add('has-stage-selector');
        selector.classList.remove('hidden');
        syncGardenStageSelector(window.gardenState.currentStage === 3 ? 4 : (window.gardenState.currentStage + 1));
    };

    const jumpToGardenStage = (stageNum) => {
        syncGardenStageSelector(stageNum);
        syncGrowthProgressVisual(Math.max(0, stageNum - 1));
        if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();

        cleanupStage('all');

        const steps = document.querySelectorAll('.growth-progress .step');
        const gardenUI = document.getElementById('garden-ui');
        const gardenMsg = document.getElementById('garden-message');
        const livingHudEl = document.getElementById('living-atmosphere-hud');
        const cloudShifterEl = document.getElementById('atmosphere-cloud-shifter');
        const sunShifterEl = document.getElementById('atmosphere-sun-shifter');
        const toolWater = document.getElementById('tool-water');
        const toolFertilize = document.getElementById('tool-fertilize');
        const mascotCompanion = document.getElementById('garden-mascot-companion');

        if (stageNum === 1 || stageNum === 2 || stageNum === 3) {
            if (mascotCompanion) mascotCompanion.classList.remove('relocated-for-letter');
        }

        if (stageNum === 1) {
            window.gardenState.currentStage = 0;
            window.gardenState.isWatered = false;
            window.gardenState.isFertilized = false;

            if (gardenUI) gardenUI.classList.remove('hidden');
            const celestialOrrery = document.getElementById('celestial-weather-orrery');
            if (celestialOrrery) {
                celestialOrrery.classList.remove('hidden', 'orrery-minimized');
                celestialOrrery.style.display = 'flex';
                celestialOrrery.style.opacity = '1';
                celestialOrrery.style.pointerEvents = 'auto';
            }
            if (livingHudEl) {
                livingHudEl.classList.remove('hidden');
                livingHudEl.style.display = 'flex';
                livingHudEl.style.opacity = '1';
                livingHudEl.style.pointerEvents = 'none';
            }

            if (steps && steps.length >= 3) {
                steps[0].classList.add('active');
                steps[1].classList.remove('active');
                steps[2].classList.remove('active');
            }

            if (cloudShifterEl) {
                cloudShifterEl.classList.remove('shifter-completed', 'shifter-fading');
                cloudShifterEl.style.display = 'flex';
                cloudShifterEl.style.opacity = '1';
                cloudShifterEl.style.pointerEvents = 'auto';
                cloudShifterEl.style.transform = '';
            }
            if (sunShifterEl) {
                sunShifterEl.classList.remove('shifter-completed', 'shifter-fading');
                sunShifterEl.style.display = 'flex';
                sunShifterEl.style.opacity = '1';
                sunShifterEl.style.pointerEvents = 'auto';
                sunShifterEl.style.transform = '';
            }

            const cloverEl = document.getElementById('sprout-lucky-clover');
            if (cloverEl) {
                cloverEl.classList.remove('hidden');
                setTimeout(() => cloverEl.classList.add('visible'), 150);
            }

            if (gardenMsg) gardenMsg.textContent = "Giai đoạn 1: Hãy gom mây gọi mưa sương hoặc kéo vệt nắng ấm sưởi mầm non! 🌧️☀️";
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Cùng sưởi ấm mầm non và tìm nhánh cỏ bốn lá may mắn nào! 🌾🍀", 4000);
            }
            if (typeof window.playMelodicHarpChime === 'function') {
                window.playMelodicHarpChime(0);
            }
        }
        else if (stageNum === 2) {
            window.gardenState.currentStage = 1;
            window.gardenState.isWatered = true;
            window.gardenState.isFertilized = false;

            if (gardenUI) gardenUI.classList.remove('hidden');
            if (livingHudEl) livingHudEl.classList.add('hidden');
            if (toolWater) toolWater.style.display = 'none';
            if (toolFertilize) toolFertilize.style.display = 'none';

            const celestialOrrery = document.getElementById('celestial-weather-orrery');
            if (celestialOrrery) {
                celestialOrrery.classList.remove('hidden');
                celestialOrrery.style.display = 'flex';
                celestialOrrery.style.opacity = '1';
                celestialOrrery.style.pointerEvents = 'auto';
                if (typeof window.minimizeCelestialOrrery === 'function') {
                    window.minimizeCelestialOrrery({ silent: true, auto: true });
                }
            }

            if (steps && steps.length >= 3) {
                steps[0].classList.add('active');
                steps[1].classList.add('active');
                steps[2].classList.remove('active');
            }

            if (gardenMsg) gardenMsg.textContent = "Giai đoạn 2: Hãy lắng nghe và lặp lại khúc hòa âm Simon! 🎵✨";
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Khúc hòa âm bắt đầu ngân vang rồi nè! 🤖🎶", 4000);
            }
            if (typeof window.playMelodicHarpChime === 'function') {
                window.playMelodicHarpChime(2);
            }
            setTimeout(() => {
                if (typeof window.startSimonGame === 'function') window.startSimonGame();
            }, 350);
        }
        else if (stageNum === 3) {
            window.gardenState.currentStage = 2;
            window.gardenState.isWatered = true;
            window.gardenState.isFertilized = true;

            if (gardenUI) gardenUI.classList.remove('hidden');
            if (livingHudEl) livingHudEl.classList.add('hidden');
            if (toolWater) toolWater.style.display = 'none';
            if (toolFertilize) toolFertilize.style.display = 'none';

            const celestialOrrery = document.getElementById('celestial-weather-orrery');
            if (celestialOrrery) {
                celestialOrrery.classList.remove('hidden');
                celestialOrrery.style.display = 'flex';
                celestialOrrery.style.opacity = '1';
                celestialOrrery.style.pointerEvents = 'auto';
                if (typeof window.minimizeCelestialOrrery === 'function') {
                    window.minimizeCelestialOrrery({ silent: true, auto: true });
                }
            }

            if (steps && steps.length >= 3) {
                steps[0].classList.add('active');
                steps[1].classList.add('active');
                steps[2].classList.add('active');
            }

            if (gardenMsg) gardenMsg.textContent = "Giai đoạn 3: Hãy nối các ngôi sao theo thứ tự từ 1 đến 5 để thắp sáng bầu trời! ✨🌌";
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Hãy tìm 5 vì sao thật, cẩn thận đừng bấm nhầm sao ảo nhé! 🤖✨", 4000);
            }
            if (typeof window.playMelodicHarpChime === 'function') {
                window.playMelodicHarpChime(4);
            }
            setTimeout(() => {
                if (typeof window.startConstellationGame === 'function') window.startConstellationGame();
            }, 350);
        }
        else if (stageNum === 4) {
            window.gardenState.currentStage = 3;

            if (gardenUI) gardenUI.classList.add('hidden');
            if (livingHudEl) livingHudEl.classList.add('hidden');
            if (toolWater) toolWater.style.display = 'none';
            if (toolFertilize) toolFertilize.style.display = 'none';

            const celestialOrrery = document.getElementById('celestial-weather-orrery');
            if (celestialOrrery) {
                celestialOrrery.classList.remove('hidden');
                celestialOrrery.style.display = 'flex';
                celestialOrrery.style.opacity = '1';
                celestialOrrery.style.pointerEvents = 'auto';
                if (typeof window.minimizeCelestialOrrery === 'function') {
                    window.minimizeCelestialOrrery({ silent: true, auto: true });
                }
            }
            if (toolFertilize) toolFertilize.style.display = 'none';

            if (typeof window.revealSecretLetterButton === 'function') window.revealSecretLetterButton();
            if (typeof window.revealBoardingPassButton === 'function') window.revealBoardingPassButton();

            const cloverEl = document.getElementById('sprout-lucky-clover');
            if (cloverEl) {
                cloverEl.classList.remove('visible');
                setTimeout(() => cloverEl.classList.add('hidden'), 800);
            }

            const aoDaiFig = document.getElementById('ao-dai-viet-stage4');
            if (aoDaiFig) {
                aoDaiFig.classList.remove('hidden');
                setTimeout(() => {
                    aoDaiFig.classList.add('hien-thi');
                    aoDaiFig.classList.add('poem-visible');
                    setTimeout(() => aoDaiFig.classList.remove('poem-visible'), 6000);
                }, 150);
            }

            if (mascotCompanion) {
                mascotCompanion.classList.add('relocated-for-letter');
                mascotCompanion.classList.add('jump-bounce');
            }

            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Khu vườn hoa sen nở rực rỡ và ngập tràn tình yêu! 🪷💖", 5000);
            }
            if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
        }
    };

    const initGardenStageSelector = () => {
        const selector = document.getElementById('garden-stage-selector');
        if (!selector) return;

        const toggleBtn = document.getElementById('stage-selector-toggle-btn');
        const popover = document.getElementById('stage-selector-popover');
        const closeBtn = document.getElementById('stage-selector-close-btn');

        const openPopover = () => {
            if (!popover) return;
            popover.classList.remove('hidden');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
            syncGardenStageSelector(window.gardenState.currentStage === 3 ? 4 : (window.gardenState.currentStage + 1));
            if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
        };

        const closePopover = () => {
            if (!popover) return;
            popover.classList.add('hidden');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        };

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (popover && popover.classList.contains('hidden')) {
                    openPopover();
                } else {
                    closePopover();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closePopover();
            });
        }

        // Tự đóng khi click ra ngoài selector
        document.addEventListener('click', (e) => {
            if (selector && !selector.contains(e.target)) {
                closePopover();
            }
        });

        selector.querySelectorAll('.stage-btn').forEach(btn => {
            const onBtnClick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const stage = parseInt(btn.dataset.stage, 10);
                if (!isNaN(stage)) {
                    jumpToGardenStage(stage);
                    closePopover();
                }
            };

            btn.addEventListener('click', onBtnClick);
            btn.addEventListener('pointerdown', () => {
                btn.style.transform = 'translateY(1px) scale(0.97)';
                setTimeout(() => btn.style.transform = '', 180);
            });
        });
    };

    const advanceStage = (completedStage) => {
        cleanupStage(completedStage);
        syncGrowthProgressVisual(completedStage + 1);
        window.gardenState.currentStage++;
        syncGardenStageSelector(window.gardenState.currentStage === 3 ? 4 : (window.gardenState.currentStage + 1));

        // Sub-phase 4.3: Auto-minimize Orrery into sparkling lodestar upon stage completion
        if (completedStage === 0 || window.gardenState.currentStage >= 1) {
            if (typeof window.minimizeCelestialOrrery === 'function') {
                setTimeout(() => {
                    window.minimizeCelestialOrrery({ auto: true });
                }, 600);
            }
        }

        const gardenMsg = document.getElementById('garden-message');
        const livingHudEl = document.getElementById('living-atmosphere-hud');
        const cloudShifterEl = document.getElementById('atmosphere-cloud-shifter');
        const sunShifterEl = document.getElementById('atmosphere-sun-shifter');
        const gardenUI = document.getElementById('garden-ui');
        const mascotCompanion = document.getElementById('garden-mascot-companion');

        if (window.gardenState.currentStage === 1) {
            if (gardenMsg) gardenMsg.textContent = "Tuyệt vời! Hạt giống đang nảy mầm...";
            const seedHint = document.getElementById('seed-hint');
            if (seedHint) seedHint.style.opacity = '0';
            if (typeof window.triggerNextStage === 'function') window.triggerNextStage();
            syncGardenStageSelector(2);

            setTimeout(() => {
                if (gardenMsg) gardenMsg.textContent = "Mầm non đang khát nước. Hãy gom mây gọi mưa sương sớm nhé! 🌧️";
                window.gardenState.isWatered = false;
                if (livingHudEl) {
                    livingHudEl.classList.remove('hidden');
                    livingHudEl.style.display = 'flex';
                    livingHudEl.style.opacity = '1';
                }
                if (cloudShifterEl) {
                    cloudShifterEl.classList.remove('shifter-completed', 'shifter-fading');
                    cloudShifterEl.style.display = 'flex';
                    cloudShifterEl.style.opacity = '1';
                    cloudShifterEl.style.pointerEvents = 'auto';
                    cloudShifterEl.style.transform = '';
                }
            }, 3000);
        }
        else if (window.gardenState.currentStage === 2) {
            if (gardenMsg) gardenMsg.textContent = "Cây non lớn nhanh quá!";
            if (typeof window.triggerNextStage === 'function') window.triggerNextStage();
            syncGardenStageSelector(3);

            setTimeout(() => {
                if (gardenMsg) gardenMsg.textContent = "Hãy kéo vệt nắng ban mai sưởi ấm để cây chuẩn bị ra hoa nhé! ☀️";
                window.gardenState.isFertilized = false;
                if (livingHudEl) {
                    livingHudEl.classList.remove('hidden');
                    livingHudEl.style.display = 'flex';
                    livingHudEl.style.opacity = '1';
                }
                if (sunShifterEl) {
                    sunShifterEl.classList.remove('shifter-completed', 'shifter-fading');
                    sunShifterEl.style.display = 'flex';
                    sunShifterEl.style.opacity = '1';
                    sunShifterEl.style.pointerEvents = 'auto';
                    sunShifterEl.style.transform = '';
                }
            }, 3000);
        }
        else if (window.gardenState.currentStage === 3) {
            if (gardenMsg) gardenMsg.textContent = "Phép màu đang xảy ra...";
            cleanupStage('all');
            if (gardenUI) gardenUI.classList.add('hidden');
            if (livingHudEl) livingHudEl.classList.add('hidden');
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Tuyệt vời quá! Khu vườn nở hoa rực rỡ rồi! 🌸🎉", 6000);
            }
            if (mascotCompanion) mascotCompanion.classList.add('jump-bounce');
            if (typeof window.playRobotChirpSFX === 'function') window.playRobotChirpSFX();
            if (typeof window.triggerNextStage === 'function') window.triggerNextStage();
            setTimeout(() => {
                revealGardenStageSelector();
            }, 4500);
        }
    };

    const checkGrowth = () => {
        const state = window.gardenState;
        const gardenMsg = document.getElementById('garden-message');
        if (state.currentStage === 0 && state.isWatered && state.isFertilized) {
            advanceStage(0);
        } else if (state.currentStage === 1 && state.isWatered) {
            if (gardenMsg) gardenMsg.textContent = "Hãy lắng nghe và lặp lại giai điệu ma thuật!";
            if (typeof window.startSimonGame === 'function') window.startSimonGame();
        } else if (state.currentStage === 2 && state.isFertilized) {
            if (gardenMsg) gardenMsg.textContent = "Hãy vẽ lại chòm sao trên bầu trời!";
            if (typeof window.startConstellationGame === 'function') window.startConstellationGame();
        }
    };

    // Public API
    window.cleanupStage = cleanupStage;
    window.jumpToGardenStage = jumpToGardenStage;
    window.syncGardenStageSelector = syncGardenStageSelector;
    window.revealGardenStageSelector = revealGardenStageSelector;
    window.initGardenStageSelector = initGardenStageSelector;
    window.advanceStage = advanceStage;
    window.checkGrowth = checkGrowth;

    // Khởi tạo tương tác nét duyên Thiếu Nữ Áo Dài & Cỏ 4 Lá May Mắn
    const initHeritageStageInteractions = () => {
        // 1. Cỏ 4 Lá May Mắn
        const cloverEl = document.getElementById('sprout-lucky-clover');
        if (cloverEl && !cloverEl.dataset.initialized) {
            cloverEl.dataset.initialized = 'true';
            cloverEl.addEventListener('click', (e) => {
                e.stopPropagation();
                cloverEl.classList.add('active');
                setTimeout(() => cloverEl.classList.remove('active'), 2500);
                if (typeof window.triggerMascotCloverCheer === 'function') {
                    window.triggerMascotCloverCheer();
                } else if (typeof window.playChimeSFX === 'function') {
                    window.playChimeSFX();
                }
            });
        }

        // 2. Thiếu Nữ Áo Dài Thơ Mộng
        const aoDaiFig = document.getElementById('ao-dai-viet-stage4');
        const poemText = document.getElementById('ao-dai-poem-text');
        const aoDaiVerses = [
            "Chúc nàng một ngày 20/10 vạn dặm an yên, rạng rỡ như nắng mai và ngọt ngào như đóa sen đầu hạ 🌸",
            "Tà áo thướt tha nghiêng vành nón lá, nét duyên ngọc ngà thắp sáng cả vườn thương ✨",
            "Mong bạn luôn kiêu hãnh tỏa sáng theo cách riêng, được yêu thương và chở che trọn vẹn 💖",
            "Dịu dàng mà kiên cường, tựa như đóa sen tinh khiết ngát hương giữa đất trời 🪷",
            "Cảm ơn vì sự dịu êm và những điều kỳ diệu mà bạn luôn mang đến cho cuộc đời 🌿✨"
        ];
        let verseIndex = 0;

        if (aoDaiFig && !aoDaiFig.dataset.initialized) {
            aoDaiFig.dataset.initialized = 'true';
            aoDaiFig.addEventListener('click', (e) => {
                e.stopPropagation();
                verseIndex = (verseIndex + 1) % aoDaiVerses.length;
                if (poemText) poemText.textContent = aoDaiVerses[verseIndex];
                aoDaiFig.classList.add('poem-visible');
                if (typeof window.playMelodicHarpChime === 'function') {
                    window.playMelodicHarpChime(Math.floor(Math.random() * 5));
                } else if (typeof window.playChimeSFX === 'function') {
                    window.playChimeSFX();
                }
                setTimeout(() => {
                    aoDaiFig.classList.remove('poem-visible');
                }, 4500);
            });
        }
    };

    const setupAll = () => {
        initGardenStageSelector();
        initHeritageStageInteractions();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupAll);
    } else {
        setupAll();
    }
})();
