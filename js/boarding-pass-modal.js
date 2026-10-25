/**
 * EPIC FLOWER BOARDING PASS & PHOTOBOOTH KEEPSAKE MODAL LOGIC (SUB-PHASE 4.1 & 4.3)
 * Dynamic passenger name synchronization, flower profile shuffling,
 * Selfie photo upload into flower center, interactive ticket tearing with sparkles,
 * 3D tilt & hologram foil shimmer, wax seal certificate click, and quote copying.
 */
(function() {
    'use strict';

    // DOM Elements
    const openBtn = document.getElementById('open-boarding-pass-btn');
    const modal = document.getElementById('boarding-pass-modal');
    const closeBtn = document.getElementById('close-boarding-pass-btn');
    const passengerNameEl = document.getElementById('pass-passenger-name');
    const passengerCaptionEl = document.getElementById('frame-passenger-caption');

    const photoInput = document.getElementById('user-flower-photo-input');
    const uploadedAvatarImg = document.getElementById('user-uploaded-avatar');
    const flowerAvatarEmoji = document.getElementById('flower-avatar-emoji');
    const removePhotoBtn = document.getElementById('remove-flower-photo-btn');
    const photoUploadText = document.getElementById('photo-upload-text');

    const shuffleFlowerBtn = document.getElementById('shuffle-flower-profile-btn');
    const copyQuoteBtn = document.getElementById('copy-ticket-quote-btn');
    const toastEl = document.getElementById('ticket-action-toast');

    let toastTimer = null;

    // =========================================================================
    // 1. TOAST HELPER & DYNAMIC PASSENGER NAME
    // =========================================================================
    const showTicketToast = (msg, duration = 2800) => {
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.classList.remove('hidden');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastEl.classList.add('hidden');
        }, duration);
    };

    const updatePassengerName = () => {
        const rawName = window.currentUserName || (window.gardenState && window.gardenState.userName) || '';
        const displayName = rawName.trim() || 'Bạn Yêu Thương';
        if (passengerNameEl) passengerNameEl.textContent = displayName;
        if (passengerCaptionEl) passengerCaptionEl.textContent = `04 · Nét Duyên Gửi ${displayName}`;
    };

    // =========================================================================
    // 2. FLOWER PERSONALITY PROFILES BINDING
    // =========================================================================
    const applyFlowerProfileToUI = (profile) => {
        if (!profile) return;

        // Title & Quote
        const titleEl = document.getElementById('flower-id-title');
        const quoteEl = document.getElementById('flower-id-quote');
        if (titleEl) titleEl.textContent = profile.title;
        if (quoteEl) quoteEl.textContent = profile.quote;

        // Flower Petals SVG Colors
        const svgBg = document.getElementById('flower-svg-bg');
        if (svgBg && profile.bgColor) svgBg.setAttribute('fill', profile.bgColor);

        const petals = document.querySelectorAll('.flower-svg-petal');
        petals.forEach(petal => {
            if (profile.petalColor) petal.setAttribute('fill', profile.petalColor);
        });

        // Default Emoji (shown if user hasn't uploaded a selfie)
        if (flowerAvatarEmoji) {
            flowerAvatarEmoji.textContent = profile.emoji || '🌸';
        }

        // Personality Trait Pills
        const traitsContainer = document.getElementById('flower-trait-tags');
        if (traitsContainer && Array.isArray(profile.traits)) {
            traitsContainer.innerHTML = profile.traits
                .map(t => `<span class="trait-pill">${t}</span>`)
                .join('');
        }

        // Compatibility Match Box
        const matchBox = document.querySelector('.compat-box.match');
        if (matchBox && Array.isArray(profile.match)) {
            let matchHtml = `<span class="compat-title">Bạn hợp cạ với</span>`;
            profile.match.forEach(m => {
                matchHtml += `
                    <div class="compat-item">
                        <span class="compat-flower-icon">${m.icon}</span>
                        <div class="compat-text">
                            <strong>${m.name}</strong>
                            <small>${m.desc}</small>
                        </div>
                    </div>`;
            });
            matchBox.innerHTML = matchHtml;
        }

        // Compatibility Clash Box
        const clashBox = document.querySelector('.compat-box.clash');
        if (clashBox && Array.isArray(profile.clash)) {
            let clashHtml = `<span class="compat-title">Hơi lệch sóng với</span>`;
            profile.clash.forEach(c => {
                clashHtml += `
                    <div class="compat-item">
                        <span class="compat-flower-icon">${c.icon}</span>
                        <div class="compat-text">
                            <strong>${c.name}</strong>
                            <small>${c.desc}</small>
                        </div>
                    </div>`;
            });
            clashBox.innerHTML = clashHtml;
        }

        // Detailed Personality Checklist
        if (profile.checklist) {
            const desc1 = document.getElementById('trait-desc-1');
            const desc2 = document.getElementById('trait-desc-2');
            const desc3 = document.getElementById('trait-desc-3');
            if (desc1) desc1.textContent = profile.checklist.friend || '';
            if (desc2) desc2.textContent = profile.checklist.love || '';
            if (desc3) desc3.textContent = profile.checklist.pressure || '';
        }

        // ✦ Phonk Easter Egg trigger on Postcard (chỉ hiển thị nếu đúng 1 số loài hoa rực lửa / cá tính)
        const ticketPhonkBtn = document.getElementById('ticket-phonk-btn');
        if (ticketPhonkBtn) {
            const isEligible = window.PHONK_ELIGIBLE_FLOWERS && window.PHONK_ELIGIBLE_FLOWERS.includes(profile.id);
            if (isEligible) {
                ticketPhonkBtn.classList.remove('hidden');
                ticketPhonkBtn.classList.toggle('is-active', Boolean(window.isPhonkActive));
                const flame = ticketPhonkBtn.querySelector('.phonk-flame');
                if (flame) flame.textContent = window.isPhonkActive ? '🔥' : '⚡';
            } else {
                ticketPhonkBtn.classList.add('hidden');
            }
        }
    };

    // =========================================================================
    // 3. MODAL VISIBILITY & BUTTON REVEAL
    // =========================================================================
    const openBoardingPass = () => {
        if (!modal) return;
        updatePassengerName();
        if (typeof window.getCurrentFlowerProfile === 'function') {
            applyFlowerProfileToUI(window.getCurrentFlowerProfile());
        }
        // Thiệp bưu hoa di sản khổ dọc 1080x1920: Ưu tiên góc nhìn dọc trọn vẹn
        if (typeof window.setPreferredOrientation === 'function') {
            window.setPreferredOrientation('portrait');
        }
        modal.classList.remove('hidden');
        if (openBtn) openBtn.classList.remove('attention-pulse');
        if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
    };

    const closeBoardingPass = () => {
        if (!modal) return;
        modal.classList.add('hidden');
        // Quay trở lại không gian vườn hoa toàn cảnh
        if (typeof window.setPreferredOrientation === 'function') {
            window.setPreferredOrientation('landscape');
        }
    };

    const revealBoardingPassButton = () => {
        if (openBtn) {
            openBtn.classList.remove('hidden');
            openBtn.classList.add('attention-pulse');
        }
    };

    const hideBoardingPassButton = () => {
        if (openBtn) {
            openBtn.classList.add('hidden');
            openBtn.classList.remove('attention-pulse');
        }
    };

    const triggerCameraFlash = () => {
        const flashEl = document.getElementById('camera-flash-overlay');
        if (!flashEl) return;
        flashEl.classList.add('active');
        requestAnimationFrame(() => {
            setTimeout(() => {
                flashEl.classList.remove('active');
            }, 60);
        });
    };

    // =========================================================================
    // 4. SELFIE PHOTO UPLOAD & REMOVE
    // =========================================================================
    const setupPhotoUpload = () => {
        if (!photoInput) return;

        photoInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                showTicketToast('Vui lòng chọn một tệp hình ảnh hợp lệ nhé! 📷');
                return;
            }

            const reader = new FileReader();
            reader.onload = (evt) => {
                const dataUrl = evt.target.result;
                if (uploadedAvatarImg) {
                    uploadedAvatarImg.src = dataUrl;
                    uploadedAvatarImg.classList.remove('hidden');
                }
                if (flowerAvatarEmoji) {
                    flowerAvatarEmoji.style.display = 'none';
                }
                if (removePhotoBtn) {
                    removePhotoBtn.classList.remove('hidden');
                }
                if (photoUploadText) {
                    photoUploadText.textContent = 'Đổi ảnh khác 📷';
                }

                // Global cache for Sub-phase 4.2 Canvas 2D Retina export
                window.customFlowerAvatarUrl = dataUrl;
                window.customFlowerAvatarImg = new Image();
                window.customFlowerAvatarImg.src = dataUrl;

                triggerCameraFlash();
                if (typeof window.playCameraClickSFX === 'function') {
                    window.playCameraClickSFX();
                }
                showTicketToast('Đã gắn ảnh của bạn vào nhụy hoa thành công! 🌸✨');
            };
            reader.readAsDataURL(file);
        });

        if (removePhotoBtn) {
            removePhotoBtn.addEventListener('click', () => {
                if (uploadedAvatarImg) {
                    uploadedAvatarImg.src = '';
                    uploadedAvatarImg.classList.add('hidden');
                }
                if (flowerAvatarEmoji) {
                    flowerAvatarEmoji.style.display = 'block';
                }
                if (removePhotoBtn) {
                    removePhotoBtn.classList.add('hidden');
                }
                if (photoUploadText) {
                    photoUploadText.textContent = 'Thêm ảnh của bạn vào bông hoa';
                }
                if (photoInput) {
                    photoInput.value = '';
                }
                window.customFlowerAvatarUrl = null;
                window.customFlowerAvatarImg = null;
                showTicketToast('Đã quay về biểu tượng hoa mặc định.');
            });
        }
    };

    // =========================================================================
    // 5. INTERACTIVE TICKET TEARING (WOW EFFECT)
    // =========================================================================
    const tearBtn = document.getElementById('tear-ticket-btn');
    const tearLine = document.getElementById('ticket-tear-line');
    const ticketCard = document.getElementById('boarding-pass-card');
    const checkedInStamp = document.getElementById('checked-in-stamp');
    const tearBtnText = document.getElementById('tear-btn-text');

    const spawnTearSparkles = (x, y) => {
        const sparkles = ['✨', '🌸', '💖', '⭐', '🎟️', '✨'];
        for (let i = 0; i < 12; i++) {
            const span = document.createElement('span');
            span.className = 'tear-sparkle';
            span.textContent = sparkles[i % sparkles.length];
            span.style.left = `${x + (Math.random() * 120 - 60)}px`;
            span.style.top = `${y + (Math.random() * 20 - 10)}px`;
            span.style.setProperty('--tx', `${(Math.random() * 140 - 70)}px`);
            span.style.setProperty('--ty', `${-(Math.random() * 60 + 20)}px`);
            document.body.appendChild(span);
            setTimeout(() => span.remove(), 850);
        }
    };

    const handleTicketTear = (e) => {
        if (!ticketCard) return;
        const targetEl = tearBtn || tearLine;
        const rect = targetEl.getBoundingClientRect();
        const clickX = e.clientX || (rect.left + rect.width / 2);
        const clickY = e.clientY || (rect.top + rect.height / 2);

        if (ticketCard.classList.contains('ticket-torn')) {
            ticketCard.classList.remove('ticket-torn');
            if (checkedInStamp) checkedInStamp.classList.add('hidden');
            if (tearBtnText) tearBtnText.textContent = 'Mở niêm phong';
            if (typeof window.playBubblePopSFX === 'function') window.playBubblePopSFX();
            showTicketToast('Đã gấp lại bưu thiếp kỷ niệm 🪄');
        } else {
            ticketCard.classList.add('ticket-torn');
            if (checkedInStamp) checkedInStamp.classList.remove('hidden');
            if (tearBtnText) tearBtnText.textContent = 'Đã mở (Gấp lại 🪄)';
            if (typeof window.playPaperTearSFX === 'function') window.playPaperTearSFX();
            spawnTearSparkles(clickX, clickY);
            if (navigator.vibrate) {
                try { navigator.vibrate([25, 40, 25]); } catch (_) {}
            }
            showTicketToast('Đã mở niêm phong bưu thiếp! Gửi trọn yêu thương 20/10 💌🪷');
        }
    };

    // =========================================================================
    // 6. 3D TILT & HOLOGRAM FOIL SHIMMER
    // =========================================================================
    const setupTiltAndFoil = () => {
        const foilOverlay = document.getElementById('hologram-foil');
        if (!ticketCard || !foilOverlay) return;

        let isTouching = false;

        const updateTilt = (clientX, clientY) => {
            const rect = ticketCard.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            const pctX = Math.max(0, Math.min(100, (x / rect.width) * 100));
            const pctY = Math.max(0, Math.min(100, (y / rect.height) * 100));

            foilOverlay.style.setProperty('--foil-x', `${pctX.toFixed(1)}%`);
            foilOverlay.style.setProperty('--foil-y', `${pctY.toFixed(1)}%`);

            const tiltX = (((y / rect.height) - 0.5) * -7).toFixed(2);
            const tiltY = (((x / rect.width) - 0.5) * 7).toFixed(2);
            ticketCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        };

        const resetTilt = () => {
            ticketCard.style.transform = '';
            ticketCard.classList.remove('foil-active');
        };

        ticketCard.addEventListener('mousemove', (e) => {
            ticketCard.classList.add('foil-active');
            updateTilt(e.clientX, e.clientY);
        });

        ticketCard.addEventListener('mouseleave', resetTilt);

        // Mobile touch swipe support
        ticketCard.addEventListener('touchstart', (e) => {
            isTouching = true;
            ticketCard.classList.add('foil-active');
            if (e.touches && e.touches[0]) updateTilt(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });

        ticketCard.addEventListener('touchmove', (e) => {
            if (!isTouching) return;
            if (e.touches && e.touches[0]) updateTilt(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });

        ticketCard.addEventListener('touchend', () => {
            isTouching = false;
            resetTilt();
        });
    };

    // =========================================================================
    // 7. INITIALIZATION & PUBLIC API
    // =========================================================================
    const initBoardingPassKeepsake = () => {
        if (openBtn) openBtn.addEventListener('click', openBoardingPass);
        if (closeBtn) closeBtn.addEventListener('click', closeBoardingPass);

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeBoardingPass();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                closeBoardingPass();
            }
        });

        if (shuffleFlowerBtn) {
            shuffleFlowerBtn.addEventListener('click', () => {
                if (typeof window.getNextFlowerProfile === 'function') {
                    const nextProfile = window.getNextFlowerProfile();
                    applyFlowerProfileToUI(nextProfile);
                    if (typeof window.triggerHaptic === 'function') window.triggerHaptic('tap');
                    if (typeof window.playBubblePopSFX === 'function') window.playBubblePopSFX();
                    showTicketToast(`Khám phá: ${nextProfile.flowerName} (${nextProfile.vietnameseName}) ✨`);
                }
            });
        }

        const ticketPhonkBtn = document.getElementById('ticket-phonk-btn');
        if (ticketPhonkBtn) {
            ticketPhonkBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof window.togglePhonkMode === 'function') {
                    window.togglePhonkMode();
                }
            });
        }

        setupPhotoUpload();

        if (tearBtn) {
            tearBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleTicketTear(e);
            });
        }

        if (tearLine) {
            tearLine.addEventListener('click', (e) => {
                if (e.target && e.target.closest('#tear-ticket-btn')) return;
                handleTicketTear(e);
            });
        }

        setupTiltAndFoil();

        const waxSeal = document.querySelector('.wax-seal-badge');
        if (waxSeal) {
            waxSeal.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('tap');
                if (typeof window.playBubblePopSFX === 'function') window.playBubblePopSFX();
                const rect = waxSeal.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const emojis = ['💖', '★', '✨', '🌹', '❤️'];
                for (let i = 0; i < 6; i++) {
                    const s = document.createElement('span');
                    s.className = 'tear-sparkle';
                    s.textContent = emojis[i % emojis.length];
                    s.style.left = `${cx + (Math.random() * 40 - 20)}px`;
                    s.style.top = `${cy + (Math.random() * 20 - 10)}px`;
                    s.style.setProperty('--tx', `${(Math.random() * 100 - 50)}px`);
                    s.style.setProperty('--ty', `${-(Math.random() * 50 + 20)}px`);
                    document.body.appendChild(s);
                    setTimeout(() => s.remove(), 850);
                }
                showTicketToast('Mộc triện son: Chúc bạn luôn an yên, rạng rỡ và hạnh phúc! 🪷❤️');
            });
        }

        if (copyQuoteBtn) {
            copyQuoteBtn.addEventListener('click', () => {
                const quoteEl = document.getElementById('flower-id-quote');
                const letterEl = document.getElementById('random-letter-content');
                const textToCopy = (letterEl && letterEl.textContent)
                    ? letterEl.textContent
                    : (quoteEl ? quoteEl.textContent : 'Chúc bạn một ngày 20/10 ngập tràn niềm vui và hạnh phúc!');

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showTicketToast('Đã sao chép lời chúc vào khay nhớ tạm! 📋💖');
                    }).catch(() => {
                        showTicketToast('Lời chúc: ' + textToCopy);
                    });
                } else {
                    showTicketToast('Lời chúc: ' + textToCopy);
                }
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('tap');
                if (typeof window.playBubblePopSFX === 'function') window.playBubblePopSFX();
            });
        }
    };

    // Public API
    window.showTicketToast = showTicketToast;
    window.updatePassengerName = updatePassengerName;
    window.applyFlowerProfileToUI = applyFlowerProfileToUI;
    window.openBoardingPassModal = openBoardingPass;
    window.closeBoardingPassModal = closeBoardingPass;
    window.revealBoardingPassButton = revealBoardingPassButton;
    window.hideBoardingPassButton = hideBoardingPassButton;
    window.triggerCameraFlash = triggerCameraFlash;
    window.initBoardingPassKeepsake = initBoardingPassKeepsake;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBoardingPassKeepsake);
    } else {
        initBoardingPassKeepsake();
    }
})();
