/**
 * MASCOT ROBOT GARDEN COMPANION ENGINE (PHASE 5)
 * Robot Epic cutout 2D companion with dynamic speech, emotes, hydro blaster, and star wand.
 */
(function() {
    'use strict';

    const mascotCompanion = document.getElementById('garden-mascot-companion');
    const mascotArmWater = document.getElementById('mascot-arm-water');
    const mascotArmFertilize = document.getElementById('mascot-arm-fertilize');
    const mascotSpeechBubble = document.getElementById('mascot-speech-bubble');
    const mascotBubbleText = document.getElementById('mascot-bubble-text');

    const mascotCheerQuotes = [
        "Chào bạn! Tớ là robot EPIC bảo vệ khu vườn nè! 🤖🌱",
        "Tưới nước và bón phân để hạt giống nở hoa nhé! 💧✨",
        "Khu vườn tràn ngập phép màu đang lớn lên từng ngày! 🌸",
        "Bạn chăm sóc cây khéo léo quá đi! 💖",
        "Cố lên nào, bí mật kỳ diệu sắp hé lộ rồi! 🎁🚀",
        "Pew pew! Pháo nước Hydro đã sẵn sàng tiếp sức! 💦",
        "Bột sao ma thuật sẽ giúp cây vươn cao đón nắng! 🌟",
        "Tớ luôn ở đây đồng hành cùng bạn nè! (≧◡≦) ♡"
    ];

    let mascotBubbleTimeout = null;
    let quoteIndex = 0;

    const showMascotSpeech = (text, duration = 3500) => {
        if (!mascotSpeechBubble || !mascotBubbleText) return;
        mascotBubbleText.textContent = text;
        mascotSpeechBubble.classList.add('visible');
        clearTimeout(mascotBubbleTimeout);
        mascotBubbleTimeout = setTimeout(() => {
            if (mascotSpeechBubble) mascotSpeechBubble.classList.remove('visible');
        }, duration);
    };

    const triggerMascotWatering = () => {
        if (!mascotCompanion) return;
        if (mascotArmWater) mascotArmWater.classList.add('active');
        showMascotSpeech("Pháo nước Hydro kích hoạt! Tưới mát cho mầm cây nào! 💦✨", 2200);
        if (typeof window.playHydroBlasterSFX === 'function') window.playHydroBlasterSFX();
        mascotCompanion.classList.add('jump-bounce');
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
            if (mascotArmWater) mascotArmWater.classList.remove('active');
        }, 2000);
    };

    const triggerMascotFertilizing = () => {
        if (!mascotCompanion) return;
        if (mascotArmFertilize) mascotArmFertilize.classList.add('active');
        showMascotSpeech("Bột sao ma thuật bừng sáng! Cây mau lớn nhé! 🌟✨", 2200);
        if (typeof window.playStarMagicSFX === 'function') window.playStarMagicSFX();
        mascotCompanion.classList.add('jump-bounce');
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
            if (mascotArmFertilize) mascotArmFertilize.classList.remove('active');
        }, 2000);
    };

    const triggerMascotCelebrate = () => {
        if (!mascotCompanion) return;
        mascotCompanion.classList.add('jump-bounce');
        if (typeof window.playRobotChirpSFX === 'function') window.playRobotChirpSFX();
        showMascotSpeech("Hoan hô! Bạn làm xuất sắc lắm! (≧◡≦) ♡", 3500);
        setTimeout(() => {
            if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
        }, 1200);
    };

    const initMascotCompanion = () => {
        if (!mascotCompanion) return;

        mascotCompanion.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof window.playRobotChirpSFX === 'function') window.playRobotChirpSFX();
            mascotCompanion.classList.add('jump-bounce');
            setTimeout(() => {
                if (mascotCompanion) mascotCompanion.classList.remove('jump-bounce');
            }, 650);

            // Context-aware speech
            const isRelocated = mascotCompanion.classList.contains('relocated-for-letter');
            const state = window.gardenState || {};
            const stage = state.currentStage !== undefined ? state.currentStage : 0;
            const isWatered = state.isWatered || false;
            const isFertilized = state.isFertilized || false;

            if (isRelocated) {
                showMascotSpeech("Chạm vào tấm ảnh Polaroid ở góc phải để mở thư bí mật nhé! 💌✨");
            } else if (!isWatered && (stage === 0 || stage === 1)) {
                showMascotSpeech("Hãy kéo mây hoặc gõ đúp mặt đất để tưới sương cho mầm cây nhé! 💧✨");
            } else if (!isFertilized && (stage === 0 || stage === 2)) {
                showMascotSpeech("Giờ là lúc kéo vệt nắng hoặc xoa ấm rễ để sưởi cho cây nè! 🌟🌱");
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
    window.initMascotCompanion = initMascotCompanion;

    // Auto-init on DOMContentLoaded if ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMascotCompanion);
    } else {
        initMascotCompanion();
    }
})();
