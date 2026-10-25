/**
 * ZODIAC + CONSTELLATION MINI-GAME
 * - Nhập ngày sinh -> tra Cung Hoàng Đạo (theo ngày/tháng, lịch dương).
 * - Mini-game nối 5–7 ngôi sao theo thứ tự để vẽ chòm sao của cung đó.
 * Độc lập hoàn toàn: chỉ đọc #name-input, không sửa logic của các file khác.
 * Toạ độ sao: hệ 0–100 (x sang phải, y xuống dưới), đã sắp theo thứ tự nối 1 -> N.
 */
(() => {
    'use strict';

    const SIGNS = {
        aries:       { name: 'Bạch Dương', symbol: '♈', range: '21/3 – 19/4',
            msg: 'Dũng cảm và rực rỡ như ngọn lửa đầu xuân.',
            close: false, pts: [[14,64],[34,52],[56,44],[78,46],[88,60]] },
        taurus:      { name: 'Kim Ngưu', symbol: '♉', range: '20/4 – 20/5',
            msg: 'Dịu dàng, bền bỉ, luôn là bờ vai vững chãi.',
            close: false, pts: [[10,22],[30,42],[50,56],[70,42],[90,22]] },
        gemini:      { name: 'Song Tử', symbol: '♊', range: '21/5 – 20/6',
            msg: 'Thông minh, tinh nghịch, mang theo nụ cười lan tỏa.',
            close: false, pts: [[22,18],[34,36],[28,60],[40,84],[62,76],[70,50],[78,22]] },
        cancer:      { name: 'Cự Giải', symbol: '♋', range: '21/6 – 22/7',
            msg: 'Ấm áp, tinh tế, biết yêu thương thật sâu.',
            close: false, pts: [[20,82],[40,60],[50,42],[42,20],[76,26]] },
        leo:         { name: 'Sư Tử', symbol: '♌', range: '23/7 – 22/8',
            msg: 'Tỏa sáng tự nhiên, rộng lượng và đầy kiêu hãnh.',
            close: false, pts: [[26,70],[22,48],[30,28],[46,18],[58,30],[56,50],[86,60]] },
        virgo:       { name: 'Xử Nữ', symbol: '♍', range: '23/8 – 22/9',
            msg: 'Chu đáo, thanh lịch, đẹp trong từng chi tiết nhỏ.',
            close: false, pts: [[20,24],[34,34],[46,48],[44,70],[60,84],[70,62],[84,40]] },
        libra:       { name: 'Thiên Bình', symbol: '♎', range: '23/9 – 22/10',
            msg: 'Hài hòa, duyên dáng, luôn biết cân bằng yêu thương.',
            close: true,  pts: [[18,62],[38,34],[62,34],[82,62],[50,82]] },
        scorpio:     { name: 'Thiên Yết', symbol: '♏', range: '23/10 – 21/11',
            msg: 'Sâu sắc, kiên cường, bí ẩn và đầy cuốn hút.',
            close: false, pts: [[14,24],[28,34],[42,46],[48,64],[62,78],[80,74],[88,56]] },
        sagittarius: { name: 'Nhân Mã', symbol: '♐', range: '22/11 – 21/12',
            msg: 'Tự do, lạc quan, luôn hướng về chân trời mới.',
            close: true,  pts: [[30,70],[22,50],[36,34],[56,30],[70,44],[64,66],[46,78]] },
        capricorn:   { name: 'Ma Kết', symbol: '♑', range: '22/12 – 19/1',
            msg: 'Kiên định, chín chắn, âm thầm chạm tới ước mơ.',
            close: true,  pts: [[14,30],[40,24],[66,34],[84,56],[60,80],[36,66]] },
        aquarius:    { name: 'Bảo Bình', symbol: '♒', range: '20/1 – 18/2',
            msg: 'Độc đáo, nhân hậu, mang đến những điều khác biệt.',
            close: false, pts: [[10,40],[26,28],[42,42],[58,30],[74,44],[90,32]] },
        pisces:      { name: 'Song Ngư', symbol: '♓', range: '19/2 – 20/3',
            msg: 'Mơ mộng, nhạy cảm, trái tim luôn đầy thi vị.',
            close: false, pts: [[10,22],[20,46],[38,62],[56,56],[70,40],[84,28],[92,48]] }
    };

    // Ngày bắt đầu của cung ứng với mỗi tháng (T1..T12); trước ngày này vẫn thuộc cung của tháng trước.
    const CUTOFF = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
    const SIGN_OF_MONTH = ['aquarius','pisces','aries','taurus','gemini','cancer',
                           'leo','virgo','libra','scorpio','sagittarius','capricorn'];

    /** Trả về key cung hoàng đạo từ tháng (1–12) và ngày. */
    const getZodiacKey = (month, day) => {
        if (!(month >= 1 && month <= 12)) return null;
        const prev = SIGN_OF_MONTH[(month + 10) % 12];
        return day >= CUTOFF[month - 1] ? SIGN_OF_MONTH[month - 1] : prev;
    };

    /** Đọc "yyyy-mm-dd" hoặc "dd/mm/yyyy"; trả về {d,m,y} hợp lệ hoặc null. */
    const parseBirth = (raw) => {
        const s = (raw || '').trim();
        let y, m, d, r;
        if ((r = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s))) { y = +r[1]; m = +r[2]; d = +r[3]; }
        else if ((r = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/.exec(s))) { d = +r[1]; m = +r[2]; y = +r[3]; }
        else return null;
        const dt = new Date(y, m - 1, d);
        if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
        if (y < 1900 || dt > new Date()) return null;
        return { d, m, y };
    };

    const $ = (id) => document.getElementById(id);
    const inputEl = $('birthdate-input');
    const resultEl = $('zodiac-result');
    const drawBtn = $('zodiac-draw-btn');
    const modal = $('zodiac-modal');
    if (!inputEl || !modal) return;

    const stage = $('zc-stage');
    const svg = $('zc-svg');
    const starsLayer = $('zc-stars');
    const titleEl = $('zc-title');
    const hintEl = $('zc-hint');
    const progressEl = $('zc-progress');
    const finaleEl = $('zc-finale');
    const finaleMsgEl = $('zc-finale-msg');
    const STORE_KEY = 'epic.birthdate';
    const SVGNS = 'http://www.w3.org/2000/svg';

    let current = null;      // { key, sign }
    let nextIdx = 0;         // sao kế tiếp cần chạm (0-based)
    let lines = [];          // các <line> đã vẽ
    let animFrame = 0;
    let lastFocus = null;

    const safe = (fn) => { try { fn(); } catch (_) { /* optional effects only */ } };

    /* ---------- 1. Tra cung hoàng đạo ---------- */
    const updateZodiac = () => {
        const b = parseBirth(inputEl.value);
        if (!b) {
            current = null;
            resultEl.classList.add('hidden');
            drawBtn.classList.add('hidden');
            return;
        }
        const key = getZodiacKey(b.m, b.d);
        const sign = SIGNS[key];
        current = { key, sign };
        window.currentZodiac = { key, name: sign.name, symbol: sign.symbol };
        resultEl.querySelector('.zodiac-symbol').textContent = sign.symbol + '\uFE0E';
        resultEl.querySelector('.zodiac-name').textContent = 'Cung ' + sign.name;
        resultEl.querySelector('.zodiac-dates').textContent = sign.range;
        resultEl.querySelector('.zodiac-msg').textContent = sign.msg;
        resultEl.classList.remove('hidden');
        drawBtn.classList.remove('hidden');
        safe(() => localStorage.setItem(STORE_KEY, inputEl.value));
    };

    inputEl.max = new Date().toISOString().slice(0, 10);
    inputEl.addEventListener('input', updateZodiac);
    inputEl.addEventListener('change', updateZodiac);
    safe(() => {
        const saved = localStorage.getItem(STORE_KEY);
        if (saved && !inputEl.value) { inputEl.value = saved; }
    });
    updateZodiac();

    /* ---------- 2. Mini-game vẽ chòm sao ---------- */
    const makeLine = (x1, y1, x2, y2) => {
        const ln = document.createElementNS(SVGNS, 'line');
        ln.setAttribute('x1', x1); ln.setAttribute('y1', y1);
        ln.setAttribute('x2', x2); ln.setAttribute('y2', y2);
        ln.setAttribute('class', 'zc-line');
        svg.appendChild(ln);
        return ln;
    };

    const growLine = (ln, from, to, ms = 380) => {
        const t0 = performance.now();
        const step = (now) => {
            const k = Math.min(1, (now - t0) / ms);
            const e = 1 - Math.pow(1 - k, 3);
            ln.setAttribute('x2', from[0] + (to[0] - from[0]) * e);
            ln.setAttribute('y2', from[1] + (to[1] - from[1]) * e);
            if (k < 1) animFrame = requestAnimationFrame(step);
        };
        animFrame = requestAnimationFrame(step);
    };

    const setHint = (txt) => { hintEl.textContent = txt; };
    const setProgress = () => {
        progressEl.textContent = 'Đã nối ' + nextIdx + '/' + current.sign.pts.length;
    };
    const markNext = () => {
        starsLayer.querySelectorAll('.zc-star').forEach((b, i) => {
            b.classList.toggle('is-next', i === nextIdx);
            b.setAttribute('aria-label', 'Sao số ' + (i + 1) + (i < nextIdx ? ' đã nối' : (i === nextIdx ? ', chạm để nối' : '')));
        });
    };

    const buildStage = () => {
        cancelAnimationFrame(animFrame);
        svg.innerHTML = '';
        starsLayer.innerHTML = '';
        lines = [];
        nextIdx = 0;
        stage.classList.remove('zc-complete');
        finaleEl.classList.add('hidden');
        const { sign } = current;
        const nm = ($('name-input') && $('name-input').value.trim()) || '';
        titleEl.textContent = sign.symbol + '\uFE0E Chòm sao ' + sign.name + (nm ? ' của ' + nm : '');
        sign.pts.forEach((p, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'zc-star';
            b.style.left = p[0] + '%';
            b.style.top = p[1] + '%';
            b.style.setProperty('--zc-delay', (i * 0.35) + 's');
            b.dataset.idx = i;
            b.innerHTML = '<span class="zc-star-num">' + (i + 1) + '</span>';
            starsLayer.appendChild(b);
        });
        setHint('Chạm lần lượt các ngôi sao theo số thứ tự, bắt đầu từ sao số 1 ✨');
        setProgress();
        markNext();
    };

    const burst = () => {
        const n = 22;
        for (let i = 0; i < n; i++) {
            const s = document.createElement('span');
            s.className = 'zc-spark';
            const a = (Math.PI * 2 * i) / n + Math.random() * 0.4;
            const r = 70 + Math.random() * 90;
            s.style.setProperty('--dx', Math.cos(a) * r + 'px');
            s.style.setProperty('--dy', Math.sin(a) * r + 'px');
            s.style.animationDelay = (Math.random() * 0.15) + 's';
            s.textContent = ['✦', '✧', '✨', '❀'][i % 4];
            stage.appendChild(s);
            setTimeout(() => s.remove(), 1600);
        }
    };

    const complete = () => {
        const { sign } = current;
        const pts = sign.pts;
        if (sign.close) {
            const first = pts[0], last = pts[pts.length - 1];
            const ln = makeLine(last[0], last[1], last[0], last[1]);
            lines.push(ln);
            growLine(ln, last, first, 450);
        }
        setTimeout(() => {
            stage.classList.add('zc-complete');
            lines.forEach((l) => l.classList.add('zc-lit'));
            burst();
            safe(() => window.playHarpGlissando && window.playHarpGlissando('up', 90));
            safe(() => window.triggerHaptic && window.triggerHaptic('harp'));
            finaleMsgEl.textContent = 'Chòm sao ' + sign.name + ' đã sáng lên! ' + sign.msg;
            finaleEl.classList.remove('hidden');
            setHint('Hoàn thành rồi — thật lung linh! 🌙');
            safe(() => document.dispatchEvent(new CustomEvent('zodiac:constellation-complete', {
                detail: { key: current.key, name: sign.name }
            })));
        }, sign.close ? 520 : 380);
    };

    const onStarTap = (btn) => {
        const i = +btn.dataset.idx;
        if (i < nextIdx) return;
        if (i !== nextIdx) {
            btn.classList.remove('is-wrong'); void btn.offsetWidth; btn.classList.add('is-wrong');
            setHint('Chưa đến lượt sao này — hãy chạm sao số ' + (nextIdx + 1) + ' nhé 💫');
            return;
        }
        const pts = current.sign.pts;
        btn.classList.add('is-done');
        safe(() => window.playMelodicHarpChime && window.playMelodicHarpChime(i % 5));
        if (i > 0) {
            const a = pts[i - 1], b = pts[i];
            const ln = makeLine(a[0], a[1], a[0], a[1]);
            lines.push(ln);
            growLine(ln, a, b);
        }
        nextIdx++;
        setProgress();
        markNext();
        if (nextIdx >= pts.length) complete();
        else setHint(nextIdx === 1 ? 'Tuyệt! Nối tiếp tới sao số 2 ✨' : 'Tiếp tục tới sao số ' + (nextIdx + 1) + ' nhé 🌟');
    };

    starsLayer.addEventListener('click', (e) => {
        const btn = e.target.closest('.zc-star');
        if (btn) onStarTap(btn);
    });

    const openModal = () => {
        if (!current) return;
        lastFocus = document.activeElement;
        buildStage();
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => modal.classList.add('is-open'));
        const first = starsLayer.querySelector('.zc-star');
        if (first) setTimeout(() => first.focus({ preventScroll: true }), 120);
    };
    const closeModal = () => {
        cancelAnimationFrame(animFrame);
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        setTimeout(() => modal.classList.add('hidden'), 260);
        if (lastFocus && lastFocus.focus) safe(() => lastFocus.focus({ preventScroll: true }));
    };

    drawBtn.addEventListener('click', openModal);
    $('zc-close').addEventListener('click', closeModal);
    $('zc-reset').addEventListener('click', buildStage);
    $('zc-finale-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    window.getZodiacKey = getZodiacKey; // tiện test: getZodiacKey(10, 20) -> 'libra'
})();
