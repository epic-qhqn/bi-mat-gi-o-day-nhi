/**
 * BOTANICAL MELODIC HARP STRINGS ENGINE (PHASE 3.3)
 * 5-string crystalline acoustic harp on sprout stem.
 * Plucking individual strings (C5 - C6), continuous swipe glissando,
 * note particles, and mascot companion musical response.
 */
(function() {
    'use strict';

    const plantHarpWrapEl = document.getElementById('plant-harp-strings-wrap');
    const harpStringWires = plantHarpWrapEl ? Array.from(plantHarpWrapEl.querySelectorAll('.harp-string-wire')) : [];
    let lastMascotHarpSyncTime = 0;
    const lastPluckedStringTime = [0, 0, 0, 0, 0];

    const mascotHarpQuotes = [
        "Lắng nghe kìa! Cành mầm đang gảy khúc đàn hạc thiên nhiên! 🌿🎶",
        "Giai điệu pha lê ngân vang trong trẻo quá! ✨",
        "Pew! Cây mầm thích bài đàn này của bạn lắm nè! 🌸",
        "Mỗi chiếc lá non là một nốt nhạc diệu kỳ! (≧◡≦) ♡",
        "Thanh âm thảo mộc làm khu vườn bừng sáng! ☀️🎶"
    ];
    let mascotHarpQuoteIdx = 0;

    const triggerMascotHarpSync = () => {
        const now = Date.now();
        if (now - lastMascotHarpSyncTime < 1400) return;
        lastMascotHarpSyncTime = now;

        const mascotCompanion = document.getElementById('garden-mascot-companion');
        if (mascotCompanion) {
            mascotCompanion.classList.add('mascot-harp-singing');
            const halo = mascotCompanion.querySelector('.mascot-halo-glow');
            if (halo) halo.classList.add('musical-halo');

            setTimeout(() => {
                if (mascotCompanion) mascotCompanion.classList.remove('mascot-harp-singing');
                if (halo) halo.classList.remove('musical-halo');
            }, 850);
        }

        if (typeof window.playRobotChirpSFX === 'function') window.playRobotChirpSFX();

        if (Math.random() < 0.65 && typeof window.showMascotSpeech === 'function') {
            const quote = mascotHarpQuotes[mascotHarpQuoteIdx % mascotHarpQuotes.length];
            mascotHarpQuoteIdx++;
            window.showMascotSpeech(quote, 2800);
        }
    };

    const spawnHarpNoteParticle = (clientX, clientY) => {
        const symbols = ['♪', '♫', '✦', '❀', '☘', '✨'];
        const sym = symbols[Math.floor(Math.random() * symbols.length)];
        const noteEl = document.createElement('div');
        noteEl.className = 'harp-note-particle';
        noteEl.textContent = sym;
        noteEl.style.left = `${clientX}px`;
        noteEl.style.top = `${clientY}px`;
        noteEl.style.setProperty('--dx', `${(Math.random() - 0.5) * 45}px`);
        document.body.appendChild(noteEl);

        setTimeout(() => {
            if (noteEl.parentNode) noteEl.parentNode.removeChild(noteEl);
        }, 950);
    };

    const pluckHarpStringByIndex = (index, clientX = null, clientY = null) => {
        if (index < 0 || index >= harpStringWires.length) return;
        const wire = harpStringWires[index];
        if (!wire) return;

        const now = Date.now();
        if (now - (lastPluckedStringTime[index] || 0) < 110) return;
        lastPluckedStringTime[index] = now;

        wire.classList.add('plucked');
        setTimeout(() => {
            wire.classList.remove('plucked');
        }, 600);

        const rect = wire.getBoundingClientRect();
        const px = clientX !== null ? clientX : (rect.left + rect.width / 2);
        const py = clientY !== null ? clientY : (rect.top + rect.height / 2);

        spawnHarpNoteParticle(px, py);

        if (typeof window.playMelodicHarpChime === 'function') {
            window.playMelodicHarpChime(index);
        }

        triggerMascotHarpSync();
    };

    const triggerHarpStringGlissando = (direction = 'up', staggerMs = 85) => {
        const indices = direction === 'up' ? [0, 1, 2, 3, 4] : [4, 3, 2, 1, 0];
        indices.forEach((idx, step) => {
            setTimeout(() => {
                pluckHarpStringByIndex(idx);
            }, step * staggerMs);
        });
    };

    const initBotanicalHarp = () => {
        if (!plantHarpWrapEl) return;
        let isSwipingHarp = false;
        let lastSwipedIndex = -1;
        let cachedWireRects = [];

        const checkAndPluckFromPoint = (x, y) => {
            const rects = cachedWireRects.length === harpStringWires.length
                ? cachedWireRects
                : harpStringWires.map(w => w.getBoundingClientRect());

            for (let i = 0; i < harpStringWires.length; i++) {
                const rect = rects[i];
                if (rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    if (i !== lastSwipedIndex) {
                        lastSwipedIndex = i;
                        pluckHarpStringByIndex(i, x, y);
                    }
                    return;
                }
            }
        };

        plantHarpWrapEl.addEventListener('pointerdown', (e) => {
            isSwipingHarp = true;
            lastSwipedIndex = -1;
            cachedWireRects = harpStringWires.map(w => w.getBoundingClientRect());
            try { plantHarpWrapEl.setPointerCapture(e.pointerId); } catch (_) {}
            checkAndPluckFromPoint(e.clientX, e.clientY);
        });

        plantHarpWrapEl.addEventListener('pointermove', (e) => {
            if (!isSwipingHarp) return;
            checkAndPluckFromPoint(e.clientX, e.clientY);
        });

        const handleHarpSwipeEnd = (e) => {
            if (isSwipingHarp) {
                isSwipingHarp = false;
                lastSwipedIndex = -1;
                cachedWireRects = [];
                try { plantHarpWrapEl.releasePointerCapture(e.pointerId); } catch (_) {}
            }
        };

        plantHarpWrapEl.addEventListener('pointerup', handleHarpSwipeEnd);
        plantHarpWrapEl.addEventListener('pointercancel', handleHarpSwipeEnd);
    };

    // Public API
    window.pluckHarpStringByIndex = pluckHarpStringByIndex;
    window.triggerHarpStringGlissando = triggerHarpStringGlissando;
    window.initBotanicalHarp = initBotanicalHarp;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBotanicalHarp);
    } else {
        initBotanicalHarp();
    }
})();
