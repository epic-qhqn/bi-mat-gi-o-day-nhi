/**
 * ENVIRONMENT & COUNTRYSIDE LIVING ATMOSPHERE CONTROLLER
 * Manages 4-phase day/night sky cycle, fireflies, god rays,
 * procedural Vietnamese countryside wildflowers & lotuses (#co-hoa),
 * and 3D floating autumn leaves & lotus petals canvas (#laCanvas).
 */

window.stages = [
    { sky: 'sky-dawn', celestial: 'sun-dawn', fireflies: false, petals: false },
    { sky: 'sky-day', celestial: 'sun', fireflies: false, petals: true },
    { sky: 'sky-dusk', celestial: 'sun-dusk', fireflies: false, petals: false },
    { sky: 'sky-night', celestial: 'moon', fireflies: true, petals: false }
];

window.currentEnvStageIndex = Math.floor(Math.random() * window.stages.length);
window.petalInterval = null;

window.createPetal = () => {
    const container = document.getElementById('particles-container');
    const maxPetals = window.isLowEndDevice ? 8 : 18;
    if (!container || container.childElementCount >= maxPetals || document.hidden) return;
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-20px';
    
    const duration = 5000 + Math.random() * 5000;
    const tx = (Math.random() - 0.5) * 200;
    
    container.appendChild(petal);
    
    petal.animate([
        { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
        { opacity: 0.8, offset: 0.1 },
        { transform: `translate(${tx}px, 110vh) rotate(${720 + Math.random()*360}deg) scale(${0.5 + Math.random()*0.5})`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear',
        fill: 'forwards'
    });
    
    setTimeout(() => petal.remove(), duration);
};

window.setTimeOfDay = (index) => {
    const stage = window.stages[index];
    const celestial = document.getElementById('celestial-body');
    const fireflies = document.getElementById('fireflies-container');
    
    document.body.classList.remove('sky-dawn', 'sky-day', 'sky-dusk', 'sky-night');
    if (celestial) celestial.classList.remove('sun', 'sun-dawn', 'sun-dusk', 'moon');
    
    document.body.classList.add(stage.sky);
    if (celestial) celestial.classList.add(stage.celestial);
    
    if (fireflies) {
        if (stage.fireflies) {
            fireflies.style.display = 'block';
            setTimeout(() => fireflies.style.opacity = '1', 50);
        } else {
            fireflies.style.opacity = '0';
            setTimeout(() => {
                if (window.stages[window.currentEnvStageIndex] && !window.stages[window.currentEnvStageIndex].fireflies) {
                    fireflies.style.display = 'none';
                }
            }, 2000);
        }
    }

    if (stage.sky === 'sky-dawn') {
        if (typeof window.startDawnAmbience !== 'undefined') window.startDawnAmbience();
    } else {
        if (typeof window.stopDawnAmbience !== 'undefined') window.stopDawnAmbience();
    }

    if (stage.sky === 'sky-dusk') {
        if (typeof window.startDuskAmbience !== 'undefined') window.startDuskAmbience();
    } else {
        if (typeof window.stopDuskAmbience !== 'undefined') window.stopDuskAmbience();
    }

    if (stage.petals) {
        if (!window.petalInterval) window.petalInterval = setInterval(window.createPetal, 400);
    } else {
        if (window.petalInterval) {
            clearInterval(window.petalInterval);
            window.petalInterval = null;
        }
    }
};

window.lockEnvironmentToNight = () => {
    if (window.envIntervalId) {
        clearInterval(window.envIntervalId);
        window.envIntervalId = null;
    }
    const nightIndex = window.stages.findIndex(s => s.sky === 'sky-night');
    window.setTimeOfDay(nightIndex >= 0 ? nightIndex : 3);
    document.body.classList.add('aurora-active');
};

window.startEnvironmentCycle = () => {
    window.setTimeOfDay(window.currentEnvStageIndex);
    window.envIntervalId = setInterval(() => {
        window.currentEnvStageIndex = (window.currentEnvStageIndex + 1) % window.stages.length;
        window.setTimeOfDay(window.currentEnvStageIndex);
    }, 25000);
};

/* ==========================================================================
   VIETNAMESE COUNTRYSIDE WILDFLOWERS & LOTUSES PROCEDURAL SVG ENGINE (#co-hoa)
   ========================================================================== */
(function() {
    'use strict';

    const SVGNS = 'http://www.w3.org/2000/svg';
    const rnd = (a, b) => a + Math.random() * (b - a);
    const chon = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const MAU_XANH = ['#5cf0a0', '#8be04e', '#2fd4b4', '#6A8D73', '#8EA885', '#4fd8f0'];
    const MAU_HOA = ['#D47A88', '#F2C4CE', '#FF8FD0', '#DEB853', '#FFFFFF', '#FFB6C1'];
    const MAU_TAM = ['#FFFFFF', '#DEB853', '#F5CE56'];
    let currentStrokeColor = '#FFFFFF';
    let lastBox = { w: 0, h: 0 };   // size the meadow was last drawn for

    function el(tag, attrs, parent) {
        const e = document.createElementNS(SVGNS, tag);
        for (const k in attrs) {
            e.setAttribute(k, attrs[k]);
        }
        if (parent) parent.appendChild(e);
        return e;
    }

    function net(parent, d, delay) {
        const p = el('path', {
            d: d,
            class: 'net',
            pathLength: '1'
        }, parent);
        p.style.setProperty('--d', delay.toFixed(2) + 's');
        p.style.setProperty('--mau', currentStrokeColor);
        return p;
    }

    function nhomLac(parent, ox, oy, amp, t, dl) {
        const g = el('g', { class: 'lac' }, parent);
        g.style.transformOrigin = ox + 'px ' + oy + 'px';
        g.style.setProperty('--a', amp.toFixed(2) + 'deg');
        g.style.animationDuration = t + 's';
        g.style.animationDelay = dl.toFixed(2) + 's';
        return g;
    }

    function qp(p0, p1, p2, t) {
        const u = 1 - t;
        return {
            x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
            y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
            ang: Math.atan2(2 * u * (p1.y - p0.y) + 2 * t * (p2.y - p1.y), 2 * u * (p1.x - p0.x) + 2 * t * (p2.x - p1.x)) * 180 / Math.PI
        };
    }

    function vongTron(parent, cx, cy, r, delay) {
        return net(parent, `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`, delay);
    }

    function chiLa(parent, x, y, goc, dai, rong, delay) {
        const g = el('g', { transform: `translate(${x} ${y}) rotate(${goc})` }, parent);
        net(g, `M 0 0 Q ${dai * 0.5} ${-rong} ${dai} 0 Q ${dai * 0.5} ${rong} 0 0`, delay);
        net(g, `M 0 0 L ${dai * 0.88} 0`, delay + 0.15);
        for (let k = 1; k <= 3; k++) {
            const px = dai * (0.15 + k * 0.2);
            const dy = rong * 0.55 * (1 - k * 0.2);
            net(g, `M ${px} 0 L ${px + dai * 0.1} ${-dy} M ${px} 0 L ${px + dai * 0.1} ${dy}`, delay + 0.2);
        }
    }

    function hoaCuc(parent, cx, cy, R, delay, mauCanh, mauTam) {
        const g = el('g', { transform: `translate(${cx} ${cy}) rotate(${rnd(-25, 25)})` }, parent);
        const n = Math.round(rnd(8, 12));
        const r0 = R * 0.26;
        const pw = R * 0.24;
        currentStrokeColor = mauCanh;
        for (let i = 0; i < n; i++) {
            const pg = el('g', { transform: `rotate(${i * 360 / n})` }, g);
            net(pg, `M ${r0} 0 Q ${(r0 + R) / 2} ${-pw} ${R} 0 Q ${(r0 + R) / 2} ${pw} ${r0} 0`, delay + i * 0.03);
        }
        currentStrokeColor = mauTam;
        vongTron(g, 0, 0, r0, delay + 0.1);
        vongTron(g, 0, 0, r0 * 0.45, delay + 0.2);
    }

    // Đóa hoa sen nở rộ với các cánh cung thanh khiết
    function hoaSen(parent, cx, cy, R, delay, mauCanh) {
        const g = el('g', { transform: `translate(${cx} ${cy}) rotate(${rnd(-12, 12)})` }, parent);
        const lop = [
            { n: 7, len: R, sp: 150 },
            { n: 5, len: R * 0.72, sp: 110 }
        ];
        lop.forEach((L, li) => {
            currentStrokeColor = li === 0 ? mauCanh : '#FFFFFF';
            for (let i = 0; i < L.n; i++) {
                const a = -90 + (i / (L.n - 1) - 0.5) * L.sp;
                const pg = el('g', { transform: `rotate(${a})` }, g);
                net(pg, `M 0 0 Q ${L.len * 0.4} ${-L.len * 0.4} ${L.len} 0 Q ${L.len * 0.4} ${L.len * 0.4} 0 0`, delay + li * 0.2 + i * 0.04);
            }
        });
        currentStrokeColor = '#DEB853';
        vongTron(g, 0, -R * 0.2, R * 0.15, delay + 0.3);
    }

    function hoaNam(parent, cx, cy, R, delay, mauCanh, mauTam) {
        const g = el('g', { transform: `translate(${cx} ${cy}) rotate(${rnd(0, 72)})` }, parent);
        currentStrokeColor = mauCanh;
        for (let i = 0; i < 5; i++) {
            const pg = el('g', { transform: `rotate(${i * 72})` }, g);
            net(pg, `M 0 0 C ${R * 0.2} ${-R * 0.55} ${R * 0.8} ${-R * 0.55} ${R * 0.85} 0 C ${R * 0.8} ${R * 0.55} ${R * 0.2} ${R * 0.55} 0 0`, delay + i * 0.05);
        }
        currentStrokeColor = mauTam;
        vongTron(g, 0, 0, R * 0.16, delay + 0.2);
    }

    function cayHoa(parent, x, goc, h, kieu, delay, W) {
        const bend = rnd(-0.2, 0.08) * h;
        const p0 = { x: x, y: goc };
        const p1 = { x: x + bend * 1.6, y: goc - h * 0.55 };
        const p2 = { x: x + bend, y: goc - h };

        const g = nhomLac(parent, x, goc, rnd(1.2, 2.6), 3.4, -(x / W) * 3 - rnd(0, 0.4));
        currentStrokeColor = chon(MAU_XANH);
        net(g, `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`, delay);

        [0.28, 0.48, 0.66].forEach((t, i) => {
            const q = qp(p0, p1, p2, t);
            const dai = Math.max(16, Math.min(46, h * 0.17));
            currentStrokeColor = chon(MAU_XANH);
            chiLa(g, q.x, q.y, q.ang + (i % 2 ? 1 : -1) * rnd(35, 55), dai, dai * 0.3, delay + 0.3 + i * 0.15);
        });

        const R = Math.max(12, Math.min(26, h * 0.09));
        const mc = chon(MAU_HOA);
        const mt = chon(MAU_TAM);

        if (kieu === 0) hoaCuc(g, p2.x, p2.y, R, delay + 0.8, mc, mt);
        else if (kieu === 1) hoaSen(g, p2.x, p2.y, R * 1.35, delay + 0.8, mc);
        else hoaNam(g, p2.x, p2.y, R, delay + 0.8, mc, mt);
    }

    function canhLa(parent, x, goc, dx, dy, soLa, delay, W) {
        const p0 = { x: x, y: goc };
        const p1 = { x: x + dx * 0.1, y: goc - dy * 0.65 };
        const p2 = { x: x + dx, y: goc - dy };

        const g = nhomLac(parent, x, goc, rnd(1, 1.8), 4.2, -(x / W) * 3);
        currentStrokeColor = '#8EA885';
        net(g, `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`, delay);

        for (let i = 0; i < soLa; i++) {
            const t = 0.2 + 0.75 * i / (soLa - 1);
            const q = qp(p0, p1, p2, t);
            const dai = 46 - 24 * t;
            currentStrokeColor = chon(MAU_XANH);
            chiLa(g, q.x, q.y, q.ang + (i % 2 ? 1 : -1) * rnd(38, 55), dai, dai * 0.3, delay + 0.3 + i * 0.12);
        }
        const qe = qp(p0, p1, p2, 1);
        currentStrokeColor = chon(MAU_XANH);
        chiLa(g, qe.x, qe.y, qe.ang, 24, 7, delay + 1.6);
        hoaNam(g, p2.x + 4, p2.y - 8, 12, delay + 1.8, chon(MAU_HOA), '#FFFFFF');
    }

    // Calm, rice-field greens for the filled under-layer (design-system tokens, no neon)
    const MAU_NEN = ['#6A8D73', '#8EA885', '#5E8A6B', '#7FA58A'];

    // One blade as a closed quadratic outline; `base` sits just below the frame so roots never show.
    function ngonCo(x, base, h, w) {
        const lean = rnd(-0.3, 0.08) * h;
        return `M ${x - w} ${base} Q ${x - w + lean * .35} ${base - h * .55} ${x + lean} ${base - h} Q ${x + w + lean * .35} ${base - h * .5} ${x + w} ${base}`;
    }

    // Gom hàng trăm ngọn cỏ vào vài path (một path mỗi màu) để mượt mà 60fps
    function veLopCo(parent, { W, base, hMax, hMin, step, halfW, cls, palette, fillMode, phase }) {
        const groups = new Map(palette.map(m => [m, []]));
        for (let x = -10; x < W + 10; x += rnd(step[0], step[1])) {
            const wave = 0.65 + 0.35 * Math.sin(x / 85 + phase);
            const h = hMin + (hMax - hMin) * rnd(0.35, 1) * wave;
            groups.get(chon(palette)).push(ngonCo(x, base, h, rnd(halfW[0], halfW[1])));
        }
        groups.forEach((paths, mau) => {
            if (!paths.length) return;
            const p = el('path', { class: cls, d: paths.join(' '), stroke: mau }, parent);
            if (fillMode) p.style.setProperty('--mau', mau);   // consumed by `.co-nen { fill: var(--mau) }`
        });
    }

    // Soft turf bed: a gradient that is fully opaque on the bottom edge, so no sky can show
    // through between blades along the lower margin (even before the blades finish drawing in).
    function veNenCo(parent, W, Hh) {
        const defs = el('defs', {}, parent);
        const grad = el('linearGradient', { id: 'co-nen-grad', x1: '0', y1: '0', x2: '0', y2: '1' }, defs);
        el('stop', { offset: '0', 'stop-color': '#6A8D73', 'stop-opacity': '0' }, grad);
        el('stop', { offset: '1', 'stop-color': '#6A8D73', 'stop-opacity': '0.92' }, grad);
        const top = Hh * 0.66;
        el('rect', { x: -20, y: top, width: W + 40, height: Hh - top + 12, fill: 'url(#co-nen-grad)', class: 'co-nen-bed' }, parent);
    }

    window.initCountrysideWildflowers = function() {
        const coHoa = document.getElementById('co-hoa');
        if (!coHoa) return;

        // The CSS box (see #co-hoa in layout.css) is the single source of truth for the coordinate
        // system. Deriving it from window.innerHeight instead produced a viewBox with a different
        // aspect ratio than the box, which `meet` letterboxed into a 70%-wide strip with bare corners.
        const box = coHoa.getBoundingClientRect();
        const W = Math.max(1, Math.round(box.width || window.innerWidth));
        const Hh = Math.max(1, Math.round(box.height || 160));
        const mobile = W <= 768;

        coHoa.setAttribute('overflow', 'visible');
        coHoa.style.overflow = 'visible';
        coHoa.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
        coHoa.setAttribute('preserveAspectRatio', 'none');   // stretch to fill, never letterbox
        coHoa.removeAttribute('width');                      // size comes from CSS only
        coHoa.removeAttribute('height');
        coHoa.replaceChildren();
        coHoa.classList.add('hien-thi');
        lastBox = { w: W, h: Hh };

        const base = Hh + 6;
        const ph = rnd(0, 6);

        veNenCo(coHoa, W, Hh);

        // Back row: short, filled, heavily overlapping blades => continuous cover along the bottom margin
        veLopCo(coHoa, {
            W, base, phase: ph, cls: 'co-ngan co-nen', palette: MAU_NEN, fillMode: true,
            hMin: Hh * 0.12, hMax: Hh * 0.36,
            step: mobile ? [1.8, 3.0] : [1.4, 2.4], halfW: [2.0, 4.2]
        });

        // Front row: the original tall line-art blades, now ~2x denser
        veLopCo(coHoa, {
            W, base, phase: ph, cls: 'co-ngan', palette: MAU_XANH, fillMode: false,
            hMin: Hh * 0.22, hMax: Hh * 0.64,
            step: mobile ? [3.0, 5.0] : [2.4, 4.0], halfW: [2.2, 5.2]
        });

        // Cành lá bên tả bên hữu
        canhLa(coHoa, W * 0.03, base, W * (mobile ? 0.22 : 0.14), Hh * 0.92, mobile ? 5 : 7, 0.5, W);
        canhLa(coHoa, W * 0.78, base, W * (mobile ? -0.18 : -0.12), Hh * 0.88, mobile ? 5 : 7, 0.8, W);
        if (!mobile) {
            canhLa(coHoa, W * 0.38, base, W * 0.09, Hh * 0.78, 6, 1.1, W);
        }

        // Cụm hoa sen và hoa cúc đồng nội
        const soHoa = Math.max(5, Math.min(14, Math.round(W / 160)));   // keeps spacing even on wide screens
        const stepWidth = W / (soHoa + 1);
        for (let i = 0; i < soHoa; i++) {
            const x = stepWidth * (i + 1) + rnd(-15, 15);
            cayHoa(coHoa, x, base, Hh * rnd(0.65, 0.98), i % 3, 0.6 + (x / W) * 1.4, W);
        }

        setTimeout(() => {
            coHoa.classList.add('xong');
        }, 3600);
    };

    // Redraw only when the real box changed meaningfully. Small height jitter (mobile URL bar) is
    // absorbed by preserveAspectRatio="none", so it never opens a gap and never re-randomises the meadow.
    let resizeWildflowersTimer = null;
    const onMeadowBoxChange = () => {
        clearTimeout(resizeWildflowersTimer);
        resizeWildflowersTimer = setTimeout(() => {
            const coHoa = document.getElementById('co-hoa');
            if (!coHoa) return;
            const box = coHoa.getBoundingClientRect();
            if (Math.abs(box.width - lastBox.w) > 24 || Math.abs(box.height - lastBox.h) > 24) {
                window.initCountrysideWildflowers();
            }
        }, 200);
    };

    const meadowEl = document.getElementById('co-hoa');
    if (meadowEl && typeof ResizeObserver === 'function') {
        new ResizeObserver(onMeadowBoxChange).observe(meadowEl);
    } else {
        window.addEventListener('resize', onMeadowBoxChange, { passive: true });
    }
})();

/* ==========================================================================
   3D FLOATING AUTUMN LEAVES & LOTUS PETALS CANVAS ENGINE (#laCanvas)
   ========================================================================== */
(function() {
    'use strict';

    let canvas = null;
    let ctx = null;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let particles = [];
    let isRunning = false;
    let animFrameId = null;
    let lastFrameTime = 0;

    function taoLa(color) {
        const c = document.createElement('canvas');
        c.width = 44;
        c.height = 44;
        const x = c.getContext('2d');
        x.fillStyle = color;
        x.beginPath();
        x.moveTo(22, 4);
        x.bezierCurveTo(38, 12, 38, 32, 22, 40);
        x.bezierCurveTo(6, 32, 6, 12, 22, 4);
        x.fill();
        x.strokeStyle = 'rgba(74, 53, 40, 0.3)';
        x.lineWidth = 1;
        x.beginPath();
        x.moveTo(22, 6);
        x.lineTo(22, 38);
        x.stroke();
        return c;
    }

    function taoCanhSen(color, glow) {
        const c = document.createElement('canvas');
        c.width = 44;
        c.height = 44;
        const x = c.getContext('2d');
        x.shadowBlur = 4;
        x.shadowColor = glow || 'rgba(212, 122, 136, 0.6)';
        x.fillStyle = color || 'rgba(242, 196, 206, 0.95)';
        x.beginPath();
        x.moveTo(22, 22);
        x.bezierCurveTo(34, 10, 34, 34, 22, 42);
        x.bezierCurveTo(10, 34, 10, 10, 22, 22);
        x.fill();
        return c;
    }

    let sprites = [];

    function initSprites() {
        if (sprites.length > 0) return;
        sprites = [
            taoLa('#DEB853'),
            taoLa('#E6C66E'),
            taoLa('#C2A045'),
            taoLa('#8EA885'),
            taoCanhSen('#D47A88', 'rgba(212, 122, 136, 0.6)'),
            taoCanhSen('#F2C4CE', 'rgba(242, 196, 206, 0.5)'),
            taoCanhSen('#FFFFFF', 'rgba(255, 255, 255, 0.7)')
        ];
    }

    function resetParticle(p, respawn) {
        p.sprite = sprites[Math.floor(Math.random() * sprites.length)];
        p.size = Math.random() * 0.4 + 0.4;
        p.vy = Math.random() * 0.75 + 0.45;
        p.vx = -(Math.random() * 1.5 + 0.8);
        p.driftX = Math.random() * 0.8 + 0.6;
        p.driftY = Math.random() * 0.3 + 0.1;
        p.rotation = Math.random() * Math.PI * 2;
        p.rotSpeed = Math.random() * 0.03 - 0.015;
        p.flip = Math.random() * Math.PI * 2;
        p.flipSpeed = Math.random() * 0.04 + 0.02;
        p.sway = Math.random() * Math.PI * 2;
        p.alpha = Math.random() * 0.35 + 0.6;

        if (!respawn) {
            p.x = Math.random() * (w + 60);
            p.y = Math.random() * h;
        } else {
            // Particles drift left-and-down, so they enter through the top and right edges. For an even
            // spread over the whole canvas, each edge must feed particles in proportion to its flux
            // (width * vy for the top, height * |vx| for the right). A fixed 70/30 right/top split piled
            // leaves up on the right and left the left side thin (~12% vs ~22% per screen-sixth).
            const fluxTop = w * p.vy;
            const fluxSide = h * Math.abs(p.vx);
            if (Math.random() < fluxTop / (fluxTop + fluxSide)) {
                p.x = Math.random() * (w + 80);
                p.y = -40 - Math.random() * 60;
            } else {
                p.x = w + 40 + Math.random() * 100;
                p.y = Math.random() * h;
            }
        }
    }

    function resizeCanvas() {
        if (!canvas || !ctx) return;
        w = window.innerWidth;
        h = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function renderLoop(time) {
        if (!isRunning || !ctx) return;

        if (document.hidden) {
            lastFrameTime = time;
            animFrameId = requestAnimationFrame(renderLoop);
            return;
        }

        const delta = lastFrameTime ? Math.min(2.5, (time - lastFrameTime) / 16.67) : 1;
        lastFrameTime = time;

        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.sway += 0.024 * delta;
            p.y += (p.vy + Math.sin(p.sway * 0.85) * p.driftY) * delta;
            p.x += (p.vx + Math.sin(p.sway) * p.driftX) * delta;
            p.rotation += p.rotSpeed * delta;
            p.flip += p.flipSpeed * delta;

            if (p.y > h + 50 || p.x < -60) {
                resetParticle(p, true);
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            // Hiệu ứng lật 3D mô phỏng cánh hoa/chiếc lá chao đảo trong gió
            const flipScale = 0.25 + 0.75 * Math.abs(Math.cos(p.flip));
            ctx.scale(p.size * flipScale, p.size);
            ctx.globalAlpha = p.alpha;
            ctx.drawImage(p.sprite, -p.sprite.width / 2, -p.sprite.height / 2);
            ctx.restore();
        }

        animFrameId = requestAnimationFrame(renderLoop);
    }

    window.initFallingLeavesCanvas = function() {
        canvas = document.getElementById('laCanvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        if (!ctx) return;

        initSprites();
        resizeCanvas();

        const count = window.isLowEndDevice ? 14 : (window.innerWidth <= 768 ? 20 : 36);
        particles = [];
        for (let i = 0; i < count; i++) {
            const p = {};
            resetParticle(p, false);
            particles.push(p);
        }

        isRunning = true;
        canvas.classList.add('hien-thi');
        if (animFrameId) cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('resize', () => {
        if (isRunning) resizeCanvas();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && isRunning) {
            lastFrameTime = 0;
        }
    });
})();

/* ==========================================================================
   VIEWPORT-WIDE WEATHER FX (rain · sunlight · wind-blown leaves)
   Shared by the HUD tokens (atmosphere-shifter.js) and the compass (celestial-orrery.js).
   Every effect spawns over the WHOLE viewport. The seed/sprout only receives a focused share
   of the particles, so the "watered / warmed" feedback stays readable without the rest of the
   screen sitting empty. Particles clean themselves up on animationend / onfinish.
   ========================================================================== */
(function() {
    'use strict';

    const rnd = (a, b) => a + Math.random() * (b - a);
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const budget = (n) => (window.isLowEndDevice ? Math.ceil(n / 2) : n);
    const RAIN_TILT = Math.tan(14 * Math.PI / 180);   // matches rotate(14deg) of .summer-rain-streak

    function seedTarget() {
        return typeof window.getSeedOrSproutCenter === 'function'
            ? window.getSeedOrSproutCenter()
            : { x: window.innerWidth / 2, y: window.innerHeight * 0.7 };
    }

    // Vertical band of the meadow where drops land and splash
    function groundBand(h) {
        const meadow = document.getElementById('co-hoa');
        const top = meadow ? meadow.getBoundingClientRect().top : h * 0.78;
        return { top: clamp(top + 16, h * 0.5, h - 24), bottom: h - 6 };
    }

    function splash(layer, x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'rain-splash-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
        layer.appendChild(ripple);
    }

    // A rain shower: drops fall everywhere and land on the meadow; ~25% are aimed at the seed.
    function rain(options = {}) {
        const layer = document.getElementById('summer-rain-layer');
        if (!layer) return;

        const w = window.innerWidth;
        const h = window.innerHeight;
        const target = options.target || seedTarget();
        const ground = groundBand(h);
        const total = budget(clamp(Math.round(w / 20), 28, 90));
        const focused = Math.round(total * 0.25);
        const spanMs = options.durationMs || 1400;
        const frag = document.createDocumentFragment();

        for (let i = 0; i < total; i++) {
            const atSeed = i < focused;
            const landX = atSeed ? target.x + rnd(-90, 90) : rnd(0, w);
            const landY = atSeed ? target.y + rnd(-6, 16) : rnd(ground.top, ground.bottom);
            const startY = atSeed ? target.y - rnd(150, 230) : rnd(-60, Math.max(-40, landY - 220));
            const fall = landY - startY;
            const drift = fall * RAIN_TILT;

            const streak = document.createElement('div');
            streak.className = 'summer-rain-streak';
            streak.style.left = `${(landX - drift).toFixed(1)}px`;
            streak.style.top = `${startY.toFixed(1)}px`;
            streak.style.setProperty('--fall-x', `${drift.toFixed(1)}px`);
            streak.style.setProperty('--fall-y', `${fall.toFixed(1)}px`);
            streak.style.animationDuration = `${(fall / rnd(1100, 1500)).toFixed(2)}s`;
            streak.style.animationDelay = `${Math.round(rnd(0, spanMs))}ms`;
            streak.addEventListener('animationend', () => {
                streak.remove();
                if (atSeed || Math.random() < 0.5) splash(layer, landX, landY);
            }, { once: true });
            frag.appendChild(streak);
        }
        layer.appendChild(frag);
    }

    function pollenMote(layer, from, to, delayMs) {
        const mote = document.createElement('div');
        mote.className = 'golden-pollen-particle';
        mote.style.left = `${from.x}px`;
        mote.style.top = `${from.y}px`;
        layer.appendChild(mote);

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const anim = mote.animate([
            { transform: 'scale(0.3) rotate(0deg)', opacity: 0 },
            { transform: `translate(${dx * 0.5 + rnd(-25, 25)}px, ${dy * 0.5}px) scale(1.2) rotate(180deg)`, opacity: 1, offset: 0.4 },
            { transform: `translate(${dx}px, ${dy}px) scale(0.6) rotate(360deg)`, opacity: 0 }
        ], { duration: rnd(1200, 1800), delay: delayMs, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' });
        anim.onfinish = () => mote.remove();
    }

    // Sunlight: soft shafts across the full width + golden pollen through the whole frame.
    // Half of the pollen drifts into the seed (feedback); the rest floats freely across the screen.
    function sunlight(options = {}) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const target = options.target || seedTarget();
        const holdMs = options.holdMs || 3200;

        const rays = clamp(Math.round(w / 280), 3, 7);
        const cell = w / rays;
        for (let i = 0; i < rays; i++) {
            const ray = document.createElement('div');
            ray.className = 'sunbeam-ambient';
            ray.style.left = `${(cell * (i + 0.5) + rnd(-cell * 0.2, cell * 0.2)).toFixed(1)}px`;
            ray.style.setProperty('--ray-w', `${Math.round(rnd(90, 190))}px`);
            document.body.appendChild(ray);
            const fade = ray.animate(
                [{ opacity: 0 }, { opacity: 0.9, offset: 0.25 }, { opacity: 0.9, offset: 0.7 }, { opacity: 0 }],
                { duration: holdMs, delay: i * 90, easing: 'ease-in-out', fill: 'both' }
            );
            fade.onfinish = () => ray.remove();
        }

        const layer = document.getElementById('golden-pollen-layer') || document.body;
        const total = budget(clamp(Math.round(w / 45), 22, 44));
        for (let i = 0; i < total; i++) {
            const delay = Math.round(rnd(0, 1000));
            if (i % 2 === 0) {
                const angle = rnd(0, Math.PI * 2);
                const radius = rnd(15, 60);
                pollenMote(layer,
                    { x: target.x + rnd(-45, 45), y: target.y - 120 + rnd(-20, 20) },
                    { x: target.x + Math.cos(angle) * radius, y: target.y + Math.sin(angle) * radius * 0.4 },
                    delay);
            } else {
                const from = { x: rnd(0, w), y: rnd(h * 0.08, h * 0.8) };
                pollenMote(layer, from, { x: from.x + rnd(-60, 90), y: from.y + rnd(-90, 30) }, delay);
            }
        }
    }

    // Wind: leaves are blown across the whole screen (not just the left half), farther on wider screens.
    function breeze() {
        let layer = document.getElementById('autumn-breeze-layer');
        if (!layer) {
            layer = document.createElement('div');
            layer.id = 'autumn-breeze-layer';
            layer.className = 'autumn-breeze-layer';
            document.body.appendChild(layer);
        }

        const w = window.innerWidth;
        const h = window.innerHeight;
        const reach = clamp(w / 1440, 0.6, 1.4);
        const total = budget(clamp(Math.round(w / 55), 14, 34));
        const frag = document.createDocumentFragment();

        for (let i = 0; i < total; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'autumn-leaf-particle';
            leaf.style.left = `${rnd(-w * 0.03, w * 0.97).toFixed(1)}px`;
            leaf.style.top = `${rnd(-20, h * 0.7).toFixed(1)}px`;
            leaf.style.setProperty('--dx', `${Math.round(rnd(200, 380) * reach)}px`);
            leaf.style.setProperty('--dy', `${Math.round(rnd(90, 190))}px`);
            leaf.style.animationDuration = `${rnd(2.4, 3.6).toFixed(2)}s`;
            leaf.style.animationDelay = `${Math.round(rnd(0, 1100))}ms`;
            leaf.addEventListener('animationend', () => leaf.remove(), { once: true });
            frag.appendChild(leaf);
        }
        layer.appendChild(frag);
    }

    window.WeatherFX = { rain, sunlight, breeze };
})();

// Tự động kích hoạt phong cảnh đồng quê khi trang web sẵn sàng
function bootCountrysideEnvironment() {
    if (typeof window.initCountrysideWildflowers === 'function') {
        window.initCountrysideWildflowers();
    }
    if (typeof window.initFallingLeavesCanvas === 'function') {
        window.initFallingLeavesCanvas();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootCountrysideEnvironment);
} else {
    bootCountrysideEnvironment();
}
