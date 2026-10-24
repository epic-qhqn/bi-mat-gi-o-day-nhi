/**
 * SECRET LETTER & POLAROID MODAL (PHASE 8 & SUB-PHASE 1.3)
 * Typewriter letter revelation on tree canvas,
 * Polaroid 3D flipping card modal with random secret letter deck,
 * Font mode switcher (handwriting vs legible sans-serif).
 */
(function() {
    'use strict';

    // DOM Elements
    const polaroid = document.getElementById('polaroid-card');
    const secretContainer = document.getElementById('secret-letter-container');
    const secretTriggerBtn = document.getElementById('secret-letter-trigger-btn');
    const secretLetterModal = document.getElementById('secret-letter-modal');
    const closeSecretLetterBtn = document.getElementById('close-secret-letter-btn');
    const polaroidBadgeText = document.getElementById('polaroid-badge-text');
    const shuffleBtn = document.getElementById('polaroid-shuffle-btn');

    // =========================================================================
    // 1. TYPEWRITER & MAIN LETTER ON CANVAS
    // =========================================================================
    const typeWriter = (element) => {
        if (!element) return;
        const str = element.innerHTML;
        element.innerHTML = '';
        element.style.display = 'block';

        // Glassmorphism background fade in
        const textContainer = document.getElementById("text");
        if (textContainer) textContainer.classList.add("show");

        let progress = 0;
        const timer = setInterval(() => {
            const current = str.substr(progress, 1);
            if (current === '<') {
                progress = str.indexOf('>', progress) + 1;
            } else {
                progress++;
            }
            element.innerHTML = str.substring(0, progress) + (progress & 1 ? '_' : '');
            if (textContainer) {
                textContainer.scrollTop = textContainer.scrollHeight;
            }
            if (progress >= str.length) {
                clearInterval(timer);
            }
        }, 75);
    };

    const loadContentAndAnimateText = async () => {
        const codeEl = document.getElementById("code");
        if (!codeEl) return;

        const userName = window.currentUserName || (window.gardenState && window.gardenState.userName) || "Bạn";

        try {
            let text = '';
            if (typeof letterContent !== 'undefined') {
                text = letterContent.replace(/\{\{NAME\}\}/g, `<span style="color:#fbb6ce; font-weight:bold;">${userName}</span>`);
            } else {
                throw new Error("Không tìm thấy biến letterContent");
            }

            // Parse markdown using marked (if available) or simple fallback
            let finalHtml = '';
            if (typeof marked !== 'undefined' && marked.parse) {
                const rawHtml = marked.parse(text);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = rawHtml;
                tempDiv.childNodes.forEach(node => {
                    if (node.nodeName === 'P') {
                        if (node.querySelector('img') || node.querySelector('a')) {
                            finalHtml += `<span class="space">${node.innerHTML}</span><br>`;
                        } else {
                            finalHtml += `<span class="say">${node.innerHTML}</span><br><br>`;
                        }
                    } else if (node.nodeName !== '#text') {
                        finalHtml += node.outerHTML;
                    }
                });
            } else {
                finalHtml = text.split('\n\n').map(p => `<span class="say">${p}</span><br><br>`).join('');
            }

            codeEl.innerHTML = finalHtml;
            typeWriter(codeEl);

        } catch (e) {
            console.error("Lỗi tải nội dung thư:", e);
            codeEl.innerHTML = `<span class="say">Xin chào! Dường như file content.js chưa được tải đúng cách.</span><br><br><span class="say">Gợi ý: Kiểm tra lại file content.js nhé.</span>`;
            typeWriter(codeEl);
        }
    };

    // =========================================================================
    // 2. POLAROID MODAL & RANDOM SECRET LETTER DECK
    // =========================================================================
    const updatePolaroidBadge = () => {
        if (!polaroidBadgeText) return;
        if (polaroid && polaroid.classList.contains('flipped')) {
            polaroidBadgeText.textContent = "Chạm để lật mặt trước ↺";
        } else {
            polaroidBadgeText.textContent = "Chạm để lật thư 💌";
        }
    };

    const updatePolaroidLetterContent = () => {
        if (typeof window.getNextRandomLetter === 'function') {
            const letter = window.getNextRandomLetter();
            const contentEl = document.getElementById('random-letter-content');
            const authorEl = document.getElementById('random-letter-author');
            if (contentEl && authorEl) {
                contentEl.textContent = letter.content;
                authorEl.textContent = "- " + letter.author + " -";
            }
        }
    };

    const openSecretLetterModal = () => {
        if (!secretLetterModal) return;
        secretLetterModal.classList.remove('hidden');
        if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
    };

    const closeSecretLetterModal = () => {
        if (!secretLetterModal) return;
        secretLetterModal.classList.add('hidden');
        if (polaroid) {
            polaroid.classList.remove('flipped');
            updatePolaroidBadge();
        }
        syncQuizDialogMode();
        if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
    };

    const revealSecretLetterButton = () => {
        if (secretContainer) {
            secretContainer.classList.remove('hidden');
            secretContainer.classList.add('show');
        }
    };

    const hideSecretLetterButton = () => {
        if (secretContainer) {
            secretContainer.classList.remove('show');
            secretContainer.classList.add('hidden');
        }
    };

    // =========================================================================
    // 3. FONT TOGGLE ENGINE (Handwriting vs Readable)
    // =========================================================================
    const setupFontToggle = () => {
        const fontBtns = [
            document.getElementById('font-toggle-btn'),
            document.getElementById('polaroid-font-btn')
        ];

        const updateFontUI = (isReadable) => {
            if (isReadable) {
                document.body.classList.add('readable-font');
                const mainBtn = document.getElementById('font-toggle-btn');
                if (mainBtn) {
                    mainBtn.classList.add('active');
                    const label = mainBtn.querySelector('.font-label');
                    if (label) label.textContent = 'Font viết tay';
                    const icon = mainBtn.querySelector('.font-icon');
                    if (icon) icon.textContent = '✍️';
                }
            } else {
                document.body.classList.remove('readable-font');
                const mainBtn = document.getElementById('font-toggle-btn');
                if (mainBtn) {
                    mainBtn.classList.remove('active');
                    const label = mainBtn.querySelector('.font-label');
                    if (label) label.textContent = 'Font dễ đọc';
                    const icon = mainBtn.querySelector('.font-icon');
                    if (icon) icon.textContent = 'Aa';
                }
            }
        };

        // Restore saved preference if any
        try {
            const savedFont = localStorage.getItem('user_font_mode');
            if (savedFont === 'readable') {
                updateFontUI(true);
            }
        } catch (_) {}

        fontBtns.forEach(btn => {
            if (!btn) return;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isCurrentlyReadable = document.body.classList.contains('readable-font');
                const nextState = !isCurrentlyReadable;
                updateFontUI(nextState);
                try {
                    localStorage.setItem('user_font_mode', nextState ? 'readable' : 'handwriting');
                } catch (_) {}
                if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
            });
        });
    };

    // =========================================================================
    // 4. FLOWER PERSONALITY QUIZ — "Bạn là bông hoa nào?" (mặt sau thư Polaroid)
    //    4a. DATA  ·  4b. STATE & SCORING (thuần, không đụng DOM)  ·  4c. UI RENDERING
    // =========================================================================

    // ---- 4a. DATA --------------------------------------------------------------
    // points: { <flowerId>: điểm } — flowerId khớp window.flowerProfiles[].id (js/content.js).
    // Thêm câu hỏi mới chỉ cần push thêm 1 object vào mảng này.
    const FLOWER_QUIZ_QUESTIONS = [
        // Câu 1: Nhịp sống & Năng lượng sớm mai
        {
            category: 'Nhịp sống đầu ngày',
            art: { emoji: '🌅☕', tone: 'sun' },
            text: 'Khoảnh khắc mở mắt đón ngày mới, điều gì mang lại cho bạn cảm giác tràn đầy năng lượng nhất?',
            options: [
                { text: 'Một tách trà thơm, ngắm mầm cây đón nắng sớm trong sự tĩnh lặng an nhiên.', points: { lotus: 3, lavender: 2, jasmine: 2, water_lily: 1 } },
                { text: 'Bật một bản nhạc rộn rã, lên kế hoạch cho những dự định mới mẻ và bùng nổ.', points: { sunflower: 3, gerbera: 3, poppy: 2, allium: 2 } },
                { text: 'Tin nhắn hỏi han ấm áp từ người thân, lời dặn dò "hôm nay nhớ ăn sáng nha".', points: { carnation: 3, daisy: 2, baby_breath: 2, peach_blossom: 2 } },
                { text: 'Chuẩn bị một bộ trang phục thanh lịch, tự tin nhìn mình trong gương mỉm cười.', points: { peony: 3, rose: 3, orchid: 2, tulip: 2, magnolia: 1 } }
            ]
        },
        // Câu 2: Giao tế & Khí chất giữa đám đông
        {
            category: 'Giao tế & Bạn bè',
            art: { emoji: '✨🥂', tone: 'blush' },
            text: 'Trong một buổi họp mặt hay sự kiện đông người, bạn thường cảm thấy thoải mái nhất khi...',
            options: [
                { text: 'Là tâm điểm khuấy động tiếng cười, kết nối mọi người xung quanh lại với nhau.', points: { sunflower: 2, poppy: 3, gerbera: 3, allium: 2 } },
                { text: 'Ngồi bên những người bạn thân thiết, tỉ tê trò chuyện sâu sắc và chân thành.', points: { daisy: 3, forget_me_not: 3, baby_breath: 2, camellia: 1 } },
                { text: 'Phong thái đĩnh đạc, giao tiếp chừng mực, tao nhã và để lại ấn tượng khó quên.', points: { orchid: 3, magnolia: 3, tulip: 2, lily: 2 } },
                { text: 'Chu đáo quan sát, chăm lo từ ly nước đến chỗ ngồi cho mọi người cảm thấy ấm cúng.', points: { carnation: 2, marigold: 3, hydrangea: 2, peony: 1 } }
            ]
        },
        // Câu 3: Ngã rẽ 4 phương (Nhánh định hình)
        {
            category: 'Lạc bước vào vườn',
            art: { emoji: '🧭🌿', tone: 'sage' },
            text: 'Đứng trước 4 cánh cổng rẽ nhánh dẫn sâu vào khu vườn bí mật, trực giác mách bảo bạn chọn lối nào?',
            options: [
                { text: '[Lối Mộc] Lối mòn rợp bóng trúc mai, thoảng hương hoa dại mộc mạc và tiếng suối reo.', points: { lotus: 3, jasmine: 3, water_lily: 2, plumeria: 2, daisy: 1 } },
                { text: '[Lối Hồng] Cây cầu gỗ phủ đầy hoa hồng và mẫu đơn dẫn tới tòa lâu đài nguy nga.', points: { rose: 3, peony: 3, tulip: 2, orchid: 2, magnolia: 1 } },
                { text: '[Lối Nắng] Thảo nguyên vàng rực ngập tràn ánh dương, hoa hướng dương và cánh bướm.', points: { sunflower: 3, apricot_blossom: 3, gerbera: 2, poppy: 2, cherry_blossom: 1 } },
                { text: '[Lối Suối] Dòng suối trăng biếc soi bóng bầu trời sao huyền ảo và sắc hoa oải hương.', points: { hydrangea: 3, lavender: 3, forget_me_not: 2, statice: 2, lily: 1 } }
            ]
        },
        // Câu 4: (Kịch bản thích ứng theo lối rẽ của Câu 3)
        {
            category: 'Duyên kỳ ngộ',
            art: { emoji: '🕊️🔮', tone: 'blue' },
            text: 'Đi sâu vào con đường bạn chọn, bạn bất ngờ gặp một điều kỳ diệu đang chờ đón. Bạn sẽ...',
            options: [
                { text: 'Dịu dàng nâng niu, dùng sự chân thành và kiên nhẫn để chăm sóc nâng đỡ.', points: { baby_breath: 3, daisy: 2, plumeria: 3, jasmine: 2 } },
                { text: 'Khám phá bí mật ẩn giấu, tìm hiểu nguồn gốc và giải mã điều kỳ bí ấy.', points: { orchid: 2, allium: 3, poppy: 2, cherry_blossom: 2 } },
                { text: 'Tự tin tiếp nhận, sẵn sàng đảm đương trách nhiệm dẫn dắt và bảo bọc.', points: { peony: 2, rose: 2, magnolia: 3, apricot_blossom: 2 } },
                { text: 'Lắng nghe thông điệp từ trái tim, đồng cảm sâu sắc với vẻ đẹp tâm hồn.', points: { hydrangea: 2, forget_me_not: 2, lavender: 2, statice: 3 } }
            ]
        },
        // Câu 5: Đối diện áp lực & Thử thách
        {
            category: 'Trước giông bão',
            art: { emoji: '⛈️🌧️', tone: 'slate' },
            text: 'Khi deadline hay những biến cố bất ngờ ập đến làm mọi dự định đảo lộn, bạn sẽ...',
            options: [
                { text: 'Tĩnh lặng hít thở sâu, giữ trọn tâm an nhiên: "Sóng gió nào rồi cũng sẽ qua".', points: { lotus: 3, apricot_blossom: 2, water_lily: 3, plumeria: 2 } },
                { text: 'Quyết liệt hành động, phân chia mục tiêu rõ ràng và biến áp lực thành động lực.', points: { peony: 2, rose: 3, magnolia: 2, tulip: 2 } },
                { text: 'Linh hoạt đổi góc nhìn, tìm ra giải pháp sáng tạo bất ngờ mà chưa ai nghĩ tới.', points: { allium: 3, poppy: 2, gerbera: 2, hibiscus: 3 } },
                { text: 'Bảo vệ và động viên tinh thần mọi người, cùng nhau san sẻ không để ai lẻ loi.', points: { carnation: 3, marigold: 2, hydrangea: 2, daisy: 1 } }
            ]
        },
        // Câu 6: Ngôn ngữ của tình yêu
        {
            category: 'Khi trao yêu thương',
            art: { emoji: '💌🕊️', tone: 'rose' },
            text: 'Đối với bạn, điều thiêng liêng nhất tạo nên một mối tình đẹp bền vững là...',
            options: [
                { text: 'Lòng chung thủy son sắt, âm thầm chở che qua thăng trầm năm tháng.', points: { forget_me_not: 3, statice: 3, camellia: 3, lotus: 1 } },
                { text: 'Sự chăm sóc chu đáo từ những điều vụn vặt: bữa cơm ấm, chiếc áo khoác ngày lạnh.', points: { carnation: 3, daisy: 2, marigold: 2, hydrangea: 2 } },
                { text: 'Ngọn lửa đam mê rực cháy, yêu hết mình và cùng nhau tỏa sáng giữa đời.', points: { rose: 3, poppy: 3, sunflower: 2, peach_blossom: 2 } },
                { text: 'Sự thấu hiểu tâm hồn, tôn trọng tự do và cùng nhau hoàn thiện bản thân.', points: { lily: 3, orchid: 2, tulip: 3, water_lily: 1 } }
            ]
        },
        // Câu 7: Khi người bên cạnh gặp chuyện buồn
        {
            category: 'Sự thấu cảm',
            art: { emoji: '🫂🍵', tone: 'warm' },
            text: 'Một người bạn thân gõ cửa nhà bạn với đôi mắt ướt nhòe vì vừa trải qua tổn thương...',
            options: [
                { text: 'Không hỏi dồn, chỉ im lặng ôm bạn thật chặt và nấu một bát cháo nóng thơm bùi.', points: { carnation: 2, daisy: 3, baby_breath: 3, plumeria: 2 } },
                { text: 'Lắng nghe hết mực, đứng về phía bạn và kiên quyết bảo vệ bạn trước bất công.', points: { rose: 2, peony: 3, magnolia: 2, marigold: 2 } },
                { text: 'Đặt mình vào nỗi đau ấy, cùng khóc cùng sẻ chia để bạn vơi bớt tủi thân.', points: { hydrangea: 3, forget_me_not: 2, lavender: 2, lily: 2 } },
                { text: 'Kéo bạn đứng dậy, đưa bạn đi dạo hít thở khí trời và giúp bạn tìm lại nụ cười.', points: { sunflower: 2, gerbera: 3, poppy: 2, peach_blossom: 2 } }
            ]
        },
        // Câu 8: Khí chất độc bản của bạn
        {
            category: 'Khí chất của bạn',
            art: { emoji: '🎨🪞', tone: 'violet' },
            text: 'Điều gì khiến bạn trở nên độc nhất vô nhị và luôn được mọi người trân quý?',
            options: [
                { text: 'Sự sáng tạo phóng khoáng, góc nhìn nghệ thuật độc đáo không rập khuôn.', points: { allium: 3, poppy: 2, hibiscus: 3, cherry_blossom: 2 } },
                { text: 'Cốt cách thanh bạch, chuẩn mực đoan trang và tấm lòng trong sáng như gương.', points: { lily: 3, lotus: 3, magnolia: 2, jasmine: 2 } },
                { text: 'Nụ cười tỏa nắng, tấm lòng thơm thảo và năng lượng chữa lành cho mọi người.', points: { daisy: 2, sunflower: 3, gerbera: 2, baby_breath: 2 } },
                { text: 'Sự độc lập, tự chủ và phong thái kiêu hãnh của một người phụ nữ hiện đại.', points: { tulip: 3, orchid: 3, rose: 2, apricot_blossom: 2 } }
            ]
        },
        // Câu 9: Chiếc rương kỷ niệm bí mật
        {
            category: 'Ký ức & Tri ân',
            art: { emoji: '📦🗝️', tone: 'amber' },
            text: 'Nếu có một chiếc rương cất giữ những báu vật tinh thần quý giá nhất đời bạn, trong đó sẽ có...',
            options: [
                { text: 'Những cánh thư tay cũ, tấm ảnh ố vàng và kỷ vật tình thân đong đầy hồi ức.', points: { forget_me_not: 3, statice: 3, camellia: 3, carnation: 1 } },
                { text: 'Chiếc vé máy bay đến những vùng đất mới và cuốn nhật ký của tuổi trẻ rực rỡ.', points: { cherry_blossom: 3, poppy: 2, allium: 2, water_lily: 2 } },
                { text: 'Những tấm bằng khen, kỷ niệm chương ghi dấu bao nỗ lực kiên cường vượt khó.', points: { apricot_blossom: 3, magnolia: 3, peony: 2, orchid: 2 } },
                { text: 'Một cành hoa thơm sấy khô, chiếc chuông gió nhỏ và những lời chúc bình an.', points: { lavender: 3, jasmine: 3, baby_breath: 2, lotus: 1 } }
            ]
        },
        // Câu 10: Lời tự tình gửi đến chính mình (20/10)
        {
            category: 'Gửi đóa hoa rạng rỡ',
            art: { emoji: '💐✨', tone: 'gold' },
            text: 'Nhân ngày Phụ nữ Việt Nam 20/10, lời chúc đẹp nhất bạn muốn nhắn nhủ đến chính mình là...',
            options: [
                { text: '"Hãy luôn kiêu hãnh và yêu thương bản thân, bạn xứng đáng với những điều tuyệt vời nhất!"', points: { rose: 3, peony: 3, orchid: 2, tulip: 2 } },
                { text: '"Mỗi ngày thức dậy đều là một niềm vui, hãy giữ mãi nụ cười rạng ngời và hồn nhiên này nhé!"', points: { sunflower: 2, gerbera: 3, daisy: 2, peach_blossom: 3 } },
                { text: '"Bình an trong tâm hồn là thứ tài sản quý giá nhất, hãy sống an nhiên và hạnh phúc."', points: { lotus: 3, water_lily: 2, plumeria: 3, jasmine: 2 } },
                { text: '"Cảm ơn bạn vì đã luôn kiên cường, bền bỉ và không bao giờ ngừng tỏa hương thơm."', points: { apricot_blossom: 2, magnolia: 2, camellia: 2, carnation: 2, statice: 2 } }
            ]
        }
    ];

    // Nhánh kịch bản thích ứng linh hoạt cho Câu 4 dựa trên lựa chọn Câu 3
    const ADAPTIVE_BRANCH_QUESTIONS = [
        {
            category: 'Duyên kỳ ngộ · Lối Mộc',
            art: { emoji: '🕊️🌿', tone: 'sage' },
            text: 'Bước trên Lối Mộc sương sớm, bạn thấy một chú chim non lạc mẹ đang run rẩy bên khóm hoa dại. Bạn sẽ...',
            options: [
                { text: 'Nhẹ nhàng bế chú chim sưởi ấm, tìm lại tổ trên cành cao cho nó.', points: { lotus: 3, jasmine: 3, baby_breath: 2, daisy: 2 } },
                { text: 'Quan sát tỉ mỉ chung quanh, tìm dấu vết chim mẹ và bảo vệ từ xa.', points: { orchid: 2, camellia: 3, tulip: 2, plumeria: 2 } },
                { text: 'Tự tay dựng một chiếc tổ nhỏ ấm áp dưới tán lá râm mát che mưa nắng.', points: { carnation: 3, marigold: 2, hydrangea: 2, water_lily: 2 } },
                { text: 'Khẽ huýt sáo một giai điệu quen thuộc để gọi đàn chim mẹ quay về.', points: { peach_blossom: 2, cherry_blossom: 3, allium: 2, poppy: 1 } }
            ]
        },
        {
            category: 'Duyên kỳ ngộ · Lối Hồng',
            art: { emoji: '🏰🗝️', tone: 'rose' },
            text: 'Đứng trước cánh cổng Lâu Đài Hoa Hồng tráng lệ, người giữ cổng trao bạn chiếc chìa khóa cổ bằng bạc. Bạn sẽ...',
            options: [
                { text: 'Tự tin bước qua đại sảnh, sẵn sàng đón nhận thử thách để tỏa sáng.', points: { peony: 3, rose: 3, magnolia: 2, tulip: 2 } },
                { text: 'Trân trọng mở căn phòng thư viện cổ kính, tìm kiếm tri thức và điều huyền bí.', points: { orchid: 3, lily: 2, allium: 2, magnolia: 2 } },
                { text: 'Mang theo chìa khóa mở khu vườn thượng uyển mời tất cả bạn bè vào cùng chung vui.', points: { sunflower: 2, gerbera: 3, carnation: 2, peach_blossom: 2 } },
                { text: 'Lặng ngắm kiến trúc tuyệt mỹ, chiêm nghiệm nét đẹp vượt thời gian của tòa thành.', points: { camellia: 3, lotus: 2, statice: 2, lavender: 2 } }
            ]
        },
        {
            category: 'Duyên kỳ ngộ · Lối Nắng',
            art: { emoji: '🦋🌻', tone: 'sun' },
            text: 'Giữa Thảo Nguyên Nắng vàng rực rỡ, một cơn gió ấm mang theo cánh bướm ngũ sắc lượn quanh bạn. Bạn sẽ...',
            options: [
                { text: 'Đưa tay đón lấy cánh bướm, cười giòn tan và cùng nó khiêu vũ dưới ánh mặt trời.', points: { sunflower: 3, gerbera: 3, poppy: 2, peach_blossom: 2 } },
                { text: 'Lấy máy ảnh ghi lại khoảnh khắc rực rỡ, lưu giữ vẻ đẹp thanh xuân bất tận.', points: { cherry_blossom: 3, apricot_blossom: 2, allium: 2, tulip: 2 } },
                { text: 'Dừng chân cắm một nhành hoa thơm, cảm tạ sự trù phú và kỳ diệu của đất trời.', points: { lotus: 2, plumeria: 3, water_lily: 2, daisy: 2 } },
                { text: 'Hái những bông hoa rực rỡ nhất kết thành vòng hoa tặng người mình thương quý.', points: { carnation: 2, marigold: 3, baby_breath: 2, rose: 2 } }
            ]
        },
        {
            category: 'Duyên kỳ ngộ · Lối Suối',
            art: { emoji: '🌌🪻', tone: 'blue' },
            text: 'Bên Dòng Suối Trăng biếc lấp lánh phản chiếu ngàn sao, một viên pha lê phát sáng dưới đáy nước. Bạn sẽ...',
            options: [
                { text: 'Khẽ lội xuống làn nước mát, nâng niu viên pha lê lắng nghe âm vang vũ trụ.', points: { hydrangea: 3, lavender: 3, water_lily: 2, forget_me_not: 2 } },
                { text: 'Để viên pha lê tỏa sáng tự nhiên dưới lòng suối, trân trọng nét đẹp nguyên sơ.', points: { lotus: 3, jasmine: 2, statice: 3, plumeria: 2 } },
                { text: 'Cầu nguyện một điều ước chân thành cho người mình yêu quý và gia đình.', points: { carnation: 2, lily: 3, forget_me_not: 3, marigold: 2 } },
                { text: 'Tìm hiểu quy luật khúc xạ ánh sáng huyền ảo, chia sẻ bí mật này với tri kỷ.', points: { orchid: 2, allium: 3, magnolia: 2, poppy: 1 } }
            ]
        }
    ];

    const getActiveQuestion = (state, index) => {
        if (index === 3) {
            const branchChoice = (state && state.answers && state.answers[2] !== undefined) ? state.answers[2] : 0;
            return ADAPTIVE_BRANCH_QUESTIONS[branchChoice] || FLOWER_QUIZ_QUESTIONS[3];
        }
        return FLOWER_QUIZ_QUESTIONS[index];
    };

    // Nhãn 3 dòng chi tiết ↔ khóa trong flowerProfiles[].checklist
    const FLOWER_QUIZ_DETAIL_ROWS = [
        { key: 'friend',   label: 'Nét duyên ngày thường' },
        { key: 'love',     label: 'Khi trao yêu thương' },
        { key: 'pressure', label: 'Khi đối diện âu lo' }
    ];

    // Dữ liệu kết quả = window.flowerProfiles (js/flowers-data.js). Dự phòng nếu chưa tải.
    const FLOWER_QUIZ_FALLBACK_RESULT = {
        id: 'lotus', emoji: '🪷', petalColor: '#D47A88',
        title: 'Bạn là đóa Sen Lụa thanh tao.',
        quote: 'Gần bùn chẳng vướng bụi trần, thơm ngát dịu dàng.',
        traits: ['Thanh cao', 'Dịu dàng', 'Tâm hồn thuần khiết'],
        match: [{ icon: '🌼', name: 'Cúc họa mi', desc: 'Cùng mang nét đẹp bình dị, thanh tao.' }],
        clash: [{ icon: '🌵', name: 'Gai nhọn', desc: 'Dễ làm tổn thương vẻ mềm mại, e ấp.' }],
        checklist: { friend: '...', love: '...', pressure: '...' }
    };
    const getFlowerResults = () => (Array.isArray(window.flowerProfiles) && window.flowerProfiles.length)
        ? window.flowerProfiles
        : [FLOWER_QUIZ_FALLBACK_RESULT];

    // ---- 4b. STATE & SCORING (pure functions) ----------------------------------
    // state = { questions, answers: [chỉ số đáp án đã chọn cho từng câu] } — điểm luôn tính lại từ answers.
    const createQuizState = (questions) => ({ questions, answers: [] });
    const getQuizIndex = (state) => state.answers.length;
    const isQuizFinished = (state) => state.answers.length >= state.questions.length;

    const answerQuestion = (state, optionIndex) => {
        if (isQuizFinished(state)) return state;
        const currentQ = getActiveQuestion(state, getQuizIndex(state));
        if (!currentQ || !currentQ.options) return state;
        const options = currentQ.options;
        if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= options.length) return state;
        return { ...state, answers: [...state.answers, optionIndex] };
    };
    const goBackOneQuestion = (state) =>
        state.answers.length ? { ...state, answers: state.answers.slice(0, -1) } : state;

    const computeQuizScores = (state) => {
        const scores = {};
        state.answers.forEach((optionIndex, questionIndex) => {
            const q = getActiveQuestion(state, questionIndex);
            if (!q || !q.options || !q.options[optionIndex]) return;
            const points = q.options[optionIndex].points || {};
            Object.keys(points).forEach((id) => { scores[id] = (scores[id] || 0) + points[id]; });
        });
        return scores;
    };

    // Điểm cao nhất thắng; ưu tiên tương thích nhánh rẽ Câu 3 khi hòa điểm
    const pickWinningResult = (scores, results, state) => {
        let best = results[0];
        let bestScore = -1;

        const branchFamilies = [
            ['lotus', 'jasmine', 'water_lily', 'plumeria', 'camellia', 'daisy', 'baby_breath'],
            ['rose', 'peony', 'orchid', 'tulip', 'magnolia', 'carnation'],
            ['sunflower', 'gerbera', 'poppy', 'allium', 'apricot_blossom', 'peach_blossom', 'cherry_blossom'],
            ['hydrangea', 'lavender', 'forget_me_not', 'statice', 'marigold', 'lily', 'hibiscus']
        ];
        const branchIdx = (state && state.answers && state.answers[2] !== undefined) ? state.answers[2] : null;
        const favoredFamily = (branchIdx !== null && branchFamilies[branchIdx]) ? branchFamilies[branchIdx] : [];

        results.forEach((r) => {
            let sc = scores[r.id] || 0;
            if (favoredFamily.includes(r.id)) {
                sc += 0.05; // Ưu tiên nhẹ nhàng để phá vỡ thế hòa điểm theo đúng hướng rẽ tâm hồn
            }
            if (sc > bestScore) {
                best = r;
                bestScore = sc;
            }
        });
        return best;
    };

    // ---- 4c. UI RENDERING ------------------------------------------------------
    const QUIZ_FADE_MS = 180;
    let quizState = createQuizState(FLOWER_QUIZ_QUESTIONS);
    let quizRoot = null;
    let quizBusy = false;      // chặn bấm đúp trong lúc chuyển cảnh
    let backView = 'quiz';     // 'quiz' | 'letter' — nội dung mặt sau thư

    const prefersReducedMotion = () =>
        !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    // Tạo phần tử bằng textContent (không dùng innerHTML → an toàn XSS)
    const el = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    };
    const pad2 = (n) => String(n).padStart(2, '0');
    const tapSfx = () => { if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX(); };

    // Phóng to thẻ khi mặt sau đang là trắc nghiệm
    const syncQuizDialogMode = () => {
        const dialog = document.querySelector('.secret-letter-dialog');
        if (!dialog) return;
        const flipped = !!(polaroid && polaroid.classList.contains('flipped'));
        dialog.classList.toggle('secret-letter-dialog--quiz', flipped && backView === 'quiz');
    };

    const setBackView = (view) => {
        backView = view;
        const letterPane = document.getElementById('polaroid-letter-pane');
        if (quizRoot) quizRoot.hidden = view !== 'quiz';
        if (letterPane) letterPane.hidden = view !== 'letter';
        if (view === 'letter') updatePolaroidLetterContent();
        syncQuizDialogMode();
    };

    const mountStage = (stage) => {
        stage.classList.add('flower-quiz__stage');
        quizRoot.replaceChildren(stage);
        quizRoot.scrollTop = 0;
    };

    // Fade-out stage hiện tại → dựng stage mới (fade-in bằng CSS animation)
    const transitionTo = (buildStage) => {
        if (!quizRoot || quizBusy) return;
        const current = quizRoot.firstElementChild;
        if (!current || prefersReducedMotion()) { mountStage(buildStage()); return; }
        quizBusy = true;
        current.classList.add('flower-quiz__stage--leaving');
        setTimeout(() => { mountStage(buildStage()); quizBusy = false; }, QUIZ_FADE_MS);
    };

    const buildLinkButton = (label, onClick) => {
        const btn = el('button', 'flower-quiz__link', label);
        btn.type = 'button';
        btn.addEventListener('click', onClick);
        return btn;
    };

    const restartQuiz = () => {
        quizState = createQuizState(FLOWER_QUIZ_QUESTIONS);
        transitionTo(buildCurrentStage);
    };

    const handleAnswer = (optionIndex) => {
        if (quizBusy) return;
        quizState = answerQuestion(quizState, optionIndex);
        tapSfx();
        transitionTo(buildCurrentStage);
    };

    const handleBack = () => {
        if (quizBusy || !getQuizIndex(quizState)) return;
        quizState = goBackOneQuestion(quizState);
        tapSfx();
        transitionTo(buildCurrentStage);
    };

    const buildQuestionStage = () => {
        const index = getQuizIndex(quizState);
        const total = quizState.questions.length;
        const question = getActiveQuestion(quizState, index);
        const stage = el('div');

        const header = el('div', 'flower-quiz__header');
        const back = el('button', 'flower-quiz__back', '←');
        back.type = 'button';
        back.setAttribute('aria-label', 'Câu trước');
        back.disabled = index === 0;
        back.addEventListener('click', handleBack);
        const progress = el('div', 'flower-quiz__progress');
        const bar = el('div', 'flower-quiz__progress-bar');
        bar.style.width = Math.round((index / total) * 100) + '%';
        progress.appendChild(bar);
        header.append(back, progress, el('span', 'flower-quiz__counter', `${pad2(index + 1)} / ${pad2(total)}`));

        const art = el('div', 'flower-quiz__art', question.art ? question.art.emoji : '🌸');
        if (question.art && question.art.tone) art.dataset.tone = question.art.tone;
        art.setAttribute('aria-hidden', 'true');

        const options = el('div', 'flower-quiz__options');
        question.options.forEach((opt, i) => {
            const btn = el('button', 'flower-quiz__option');
            btn.type = 'button';
            btn.append(el('span', 'flower-quiz__option-key', String.fromCharCode(65 + i)), el('span', 'flower-quiz__option-text', opt.text));
            btn.addEventListener('click', () => handleAnswer(i));
            options.appendChild(btn);
        });

        stage.append(
            header, art,
            el('p', 'flower-quiz__category', `${question.category} · Câu ${index + 1}`),
            el('h3', 'flower-quiz__question', question.text),
            options,
            el('p', 'flower-quiz__hint', 'Chọn đại theo bản năng, đừng nghĩ nhiều nha.'),
            buildLinkButton('💌 Đọc lời chúc', () => { tapSfx(); setBackView('letter'); })
        );
        return stage;
    };

    const buildCompatColumn = (modifier, heading, items) => {
        const col = el('div', `flower-quiz__compat-col flower-quiz__compat-col--${modifier}`);
        col.appendChild(el('h4', 'flower-quiz__compat-heading', heading));
        (items || []).forEach((item) => {
            const row = el('div', 'flower-quiz__compat-item');
            const text = el('div');
            text.append(el('span', 'flower-quiz__compat-name', item.name), el('span', 'flower-quiz__compat-desc', item.desc));
            row.append(el('span', 'flower-quiz__compat-icon', item.icon), text);
            col.appendChild(row);
        });
        return col;
    };

    // CTA: mở thẻ bưu thiếp có sẵn (boarding-pass-modal) với đúng bông hoa vừa ra
    const openResultCard = (result) => {
        const idx = getFlowerResults().findIndex((r) => r.id === result.id);
        if (idx >= 0) window.currentFlowerIndex = idx;
        closeSecretLetterModal();
        if (typeof window.openBoardingPassModal === 'function') window.openBoardingPassModal();
    };

    const buildResultStage = () => {
        const result = pickWinningResult(computeQuizScores(quizState), getFlowerResults(), quizState);
        const stage = el('div');

        const medallion = el('div', 'flower-quiz__medallion', result.emoji || '🌸');
        if (result.petalColor) medallion.style.setProperty('--fq-medal', result.petalColor);
        medallion.setAttribute('aria-hidden', 'true');

        const badges = el('div', 'flower-quiz__badges');
        (result.traits || []).slice(0, 3).forEach((t) => badges.appendChild(el('span', 'flower-quiz__badge', t)));

        const compat = el('div', 'flower-quiz__compat');
        compat.append(
            buildCompatColumn('match', 'Bạn hợp cạ với', result.match),
            buildCompatColumn('clash', 'Hơi lệch sóng với', result.clash)
        );

        const rows = el('div', 'flower-quiz__rows');
        FLOWER_QUIZ_DETAIL_ROWS.forEach(({ key, label }) => {
            const row = el('div', 'flower-quiz__row');
            row.append(el('span', 'flower-quiz__row-label', label), el('span', 'flower-quiz__row-text', (result.checklist || {})[key] || ''));
            rows.appendChild(row);
        });

        const stamp = el('div', 'flower-quiz__stamp');
        stamp.append(
            el('span', 'flower-quiz__stamp-title', 'BƯU CHÍNH VIỆT NAM'),
            el('strong', 'flower-quiz__stamp-value', '20/10đ'),
            el('span', 'flower-quiz__stamp-sub', 'HƯƠNG ĐỒNG NỘI')
        );
        const postmark = el('div', 'flower-quiz__postmark');
        postmark.append(el('span', null, '20/10 NÉT DUYÊN'));
        stamp.appendChild(postmark);
        const footer = el('div', 'flower-quiz__footer');
        footer.append(stamp, el('span', 'flower-quiz__meta', 'VN-2010 · THƯ TÌNH ĐỒNG NỘI'));

        const cta = el('button', 'flower-quiz__cta', 'Tạo thẻ kết quả của bạn ↓');
        cta.type = 'button';
        cta.addEventListener('click', () => openResultCard(result));

        const actions = el('div', 'flower-quiz__actions');
        actions.append(
            buildLinkButton('↺ Làm lại', () => { tapSfx(); restartQuiz(); }),
            buildLinkButton('💌 Đọc lời chúc', () => { tapSfx(); setBackView('letter'); })
        );

        stage.append(
            el('p', 'flower-quiz__eyebrow', 'YOUR FLOWER ID · 20/10 EDITION'),
            el('h3', 'flower-quiz__result-title', result.title),
            el('p', 'flower-quiz__result-quote', result.quote),
            medallion, badges, compat, rows, footer, cta, actions
        );
        return stage;
    };

    function buildCurrentStage() {
        return isQuizFinished(quizState) ? buildResultStage() : buildQuestionStage();
    }

    const initFlowerQuiz = () => {
        quizRoot = document.getElementById('flower-quiz');
        if (!quizRoot) return;
        // Mọi thao tác trong trắc nghiệm KHÔNG được làm lật thẻ Polaroid
        quizRoot.addEventListener('click', (e) => e.stopPropagation());
        mountStage(buildCurrentStage());

        const returnBtn = document.getElementById('polaroid-quiz-return-btn');
        if (returnBtn) {
            returnBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                tapSfx();
                setBackView('quiz');
            });
        }
        setBackView('quiz');
    };

    // =========================================================================
    // 5. INITIALIZATION & EVENT LISTENERS
    // =========================================================================
    const initSecretLetter = () => {
        if (secretTriggerBtn) {
            secretTriggerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openSecretLetterModal();
            });
        }

        if (closeSecretLetterBtn) {
            closeSecretLetterBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeSecretLetterModal();
            });
        }

        if (secretLetterModal) {
            secretLetterModal.addEventListener('click', (e) => {
                if (e.target === secretLetterModal) {
                    closeSecretLetterModal();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && secretLetterModal && !secretLetterModal.classList.contains('hidden')) {
                closeSecretLetterModal();
            }
        });

        if (polaroid) {
            polaroid.addEventListener('click', (e) => {
                // Ignore clicks on font or shuffle buttons inside card
                if (e.target && (e.target.closest('#polaroid-font-btn') || e.target.closest('#polaroid-shuffle-btn') || e.target.closest('#polaroid-quiz-return-btn') || e.target.closest('#flower-quiz'))) return;

                e.stopPropagation();
                const willBeFlipped = !polaroid.classList.contains('flipped');
                if (willBeFlipped && backView === 'letter') {
                    updatePolaroidLetterContent();
                }
                polaroid.classList.toggle('flipped');
                syncQuizDialogMode();
                updatePolaroidBadge();
                if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
            });
        }

        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const contentEl = document.getElementById('random-letter-content');
                const authorEl = document.getElementById('random-letter-author');
                if (contentEl && authorEl) {
                    contentEl.style.transition = 'opacity 0.2s ease';
                    authorEl.style.transition = 'opacity 0.2s ease';
                    contentEl.style.opacity = '0';
                    authorEl.style.opacity = '0';
                    setTimeout(() => {
                        updatePolaroidLetterContent();
                        contentEl.style.opacity = '1';
                        authorEl.style.opacity = '1';
                    }, 220);
                } else {
                    updatePolaroidLetterContent();
                }
                if (typeof window.playChimeSFX !== 'undefined') window.playChimeSFX();
            });
        }

        setupFontToggle();
        initFlowerQuiz();
    };

    // Public API
    window.openSecretLetterModal = openSecretLetterModal;
    window.closeSecretLetterModal = closeSecretLetterModal;
    window.revealSecretLetterButton = revealSecretLetterButton;
    window.hideSecretLetterButton = hideSecretLetterButton;
    window.updatePolaroidLetterContent = updatePolaroidLetterContent;
    window.typeWriter = typeWriter;
    window.loadContentAndAnimateText = loadContentAndAnimateText;
    window.initSecretLetter = initSecretLetter;
    window.restartFlowerQuiz = () => { if (quizRoot) restartQuiz(); };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecretLetter);
    } else {
        initSecretLetter();
    }
})();
