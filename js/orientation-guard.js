/**
 * DUAL-ORIENTATION ADAPTIVE GUARD (ĐIỀU PHỐI XOAY DỌC / XOAY NGANG LINH HOẠT)
 * - Tự động thích ứng đa thiết bị (iPhone 14/15/SE, Android Galaxy/Pixel/Xiaomi).
 * - Hỗ trợ 2 chế độ:
 *     + 'landscape': Dành cho Vườn hoa chính (Stage 1-4), Cây trổ hoa & Minigames.
 *     + 'portrait': Dành cho Bàn chế tác dập sáp Stage 0, Trắc nghiệm hoa 3D, Thiệp bưu hoa 9:16.
 * - Tuyệt đối không spoil bí mật 20/10.
 * - Hỗ trợ nút Bypass ("Tiếp tục ở góc nhìn hiện tại") để người dùng khóa xoay màn hình không bị kẹt cứng.
 */
(function () {
    'use strict';

    const root = document.documentElement;
    let preferredOrientation = 'portrait'; // Bắt đầu ở Stage 0: Ưu tiên xoay dọc để dập sáp
    let isBypassedForCurrentScene = false;

    const overlay = document.getElementById('rotate-device-overlay');
    const ribbonText = document.getElementById('rotate-ribbon-text');
    const titleEl = document.getElementById('rotate-poetic-title');
    const descEl = document.getElementById('rotate-device-text');
    const subTextEl = document.getElementById('rotate-hint-sub-text');
    const bypassBtn = document.getElementById('rotate-bypass-btn');
    const phoneGraphic = document.getElementById('rotate-artisan-phone');

    const BACKGROUND_IDS = [
        'wrap',
        'name-modal',
        'time-lock-modal',
        'secret-letter-modal',
        'garden-polaroid-modal',
        'boarding-pass-modal',
        'experience-guide-modal'
    ];

    const setInert = (on) => {
        BACKGROUND_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            if (on) el.setAttribute('inert', '');
            else el.removeAttribute('inert');
        });
    };

    const isTouchPhone = () => {
        const isCoarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches || ('ontouchstart' in window);
        const shortEdge = Math.min(window.innerWidth, window.innerHeight);
        const longEdge = Math.max(window.innerWidth, window.innerHeight);
        // Nhận diện điện thoại (short edge <= 540px, long edge <= 960px)
        return isCoarse && (shortEdge <= 540 || longEdge <= 960);
    };

    const updateOverlayContent = (neededDirection) => {
        if (!overlay) return;

        if (neededDirection === 'landscape') {
            if (ribbonText) ribbonText.textContent = 'Nét Đẹp Khu Vườn';
            if (titleEl) titleEl.textContent = 'Góc Nhìn Toàn Cảnh';
            if (descEl) descEl.textContent = 'Để cảm nhận trọn vẹn cảnh sắc khu vườn và những giai điệu êm đềm, bạn vui lòng xoay ngang màn hình nhé ✨';
            if (subTextEl) subTextEl.textContent = 'Khung trời hoa lá & giai điệu bình yên đang chờ đón bạn';
            overlay.classList.remove('suggest-portrait');
            overlay.classList.add('suggest-landscape');
        } else if (neededDirection === 'portrait') {
            if (ribbonText) ribbonText.textContent = 'Nét Đẹp Thủ Công';
            if (titleEl) titleEl.textContent = 'Bàn Chế Tác & Thiệp Hoa';
            if (descEl) descEl.textContent = 'Để trải nghiệm trọn vẹn thao tác dập dấu sáp và chiêm ngưỡng tấm thiệp hoa, bạn vui lòng xoay dọc màn hình nhé ✨';
            if (subTextEl) subTextEl.textContent = 'Không gian chế tác trang nhã đang mở ra';
            overlay.classList.remove('suggest-landscape');
            overlay.classList.add('suggest-portrait');
        }
    };

    const checkOrientationState = () => {
        if (!isTouchPhone() || isBypassedForCurrentScene || preferredOrientation === 'any') {
            root.classList.remove('is-orientation-blocked', 'is-portrait-blocked', 'is-landscape-blocked');
            if (overlay) overlay.classList.remove('is-active');
            setInert(false);
            return;
        }

        const isCurrentlyPortrait = window.innerHeight > window.innerWidth;
        let isBlocked = false;
        let neededDirection = '';

        if (preferredOrientation === 'landscape' && isCurrentlyPortrait) {
            isBlocked = true;
            neededDirection = 'landscape';
        } else if (preferredOrientation === 'portrait' && !isCurrentlyPortrait) {
            isBlocked = true;
            neededDirection = 'portrait';
        }

        if (isBlocked) {
            updateOverlayContent(neededDirection);
            root.classList.add('is-orientation-blocked');
            root.classList.toggle('is-portrait-blocked', isCurrentlyPortrait);
            root.classList.toggle('is-landscape-blocked', !isCurrentlyPortrait);
            if (overlay) overlay.classList.add('is-active');
            setInert(true);
        } else {
            root.classList.remove('is-orientation-blocked', 'is-portrait-blocked', 'is-landscape-blocked');
            if (overlay) overlay.classList.remove('is-active');
            setInert(false);

            if (typeof window.refreshRealtimeGuide === 'function') {
                setTimeout(window.refreshRealtimeGuide, 120);
            }
        }
    };

    // Public API: Thay đổi góc nhìn ưu tiên theo kịch bản trải nghiệm
    window.setPreferredOrientation = (targetOrientation = 'landscape', resetBypass = true) => {
        // Nếu người dùng đã chọn cố định xem ở màn hình dọc thì tôn trọng thiết lập
        const isPinnedPortrait = sessionStorage.getItem('pinned_portrait_mode') === 'true';
        if (isPinnedPortrait && targetOrientation === 'landscape') {
            targetOrientation = 'portrait';
            resetBypass = false;
        }

        preferredOrientation = targetOrientation;
        root.setAttribute('data-preferred-orientation', targetOrientation);
        if (resetBypass && !isPinnedPortrait) {
            isBypassedForCurrentScene = false;
            root.classList.remove('orientation-bypassed');
        } else if (isPinnedPortrait) {
            isBypassedForCurrentScene = true;
            root.classList.add('orientation-bypassed');
        }
        checkOrientationState();
        updateOrientationToggleLabel();
    };

    const updateOrientationToggleLabel = () => {
        const toggleBtn = document.getElementById('mobile-orientation-toggle-btn');
        if (!toggleBtn) return;
        const label = toggleBtn.querySelector('.btn-label');
        const icon = toggleBtn.querySelector('.btn-icon');
        const isCurrentlyPortrait = window.innerHeight > window.innerWidth;
        if (label) {
            label.textContent = isCurrentlyPortrait ? 'Xoay Ngang' : 'Xoay Dọc';
        }
        if (icon) {
            icon.textContent = isCurrentlyPortrait ? '🔄' : '📱';
        }
    };

    // Nút Xem Ở Màn Hình Dọc (Từ modal gợi ý xoay)
    const portraitModeBtn = document.getElementById('rotate-portrait-mode-btn');
    if (portraitModeBtn) {
        portraitModeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sessionStorage.setItem('pinned_portrait_mode', 'true');
            isBypassedForCurrentScene = true;
            preferredOrientation = 'portrait';
            root.setAttribute('data-preferred-orientation', 'portrait');
            root.classList.add('orientation-bypassed');
            if (typeof window.playKeyTapSFX === 'function') window.playKeyTapSFX();
            checkOrientationState();
            updateOrientationToggleLabel();
        });
    }

    // Nút Bypass: Tiếp tục ở góc nhìn hiện tại
    if (bypassBtn) {
        bypassBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isBypassedForCurrentScene = true;
            root.classList.add('orientation-bypassed');
            if (typeof window.playKeyTapSFX === 'function') window.playKeyTapSFX();
            checkOrientationState();
        });
    }

    // Nút Đổi Chiều Màn Hình trên Top Dock Mobile
    const mobileOrientationToggleBtn = document.getElementById('mobile-orientation-toggle-btn');
    if (mobileOrientationToggleBtn) {
        mobileOrientationToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isCurrentlyPortrait = window.innerHeight > window.innerWidth;
            if (isCurrentlyPortrait) {
                // Đang dọc -> muốn xoay ngang
                sessionStorage.removeItem('pinned_portrait_mode');
                window.setPreferredOrientation('landscape', true);
            } else {
                // Đang ngang -> muốn chuyển sang dọc
                sessionStorage.setItem('pinned_portrait_mode', 'true');
                window.setPreferredOrientation('portrait', false);
            }
            if (typeof window.playKeyTapSFX === 'function') window.playKeyTapSFX();
            if (typeof window.triggerHaptic === 'function') window.triggerHaptic('tap');
            updateOrientationToggleLabel();
        });
    }

    // =========================================================================
    // EMERGENCY FAST-TRACK: Mở Thẳng Quà & Thiệp 20/10 Khi Gặp Sự Cố
    // =========================================================================
    window.emergencyFastTrackToStage4 = async () => {
        // 1. Tắt toàn bộ overlay chặn xoay màn hình và unblock touch
        isBypassedForCurrentScene = true;
        root.classList.add('orientation-bypassed');
        root.classList.remove('is-orientation-blocked', 'is-portrait-blocked', 'is-landscape-blocked');
        if (overlay) overlay.classList.remove('is-active');
        setInert(false);

        // 2. Ẩn modal chế tác Stage 0 & modal khóa thời gian nếu còn mở
        const nameModal = document.getElementById('name-modal');
        if (nameModal) {
            nameModal.classList.add('hidden');
            nameModal.style.display = 'none';
        }
        const timeLockModal = document.getElementById('time-lock-modal');
        if (timeLockModal) {
            timeLockModal.classList.add('hidden');
            timeLockModal.style.display = 'none';
        }
        const waxDesk = document.getElementById('wax-seal-desk');
        if (waxDesk) {
            waxDesk.classList.add('hidden');
            waxDesk.style.display = 'none';
        }

        // 3. Cập nhật state khu vườn trực tiếp lên Stage 4 (Cây nở hoa & nhận thiệp quà)
        window.gardenState = window.gardenState || {};
        window.gardenState.currentStage = 3;
        window.gardenState.isWatered = true;
        window.gardenState.isFertilized = true;

        // 4. Dọn dẹp minigames
        if (typeof window.cleanupStage === 'function') {
            window.cleanupStage('all');
        }
        document.body.classList.remove('stage-0-active', 'stage-1-active', 'stage-2-active', 'stage-3-active');
        document.body.classList.add('stage-4-active');

        // 5. Kích hoạt cành cây trổ hoa và hiển thị thư
        if (typeof window.triggerNextStage === 'function') {
            window.triggerNextStage();
        }

        // Ensure bloomed tree canvas is generated immediately
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

        if (typeof window.loadContentAndAnimateText === 'function') {
            window.loadContentAndAnimateText();
        }

        // 6. Hiển thị deck hộp quà kép và khởi tạo click delegation
        const giftDeck = document.getElementById('secret-gift-boxes-deck');
        if (giftDeck) {
            giftDeck.classList.remove('hidden');
            giftDeck.style.display = 'flex';
            giftDeck.style.visibility = 'visible';
            giftDeck.style.opacity = '1';
            giftDeck.style.pointerEvents = 'auto';
        }
        if (typeof window.initGiftBoxesDeck === 'function') {
            window.initGiftBoxesDeck();
        }

        // Mở khóa hộp quà 2 sẵn sàng
        if (typeof window.unlockGiftBox2 === 'function') {
            window.unlockGiftBox2(true);
        }

        // 7. Hiển thị nút thư bí mật và mở thư
        if (typeof window.revealSecretLetterButton === 'function') {
            window.revealSecretLetterButton();
        }
        setTimeout(() => {
            if (typeof window.openSecretLetterModal === 'function') {
                window.openSecretLetterModal();
            }
        }, 600);

        // 8. Hiệu ứng âm thanh & Mascot chúc mừng
        if (typeof window.playRobotChirpSFX === 'function') window.playRobotChirpSFX();
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('success');
        if (typeof window.showMascotSpeech === 'function') {
            window.showMascotSpeech("Khu vườn đã nở rộ trọn vẹn! Hãy mở quà và chiêm ngưỡng tấm thiệp 20/10 thân thương nhé! 🌸🎁✨", 5000);
        }
    };

    // Gắn sự kiện cho nút khẩn cấp trong overlay
    const emergencyBtn = document.getElementById('emergency-fast-track-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.emergencyFastTrackToStage4();
        });
    }

    // =========================================================================
    // CONDITIONAL MOBILE STRUGGLE HELPER (TRIGGERED ONLY ON NEED)
    // 1. Repeated screen flipping back & forth (>= 3 flips in 12s)
    // 2. Prolonged phase stuck timer (> 45s without progression)
    // =========================================================================
    const struggleHelper = document.getElementById('mobile-struggle-helper');
    const helperPortraitBtn = document.getElementById('struggle-helper-portrait-btn');
    const helperFastTrackBtn = document.getElementById('struggle-helper-fast-track-btn');
    const helperCloseBtn = document.getElementById('struggle-helper-close-btn');

    let hasDismissedStruggleHelper = false;
    let rotationTimestamps = [];
    let stageStuckTimer = null;
    let lastOrientationIsPortrait = window.innerHeight > window.innerWidth;

    const showStruggleHelper = (reason = '') => {
        if (hasDismissedStruggleHelper) return;
        if (window.gardenState && window.gardenState.currentStage >= 3) return;
        const isMobile = window.matchMedia('(max-width: 820px), (max-height: 540px)').matches || ('ontouchstart' in window);
        if (!isMobile) return;
        if (!struggleHelper) return;

        struggleHelper.classList.remove('hidden');
        if (typeof window.showMascotSpeech === 'function') {
            window.showMascotSpeech("Bạn có thấy khó thao tác không? Mình có hỗ trợ xoay dọc hoặc mở thẳng quà nè! 🏮🌸", 5000);
        }
        if (typeof window.playRobotChirpSFX === 'function') window.playRobotChirpSFX();
    };
    window.showStruggleHelper = showStruggleHelper;

    const hideStruggleHelper = () => {
        if (struggleHelper) struggleHelper.classList.add('hidden');
        hasDismissedStruggleHelper = true;
    };

    if (helperCloseBtn) {
        helperCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hideStruggleHelper();
        });
    }

    if (helperPortraitBtn) {
        helperPortraitBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sessionStorage.setItem('pinned_portrait_mode', 'true');
            if (typeof window.setPreferredOrientation === 'function') {
                window.setPreferredOrientation('portrait');
            }
            hideStruggleHelper();
        });
    }

    if (helperFastTrackBtn) {
        helperFastTrackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof window.emergencyFastTrackToStage4 === 'function') {
                window.emergencyFastTrackToStage4();
            }
            hideStruggleHelper();
        });
    }

    const resetStageStuckTimer = () => {
        if (stageStuckTimer) clearTimeout(stageStuckTimer);
        hasDismissedStruggleHelper = false;
        if (struggleHelper) struggleHelper.classList.add('hidden');
        if (window.gardenState && window.gardenState.currentStage >= 3) return;

        stageStuckTimer = setTimeout(() => {
            showStruggleHelper('timeout');
        }, 45000);
    };
    window.resetStageStuckTimer = resetStageStuckTimer;

    const checkRapidRotation = () => {
        const isPortraitNow = window.innerHeight > window.innerWidth;
        if (isPortraitNow !== lastOrientationIsPortrait) {
            lastOrientationIsPortrait = isPortraitNow;
            const now = Date.now();
            rotationTimestamps.push(now);
            rotationTimestamps = rotationTimestamps.filter(t => now - t < 12000);
            if (rotationTimestamps.length >= 3) {
                showStruggleHelper('rapid-rotation');
            }
        }
    };

    // Lắng nghe thay đổi kích thước và xoay màn hình
    window.addEventListener('resize', () => {
        checkOrientationState();
        checkRapidRotation();
    });
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            checkOrientationState();
            checkRapidRotation();
        }, 80);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const isPinnedPortrait = sessionStorage.getItem('pinned_portrait_mode') === 'true';
            window.setPreferredOrientation(isPinnedPortrait ? 'portrait' : 'portrait', false);
            resetStageStuckTimer();
        });
    } else {
        const isPinnedPortrait = sessionStorage.getItem('pinned_portrait_mode') === 'true';
        window.setPreferredOrientation(isPinnedPortrait ? 'portrait' : 'portrait', false);
        resetStageStuckTimer();
    }
})();
