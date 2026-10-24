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
        // Câu 1: Khởi động ngày mới
        {
            category: 'Sớm mai thức giấc',
            art: { emoji: '🌅☕', tone: 'sun' },
            text: 'Mở mắt đón ngày mới, điều gì giúp bạn khởi động một ngày nhẹ nhõm và vui vẻ nhất?',
            options: [
                { text: 'Ngủ nướng thêm một chút, rồi thong thả pha ly nước ấm cho tỉnh táo.', points: { lotus: 3, jasmine: 2, lavender: 2, water_lily: 1 } },
                { text: 'Bật ngay playlist bài hát yêu thích, vừa chuẩn bị vừa lắc lư theo nhạc.', points: { sunflower: 3, gerbera: 3, poppy: 2, allium: 2 } },
                { text: 'Thấy tin nhắn hỏi han ấm áp: "Dậy chưa, nhớ ăn sáng đầy đủ nha!".', points: { carnation: 3, daisy: 2, baby_breath: 2, peach_blossom: 2 } },
                { text: 'Mặc một bộ đồ ưng ý, xịt chút hương thơm dịu rồi tự tin bước ra cửa.', points: { peony: 3, rose: 3, orchid: 2, tulip: 2, magnolia: 1 } }
            ]
        },
        // Câu 2: Tụ tập bạn bè
        {
            category: 'Hẹn hò tụ tập',
            art: { emoji: '✨🥂', tone: 'blush' },
            text: 'Trong một buổi cà phê hay tụ tập đông đủ bạn bè, bạn thường là người...',
            options: [
                { text: 'Ném ra mấy câu đùa hài hước, khuấy động không khí cho cả bàn rôm rả.', points: { sunflower: 2, poppy: 3, gerbera: 3, allium: 3 } },
                { text: 'Ngồi bên đứa bạn thân, vừa ăn vặt vừa tỉ tê mấy chuyện nhỏ xíu trên trời dưới biển.', points: { daisy: 3, forget_me_not: 3, baby_breath: 2, camellia: 1 } },
                { text: 'Nói chuyện chừng mực, điềm đạm nhưng chia sẻ câu nào là thấm câu đó.', points: { orchid: 3, magnolia: 3, tulip: 2, lily: 2 } },
                { text: 'Để ý chỗ ngồi, gọi món cho mọi người và lo việc chia tiền sòng phẳng.', points: { carnation: 2, marigold: 3, hydrangea: 2, peony: 1 } }
            ]
        },
        // Câu 3: Ngã rẽ không gian (Nhánh 1)
        {
            category: 'Góc trốn cuối tuần',
            art: { emoji: '🧭🌿', tone: 'sage' },
            text: 'Một buổi chiều rảnh rỗi muốn trốn khỏi sự ồn ào của phố xá, bạn sẽ chọn ghé vào đâu?',
            options: [
                { text: '[Góc Mộc] Quán nhỏ yên tĩnh nhiều cây xanh, bàn gỗ mộc bên khung cửa sổ ngắm mưa bay.', points: { lotus: 3, jasmine: 3, water_lily: 2, plumeria: 2, daisy: 1 } },
                { text: '[Góc Hoa] Tiệm trà hoa phong cách thanh lịch, thơm nức mùi tinh dầu và bánh nướng.', points: { rose: 3, peony: 3, tulip: 2, orchid: 2, magnolia: 1 } },
                { text: '[Góc Nắng] Quán cà phê sân thượng ngập nắng gió, view nhìn ra toàn cảnh thành phố.', points: { sunflower: 3, apricot_blossom: 3, gerbera: 2, poppy: 2, cherry_blossom: 1 } },
                { text: '[Góc Mơ] Tiệm sách ấm cúng tone pastel dịu mát, bật nhạc lo-fi nhẹ tênh êm dịu.', points: { hydrangea: 3, lavender: 3, forget_me_not: 2, statice: 2, lily: 1 } }
            ]
        },
        // Câu 4: (Thích ứng theo không gian bạn chọn ở Câu 3)
        {
            category: 'Bất ngờ nho nhỏ',
            art: { emoji: '🕊️🎁', tone: 'blue' },
            text: 'Tại góc không gian bạn vừa chọn, bạn để ý thấy một điều thú vị...',
            options: [
                { text: 'Một chậu cây nhỏ xinh xắn đang đâm chồi, bạn khẽ mỉm cười và chụp lại một tấm ảnh.', points: { baby_breath: 3, daisy: 2, plumeria: 3, jasmine: 2 } },
                { text: 'Cuốn sổ tay bìa da cổ điển ai đó để quên, bên trong vẽ những phác thảo rất có gu.', points: { orchid: 2, allium: 3, poppy: 2, cherry_blossom: 2 } },
                { text: 'Chiếc gương xinh xắn có ánh đèn vàng ấm, soi vào thấy visual hôm nay thật có nét.', points: { peony: 2, rose: 2, magnolia: 3, apricot_blossom: 2 } },
                { text: 'Một bài nhạc xưa bỗng cất lên, gợi lại kỷ niệm êm đềm với một người bạn cũ.', points: { hydrangea: 2, forget_me_not: 2, lavender: 2, statice: 3 } }
            ]
        },
        // Câu 5: Khi deadline dí tới chân
        {
            category: 'Đối diện áp lực',
            art: { emoji: '⏰🌧️', tone: 'slate' },
            text: 'Khi mọi thứ dồn dập đổ ập tới cùng lúc khiến bạn hơi ngợp, phản xạ thật nhất của bạn là...',
            options: [
                { text: 'Hít sâu một hơi, pha ly trà hoặc rửa mặt cho mát rồi làm từng việc một.', points: { lotus: 3, apricot_blossom: 2, water_lily: 3, plumeria: 2 } },
                { text: 'Bật chế độ "chiến", tập trung cao độ dọn sạch từng task một cách dứt khoát.', points: { peony: 2, rose: 3, magnolia: 2, tulip: 2 } },
                { text: 'Thở dài một cái rồi tìm cách làm nhanh gọn, thông minh hơn thay vì cắm đầu làm mò.', points: { allium: 3, poppy: 2, gerbera: 2, hibiscus: 3 } },
                { text: 'Tự nhủ: "Xong quả này là tự thưởng một bữa lẩu/ly trà sữa full topping!".', points: { carnation: 3, marigold: 2, hydrangea: 2, daisy: 1 } }
            ]
        },
        // Câu 6: Khi bạn thân buồn
        {
            category: 'Khi bạn thân khóc',
            art: { emoji: '🫂🍵', tone: 'warm' },
            text: 'Đứa bạn thân nhắn tin: "Tao buồn quá mày ơi...". Phản ứng tức thì của bạn là...',
            options: [
                { text: 'Mua ngay đồ ăn hoặc ly trà sữa ghé qua nhà nó, ngồi im lắng nghe nó xả hết ấm ức.', points: { carnation: 2, daisy: 3, baby_breath: 3, plumeria: 2 } },
                { text: 'Bênh bạn trước đã: "Đứa nào làm mày buồn, nói nghe coi tao xử cho!".', points: { rose: 2, peony: 3, magnolia: 2, marigold: 2 } },
                { text: 'Không phán xét, chỉ ôm một cái rồi bảo: "Buồn thì cứ khóc cho đã đi, có tao ở đây rồi".', points: { hydrangea: 3, forget_me_not: 2, lavender: 2, lily: 2 } },
                { text: 'Lôi nó dậy đi dạo mát, hít thở khí trời ăn uống linh tinh cho nhẹ đầu.', points: { sunflower: 2, gerbera: 3, poppy: 2, peach_blossom: 2 } }
            ]
        },
        // Câu 7: Tự thưởng bản thân
        {
            category: 'Nuông chiều chính mình',
            art: { emoji: '🛍️🍰', tone: 'rose' },
            text: 'Sau một tuần làm việc chăm chỉ, cách bạn tự thưởng cho bản thân để thấy vui cả ngày là...',
            options: [
                { text: 'Mua một món đồ xinh xắn mình thích từ lâu mà bữa giờ cứ đắn đo.', points: { rose: 3, peony: 2, tulip: 2, orchid: 2 } },
                { text: 'Đi ăn một món thật ngon cùng người thương hoặc người thân trong gia đình.', points: { carnation: 3, marigold: 2, peach_blossom: 3, daisy: 1 } },
                { text: 'Mua một bó hoa tươi cắm vào lọ đặt ở bàn làm việc cho thơm và xinh.', points: { cherry_blossom: 3, baby_breath: 2, camellia: 2, lotus: 2 } },
                { text: 'Tắt hết chuông thông báo, ngủ một giấc thật sâu không mộng mị.', points: { lavender: 3, water_lily: 3, jasmine: 2, plumeria: 2 } }
            ]
        },
        // Câu 8: Ngã rẽ nạp năng lượng (Nhánh 2)
        {
            category: 'Tự do 24 giờ',
            art: { emoji: '🎈🏝️', tone: 'violet' },
            text: 'Nếu được tặng trọn vẹn một ngày không vướng bận việc gì, bạn sẽ dành 24 giờ đó để...',
            options: [
                { text: 'Nằm dài ở nhà, cày phim, đọc sách, ăn món mình tự nấu mà không cần nhìn đồng hồ.', points: { lotus: 2, jasmine: 2, lavender: 3, water_lily: 2 } },
                { text: 'Lên đồ thật đẹp, đi dạo những góc phố quen và ghé vào những cửa hàng thú vị.', points: { tulip: 3, orchid: 2, rose: 2, magnolia: 2 } },
                { text: 'Gặp gỡ những người mình yêu quý, cười nói rôm rả từ sáng tới tối mịt.', points: { sunflower: 3, gerbera: 3, allium: 2, peach_blossom: 2 } },
                { text: 'Xách balo đi đến một nơi xa lạ, hít thở không khí mới toanh để refresh bản thân.', points: { poppy: 3, cherry_blossom: 2, apricot_blossom: 2, hibiscus: 3 } }
            ]
        },
        // Câu 9: Phong cách cá nhân
        {
            category: 'Gu của bạn',
            art: { emoji: '👗👒', tone: 'amber' },
            text: 'Phong cách hoặc thói quen nào khiến người xung quanh hay nhớ đến bạn nhất?',
            options: [
                { text: 'Giản dị, thoải mái nhưng lúc nào cũng gọn gàng, thơm tho và dễ mến.', points: { daisy: 3, baby_breath: 3, jasmine: 2, plumeria: 2 } },
                { text: 'Có gu riêng rõ rệt, chỉn chu từ trang phục đến phụ kiện nhỏ xíu.', points: { orchid: 3, peony: 3, rose: 2, tulip: 2 } },
                { text: 'Nụ cười tươi tắn và năng lượng ấm áp, hễ thấy mặt là thấy vui.', points: { sunflower: 3, gerbera: 3, peach_blossom: 2, carnation: 1 } },
                { text: 'Đôi mắt biết lắng nghe, nói chuyện điềm đạm và tinh tế trong từng cử chỉ.', points: { lily: 3, lotus: 2, camellia: 3, statice: 2 } }
            ]
        },
        // Câu 10: Ngôn ngữ tình cảm
        {
            category: 'Cách bạn yêu',
            art: { emoji: '💌🕊️', tone: 'rose' },
            text: 'Hành động nhỏ xíu nào của đối phương làm bạn cảm thấy "tan chảy" và được yêu thương nhất?',
            options: [
                { text: 'Nhớ những chi tiết vụn vặt: biết mình thích uống gì, ghét ăn gì mà không cần nhắc.', points: { carnation: 3, daisy: 2, hydrangea: 2, marigold: 2 } },
                { text: 'Luôn bảo vệ mình, đi ngoài đường thì kéo mình đi vào phía trong lề an toàn.', points: { rose: 3, peony: 2, magnolia: 2, tulip: 2 } },
                { text: 'Dù bận rộn tới đâu cũng dành thời gian nhắn một tin: "Hôm nay của em thế nào?".', points: { forget_me_not: 3, statice: 3, baby_breath: 2, camellia: 2 } },
                { text: 'Tôn trọng ước mơ và không gian riêng của mình, luôn cổ vũ mình làm điều mình thích.', points: { lily: 2, orchid: 3, allium: 2, water_lily: 2 } }
            ]
        },
        // Câu 11: Nét "khó chiều" đáng yêu
        {
            category: 'Điểm đáng yêu ngầm',
            art: { emoji: '🐱🎀', tone: 'slate' },
            text: 'Một "tật xấu" nho nhỏ nhưng lại làm bạn bè thấy bạn dễ thương và đáng trân trọng:',
            options: [
                { text: 'Hay lo xa và chu đáo quá mức, lúc nào cũng dặn dò người khác như mẹ trẻ.', points: { carnation: 3, marigold: 3, hydrangea: 2, peony: 1 } },
                { text: 'Lúc bình thường rất hiền, nhưng đụng tới nguyên tắc hay người mình thương là xù lông.', points: { rose: 2, magnolia: 3, apricot_blossom: 3, poppy: 2 } },
                { text: 'Miệng thì bảo "sao cũng được", nhưng trong đầu đã có sẵn một danh sách tiêu chuẩn riêng.', points: { tulip: 3, orchid: 2, allium: 3, lily: 2 } },
                { text: 'Dễ mềm lòng, thấy ai khổ là thương, nhiều khi tự nhận phần thiệt về mình.', points: { lotus: 2, daisy: 2, baby_breath: 3, plumeria: 2 } }
            ]
        },
        // Câu 12: Lời nhắn gửi 20/10
        {
            category: 'Nhắn nhủ bản thân',
            art: { emoji: '💐✨', tone: 'gold' },
            text: 'Nhân ngày Phụ nữ Việt Nam 20/10, lời tự tình dễ thương nhất bạn muốn nhắn gửi đến chính mình:',
            options: [
                { text: '"Hãy luôn tự tin và yêu thương bản thân, bạn xứng đáng với những điều ngọt ngào nhất!"', points: { rose: 3, peony: 3, orchid: 2, tulip: 2 } },
                { text: '"Cứ cười thật tươi và sống hết mình nhé, mỗi ngày trôi qua đều là một ngày xinh đẹp!"', points: { sunflower: 2, gerbera: 3, daisy: 2, peach_blossom: 2 } },
                { text: '"Bình an và thảnh thơi là điều quý giá nhất, không cần phải vội vã, cứ an yên mà sống."', points: { lotus: 3, water_lily: 2, plumeria: 3, jasmine: 2 } },
                { text: '"Cảm ơn vì đã luôn kiên cường, dịu dàng và không bao giờ ngừng cố gắng!"', points: { apricot_blossom: 3, magnolia: 2, camellia: 2, carnation: 2, statice: 2 } }
            ]
        }
    ];

    // Nhánh kịch bản thích ứng tự nhiên cho Câu 4 dựa trên lựa chọn Câu 3
    const ADAPTIVE_BRANCH_QUESTIONS = [
        {
            category: 'Bất ngờ · Góc Mộc',
            art: { emoji: '🌱☕', tone: 'sage' },
            text: 'Ngồi trong quán mộc ngắm giàn cây xanh mát, bạn thấy người chủ tiệm khẽ đặt lên bàn một chậu sen đá con con. Bạn sẽ...',
            options: [
                { text: 'Mỉm cười cảm ơn rối rít, ngắm nghía chồi non bé xíu thấy lòng nhẹ nhõm hẳn.', points: { lotus: 3, jasmine: 3, baby_breath: 2, daisy: 2 } },
                { text: 'Hỏi han cách chăm sóc để mang về bàn làm việc nuôi cho nó lớn khỏe.', points: { orchid: 2, camellia: 3, tulip: 2, plumeria: 2 } },
                { text: 'Chụp một tấm hình góc quán xinh xắn này gửi cho đứa bạn thân rủ lần sau ghé.', points: { carnation: 2, marigold: 2, hydrangea: 2, peach_blossom: 2 } },
                { text: 'Tận hưởng khoảnh khắc bình yên, để điện thoại sang một bên và đọc tiếp cuốn sách.', points: { water_lily: 3, lavender: 2, lily: 2, statice: 2 } }
            ]
        },
        {
            category: 'Bất ngờ · Góc Hoa',
            art: { emoji: '🌹✨', tone: 'rose' },
            text: 'Bước vào tiệm hoa thơm nức mùi thơm hoa hồng ngoại, bạn thấy một góc cắm hoa nghệ thuật rất đẹp. Bạn sẽ...',
            options: [
                { text: 'Tự chọn vài cành hoa có tone màu mình ưng nhất để tự tay gói mang về.', points: { peony: 3, rose: 3, magnolia: 2, tulip: 2 } },
                { text: 'Tò mò hỏi chủ tiệm tên của các loài hoa lạ và ý nghĩa đặc biệt của chúng.', points: { orchid: 3, lily: 2, allium: 2, magnolia: 2 } },
                { text: 'Mua thêm một bó nhỏ nhắn gửi tặng mẹ hoặc cô bạn thân để làm họ bất ngờ.', points: { carnation: 3, gerbera: 2, marigold: 2, daisy: 2 } },
                { text: 'Lặng ngắm sự hài hòa của màu sắc, cảm nhận gu thẩm mỹ tinh tế của không gian.', points: { camellia: 3, lotus: 2, statice: 2, lavender: 2 } }
            ]
        },
        {
            category: 'Bất ngờ · Góc Nắng',
            art: { emoji: '🌻🌤️', tone: 'sun' },
            text: 'Trên quán sân thượng gió mát lộng ngập nắng, một bản nhạc acoustics êm dịu bỗng vang lên. Bạn sẽ...',
            options: [
                { text: 'Ngả lưng ra ghế, khẽ hát nhẩm theo lời bài hát và cảm nhận gió thổi qua tóc.', points: { sunflower: 3, gerbera: 3, poppy: 2, peach_blossom: 2 } },
                { text: 'Cầm máy ảnh bắt trọn khoảnh khắc hoàng hôn nhuộm vàng bầu trời rực rỡ.', points: { cherry_blossom: 3, apricot_blossom: 2, allium: 2, tulip: 2 } },
                { text: 'Nhắn cho người mình thương: "Chỗ này chiều nay gió mát và đẹp lắm nè!".', points: { carnation: 2, daisy: 2, baby_breath: 2, rose: 2 } },
                { text: 'Hít căng lồng ngực không khí trong lành, tự nhiên thấy bao nhiêu mỏi mệt tan biến.', points: { lotus: 2, plumeria: 3, water_lily: 2, jasmine: 2 } }
            ]
        },
        {
            category: 'Bất ngờ · Góc Mơ',
            art: { emoji: '📖🎧', tone: 'blue' },
            text: 'Ngồi trong tiệm sách ấm cúng tone pastel, bạn vô tình rút ra một cuốn sách có kẹp tấm bưu thiếp viết tay cũ. Bạn sẽ...',
            options: [
                { text: 'Đọc những dòng nhắn nhủ mộc mạc ấy, cảm nhận được hơi ấm và sự chân thành của người xưa.', points: { hydrangea: 3, lavender: 3, water_lily: 2, forget_me_not: 3 } },
                { text: 'Kẹp lại cẩn thận vào trang sách cũ, trân trọng một mảnh kỷ niệm đẹp của ai đó.', points: { lotus: 3, jasmine: 2, statice: 3, plumeria: 2 } },
                { text: 'Tự dưng muốn rút bút viết một tấm thiệp nhỏ gửi cho người quan trọng với mình.', points: { carnation: 2, lily: 3, baby_breath: 2, marigold: 2 } },
                { text: 'Mỉm cười một mình, cảm thấy thế giới này đôi khi có những sự trùng hợp dễ thương ghê.', points: { orchid: 2, allium: 3, magnolia: 2, poppy: 1 } }
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
        title: 'Đóa Sen Lụa Tinh Tế & An Nhiên',
        quote: 'Giữ tâm trong lành giữa thế gian tất bật, lặng lẽ tỏa hương ấm áp.',
        traits: ['Tinh tế', 'An nhiên', 'Sâu sắc'],
        match: [{ icon: '🌼', name: 'Cúc Họa Mi', desc: 'Đồng điệu nét tinh khôi, ngồi cạnh nhau là thấy bình yên.' }],
        clash: [{ icon: '🌪️', name: 'Xô Bồ & Thị Phi', desc: 'Những cuộc khẩu chiến ồn ào dễ rút cạn năng lượng bình yên.' }],
        checklist: {
            friend: 'Là nơi chốn vỗ về dịu dàng nhất, luôn lắng nghe mà không phán xét bất kỳ điều gì.',
            love: 'Thương bằng tình cảm sâu sắc, chung thủy, chậm rãi nhưng vững bền như núi biếc.',
            pressure: 'Tĩnh lặng thở sâu, sắp xếp lại suy nghĩ và từng bước gỡ rối thay vì hoảng loạn.'
        }
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
            el('p', 'flower-quiz__hint', 'Cứ chọn theo cảm giác đầu tiên lướt qua trong đầu bạn nhé ✨'),
            buildLinkButton('💌 Xem thiệp & lời chúc', () => { tapSfx(); setBackView('letter'); })
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
        footer.append(stamp, el('span', 'flower-quiz__meta', 'VN-2010 · DÀNH TẶNG BẠN'));

        const cta = el('button', 'flower-quiz__cta', 'Tạo bưu thiếp của riêng bạn ↓');
        cta.type = 'button';
        cta.addEventListener('click', () => openResultCard(result));

        const actions = el('div', 'flower-quiz__actions');
        actions.append(
            buildLinkButton('↺ Thử lại từ đầu', () => { tapSfx(); restartQuiz(); }),
            buildLinkButton('💌 Xem thiệp & lời chúc', () => { tapSfx(); setBackView('letter'); })
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
