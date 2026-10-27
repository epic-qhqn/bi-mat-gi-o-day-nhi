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

    let stage2AutoWarmthTimer = null;

    const cleanupStage = (stageId) => {
        if (stage2AutoWarmthTimer) {
            clearTimeout(stage2AutoWarmthTimer);
            stage2AutoWarmthTimer = null;
        }

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
            if (typeof window.stopSimonGame === 'function') {
                window.stopSimonGame();
            }
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
            const simonSkipBtn = document.getElementById('simon-skip-btn');
            if (simonSkipBtn) {
                simonSkipBtn.classList.add('hidden');
                simonSkipBtn.style.display = 'none';
                simonSkipBtn.style.pointerEvents = 'none';
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
                const artGroup = document.getElementById('constellation-artwork-group');
                if (artGroup) {
                    artGroup.classList.remove('celestial-reveal-active', 'celestial-reveal-exit');
                    artGroup.innerHTML = '';
                }
                const celebCard = document.getElementById('constellation-celebration-card');
                if (celebCard) {
                    celebCard.classList.remove('visible', 'fade-out');
                    celebCard.classList.add('hidden');
                }
            }
            const constSkipBtn = document.getElementById('constellation-skip-btn');
            if (constSkipBtn) {
                constSkipBtn.classList.add('hidden');
                constSkipBtn.style.display = 'none';
                constSkipBtn.style.pointerEvents = 'none';
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
            if (typeof window.closeGiftVideoModal === 'function') window.closeGiftVideoModal();
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
        document.body.classList.remove('stage-1-active', 'stage-2-active', 'stage-3-active', 'stage-4-active');
        document.body.classList.add('stage-' + stageNum + '-active');
        if (typeof window.notifyStageHint === 'function') {
            window.notifyStageHint(stageNum);
        }

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
            const hintEl = document.getElementById('terrarium-gesture-hint');
            if (hintEl) hintEl.style.display = '';
            const instructionEl = document.querySelector('.garden-ui .instruction');
            if (instructionEl) instructionEl.style.display = '';
            const celestialOrrery = document.getElementById('celestial-weather-orrery');
            if (celestialOrrery) {
                celestialOrrery.classList.remove('hidden');
                if (window.innerWidth <= 768) {
                    celestialOrrery.classList.add('orrery-minimized');
                } else {
                    celestialOrrery.classList.remove('orrery-minimized');
                }
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

            if (gardenMsg) gardenMsg.textContent = "Mầm non vừa nhú! Hãy gom mây gọi mưa sương hoặc kéo vệt nắng ấm để vỗ về hạt giống 🌧️☀️";
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Bạn khẽ tưới chút sương hoặc sưởi ấm mầm non nhé, hình như có nhánh cỏ bốn lá ẩn gần đây đó! 🌾🍀", 4000);
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
            if (livingHudEl) {
                livingHudEl.classList.add('hidden');
                livingHudEl.style.display = 'none';
                livingHudEl.style.opacity = '0';
                livingHudEl.style.pointerEvents = 'none';
            }
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

            if (gardenMsg) gardenMsg.textContent = "Cây non lắng nghe gió trời... Hãy chạm lại 4 chuông hoa ngân vang theo đúng giai điệu nhé! 🌸🎵";
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("4 chuông hoa sắp ngân vang trên bầu trời, bạn lắng nghe thật kỹ nha! 🌸🎵", 4000);
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

            const zc3 = (typeof window.getZodiacConstellation === 'function') ? window.getZodiacConstellation() : null;
            if (gardenMsg) gardenMsg.textContent = zc3
                ? `Đêm xuống rồi! Chòm sao ${zc3.name} ${zc3.symbol}\uFE0E của bạn đang hiện lên — hãy nối ${zc3.pts.length} vì sao theo thứ tự từ 1 đến ${zc3.pts.length} nhé ✨🌌`
                : "Đêm xuống rồi! Hãy nối 5 vì sao sáng theo thứ tự từ 1 đến 5 để thắp sáng bầu trời nhé ✨🌌";
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech(zc3 ? `Đây là chòm sao ${zc3.name} của bạn đó! Nối theo số, cẩn thận sao ảo nha ✨` : "Tìm đúng 5 vì sao thật nhé, cẩn thận đừng để các vì sao ảo đánh lừa nha! ✨", 4000);
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

            // Ensure tree canvas is fully bloomed
            if (typeof window.getOrGenerateBloomedTreeCanvas === 'function') {
                const bCanvas = window.getOrGenerateBloomedTreeCanvas();
                const mainCanvas = document.getElementById('canvas');
                if (mainCanvas && bCanvas) {
                    const mCtx = mainCanvas.getContext('2d');
                    if (mCtx) {
                        mCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
                        mCtx.drawImage(bCanvas, 0, 0);
                    }
                }
            }

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
                window.showMascotSpeech("Oa, hoa nở rực rỡ cả một góc trời rồi! Chúc bạn một ngày 20/10 ngập tràn niềm vui và yêu thương nha! 🌸💖", 5000);
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

        const guideLinkBtn = document.getElementById('stage-guide-link-btn');
        if (guideLinkBtn) {
            guideLinkBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closePopover();
                if (typeof window.openExperienceGuide === 'function') {
                    window.openExperienceGuide('steps');
                }
            });
        }

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
        const activeStageNum = window.gardenState.currentStage === 3 ? 4 : (window.gardenState.currentStage + 1);
        document.body.classList.remove('stage-1-active', 'stage-2-active', 'stage-3-active', 'stage-4-active');
        document.body.classList.add('stage-' + activeStageNum + '-active');
        syncGardenStageSelector(activeStageNum);
        if (typeof window.resetStageStuckTimer === 'function') {
            window.resetStageStuckTimer();
        }
        if (typeof window.notifyStageHint === 'function') {
            window.notifyStageHint(window.gardenState.currentStage);
        }

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
            if (gardenMsg) gardenMsg.textContent = "Mầm xanh đã thức giấc! Từng chiếc lá non đang đón nắng... 🌱";
            const seedHint = document.getElementById('seed-hint');
            if (seedHint) seedHint.style.opacity = '0';
            if (typeof window.triggerNextStage === 'function') window.triggerNextStage();
            syncGardenStageSelector(2);

            setTimeout(() => {
                if (gardenMsg) gardenMsg.textContent = "Mầm non cần thêm chút ẩm mát. Bạn gọi vài giọt sương lành cho cây nhé 🌧️";
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
            if (gardenMsg) gardenMsg.textContent = "Cây non lớn nhanh và cứng cáp ghê!";
            if (typeof window.triggerNextStage === 'function') window.triggerNextStage();
            syncGardenStageSelector(3);

            setTimeout(() => {
                if (gardenMsg) gardenMsg.textContent = "Hãy kéo vệt nắng ban mai sưởi ấm để cây sẵn sàng nở hoa nhé! ☀️";
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

                // Graceful Auto-Fallback: Sau 25s nếu người dùng chưa sưởi ấm mầm cây, tự động làn gió nắng ấm thoảng qua
                if (stage2AutoWarmthTimer) clearTimeout(stage2AutoWarmthTimer);
                stage2AutoWarmthTimer = setTimeout(() => {
                    if (window.gardenState.currentStage === 2 && !window.gardenState.isFertilized) {
                        const target = typeof window.getSeedOrSproutCenter === 'function'
                            ? window.getSeedOrSproutCenter()
                            : { x: window.innerWidth / 2, y: window.innerHeight * 0.65 };
                        if (typeof window.triggerRootThermalWarmth === 'function') {
                            window.triggerRootThermalWarmth(target);
                        } else if (typeof window.triggerAtmosphereSunbeam === 'function') {
                            window.triggerAtmosphereSunbeam();
                        } else {
                            window.gardenState.isFertilized = true;
                            if (typeof window.checkGrowth === 'function') window.checkGrowth();
                        }
                    }
                }, 25000);
            }, 3000);
        }
        else if (window.gardenState.currentStage === 3) {
            if (gardenMsg) gardenMsg.textContent = "Điều kỳ diệu đã đơm hoa kết trái...";
            cleanupStage('all');
            if (gardenUI) gardenUI.classList.add('hidden');
            if (livingHudEl) livingHudEl.classList.add('hidden');
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Oa, hoa nở rực rỡ cả một góc trời rồi! Chúc bạn một ngày 20/10 ngập tràn niềm vui và yêu thương nha! 🌸✨", 6000);
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
            if (gardenMsg) gardenMsg.textContent = "Hãy lắng nghe và chạm lại 4 chuông hoa ngân vang theo đúng giai điệu nhé! 🌸🎵";
            if (typeof window.startSimonGame === 'function') window.startSimonGame();
        } else if (state.currentStage === 2 && state.isFertilized) {
            if (stage2AutoWarmthTimer) {
                clearTimeout(stage2AutoWarmthTimer);
                stage2AutoWarmthTimer = null;
            }
            if (gardenMsg) gardenMsg.textContent = "Hãy nối liền các vì sao để thắp sáng bầu trời đêm!";
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
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('clover');
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
            "Chúc bạn một ngày 20/10 thật thảnh thơi, rạng rỡ như nắng ban mai và ngọt ngào như nụ cười của chính bạn 🌸",
            "Tà áo dài duyên dáng nghiêng che nón lá, nét đẹp mộc mạc mà tỏa sáng dịu dàng giữa đất trời ✨",
            "Mong bạn luôn kiêu hãnh bước đi theo cách của riêng mình, vừa đủ mạnh mẽ, vừa trọn vẹn yêu thương 💖",
            "Dịu dàng nhưng không hề yếu đuối, bạn luôn tỏa hương thơm ngát và kiên cường như đóa sen đầu hạ 🪷",
            "Cảm ơn bạn vì nguồn năng lượng tích cực và sự ấm áp bạn luôn mang đến cho mọi người xung quanh 🌿✨"
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

    // =========================================================================
    // PHASE 12: CHẾ ĐỘ CHIÊM NGƯỠNG TĨNH LẶNG (ZEN MODE TOGGLE)
    // =========================================================================
    let zenHintTimeout = null;

    const toggleZenMode = (forceState) => {
        const isZen = typeof forceState === 'boolean'
            ? forceState
            : !document.body.classList.contains('zen-mode-active');

        const zenBtn = document.getElementById('zen-mode-toggle-btn');
        const zenHint = document.getElementById('zen-mode-return-hint');

        if (isZen) {
            document.body.classList.add('zen-mode-active');
            if (zenBtn) zenBtn.setAttribute('aria-pressed', 'true');
            if (typeof window.triggerHaptic === 'function') window.triggerHaptic('medium');
            if (typeof window.playChimeSFX === 'function') window.playChimeSFX();

            if (zenHint) {
                zenHint.classList.remove('hidden');
                zenHint.style.opacity = '1';
                if (zenHintTimeout) clearTimeout(zenHintTimeout);
                zenHintTimeout = setTimeout(() => {
                    zenHint.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.classList.contains('zen-mode-active')) {
                            zenHint.classList.add('hidden');
                            zenHint.style.opacity = '';
                        }
                    }, 600);
                }, 3600);
            }
        } else {
            document.body.classList.remove('zen-mode-active');
            if (zenBtn) zenBtn.setAttribute('aria-pressed', 'false');
            if (zenHint) {
                zenHint.classList.add('hidden');
                zenHint.style.opacity = '';
            }
            if (zenHintTimeout) clearTimeout(zenHintTimeout);
            if (typeof window.triggerHaptic === 'function') window.triggerHaptic('light');
        }
    };

    const initZenMode = () => {
        const zenBtn = document.getElementById('zen-mode-toggle-btn');
        if (zenBtn) {
            zenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleZenMode();
            });
        }

        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('zen-mode-active')) {
                if (e.target && e.target.closest('#zen-mode-toggle-btn')) return;
                toggleZenMode(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('zen-mode-active')) {
                toggleZenMode(false);
            }
        });
    };
    window.toggleZenMode = toggleZenMode;

    // =========================================================================
    // PHASE 12: CHỤP KHOẢNH KHẮC VƯỜN KỶ NIỆM (INSTANT GARDEN POLAROID CAPTURE)
    // =========================================================================
    const renderGardenPolaroidToCanvas = (targetCanvas) => {
        if (!targetCanvas) return;
        const w = 1080;
        const h = 1320;
        targetCanvas.width = w;
        targetCanvas.height = h;
        const ctx = targetCanvas.getContext('2d');
        if (!ctx) return;

        // 1. Dó Paper Ivory Background
        ctx.fillStyle = '#FAF7F0';
        ctx.fillRect(0, 0, w, h);

        // Subtle decorative paper texture & borders
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
        ctx.lineWidth = 2;
        ctx.strokeRect(18, 18, w - 36, h - 36);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(24, 24, w - 48, h - 48);

        // 2. Photo Viewport (960 x 960 at x: 60, y: 60)
        const px = 60;
        const py = 60;
        const pw = 960;
        const ph = 960;

        ctx.save();
        ctx.beginPath();
        ctx.rect(px, py, pw, ph);
        ctx.clip();

        // Sky background gradient according to current diurnal cycle
        const skyGrad = ctx.createLinearGradient(px, py, px, py + ph);
        if (document.body.classList.contains('sky-dawn')) {
            skyGrad.addColorStop(0, '#FF8A65');
            skyGrad.addColorStop(0.45, '#FFCCBC');
            skyGrad.addColorStop(1, '#FAF7F0');
        } else if (document.body.classList.contains('sky-dusk')) {
            skyGrad.addColorStop(0, '#D84315');
            skyGrad.addColorStop(0.45, '#F48FB1');
            skyGrad.addColorStop(1, '#FFE082');
        } else if (document.body.classList.contains('sky-night')) {
            skyGrad.addColorStop(0, '#090F22');
            skyGrad.addColorStop(0.55, '#15203D');
            skyGrad.addColorStop(1, '#263859');
        } else {
            skyGrad.addColorStop(0, '#64B5F6');
            skyGrad.addColorStop(0.5, '#BBDEFB');
            skyGrad.addColorStop(1, '#FAF7F0');
        }
        ctx.fillStyle = skyGrad;
        ctx.fillRect(px, py, pw, ph);

        // Celestial Bodies & Stars
        if (document.body.classList.contains('sky-night')) {
            // Stars in upper sky
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < 48; i++) {
                const sx = px + (Math.sin(i * 12.3) * 0.5 + 0.5) * pw;
                const sy = py + (Math.cos(i * 8.7) * 0.5 + 0.5) * (ph * 0.65);
                const sr = (i % 4 === 0) ? 2.6 : ((i % 2 === 0) ? 1.6 : 1.0);
                ctx.globalAlpha = 0.35 + (i % 6) * 0.11;
                ctx.beginPath();
                ctx.arc(sx, sy, sr, 0, Math.PI * 2);
                ctx.fill();
            }

            // Crescent Moon positioned at top-left (px + 140, py + 120) to avoid tree occlusion
            const mx = px + 140;
            const my = py + 120;
            ctx.globalAlpha = 1.0;
            
            // Moon glow
            const moonGlow = ctx.createRadialGradient(mx, my, 20, mx, my, 85);
            moonGlow.addColorStop(0, 'rgba(255, 249, 219, 0.45)');
            moonGlow.addColorStop(0.5, 'rgba(255, 245, 180, 0.15)');
            moonGlow.addColorStop(1, 'rgba(255, 245, 180, 0)');
            ctx.fillStyle = moonGlow;
            ctx.beginPath();
            ctx.arc(mx, my, 85, 0, Math.PI * 2);
            ctx.fill();

            // Moon body
            ctx.fillStyle = '#FFF9DB';
            ctx.beginPath();
            ctx.arc(mx, my, 40, 0, Math.PI * 2);
            ctx.fill();

            // Moon shadow cutout (creates delicate crescent)
            ctx.fillStyle = '#090F22';
            ctx.beginPath();
            ctx.arc(mx + 15, my - 6, 36, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Radiant Sun at top-left
            const sx = px + 140;
            const sy = py + 120;
            const sunHalo = ctx.createRadialGradient(sx, sy, 15, sx, sy, 110);
            sunHalo.addColorStop(0, 'rgba(255, 238, 140, 0.85)');
            sunHalo.addColorStop(0.6, 'rgba(245, 206, 86, 0.3)');
            sunHalo.addColorStop(1, 'rgba(245, 206, 86, 0)');
            ctx.fillStyle = sunHalo;
            ctx.beginPath();
            ctx.arc(sx, sy, 110, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#F5CE56';
            ctx.beginPath();
            ctx.arc(sx, sy, 34, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // 3. Grassy Meadow Hillock at bottom of photo
        // Background hillock
        const hillGrad1 = ctx.createLinearGradient(px, py + ph - 160, px, py + ph);
        hillGrad1.addColorStop(0, '#3A5A40');
        hillGrad1.addColorStop(1, '#273C2C');
        ctx.fillStyle = hillGrad1;
        ctx.beginPath();
        ctx.moveTo(px, py + ph);
        ctx.quadraticCurveTo(px + pw * 0.4, py + ph - 130, px + pw, py + ph - 60);
        ctx.lineTo(px + pw, py + ph);
        ctx.closePath();
        ctx.fill();

        // Foreground rich meadow
        const hillGrad2 = ctx.createLinearGradient(px, py + ph - 110, px, py + ph);
        hillGrad2.addColorStop(0, '#588157');
        hillGrad2.addColorStop(1, '#344E41');
        ctx.fillStyle = hillGrad2;
        ctx.beginPath();
        ctx.moveTo(px, py + ph);
        ctx.quadraticCurveTo(px + pw * 0.6, py + ph - 100, px + pw, py + ph);
        ctx.closePath();
        ctx.fill();

        // 4. Heart-Blooming Tree snapshot (Golden-Ratio Centering & Zero Duplication)
        const isStage4Active = (window.gardenState && window.gardenState.currentStage >= 3) ||
                               document.body.classList.contains('stage-4-active');

        let activeTreeSource = null;

        if (isStage4Active) {
            // Prioritize offscreen bloomed canvas or generate synchronously in ~10ms
            if (window.bloomedTreeCanvas && window.bloomedTreeCanvas.width > 0) {
                activeTreeSource = window.bloomedTreeCanvas;
            } else if (typeof window.getOrGenerateBloomedTreeCanvas === 'function') {
                activeTreeSource = window.getOrGenerateBloomedTreeCanvas();
            } else if (window.bloomedTreeImage && window.bloomedTreeImage.complete && window.bloomedTreeImage.naturalWidth > 0) {
                activeTreeSource = window.bloomedTreeImage;
            } else if (window.bloomedTreeSnapshotDataUrl) {
                const snapImg = new Image();
                snapImg.src = window.bloomedTreeSnapshotDataUrl;
                if (snapImg.complete && snapImg.naturalWidth > 0) {
                    activeTreeSource = snapImg;
                }
            }
        }

        if (!activeTreeSource) {
            if (window.bloomedTreeImage && window.bloomedTreeImage.complete && window.bloomedTreeImage.naturalWidth > 0) {
                activeTreeSource = window.bloomedTreeImage;
            } else if (window.currentGardenSnapshotUrl) {
                const snapImg = new Image();
                snapImg.src = window.currentGardenSnapshotUrl;
                if (snapImg.complete && snapImg.naturalWidth > 0) {
                    activeTreeSource = snapImg;
                }
            }
        }

        if (!activeTreeSource) {
            activeTreeSource = document.getElementById('canvas');
        }

        if (activeTreeSource) {
            const srcW = activeTreeSource.width || activeTreeSource.naturalWidth || 1100;
            const srcH = activeTreeSource.height || activeTreeSource.naturalHeight || 680;

            if (isStage4Active || srcW >= 1000) {
                // Crop only the heart tree region (sx: 480 to 1100, eliminating empty left half)
                // Draw into photo with golden ratio placement (dx: px + 170, dy: py + 25)
                const sx = 480;
                const sy = 0;
                const sw = Math.min(620, srcW - 480);
                const sh = srcH;
                ctx.drawImage(activeTreeSource, sx, sy, sw, sh, px + 170, py + 25, 780, 860);
            } else {
                // Centered sprout / young tree for stages 1-3
                const sx = Math.max(0, (srcW - 600) / 2);
                const sy = Math.max(0, srcH - 520);
                const sw = Math.min(600, srcW);
                const sh = Math.min(520, srcH);
                ctx.drawImage(activeTreeSource, sx, sy, sw, sh, px + 180, py + 220, 600, 520);
            }
        }

        // 5. Áo Dài Maiden figure (Graceful placement on meadow, left of tree trunk)
        const domAoDai = document.querySelector('.ao-dai-figure-img');
        const aoDaiImg = (window.aoDaiVietImg && window.aoDaiVietImg.complete && window.aoDaiVietImg.naturalWidth > 0)
            ? window.aoDaiVietImg
            : (domAoDai && domAoDai.complete && domAoDai.naturalWidth > 0 ? domAoDai : null);

        if (window.gardenState && window.gardenState.currentStage >= 3 && aoDaiImg) {
            ctx.save();
            const ax = px + 75;
            const ay = py + ph - 410;
            const aw = 270;
            const ah = 400;

            // Soft lotus mist aura around maiden
            const aura = ctx.createRadialGradient(ax + aw * 0.45, ay + ah * 0.5, 20, ax + aw * 0.45, ay + ah * 0.5, 170);
            aura.addColorStop(0, 'rgba(250, 247, 240, 0.45)');
            aura.addColorStop(0.5, 'rgba(212, 122, 136, 0.16)');
            aura.addColorStop(1, 'rgba(212, 122, 136, 0)');
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(ax + aw * 0.45, ay + ah * 0.5, 170, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowColor = 'rgba(10, 15, 29, 0.35)';
            ctx.shadowBlur = 14;
            ctx.shadowOffsetY = 4;
            ctx.drawImage(aoDaiImg, ax, ay, aw, ah);
            ctx.restore();
        }

        // 6. Floating Lotus Petals in Photo Frame
        const petalColors = ['#E28490', '#D47A88', '#F7C5CC', '#FFB7C5'];
        for (let i = 0; i < 18; i++) {
            const petX = px + (Math.sin(i * 37.1) * 0.5 + 0.5) * pw;
            const petY = py + (Math.cos(i * 19.3) * 0.5 + 0.5) * (ph * 0.9);
            const petRot = (i * 40) * Math.PI / 180;
            ctx.save();
            ctx.translate(petX, petY);
            ctx.rotate(petRot);
            ctx.fillStyle = petalColors[i % petalColors.length];
            ctx.globalAlpha = 0.72;
            ctx.beginPath();
            ctx.moveTo(0, -9);
            ctx.quadraticCurveTo(6, -2, 0, 9);
            ctx.quadraticCurveTo(-6, -2, 0, -9);
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1.0;

        ctx.restore(); // End photo clip

        // Photo frame border
        ctx.strokeStyle = 'rgba(74, 55, 40, 0.16)';
        ctx.lineWidth = 2;
        ctx.strokeRect(px, py, pw, ph);

        // 7. Bottom Margin Typography & Keepsake Dedication
        // Poetic Title
        ctx.font = 'italic 34px "Dancing Script", cursive, serif';
        ctx.fillStyle = '#4A3728';
        ctx.fillText('Khu vườn bí mật · Nơi ước nguyện nở hoa ♡', px + 10, 1095);

        // Recipient Dedication
        const recipientName = window.currentUserName && window.currentUserName.trim()
            ? window.currentUserName.trim().toUpperCase()
            : 'NGƯỜI THƯƠNG';
        ctx.font = 'bold 23px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#8C2D39';
        ctx.fillText('DÀNH TẶNG: ' + recipientName, px + 10, 1144);

        // Poetic Blessing
        ctx.font = '15px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#6B5E55';
        ctx.fillText('Chúc bạn một ngày 20/10 vạn sự an yên, dịu dàng và rực rỡ như hoa.', px + 10, 1182);

        // Postal Mark bottom left
        ctx.font = '600 13px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = 'rgba(126, 88, 53, 0.75)';
        ctx.fillText('20.10.2026 · VIETNAMESE HERITAGE EDITION', px + 10, 1242);

        // Cinnabar Red Seal Stamp (Bottom-Right corner)
        const scx = w - 145;
        const scy = 1170;
        const sr = 48;

        ctx.save();
        ctx.translate(scx, scy);
        ctx.rotate(-0.06);

        ctx.strokeStyle = '#C0392B';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, sr, 0, Math.PI * 2);
        ctx.stroke();

        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, sr - 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#C0392B';
        ctx.font = 'bold 10px "Be Vietnam Pro", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('★ 20/10/2026 ★', 0, -22);

        ctx.font = 'bold 14px "Be Vietnam Pro", sans-serif';
        ctx.fillText('NÉT AN YÊN', 0, 1);

        ctx.font = 'bold 10px "Be Vietnam Pro", sans-serif';
        ctx.fillText('VIỆT NAM', 0, 21);

        ctx.restore();
    };

    const captureGardenPolaroid = () => {
        if (typeof window.playCameraClickSFX === 'function') {
            window.playCameraClickSFX();
        } else if (typeof window.playKeyTapSFX === 'function') {
            window.playKeyTapSFX();
        }

        if (typeof window.triggerHaptic === 'function') {
            window.triggerHaptic([25, 40, 20]);
        }

        const flash = document.getElementById('camera-flash-overlay');
        if (flash) {
            flash.classList.add('active');
            setTimeout(() => flash.classList.remove('active'), 320);
        }

        // Ensure bloomed tree canvas is ready synchronously if in Stage 4
        const isStage4 = (window.gardenState && window.gardenState.currentStage >= 3) ||
                         document.body.classList.contains('stage-4-active');
        if (isStage4 && typeof window.getOrGenerateBloomedTreeCanvas === 'function') {
            window.getOrGenerateBloomedTreeCanvas();
        }

        const polaroidCanvas = document.getElementById('garden-polaroid-canvas');
        if (polaroidCanvas) {
            renderGardenPolaroidToCanvas(polaroidCanvas);
        }

        const modal = document.getElementById('garden-polaroid-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    };
    window.captureGardenPolaroid = captureGardenPolaroid;

    const initGardenPolaroidCapture = () => {
        const captureBtn = document.getElementById('instant-garden-capture-btn');
        if (captureBtn) {
            captureBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                captureGardenPolaroid();
            });
        }

        const closeBtn = document.getElementById('close-garden-polaroid-btn');
        const modal = document.getElementById('garden-polaroid-modal');
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                modal.classList.add('hidden');
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('light');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                }
            });
        }

        const downloadBtn = document.getElementById('download-garden-polaroid-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const canvas = document.getElementById('garden-polaroid-canvas');
                if (!canvas) return;

                if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('success');

                // Guarantee canvas is freshly painted with latest name and bloomed tree
                renderGardenPolaroidToCanvas(canvas);

                const nameSlug = (window.currentUserName && window.currentUserName.trim())
                    ? window.currentUserName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')
                    : 'nguoi-thuong';
                const filename = `khu-vuon-ky-niem-${nameSlug}-20-10.png`;

                try {
                    const dataUrl = canvas.toDataURL('image/png');
                    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = dataUrl;
                    if (isIOS) {
                        link.target = '_blank';
                        link.rel = 'noopener';
                    }
                    document.body.appendChild(link);
                    link.click();
                    setTimeout(() => link.remove(), 200);

                    const toast = document.getElementById('polaroid-action-toast');
                    if (toast) {
                        toast.textContent = isIOS 
                            ? 'Đang mở ảnh Polaroid! Nhấn giữ ảnh để Lưu vào Thư viện 📸✨' 
                            : 'Đã tải ảnh Polaroid kỷ niệm HD về máy! 📸✨';
                        toast.classList.remove('hidden');
                        setTimeout(() => toast.classList.add('hidden'), 3500);
                    }
                } catch (err) {
                    console.error('Download error:', err);
                }
            });
        }

        const shareBtn = document.getElementById('share-garden-polaroid-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('medium');

                const toast = document.getElementById('polaroid-action-toast');
                const name = window.currentUserName ? window.currentUserName.trim() : 'bạn';
                const shareText = `Khoảnh khắc vườn hoa bí mật 20/10 dành tặng riêng cho ${name}! Chúc một ngày 20/10 vạn sự an yên 🌸✨`;

                if (navigator.share) {
                    try {
                        const canvas = document.getElementById('garden-polaroid-canvas');
                        if (canvas && canvas.toBlob) {
                            canvas.toBlob(async (blob) => {
                                const file = new File([blob], 'vuon-ky-niem-20-10.png', { type: 'image/png' });
                                try {
                                    await navigator.share({
                                        title: 'Khu Vườn Kỷ Niệm 20/10',
                                        text: shareText,
                                        files: [file]
                                    });
                                } catch (_) {
                                    await navigator.share({ title: 'Khu Vườn Kỷ Niệm 20/10', text: shareText, url: window.location.href });
                                }
                            });
                            return;
                        }
                    } catch (_) {}
                }

                // Fallback: Copy to clipboard
                try {
                    await navigator.clipboard.writeText(shareText + ' ' + window.location.href);
                    if (toast) {
                        toast.textContent = 'Đã sao chép lời chúc kèm liên kết vườn hoa! 💌';
                        toast.classList.remove('hidden');
                        setTimeout(() => toast.classList.add('hidden'), 3000);
                    }
                } catch (_) {
                    if (toast) {
                        toast.textContent = shareText;
                        toast.classList.remove('hidden');
                        setTimeout(() => toast.classList.add('hidden'), 3500);
                    }
                }
            });
        }
    };

    window.renderGardenPolaroidToCanvas = renderGardenPolaroidToCanvas;

    const setupAll = () => {
        initGardenStageSelector();
        initHeritageStageInteractions();
        initZenMode();
        initGardenPolaroidCapture();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupAll);
    } else {
        setupAll();
    }
})();
