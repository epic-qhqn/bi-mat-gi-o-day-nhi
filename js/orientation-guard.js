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
        preferredOrientation = targetOrientation;
        root.setAttribute('data-preferred-orientation', targetOrientation);
        if (resetBypass) {
            isBypassedForCurrentScene = false;
            root.classList.remove('orientation-bypassed');
        }
        checkOrientationState();
    };

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

    // Lắng nghe thay đổi kích thước và xoay màn hình
    window.addEventListener('resize', checkOrientationState);
    window.addEventListener('orientationchange', () => {
        setTimeout(checkOrientationState, 80);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.setPreferredOrientation('portrait', false);
        });
    } else {
        window.setPreferredOrientation('portrait', false);
    }
})();
