/**
 * GARDEN MINIGAMES ENGINE
 * Minigame A: Simon Says (Giai Điệu Tình Yêu) - Harmonic palettes & motif sequence.
 * Minigame B: Constellation Linker (Chòm Sao Định Mệnh) - 5-star procedural connection & decoy stars.
 */
(function() {
    'use strict';

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // ==========================================================================
    // MINIGAME A: SIMON SAYS (GIAI ĐIỆU TÌNH YÊU)
    // ==========================================================================
    let simonSequence = [];
    let simonInput = [];
    let simonPlaying = false;
    let simonGenerationId = 0;
    let lastTapNodeTime = 0;

    // Tạo dãy nốt ngẫu nhiên: 4-5 nốt, không lặp liền nhau, có >= 3 nốt khác nhau.
    const generateRandomSequence = () => {
        const len = Math.random() < 0.5 ? 4 : 5;
        const seq = [];
        for (let i = 0; i < len; i++) {
            let n;
            do { n = Math.floor(Math.random() * 4); } while (i > 0 && n === seq[i - 1]);
            seq.push(n);
        }
        return new Set(seq).size >= 3 ? seq : generateRandomSequence();
    };

    // Chọn NGẪU NHIÊN bản nhạc (palette) + dãy nốt mới, luôn khác lần trước.
    // Gọi khi vào game (mỗi lần tải trang) và mỗi khi người chơi bấm sai nốt.
    const rollNewMelody = () => {
        const palettes = window.simonHarmonicPalettes || [];
        const currentId = window.activeHarmonicPalette
            ? window.activeHarmonicPalette.id
            : sessionStorage.getItem('last_simon_palette_id');
        let chosen = palettes[0] || { id: 'canon', name: 'Canon in D Romance' };
        if (palettes.length > 1) {
            const available = palettes.filter(p => p.id !== currentId);
            chosen = available[Math.floor(Math.random() * available.length)] || palettes[0];
        }
        sessionStorage.setItem('last_simon_palette_id', chosen.id);
        window.activeHarmonicPalette = chosen;

        const lastSeqStr = JSON.stringify(simonSequence.length ? simonSequence : JSON.parse(sessionStorage.getItem('last_simon_seq') || 'null'));
        let newSeq;
        let attempts = 0;
        do {
            newSeq = generateRandomSequence();
            attempts++;
        } while (attempts < 30 && JSON.stringify(newSeq) === lastSeqStr);

        sessionStorage.setItem('last_simon_seq', JSON.stringify(newSeq));
        simonSequence = newSeq;
        simonInput = [];
    };

    const stopSimonGame = () => {
        simonPlaying = false;
        simonGenerationId++;
        simonInput = [];
    };

    const startSimonGame = async () => {
        const currentGen = ++simonGenerationId;
        simonPlaying = false;
        simonInput = [];

        const container = document.getElementById('simon-game');
        if (!container) return;
        container.classList.remove('hidden');
        container.style.display = 'block';
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
        container.innerHTML = '';

        document.body.classList.remove('stage-1-active', 'stage-3-active', 'stage-4-active');
        document.body.classList.add('stage-2-active');
        const hintEl = document.getElementById('terrarium-gesture-hint');
        if (hintEl) hintEl.style.display = 'none';
        const instructionEl = document.querySelector('.garden-ui .instruction');
        if (instructionEl) instructionEl.style.display = 'none';

        const replayBtn = document.getElementById('simon-replay-btn');
        if (replayBtn) {
            replayBtn.classList.remove('hidden');
            replayBtn.style.display = 'flex';
            replayBtn.style.pointerEvents = 'auto';
            if (!replayBtn.dataset.bound) {
                replayBtn.dataset.bound = 'true';
                const triggerReplay = async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const state = window.gardenState || {};
                    if (simonPlaying || (state.currentStage !== undefined && state.currentStage !== 1)) return;
                    simonInput = [];
                    const msg = document.getElementById('garden-message');
                    if (msg) msg.textContent = "Đang phát lại giai điệu mộc cầm...";
                    if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
                    await playSimonSequence(simonGenerationId);
                };
                replayBtn.addEventListener('click', triggerReplay);
            }
        }

        const celestialArcSlots = [
            { l: 20, t: 34 },
            { l: 33, t: 48 },
            { l: 67, t: 48 },
            { l: 80, t: 34 }
        ];

        const noteIcons = ['🌸', '🎵', '✨', '🎶'];
        const noteColors = ['#fbb6ce', '#90cdf4', '#fbd38d', '#bbf7d0'];

        celestialArcSlots.forEach((slot, idx) => {
            const l = slot.l + (Math.random() * 2 - 1);
            const t = slot.t + (Math.random() * 2 - 1);

            const node = document.createElement('div');
            node.className = 'simon-node';
            node.setAttribute('data-index', idx);
            node.style.left = l.toFixed(1) + '%';
            node.style.top = t.toFixed(1) + '%';
            node.style.setProperty('--note-color', noteColors[idx]);
            node.innerHTML = `<span class="simon-icon">${noteIcons[idx]}</span>`;

            // Chống hiện tượng ghost-click / duplicate event giữa pointerdown và click
            let handledByPointer = false;
            node.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handledByPointer = true;
                setTimeout(() => { handledByPointer = false; }, 400);
                handleSimonClick(node, idx);
            });
            node.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (handledByPointer) return;
                handleSimonClick(node, idx);
            });

            container.appendChild(node);
        });

        rollNewMelody();
        const chosenPalette = window.activeHarmonicPalette;

        // Phase 2: Fade in âm thanh đàn và giảm dần nhạc nền trong 2s (2000ms)
        if (typeof window.duckBgmForMinigame === 'function') {
            window.duckBgmForMinigame(true, 2000);
        }

        const msg = document.getElementById('garden-message');
        if (msg) msg.textContent = `🎵 ${chosenPalette.name}: Lắng nghe những nốt nhạc ngân vang...`;
        await sleep(1200);
        if (currentGen !== simonGenerationId) return;
        await playSimonSequence(currentGen);
    };

    const playSimonSequence = async (genId) => {
        simonPlaying = true;
        const replayBtn = document.getElementById('simon-replay-btn');
        if (replayBtn) replayBtn.classList.add('disabled');
        await sleep(600);
        if (genId && genId !== simonGenerationId) return;

        const container = document.getElementById('simon-game');
        for (let i = 0; i < simonSequence.length; i++) {
            if (genId && genId !== simonGenerationId) return;
            const index = simonSequence[i];
            const node = container ? container.querySelector(`.simon-node[data-index="${index}"]`) : null;
            if (node) {
                node.classList.add('highlight');
                if (typeof window.playSimonSFX !== 'undefined') window.playSimonSFX(index);
                await sleep(500);
                node.classList.remove('highlight');
                await sleep(220);
            }
        }
        if (genId && genId !== simonGenerationId) return;
        simonPlaying = false;
        if (replayBtn) replayBtn.classList.remove('disabled');
        const msg = document.getElementById('garden-message');
        if (msg) msg.textContent = "Đến lượt bạn gảy lại từng nốt nhạc nhé! 🌸";
    };

    const handleSimonClick = async (node, index) => {
        const now = Date.now();
        if (now - lastTapNodeTime < 220) return;
        lastTapNodeTime = now;

        const state = window.gardenState || {};
        if (simonPlaying || (state.currentStage !== undefined && state.currentStage !== 1)) return;

        node.classList.add('highlight');
        if (typeof window.playSimonSFX !== 'undefined') window.playSimonSFX(index);
        setTimeout(() => node.classList.remove('highlight'), 220);

        simonInput.push(index);
        const currentStep = simonInput.length - 1;
        const msg = document.getElementById('garden-message');

        if (simonInput[currentStep] !== simonSequence[currentStep]) {
            simonPlaying = true;
            if (msg) msg.textContent = "Lạc mất một nhịp rồi, cùng nghe lại để tìm giai điệu nhé... 🎶";
            node.classList.add('wrong');
            setTimeout(() => node.classList.remove('wrong'), 500);
            await sleep(1000);
            const currentGen = ++simonGenerationId;
            rollNewMelody();
            const paletteName = window.activeHarmonicPalette ? window.activeHarmonicPalette.name : 'Khúc ca';
            if (msg) msg.textContent = `🎵 ${paletteName}: giai điệu mới, cùng lắng nghe nhé...`;
            await playSimonSequence(currentGen);
        } else if (simonInput.length === simonSequence.length) {
            simonPlaying = true;
            if (typeof window.duckBgmForMinigame === 'function') {
                window.duckBgmForMinigame(false, 2000);
            }
            const simonContainer = document.getElementById('simon-game');
            if (simonContainer) simonContainer.classList.add('hidden');
            const replayBtn = document.getElementById('simon-replay-btn');
            if (replayBtn) replayBtn.classList.add('hidden');
            if (msg) msg.textContent = "Giai điệu hòa quyện tuyệt đẹp! Cây non đang lớn vùn vụt kìa 🌸✨";
            setTimeout(() => {
                if (typeof window.advanceStage === 'function') window.advanceStage(1);
            }, 1000);
        } else {
            // Nốt đúng nhưng chưa hết dãy -> thông báo động viên & số nốt còn lại
            if (msg) {
                const remaining = simonSequence.length - simonInput.length;
                msg.textContent = `Chuẩn xác rồi! 🎶 Còn ${remaining} nốt nữa thôi...`;
            }
        }
    };

    // ==========================================================================
    // MINIGAME B: CONSTELLATION LINKER (CHÒM SAO ĐỊNH MỆNH)
    // ==========================================================================
    let constellationInput = [];
    let isDraggingConstellation = false;
    let activeStarIndex = null;
    let starCoords = [];
    let constellationGuidePath = null;
    let constellationHintTimeout = null;
    let activeDecoyElements = [];
    let activeConstellationTopology = null;
    let activeConstellationName = null;

    const constellationArchetypes = [
        {
            id: "corona",
            name: "Corona Borealis (Vương Miện Ánh Sao)",
            stars: [{ l: 20, t: 34 }, { l: 34, t: 20 }, { l: 50, t: 14 }, { l: 66, t: 20 }, { l: 80, t: 34 }],
            decoys: [{ l: 30, t: 38 }, { l: 70, t: 38 }]
        },
        {
            id: "cygnus",
            name: "Cygnus Wings (Thiên Nga Vươn Cánh)",
            stars: [{ l: 50, t: 38 }, { l: 50, t: 24 }, { l: 50, t: 12 }, { l: 26, t: 22 }, { l: 74, t: 22 }],
            decoys: [{ l: 38, t: 34 }, { l: 62, t: 34 }]
        },
        {
            id: "lyra",
            name: "Lyra Harp (Chiếc Đàn Thiên Cầm)",
            stars: [{ l: 24, t: 18 }, { l: 40, t: 28 }, { l: 60, t: 28 }, { l: 68, t: 40 }, { l: 34, t: 40 }],
            decoys: [{ l: 50, t: 16 }, { l: 78, t: 24 }]
        },
        {
            id: "heart",
            name: "Celestial Heart (Trái Tim Tinh Tú)",
            stars: [{ l: 50, t: 40 }, { l: 28, t: 26 }, { l: 36, t: 14 }, { l: 64, t: 14 }, { l: 72, t: 26 }],
            decoys: [{ l: 50, t: 22 }, { l: 20, t: 38 }]
        },
        {
            id: "ursa",
            name: "Ursa Dipper (Bắc Đẩu Dẫn Lối)",
            stars: [{ l: 20, t: 20 }, { l: 35, t: 16 }, { l: 48, t: 24 }, { l: 62, t: 24 }, { l: 78, t: 36 }],
            decoys: [{ l: 46, t: 38 }, { l: 72, t: 16 }]
        }
    ];

    // =========================================================================
    // SUB-PHASE 5.1: DYNAMIC POISSON-DISK STAR FIELD GENERATOR
    // =========================================================================
    const generatePoissonStarField = (options = {}) => {
        const {
            starCount = 5,
            decoyCount = 2,
            minDistance = 90, // Minimum Euclidean distance in px on 1100x680 space
            bounds = { minL: 18, maxL: 82, minT: 13, maxT: 42 }
        } = options;

        const CANVAS_W = 1100;
        const CANVAS_H = 680;
        const minDistanceSq = minDistance * minDistance;

        const toPixels = (l, t) => ({
            cx: (l / 100) * CANVAS_W,
            cy: (t / 100) * CANVAS_H
        });

        const isSafeDistance = (cx, cy, existingList) => {
            // Avoid tree canopy top center if cy is in crown zone
            if (cy > 235 && cx > 480 && cx < 620) return false;
            // Avoid center header zone under garden UI ribbon
            if (cy < 135 && cx > 370 && cx < 730) return false;

            for (let i = 0; i < existingList.length; i++) {
                const p = existingList[i];
                const dx = p.cx - cx;
                const dy = p.cy - cy;
                if ((dx * dx + dy * dy) < minDistanceSq) return false;
            }
            return true;
        };

        const existingPoints = [];
        const stars = [];

        // 1. Initial Anchor Star (Star 1) in safe upper-left/center area
        let startL = bounds.minL + Math.random() * (bounds.maxL * 0.35 - bounds.minL);
        let startT = bounds.minT + 4 + Math.random() * (bounds.maxT - bounds.minT - 8);
        let p0 = toPixels(startL, startT);
        stars.push({ index: 0, l: startL, t: startT, cx: p0.cx, cy: p0.cy, label: 1 });
        existingPoints.push(p0);

        // 2. Annular ring Poisson-chain walking for remaining stars
        for (let i = 1; i < starCount; i++) {
            let placed = false;
            const prev = stars[i - 1];

            // Try candidate points in an annular ring [minDist, minDist * 2.1]
            for (let attempt = 0; attempt < 50; attempt++) {
                // Natural sweeping arc across the celestial canopy
                const angle = (Math.random() - 0.3) * Math.PI; // -54° to +126° generally drifting rightward/downward
                const dist = minDistance + Math.random() * (minDistance * 0.85);

                const candCx = prev.cx + Math.cos(angle) * dist;
                const candCy = prev.cy + Math.sin(angle) * dist;
                const candL = (candCx / CANVAS_W) * 100;
                const candT = (candCy / CANVAS_H) * 100;

                if (candL >= bounds.minL && candL <= bounds.maxL &&
                    candT >= bounds.minT && candT <= bounds.maxT) {
                    if (isSafeDistance(candCx, candCy, existingPoints)) {
                        const newStar = { index: i, l: candL, t: candT, cx: candCx, cy: candCy, label: i + 1 };
                        stars.push(newStar);
                        existingPoints.push({ cx: candCx, cy: candCy });
                        placed = true;
                        break;
                    }
                }
            }

            // Fallback: Global rejection sampling across bounds
            if (!placed) {
                for (let fallbackAttempt = 0; fallbackAttempt < 80; fallbackAttempt++) {
                    const candL = bounds.minL + Math.random() * (bounds.maxL - bounds.minL);
                    const candT = bounds.minT + Math.random() * (bounds.maxT - bounds.minT);
                    const candP = toPixels(candL, candT);
                    if (isSafeDistance(candP.cx, candP.cy, existingPoints)) {
                        const newStar = { index: i, l: candL, t: candT, cx: candP.cx, cy: candP.cy, label: i + 1 };
                        stars.push(newStar);
                        existingPoints.push(candP);
                        placed = true;
                        break;
                    }
                }
            }
        }

        // 3. Generate Decoy Stars with strict Poisson distance from all stars & each other
        const decoys = [];
        for (let d = 0; d < decoyCount; d++) {
            let placedDecoy = false;
            for (let attempt = 0; attempt < 100; attempt++) {
                const candL = bounds.minL + 2 + Math.random() * (bounds.maxL - bounds.minL - 4);
                const candT = bounds.minT + 2 + Math.random() * (bounds.maxT - bounds.minT - 4);
                const candP = toPixels(candL, candT);
                if (isSafeDistance(candP.cx, candP.cy, existingPoints)) {
                    const decoyObj = { index: d, l: candL, t: candT, cx: candP.cx, cy: candP.cy };
                    decoys.push(decoyObj);
                    existingPoints.push(candP);
                    placedDecoy = true;
                    break;
                }
            }
        }

        return {
            stars,
            decoys,
            starCount: stars.length,
            decoyCount: decoys.length,
            minDistance
        };
    };

    const validatePoissonStarField = (starField, minDistance = 88) => {
        if (!starField || !starField.stars) return { isValid: false, reason: 'No stars provided' };
        const allPoints = [
            ...starField.stars.map(s => ({ cx: s.cx, cy: s.cy, type: 'star', index: s.index })),
            ...((starField.decoys || []).map(d => ({ cx: d.cx, cy: d.cy, type: 'decoy', index: d.index })))
        ];

        let minPairwise = Infinity;
        let violation = null;

        for (let i = 0; i < allPoints.length; i++) {
            for (let j = i + 1; j < allPoints.length; j++) {
                const p1 = allPoints[i];
                const p2 = allPoints[j];
                const dist = Math.hypot(p1.cx - p2.cx, p1.cy - p2.cy);
                if (dist < minPairwise) minPairwise = dist;
                if (dist < minDistance) {
                    violation = { p1, p2, dist, required: minDistance };
                }
            }
        }

        return {
            isValid: !violation,
            minPairwiseDistance: minPairwise,
            totalPoints: allPoints.length,
            violation
        };
    };

    // =========================================================================
    // SUB-PHASE 5.2: DYNAMIC TOPOLOGY PATH & PROCEDURAL NOMENCLATURE GENERATOR
    // =========================================================================
    const LATIN_PREFIXES = [
        'Astra', 'Lumina', 'Stella', 'Lyra', 'Celestia',
        'Serena', 'Vespera', 'Solaria', 'Aura', 'Zephyra',
        'Oriona', 'Mirabilia', 'Nova', 'Phœnix', 'Caelia'
    ];

    const LATIN_SUFFIXES = [
        'Nova', 'Flora', 'Amoris', 'Borealis', 'Aeterna',
        'Caelum', 'Harmonia', 'Luminis', 'Radiata', 'Serenitas',
        'Mirabilis', 'Floralis', 'Aetheria', 'Coronis', 'Symphonia'
    ];

    const LYRICAL_SUBTITLES = [
        'Trái Tim Ngân Hà Đơm Hoa',
        'Vương Miện Ánh Sáng Vĩnh Hằng',
        'Khúc Ca Tinh Tú Thức Tỉnh Mầm Xanh',
        'Vũ Khúc Ánh Sáng Khởi Sinh',
        'Dải Lụa Ngân Hà Nguyện Ước',
        'Ngọn Hải Đăng Giữa Biển Sao Rực Rỡ',
        'Cánh Cung Tinh Vân Dệt Mộng',
        'Giai Điệu Vòm Trời Bình Yên',
        'Ánh Lửa Tinh Khôi Dẫn Lối',
        'Đóa Hoa Tinh Tú Nở Rộ Giữa Vũ Trụ',
        'Chiếc Thuyền Ánh Sáng Vượt Thời Gian',
        'Gió Đêm Gửi Lời Bình Yên'
    ];

    const generateConstellationName = () => {
        let recentNames = [];
        try {
            const stored = sessionStorage.getItem('recentlyUsedConstellations');
            if (stored) recentNames = JSON.parse(stored);
            if (!Array.isArray(recentNames)) recentNames = [];
        } catch (_) {
            recentNames = [];
        }

        let chosenPrefix = '';
        let chosenSuffix = '';
        let chosenLatin = '';

        for (let i = 0; i < 25; i++) {
            chosenPrefix = LATIN_PREFIXES[Math.floor(Math.random() * LATIN_PREFIXES.length)];
            chosenSuffix = LATIN_SUFFIXES[Math.floor(Math.random() * LATIN_SUFFIXES.length)];
            if (chosenPrefix === chosenSuffix) continue;
            chosenLatin = `${chosenPrefix} ${chosenSuffix}`;
            if (!recentNames.includes(chosenLatin)) {
                break;
            }
        }

        const chosenSubtitle = LYRICAL_SUBTITLES[Math.floor(Math.random() * LYRICAL_SUBTITLES.length)];

        recentNames.push(chosenLatin);
        if (recentNames.length > 6) recentNames.shift();
        try {
            sessionStorage.setItem('recentlyUsedConstellations', JSON.stringify(recentNames));
        } catch (_) {}

        return {
            prefix: chosenPrefix,
            suffix: chosenSuffix,
            latinName: chosenLatin,
            subtitle: chosenSubtitle,
            fullName: `${chosenLatin} — ${chosenSubtitle}`
        };
    };

    const computeConstellationTopology = (stars) => {
        if (!Array.isArray(stars) || stars.length === 0) {
            return {
                starCount: 0,
                edges: [],
                totalLength: 0,
                avgSegmentLength: 0,
                svgGuideD: '',
                bbox: { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0, centerCx: 0, centerCy: 0 }
            };
        }

        const edges = [];
        let totalLength = 0;
        let guideD = `M ${stars[0].cx.toFixed(1)} ${stars[0].cy.toFixed(1)}`;

        let minX = stars[0].cx;
        let maxX = stars[0].cx;
        let minY = stars[0].cy;
        let maxY = stars[0].cy;

        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            if (s.cx < minX) minX = s.cx;
            if (s.cx > maxX) maxX = s.cx;
            if (s.cy < minY) minY = s.cy;
            if (s.cy > maxY) maxY = s.cy;

            if (i > 0) {
                const prev = stars[i - 1];
                const dx = s.cx - prev.cx;
                const dy = s.cy - prev.cy;
                const dist = Math.hypot(dx, dy);
                const angleDeg = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
                const midX = (prev.cx + s.cx) / 2;
                const midY = (prev.cy + s.cy) / 2;

                edges.push({
                    from: i - 1,
                    to: i,
                    fromStar: prev,
                    toStar: s,
                    length: Math.round(dist * 10) / 10,
                    angleDeg: Math.round(angleDeg * 10) / 10,
                    midpoint: { x: Math.round(midX * 10) / 10, y: Math.round(midY * 10) / 10 }
                });

                totalLength += dist;
                guideD += ` L ${s.cx.toFixed(1)} ${s.cy.toFixed(1)}`;
            }
        }

        const width = maxX - minX;
        const height = maxY - minY;
        const centerCx = (minX + maxX) / 2;
        const centerCy = (minY + maxY) / 2;

        return {
            starCount: stars.length,
            edges,
            totalLength: Math.round(totalLength * 10) / 10,
            avgSegmentLength: edges.length > 0 ? Math.round((totalLength / edges.length) * 10) / 10 : 0,
            svgGuideD: guideD,
            bbox: {
                minX: Math.round(minX * 10) / 10,
                minY: Math.round(minY * 10) / 10,
                maxX: Math.round(maxX * 10) / 10,
                maxY: Math.round(maxY * 10) / 10,
                width: Math.round(width * 10) / 10,
                height: Math.round(height * 10) / 10,
                centerCx: Math.round(centerCx * 10) / 10,
                centerCy: Math.round(centerCy * 10) / 10
            }
        };
    };

    const removeConstellationHint = () => {
        if (constellationGuidePath) {
            const path = constellationGuidePath;
            constellationGuidePath = null;
            path.style.opacity = '0';
            setTimeout(() => { if (path && path.parentNode) path.remove(); }, 1000);
        }
        if (constellationHintTimeout) {
            clearTimeout(constellationHintTimeout);
            constellationHintTimeout = null;
        }
    };

    const triggerDecoyStarClick = (decoyEl, l, t, options = {}) => {
        if (!decoyEl || decoyEl.dataset.dissolved) return;
        decoyEl.dataset.dissolved = 'true';

        const silent = options.silent === true;
        if (!silent && typeof window.playDecoyMistSFX === 'function') {
            window.playDecoyMistSFX({ volume: 1.0 });
        } else if (silent && typeof window.playDecoyMistSFX === 'function') {
            window.playDecoyMistSFX({ volume: 0.45, pitch: 1567.98 });
        }

        decoyEl.classList.add('dissolving');
        decoyEl.classList.add('wrong');

        const container = document.getElementById('constellation-game');
        if (container) {
            // Ethereal starlight mist smoke puff
            const smoke = document.createElement('div');
            smoke.className = 'decoy-smoke-puff';
            smoke.style.left = l.toFixed(1) + '%';
            smoke.style.top = t.toFixed(1) + '%';
            container.appendChild(smoke);
            setTimeout(() => { if (smoke.parentNode) smoke.parentNode.removeChild(smoke); }, 820);

            // Starlight sparkle embers drifting outwards
            const emberCount = 5;
            for (let i = 0; i < emberCount; i++) {
                const angle = (i * (2 * Math.PI / emberCount)) + (Math.random() * 0.4 - 0.2);
                const dist = 28 + Math.random() * 32;
                const dx = Math.cos(angle) * dist;
                const dy = Math.sin(angle) * dist;

                const ember = document.createElement('div');
                ember.className = 'decoy-sparkle-ember';
                ember.style.left = l.toFixed(1) + '%';
                ember.style.top = t.toFixed(1) + '%';
                ember.style.setProperty('--ember-dx', `${dx.toFixed(1)}px`);
                ember.style.setProperty('--ember-dy', `${dy.toFixed(1)}px`);
                container.appendChild(ember);
                setTimeout(() => { if (ember.parentNode) ember.parentNode.removeChild(ember); }, 760);
            }
        }

        setTimeout(() => {
            if (decoyEl.parentNode) decoyEl.parentNode.removeChild(decoyEl);
        }, 420);

        activeDecoyElements = activeDecoyElements.filter(d => d !== decoyEl);

        if (!silent) {
            const msg = document.getElementById('garden-message');
            if (msg) msg.textContent = `✨ Ngôi sao ảo vừa tan thành bụi sáng! Hãy tiếp tục nối các vì sao thật từ 1 đến ${starCoords.length} nghen!`;
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Suýt bị sao ảo đánh lừa rồi nè, may mà bạn tinh ý ghê á! ✨", 2800);
            }
        }
    };

    const cleanupConstellationDecoys = () => {
        activeDecoyElements.forEach(d => {
            if (d && d.parentNode) {
                d.dataset.dissolved = 'true';
                d.remove();
            }
        });
        activeDecoyElements = [];
        document.querySelectorAll('.decoy-star, .decoy-smoke-puff, .decoy-sparkle-ember').forEach(el => el.remove());
    };

    const highlightNextTargetStar = () => {
        const nextIdx = constellationInput.length;
        document.querySelectorAll('.star-node').forEach((node, idx) => {
            if (idx === nextIdx) {
                node.classList.add('next-target');
            } else {
                node.classList.remove('next-target');
            }
        });
    };

    const showConstellationHint = () => {
        const linesGroup = document.getElementById('constellation-lines-group');
        if (!linesGroup || starCoords.length < 5) return;

        removeConstellationHint();

        const guidePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = (activeConstellationTopology && activeConstellationTopology.svgGuideD)
            ? activeConstellationTopology.svgGuideD
            : starCoords.reduce((acc, s, i) => acc + (i === 0 ? `M ${s.cx} ${s.cy} ` : `L ${s.cx} ${s.cy} `), '');

        guidePath.setAttribute('d', d);
        guidePath.setAttribute('class', 'constellation-line');
        guidePath.style.opacity = '0.45';
        guidePath.style.strokeDasharray = '6 6';
        guidePath.style.transition = 'opacity 1s ease';
        linesGroup.appendChild(guidePath);
        constellationGuidePath = guidePath;

        constellationHintTimeout = setTimeout(() => {
            removeConstellationHint();
        }, 7500);
    };

    const drawConstellationSegment = (idx1, idx2) => {
        const linesGroup = document.getElementById('constellation-lines-group');
        if (!linesGroup || !starCoords[idx1] || !starCoords[idx2]) return;

        const p1 = starCoords[idx1];
        const p2 = starCoords[idx2];

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', p1.cx);
        line.setAttribute('y1', p1.cy);
        line.setAttribute('x2', p2.cx);
        line.setAttribute('y2', p2.cy);
        line.setAttribute('class', 'constellation-line');
        linesGroup.appendChild(line);
    };

    const updatePreviewLine = (clientX, clientY) => {
        const previewLine = document.getElementById('constellation-preview-line');
        if (!previewLine || activeStarIndex === null || !starCoords[activeStarIndex]) return;

        const wrap = document.getElementById('wrap');
        if (!wrap) return;

        const wrapRect = wrap.getBoundingClientRect();
        const scaleX = 1100 / wrapRect.width;
        const scaleY = 680 / wrapRect.height;
        const curX = (clientX - wrapRect.left) * scaleX;
        const curY = (clientY - wrapRect.top) * scaleY;

        const startStar = starCoords[activeStarIndex];
        previewLine.setAttribute('x1', startStar.cx);
        previewLine.setAttribute('y1', startStar.cy);
        previewLine.setAttribute('x2', curX);
        previewLine.setAttribute('y2', curY);
        previewLine.style.display = 'block';
    };

    const checkStarProximity = (clientX, clientY) => {
        const state = window.gardenState || {};
        if (!isDraggingConstellation || state.currentStage !== 2 || constellationInput.length === 0) return;

        updatePreviewLine(clientX, clientY);

        const nextExpectedIdx = constellationInput.length;
        if (nextExpectedIdx >= starCoords.length) return;

        const targetStar = starCoords[nextExpectedIdx];
        if (!targetStar || !targetStar.el) return;

        const rect = targetStar.el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const curScale = window.currentWrapScale || 1;
        const proximityRadius = Math.max(28, Math.min(72, 68 * curScale));
        const dist = Math.hypot(centerX - clientX, centerY - clientY);

        if (dist < proximityRadius) {
            connectStar(nextExpectedIdx);
        }
    };

    const connectStar = (index) => {
        if (constellationInput.includes(index)) return;
        removeConstellationHint();

        constellationInput.push(index);
        activeStarIndex = index;
        const star = starCoords[index];
        if (star && star.el) {
            star.el.classList.add('active');
            star.el.classList.remove('next-target');
        }

        if (typeof window.playSimonSFX !== 'undefined') {
            window.playSimonSFX(index % 4);
        } else if (typeof window.playKeyTapSFX !== 'undefined') {
            window.playKeyTapSFX();
        }

        if (constellationInput.length > 1) {
            const prevIdx = constellationInput[constellationInput.length - 2];
            drawConstellationSegment(prevIdx, index);
        }

        highlightNextTargetStar();

        if (constellationInput.length === starCoords.length) {
            isDraggingConstellation = false;
            activeStarIndex = null;
            const previewLine = document.getElementById('constellation-preview-line');
            if (previewLine) previewLine.style.display = 'none';

            // Clean up any remaining decoy stars with soft mist dissolve
            const remainingDecoys = [...activeDecoyElements];
            remainingDecoys.forEach((d, idx) => {
                if (d && !d.dataset.dissolved) {
                    setTimeout(() => {
                        const l = parseFloat(d.style.left) || 50;
                        const t = parseFloat(d.style.top) || 30;
                        triggerDecoyStarClick(d, l, t, { silent: idx > 0 });
                    }, idx * 90);
                }
            });
            activeDecoyElements = [];

            const constName = activeConstellationName ? activeConstellationName.latinName : 'Định Mệnh';
            const constSub = activeConstellationName ? ` (${activeConstellationName.subtitle})` : '';
            const msg = document.getElementById('garden-message');
            if (msg) msg.textContent = `Bầu trời rực sáng! Chòm sao ${constName}${constSub} đã nối liền ước nguyện 🌟✨`;
            if (typeof window.playChimeSFX !== 'undefined') window.playChimeSFX();

            const badge = document.getElementById('constellation-name-badge');
            if (badge) {
                badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                badge.style.opacity = '0';
                badge.style.transform = 'translateX(-50%) translateY(-10px) scale(0.95)';
            }

            setTimeout(() => {
                const gameContainer = document.getElementById('constellation-game');
                if (gameContainer) gameContainer.classList.add('hidden');
                if (typeof window.advanceStage === 'function') window.advanceStage(2);
            }, 1200);
        }
    };

    const onStarPointerDown = (index, e) => {
        const state = window.gardenState || {};
        if (state.currentStage !== 2) return;

        if (index === 0 && constellationInput.length === 0) {
            isDraggingConstellation = true;
            activeStarIndex = 0;
            connectStar(0);
            updatePreviewLine(e.clientX, e.clientY);
        } else if (index === constellationInput.length) {
            isDraggingConstellation = true;
            activeStarIndex = index;
            connectStar(index);
            updatePreviewLine(e.clientX, e.clientY);
        } else if (constellationInput.length > 0 && index === constellationInput[constellationInput.length - 1]) {
            isDraggingConstellation = true;
            activeStarIndex = index;
            updatePreviewLine(e.clientX, e.clientY);
        } else if (!constellationInput.includes(index)) {
            const star = starCoords[index]?.el;
            if (star) {
                star.classList.add('wrong');
                setTimeout(() => star.classList.remove('wrong'), 400);
            }
            const msg = document.getElementById('garden-message');
            if (msg) msg.textContent = `Hãy nối theo thứ tự từ ngôi sao 1 đến ${starCoords.length} nhé!`;
        }
    };

    const startConstellationGame = () => {
        const container = document.getElementById('constellation-game');
        if (!container) return;
        container.classList.remove('hidden');
        container.style.display = 'block';
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';

        document.body.classList.remove('stage-1-active', 'stage-2-active', 'stage-4-active');
        document.body.classList.add('stage-3-active');
        const hintEl = document.getElementById('terrarium-gesture-hint');
        if (hintEl) hintEl.style.display = 'none';
        const instructionEl = document.querySelector('.garden-ui .instruction');
        if (instructionEl) instructionEl.style.display = 'none';

        constellationInput = [];
        isDraggingConstellation = false;
        activeStarIndex = null;
        activeDecoyElements = [];

        removeConstellationHint();
        container.querySelectorAll('.star-node').forEach(n => n.remove());
        const linesGroup = document.getElementById('constellation-lines-group');
        if (linesGroup) linesGroup.innerHTML = '';
        const previewLine = document.getElementById('constellation-preview-line');
        if (previewLine) previewLine.style.display = 'none';

        // Sub-phase 5.1: Dynamic Poisson-disk star field generation (5 stars + 2 decoys)
        const starField = generatePoissonStarField({
            starCount: 5,
            decoyCount: 2,
            minDistance: 92
        });

        // Sub-phase 5.2: Dynamic Topology Path & Procedural Nomenclature
        activeConstellationTopology = computeConstellationTopology(starField.stars);
        activeConstellationName = generateConstellationName();

        // Update Atelier Constellation Badge
        const badge = document.getElementById('constellation-name-badge');
        const latinEl = document.getElementById('constellation-latin-name');
        const subEl = document.getElementById('constellation-subtitle');
        if (badge) {
            if (latinEl) latinEl.textContent = `✦ ${activeConstellationName.latinName} ✦`;
            if (subEl) subEl.textContent = activeConstellationName.subtitle;
            badge.style.display = 'flex';
            badge.style.opacity = '1';
            badge.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        }

        let lastStarTap = 0;
        starCoords = starField.stars.map((pos, idx) => {
            const el = document.createElement('div');
            el.className = 'star-node';
            el.setAttribute('data-index', idx);
            el.style.left = pos.l.toFixed(1) + '%';
            el.style.top = pos.t.toFixed(1) + '%';
            el.innerHTML = `<span>${idx + 1}</span>`;

            const onPointerStart = (e) => {
                const now = Date.now();
                if (now - lastStarTap < 160) return;
                lastStarTap = now;
                e.preventDefault();
                e.stopPropagation();
                onStarPointerDown(idx, e);
            };

            el.addEventListener('pointerdown', onPointerStart);
            el.addEventListener('click', onPointerStart);
            container.appendChild(el);

            return { cx: pos.cx, cy: pos.cy, l: pos.l, t: pos.t, el };
        });

        starField.decoys.forEach((decoyPos) => {
            const decoyEl = document.createElement('div');
            decoyEl.className = 'star-node decoy-star';
            decoyEl.style.left = decoyPos.l.toFixed(1) + '%';
            decoyEl.style.top = decoyPos.t.toFixed(1) + '%';
            decoyEl.innerHTML = `<span>✧</span>`;
            decoyEl.setAttribute('title', 'Ngôi sao lấp lánh bí ẩn');

            const onDecoyTap = (e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerDecoyStarClick(decoyEl, decoyPos.l, decoyPos.t);
            };

            decoyEl.addEventListener('pointerdown', onDecoyTap);
            decoyEl.addEventListener('click', onDecoyTap);
            container.appendChild(decoyEl);
            activeDecoyElements.push(decoyEl);
        });

        const msg = document.getElementById('garden-message');
        if (msg) msg.textContent = `✨ Chòm sao ${activeConstellationName.latinName}: Hãy nối ${starCoords.length} ngôi sao (${activeConstellationName.subtitle}) nhé!`;
        highlightNextTargetStar();
        showConstellationHint();
    };

    window.addEventListener('pointermove', (e) => {
        if (!isDraggingConstellation) return;
        checkStarProximity(e.clientX, e.clientY);
    });

    const endConstellationDrag = () => {
        isDraggingConstellation = false;
        const previewLine = document.getElementById('constellation-preview-line');
        if (previewLine) previewLine.style.display = 'none';
    };

    window.addEventListener('pointerup', endConstellationDrag);
    window.addEventListener('pointercancel', endConstellationDrag);

    // Public API
    window.startSimonGame = startSimonGame;
    window.stopSimonGame = stopSimonGame;
    window.isSimonPlaying = () => simonPlaying;
    window.playSimonSequence = playSimonSequence;
    window.startConstellationGame = startConstellationGame;
    window.connectStar = connectStar;
    window.removeConstellationHint = removeConstellationHint;
    window.generatePoissonStarField = generatePoissonStarField;
    window.validatePoissonStarField = validatePoissonStarField;
    window.generateConstellationName = generateConstellationName;
    window.computeConstellationTopology = computeConstellationTopology;
    window.triggerDecoyStarClick = triggerDecoyStarClick;
    window.cleanupConstellationDecoys = cleanupConstellationDecoys;
    window.getActiveDecoyElements = () => activeDecoyElements;
    window.getActiveConstellationTopology = () => activeConstellationTopology;
    window.getActiveConstellationName = () => activeConstellationName;
    try {
        Object.defineProperty(window, 'activeConstellationTopology', {
            get: () => activeConstellationTopology,
            configurable: true
        });
        Object.defineProperty(window, 'activeConstellationName', {
            get: () => activeConstellationName,
            configurable: true
        });
    } catch (_) {}
})();
