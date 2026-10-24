/**
 * EXPERIENCE GUIDE & ONBOARDING CONTROLLER (CẨM NANG HƯỚNG DẪN TRẢI NGHIỆM)
 * Autonomous module providing interactive walkthrough, step-by-step stage guides,
 * easter eggs showcase, and intelligent contextual hint bubbles.
 */
(function () {
    'use strict';

    // DOM Element References
    const guideToggleBtn = document.getElementById('guide-toggle-btn');
    const guideModal = document.getElementById('experience-guide-modal');
    const guideCloseBtn = document.getElementById('guide-close-btn');
    const guideAcknowledgeBtn = document.getElementById('guide-acknowledge-btn');
    const guideHintBubble = document.getElementById('guide-quick-hint-bubble');
    const guideHintText = document.getElementById('guide-quick-hint-text');

    let hintDismissTimeout = null;
    let idleHintTimer = null;

    // Helper: Safe SFX Playback
    const playTapSound = () => {
        if (typeof window.playKeyTapSFX === 'function') {
            window.playKeyTapSFX();
        }
    };

    const playChimeSound = () => {
        if (typeof window.playChimeSFX === 'function') {
            window.playChimeSFX();
        }
    };

    // Modal Visibility Controllers
    const openGuide = (targetTab = 'steps') => {
        if (!guideModal) return;
        playChimeSound();
        guideModal.classList.remove('hidden');
        document.body.classList.add('guide-modal-open');

        // Dismiss any active hint bubble
        hideQuickHint();

        if (targetTab) {
            switchTab(targetTab);
        } else {
            const scrollContainer = guideModal.querySelector('.guide-body-scroll');
            if (scrollContainer) scrollContainer.scrollTop = 0;
        }
    };

    const closeGuide = () => {
        if (!guideModal) return;
        playTapSound();
        guideModal.classList.add('hidden');
        document.body.classList.remove('guide-modal-open');
    };

    // Tab Switching System
    const switchTab = (tabId) => {
        const tabBtns = document.querySelectorAll('.guide-tab-btn');
        const tabPanes = document.querySelectorAll('.guide-tab-pane');

        tabBtns.forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        tabPanes.forEach(pane => {
            const isTarget = pane.id === `guide-pane-${tabId}`;
            pane.classList.toggle('active', isTarget);
            pane.classList.toggle('hidden', !isTarget);
        });

        const scrollContainer = document.querySelector('.guide-body-scroll');
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
    };

    // Quick Hint Toast Manager
    const showQuickHint = (message, durationMs = 6000) => {
        if (!guideHintBubble || !guideHintText) return;
        guideHintText.textContent = message;
        guideHintBubble.classList.remove('hidden');
        guideHintBubble.classList.add('visible');

        clearTimeout(hintDismissTimeout);
        hintDismissTimeout = setTimeout(() => {
            hideQuickHint();
        }, durationMs);
    };

    const hideQuickHint = () => {
        if (!guideHintBubble) return;
        guideHintBubble.classList.remove('visible');
        guideHintBubble.classList.add('hidden');
    };

    // Stage Jump Shortcuts inside Guide
    const setupStageJumpButtons = () => {
        const jumpBtns = document.querySelectorAll('.guide-step-jump-btn');
        jumpBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const stageNum = parseInt(btn.dataset.jumpStage, 10);
                if (!isNaN(stageNum) && typeof window.jumpToGardenStage === 'function') {
                    closeGuide();
                    setTimeout(() => {
                        window.jumpToGardenStage(stageNum);
                    }, 200);
                }
            });
        });
    };

    // Stage Contextual Hints Table
    const stageHints = {
        0: 'Nhập tên của bạn lên khuôn đồng, chọn 3 viên sáp và quẹt diêm để đúc triện son mở cổng ✨',
        1: 'Chạm đám mây gọi mưa sương hoặc kéo vệt nắng ấm để tưới tắm chồi non và chạm cỏ 4 lá 🍀',
        2: 'Lắng nghe chuông hoa và gõ lại đúng giai điệu Đồng Dao để giúp cây vươn cành mạnh mẽ 🎵',
        3: 'Nối các vì sao sáng rực rỡ để vẽ nên chòm sao Trái Tim Ngân Hà lung linh ✨',
        4: 'Hoa đã nở rộ! Đừng quên mở Thư Bí Mật 💌 và Bưu Thiếp Kỷ Niệm 9:16 nhé 🌸'
    };

    // Public API for Stage Observers
    window.notifyStageHint = (stageIndex) => {
        const hint = stageHints[stageIndex];
        if (hint) {
            setTimeout(() => {
                showQuickHint(hint, 7000);
            }, 1200);
        }
    };

    // Idle Helper: If user has not interacted for 15s in Stage 1/2/3, show friendly guide hint
    const resetIdleTimer = () => {
        clearTimeout(idleHintTimer);
        idleHintTimer = setTimeout(() => {
            const currentStage = (window.gardenState && window.gardenState.currentStage) || 0;
            // Only remind if no modal is actively opened
            const isAnyModalOpen = document.querySelector('.modal-overlay:not(.hidden)');
            if (!isAnyModalOpen) {
                showQuickHint(stageHints[currentStage] || 'Chưa rõ phải làm gì? Chạm nút "Hướng Dẫn" góc trên nhé! ✨', 6000);
            }
        }, 15000);
    };

    // Event Listeners Binding
    const initGuideEventListeners = () => {
        if (guideToggleBtn) {
            guideToggleBtn.addEventListener('click', () => {
                openGuide('steps');
            });
        }

        if (guideCloseBtn) {
            guideCloseBtn.addEventListener('click', closeGuide);
        }

        if (guideAcknowledgeBtn) {
            guideAcknowledgeBtn.addEventListener('click', closeGuide);
        }

        // Close on Backdrop Click
        if (guideModal) {
            guideModal.addEventListener('click', (e) => {
                if (e.target === guideModal) {
                    closeGuide();
                }
            });
        }

        // Keyboard ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && guideModal && !guideModal.classList.contains('hidden')) {
                closeGuide();
            }
        });

        // Tab Switching Buttons
        const tabBtns = document.querySelectorAll('.guide-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                playTapSound();
                switchTab(btn.dataset.tab);
            });
        });

        // Quick Hint Bubble click opens guide
        if (guideHintBubble) {
            guideHintBubble.addEventListener('click', () => {
                openGuide('steps');
            });
        }

        // Track user interaction to reset idle timer
        ['pointerdown', 'keydown', 'touchstart'].forEach(evt => {
            document.addEventListener(evt, resetIdleTimer, { passive: true });
        });

        setupStageJumpButtons();

        // Initial welcome hint after 3 seconds on first load
        setTimeout(() => {
            showQuickHint('✦ Chào bạn! Bấm nút "Hướng Dẫn" ở góc trên bất cứ lúc nào nếu cần hỗ trợ nhé! ✨', 5500);
        }, 3000);
    };

    // Global APIs
    window.openExperienceGuide = openGuide;
    window.closeExperienceGuide = closeGuide;
    window.showExperienceHint = showQuickHint;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGuideEventListeners);
    } else {
        initGuideEventListeners();
    }
})();
