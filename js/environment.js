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

    window.initCountrysideWildflowers = function() {
        const coHoa = document.getElementById('co-hoa');
        if (!coHoa) return;

        const W = window.innerWidth;
        const mobile = W <= 768;
        const Hh = Math.round(Math.min(window.innerHeight * (mobile ? 0.32 : 0.36), mobile ? 240 : 320));

        coHoa.setAttribute('overflow', 'visible');
        coHoa.style.overflow = 'visible';
        coHoa.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
        coHoa.setAttribute('width', W);
        coHoa.setAttribute('height', Hh);
        coHoa.innerHTML = '';
        coHoa.classList.add('hien-thi');

        const base = Hh + 4;
        const ph = rnd(0, 6);
        const nhomCo = new Map(MAU_XANH.map(m => [m, []]));

        // Gom hàng trăm ngọn cỏ vào vài path để mượt mà 60fps
        const stepX = mobile ? rnd(5.5, 9.0) : rnd(4.2, 7.5);
        for (let x = -10; x < W + 10; x += stepX) {
            const h = Hh * (0.22 + 0.42 * rnd(0.35, 1) * (0.65 + 0.35 * Math.sin(x / 85 + ph)));
            const lean = rnd(-0.3, 0.08) * h;
            const w = rnd(2.2, 5.2);
            const d = `M ${x - w} ${base} Q ${x - w + lean * .35} ${base - h * .55} ${x + lean} ${base - h} Q ${x + w + lean * .35} ${base - h * .5} ${x + w} ${base}`;
            nhomCo.get(chon(MAU_XANH)).push(d);
        }

        nhomCo.forEach((netCo, mauCo) => {
            if (netCo.length > 0) {
                el('path', {
                    class: 'co-ngan',
                    d: netCo.join(' '),
                    stroke: mauCo
                }, coHoa);
            }
        });

        // Cành lá bên tả bên hữu
        canhLa(coHoa, W * 0.03, base, W * (mobile ? 0.22 : 0.14), Hh * 0.92, mobile ? 5 : 7, 0.5, W);
        canhLa(coHoa, W * 0.78, base, W * (mobile ? -0.18 : -0.12), Hh * 0.88, mobile ? 5 : 7, 0.8, W);
        if (!mobile) {
            canhLa(coHoa, W * 0.38, base, W * 0.09, Hh * 0.78, 6, 1.1, W);
        }

        // Cụm hoa sen và hoa cúc đồng nội
        const soHoa = mobile ? 5 : 9;
        const stepWidth = W / (soHoa + 1);
        for (let i = 0; i < soHoa; i++) {
            const x = stepWidth * (i + 1) + rnd(-15, 15);
            cayHoa(coHoa, x, base, Hh * rnd(0.65, 0.98), i % 3, 0.6 + (x / W) * 1.4, W);
        }

        setTimeout(() => {
            coHoa.classList.add('xong');
        }, 3600);
    };

    let resizeWildflowersTimer = null;
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        clearTimeout(resizeWildflowersTimer);
        resizeWildflowersTimer = setTimeout(() => {
            if (Math.abs(window.innerWidth - lastWidth) > 30) {
                lastWidth = window.innerWidth;
                window.initCountrysideWildflowers();
            }
        }, 300);
    }, { passive: true });
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
        } else if (Math.random() < 0.7) {
            p.x = w + 40 + Math.random() * 100;
            p.y = Math.random() * h * 0.85;
        } else {
            p.x = Math.random() * (w + 80);
            p.y = -40 - Math.random() * 60;
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

// Tự động kích hoạt phong cảnh đồng quê khi trang web sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.initCountrysideWildflowers === 'function') {
        window.initCountrysideWildflowers();
    }
    if (typeof window.initFallingLeavesCanvas === 'function') {
        window.initFallingLeavesCanvas();
    }
});
