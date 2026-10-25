/**
 * ZODIAC — NGÀY SINH (chỉ Ngày & Tháng) -> CUNG HOÀNG ĐẠO -> CHÒM SAO Ở MÀN TRỒNG CÂY
 * - Form: hai ô chọn Ngày/Tháng; chọn xong là hiện cung hoàng đạo ngay.
 * - Chòm sao KHÔNG vẽ ở đây: garden-minigames.js (Stage 3) gọi window.getZodiacConstellation()
 *   để nạp 5–7 sao đánh số của cung này lên bầu trời.
 * Toạ độ sao `pts` là [x, y] theo px trên canvas 1100x680 (cùng hệ với #wrap), đã xếp theo
 * thứ tự nối 1 -> N và nằm trong vùng trời an toàn (tránh thanh tiến độ, tán cây, HUD hai góc).
 */
(() => {
    'use strict';

    const SIGNS = {
        aries:       { name: 'Bạch Dương', latin: 'Aries',       symbol: '♈', range: '21/3 – 19/4',
            msg: 'Dũng cảm và rực rỡ như ngọn lửa đầu xuân.', close: false,
            pts: [[240,225],[340,190],[450,165],[600,175],[740,215]] },
        taurus:      { name: 'Kim Ngưu',   latin: 'Taurus',      symbol: '♉', range: '20/4 – 20/5',
            msg: 'Dịu dàng, bền bỉ, luôn là bờ vai vững chãi.', close: false,
            pts: [[250,125],[330,195],[520,225],[700,195],[820,130]] },
        gemini:      { name: 'Song Tử',    latin: 'Gemini',      symbol: '♊', range: '21/5 – 20/6',
            msg: 'Thông minh, tinh nghịch, mang theo nụ cười lan tỏa.', close: false,
            pts: [[250,130],[310,195],[255,268],[460,170],[540,225],[700,200],[800,135]] },
        cancer:      { name: 'Cự Giải',    latin: 'Cancer',      symbol: '♋', range: '21/6 – 22/7',
            msg: 'Ấm áp, tinh tế, biết yêu thương thật sâu.', close: false,
            pts: [[250,265],[370,205],[540,215],[690,160],[830,250]] },
        leo:         { name: 'Sư Tử',      latin: 'Leo',         symbol: '♌', range: '23/7 – 22/8',
            msg: 'Tỏa sáng tự nhiên, rộng lượng và đầy kiêu hãnh.', close: false,
            pts: [[240,255],[250,160],[340,115],[430,175],[520,220],[680,190],[830,150]] },
        virgo:       { name: 'Xử Nữ',      latin: 'Virgo',       symbol: '♍', range: '23/8 – 22/9',
            msg: 'Chu đáo, thanh lịch, đẹp trong từng chi tiết nhỏ.', close: false,
            pts: [[240,140],[330,210],[430,255],[560,215],[660,265],[760,200],[860,135]] },
        libra:       { name: 'Thiên Bình', latin: 'Libra',       symbol: '♎', range: '23/9 – 22/10',
            msg: 'Hài hòa, duyên dáng, luôn biết cân bằng yêu thương.', close: true,
            pts: [[270,255],[380,180],[620,180],[790,255],[520,225]] },
        scorpio:     { name: 'Thiên Yết',  latin: 'Scorpius',    symbol: '♏', range: '23/10 – 21/11',
            msg: 'Sâu sắc, kiên cường, bí ẩn và đầy cuốn hút.', close: false,
            pts: [[245,130],[340,170],[440,215],[560,222],[680,260],[790,235],[860,160]] },
        sagittarius: { name: 'Nhân Mã',    latin: 'Sagittarius', symbol: '♐', range: '22/11 – 21/12',
            msg: 'Tự do, lạc quan, luôn hướng về chân trời mới.', close: true,
            pts: [[280,255],[250,170],[335,120],[440,180],[620,215],[720,160],[800,250]] },
        capricorn:   { name: 'Ma Kết',     latin: 'Capricornus', symbol: '♑', range: '22/12 – 19/1',
            msg: 'Kiên định, chín chắn, âm thầm chạm tới ước mơ.', close: true,
            pts: [[245,145],[380,175],[560,190],[740,185],[800,265],[420,255]] },
        aquarius:    { name: 'Bảo Bình',   latin: 'Aquarius',    symbol: '♒', range: '20/1 – 18/2',
            msg: 'Độc đáo, nhân hậu, mang đến những điều khác biệt.', close: false,
            pts: [[240,200],[330,150],[430,215],[540,165],[650,225],[760,170],[860,225]] },
        pisces:      { name: 'Song Ngư',   latin: 'Pisces',      symbol: '♓', range: '19/2 – 20/3',
            msg: 'Mơ mộng, nhạy cảm, trái tim luôn đầy thi vị.', close: false,
            pts: [[250,120],[300,205],[380,260],[520,215],[660,255],[780,200],[860,135]] }
    };

    // Ngày bắt đầu của cung ứng với mỗi tháng (T1..T12); trước ngày này vẫn thuộc cung của tháng trước.
    const CUTOFF = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
    const SIGN_OF_MONTH = ['aquarius','pisces','aries','taurus','gemini','cancer',
                           'leo','virgo','libra','scorpio','sagittarius','capricorn'];
    // Số ngày tối đa mỗi tháng (tháng 2 cho phép 29 vì không có năm sinh)
    const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /** Trả về key cung hoàng đạo từ tháng (1–12) và ngày; null nếu không hợp lệ. */
    const getZodiacKey = (month, day) => {
        if (!(month >= 1 && month <= 12) || !(day >= 1 && day <= DAYS_IN_MONTH[month - 1])) return null;
        const prev = SIGN_OF_MONTH[(month + 10) % 12];
        return day >= CUTOFF[month - 1] ? SIGN_OF_MONTH[month - 1] : prev;
    };

    const $ = (id) => document.getElementById(id);
    const dayEl = $('birth-day');
    const monthEl = $('birth-month');
    const resultEl = $('zodiac-result');
    const STORE_KEY = 'epic.birthday';   // "dd-mm"
    const safe = (fn) => { try { return fn(); } catch (_) { /* localStorage có thể bị chặn */ } };

    window.currentZodiac = null;
    window.ZODIAC_SIGNS = SIGNS;
    window.getZodiacKey = getZodiacKey;   // test: getZodiacKey(10, 20) -> 'libra'

    /** Dữ liệu chòm sao của cung đang chọn cho mini-game Stage 3 (null nếu chưa chọn). */
    window.getZodiacConstellation = () => {
        const z = window.currentZodiac;
        if (!z || !SIGNS[z.key]) return null;
        const sg = SIGNS[z.key];
        return { key: z.key, name: sg.name, latin: sg.latin, symbol: sg.symbol, msg: sg.msg,
                 close: sg.close, pts: sg.pts.map((p) => [p[0], p[1]]) };
    };

    if (!dayEl || !monthEl) return;

    /* ---------- Dựng danh sách Ngày / Tháng ---------- */
    for (let d = 1; d <= 31; d++) dayEl.add(new Option(String(d), String(d)));
    for (let m = 1; m <= 12; m++) monthEl.add(new Option('Tháng ' + m, String(m)));

    /** Vô hiệu hoá ngày không tồn tại trong tháng đang chọn (vd 31/4); reset nếu đang chọn ngày đó. */
    const syncDayOptions = () => {
        const m = +monthEl.value;
        const max = m ? DAYS_IN_MONTH[m - 1] : 31;
        Array.from(dayEl.options).forEach((o) => { if (o.value) o.disabled = +o.value > max; });
        if (+dayEl.value > max) dayEl.value = '';
    };

    /* ---------- Tra cung hoàng đạo ---------- */
    const updateZodiac = () => {
        syncDayOptions();
        const m = +monthEl.value, d = +dayEl.value;
        const key = (m && d) ? getZodiacKey(m, d) : null;
        if (!key) {
            window.currentZodiac = null;
            resultEl.classList.add('hidden');
            if (!m && !d) safe(() => localStorage.removeItem(STORE_KEY));
            return;
        }
        const sg = SIGNS[key];
        window.currentZodiac = { key, name: sg.name, symbol: sg.symbol, latin: sg.latin, day: d, month: m };
        resultEl.querySelector('.zodiac-symbol').textContent = sg.symbol + '\uFE0E';
        resultEl.querySelector('.zodiac-name').textContent = 'Cung ' + sg.name;
        resultEl.querySelector('.zodiac-dates').textContent = sg.range;
        resultEl.querySelector('.zodiac-msg').textContent = sg.msg;
        resultEl.classList.remove('hidden');
        safe(() => localStorage.setItem(STORE_KEY, d + '-' + m));
    };

    dayEl.addEventListener('change', updateZodiac);
    monthEl.addEventListener('change', updateZodiac);

    // Khôi phục lựa chọn cũ (và đọc định dạng cũ yyyy-mm-dd nếu có)
    safe(() => {
        let saved = localStorage.getItem(STORE_KEY), d, m, r;
        if (saved && (r = /^(\d{1,2})-(\d{1,2})$/.exec(saved))) { d = +r[1]; m = +r[2]; }
        else if ((saved = localStorage.getItem('epic.birthdate')) && (r = /^\d{4}-(\d{1,2})-(\d{1,2})$/.exec(saved))) { m = +r[1]; d = +r[2]; }
        if (m && d && getZodiacKey(m, d)) { monthEl.value = String(m); syncDayOptions(); dayEl.value = String(d); }
    });
    safe(() => localStorage.removeItem('epic.birthdate'));
    updateZodiac();
})();
