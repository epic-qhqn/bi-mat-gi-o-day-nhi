/**
 * REAL-TIME INTERACTIVE GUIDANCE ENGINE (HƯỚNG DẪN THỜI GIAN THỰC)
 * Automatically senses current journey phase, user inputs, and environmental state.
 * Real-time dynamic pointer hand, spotlight reticle, and live quest mission bar.
 */
(function() {
    'use strict';

    // DOM Elements
    let hudEl = null;
    let iconEl = null;
    let stepTagEl = null;
    let msgEl = null;
    let toggleBtn = null;
    let toggleIcon = null;
    let overlayEl = null;
    let targetBoxEl = null;
    let pointerHandEl = null;
    let pointerBadgeEl = null;

    let isGuideEnabled = true;
    let currentTargetEl = null;
    let pollInterval = null;
    let lastStateKey = '';

    // Step Matrix Evaluator: Returns { key, stepTag, message, icon, targetSelector, pointerDirection, pointerText }
    const evaluateCurrentState = () => {
        // 1. TIME LOCK GATE
        const timeLockModal = document.getElementById('time-lock-modal');
        if (timeLockModal && !timeLockModal.classList.contains('hidden') && timeLockModal.style.display !== 'none') {
            const input = document.getElementById('time-lock-input');
            return {
                key: 'time-lock',
                stepTag: 'CỔNG THỜI GIAN',
                message: 'Nhập mật mã mở sớm hoặc chờ tự động mở lúc 12:00 trưa 25/10 ✨',
                icon: '⏳',
                targetSelector: '#time-lock-input',
                pointerDirection: 'bottom',
                pointerText: 'Nhập mật mã tại đây'
            };
        }

        // 2. NAME MODAL & WAX SEAL ATELIER
        const nameModal = document.getElementById('name-modal');
        if (nameModal && !nameModal.classList.contains('hidden') && nameModal.style.display !== 'none') {
            const nameInput = document.getElementById('name-input');
            const nameVal = (nameInput && nameInput.value) ? nameInput.value.trim() : '';

            // Step 2.1: Input Name
            if (!nameVal) {
                return {
                    key: 'atelier-name',
                    stepTag: 'BƯỚC 1/6',
                    message: 'Hãy gõ tên của bạn lên khuôn đồng để bắt đầu nghi thức đúc triện son 🪶',
                    icon: '✍️',
                    targetSelector: '#name-input',
                    pointerDirection: 'bottom',
                    pointerText: 'Gõ tên nàng vào đây'
                };
            }

            // Step 2.2: Select Wax Beads
            const beadCountEl = document.getElementById('bead-count-val');
            const beadCount = beadCountEl ? parseInt(beadCountEl.textContent || '0', 10) : 0;
            const quickDropBtn = document.getElementById('hearth-quick-drop-btn');
            if (beadCount < 3) {
                return {
                    key: 'atelier-beads',
                    stepTag: 'BƯỚC 2/6',
                    message: `Đã chọn ${beadCount}/3 viên sáp. Chạm chọn thêm sáp hoặc bấm 'Phối màu nhanh ✨' 🎨`,
                    icon: '🎨',
                    targetSelector: quickDropBtn && quickDropBtn.offsetParent ? '#hearth-quick-drop-btn' : '#wax-beads-tray',
                    pointerDirection: 'bottom',
                    pointerText: 'Bấm phối màu nhanh hoặc chọn sáp'
                };
            }

            // Step 2.3: Strike Match
            const matchFlame = document.getElementById('match-flame');
            const isMatchLit = matchFlame && !matchFlame.classList.contains('hidden');
            const candleFlame = document.getElementById('candle-flame');
            const isCandleLit = candleFlame && !candleFlame.classList.contains('hidden');

            if (!isMatchLit && !isCandleLit) {
                return {
                    key: 'atelier-match',
                    stepTag: 'BƯỚC 3/6',
                    message: 'Chạm hoặc kéo que diêm để quẹt lửa đánh thức ngọn nến thơm 🔥',
                    icon: '⚡',
                    targetSelector: '#match-striker-strip',
                    pointerDirection: 'top',
                    pointerText: 'Chạm quẹt diêm lấy lửa'
                };
            }

            // Step 2.4: Light Candle
            if (isMatchLit && !isCandleLit) {
                return {
                    key: 'atelier-candle',
                    stepTag: 'BƯỚC 3/6',
                    message: 'Que diêm đã cháy! Hãy chạm vào ngọn nến để thắp sáng 🕯️',
                    icon: '🕯️',
                    targetSelector: '#artisan-candle',
                    pointerDirection: 'top',
                    pointerText: 'Chạm thắp nến'
                };
            }

            // Step 2.5: Melting Spoon
            const spoonMolten = document.getElementById('spoon-molten-wax');
            const isWaxMelted = spoonMolten && !spoonMolten.classList.contains('hidden');
            const waxHotPool = document.getElementById('wax-hot-pool');
            const isWaxPoured = waxHotPool && !waxHotPool.classList.contains('hidden');
            const waxSealPuddle = document.getElementById('wax-seal-puddle');
            const isWaxStamped = waxSealPuddle && !waxSealPuddle.classList.contains('hidden');

            if (!isWaxMelted && !isWaxPoured && !isWaxStamped) {
                const rodEl = document.getElementById('glass-stirring-rod');
                return {
                    key: 'atelier-melting',
                    stepTag: 'BƯỚC 4/6',
                    message: 'Sáp đang được đun tan chảy trong thìa đồng... Có thể chạm đũa khuấy vân cẩm thạch 🪄',
                    icon: '♨️',
                    targetSelector: (rodEl && !rodEl.classList.contains('hidden')) ? '#glass-stirring-rod' : '#brass-spoon',
                    pointerDirection: 'top',
                    pointerText: 'Đun & khuấy vân sáp'
                };
            }

            // Step 2.6: Pour Wax onto Envelope
            if (isWaxMelted && !isWaxPoured && !isWaxStamped) {
                return {
                    key: 'atelier-pour',
                    stepTag: 'BƯỚC 5/6',
                    message: 'Sáp đã tan chảy hoàn mỹ! Chạm vào thìa đồng để rót sáp lỏng sang phong thư 🍯',
                    icon: '🍯',
                    targetSelector: '#brass-spoon',
                    pointerDirection: 'top',
                    pointerText: 'Chạm rót sáp'
                };
            }

            // Step 2.7: Stamp Seal or Sprinkle Gold Flakes
            if (isWaxPoured && !isWaxStamped) {
                const sprinkleBtn = document.getElementById('artisan-sprinkle-vial');
                const hasSprinkled = sprinkleBtn && sprinkleBtn.classList.contains('hidden');
                return {
                    key: 'atelier-stamp',
                    stepTag: 'BƯỚC 6/6',
                    message: 'Chạm hoặc kéo con dấu đồng dập vào vũng sáp son để khai mở cổng hoa 💮',
                    icon: '💮',
                    targetSelector: '#wax-seal-stamp',
                    pointerDirection: 'top',
                    pointerText: 'Chạm dập con dấu'
                };
            }

            // Step 2.8: Solidifying
            if (isWaxStamped) {
                return {
                    key: 'atelier-cooling',
                    stepTag: 'MỞ CỔNG HOA',
                    message: 'Sáp đang đông kết thành triện son hoàn mỹ, mầm hoa thức giấc... ✨',
                    icon: '🌸',
                    targetSelector: '#wax-target-zone',
                    pointerDirection: 'top',
                    pointerText: 'Triện son đã thành hình'
                };
            }
        }

        // 3. GARDEN ACTIVE STAGES
        const gState = window.gardenState || { currentStage: 0 };
        const stageNum = gState.currentStage;

        // Stage 1: Climate, Sprout & Clover
        if (stageNum === 0 || stageNum === 1) {
            const isWatered = Boolean(gState.isWatered);
            const isFertilized = Boolean(gState.isFertilized);

            if (!isWatered) {
                return {
                    key: 'stage-1-water',
                    stepTag: 'GIAI ĐOẠN 1',
                    message: 'Chồi non đang khát! Chạm hoặc kéo Đám Mây Mưa để gọi giọt sương mai tưới tắm 🌧️',
                    icon: '🌧️',
                    targetSelector: '#atmosphere-cloud-shifter',
                    pointerDirection: 'bottom',
                    pointerText: 'Chạm gọi mưa sương'
                };
            }

            if (!isFertilized) {
                return {
                    key: 'stage-1-sun',
                    stepTag: 'GIAI ĐOẠN 1',
                    message: 'Mầm cây cần ánh ấm! Chạm hoặc kéo Vệt Nắng Ban Mai để sưởi ấm chồi non ☀️',
                    icon: '☀️',
                    targetSelector: '#atmosphere-sun-shifter',
                    pointerDirection: 'bottom',
                    pointerText: 'Chạm sưởi ấm mầm'
                };
            }

            // Check if clover is visible
            const clover = document.getElementById('sprout-lucky-clover');
            if (clover && !clover.classList.contains('hidden') && clover.offsetParent) {
                return {
                    key: 'stage-1-clover',
                    stepTag: 'MAY MẮN',
                    message: 'Chạm vào nhánh Cỏ 4 Lá May Mắn để nhận thông điệp bình an ngày 20/10 🍀',
                    icon: '🍀',
                    targetSelector: '#sprout-lucky-clover',
                    pointerDirection: 'top',
                    pointerText: 'Chạm cỏ 4 lá'
                };
            }
        }

        // Stage 2: Simon Melody Minigame
        if (stageNum === 1 || stageNum === 2) {
            const simonContainer = document.getElementById('simon-game');
            if (simonContainer && !simonContainer.classList.contains('hidden') && simonContainer.children.length > 0) {
                const firstNode = simonContainer.querySelector('.simon-node');
                return {
                    key: 'stage-2-simon',
                    stepTag: 'GIAI ĐOẠN 2',
                    message: 'Lắng nghe chuông hoa và chạm lại các phím theo đúng thứ tự giai điệu vừa nghe 🎵',
                    icon: '🎵',
                    targetSelector: firstNode ? '.simon-node' : '#simon-game',
                    pointerDirection: 'bottom',
                    pointerText: 'Chạm chuông hoa'
                };
            }
        }

        // Stage 3: Constellation Linker Minigame
        if (stageNum === 2 || stageNum === 3) {
            const constellationGame = document.getElementById('constellation-game');
            if (constellationGame && !constellationGame.classList.contains('hidden')) {
                // Find next target star (unconnected star with lowest index)
                const stars = Array.from(constellationGame.querySelectorAll('.constellation-star:not(.connected):not(.decoy)'));
                const targetStar = stars[0];
                return {
                    key: 'stage-3-stars',
                    stepTag: 'GIAI ĐOẠN 3',
                    message: 'Chạm các vì sao có vầng hào quang rực rỡ để nối chòm sao Trái Tim Ngân Hà ✨',
                    icon: '✨',
                    targetSelector: targetStar ? targetStar : '#constellation-game',
                    pointerDirection: 'bottom',
                    pointerText: 'Chạm nối ngôi sao'
                };
            }
        }

        // Stage 4: Full Blossom & Gifts
        if (stageNum >= 3) {
            // Rotating guide suggestions for the 4 hidden gifts in Stage 4
            const sec = Math.floor(Date.now() / 8000) % 4;

            if (sec === 0) {
                const aoDai = document.getElementById('ao-dai-viet-stage4');
                if (aoDai && !aoDai.classList.contains('hidden')) {
                    return {
                        key: 'stage-4-aodai',
                        stepTag: 'HOA NỞ RỰC RỠ',
                        message: 'Chạm vào cô gái Áo Dài bên hoa sen để đọc bài thơ 20/10 ngọt ngào 🪷',
                        icon: '🪷',
                        targetSelector: '#ao-dai-viet-stage4',
                        pointerDirection: 'top',
                        pointerText: 'Chạm nàng thơ Áo Dài'
                    };
                }
            }

            if (sec === 1) {
                const secretBtn = document.getElementById('secret-letter-trigger-btn');
                if (secretBtn && secretBtn.offsetParent) {
                    return {
                        key: 'stage-4-letter',
                        stepTag: 'THƯ BÍ MẬT',
                        message: 'Mở bức Thư Polaroid Bí Mật ở góc trái để đọc lời chúc yêu thương 💌',
                        icon: '💌',
                        targetSelector: '#secret-letter-trigger-btn',
                        pointerDirection: 'top',
                        pointerText: 'Mở thư bí mật'
                    };
                }
            }

            if (sec === 2) {
                const passBtn = document.getElementById('open-boarding-pass-btn');
                if (passBtn && !passBtn.classList.contains('hidden') && passBtn.offsetParent) {
                    return {
                        key: 'stage-4-postcard',
                        stepTag: 'BƯU THIẾP 9:16',
                        message: 'Bấm nhận Bưu Thiếp Kỷ Niệm 20/10 ở góc phải để tạo ảnh thẻ hoa lưu niệm 📥',
                        icon: '📥',
                        targetSelector: '#open-boarding-pass-btn',
                        pointerDirection: 'top',
                        pointerText: 'Nhận bưu thiếp'
                    };
                }
            }

            // Default Stage 4: Harp & Weather Orrery
            return {
                key: 'stage-4-harp',
                stepTag: 'MỘC CẦM & 4 MÙA',
                message: 'Vuốt dây Mộc Cầm góc phải hoặc xoay Bánh xe thiên văn góc trên để đổi 4 mùa 🎶',
                icon: '🎶',
                targetSelector: '#plant-harp-strings-wrap',
                pointerDirection: 'left',
                pointerText: 'Gảy đàn Mộc Cầm'
            };
        }

        return null;
    };

    // Update Spotlight Position to Wrap Target Element
    const updateSpotlightPosition = (targetEl, pointerDir = 'bottom', pointerText = 'Chạm vào đây') => {
        if (!targetBoxEl || !pointerHandEl || !pointerBadgeEl) return;

        if (!targetEl || !isGuideEnabled) {
            targetBoxEl.style.opacity = '0';
            targetBoxEl.style.pointerEvents = 'none';
            return;
        }

        const rect = targetEl.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || rect.bottom < 0 || rect.top > window.innerHeight) {
            targetBoxEl.style.opacity = '0';
            return;
        }

        // Padding around target
        const pad = 6;
        const boxLeft = Math.max(4, rect.left - pad);
        const boxTop = Math.max(4, rect.top - pad);
        const boxWidth = Math.min(window.innerWidth - boxLeft - 4, rect.width + pad * 2);
        const boxHeight = Math.min(window.innerHeight - boxTop - 4, rect.height + pad * 2);

        targetBoxEl.style.transform = `translate3d(${boxLeft}px, ${boxTop}px, 0)`;
        targetBoxEl.style.width = `${boxWidth}px`;
        targetBoxEl.style.height = `${boxHeight}px`;
        targetBoxEl.style.opacity = '1';

        pointerBadgeEl.textContent = pointerText;

        // Position pointer hand relative to target box (hand points directly AT the target)
        pointerHandEl.className = `realtime-pointer-hand dir-${pointerDir}`;
        const handGlyph = pointerHandEl.querySelector('.pointer-hand-glyph');

        if (pointerDir === 'top') {
            // Container is ABOVE target -> hand points DOWN towards target
            if (handGlyph) handGlyph.textContent = '👇';
        } else if (pointerDir === 'bottom') {
            // Container is BELOW target -> hand points UP towards target
            if (handGlyph) handGlyph.textContent = '👆';
        } else if (pointerDir === 'left') {
            // Container is LEFT of target -> hand points RIGHT towards target
            if (handGlyph) handGlyph.textContent = '👉';
        } else {
            // Container is RIGHT of target -> hand points LEFT towards target
            if (handGlyph) handGlyph.textContent = '👈';
        }
    };

    // Main Update Loop
    const tickRealtimeGuide = () => {
        const state = evaluateCurrentState();
        if (!state) {
            if (hudEl) hudEl.classList.add('hidden');
            if (targetBoxEl) targetBoxEl.style.opacity = '0';
            return;
        }

        if (hudEl && isGuideEnabled) {
            hudEl.classList.remove('hidden');
            if (iconEl) iconEl.textContent = state.icon;
            if (stepTagEl) stepTagEl.textContent = state.stepTag;
            if (msgEl && msgEl.textContent !== state.message) {
                msgEl.textContent = state.message;
                // Subtle text flash animation
                msgEl.classList.remove('text-pop');
                void msgEl.offsetWidth;
                msgEl.classList.add('text-pop');
            }
        }

        // Resolve Target Element
        let targetEl = null;
        if (state.targetSelector instanceof HTMLElement) {
            targetEl = state.targetSelector;
        } else if (typeof state.targetSelector === 'string') {
            targetEl = document.querySelector(state.targetSelector);
        }

        currentTargetEl = targetEl;
        updateSpotlightPosition(targetEl, state.pointerDirection, state.pointerText);
        lastStateKey = state.key;
    };

    // Toggle Real-time Guide on / off
    const toggleGuide = () => {
        isGuideEnabled = !isGuideEnabled;
        if (toggleIcon) {
            toggleIcon.textContent = isGuideEnabled ? '👁️' : '🙈';
        }
        if (hudEl) {
            hudEl.classList.toggle('is-minimized', !isGuideEnabled);
        }
        if (targetBoxEl) {
            targetBoxEl.style.opacity = isGuideEnabled ? '1' : '0';
        }
        if (typeof window.playKeyTapSFX === 'function') {
            window.playKeyTapSFX();
        }
        if (isGuideEnabled) {
            tickRealtimeGuide();
        }
    };

    // Initialization
    const initRealtimeGuide = () => {
        hudEl = document.getElementById('realtime-guide-hud');
        iconEl = document.getElementById('realtime-guide-icon');
        stepTagEl = document.getElementById('realtime-guide-step-tag');
        msgEl = document.getElementById('realtime-guide-msg');
        toggleBtn = document.getElementById('realtime-guide-toggle-btn');
        toggleIcon = document.getElementById('realtime-toggle-icon');
        overlayEl = document.getElementById('realtime-spotlight-overlay');
        targetBoxEl = document.getElementById('realtime-target-box');
        pointerHandEl = document.getElementById('realtime-pointer-hand');
        pointerBadgeEl = document.getElementById('realtime-pointer-badge');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleGuide();
            });
        }

        // Tap HUD to open full handbook
        if (hudEl) {
            hudEl.addEventListener('click', (e) => {
                if (e.target === toggleBtn || toggleBtn.contains(e.target)) return;
                if (typeof window.openExperienceGuide === 'function') {
                    window.openExperienceGuide('steps');
                }
            });
        }

        // Real-time Event Hooks (react immediately on clicks/inputs)
        ['click', 'input', 'change', 'touchend'].forEach(evt => {
            document.addEventListener(evt, () => {
                setTimeout(tickRealtimeGuide, 60);
                setTimeout(tickRealtimeGuide, 280);
            }, { passive: true });
        });

        window.addEventListener('resize', () => {
            if (currentTargetEl) {
                updateSpotlightPosition(currentTargetEl);
            }
        });

        // Fast polling timer (300ms) for seamless real-time tracking
        clearInterval(pollInterval);
        pollInterval = setInterval(tickRealtimeGuide, 300);

        // Initial run
        setTimeout(tickRealtimeGuide, 400);
    };

    // Public API
    window.refreshRealtimeGuide = tickRealtimeGuide;
    window.toggleRealtimeGuide = toggleGuide;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRealtimeGuide);
    } else {
        initRealtimeGuide();
    }
})();
