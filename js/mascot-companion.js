/**
 * MASCOT COMPANION ENGINE (PHASE 4 - SUB-PHASE 4.1)
 * Chú bé đồng dao thân thương với mắt chớp, má hồng e ấp, nụ cười mèo và lời thoại đậm chất Việt.
 */
(function() {
    'use strict';

    const mascotCompanion = document.getElementById('garden-mascot-companion');
    const mascotArmWater = document.getElementById('mascot-arm-water');
    const mascotArmFertilize = document.getElementById('mascot-arm-fertilize');
    const mascotSpeechBubble = document.getElementById('mascot-speech-bubble');
    const mascotBubbleText = document.getElementById('mascot-bubble-text');
    const mascotFaceEmotes = document.getElementById('mascot-face-emotes');

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

    let mascotBubbleTimeout = null;
    let quoteIndex = 0;
    let blinkTimer = null;

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

    // Hành động tưới sương
    const triggerMascotWatering = () => {
        if (!mascotCompanion) return;
        if (mascotArmWater) mascotArmWater.classList.add('active');
        showMascotSpeech("Tưới giọt sương mai tinh khiết! Cho mầm cây mau đâm chồi biếc nhé! 💧🌿", 2400);
        triggerMascotHappyWink(1800);
        if (typeof window.playHydroBlasterSFX === 'function') window.playHydroBlasterSFX();
        mascotCompanion.classList.add('jump-bounce');
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
            if (mascotArmWater) mascotArmWater.classList.remove('active');
        }, 2000);
    };

    // Hành động sưởi nắng
    const triggerMascotFertilizing = () => {
        if (!mascotCompanion) return;
        if (mascotArmFertilize) mascotArmFertilize.classList.add('active');
        showMascotSpeech("Gieo hạt nắng vàng ấm áp! Chúc cây tình yêu vươn cao đón gió thu! ☀️🌾", 2400);
        triggerMascotHappyWink(1800);
        if (typeof window.playStarMagicSFX === 'function') window.playStarMagicSFX();
        mascotCompanion.classList.add('jump-bounce');
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
            if (mascotArmFertilize) mascotArmFertilize.classList.remove('active');
        }, 2000);
    };

    // Chúc mừng đơm hoa / hoàn thành
    const triggerMascotCelebrate = () => {
        if (!mascotCompanion) return;
        mascotCompanion.classList.add('jump-bounce');
        triggerMascotHappyWink(2500);
        if (typeof window.playRobotChirpSFX === 'function') window.playRobotChirpSFX();
        showMascotSpeech("Hoan hô! Đóa sen nở ngát hương đồng nội rồi! Chúc bạn 20/10 vạn điều may mắn! (⁄ ⁄•⁄ω⁄•⁄ ⁄) ♡", 4000);
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
        }, 1200);
    };

    // Chúc mừng khi người dùng chạm vào Cỏ 4 Lá May Mắn
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

        mascotCompanion.addEventListener('click', (e) => {
            e.stopPropagation();
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
    window.initMascotCompanion = initMascotCompanion;

    // Auto-init on DOMContentLoaded if ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMascotCompanion);
    } else {
        initMascotCompanion();
    }
})();
