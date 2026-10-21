/**
 * WAX SEAL & TIME LOCK GATEWAY CEREMONY (PHASE 2 & PHASE 3)
 * Artisan stationery desk, time lock gate, vintage letterpress name input,
 * aromatherapy candle, copper melting spoon, marbled swirl wax, brass stamp,
 * and garden awakening light seed liberation.
 */
(function() {
    'use strict';

    // DOM Elements
    const timeLockModal = document.getElementById('time-lock-modal');
    const timeLockInput = document.getElementById('time-lock-input');
    const timeLockBtn = document.getElementById('time-lock-btn');
    const timeLockMsg = document.getElementById('time-lock-msg');
    const timeLockClock = document.getElementById('time-lock-clock');
    const lockSubtitle = document.getElementById('lock-subtitle');

    const nameModal = document.getElementById('name-modal');
    const nameInputEl = document.getElementById('name-input');
    const startBtn = document.getElementById('start-btn');
    const orientationHint = document.getElementById('orientation-hint-overlay');
    const embossWrapEl = document.getElementById('emboss-preview-wrap');

    const artisanCandleEl = document.getElementById('artisan-candle');
    const candleHaloEl = document.getElementById('candle-halo');
    const candleFlameEl = document.getElementById('candle-flame');
    const candleBadgeEl = document.getElementById('candle-badge');
    const brassSpoonEl = document.getElementById('brass-spoon');
    const spoonHeatGlowEl = document.getElementById('spoon-heat-glow');
    const spoonRubyBeadEl = document.getElementById('spoon-ruby-bead');
    const spoonGoldBeadEl = document.getElementById('spoon-gold-bead');
    const spoonMoltenWaxEl = document.getElementById('spoon-molten-wax');
    const marbledSwirlCanvasEl = document.getElementById('marbled-swirl-canvas');
    const glassStirringRodEl = document.getElementById('glass-stirring-rod');
    const waxBeadRubyEl = document.getElementById('wax-bead-ruby');
    const waxBeadGoldEl = document.getElementById('wax-bead-gold');
    const hearthQuickDropBtn = document.getElementById('hearth-quick-drop-btn');
    const waxSealGuideTip = document.getElementById('wax-seal-guide-tip');

    const waxStampEl = document.getElementById('wax-seal-stamp');
    const waxTargetZoneEl = document.getElementById('wax-target-zone');
    const waxPourStreamEl = document.getElementById('wax-pour-stream');
    const waxHotPoolEl = document.getElementById('wax-hot-pool');
    const hotWaxBodyEl = document.getElementById('hot-wax-body');
    const waxPuddleEl = document.getElementById('wax-seal-puddle');
    const waxNameImprintEl = document.getElementById('wax-name-imprint');

    let isCandleLit = false;
    let beadDroppedRuby = false;
    let beadDroppedGold = false;
    let isWaxMelted = false;
    let isWaxStirred = false;
    let isWaxPoured = false;
    let isWaxStamping = false;
    let isGardenAwakening = false;
    let failQuoteIndex = 0;
    let prevNameValue = '';

    // =========================================================================
    // 1. TIME LOCK GATEWAY
    // =========================================================================
    const getTimeLockState = () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('unlock') === '1') return 'UNLOCKED';
        if (params.get('teststrict') === '1' || params.get('testlock') === '1') return 'STRICT_LOCK';
        if (params.get('testpass') === '1') return 'PASSWORD_REQUIRED';

        const now = window.__mockLockDate || new Date();
        const targetDate = new Date(2026, 9, 25, 12, 0, 0); // 12h trưa 25/10/2026

        if (now >= targetDate) return 'UNLOCKED';

        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();
        const hours = now.getHours();

        if (year === 2026 && month === 9 && date === 25 && hours >= 0 && hours < 12) {
            return 'STRICT_LOCK';
        }

        if (sessionStorage.getItem('epic_gate_unlocked') === 'true') {
            return 'UNLOCKED';
        }

        return 'PASSWORD_REQUIRED';
    };

    const showLockError = (msg) => {
        if (timeLockMsg) {
            timeLockMsg.textContent = msg;
            timeLockMsg.className = 'time-lock-msg wrong';
            setTimeout(() => {
                if (timeLockMsg) timeLockMsg.classList.remove('wrong');
            }, 450);
        }
        if (timeLockInput) {
            timeLockInput.value = '';
            timeLockInput.focus();
        }
        if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
    };

    const unlockGateway = (isAuto = false) => {
        sessionStorage.setItem('epic_gate_unlocked', 'true');
        if (timeLockMsg) {
            timeLockMsg.textContent = isAuto 
                ? "Đã qua 12:00 trưa rồi! Cổng bí mật chính thức mở cửa! ✨" 
                : "Mật mã chính xác! Chào mừng ACN đẹp trai bước vào điều bí mật... ✨";
            timeLockMsg.className = 'time-lock-msg success';
        }
        if (typeof window.playChimeSFX !== 'undefined') window.playChimeSFX();
        if (typeof window.startGateMusicLow === 'function') window.startGateMusicLow();

        setTimeout(() => {
            if (timeLockModal) timeLockModal.classList.add('hidden');
            if (nameModal) {
                nameModal.classList.remove('hidden');
                if (nameInputEl) setTimeout(() => nameInputEl.focus(), 350);
            }
        }, isAuto ? 1500 : 900);
    };

    const initTimeLockGateway = () => {
        if (!timeLockModal) return;
        const state = getTimeLockState();

        if (state === 'UNLOCKED') {
            timeLockModal.classList.add('hidden');
            if (nameModal) {
                nameModal.classList.remove('hidden');
                if (nameInputEl) setTimeout(() => nameInputEl.focus(), 350);
            }
            return;
        }

        if (nameModal) nameModal.classList.add('hidden');
        timeLockModal.classList.remove('hidden');

        const triggerStartMusicAt20 = () => {
            if (typeof window.startGateMusicLow === 'function') window.startGateMusicLow();
        };

        if (state === 'STRICT_LOCK') {
            if (lockSubtitle) {
                lockSubtitle.innerHTML = 'Cổng thời gian đang niêm phong tuyệt đối! ⏳<br><strong class="highlight-time">Chưa tới giờ đâu cưng à! Đúng 12:00 trưa 25/10/2026 mới mở nha!</strong> ✨';
            }
            if (timeLockInput) timeLockInput.placeholder = "Cổng đang phong ấn...";
        } else {
            if (lockSubtitle) {
                lockSubtitle.innerHTML = 'Hãy nhập mật mã để mở khóa cổng bí mật ✨<br><small style="opacity: 0.85;">(Mọi ngày bình thường cần mật khẩu • Sau 12:00 trưa 25/10/2026 sẽ tự do)</small>';
            }
            if (timeLockInput) {
                timeLockInput.placeholder = "Nhập mật mã bí mật...";
                setTimeout(() => timeLockInput.focus(), 350);
                timeLockInput.addEventListener('input', () => {
                    triggerStartMusicAt20();
                    if (timeLockMsg && timeLockMsg.classList.contains('wrong')) timeLockMsg.textContent = '';
                });
                timeLockInput.addEventListener('keydown', triggerStartMusicAt20);
                timeLockInput.addEventListener('focus', triggerStartMusicAt20);
            }
        }

        const updateClock = () => {
            if (!timeLockClock) return;
            const now = window.__mockLockDate || new Date();
            const dStr = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const tStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            timeLockClock.textContent = `Thời gian client: ${tStr} - ${dStr}`;
            if (getTimeLockState() === 'UNLOCKED') unlockGateway(true);
        };
        updateClock();
        const clockTimer = setInterval(updateClock, 1000);

        const handleAttempt = () => {
            const entered = (timeLockInput ? timeLockInput.value : '').trim();
            const currentState = getTimeLockState();

            if (currentState === 'STRICT_LOCK') {
                const strictFailQuotes = [
                    "Chưa tới giờ đâu cưng à! 😜 Dù là ACN đẹp trai thì cũng phải đợi tới 12h trưa nay nhé!",
                    "Khóa nghiêm ngặt rồi cưng ơi! Cổng chỉ tự động mở đúng 12:00 trưa nay 25/10/2026 thôi! ⏳",
                    "Nóng vội thế cưng! Uống miếng trà sữa chờ tới đúng 12h trưa nha 🧋",
                    "Chưa tới giờ đâu cưng à! Mọi mật mã đều bị vô hiệu hóa trước 12h trưa! 🚀"
                ];
                const msg = strictFailQuotes[failQuoteIndex % strictFailQuotes.length];
                failQuoteIndex++;
                showLockError(msg);
                return;
            }

            if (entered.toLowerCase() === 'acndaptrai') {
                clearInterval(clockTimer);
                unlockGateway(false);
            } else {
                const normalFailQuotes = [
                    "Mật mã sai rồi cưng ơi! Chỉ có ACN đẹp trai mới vào được thôi nhé! 😉",
                    "Chưa đúng mật mã đâu cưng à! 😜 Thử lại xem nào~",
                    "Sai rồi nha cưng! Gợi ý: Ai đẹp trai nhất nào? 🚀",
                    "Chưa qua được ải đâu cưng! Nghĩ lại xem mật mã là gì nha 🧋",
                    "Mật mã không đúng rồi! Hỏi admin ACN để lấy pass nha cưng! 🔒"
                ];
                const msg = normalFailQuotes[failQuoteIndex % normalFailQuotes.length];
                failQuoteIndex++;
                showLockError(msg);
            }
        };

        if (timeLockBtn) {
            timeLockBtn.addEventListener('click', triggerStartMusicAt20);
            timeLockBtn.onclick = handleAttempt;
        }
        if (timeLockInput) {
            timeLockInput.onkeydown = (e) => {
                if (e.key === 'Enter') handleAttempt();
            };
        }
    };

    window.__testLockTime = (mockDate) => {
        sessionStorage.removeItem('epic_gate_unlocked');
        window.__mockLockDate = mockDate;
        initTimeLockGateway();
    };

    // =========================================================================
    // 2. VINTAGE BRASS LETTERPRESS EMBOSSING
    // =========================================================================
    const updateLetterpressDisplay = (val) => {
        if (!embossWrapEl) return;
        const trimmed = val ? val.trimStart() : '';
        if (!trimmed) {
            embossWrapEl.innerHTML = `<span class="emboss-placeholder">✦ Chạm gõ để dập tên nàng lên khuôn đồng ✦</span>`;
            prevNameValue = '';
            return;
        }

        const isCharAdded = trimmed.length > prevNameValue.length;
        prevNameValue = trimmed;

        embossWrapEl.innerHTML = '';
        const chars = trimmed.split('');
        chars.forEach((char, idx) => {
            const span = document.createElement('span');
            span.className = char === ' ' ? 'emboss-char space' : 'emboss-char';
            span.textContent = char;
            if (idx === chars.length - 1 && isCharAdded) {
                span.style.animation = 'letterpress-stamp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            } else {
                span.style.animation = 'none';
            }
            embossWrapEl.appendChild(span);
        });

        if (isCharAdded) {
            if (typeof window.playLetterpressSFX === 'function') window.playLetterpressSFX();
            if (typeof window.createBrassDustVFX === 'function') {
                const lastSpan = embossWrapEl.lastElementChild;
                if (lastSpan) {
                    const rect = lastSpan.getBoundingClientRect();
                    window.createBrassDustVFX(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }
            }
        }
    };

    // =========================================================================
    // 3. PROCEDURAL MARBLED WAX SWIRL ENGINE
    // =========================================================================
    const generateMarbledSwirl = (canvas) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        const cx = w / 2, cy = h / 2, r = w / 2;

        ctx.clearRect(0, 0, w, h);

        const baseGrad = ctx.createRadialGradient(cx * 0.8, cy * 0.7, 4, cx, cy, r);
        baseGrad.addColorStop(0, '#D32F2F');
        baseGrad.addColorStop(0.45, '#B71C1C');
        baseGrad.addColorStop(0.85, '#8B0000');
        baseGrad.addColorStop(1, '#5C0000');
        ctx.fillStyle = baseGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        const numArms = 5 + Math.floor(Math.random() * 3);
        const seedAngle = Math.random() * Math.PI * 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
        ctx.clip();

        const ribbonColors = [
            'rgba(255, 248, 220, 0.95)',
            'rgba(245, 206, 86, 0.9)',
            'rgba(226, 185, 59, 0.85)',
            'rgba(255, 215, 0, 0.8)',
            'rgba(239, 68, 68, 0.65)',
            'rgba(184, 50, 64, 0.6)'
        ];

        for (let arm = 0; arm < numArms; arm++) {
            const armBaseAngle = seedAngle + (arm * (Math.PI * 2 / numArms));
            const color = ribbonColors[arm % ribbonColors.length];
            const lineWidth = 3.5 + Math.random() * 4.5;

            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';

            let hasDrawn = false;
            const maxSteps = 45;
            for (let step = 0; step < maxSteps; step++) {
                const theta = armBaseAngle + step * 0.14;
                const radius = 2 + step * (r / maxSteps) * 0.95;
                const perturbation = Math.sin(step * 0.55 + arm) * 3.5;
                const x = cx + Math.cos(theta) * (radius + perturbation);
                const y = cy + Math.sin(theta) * (radius + perturbation);

                if (!hasDrawn) {
                    ctx.moveTo(x, y);
                    hasDrawn = true;
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        // Golden dust specks
        for (let s = 0; s < 18; s++) {
            const sAngle = Math.random() * Math.PI * 2;
            const sDist = Math.random() * (r * 0.85);
            ctx.fillStyle = s % 2 === 0 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 215, 0, 0.85)';
            ctx.beginPath();
            ctx.arc(cx + Math.cos(sAngle) * sDist, cy + Math.sin(sAngle) * sDist, 0.8 + Math.random() * 1.2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        window.currentMarbledPattern = canvas.toDataURL();
    };

    // =========================================================================
    // 4. ARTISAN MELTING STATION GESTURES
    // =========================================================================
    const lightCandle = (autoProceed = true) => {
        if (isCandleLit) return;
        isCandleLit = true;
        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.playCandleLightSFX === 'function') window.playCandleLightSFX();

        if (candleFlameEl) candleFlameEl.classList.remove('hidden');
        if (candleHaloEl) candleHaloEl.classList.remove('hidden');
        if (artisanCandleEl) artisanCandleEl.classList.add('is-lit');
        if (candleBadgeEl) candleBadgeEl.textContent = 'Đã thắp nến 🔥';
        if (spoonHeatGlowEl) spoonHeatGlowEl.classList.remove('hidden');

        if (beadDroppedRuby && beadDroppedGold) {
            meltWaxBeads();
        } else if (waxSealGuideTip) {
            waxSealGuideTip.innerHTML = `<span>Thả viên sáp Đỏ Ruby & Vàng Pearl vào lòng thìa đồng ✨</span>`;
        }
    };

    const dropWaxBead = (type) => {
        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.playWaxDropSFX === 'function') window.playWaxDropSFX();

        if (type === 'ruby' && !beadDroppedRuby) {
            beadDroppedRuby = true;
            if (waxBeadRubyEl) waxBeadRubyEl.classList.add('dropped');
            if (spoonRubyBeadEl) spoonRubyBeadEl.classList.remove('hidden');
        } else if (type === 'gold' && !beadDroppedGold) {
            beadDroppedGold = true;
            if (waxBeadGoldEl) waxBeadGoldEl.classList.add('dropped');
            if (spoonGoldBeadEl) spoonGoldBeadEl.classList.remove('hidden');
        }

        if (beadDroppedRuby && beadDroppedGold) {
            if (hearthQuickDropBtn) hearthQuickDropBtn.classList.add('hidden');
            if (isCandleLit) {
                meltWaxBeads();
            } else if (waxSealGuideTip) {
                waxSealGuideTip.innerHTML = `<span>Chạm thắp ngọn nến thơm để bắt đầu đun sáp 🕯️</span>`;
            }
        } else if (waxSealGuideTip) {
            waxSealGuideTip.innerHTML = `<span>Thả tiếp viên sáp còn lại vào thìa đồng ✨</span>`;
        }
    };

    const meltWaxBeads = () => {
        if (isWaxMelted) return;
        isWaxMelted = true;
        if (typeof window.playWaxMeltSFX === 'function') window.playWaxMeltSFX();

        if (spoonRubyBeadEl) spoonRubyBeadEl.classList.add('melting');
        if (spoonGoldBeadEl) spoonGoldBeadEl.classList.add('melting');

        setTimeout(() => {
            if (spoonMoltenWaxEl) spoonMoltenWaxEl.classList.remove('hidden');
            generateMarbledSwirl(marbledSwirlCanvasEl);
            if (glassStirringRodEl) glassStirringRodEl.classList.remove('hidden');
            if (waxSealGuideTip) {
                waxSealGuideTip.innerHTML = `<span>Chạm hoặc kéo que thủy tinh khuấy tạo vân xoáy cẩm thạch 🪄</span>`;
            }
        }, 500);
    };

    const stirMarbledWax = (onComplete) => {
        if (isWaxStirred) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }
        isWaxStirred = true;
        if (typeof window.initAudio === 'function') window.initAudio();
        if (glassStirringRodEl) glassStirringRodEl.classList.add('stirring-anim');
        if (typeof window.playWaxStirSFX === 'function') window.playWaxStirSFX();

        setTimeout(() => {
            generateMarbledSwirl(marbledSwirlCanvasEl);
        }, 400);

        setTimeout(() => {
            if (glassStirringRodEl) {
                glassStirringRodEl.classList.remove('stirring-anim');
                glassStirringRodEl.style.opacity = '0.5';
            }
            if (waxSealGuideTip) {
                waxSealGuideTip.innerHTML = `<span>Vân sáp cẩm thạch đã sẵn sàng! Chạm thìa để rót dòng sáp lỏng 🍯</span>`;
            }
            if (typeof onComplete === 'function') onComplete();
        }, 1200);
    };

    const pourMoltenWax = (onComplete) => {
        if (isWaxPoured) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }
        isWaxPoured = true;
        if (typeof window.initAudio === 'function') window.initAudio();
        if (brassSpoonEl) brassSpoonEl.classList.add('is-pouring');
        if (spoonMoltenWaxEl) spoonMoltenWaxEl.classList.add('draining');

        setTimeout(() => {
            if (waxPourStreamEl) waxPourStreamEl.classList.remove('hidden');
            if (typeof window.playWaxPourSFX === 'function') window.playWaxPourSFX();
        }, 150);

        setTimeout(() => {
            if (waxHotPoolEl) waxHotPoolEl.classList.remove('hidden');
            if (hotWaxBodyEl && window.currentMarbledPattern) {
                hotWaxBodyEl.style.backgroundImage = `url(${window.currentMarbledPattern})`;
                hotWaxBodyEl.style.backgroundSize = 'cover';
            }
            if (waxSealGuideTip) {
                waxSealGuideTip.innerHTML = `<span>Vũng sáp son nóng hổi đang bốc khói! Hãy cầm con dấu dập mạnh xuống 💮</span>`;
            }
        }, 350);

        setTimeout(() => {
            if (waxPourStreamEl) waxPourStreamEl.classList.add('hidden');
            if (brassSpoonEl) brassSpoonEl.classList.remove('is-pouring');
            if (spoonMoltenWaxEl) spoonMoltenWaxEl.classList.add('hidden');
            if (waxTargetZoneEl) waxTargetZoneEl.classList.add('ready-to-stamp');
            if (typeof onComplete === 'function') onComplete();
        }, 800);
    };

    const ensureArtisanRitualReady = (callback) => {
        if (!isCandleLit) lightCandle(false);
        if (!beadDroppedRuby) dropWaxBead('ruby');
        if (!beadDroppedGold) dropWaxBead('gold');
        if (!isWaxMelted) meltWaxBeads();

        const proceedToPour = () => {
            if (!isWaxPoured) {
                pourMoltenWax(() => setTimeout(callback, 250));
            } else {
                callback();
            }
        };

        if (!isWaxStirred) {
            setTimeout(() => {
                stirMarbledWax(() => setTimeout(proceedToPour, 250));
            }, 350);
        } else {
            proceedToPour();
        }
    };

    const performWaxSealStamp = (onComplete) => {
        const inputEl = document.getElementById('name-input');
        const val = inputEl ? inputEl.value.trim() : '';
        if (!val) {
            if (inputEl) {
                inputEl.style.borderColor = '#E53E3E';
                inputEl.focus();
                const brassPlate = document.getElementById('letterpress-brass-plate');
                if (brassPlate) {
                    brassPlate.animate([
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(-6px)' },
                        { transform: 'translateX(6px)' },
                        { transform: 'translateX(-4px)' },
                        { transform: 'translateX(4px)' },
                        { transform: 'translateX(0)' }
                    ], { duration: 350 });
                }
                setTimeout(() => { inputEl.style.borderColor = ''; }, 600);
            }
            return;
        }

        if (isWaxStamping) return;
        isWaxStamping = true;

        ensureArtisanRitualReady(() => {
            window.currentUserName = val;
            if (waxNameImprintEl) waxNameImprintEl.textContent = val.toUpperCase();
            if (typeof window.initAudio === 'function') window.initAudio();

            if (waxStampEl && waxTargetZoneEl) {
                const stampRect = waxStampEl.getBoundingClientRect();
                const targetRect = waxTargetZoneEl.getBoundingClientRect();
                const snapX = (targetRect.left + targetRect.width / 2) - (stampRect.left + stampRect.width / 2);
                const snapY = (targetRect.top + targetRect.height / 2) - (stampRect.top + stampRect.height / 2);

                waxStampEl.style.setProperty('--snap-x', `${snapX}px`);
                waxStampEl.style.setProperty('--snap-y', `${snapY}px`);
                waxStampEl.style.transform = '';
                waxStampEl.classList.remove('dragging');
                waxStampEl.classList.add('animating-stamp');

                setTimeout(() => {
                    if (typeof window.playWaxStampASMR === 'function') {
                        window.playWaxStampASMR();
                    } else if (typeof window.playWaxStampSFX === 'function') {
                        window.playWaxStampSFX();
                    }

                    if (waxHotPoolEl) waxHotPoolEl.classList.add('squished');
                    if (waxPuddleEl) {
                        waxPuddleEl.classList.remove('hidden');
                        if (window.currentMarbledPattern) {
                            waxPuddleEl.style.backgroundImage = `url(${window.currentMarbledPattern})`;
                            waxPuddleEl.style.backgroundSize = 'cover';
                        }
                    }
                    if (waxTargetZoneEl) waxTargetZoneEl.classList.add('stamped');
                    if (typeof window.createBrassDustVFX === 'function') {
                        window.createBrassDustVFX(targetRect.left + targetRect.width / 2, targetRect.top + targetRect.height / 2);
                    }

                    setTimeout(() => {
                        if (waxHotPoolEl) waxHotPoolEl.classList.add('hidden');
                    }, 300);

                    setTimeout(() => {
                        const flourishEl = document.getElementById('seal-botanical-flourish');
                        if (flourishEl) flourishEl.classList.remove('hidden');
                    }, 200);
                }, 650);

                setTimeout(() => {
                    waxStampEl.classList.remove('animating-stamp');
                    isWaxStamping = false;
                    if (typeof onComplete === 'function') onComplete();
                }, 1100);
            } else {
                isWaxStamping = false;
                if (typeof onComplete === 'function') onComplete();
            }
        });
    };

    // =========================================================================
    // 5. GARDEN AWAKENING TRANSITION & COMPLETE PUZZLE
    // =========================================================================
    const startGardenAwakeningTransition = (name) => {
        if (isGardenAwakening) return;
        isGardenAwakening = true;

        const sprig = document.querySelector('.pressed-botanical-branch');
        if (sprig) sprig.classList.add('blooming-glow');
        const flourishEl = document.getElementById('seal-botanical-flourish');
        if (flourishEl) {
            flourishEl.classList.remove('hidden');
            flourishEl.classList.add('blooming-radiance');
        }

        if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
        if (typeof window.playFloralBloomSFX === 'function') window.playFloralBloomSFX();

        const desc = document.getElementById('name-prompt-desc') || document.querySelector('#name-modal .name-panel p');
        if (desc) {
            const recipientName = (name || window.currentUserName || 'NÀNG THƠ').toUpperCase();
            desc.innerHTML = `✨ Triện son cẩm thạch đã khắc dấu <strong>${recipientName}</strong>, mầm hoa thức giấc...<br>Những hạt mầm ánh sáng đang gieo vào khu vườn của bạn! ✨`;
        }

        if (nameModal) nameModal.style.pointerEvents = 'none';

        // Petal bursts
        const sprigRect = sprig ? sprig.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight * 0.28, width: 0, height: 0 };
        const sealEl = document.getElementById('wax-seal-puddle') || document.getElementById('wax-target-zone');
        const sealRect = sealEl ? sealEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight * 0.45, width: 0, height: 0 };

        if (typeof window.createFloralPetalBurstVFX === 'function') {
            window.createFloralPetalBurstVFX(sprigRect.left + sprigRect.width / 2, sprigRect.top + sprigRect.height / 2);
            window.createFloralPetalBurstVFX(sealRect.left + sealRect.width / 2, sealRect.top + sealRect.height / 2);
        }

        // Spawn 16 luminescent seedlings that fly into garden soil
        const targetBaseX = window.innerWidth / 2;
        const targetBaseY = Math.min(window.innerHeight * 0.72, window.innerHeight - 110);

        for (let i = 0; i < 16; i++) {
            setTimeout(() => {
                const seed = document.createElement('div');
                seed.className = 'awakening-light-seed';
                const fromSprig = i % 2 === 0;
                const originX = fromSprig ? (sprigRect.left + sprigRect.width / 2) : (sealRect.left + sealRect.width / 2);
                const originY = fromSprig ? (sprigRect.top + sprigRect.height / 2) : (sealRect.top + sealRect.height / 2);

                seed.style.left = `${originX}px`;
                seed.style.top = `${originY}px`;
                const tx = (targetBaseX + (Math.random() - 0.5) * 110) - originX;
                const ty = (targetBaseY + (Math.random() - 0.5) * 35) - originY;
                seed.style.setProperty('--tx', `${tx}px`);
                seed.style.setProperty('--ty', `${ty}px`);
                document.body.appendChild(seed);

                setTimeout(() => {
                    if (typeof window.createSoilImpactRipple === 'function') {
                        window.createSoilImpactRipple(originX + tx, originY + ty);
                    }
                    if (seed.parentNode) seed.parentNode.removeChild(seed);
                }, 1300);
            }, i * 75);
        }

        // Fade out name modal & start garden
        setTimeout(() => {
            if (nameModal) {
                nameModal.classList.add('awakening-fade-out');
            }
            const wrap = document.getElementById('wrap');
            if (wrap) wrap.classList.add('awakening-garden');
        }, 1150);

        setTimeout(() => {
            completePuzzle();
        }, 1750);
    };

    const completePuzzle = () => {
        if (nameModal) {
            nameModal.classList.add('hidden');
            nameModal.style.pointerEvents = 'none';
            nameModal.style.display = 'none';
        }

        setTimeout(() => {
            document.querySelectorAll('.awakening-light-seed, .ground-seed-ripple, .vfx-flower-petal').forEach(p => p.remove());
        }, 500);

        const gardenUI = document.getElementById('garden-ui');
        if (gardenUI) gardenUI.style.opacity = '1';
        const livingHud = document.getElementById('living-atmosphere-hud');
        if (livingHud) livingHud.style.opacity = '1';
        const harpWrap = document.getElementById('plant-harp-strings-wrap');
        if (harpWrap) harpWrap.classList.add('visible');
        const celestialOrrery = document.getElementById('celestial-weather-orrery');
        if (celestialOrrery) {
            celestialOrrery.classList.remove('hidden');
            celestialOrrery.style.display = 'flex';
            celestialOrrery.style.opacity = '1';
            celestialOrrery.style.pointerEvents = 'auto';
        }

        if (typeof window.initAudio === 'function') window.initAudio();
        if (typeof window.startEnvironmentCycle === 'function') window.startEnvironmentCycle();

        if (typeof window.fadeAudioVolume === 'function') {
            window.fadeAudioVolume(0.20, 5000);
        } else if (window.bgAudio && window.bgAudio.paused) {
            window.bgAudio.play().then(() => {
                if (window.musicToggleBtn) window.musicToggleBtn.classList.add('playing');
                if (window.musicIconPath) window.musicIconPath.setAttribute("d", window.pausePath);
            }).catch(e => console.log("Auto-play blocked:", e));
        }
    };

    // Initialize all event listeners
    const initWaxSealCeremony = () => {
        initTimeLockGateway();

        if (artisanCandleEl) artisanCandleEl.addEventListener('click', () => lightCandle());
        if (waxBeadRubyEl) waxBeadRubyEl.addEventListener('click', () => dropWaxBead('ruby'));
        if (waxBeadGoldEl) waxBeadGoldEl.addEventListener('click', () => dropWaxBead('gold'));
        if (hearthQuickDropBtn) hearthQuickDropBtn.addEventListener('click', () => { dropWaxBead('ruby'); dropWaxBead('gold'); });
        if (glassStirringRodEl) glassStirringRodEl.addEventListener('click', () => stirMarbledWax());

        if (brassSpoonEl) {
            brassSpoonEl.addEventListener('click', () => {
                if (isWaxMelted && !isWaxPoured) {
                    if (!isWaxStirred) {
                        stirMarbledWax(() => setTimeout(pourMoltenWax, 300));
                    } else {
                        pourMoltenWax();
                    }
                }
            });
        }

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                performWaxSealStamp(() => {
                    startGardenAwakeningTransition(window.currentUserName);
                });
            });
        }

        if (nameInputEl) {
            const triggerMusic = () => {
                if (typeof window.startGateMusicLow === 'function') window.startGateMusicLow();
            };
            nameInputEl.addEventListener('focus', triggerMusic);
            nameInputEl.addEventListener('input', (e) => {
                triggerMusic();
                updateLetterpressDisplay(e.target.value);
            });
            nameInputEl.addEventListener('keydown', (e) => {
                triggerMusic();
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (startBtn) startBtn.click();
                }
            });
        }

        // Pointer gestures on stamp
        if (waxStampEl && waxTargetZoneEl) {
            let isDragging = false, startX = 0, startY = 0, hasMoved = false;

            waxStampEl.addEventListener('pointerdown', (e) => {
                if (isWaxStamping) return;
                const inputVal = nameInputEl ? nameInputEl.value.trim() : '';
                if (!inputVal) {
                    if (nameInputEl) {
                        nameInputEl.style.borderColor = '#E53E3E';
                        nameInputEl.focus();
                        setTimeout(() => nameInputEl.style.borderColor = '', 600);
                    }
                    return;
                }
                isDragging = true;
                hasMoved = false;
                startX = e.clientX;
                startY = e.clientY;
                waxStampEl.setPointerCapture(e.pointerId);
                waxStampEl.classList.add('dragging');
            });

            waxStampEl.addEventListener('pointermove', (e) => {
                if (!isDragging || isWaxStamping) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                if (Math.hypot(dx, dy) > 6) hasMoved = true;
                waxStampEl.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.15)`;

                const sR = waxStampEl.getBoundingClientRect();
                const tR = waxTargetZoneEl.getBoundingClientRect();
                const dist = Math.hypot((sR.left + sR.width / 2) - (tR.left + tR.width / 2), (sR.top + sR.height / 2) - (tR.top + tR.height / 2));
                if (dist < 65) waxTargetZoneEl.classList.add('drag-over');
                else waxTargetZoneEl.classList.remove('drag-over');
            });

            const handlePointerEnd = (e) => {
                if (!isDragging) return;
                isDragging = false;
                try { waxStampEl.releasePointerCapture(e.pointerId); } catch (_) {}
                waxStampEl.classList.remove('dragging');

                const isOver = waxTargetZoneEl.classList.contains('drag-over');
                waxTargetZoneEl.classList.remove('drag-over');

                if (isOver || !hasMoved) {
                    performWaxSealStamp(() => startGardenAwakeningTransition(window.currentUserName));
                } else {
                    waxStampEl.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                    waxStampEl.style.transform = '';
                    setTimeout(() => waxStampEl.style.transition = '', 350);
                }
            };

            waxStampEl.addEventListener('pointerup', handlePointerEnd);
            waxStampEl.addEventListener('pointercancel', handlePointerEnd);
        }
    };

    // Public API
    window.initWaxSealCeremony = initWaxSealCeremony;
    window.completePuzzle = completePuzzle;
    window.startGardenAwakeningTransition = startGardenAwakeningTransition;
    window.performWaxSealStamp = performWaxSealStamp;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWaxSealCeremony);
    } else {
        initWaxSealCeremony();
    }
})();
