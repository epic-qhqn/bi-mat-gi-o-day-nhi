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
        "Chào bạn nhé! Hôm nay ghé thăm vườn có thấy lòng nhẹ nhõm hơn chút nào không? 🌿✨",
        "Gió thổi qua cành lá xào xạc như đang khen hôm nay bạn thật rạng rỡ đó! 🍃🌸",
        "Một giọt nước mát lành cho mầm cây, và một nụ cười thật tươi cho bạn nè! 💧☀️",
        "Thỉnh thoảng cho phép mình thảnh thơi một chút, như cách mầm cây thong thả lớn lên nha 🪴",
        "Bạn chăm vườn khéo ghê, mầm cây dường như cảm nhận được sự dịu dàng của bạn đó 🪷",
        "Mưa nắng ngoài kia có thế nào thì ở đây luôn có một góc bình yên dành riêng cho bạn 🌟",
        "Chúc bạn ngày 20/10 và cả 364 ngày còn lại đều được tự do làm điều mình yêu thích! 🌻✨",
        "Trời tháng Mười dịu mát ghê, mong mọi điều âu lo của bạn đều tan biến theo gió nha 🌼",
        "Mỗi chúng mình là một đóa hoa với thời điểm nở rộ của riêng mình, không việc gì phải vội 🌿🕊️",
        "Nếu có lúc bối rối chưa biết làm gì, chạm nút '📖 Hướng Dẫn' phía trên tớ chỉ cho nha! 💡✨",
        "Tớ ở đây canh vườn và luôn sẵn sàng lắng nghe bạn tâm tình! (≗ω≗) ♡"
    ];

    const petQuotes = [
        "Aww, xoa đầu tớ hả? Thích ghê, cảm ơn bạn nhiều nha! (≧◡≦) ♡",
        "Bàn tay ấm áp quá! Chúc bạn hôm nay nhận được thật nhiều điều ngọt ngào 🌸",
        "Hi hi, cù lét tớ hả? Nhìn bạn cười là tớ cũng thấy vui lây luôn á! 🌼✨",
        "Tớ sẽ luôn ở đây canh giữ khu vườn, bất cứ khi nào cần thảnh thơi cứ ghé chơi nghen! 🪷💖"
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

        showMascotSpeech("Gọi đám mây gom chút sương mát lành vỗ về mầm xanh nhé! ☁️💧🌿", 2600);
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

        showMascotSpeech("Kéo vệt nắng ban mai sưởi ấm, cho rễ cây thêm vững vàng đón gió thu! ☀️🌾✨", 2600);
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
        showMascotSpeech("Oa nhìn kìa! Cây tình yêu đã nở hoa rực rỡ rồi! Chúc bạn một ngày 20/10 ngập tràn niềm vui và hạnh phúc nhé! 🌸💖", 4200);
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
        showMascotSpeech("Oa, bạn tinh mắt thật! Chạm vào Cỏ Bốn Lá rồi thì hôm nay chắc chắn gặp toàn điều may mắn nha! 🍀✨", 3800);
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
                showMascotSpeech("Chạm vào tấm ảnh Polaroid hoặc Bưu thiếp để mở món quà bí mật 20/10 nhé! 💌🪷");
            } else if (!isWatered && (stage === 0 || stage === 1)) {
                showMascotSpeech("Bạn kéo đám mây hoặc gõ nhẹ mặt đất để tưới sương cho mầm cây nhé! 💧🌾");
            } else if (!isFertilized && (stage === 0 || stage === 2)) {
                showMascotSpeech("Bạn kéo vệt nắng ban mai hoặc xoa nhẹ gốc để sưởi ấm cho mầm non nè! ☀️🌱");
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
