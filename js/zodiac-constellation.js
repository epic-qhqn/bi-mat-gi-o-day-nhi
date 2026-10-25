/**
 * ZODIAC — NGÀY SINH (chỉ Ngày & Tháng) -> CUNG HOÀNG ĐẠO -> CHÒM SAO Ở MÀN TRỒNG CÂY
 * - Form: hai ô chọn Ngày/Tháng; chọn xong là hiện cung hoàng đạo ngay.
 * - Chòm sao: Stage 3 gọi window.getZodiacConstellation() để nạp các sao & đường nối;
 *   khi hoàn thành (hoặc skip) sẽ hiển thị toàn cảnh hình vẽ vector thần thoại trong 2 giây.
 * Toạ độ sao `pts` là [x, y] theo px trên canvas 1100x680 (cùng hệ với #wrap),
 * đã xếp theo thứ tự nối chuẩn xác và nằm hoàn toàn trong vùng trời an toàn.
 */
(() => {
    'use strict';

    const SIGNS = {
        aries: {
            name: 'Bạch Dương', latin: 'Aries', symbol: '♈', range: '21/3 – 19/4',
            msg: 'Dũng cảm và rực rỡ như ngọn lửa đầu xuân.', close: false,
            pts: [[240,225],[340,190],[450,165],[600,175],[740,215]],
            edges: [[0,1],[1,2],[2,3],[3,4]],
            svgPath: `
                <!-- Aries: Cừu Vàng Thần Thoại Leaping Ram -->
                <path class="zodiac-art-outline" d="M450,165 C430,135 390,120 370,140 C350,160 375,185 410,180 C440,175 450,165 450,165 Z" />
                <path class="zodiac-art-body" d="M450,165 C480,175 510,185 520,205 C515,225 490,230 460,220 C430,210 380,205 340,190" />
                <path class="zodiac-art-body" d="M340,190 C300,200 270,210 240,225 C225,235 235,250 255,245 C275,240 310,215 340,190" />
                <path class="zodiac-art-body" d="M450,165 C520,160 560,168 600,175 C660,185 700,195 740,215 C765,228 775,255 750,265 C730,270 710,240 680,225" />
                <path class="zodiac-art-accent" d="M600,175 C620,210 650,235 680,250 C670,260 650,255 640,235" />
                <path class="zodiac-art-decor" d="M470,160 C490,145 520,150 540,162 M550,170 C570,160 600,165 620,175" />
                <circle class="zodiac-star-sparkle" cx="450" cy="165" r="3" />
                <circle class="zodiac-star-sparkle" cx="340" cy="190" r="2.5" />
                <circle class="zodiac-star-sparkle" cx="600" cy="175" r="2.5" />
            `
        },
        taurus: {
            name: 'Kim Ngưu', latin: 'Taurus', symbol: '♉', range: '20/4 – 20/5',
            msg: 'Dịu dàng, bền bỉ, luôn là bờ vai vững chãi.', close: false,
            pts: [[250,125],[330,195],[520,225],[700,195],[820,130]],
            edges: [[0,1],[1,2],[2,3],[3,4],[1,3]],
            svgPath: `
                <!-- Taurus: Kim Ngưu Dũng Mãnh Charging Bull -->
                <path class="zodiac-art-outline" d="M250,125 C270,150 295,175 330,195 C310,215 285,225 260,220 C240,215 245,190 270,185 C295,180 320,185 330,195" />
                <path class="zodiac-art-outline" d="M820,130 C780,150 740,175 700,195 C660,190 600,185 520,225 C470,250 430,265 400,255 C370,245 350,215 330,195" />
                <path class="zodiac-art-body" d="M520,225 C550,210 620,200 700,195 C740,210 780,230 810,245 C800,260 770,255 750,235" />
                <path class="zodiac-art-body" d="M430,250 C445,275 470,285 490,270 C475,255 460,240 450,230" />
                <path class="zodiac-art-accent" d="M330,195 C360,170 410,165 460,175 C500,185 515,205 520,225" />
                <circle class="zodiac-star-sparkle" cx="330" cy="195" r="3.5" />
                <circle class="zodiac-star-sparkle" cx="520" cy="225" r="3" />
            `
        },
        gemini: {
            name: 'Song Tử', latin: 'Gemini', symbol: '♊', range: '21/5 – 20/6',
            msg: 'Thông minh, tinh nghịch, mang theo nụ cười lan tỏa.', close: false,
            pts: [[250,130],[310,195],[255,268],[460,170],[540,225],[700,200],[800,135]],
            edges: [[0,1],[1,2],[0,3],[3,4],[4,5],[5,6]],
            svgPath: `
                <!-- Gemini: Cặp Song Sinh Nắm Tay The Celestial Twins -->
                <circle class="zodiac-art-outline" cx="250" cy="130" r="14" />
                <circle class="zodiac-art-outline" cx="460" cy="170" r="14" />
                <path class="zodiac-art-body" d="M250,144 C260,165 285,180 310,195 C290,220 270,245 255,268 C240,255 245,230 255,210 C265,190 255,165 240,150" />
                <path class="zodiac-art-body" d="M460,184 C480,200 510,215 540,225 C580,218 640,210 700,200 C740,180 770,155 800,135" />
                <path class="zodiac-art-accent" d="M310,195 C370,210 410,215 460,184 M310,195 C380,215 460,225 540,225" />
                <path class="zodiac-art-decor" d="M265,175 C295,185 330,190 360,185 M480,205 C520,215 570,215 620,205" />
                <circle class="zodiac-star-sparkle" cx="250" cy="130" r="3" />
                <circle class="zodiac-star-sparkle" cx="460" cy="170" r="3" />
                <circle class="zodiac-star-sparkle" cx="800" cy="135" r="2.5" />
            `
        },
        cancer: {
            name: 'Cự Giải', latin: 'Cancer', symbol: '♋', range: '21/6 – 22/7',
            msg: 'Ấm áp, tinh tế, biết yêu thương thật sâu.', close: false,
            pts: [[250,265],[370,205],[540,215],[690,160],[830,250]],
            edges: [[0,1],[1,2],[2,3],[2,4]],
            svgPath: `
                <!-- Cancer: Cự Giải Mai Trăng Celestial Crab -->
                <ellipse class="zodiac-art-outline" cx="540" cy="215" rx="55" ry="38" />
                <path class="zodiac-art-body" d="M490,200 C430,195 390,198 370,205 C340,215 310,190 325,165 C345,145 375,160 380,185" />
                <path class="zodiac-art-body" d="M590,200 C640,185 670,175 690,160 C720,140 755,145 760,170 C765,195 730,210 705,200" />
                <path class="zodiac-art-accent" d="M500,235 C420,245 340,255 250,265 M515,245 C445,260 380,270 310,278" />
                <path class="zodiac-art-accent" d="M580,235 C660,245 740,250 830,250 M565,245 C635,260 710,270 780,275" />
                <circle class="zodiac-art-decor" cx="522" cy="188" r="4" />
                <circle class="zodiac-art-decor" cx="558" cy="188" r="4" />
                <circle class="zodiac-star-sparkle" cx="540" cy="215" r="3.5" />
                <circle class="zodiac-star-sparkle" cx="370" cy="205" r="2.5" />
                <circle class="zodiac-star-sparkle" cx="690" cy="160" r="2.5" />
            `
        },
        leo: {
            name: 'Sư Tử', latin: 'Leo', symbol: '♌', range: '23/7 – 22/8',
            msg: 'Tỏa sáng tự nhiên, rộng lượng và đầy kiêu hãnh.', close: false,
            pts: [[240,255],[250,160],[340,115],[430,175],[520,220],[680,190],[830,150]],
            edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,4]],
            svgPath: `
                <!-- Leo: Sư Tử Kiêu Hãnh The Celestial Lion -->
                <path class="zodiac-art-outline" d="M250,160 C230,135 255,110 290,105 C320,100 340,115 340,115 C370,125 410,145 430,175 C410,200 360,210 320,200 C270,190 255,175 250,160 Z" />
                <path class="zodiac-art-body" d="M250,160 C235,185 230,220 240,255 C255,265 270,250 275,230 C280,210 310,195 340,190" />
                <path class="zodiac-art-body" d="M430,175 C470,195 495,210 520,220 C570,225 630,210 680,190 C720,175 770,160 830,150 C855,145 860,165 845,175 C820,190 770,195 730,205 C690,215 670,245 650,265" />
                <path class="zodiac-art-accent" d="M300,130 C270,150 250,170 230,165 M340,135 C330,160 340,185 365,190" />
                <path class="zodiac-art-decor" d="M830,150 C850,135 870,140 865,160 C860,175 840,170 830,150" />
                <circle class="zodiac-star-sparkle" cx="250" cy="160" r="3.5" />
                <circle class="zodiac-star-sparkle" cx="430" cy="175" r="3" />
                <circle class="zodiac-star-sparkle" cx="830" cy="150" r="3" />
            `
        },
        virgo: {
            name: 'Xử Nữ', latin: 'Virgo', symbol: '♍', range: '23/8 – 22/9',
            msg: 'Chu đáo, thanh lịch, đẹp trong từng chi tiết nhỏ.', close: false,
            pts: [[240,140],[330,210],[430,255],[560,215],[660,265],[760,200],[860,135]],
            edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,3]],
            svgPath: `
                <!-- Virgo: Nàng Tiên Sao & Nhành Lúa Vàng The Maiden -->
                <circle class="zodiac-art-outline" cx="240" cy="140" r="14" />
                <path class="zodiac-art-body" d="M240,154 C265,175 300,195 330,210 C365,225 400,240 430,255 C460,265 520,245 560,215 C600,235 630,255 660,265" />
                <path class="zodiac-art-outline" d="M330,210 C410,180 500,165 580,185 C660,205 720,215 760,200 C800,180 830,155 860,135 C840,165 800,195 760,215 C710,235 670,250 640,260" />
                <path class="zodiac-art-accent" d="M560,215 C540,195 530,175 520,155 M560,215 C550,185 555,160 565,145 M560,215 C575,190 585,170 595,155" />
                <path class="zodiac-art-decor" d="M230,150 C210,175 220,210 240,230 M245,152 C235,185 245,215 265,240" />
                <circle class="zodiac-star-sparkle" cx="560" cy="215" r="4" />
                <circle class="zodiac-star-sparkle" cx="240" cy="140" r="2.5" />
                <circle class="zodiac-star-sparkle" cx="860" cy="135" r="3" />
            `
        },
        libra: {
            name: 'Thiên Bình', latin: 'Libra', symbol: '♎', range: '23/9 – 22/10',
            msg: 'Hài hòa, duyên dáng, luôn biết cân bằng yêu thương.', close: true,
            pts: [[270,255],[380,180],[620,180],[790,255],[520,225]],
            edges: [[0,1],[1,2],[2,3],[1,4],[4,2]],
            svgPath: `
                <!-- Libra: Cán Cân Công Lý & Yêu Thương The Scales -->
                <path class="zodiac-art-outline" d="M500,130 L520,225 L500,270 M500,130 L480,145 L520,145 Z" />
                <path class="zodiac-art-body" d="M380,180 L620,180 M500,180 L500,155" />
                <path class="zodiac-art-accent" d="M380,180 L270,255 M380,180 L310,255 M380,180 L230,255" />
                <path class="zodiac-art-outline" d="M220,255 C240,275 300,275 320,255 Z" />
                <path class="zodiac-art-accent" d="M620,180 L790,255 M620,180 L750,255 M620,180 L830,255" />
                <path class="zodiac-art-outline" d="M740,255 C760,275 820,275 840,255 Z" />
                <circle class="zodiac-star-sparkle" cx="380" cy="180" r="3.5" />
                <circle class="zodiac-star-sparkle" cx="620" cy="180" r="3.5" />
                <circle class="zodiac-star-sparkle" cx="520" cy="225" r="3" />
            `
        },
        scorpio: {
            name: 'Thiên Yết', latin: 'Scorpius', symbol: '♏', range: '23/10 – 21/11',
            msg: 'Sâu sắc, kiên cường, bí ẩn và đầy cuốn hút.', close: false,
            pts: [[245,130],[340,170],[440,215],[560,222],[680,260],[790,235],[860,160]],
            edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],
            svgPath: `
                <!-- Scorpius: Bọ Cạp Bí Ẩn The Celestial Scorpion -->
                <path class="zodiac-art-outline" d="M340,170 C310,150 275,135 245,130 C225,125 210,145 230,160 C250,175 285,180 340,170" />
                <path class="zodiac-art-outline" d="M340,170 C320,190 280,210 250,215 C230,220 225,245 245,245 C270,245 305,225 340,170" />
                <ellipse class="zodiac-art-body" cx="440" cy="215" rx="35" ry="24" />
                <ellipse class="zodiac-art-body" cx="510" cy="220" rx="30" ry="20" />
                <ellipse class="zodiac-art-body" cx="560" cy="222" rx="24" ry="16" />
                <path class="zodiac-art-body" d="M580,225 C620,235 650,250 680,260 C730,270 765,260 790,235 C815,210 835,180 860,160 C870,150 885,160 875,175 C855,205 825,245 780,265" />
                <path class="zodiac-art-accent" d="M860,160 C875,140 890,145 885,165" />
                <circle class="zodiac-star-sparkle" cx="440" cy="215" r="4" />
                <circle class="zodiac-star-sparkle" cx="860" cy="160" r="3.5" />
                <circle class="zodiac-star-sparkle" cx="340" cy="170" r="2.5" />
            `
        },
        sagittarius: {
            name: 'Nhân Mã', latin: 'Sagittarius', symbol: '♐', range: '22/11 – 21/12',
            msg: 'Tự do, lạc quan, luôn hướng về chân trời mới.', close: true,
            pts: [[280,255],[250,170],[335,120],[440,180],[620,215],[720,160],[800,250]],
            edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,3],[2,5]],
            svgPath: `
                <!-- Sagittarius: Xạ Thủ Nhân Mã The Celestial Centaur Archer -->
                <circle class="zodiac-art-outline" cx="335" cy="120" r="13" />
                <path class="zodiac-art-body" d="M335,133 C340,155 350,175 370,185 C390,195 480,205 540,210 C600,212 620,215 620,215" />
                <path class="zodiac-art-outline" d="M230,145 C240,165 245,185 250,210 M230,145 L270,175 L250,210" />
                <path class="zodiac-art-accent" d="M220,185 L440,180 M430,170 L440,180 L430,190" />
                <path class="zodiac-art-body" d="M370,185 C330,195 290,225 280,255 C270,270 290,275 305,260 C320,245 350,220 380,215" />
                <path class="zodiac-art-body" d="M540,210 C580,200 660,185 720,160 C750,190 780,220 800,250 C810,265 790,275 775,260 C760,240 730,215 700,210" />
                <circle class="zodiac-star-sparkle" cx="335" cy="120" r="3" />
                <circle class="zodiac-star-sparkle" cx="440" cy="180" r="3.5" />
                <circle class="zodiac-star-sparkle" cx="720" cy="160" r="3" />
            `
        },
        capricorn: {
            name: 'Ma Kết', latin: 'Capricornus', symbol: '♑', range: '22/12 – 19/1',
            msg: 'Kiên định, chín chắn, âm thầm chạm tới ước mơ.', close: true,
            pts: [[245,145],[380,175],[560,190],[740,185],[800,265],[420,255]],
            edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]],
            svgPath: `
                <!-- Capricornus: Dê Biển Thần Thoại The Sea Goat -->
                <path class="zodiac-art-outline" d="M380,175 C350,160 300,150 245,145 C225,142 220,160 240,168 C275,178 320,185 360,188" />
                <path class="zodiac-art-body" d="M380,175 C390,195 405,225 420,255 C435,270 450,260 445,240 C435,215 420,195 400,185" />
                <path class="zodiac-art-body" d="M380,175 C450,170 510,180 560,190 C620,195 680,185 740,185 C770,210 790,240 800,265 C780,280 750,275 730,255 C700,230 650,225 600,230" />
                <path class="zodiac-art-decor" d="M780,260 C810,255 835,270 830,285 C810,290 780,280 770,265" />
                <circle class="zodiac-star-sparkle" cx="245" cy="145" r="3" />
                <circle class="zodiac-star-sparkle" cx="380" cy="175" r="3.5" />
                <circle class="zodiac-star-sparkle" cx="740" cy="185" r="3" />
            `
        },
        aquarius: {
            name: 'Bảo Bình', latin: 'Aquarius', symbol: '♒', range: '20/1 – 18/2',
            msg: 'Độc đáo, nhân hậu, mang đến những điều khác biệt.', close: false,
            pts: [[240,200],[330,150],[430,215],[540,165],[650,225],[760,170],[860,225]],
            edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],
            svgPath: `
                <!-- Aquarius: Dòng Nước Tinh Khôi The Water Bearer -->
                <circle class="zodiac-art-outline" cx="330" cy="150" r="13" />
                <path class="zodiac-art-body" d="M330,163 C310,180 270,190 240,200 C220,210 230,235 250,230 C280,220 320,205 340,195" />
                <path class="zodiac-art-outline" d="M400,205 C415,190 440,180 460,195 C475,210 460,235 440,240 C420,240 400,225 400,205 Z" />
                <path class="zodiac-art-body" d="M460,195 L540,165 L555,185 L475,210" />
                <path class="zodiac-art-accent" d="M540,165 C580,185 620,210 650,225 C690,205 720,185 760,170 C800,195 830,215 860,225" />
                <path class="zodiac-art-decor" d="M555,185 C590,205 630,230 660,245 C700,225 730,205 770,190 C810,215 840,235 875,245" />
                <circle class="zodiac-star-sparkle" cx="540" cy="165" r="3.5" />
                <circle class="zodiac-star-sparkle" cx="760" cy="170" r="3" />
                <circle class="zodiac-star-sparkle" cx="860" cy="225" r="3" />
            `
        },
        pisces: {
            name: 'Song Ngư', latin: 'Pisces', symbol: '♓', range: '19/2 – 20/3',
            msg: 'Mơ mộng, nhạy cảm, trái tim luôn đầy thi vị.', close: false,
            pts: [[250,120],[300,205],[380,260],[520,215],[660,255],[780,200],[860,135]],
            edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],
            svgPath: `
                <!-- Pisces: Đôi Cá Buộc Dải Lụa Ngân Hà The Two Fishes -->
                <path class="zodiac-art-outline" d="M250,120 C220,110 200,125 210,145 C225,160 255,150 270,135 C285,120 270,105 250,120 Z" />
                <path class="zodiac-art-body" d="M210,145 L190,160 M210,145 L185,140" />
                <path class="zodiac-art-outline" d="M860,135 C890,125 910,140 900,160 C885,175 855,165 840,150 C825,135 840,120 860,135 Z" />
                <path class="zodiac-art-body" d="M900,160 L920,175 M900,160 L925,155" />
                <path class="zodiac-art-accent" d="M250,135 C270,170 285,190 300,205 C330,235 350,250 380,260 C430,270 480,245 520,215" />
                <path class="zodiac-art-accent" d="M520,215 C570,245 620,265 660,255 C710,240 745,225 780,200 C815,175 835,155 850,145" />
                <circle class="zodiac-art-decor" cx="520" cy="215" r="6" />
                <circle class="zodiac-star-sparkle" cx="520" cy="215" r="4" />
                <circle class="zodiac-star-sparkle" cx="250" cy="120" r="3" />
                <circle class="zodiac-star-sparkle" cx="860" cy="135" r="3" />
            `
        }
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

    /** Dữ liệu chòm sao của cung đang chọn cho mini-game Stage 3 (hoặc fallback cung mặc định nếu chưa chọn). */
    window.getZodiacConstellation = () => {
        let z = window.currentZodiac;
        // Fallback tự nhiên nếu chưa nhập ngày sinh: chọn cung theo ngày hiện tại hoặc cung thi vị Libra/Taurus
        if (!z || !SIGNS[z.key]) {
            const now = new Date();
            const fallbackKey = getZodiacKey(now.getMonth() + 1, now.getDate()) || 'libra';
            const sg = SIGNS[fallbackKey];
            return {
                key: fallbackKey, name: sg.name, latin: sg.latin, symbol: sg.symbol, range: sg.range, msg: sg.msg,
                close: sg.close, pts: sg.pts.map(p => [p[0], p[1]]),
                edges: sg.edges ? sg.edges.map(e => [e[0], e[1]]) : null,
                svgPath: sg.svgPath || '', isFallback: true
            };
        }
        const sg = SIGNS[z.key];
        return {
            key: z.key, name: sg.name, latin: sg.latin, symbol: sg.symbol, range: sg.range, msg: sg.msg,
            close: sg.close, pts: sg.pts.map(p => [p[0], p[1]]),
            edges: sg.edges ? sg.edges.map(e => [e[0], e[1]]) : null,
            svgPath: sg.svgPath || '', isFallback: false
        };
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
            if (resultEl) resultEl.classList.add('hidden');
            if (!m && !d) safe(() => localStorage.removeItem(STORE_KEY));
            return;
        }
        const sg = SIGNS[key];
        window.currentZodiac = { key, name: sg.name, symbol: sg.symbol, latin: sg.latin, day: d, month: m };
        if (resultEl) {
            const sym = resultEl.querySelector('.zodiac-symbol');
            if (sym) sym.textContent = sg.symbol + '\uFE0E';
            const nm = resultEl.querySelector('.zodiac-name');
            if (nm) nm.textContent = 'Cung ' + sg.name;
            const dt = resultEl.querySelector('.zodiac-dates');
            if (dt) dt.textContent = sg.range;
            const ms = resultEl.querySelector('.zodiac-msg');
            if (ms) ms.textContent = sg.msg;
            resultEl.classList.remove('hidden');
        }
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
