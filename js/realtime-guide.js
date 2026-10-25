/**
 * REAL-TIME INTERACTIVE GUIDANCE ENGINE (HƯỚNG DẪN THỜI GIAN THỰC)
 * Automatically senses current journey phase, user inputs, and environmental state.
 * Real-time dynamic pointer hand, spotlight reticle, and live quest mission bar.
 */
(function () {
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
    let gestureTrailSvg = null;
    let gesturePathEl = null;
    let gestureSparkEl = null;
    let dewdropRippleEl = null;

    let isGuideEnabled = true;
    let currentTargetEl = null;
    let pollInterval = null;
    let lastStateKey = '';
    let currentLockDirection = false;
    let revealedStateKey = '';
    let currentPointerDir = 'bottom';
    let currentPointerText = '';
    let currentGesture = null;
    let gestureAnimFrame = null;

    // Detect mobile touch capability to prioritize non-obtrusive dewdrop ripples
    const isTouchDevice = () => {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    };

    // Smart Exploration Memory: Tracks features user has already opened or interacted with in Stage 4
    const userInteractions = {
        openedLetter: false,
        openedPostcard: false,
        interactedAoDai: false,
        clickedClover: false,
        pluckedHarp: false,
        toggledOrrery: false
    };

    // Step Matrix Evaluator: Returns { key, stepTag, message, icon, targetSelector, pointerDirection, pointerText }
    const evaluateCurrentState = () => {
        // 1. TIME LOCK GATE
        const timeLockModal = document.getElementById('time-lock-modal');
        if (timeLockModal && !timeLockModal.classList.contains('hidden') && timeLockModal.style.display !== 'none') {
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
                    stepTag: 'BƯỚC 1/7',
                    message: 'Hãy gõ tên của bạn lên khuôn đồng để bắt đầu nghi thức đúc triện son 🪶',
                    icon: '✍️',
                    targetSelector: '#name-input',
                    pointerDirection: 'bottom',
                    pointerText: 'Gõ tên bạn vào đây'
                };
            }

            // Step 2.2: Select Wax Beads
            const beadCountEl = document.getElementById('bead-count-val');
            const beadCount = beadCountEl ? parseInt(beadCountEl.textContent || '0', 10) : 0;
            const quickDropBtn = document.getElementById('hearth-quick-drop-btn');
            if (beadCount < 3) {
                return {
                    key: 'atelier-beads',
                    stepTag: 'BƯỚC 2/7',
                    message: `Đã chọn ${beadCount}/3 viên sáp. Chạm chọn thêm sáp hoặc bấm 'Phối màu nhanh ✨' 🎨`,
                    icon: '🎨',
                    targetSelector: quickDropBtn && quickDropBtn.offsetParent ? '#hearth-quick-drop-btn' : '#wax-beads-tray',
                    // Hand sits ABOVE the target and points DOWN at it
                    pointerDirection: 'top',
                    lockDirection: true,
                    pointerText: 'Bấm phối màu nhanh hoặc chọn sáp',
                    // As soon as >=1 wax is picked the hand is hidden; it only returns at Step 3 (engraving crest)
                    hideHand: beadCount >= 1
                };
            }

            // Step 2.2b: Choose engraving pattern (Hoa văn khắc triện) - no default is preselected
            const crestChosen = document.querySelector('.crest-opt-btn.is-selected');
            if (!crestChosen) {
                return {
                    key: 'atelier-crest',
                    stepTag: 'BƯỚC 3/7',
                    message: 'Chọn một hoa văn khắc triện để khắc lên con dấu đồng 🪷🌼🦋🌙',
                    icon: '🪷',
                    targetSelector: '#crest-selector-wrap',
                    pointerDirection: 'top',
                    lockDirection: true,
                    pointerText: 'Chọn hoa văn khắc triện'
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
                    stepTag: 'BƯỚC 4/7',
                    message: 'Chạm hoặc kéo que diêm để quẹt lửa đánh thức ngọn nến thơm 🔥',
                    icon: '⚡',
                    targetSelector: '#match-striker-strip',
                    pointerDirection: 'top',
                    pointerText: 'Chạm quẹt diêm lấy lửa',
                    gesture: 'drag-horizontal'
                };
            }

            // Step 2.4: Light Candle
            if (isMatchLit && !isCandleLit) {
                return {
                    key: 'atelier-candle',
                    stepTag: 'BƯỚC 4/7',
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
                    stepTag: 'BƯỚC 5/7',
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
                    stepTag: 'BƯỚC 6/7',
                    message: 'Sáp đã tan chảy hoàn mỹ! Chạm vào thìa đồng để rót sáp lỏng sang phong thư 🍯',
                    icon: '🍯',
                    targetSelector: '#brass-spoon',
                    pointerDirection: 'top',
                    pointerText: 'Chạm rót sáp',
                    gesture: 'drag-down'
                };
            }

            // Step 2.7: Stamp Seal
            if (isWaxPoured && !isWaxStamped) {
                return {
                    key: 'atelier-stamp',
                    stepTag: 'BƯỚC 7/7',
                    message: 'Chạm hoặc kéo con dấu đồng dập vào vũng sáp son để khai mở cổng hoa 💮',
                    icon: '💮',
                    targetSelector: '#wax-seal-stamp',
                    pointerDirection: 'top',
                    pointerText: 'Chạm dập con dấu',
                    gesture: 'drag-down'
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

        // 3. FULL MODALS CHECK (Secret Letter, Boarding Pass, Handbook)
        // If a modal is actively open, guide the user's focus on the modal without background distraction
        const secretModal = document.getElementById('secret-letter-modal');
        if (secretModal && !secretModal.classList.contains('hidden') && secretModal.style.display !== 'none') {
            userInteractions.openedLetter = true;
            return {
                key: 'modal-letter-open',
                stepTag: 'THƯ BÍ MẬT',
                message: 'Đang mở Thư Polaroid Bí Mật 💌 Cuộn đọc tâm tình hoặc bấm Đóng/Rút thư mới',
                icon: '💌',
                targetSelector: null,
                pointerDirection: 'top',
                pointerText: ''
            };
        }

        const passModal = document.getElementById('boarding-pass-modal');
        if (passModal && !passModal.classList.contains('hidden') && passModal.style.display !== 'none') {
            userInteractions.openedPostcard = true;
            return {
                key: 'modal-postcard-open',
                stepTag: 'BƯU THIẾP 9:16',
                message: 'Đang xem Bưu Thiếp Kỷ Niệm 📥 Chạm đổi loài hoa hoặc bấm "Tải về" để lưu giữ ảnh thẻ hoa',
                icon: '📥',
                targetSelector: '#save-boarding-pass-btn',
                pointerDirection: 'bottom',
                pointerText: 'Lưu bưu thiếp'
            };
        }

        const handbookModal = document.getElementById('experience-guide-modal');
        if (handbookModal && !handbookModal.classList.contains('hidden') && handbookModal.style.display !== 'none') {
            return {
                key: 'modal-handbook-open',
                stepTag: 'SỔ TAY HÀNH TRÌNH',
                message: 'Đang mở Sổ Tay Trải Nghiệm 📖 Bạn có thể xem lộ trình 4 giai đoạn hoặc khám phá bí mật',
                icon: '📖',
                targetSelector: null,
                pointerDirection: 'top',
                pointerText: ''
            };
        }

        // 4. GARDEN ACTIVE STAGES (Zero Overlap between stages!)
        const gState = window.gardenState || { currentStage: 0 };
        const stageNum = gState.currentStage;

        // --- GIAI ĐOẠN 1: Hạt giống & Mầm non (stageNum === 0) ---
        if (stageNum === 0) {
            const isWatered = Boolean(gState.isWatered);
            const isFertilized = Boolean(gState.isFertilized);

            if (!isWatered) {
                const cloudShifter = document.getElementById('atmosphere-cloud-shifter');
                const isCloudActive = cloudShifter && (cloudShifter.classList.contains('shifter-active') || cloudShifter.classList.contains('shifter-completed'));
                return {
                    key: 'stage-1-water',
                    stepTag: 'GIAI ĐOẠN 1',
                    message: isCloudActive
                        ? 'Mưa sương sớm đang tưới tắm mát lành cho mầm non... 🌧️✨'
                        : 'Chồi non đang khát! Chạm hoặc kéo Đám Mây Mưa để gọi giọt sương mai tưới tắm 🌧️',
                    icon: '🌧️',
                    targetSelector: '#atmosphere-cloud-shifter',
                    pointerDirection: 'bottom',
                    pointerText: 'Chạm gọi mưa sương',
                    gesture: 'drag-down'
                };
            }

            if (!isFertilized) {
                const sunShifter = document.getElementById('atmosphere-sun-shifter');
                const isSunActive = sunShifter && (sunShifter.classList.contains('shifter-active') || sunShifter.classList.contains('shifter-completed'));
                return {
                    key: 'stage-1-sun',
                    stepTag: 'GIAI ĐOẠN 1',
                    message: isSunActive
                        ? 'Ánh nắng ấm áp đang sưởi ấm chồi non nảy mầm... ☀️✨'
                        : 'Mầm cây cần ánh ấm! Chạm hoặc kéo Vệt Nắng Ban Mai để sưởi ấm chồi non ☀️',
                    icon: '☀️',
                    targetSelector: '#atmosphere-sun-shifter',
                    pointerDirection: 'bottom',
                    pointerText: 'Chạm sưởi ấm mầm',
                    gesture: 'drag-horizontal'
                };
            }

            // Both watered and fertilized in Stage 1 -> sprouting celebration
            return {
                key: 'stage-1-sprouting',
                stepTag: 'GIAI ĐOẠN 1',
                message: 'Tuyệt vời! Mầm non đã đủ sương nắng và đang vươn mình lớn lên... 🌱✨',
                icon: '🌱',
                targetSelector: '#tree',
                pointerDirection: 'top',
                pointerText: 'Mầm non thức giấc'
            };
        }

        // --- GIAI ĐOẠN 2: Vươn Cành & Hòa âm Simon (stageNum === 1) ---
        if (stageNum === 1) {
            if (!gState.isWatered) {
                const cloudShifter = document.getElementById('atmosphere-cloud-shifter');
                const isCloudActive = cloudShifter && (cloudShifter.classList.contains('shifter-active') || cloudShifter.classList.contains('shifter-completed'));
                return {
                    key: 'stage-2-water',
                    stepTag: 'GIAI ĐOẠN 2',
                    message: isCloudActive
                        ? 'Mưa sương sớm đang tưới tắm mát lành cho mầm non... 🌧️✨'
                        : 'Chồi non đang khát! Chạm hoặc kéo Đám Mây Mưa gọi sương mai tưới tắm 🌧️',
                    icon: '🌧️',
                    targetSelector: '#atmosphere-cloud-shifter',
                    pointerDirection: 'bottom',
                    pointerText: 'Chạm gọi mưa sương',
                    gesture: 'drag-down'
                };
            }

            const isSimonPlaying = (typeof window.isSimonPlaying === 'function' && window.isSimonPlaying())
                || Boolean(document.querySelector('#simon-game .simon-node.highlight'));

            if (isSimonPlaying) {
                return {
                    key: 'stage-2-simon-listening',
                    stepTag: 'GIAI ĐOẠN 2',
                    message: 'Lắng nghe khúc hòa âm chuông hoa và ghi nhớ các nốt nhạc ngân vang... 🎧🎶',
                    icon: '🎧',
                    targetSelector: null, // Không hiển thị ô vuông spotlight theo yêu cầu
                    pointerDirection: 'top',
                    pointerText: ''
                };
            }

            return {
                key: 'stage-2-simon-playing',
                stepTag: 'GIAI ĐOẠN 2',
                message: 'Đến lượt bạn! Chạm vào các phím chuông hoa theo đúng giai điệu vừa nghe 🎵',
                icon: '🎵',
                targetSelector: null, // Không hiển thị ô vuông spotlight theo yêu cầu
                pointerDirection: 'top',
                pointerText: ''
            };
        }

        // --- GIAI ĐOẠN 3: Đơm Nụ & Chòm sao Định Mệnh (stageNum === 2) ---
        if (stageNum === 2) {
            if (!gState.isFertilized) {
                const sunShifter = document.getElementById('atmosphere-sun-shifter');
                const isSunActive = sunShifter && (sunShifter.classList.contains('shifter-active') || sunShifter.classList.contains('shifter-completed'));
                return {
                    key: 'stage-3-sun',
                    stepTag: 'GIAI ĐOẠN 3',
                    message: isSunActive
                        ? 'Ánh nắng ấm áp đang sưởi ấm cành mầm chuẩn bị đơm nụ... ☀️✨'
                        : 'Cành lá cần nắng ấm! Chạm hoặc kéo Vệt Nắng Ban Mai để sưởi ấm khu vườn ☀️',
                    icon: '☀️',
                    targetSelector: '#atmosphere-sun-shifter',
                    pointerDirection: 'bottom',
                    pointerText: 'Chạm sưởi ấm cành',
                    gesture: 'drag-horizontal'
                };
            }

            const celebCard = document.getElementById('constellation-celebration-card');
            if (celebCard && celebCard.classList.contains('visible')) {
                return {
                    key: 'stage-3-celestial-reveal',
                    stepTag: '✦ CHIÊM NGƯỠNG CHÒM SAO ✦',
                    message: 'Chòm sao bừng sáng giữa ngân hà! Đang chuẩn bị đơm hoa kết trái... 🌟✨',
                    icon: '🌌',
                    targetSelector: null,
                    pointerDirection: 'top',
                    pointerText: ''
                };
            }

            const constellationGame = document.getElementById('constellation-game');
            let targetStar = null;
            if (constellationGame) {
                targetStar = constellationGame.querySelector('.star-node.next-target')
                    || constellationGame.querySelector('.star-node:not(.active):not(.decoy-star)');
            }

            return {
                key: 'stage-3-stars',
                stepTag: 'GIAI ĐOẠN 3',
                message: 'Chạm hoặc nối các vì sao theo thứ tự để thắp sáng chòm sao Định Mệnh ✨🌌',
                icon: '✨',
                targetSelector: targetStar || '#constellation-game',
                pointerDirection: 'bottom',
                pointerText: 'Nối ngôi sao này'
            };
        }

        // --- GIAI ĐOẠN 4: Vườn hoa nở rộ & Quà tặng (stageNum >= 3) ---
        if (stageNum >= 3) {
            // Prioritize unvisited gifts so the user is guided to each experience,
            // without ever nagging about something they have already opened!
            const secretBtn = document.getElementById('secret-letter-trigger-btn');
            if (!userInteractions.openedLetter && secretBtn && secretBtn.offsetParent) {
                return {
                    key: 'stage-4-letter',
                    stepTag: 'THƯ BÍ MẬT',
                    message: 'Mở bức Thư Polaroid Bí Mật để khám phá những điều bất ngờ và trắc nghiệm hoa 💌',
                    icon: '💌',
                    targetSelector: '#secret-letter-trigger-btn',
                    pointerDirection: 'top',
                    pointerText: 'Mở thư bí mật'
                };
            }

            const passBtn = document.getElementById('open-boarding-pass-btn');
            if (!userInteractions.openedPostcard && passBtn && !passBtn.classList.contains('hidden') && passBtn.offsetParent) {
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

            const aoDai = document.getElementById('ao-dai-viet-stage4');
            if (!userInteractions.interactedAoDai && aoDai && !aoDai.classList.contains('hidden') && aoDai.offsetParent) {
                return {
                    key: 'stage-4-aodai',
                    stepTag: 'THIẾU NỮ ÁO DÀI',
                    message: 'Chạm vào thiếu nữ Áo Dài bên đóa sen hồng để đọc những vần thơ thanh nhã 🪷',
                    icon: '🪷',
                    targetSelector: '#ao-dai-viet-stage4',
                    pointerDirection: 'top',
                    pointerText: 'Chạm thiếu nữ Áo Dài'
                };
            }

            const clover = document.getElementById('sprout-lucky-clover');
            if (!userInteractions.clickedClover && clover && !clover.classList.contains('hidden') && clover.offsetParent) {
                return {
                    key: 'stage-4-clover',
                    stepTag: 'CỎ 4 LÁ MAY MẮN',
                    message: 'Chạm vào nhánh Cỏ 4 Lá May Mắn để nhận thông điệp bình an ngày 20/10 🍀',
                    icon: '🍀',
                    targetSelector: '#sprout-lucky-clover',
                    pointerDirection: 'top',
                    pointerText: 'Chạm cỏ 4 lá'
                };
            }

            // When all primary gifts have been opened, celebrate completed journey
            return {
                key: 'stage-4-ambient',
                stepTag: 'VƯỜN HOA HOÀN MỸ',
                message: 'Khu vườn 20/10 đã nở hoa trọn vẹn! Chúc bạn luôn rạng rỡ, bình an và yêu thương chính mình trọn vẹn 🌸✨',
                icon: '🌸',
                targetSelector: null,
                pointerDirection: 'none',
                pointerText: ''
            };
        }

        return null;
    };

    // Animate Luminous Silk Gesture Trail (Quẹt diêm, Kéo mây, Kéo nắng, Dập triện)
    const updateGestureTrail = (gesture, targetRect) => {
        if (!gestureTrailSvg || !gesturePathEl || !gestureSparkEl) return;

        if (!gesture || !targetRect || targetRect.width === 0 || targetRect.bottom < 0 || targetRect.top > window.innerHeight) {
            gestureTrailSvg.style.opacity = '0';
            if (gestureAnimFrame) {
                cancelAnimationFrame(gestureAnimFrame);
                gestureAnimFrame = null;
            }
            currentGesture = null;
            return;
        }

        let startX, startY, endX, endY;
        if (gesture === 'drag-down') {
            startX = targetRect.left + targetRect.width / 2;
            startY = targetRect.top + targetRect.height * 0.35;
            endX = startX;
            endY = startY + Math.min(85, window.innerHeight - startY - 24);
        } else if (gesture === 'drag-horizontal') {
            startX = targetRect.left + targetRect.width * 0.15;
            startY = targetRect.top + targetRect.height / 2;
            endX = startX + Math.min(95, window.innerWidth - startX - 24);
            endY = startY;
        } else {
            gestureTrailSvg.style.opacity = '0';
            if (gestureAnimFrame) {
                cancelAnimationFrame(gestureAnimFrame);
                gestureAnimFrame = null;
            }
            currentGesture = null;
            return;
        }

        gestureTrailSvg.style.opacity = '1';
        gesturePathEl.setAttribute('d', `M ${startX.toFixed(1)} ${startY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}`);

        // Continuous smooth spark glide along path
        if (currentGesture === gesture && gestureAnimFrame) return;
        currentGesture = gesture;

        if (gestureAnimFrame) cancelAnimationFrame(gestureAnimFrame);

        const startTime = performance.now();
        const duration = 1800; // ms per stroke cycle

        const loopSpark = (now) => {
            if (!gestureTrailSvg || gestureTrailSvg.style.opacity === '0') {
                gestureAnimFrame = null;
                return;
            }
            const elapsed = (now - startTime) % duration;
            const p = elapsed / duration;
            if (p < 0.75) {
                const prog = p / 0.75;
                const ease = prog < 0.5 ? 2 * prog * prog : 1 - Math.pow(-2 * prog + 2, 2) / 2;
                const curX = startX + (endX - startX) * ease;
                const curY = startY + (endY - startY) * ease;
                gestureSparkEl.setAttribute('cx', curX.toFixed(1));
                gestureSparkEl.setAttribute('cy', curY.toFixed(1));
                gestureSparkEl.style.opacity = Math.sin(prog * Math.PI).toFixed(2);
            } else {
                gestureSparkEl.style.opacity = '0';
            }
            gestureAnimFrame = requestAnimationFrame(loopSpark);
        };
        gestureAnimFrame = requestAnimationFrame(loopSpark);
    };

    // Update Spotlight Position to Wrap Target Element
    const updateSpotlightPosition = (targetEl, pointerDir = 'bottom', pointerText = 'Chạm vào đây', lockDirection = false, gesture = null) => {
        if (!targetBoxEl || !pointerHandEl || !pointerBadgeEl) return;

        if (!targetEl || !isGuideEnabled) {
            targetBoxEl.style.opacity = '0';
            targetBoxEl.style.pointerEvents = 'none';
            updateGestureTrail(null, null);
            return;
        }

        const rect = targetEl.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || rect.bottom < 0 || rect.top > window.innerHeight) {
            targetBoxEl.style.opacity = '0';
            updateGestureTrail(null, null);
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

        pointerBadgeEl.textContent = pointerText || '';

        // Dynamic edge detection to prevent clipping
        let effectiveDir = pointerDir;
        if (lockDirection) {
            // Direction is part of the tutorial contract (e.g. hand above, pointing down): never flip it
        } else if (effectiveDir === 'top' && boxTop < 75) {
            effectiveDir = 'bottom';
        } else if (effectiveDir === 'bottom' && boxTop + boxHeight > window.innerHeight - 80) {
            effectiveDir = 'top';
        }
        if (effectiveDir === 'left' && boxLeft < 120) {
            effectiveDir = 'right';
        } else if (effectiveDir === 'right' && boxLeft + boxWidth > window.innerWidth - 120) {
            effectiveDir = 'left';
        }

        // Apply directional class for SVG Calligraphy Brush rotation & animation
        pointerHandEl.className = `realtime-pointer-hand dir-${effectiveDir}`;

        // Render gesture drag hint trail
        updateGestureTrail(gesture, rect);
    };

    // Scroll the atelier card (if it scrolls) so the target is on screen AND a hand drawn above it has room.
    // Returns true once the target is comfortably visible.
    const revealTargetForHand = (el, headroom) => {
        const scroller = el.closest('.atelier-paper-card');
        if (!scroller) return true;
        const rect = el.getBoundingClientRect();
        const bottomLimit = window.innerHeight - 24;
        let delta = 0;
        if (rect.top < headroom) {
            delta = rect.top - headroom;                         // negative: scroll up
        } else if (rect.bottom > bottomLimit) {
            delta = Math.min(rect.bottom - bottomLimit, rect.top - headroom); // scroll down, but keep headroom
        }
        if (delta) scroller.scrollTop += delta;
        return true;
    };

    // Main Update Loop
    const tickRealtimeGuide = () => {
        // Modal & Atelier Overlay Guard: Keep HUD and tutorial overlays quiet while modals are open
        const nameModalEl = document.getElementById('name-modal');
        const timeLockModalEl = document.getElementById('time-lock-modal');
        const rotateOverlayEl = document.getElementById('rotate-device-overlay');
        const isModalActive = Boolean(
            (nameModalEl && !nameModalEl.classList.contains('hidden') && nameModalEl.style.display !== 'none') ||
            (timeLockModalEl && !timeLockModalEl.classList.contains('hidden') && timeLockModalEl.style.display !== 'none') ||
            (rotateOverlayEl && !rotateOverlayEl.classList.contains('hidden'))
        );

        if (isModalActive) {
            if (hudEl) hudEl.classList.add('hidden');
            if (targetBoxEl) targetBoxEl.style.opacity = '0';
            updateGestureTrail(null, null);
            return;
        }

        const state = evaluateCurrentState();
        if (!state) {
            if (hudEl) hudEl.classList.add('hidden');
            if (targetBoxEl) targetBoxEl.style.opacity = '0';
            updateGestureTrail(null, null);
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

        // Tutorial hand temporarily hidden by the state machine (HUD message stays visible)
        if (state.hideHand) targetEl = null;

        // When a hand-above state first appears, scroll its target into view inside the card.
        // Deferred while the user is typing (soft keyboard open) so the name field never jumps away.
        if (state.lockDirection && state.key !== revealedStateKey && targetEl) {
            const ae = document.activeElement;
            const isTyping = ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA');
            if (!isTyping && revealTargetForHand(targetEl, 96)) revealedStateKey = state.key;
        }

        currentTargetEl = targetEl;
        currentLockDirection = Boolean(state.lockDirection);
        currentPointerDir = state.pointerDirection;
        currentPointerText = state.pointerText;
        currentGesture = state.gesture || null;
        updateSpotlightPosition(targetEl, state.pointerDirection, state.pointerText, currentLockDirection, state.gesture);
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
        if (!isGuideEnabled) {
            updateGestureTrail(null, null);
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
        gestureTrailSvg = document.getElementById('realtime-gesture-trail-svg');
        gesturePathEl = document.getElementById('realtime-gesture-path');
        gestureSparkEl = document.getElementById('realtime-gesture-spark');
        dewdropRippleEl = document.getElementById('realtime-dewdrop-ripple');

        if (isTouchDevice()) {
            document.body.classList.add('touch-guided');
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleGuide();
            });
        }

        // Tap HUD: In mobile landscape, toggle hint bubble with 4s auto-hide; otherwise open full handbook
        let hintBubbleTimer = null;
        if (hudEl) {
            hudEl.addEventListener('click', (e) => {
                if (toggleBtn && (e.target === toggleBtn || toggleBtn.contains(e.target))) return;

                const isLandscapeMobile = window.matchMedia('(max-height: 540px) and (orientation: landscape)').matches;
                if (isLandscapeMobile) {
                    // If user taps the expanded bubble text itself, open full handbook
                    if (hudEl.classList.contains('is-expanded-hint') && e.target.closest('.realtime-guide-text-group')) {
                        if (typeof window.openExperienceGuide === 'function') {
                            window.openExperienceGuide('steps');
                        }
                        return;
                    }

                    if (typeof window.playWaxClickSFX === 'function') {
                        window.playWaxClickSFX();
                    }

                    const isNowExpanded = hudEl.classList.toggle('is-expanded-hint');
                    if (hintBubbleTimer) {
                        clearTimeout(hintBubbleTimer);
                        hintBubbleTimer = null;
                    }
                    if (isNowExpanded) {
                        hintBubbleTimer = setTimeout(() => {
                            if (hudEl) hudEl.classList.remove('is-expanded-hint');
                            hintBubbleTimer = null;
                        }, 4000);
                    }
                    return;
                }

                if (typeof window.openExperienceGuide === 'function') {
                    window.openExperienceGuide('steps');
                }
            });
        }

        // Capture user interactions on Stage 4 elements so we never repeatedly guide already-done features
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (!target) return;
            if (target.closest('#secret-letter-trigger-btn') || target.closest('#secret-letter-modal')) {
                userInteractions.openedLetter = true;
            }
            if (target.closest('#open-boarding-pass-btn') || target.closest('#boarding-pass-modal')) {
                userInteractions.openedPostcard = true;
            }
            if (target.closest('#ao-dai-viet-stage4')) {
                userInteractions.interactedAoDai = true;
            }
            if (target.closest('#sprout-lucky-clover')) {
                userInteractions.clickedClover = true;
            }
            if (target.closest('#plant-harp-strings-wrap') || target.closest('.harp-string')) {
                userInteractions.pluckedHarp = true;
            }
            if (target.closest('#celestial-weather-orrery')) {
                userInteractions.toggledOrrery = true;
            }
            setTimeout(tickRealtimeGuide, 50);
            setTimeout(tickRealtimeGuide, 280);
        }, true);

        // Real-time Event Hooks (react immediately on clicks/inputs)
        ['input', 'change', 'touchend'].forEach(evt => {
            document.addEventListener(evt, () => {
                setTimeout(tickRealtimeGuide, 60);
                setTimeout(tickRealtimeGuide, 280);
            }, { passive: true });
        });

        window.addEventListener('resize', () => {
            if (currentTargetEl) {
                updateSpotlightPosition(currentTargetEl, currentPointerDir, currentPointerText, currentLockDirection, currentGesture);
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
    window.markRealtimeGuideActionDone = (actionKey) => {
        if (actionKey in userInteractions) {
            userInteractions[actionKey] = true;
            tickRealtimeGuide();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRealtimeGuide);
    } else {
        initRealtimeGuide();
    }
})();
