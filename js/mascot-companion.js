/**
 * MASCOT COMPANION ENGINE (PHASE 2 - EMOTIONAL COMPANION & GAZE TRACKING)
 * Chú bé đồng dao thân thương với mắt chớp, má hồng sen e ấp (////), nụ cười mèo (ω),
 * ánh mắt dõi theo con trỏ chuột/chạm (pupil tracking), ma thuật sương mai & ánh nắng,
 * và phản xạ cưng nựng vuốt ve (affection pet) tràn ngập cảm xúc thơ mộng.
 */
(function() {
    'use strict';

    const mascotCompanion = document.getElementById('garden-mascot-companion');
    const mascotSpeechBubble = document.getElementById('mascot-speech-bubble');
    const mascotBubbleText = document.getElementById('mascot-bubble-text');
    const mascotFaceEmotes = document.getElementById('mascot-face-emotes');
    const mascotEyesWrap = document.getElementById('mascot-eyes');
    const mascotPupils = document.querySelectorAll('.mascot-eye .eye-pupil');
    const mascotMagicCloud = document.getElementById('mascot-magic-cloud');
    const mascotMagicSunbeam = document.getElementById('mascot-magic-sunbeam');
    const mascotAffectionBurst = document.getElementById('mascot-affection-burst');

    const mascotCheerQuotes = [
        "Chào bạn nhé! Tớ là chú bé đồng dao chăm sóc vườn hoa 20/10 nè! 🌾✨",
        "Gió đưa cành trúc la đà, hoa tình yêu nở đậm đà sắc hương! 🌸🎐",
        "Tưới giọt sương mai, cây vươn đón nắng thu ấm áp! 💧☀️",
        "Nụ cười của bạn làm khu vườn bừng sáng cả một góc trời! 💖",
        "Bạn chăm vườn khéo ghê, từng nhánh lá đều ngập tràn yêu thương! 🍃🪷",
        "Mưa thuận gió hòa, mầm non tình yêu sắp đơm hoa kết trái rồi! 🌱🌟",
        "Mỗi người con gái đều là một đóa hoa thơm ngát của quê hương! 🌺✨",
        "Tháng Mười hoa cúc vàng ươm, gửi trao cô gái ngát hương dịu dàng! 🌼🌾",
        "Bình yên là khi ngắm nhìn mầm cây lớn lên từng ngày cùng bạn! 🌿🕊️",
        "Tớ luôn ở đây cùng bạn ngân nga câu hát đồng dao! (≗ω≗) ♡"
    ];

    const petQuotes = [
        "Aww, được bạn xoa đầu thích quá đi thôi! (≧◡≦) ♡",
        "Bạn dịu dàng thật đấy, tớ cảm thấy ấm áp ghê! 🌸",
        "Hi hi, cù lét tớ hả? Tớ chúc bạn 20/10 luôn tươi cười như hoa nhé! 🌼✨",
        "Rù rù... Chú bé đồng dao sẽ luôn ở bên canh giữ vườn hoa cho bạn! 🪷💖"
    ];

    let mascotBubbleTimeout = null;
    let quoteIndex = 0;
    let blinkTimer = null;
    let isPetting = false;

    // Hiển thị bong bóng lời thoại
    const showMascotSpeech = (text, duration = 3500) => {
        if (!mascotSpeechBubble || !mascotBubbleText) return;
        mascotBubbleText.textContent = text;
        mascotSpeechBubble.classList.add('visible');
        clearTimeout(mascotBubbleTimeout);
        mascotBubbleTimeout = setTimeout(() => {
            if (mascotSpeechBubble) mascotSpeechBubble.classList.remove('visible');
        }, duration);
    };

    // Kích hoạt biểu cảm cười híp mắt / nháy mắt dễ thương (ω)
    const triggerMascotHappyWink = (duration = 1500) => {
        if (!mascotFaceEmotes) return;
        mascotFaceEmotes.classList.add('mascot-happy-wink');
        setTimeout(() => {
            if (mascotFaceEmotes) mascotFaceEmotes.classList.remove('mascot-happy-wink');
        }, duration);
    };

    // Chu kỳ chớp mắt tự nhiên (2.5s - 4.5s)
    const startEyeBlinkCycle = () => {
        if (!mascotFaceEmotes) return;
        const scheduleNextBlink = () => {
            const delay = Math.random() * 2000 + 2500;
            blinkTimer = setTimeout(() => {
                if (mascotFaceEmotes && !mascotFaceEmotes.classList.contains('mascot-happy-wink')) {
                    mascotFaceEmotes.classList.add('mascot-blinking');
                    setTimeout(() => {
                        if (mascotFaceEmotes) mascotFaceEmotes.classList.remove('mascot-blinking');
                    }, 160);
                }
                scheduleNextBlink();
            }, delay);
        };
        scheduleNextBlink();
    };

    // =========================================================================
    // ÁNH MẮT DÕI THEO CON TRỎ CHUỘT / ĐIỂM CHẠM (PUPIL GAZE TRACKING)
    // =========================================================================
    let targetEyeX = 0;
    let targetEyeY = 0;
    let currentEyeX = 0;
    let currentEyeY = 0;
    let eyeRaf = null;

    const updatePupilsLoop = () => {
        currentEyeX += (targetEyeX - currentEyeX) * 0.18;
        currentEyeY += (targetEyeY - currentEyeY) * 0.18;

        if (mascotPupils && mascotPupils.length > 0) {
            mascotPupils.forEach(pupil => {
                pupil.style.transform = `translate(${currentEyeX.toFixed(2)}px, ${currentEyeY.toFixed(2)}px)`;
            });
        }

        eyeRaf = requestAnimationFrame(updatePupilsLoop);
    };

    const initPupilTracking = () => {
        let cachedMascotCenter = null;

        const updateCenter = () => {
            if (!mascotEyesWrap) return;
            const r = mascotEyesWrap.getBoundingClientRect();
            cachedMascotCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        };

        window.addEventListener('resize', updateCenter, { passive: true });
        window.addEventListener('scroll', updateCenter, { passive: true });

        const handlePointerMove = (e) => {
            if (!cachedMascotCenter) updateCenter();
            if (!cachedMascotCenter) return;

            const dx = e.clientX - cachedMascotCenter.x;
            const dy = e.clientY - cachedMascotCenter.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 1) {
                targetEyeX = 0;
                targetEyeY = 0;
                return;
            }

            // Giới hạn tầm mắt dõi theo tối đa ±4px ngang, ±3px dọc
            const maxOffset = 4.2;
            const ratio = Math.min(dist / 350, 1);
            targetEyeX = (dx / dist) * (maxOffset * ratio);
            targetEyeY = (dy / dist) * ((maxOffset - 1) * ratio);
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        eyeRaf = requestAnimationFrame(updatePupilsLoop);
    };

    // =========================================================================
    // CỬ CHỈ MA THUẬT THAY THẾ TAY ROBOT CƠ HỌC
    // =========================================================================

    // 1. Tưới sương mai: Vẫy gọi đám mây nhiệm màu buông hạt nước long lanh
    const triggerMascotWatering = () => {
        if (!mascotCompanion) return;
        
        if (mascotMagicCloud) {
            mascotMagicCloud.classList.add('active');
            setTimeout(() => {
                if (mascotMagicCloud) mascotMagicCloud.classList.remove('active');
            }, 2400);
        }

        showMascotSpeech("Gọi mây gom sương sớm! Cho mầm cây mau đơm chồi biếc nhé! ☁️💧🌿", 2600);
        triggerMascotHappyWink(2000);
        
        if (typeof window.playHydroBlasterSFX === 'function') {
            window.playHydroBlasterSFX();
        } else if (typeof window.playChimeSFX === 'function') {
            window.playChimeSFX();
        }

        mascotCompanion.classList.add('jump-bounce');
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
        }, 1200);
    };

    // 2. Sưởi nắng ấm: Gọi đốm lửa đom đóm & vầng thái dương ấm áp
    const triggerMascotFertilizing = () => {
        if (!mascotCompanion) return;

        if (mascotMagicSunbeam) {
            mascotMagicSunbeam.classList.add('active');
            setTimeout(() => {
                if (mascotMagicSunbeam) mascotMagicSunbeam.classList.remove('active');
            }, 2400);
        }

        showMascotSpeech("Thắp vầng nắng thu ấm áp! Chúc mầm sống vươn cao đón gió trời! ☀️🌾✨", 2600);
        triggerMascotHappyWink(2000);

        if (typeof window.playStarMagicSFX === 'function') {
            window.playStarMagicSFX();
        } else if (typeof window.playChimeSFX === 'function') {
            window.playChimeSFX();
        }

        mascotCompanion.classList.add('jump-bounce');
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
        }, 1200);
    };

    // 3. Phản ứng cưng nựng vuốt ve (Petting / Affection)
    const triggerMascotPetting = () => {
        if (isPetting || !mascotCompanion) return;
        isPetting = true;

        mascotCompanion.classList.add('is-petted');
        triggerMascotHappyWink(1600);

        if (mascotAffectionBurst) {
            mascotAffectionBurst.classList.add('active');
            setTimeout(() => {
                if (mascotAffectionBurst) mascotAffectionBurst.classList.remove('active');
            }, 1800);
        }

        if (typeof window.playRobotChirpSFX === 'function') {
            window.playRobotChirpSFX();
        }

        const quote = petQuotes[Math.floor(Math.random() * petQuotes.length)];
        showMascotSpeech(quote, 3000);

        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('is-petted');
            isPetting = false;
        }, 1800);
    };

    // 4. Chúc mừng đơm hoa / hoàn thành
    const triggerMascotCelebrate = () => {
        if (!mascotCompanion) return;
        mascotCompanion.classList.add('jump-bounce');
        triggerMascotHappyWink(2500);

        if (mascotAffectionBurst) {
            mascotAffectionBurst.classList.add('active');
            setTimeout(() => {
                if (mascotAffectionBurst) mascotAffectionBurst.classList.remove('active');
            }, 3000);
        }

        if (typeof window.playRobotChirpSFX === 'function') window.playRobotChirpSFX();
        showMascotSpeech("Hoan hô! Đóa sen nở ngát hương đồng nội rồi! Chúc bạn 20/10 vạn điều may mắn! (⁄ ⁄•⁄ω⁄•⁄ ⁄) ♡", 4200);
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
        }, 1400);
    };

    // 5. Chúc mừng khi người dùng chạm vào Cỏ 4 Lá May Mắn
    const triggerMascotCloverCheer = () => {
        if (!mascotCompanion) return;
        mascotCompanion.classList.add('jump-bounce');
        triggerMascotHappyWink(2200);
        if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
        showMascotSpeech("Ôi! Bạn đã chạm vào ngọn Cỏ Bốn Lá may mắn rồi! Điều ước sẽ thành hiện thực nhé! 🍀✨", 3800);
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
        }, 1000);
    };

    const initMascotCompanion = () => {
        if (!mascotCompanion) return;

        startEyeBlinkCycle();
        initPupilTracking();

        // Tương tác chạm / click
        mascotCompanion.addEventListener('click', (e) => {
            e.stopPropagation();

            // Nếu người dùng nhấp đúp hoặc vuốt nhẹ, kích hoạt cưng nựng
            if (Math.random() < 0.35) {
                triggerMascotPetting();
                return;
            }

            if (typeof window.playRobotChirpSFX === 'function') window.playRobotChirpSFX();
            mascotCompanion.classList.add('jump-bounce');
            triggerMascotHappyWink(1200);
            setTimeout(() => {
                if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
            }, 650);

            // Ngữ cảnh tương tác theo giai đoạn vườn
            const isRelocated = mascotCompanion.classList.contains('relocated-for-letter');
            const state = window.gardenState || {};
            const stage = state.currentStage !== undefined ? state.currentStage : 0;
            const isWatered = state.isWatered || false;
            const isFertilized = state.isFertilized || false;

            if (isRelocated) {
                showMascotSpeech("Chạm vào tấm ảnh Polaroid hoặc Bưu thiếp để mở lá thư bí mật 20/10 nhé! 💌🪷");
            } else if (!isWatered && (stage === 0 || stage === 1)) {
                showMascotSpeech("Kéo cụm mây trắng hoặc gõ nhẹ đất lành để tưới sương cho mầm cây nhé! 💧🌾");
            } else if (!isFertilized && (stage === 0 || stage === 2)) {
                showMascotSpeech("Kéo vệt nắng ban mai hoặc xoa ấm rễ để sưởi ấm cho mầm non nè! ☀️🌱");
            } else {
                quoteIndex = (quoteIndex + 1) % mascotCheerQuotes.length;
                showMascotSpeech(mascotCheerQuotes[quoteIndex]);
            }
        });
    };

    // Public API
    window.showMascotSpeech = showMascotSpeech;
    window.triggerMascotWatering = triggerMascotWatering;
    window.triggerMascotFertilizing = triggerMascotFertilizing;
    window.triggerMascotCelebrate = triggerMascotCelebrate;
    window.triggerMascotCloverCheer = triggerMascotCloverCheer;
    window.triggerMascotHappyWink = triggerMascotHappyWink;
    window.triggerMascotPetting = triggerMascotPetting;
    window.initMascotCompanion = initMascotCompanion;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMascotCompanion);
    } else {
        initMascotCompanion();
    }
})();
