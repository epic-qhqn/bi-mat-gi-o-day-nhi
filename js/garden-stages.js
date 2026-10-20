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

        // Stage 4: Áo dài figure cleanup if resetting
        if (stageId === 1 || stageId === 2 || stageId === 3 || stageId === 'all') {
            const aoDaiFig = document.getElementById('ao-dai-viet-stage4');
            if (aoDaiFig) {
                aoDaiFig.classList.remove('hien-thi');
                aoDaiFig.classList.add('hidden');
            }
        }
    };

    const syncGardenStageSelector = (stageNum) => {
        const selector = document.getElementById('garden-stage-selector');
        if (!selector) return;
        selector.querySelectorAll('.stage-btn').forEach(btn => {
            const isActive = parseInt(btn.dataset.stage, 10) === stageNum;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
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

            if (gardenMsg) gardenMsg.textContent = "Giai đoạn 1: Hãy gom mây gọi mưa sương hoặc kéo vệt nắng ấm sưởi mầm non! 🌧️☀️";
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Cùng chăm sóc mầm cây thức giấc nào! 🤖🌱", 4000);
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

            const aoDaiFig = document.getElementById('ao-dai-viet-stage4');
            if (aoDaiFig) {
                aoDaiFig.classList.remove('hidden');
                setTimeout(() => aoDaiFig.classList.add('hien-thi'), 150);
            }

            if (mascotCompanion) {
                mascotCompanion.classList.add('relocated-for-letter');
                mascotCompanion.classList.add('jump-bounce');
            }

            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Khu vườn hoa nở rực rỡ và ngập tràn tình yêu! 🌸💖", 5000);
            }
            if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
        }
    };

    const initGardenStageSelector = () => {
        const selector = document.getElementById('garden-stage-selector');
        if (!selector) return;

        selector.querySelectorAll('.stage-btn').forEach(btn => {
            const onBtnClick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const stage = parseInt(btn.dataset.stage, 10);
                if (!isNaN(stage)) {
                    jumpToGardenStage(stage);
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
        const steps = document.querySelectorAll('.growth-progress .step');
        if (steps[completedStage]) steps[completedStage].classList.add('active');
        window.gardenState.currentStage++;

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGardenStageSelector);
    } else {
        initGardenStageSelector();
    }
})();
