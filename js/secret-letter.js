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
    let currentTypewriterTimer = null;
    const typeWriter = (element) => {
        if (!element) return;
        if (currentTypewriterTimer) {
            clearInterval(currentTypewriterTimer);
            currentTypewriterTimer = null;
        }

        const str = element.innerHTML;
        element.innerHTML = '';
        element.style.display = 'block';

        // Glassmorphism background fade in
        const textContainer = document.getElementById("text");
        if (textContainer) {
            textContainer.classList.add("show");
            textContainer.style.pointerEvents = 'auto';
        }

        let progress = 0;
        let isTypingFinished = false;

        const completeTypewriter = () => {
            if (isTypingFinished) return;
            isTypingFinished = true;
            if (currentTypewriterTimer) {
                clearInterval(currentTypewriterTimer);
                currentTypewriterTimer = null;
            }
            element.innerHTML = str;
            const giftDeck = document.getElementById('secret-gift-boxes-deck');
            if (giftDeck) {
                giftDeck.classList.remove('hidden');
            }
        };

        // Cho phép bấm vào text container để hoàn tất hiển thị toàn bộ thư ngay lập tức
        if (textContainer && !textContainer.dataset.fastCompleteBound) {
            textContainer.dataset.fastCompleteBound = 'true';
            textContainer.addEventListener('click', (e) => {
                if (e.target.closest('#font-toggle-btn, #secret-gift-boxes-deck, button, a')) return;
                if (!isTypingFinished) {
                    completeTypewriter();
                }
            });
        }

        currentTypewriterTimer = setInterval(() => {
            const current = str.substr(progress, 1);
            if (current === '<') {
                progress = str.indexOf('>', progress) + 1;
            } else {
                progress++;
            }
            element.innerHTML = str.substring(0, progress) + (progress & 1 ? '_' : '');

            // Chỉ tự động cuộn xuống đáy nếu người dùng đang ở gần đáy (không kéo ngược lên đọc lại)
            if (textContainer) {
                const distanceToBottom = textContainer.scrollHeight - textContainer.scrollTop - textContainer.clientHeight;
                if (distanceToBottom < 70) {
                    textContainer.scrollTop = textContainer.scrollHeight;
                }
            }

            if (progress >= str.length) {
                completeTypewriter();
            }
        }, 30);
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
        // Trắc nghiệm tính cách hoa & thư giấy Dó: Khuyến khích góc nhìn dọc thanh nhã
        if (typeof window.setPreferredOrientation === 'function') {
            window.setPreferredOrientation('portrait');
        }
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
        // Quay về góc nhìn toàn cảnh khu vườn
        if (typeof window.setPreferredOrientation === 'function') {
            window.setPreferredOrientation('landscape');
        }
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
            const textContainer = document.getElementById("text");
            if (isReadable) {
                document.body.classList.add('readable-font');
                if (textContainer) textContainer.classList.add('readable-font');
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
                if (textContainer) textContainer.classList.remove('readable-font');
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

        let fontToggleBound = false;
        const bindGlobalFontToggle = () => {
            if (fontToggleBound) return;
            fontToggleBound = true;
            document.addEventListener('click', (e) => {
                const targetBtn = e.target && e.target.closest('#font-toggle-btn, .font-toggle-btn, #polaroid-font-btn, .polaroid-font-toggle');
                if (targetBtn) {
                    if (e.cancelable) e.preventDefault();
                    e.stopPropagation();
                    const isCurrentlyReadable = document.body.classList.contains('readable-font');
                    const nextState = !isCurrentlyReadable;
                    updateFontUI(nextState);
                    if (typeof window.triggerHaptic === 'function') window.triggerHaptic('tap');
                    try {
                        localStorage.setItem('user_font_mode', nextState ? 'readable' : 'handwriting');
                    } catch (_) {}
                    if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
                }
            }, true);
        };
        bindGlobalFontToggle();
        window.toggleReadableFont = updateFontUI;
    };

    // =========================================================================
    // 4. FLOWER PERSONALITY QUIZ — "Bạn là bông hoa nào?" (mặt sau thư Polaroid)
    //    4a. DATA  ·  4b. STATE & SCORING (thuần, không đụng DOM)  ·  4c. UI RENDERING
    // =========================================================================

    // ---- 4a. DATA --------------------------------------------------------------
    // points: { <flowerId>: điểm } — flowerId khớp window.flowerProfiles[].id (js/content.js).
    // Thêm câu hỏi mới chỉ cần push thêm 1 object vào mảng này.
    const FLOWER_QUIZ_QUESTIONS = [
        // =====================================================================
        // CHẶNG 1: THỨC GIÁC SỚM MAI (SENSORY AWAKENING)
        // =====================================================================
        // Câu 1: Thanh âm đầu ngày
        {
            category: 'Sớm mai thức giấc',
            art: { emoji: '🌅🍃', tone: 'sun' },
            text: 'Mở mắt đón sớm mai, thanh âm hoặc nhịp điệu nào làm bạn cảm nhận ngày mới thực sự bắt đầu một cách êm ái nhất?',
            options: [
                { text: 'Tiếng chim lích chích ngoài vòm lá hòa cùng làn gió ban mai mát lành thổi qua khung cửa.', points: { lotus: 3, jasmine: 3, daisy: 2, osmanthus: 2, sim_flower: 2, tana_daisy: 2 } },
                { text: 'Một bản nhạc acoustic mộc mạc hoặc giai điệu êm dịu quen thuộc từ chiếc loa đầu giường.', points: { rose: 3, tulip: 2, lisianthus: 3, lily_of_the_valley: 2, spiraea: 2, wisteria: 2 } },
                { text: 'Tiếng còi xe rộn rã đầu ngõ cùng lời chào rôm rả báo hiệu nhịp sống sôi động đã bừng tỉnh.', points: { sunflower: 3, gerbera: 3, peach_blossom: 2, oncidium: 2, anthurium: 2, bombax: 2 } },
                { text: 'Chuông báo thức vừa tắt, nhường lại 15 phút thảnh thơi nằm ngắm mây trời phiêu lãng trước khi dậy.', points: { dandelion: 3, hydrangea: 2, statice: 2, wax_flower: 2, crape_myrtle: 3, hibiscus: 2 } }
            ]
        },
        // Câu 2: Hương vị sớm mai
        {
            category: 'Hương vị sớm mai',
            art: { emoji: '☕🍵', tone: 'blush' },
            text: 'Trước khi bước ra đối diện với thế giới tất bật, thức uống nào mang lại cho bạn cảm giác được "ôm ấp" nhất?',
            options: [
                { text: 'Ly nước ấm mật ong chanh thơm dịu hoặc tách trà hoa cúc thanh lọc tâm trí.', points: { water_lily: 3, camellia: 3, plumeria: 2, white_champaca: 3, melastoma: 2, periwinkle: 2 } },
                { text: 'Tách cà phê phin đậm đà thơm nức, đánh thức trọn vẹn sự tỉnh táo và tập trung.', points: { orchid: 3, queen_of_the_night: 3, iris: 2, magnolia: 3, tuberose: 2, narcissus: 2 } },
                { text: 'Ly sinh tố trái cây nhiệt đới tươi mát, ngập tràn sắc màu và vitamin tự nhiên.', points: { poppy: 3, allium: 2, bird_of_paradise: 3, dahlia: 3, rangoon_creeper: 2, apricot_blossom: 2 } },
                { text: 'Một ly sữa hạt ấm béo ngậy mộc mạc, ngọt dịu như bữa sáng mẹ chuẩn bị ở nhà.', points: { carnation: 3, marigold: 3, globe_amaranth: 3, geranium: 3, aster: 2, baby_breath: 2 } }
            ]
        },

        // =====================================================================
        // CHẶNG 2: 4 NHÁNH KHÔNG GIAN ĐỘC BẢN (ADAPTIVE 4-WAY SANCTUARY)
        // =====================================================================
        // Câu 3: Góc trú ẩn tâm hồn
        {
            category: 'Góc trú ẩn tâm hồn',
            art: { emoji: '🧭🌿', tone: 'sage' },
            text: 'Một buổi chiều thu rảnh rỗi muốn tìm về một khoảng lặng riêng cho mình, bạn sẽ muốn ghé chân vào đâu?',
            options: [
                { text: '[Góc Mộc] Quán nhỏ hiên đầy lá, bàn gỗ thô mộc bên khóm hoa dại, nghe mùi đất ẩm sau cơn mưa.', points: { lotus: 3, jasmine: 3, daisy: 2, osmanthus: 3, sim_flower: 2, tana_daisy: 2, water_lily: 2 } },
                { text: '[Góc Thơ] Tiệm trà cổ điển thơm hương quế hồi, giá sách gỗ chạm trần và tiếng nhạc vĩ cầm êm ái.', points: { rose: 3, peony: 3, orchid: 2, tulip: 2, magnolia: 2, queen_of_the_night: 3, white_champaca: 2 } },
                { text: '[Góc Nắng] Quán cà phê sân thượng lộng gió, đón trọn ánh hoàng hôn vàng rực và tiếng cười rộn rã.', points: { sunflower: 3, gerbera: 3, apricot_blossom: 2, peach_blossom: 2, bird_of_paradise: 3, oncidium: 2, anthurium: 2 } },
                { text: '[Góc Gió] Chiếc ghế đá ven hồ thoáng đãng ngắm từng đợt sóng lăn tăn, để gió cuốn đi mọi muộn phiền.', points: { dandelion: 3, hydrangea: 3, lavender: 2, statice: 3, wax_flower: 2, crape_myrtle: 2, forget_me_not: 2 } }
            ]
        },
        // Câu 4: (Mặc định / Fallback — thực tế được thay thế linh hoạt bởi ADAPTIVE_BRANCH_QUESTIONS)
        {
            category: 'Bất ngờ nho nhỏ',
            art: { emoji: '🕊️🎁', tone: 'blue' },
            text: 'Tại góc không gian bạn vừa chọn, khoảnh khắc nào làm bạn thấy lòng mình dịu lại nhất?',
            options: [
                { text: 'Ngắm một mầm cây non vừa hé nhú trên chậu gốm nhỏ, thấy cuộc sống thật kỳ diệu.', points: { baby_breath: 3, daisy: 2, plumeria: 3, tana_daisy: 2, sim_flower: 2 } },
                { text: 'Mở một trang sách cũ ra đọc, bắt gặp một câu văn như viết riêng cho nỗi lòng của mình.', points: { iris: 3, lisianthus: 2, tuberose: 3, orchid: 2, wisteria: 2 } },
                { text: 'Ánh chiều tà chiếu qua khung cửa sổ, tạo nên một vệt sáng lung linh rất đẹp trên mặt bàn.', points: { dahlia: 3, poppy: 2, cherry_blossom: 2, rangoon_creeper: 2 } },
                { text: 'Giai điệu của một bài hát xưa bỗng cất lên, gợi lại kỷ niệm êm đềm với người bạn thời niên thiếu.', points: { forget_me_not: 3, aster: 3, hyacinth: 3, globe_amaranth: 2 } }
            ]
        },

        // =====================================================================
        // CHẶNG 3: PHẢN XẠ NỘI TÂM & BẢN LĨNH TRƯỚC THỬ THÁCH (RESILIENCE & RECOVERY)
        // =====================================================================
        // Câu 5: Đối diện thử thách
        {
            category: 'Đối diện thử thách',
            art: { emoji: '⚓🌧️', tone: 'slate' },
            text: 'Khi một kế hoạch bạn dày công chuẩn bị bất ngờ gặp trục trặc ngoài ý muốn, phản xạ đầu tiên của bạn là...',
            options: [
                { text: 'Dừng lại hít một hơi sâu, không vội hoảng sợ, bình tĩnh phân tích xem khâu nào có thể gỡ trước.', points: { lotus: 3, water_lily: 3, camellia: 2, white_champaca: 2, periwinkle: 2 } },
                { text: 'Lập tức vào chế độ "tác chiến", hành động dứt khoát và tìm kiếm phương án B thay thế ngay.', points: { rose: 3, peony: 2, iris: 3, magnolia: 3, bird_of_paradise: 2 } },
                { text: 'Nhìn nhận sự việc với tinh thần lạc quan: "Mọi chuyện xảy ra đều có lý do, có khi lại mở ra cơ hội mới".', points: { sunflower: 3, gerbera: 3, allium: 2, rangoon_creeper: 3, bombax: 2 } },
                { text: 'Cho phép bản thân thở một nhịp, xin lời khuyên từ người có kinh nghiệm rồi từng bước giải quyết.', points: { carnation: 2, daisy: 2, hydrangea: 3, aster: 2, lisianthus: 2 } }
            ]
        },
        // Câu 6: Giữ vững tâm thế
        {
            category: 'Giữ vững tâm thế',
            art: { emoji: '🛡️✨', tone: 'amber' },
            text: 'Trước một lời nhận xét thiếu thiện chí hoặc phán xét phiến diện từ người xa lạ, tâm thế bạn chọn là...',
            options: [
                { text: 'Im lặng mỉm cười bước tiếp, vì giá trị của mình không phụ thuộc vào lời nói của người không hiểu mình.', points: { lotus: 3, queen_of_the_night: 3, plumeria: 3, jasmine: 2, osmanthus: 3 } },
                { text: 'Điềm đạm bảo vệ quan điểm với lý lẽ rõ ràng, văn minh nhưng dứt khoát đặt ra ranh giới tôn trọng.', points: { orchid: 3, tulip: 3, iris: 2, dahlia: 2, narcissus: 3 } },
                { text: 'Không để bụng quá 3 giây, năng lượng của mình quý giá nên chỉ dành cho những điều xứng đáng.', points: { poppy: 3, allium: 3, bird_of_paradise: 2, oncidium: 2, anthurium: 2 } },
                { text: 'Tự soi chiếu lại mình xem có điều gì cần hoàn thiện không, nếu không thì nhẹ nhàng buông bỏ ngoài tai.', points: { lily: 3, wax_flower: 3, statice: 2, globe_amaranth: 2, wisteria: 2 } }
            ]
        },
        // Câu 7: Trạm sạc tâm hồn
        {
            category: 'Trạm sạc tâm hồn',
            art: { emoji: '🌿🔋', tone: 'sage' },
            text: 'Khi cảm thấy cạn kiệt năng lượng giữa guồng quay bộn bề, "trạm sạc" phục hồi hiệu nghiệm nhất của bạn là...',
            options: [
                { text: 'Tắt hết chuông thông báo, ngủ một giấc thật sâu trong chăn ấm không mộng mị.', points: { lavender: 3, water_lily: 3, jasmine: 2, sim_flower: 2, lily_of_the_valley: 2 } },
                { text: 'Tự tay cắm một bình hoa tươi thật xinh xắn, dọn dẹp lại căn phòng cho thơm tho và tinh tươm.', points: { cherry_blossom: 3, baby_breath: 3, lisianthus: 2, spiraea: 3, daisy: 2 } },
                { text: 'Xách giày ra ngoài đi dạo dưới bóng cây xanh mát, hít thở khí trời và ngắm nhìn cỏ hoa ven đường.', points: { dandelion: 3, melastoma: 3, periwinkle: 2, tana_daisy: 3, crape_myrtle: 2 } },
                { text: 'Ngồi ăn một bữa cơm ấm nóng cùng người thân yêu, tỉ tê những câu chuyện giản dị đời thường.', points: { carnation: 3, marigold: 3, geranium: 3, peach_blossom: 2, bombax: 2 } }
            ]
        },

        // =====================================================================
        // CHẶNG 4: NGÔN NGỮ YÊU THƯƠNG & SỰ THẤU CẢM (EMOTIONAL INTIMACY)
        // =====================================================================
        // Câu 8: Khi bạn thân buồn
        {
            category: 'Khi bạn thân buồn',
            art: { emoji: '🫂🍵', tone: 'warm' },
            text: 'Khi đứa bạn thân nhất gặp chuyện buồn và nhắn tin tâm sự, cách bạn ở bên cạnh bạn ấy là...',
            options: [
                { text: 'Không vội tra hỏi hay khuyên răn, chỉ ngồi cạnh, khẽ nắm tay để bạn biết luôn có mình chở che.', points: { daisy: 3, baby_breath: 3, plumeria: 2, geranium: 3, sim_flower: 2 } },
                { text: 'Lập tức mang đồ ăn hoặc thức uống bạn thích ghé qua, lắng nghe bạn xả hết ấm ức trong lòng.', points: { carnation: 3, rose: 2, marigold: 2, bombax: 3, hydrangea: 2 } },
                { text: 'Kéo bạn ra ngoài đi dạo hít thở khí trời, rủ đi ăn món ngon để tâm trạng dần tươi sáng hơn.', points: { sunflower: 3, gerbera: 3, poppy: 2, peach_blossom: 2, oncidium: 2 } },
                { text: 'Viết cho bạn một tin nhắn thật chân thành, nhắc bạn nhớ rằng bạn kiên cường và đáng trân trọng dường nào.', points: { forget_me_not: 3, statice: 3, hyacinth: 3, aster: 2, wisteria: 2 } }
            ]
        },
        // Câu 9: Khoảnh khắc vỗ về
        {
            category: 'Khoảnh khắc vỗ về',
            art: { emoji: '💌🕊️', tone: 'rose' },
            text: 'Hành động nhỏ xíu nào của đối phương khiến bạn cảm nhận trái tim mình thực sự được vỗ về và thấu hiểu?',
            options: [
                { text: 'Nhớ những thói quen vụn vặt: biết mình thích uống gì, dị ứng món gì mà không cần phải nhắc.', points: { carnation: 3, daisy: 2, hydrangea: 3, lisianthus: 2, tana_daisy: 2 } },
                { text: 'Luôn đi bên ngoài để che chở khi sang đường, lặng lẽ nhường chiếc áo ấm khi trời trở gió.', points: { rose: 3, peony: 2, magnolia: 3, bombax: 2, anthurium: 2 } },
                { text: 'Dù bận rộn tới đâu cũng dành vài giây nhắn một tin hỏi han: "Hôm nay của bạn có điều gì vui không?".', points: { forget_me_not: 3, statice: 3, camellia: 2, lily_of_the_valley: 3, aster: 2 } },
                { text: 'Tôn trọng thế giới riêng và ước mơ của mình, luôn lắng nghe với ánh mắt cổ vũ chân thành.', points: { orchid: 3, lily: 2, iris: 3, queen_of_the_night: 2, narcissus: 2 } }
            ]
        },
        // Câu 10: Nhánh ngày nghỉ tự do
        {
            category: 'Tự do 24 giờ',
            art: { emoji: '🎈🏝️', tone: 'violet' },
            text: 'Nếu được tặng trọn vẹn 24 giờ tự do không vướng bận việc gì, bạn sẽ dành ngày đó để...',
            options: [
                { text: 'Ở nhà cuộn tròn đọc sách, cày bộ phim hay và nấu một món ăn thơm phức mình thích.', points: { lotus: 2, jasmine: 3, lavender: 3, water_lily: 2, osmanthus: 3 } },
                { text: 'Lên đồ thật đẹp, đi dạo những góc phố quen, ghé tiệm gốm hoặc triển lãm tranh có gu.', points: { tulip: 3, orchid: 2, peony: 3, spiraea: 3, white_champaca: 2 } },
                { text: 'Tụ họp cùng những người bạn yêu quý, cùng nhau ăn uống cười đùa rôm rả cả ngày.', points: { sunflower: 3, gerbera: 3, peach_blossom: 2, oncidium: 2, rangoon_creeper: 2 } },
                { text: 'Xách balo đi đến một nơi xa lạ, hít thở làn gió mới toanh để làm mới lại chính mình.', points: { poppy: 3, dandelion: 3, cherry_blossom: 2, bird_of_paradise: 3, dahlia: 2, hibiscus: 2 } }
            ]
        },
        // Câu 11: Món quà tinh thần
        {
            category: 'Món quà tinh thần',
            art: { emoji: '🎁✨', tone: 'gold' },
            text: 'Trong những món quà tinh thần bạn từng trao đi hoặc nhận lại, điều gì có sức nặng ấm áp nhất?',
            options: [
                { text: 'Một bức thư tay mộc mạc giãi bày những lời cảm ơn và trân quý chân thành từ tận đáy lòng.', points: { hydrangea: 3, forget_me_not: 3, statice: 2, lily_of_the_valley: 2, hyacinth: 2 } },
                { text: 'Sự kiên định đồng hành của ai đó bên cạnh mình qua những giai đoạn bấp bênh nhất.', points: { camellia: 3, wax_flower: 3, wisteria: 3, globe_amaranth: 3, periwinkle: 2 } },
                { text: 'Một lời khích lệ đúng lúc: "Bạn làm tốt lắm, hãy luôn tự tin vào con đường của mình!".', points: { magnolia: 3, iris: 3, apricot_blossom: 2, dahlia: 2, bird_of_paradise: 2 } },
                { text: 'Một cái ôm siết chặt và ánh nhìn thấu cảm, không cần phải nói thêm bất kỳ lời nào.', points: { baby_breath: 3, carnation: 2, daisy: 2, geranium: 3, plumeria: 2 } }
            ]
        },

        // =====================================================================
        // CHẶNG 5: ĐÊM THU LẮNG ĐỌNG & NGUYỆN ƯỚC SÂU KÍN (SOUL SYNTHESIS)
        // =====================================================================
        // Câu 12: Đêm thu sao sáng
        {
            category: 'Đêm thu sao sáng',
            art: { emoji: '🌌✨', tone: 'blue' },
            text: 'Đứng dưới vòm trời đêm thu lấp lánh ngàn vì sao tĩnh mịch, ý nghĩ thường đến nhất trong tâm trí bạn là...',
            options: [
                { text: '"Vũ trụ bao la đến thế, những phiền muộn nhỏ nhặt hôm nay rồi cũng sẽ nhẹ nhàng trôi qua thôi."', points: { lotus: 3, water_lily: 3, lavender: 2, dandelion: 3, sim_flower: 2 } },
                { text: '"Mong những người mình thương quý ở khắp mọi nơi đều được bình an, mạnh khỏe và hạnh phúc."', points: { carnation: 3, marigold: 3, globe_amaranth: 2, peach_blossom: 2, geranium: 2 } },
                { text: '"Cuộc sống thật diệu kỳ, mình muốn sống rực rỡ và khám phá thêm thật nhiều chân trời mới."', points: { sunflower: 2, poppy: 3, bird_of_paradise: 3, dahlia: 3, oncidium: 2 } },
                { text: '"Biết ơn vì bản thân đã đi qua bao chặng đường mà vẫn giữ được sự chân thành nguyên vẹn."', points: { white_champaca: 3, osmanthus: 3, statice: 3, queen_of_the_night: 2, wax_flower: 2 } }
            ]
        },
        // Câu 13: Phẩm chất trân quý
        {
            category: 'Phẩm chất trân quý',
            art: { emoji: '💎🌿', tone: 'amber' },
            text: 'Phẩm chất nào ở chính mình mà bạn luôn âm thầm trân quý và cố gắng gìn giữ qua năm tháng?',
            options: [
                { text: 'Sự thấu cảm sâu sắc, luôn biết lắng nghe và đặt mình vào vị trí của người khác.', points: { daisy: 3, baby_breath: 3, hydrangea: 2, lily: 2, aster: 2 } },
                { text: 'Bản lĩnh độc lập, kiên định với những giá trị đúng đắn và lý tưởng mà mình theo đuổi.', points: { orchid: 3, magnolia: 3, iris: 3, tulip: 2, narcissus: 3 } },
                { text: 'Nụ cười tươi tắn và năng lượng ấm áp, luôn mang lại niềm vui cho những người xung quanh.', points: { gerbera: 3, sunflower: 2, apricot_blossom: 3, tana_daisy: 3, anthurium: 2 } },
                { text: 'Sự chân thật và khiêm nhường trong tâm hồn, không tính toán thiệt hơn hay giả tạo.', points: { jasmine: 3, plumeria: 3, osmanthus: 2, melastoma: 3, periwinkle: 2 } }
            ]
        },
        // Câu 14: Lời thì thầm quá khứ
        {
            category: 'Lời thì thầm quá khứ',
            art: { emoji: '⏳🌱', tone: 'warm' },
            text: 'Nếu được gửi một lời thì thầm nhắn nhủ đến chính mình của 5 năm trước, bạn sẽ nói điều gì?',
            options: [
                { text: '"Đừng quá âu lo nhé, mọi chuyện rồi sẽ ổn thỏa theo cách đẹp đẽ nhất mà bạn không ngờ tới."', points: { lisianthus: 3, lily_of_the_valley: 3, water_lily: 2, crape_myrtle: 3, forget_me_not: 2, hyacinth: 2 } },
                { text: '"Hãy dũng cảm tin vào năng lực của mình, bạn tài giỏi và kiên cường hơn bạn tưởng nhiều."', points: { rose: 3, peony: 2, magnolia: 2, dahlia: 3, bombax: 2 } },
                { text: '"Hãy cứ cười thật tươi và tận hưởng trọn vẹn từng khoảnh khắc thanh xuân rực rỡ ấy nhé!"', points: { cherry_blossom: 3, peach_blossom: 2, gerbera: 2, allium: 2, rangoon_creeper: 2 } },
                { text: '"Cảm ơn bạn vì ngày ấy đã không bỏ cuộc, để hôm nay có một phiên bản vững vàng như bây giờ."', points: { apricot_blossom: 3, camellia: 3, wax_flower: 3, statice: 2, wisteria: 2 } }
            ]
        },
        // Câu 15: Giai điệu tâm tưởng
        {
            category: 'Giai điệu tâm tưởng',
            art: { emoji: '🎵🍃', tone: 'rose' },
            text: 'Khi một bản nhạc không lời du dương cất lên trong chiều thu, hình ảnh đầu tiên hiện lên trong bạn là...',
            options: [
                { text: 'Một cánh đồng hoa ngập tràn ánh nắng chiều vàng ấm áp, gió thổi đu đưa từng cánh mỏng.', points: { daisy: 2, sunflower: 2, tana_daisy: 3, poppy: 2, sim_flower: 2 } },
                { text: 'Một góc ban công quen thuộc rợp bóng cây xanh, nơi bạn ngồi ngắm mưa rơi bên tách trà thơm.', points: { lotus: 3, jasmine: 2, white_champaca: 2, osmanthus: 2, spiraea: 2 } },
                { text: 'Khung cửa sổ sáng đèn ấm cúng nơi có những người thân thương đang quây quần bên bữa cơm chiều.', points: { carnation: 3, marigold: 3, peach_blossom: 2, geranium: 2, bombax: 2 } },
                { text: 'Mặt hồ phẳng lặng phản chiếu ánh trăng bạc, tĩnh mịch và sâu lắng khôn cùng.', points: { queen_of_the_night: 3, tuberose: 3, iris: 2, hyacinth: 2, wisteria: 2 } }
            ]
        },
        // Câu 16: Lời tự tình 20/10
        {
            category: 'Lời tự tình 20/10',
            art: { emoji: '💐✨', tone: 'gold' },
            text: 'Nhân ngày Phụ nữ Việt Nam 20/10, lời chúc nào chạm đến nơi sâu lắng và ấm áp nhất trong bạn?',
            options: [
                { text: '"Chúc bạn luôn giữ được sự an yên trong tâm hồn, mỗi sớm mai thức dậy đều thấy lòng nhẹ nhõm."', points: { lotus: 3, water_lily: 2, plumeria: 2, jasmine: 2, lily_of_the_valley: 2 } },
                { text: '"Chúc bạn luôn kiêu hãnh tỏa sáng trên con đường riêng, tự do sống trọn vẹn cuộc đời bạn ước mơ."', points: { rose: 3, peony: 3, orchid: 2, tulip: 2, bird_of_paradise: 2, narcissus: 3 } },
                { text: '"Chúc nụ cười rạng rỡ luôn nở trên môi bạn, mọi điều ngọt ngào và may mắn sẽ luôn tìm đến bạn."', points: { sunflower: 2, gerbera: 3, lisianthus: 3, apricot_blossom: 2, anthurium: 2 } },
                { text: '"Chúc bạn luôn được trân trọng, được thấu hiểu và được yêu thương bằng một tình cảm chân thành nhất."', points: { carnation: 2, hydrangea: 2, forget_me_not: 2, statice: 2, camellia: 2, wisteria: 2 } }
            ]
        }
    ];

    // Nhánh kịch bản thích ứng tự nhiên cho Câu 4 dựa trên lựa chọn Câu 3
    const ADAPTIVE_BRANCH_QUESTIONS = [
        // Nhánh 0: Góc Mộc
        {
            category: 'Bất ngờ · Góc Mộc',
            art: { emoji: '🌱🪵', tone: 'sage' },
            text: 'Ngồi bên hiên mộc ngắm vòm lá biếc, bác chủ quán mang ra một chậu cây nhỏ xinh xắn tặng bạn. Bạn sẽ...',
            options: [
                { text: 'Mỉm cười cảm ơn rối rít, nâng niu chồi non bé xíu thấy lòng nhẹ nhõm và ấm áp hẳn.', points: { lotus: 3, jasmine: 3, baby_breath: 2, daisy: 2, tana_daisy: 2 } },
                { text: 'Hỏi han tỉ mỉ cách tưới nước, đón nắng để mang về bàn làm việc chăm sóc cho cây lớn khỏe.', points: { camellia: 3, plumeria: 2, osmanthus: 3, periwinkle: 3, melastoma: 2 } },
                { text: 'Chụp một tấm hình góc hiên mộc gửi cho hội bạn thân rủ lần sau ghé cùng cho vui.', points: { carnation: 2, marigold: 2, geranium: 3, bombax: 2 } },
                { text: 'Đặt chậu cây bên cạnh, hít sâu hương đất ẩm và tiếp tục đắm chìm vào trang sách đang đọc.', points: { water_lily: 3, lavender: 2, sim_flower: 3, statice: 2 } }
            ]
        },
        // Nhánh 1: Góc Thơ
        {
            category: 'Bất ngờ · Góc Thơ',
            art: { emoji: '📜🍵', tone: 'rose' },
            text: 'Trong tiệm trà cổ điển ấm cúng, bạn bắt gặp một cuốn sổ tay ai đó ghi lại những vần thơ chép tay nắn nót. Bạn sẽ...',
            options: [
                { text: 'Đọc từng vần thơ mộc mạc, xúc động trước tình cảm chân thành giấu kín trong nét mực xưa.', points: { rose: 3, peony: 2, lisianthus: 3, white_champaca: 2, wisteria: 3 } },
                { text: 'Tò mò về tác giả và hoàn cảnh ra đời của những câu chữ sâu sắc, đầy tính triết lý ấy.', points: { orchid: 3, iris: 3, queen_of_the_night: 3, tulip: 2, narcissus: 3 } },
                { text: 'Rút cây bút mang theo, nắn nót viết tiếp vài dòng cảm nghĩ ấm áp vào trang lưu bút của quán.', points: { lily: 3, magnolia: 3, tuberose: 3, spiraea: 2 } },
                { text: 'Nhấp ngụm trà sen ấm, ngắm nhìn ánh nến lung linh và lắng nghe tiếng dương cầm dìu dặt.', points: { camellia: 2, lotus: 2, lily_of_the_valley: 3, lavender: 2 } }
            ]
        },
        // Nhánh 2: Góc Nắng
        {
            category: 'Bất ngờ · Góc Nắng',
            art: { emoji: '🌻🌤️', tone: 'sun' },
            text: 'Trên quán sân thượng lộng gió ngập tràn ánh nắng vàng rực rỡ, bài hát bạn yêu thích bỗng vang lên. Bạn sẽ...',
            options: [
                { text: 'Ngả lưng ra ghế, khẽ nhẩm hát theo lời bài hát và cảm nhận gió luồn qua từng lọn tóc.', points: { sunflower: 3, gerbera: 3, poppy: 2, peach_blossom: 2, oncidium: 3 } },
                { text: 'Cầm máy ảnh bắt trọn khoảnh khắc hoàng hôn nhuộm hồng cả đường chân trời thành phố.', points: { cherry_blossom: 3, apricot_blossom: 3, dahlia: 2, allium: 2 } },
                { text: 'Gọi video khoe ngay với người thân hoặc bạn thương: "Chỗ này chiều nay gió mát và hoàng hôn đẹp lắm!".', points: { anthurium: 3, bombax: 2, rangoon_creeper: 3, carnation: 2 } },
                { text: 'Hít căng lồng ngực bầu không khí khoáng đạt, thấy năng lượng tích cực bừng sáng khắp người.', points: { bird_of_paradise: 3, plumeria: 2, jasmine: 2, dahlia: 2 } }
            ]
        },
        // Nhánh 3: Góc Gió
        {
            category: 'Bất ngờ · Góc Gió',
            art: { emoji: '🍃🌊', tone: 'blue' },
            text: 'Đứng đón gió bên hồ nước mênh mang, bạn nhìn thấy từng đàn chim sải cánh bay về phía ráng chiều. Bạn sẽ...',
            options: [
                { text: 'Cảm nhận một niềm tự do khôn tả, bao nhiêu vướng bận lo toan bỗng nhẹ tênh như làn khói.', points: { dandelion: 3, hydrangea: 3, wax_flower: 3, crape_myrtle: 2 } },
                { text: 'Nhớ về một kỷ niệm thời thơ ấu, thấy lòng ngập tràn hoài niệm êm đềm và sự biết ơn.', points: { forget_me_not: 3, aster: 3, hyacinth: 2, globe_amaranth: 2 } },
                { text: 'Lấy điện thoại bật một bản nhạc không lời da diết, thả lỏng đôi vai và thong thả rảo bước.', points: { statice: 3, lily_of_the_valley: 2, lavender: 3, hibiscus: 2 } },
                { text: 'Tự mỉm cười với chính mình: "Sau cơn dông bão thì trời lại xanh, mình đã đi qua rất kiên cường".', points: { apricot_blossom: 2, magnolia: 2, periwinkle: 3, melastoma: 3 } }
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

    // =========================================================================
    // 4b-1. MA TRẬN TÍNH CÁCH 8 TRỤC & VECTOR ĐẶC TRƯNG TÂM HỒN (54 LOÀI HOA)
    // =========================================================================
    const TRAIT_AXES = ['serene', 'radiant', 'resilient', 'gentle', 'free', 'poetic', 'noble', 'authentic'];

    const FLOWER_PERSONALITY_VECTORS = {
        lotus:              { serene: 0.95, radiant: 0.20, resilient: 0.60, gentle: 0.85, free: 0.30, poetic: 0.80, noble: 0.70, authentic: 0.90 },
        apricot_blossom:    { serene: 0.40, radiant: 0.80, resilient: 0.90, gentle: 0.30, free: 0.60, poetic: 0.50, noble: 0.85, authentic: 0.75 },
        peach_blossom:      { serene: 0.30, radiant: 0.90, resilient: 0.50, gentle: 0.70, free: 0.60, poetic: 0.70, noble: 0.50, authentic: 0.80 },
        jasmine:            { serene: 0.90, radiant: 0.30, resilient: 0.40, gentle: 0.90, free: 0.40, poetic: 0.75, noble: 0.60, authentic: 0.95 },
        rose:               { serene: 0.20, radiant: 0.75, resilient: 0.80, gentle: 0.50, free: 0.50, poetic: 0.85, noble: 0.90, authentic: 0.60 },
        peony:              { serene: 0.40, radiant: 0.70, resilient: 0.70, gentle: 0.60, free: 0.40, poetic: 0.70, noble: 0.95, authentic: 0.65 },
        orchid:             { serene: 0.70, radiant: 0.40, resilient: 0.75, gentle: 0.40, free: 0.30, poetic: 0.80, noble: 0.95, authentic: 0.60 },
        tulip:              { serene: 0.50, radiant: 0.60, resilient: 0.60, gentle: 0.50, free: 0.50, poetic: 0.65, noble: 0.90, authentic: 0.65 },
        sunflower:          { serene: 0.10, radiant: 0.98, resilient: 0.80, gentle: 0.50, free: 0.70, poetic: 0.30, noble: 0.40, authentic: 0.85 },
        gerbera:            { serene: 0.10, radiant: 0.95, resilient: 0.50, gentle: 0.60, free: 0.70, poetic: 0.20, noble: 0.30, authentic: 0.90 },
        poppy:              { serene: 0.20, radiant: 0.60, resilient: 0.60, gentle: 0.30, free: 0.90, poetic: 0.90, noble: 0.70, authentic: 0.50 },
        allium:             { serene: 0.50, radiant: 0.50, resilient: 0.85, gentle: 0.30, free: 0.85, poetic: 0.50, noble: 0.75, authentic: 0.70 },
        daisy:              { serene: 0.85, radiant: 0.50, resilient: 0.60, gentle: 0.90, free: 0.60, poetic: 0.75, noble: 0.30, authentic: 0.95 },
        baby_breath:        { serene: 0.85, radiant: 0.40, resilient: 0.40, gentle: 0.95, free: 0.50, poetic: 0.85, noble: 0.40, authentic: 0.90 },
        lavender:           { serene: 0.98, radiant: 0.20, resilient: 0.50, gentle: 0.85, free: 0.50, poetic: 0.90, noble: 0.60, authentic: 0.80 },
        hydrangea:          { serene: 0.70, radiant: 0.40, resilient: 0.50, gentle: 0.85, free: 0.60, poetic: 0.90, noble: 0.50, authentic: 0.80 },
        lily:               { serene: 0.75, radiant: 0.40, resilient: 0.60, gentle: 0.70, free: 0.30, poetic: 0.80, noble: 0.90, authentic: 0.75 },
        magnolia:           { serene: 0.60, radiant: 0.40, resilient: 0.90, gentle: 0.50, free: 0.40, poetic: 0.75, noble: 0.92, authentic: 0.70 },
        camellia:           { serene: 0.90, radiant: 0.30, resilient: 0.85, gentle: 0.70, free: 0.30, poetic: 0.80, noble: 0.80, authentic: 0.85 },
        carnation:          { serene: 0.60, radiant: 0.50, resilient: 0.70, gentle: 0.95, free: 0.30, poetic: 0.60, noble: 0.50, authentic: 0.92 },
        plumeria:           { serene: 0.92, radiant: 0.40, resilient: 0.60, gentle: 0.85, free: 0.50, poetic: 0.70, noble: 0.50, authentic: 0.95 },
        water_lily:         { serene: 0.98, radiant: 0.20, resilient: 0.80, gentle: 0.80, free: 0.40, poetic: 0.85, noble: 0.60, authentic: 0.90 },
        forget_me_not:      { serene: 0.80, radiant: 0.30, resilient: 0.50, gentle: 0.85, free: 0.40, poetic: 0.98, noble: 0.40, authentic: 0.90 },
        statice:            { serene: 0.75, radiant: 0.30, resilient: 0.95, gentle: 0.70, free: 0.40, poetic: 0.75, noble: 0.40, authentic: 0.90 },
        marigold:           { serene: 0.50, radiant: 0.70, resilient: 0.85, gentle: 0.85, free: 0.30, poetic: 0.50, noble: 0.40, authentic: 0.95 },
        cherry_blossom:     { serene: 0.60, radiant: 0.70, resilient: 0.40, gentle: 0.70, free: 0.80, poetic: 0.95, noble: 0.70, authentic: 0.75 },
        hibiscus:           { serene: 0.60, radiant: 0.60, resilient: 0.50, gentle: 0.60, free: 0.85, poetic: 0.90, noble: 0.60, authentic: 0.70 },
        lisianthus:         { serene: 0.70, radiant: 0.60, resilient: 0.80, gentle: 0.80, free: 0.50, poetic: 0.80, noble: 0.75, authentic: 0.80 },
        lily_of_the_valley: { serene: 0.85, radiant: 0.50, resilient: 0.50, gentle: 0.90, free: 0.60, poetic: 0.92, noble: 0.70, authentic: 0.90 },
        queen_of_the_night: { serene: 0.90, radiant: 0.20, resilient: 0.65, gentle: 0.50, free: 0.60, poetic: 0.98, noble: 0.95, authentic: 0.70 },
        white_champaca:     { serene: 0.90, radiant: 0.30, resilient: 0.60, gentle: 0.85, free: 0.40, poetic: 0.90, noble: 0.85, authentic: 0.90 },
        bird_of_paradise:   { serene: 0.20, radiant: 0.85, resilient: 0.85, gentle: 0.30, free: 0.95, poetic: 0.60, noble: 0.85, authentic: 0.70 },
        osmanthus:          { serene: 0.92, radiant: 0.30, resilient: 0.80, gentle: 0.80, free: 0.40, poetic: 0.85, noble: 0.65, authentic: 0.98 },
        dandelion:          { serene: 0.60, radiant: 0.60, resilient: 0.70, gentle: 0.60, free: 0.98, poetic: 0.85, noble: 0.30, authentic: 0.90 },
        wax_flower:         { serene: 0.75, radiant: 0.40, resilient: 0.95, gentle: 0.60, free: 0.50, poetic: 0.70, noble: 0.80, authentic: 0.85 },
        iris:               { serene: 0.50, radiant: 0.60, resilient: 0.85, gentle: 0.40, free: 0.70, poetic: 0.80, noble: 0.92, authentic: 0.65 },
        dahlia:             { serene: 0.30, radiant: 0.85, resilient: 0.80, gentle: 0.40, free: 0.70, poetic: 0.70, noble: 0.88, authentic: 0.65 },
        wisteria:           { serene: 0.70, radiant: 0.40, resilient: 0.85, gentle: 0.85, free: 0.50, poetic: 0.95, noble: 0.75, authentic: 0.75 },
        aster:              { serene: 0.80, radiant: 0.40, resilient: 0.65, gentle: 0.85, free: 0.50, poetic: 0.95, noble: 0.40, authentic: 0.90 },
        narcissus:          { serene: 0.60, radiant: 0.65, resilient: 0.70, gentle: 0.40, free: 0.50, poetic: 0.75, noble: 0.95, authentic: 0.60 },
        sim_flower:         { serene: 0.85, radiant: 0.40, resilient: 0.85, gentle: 0.80, free: 0.70, poetic: 0.80, noble: 0.30, authentic: 0.98 },
        bombax:             { serene: 0.40, radiant: 0.75, resilient: 0.95, gentle: 0.80, free: 0.50, poetic: 0.65, noble: 0.60, authentic: 0.95 },
        globe_amaranth:     { serene: 0.65, radiant: 0.50, resilient: 0.98, gentle: 0.75, free: 0.40, poetic: 0.70, noble: 0.40, authentic: 0.95 },
        tana_daisy:         { serene: 0.70, radiant: 0.90, resilient: 0.60, gentle: 0.80, free: 0.75, poetic: 0.60, noble: 0.30, authentic: 0.95 },
        rangoon_creeper:    { serene: 0.40, radiant: 0.80, resilient: 0.95, gentle: 0.50, free: 0.80, poetic: 0.65, noble: 0.60, authentic: 0.85 },
        hyacinth:           { serene: 0.80, radiant: 0.30, resilient: 0.50, gentle: 0.75, free: 0.40, poetic: 0.95, noble: 0.70, authentic: 0.70 },
        tuberose:           { serene: 0.90, radiant: 0.20, resilient: 0.70, gentle: 0.75, free: 0.30, poetic: 0.92, noble: 0.90, authentic: 0.80 },
        geranium:           { serene: 0.60, radiant: 0.65, resilient: 0.75, gentle: 0.95, free: 0.40, poetic: 0.60, noble: 0.40, authentic: 0.95 },
        melastoma:          { serene: 0.80, radiant: 0.40, resilient: 0.92, gentle: 0.75, free: 0.75, poetic: 0.75, noble: 0.30, authentic: 0.98 },
        periwinkle:         { serene: 0.75, radiant: 0.50, resilient: 0.98, gentle: 0.70, free: 0.60, poetic: 0.60, noble: 0.40, authentic: 0.95 },
        spiraea:            { serene: 0.80, radiant: 0.50, resilient: 0.60, gentle: 0.80, free: 0.60, poetic: 0.90, noble: 0.85, authentic: 0.80 },
        anthurium:          { serene: 0.20, radiant: 0.90, resilient: 0.80, gentle: 0.70, free: 0.60, poetic: 0.50, noble: 0.75, authentic: 0.80 },
        oncidium:           { serene: 0.30, radiant: 0.92, resilient: 0.60, gentle: 0.50, free: 0.92, poetic: 0.70, noble: 0.80, authentic: 0.65 },
        crape_myrtle:       { serene: 0.80, radiant: 0.40, resilient: 0.60, gentle: 0.85, free: 0.60, poetic: 0.98, noble: 0.50, authentic: 0.85 }
    };

    // Phân bổ 54 loài hoa vào 4 nhánh không gian độc bản
    const branchFamilies = [
        ['lotus', 'jasmine', 'water_lily', 'plumeria', 'camellia', 'daisy', 'baby_breath', 'osmanthus', 'sim_flower', 'melastoma', 'periwinkle', 'lavender', 'tana_daisy', 'geranium'],
        ['rose', 'peony', 'orchid', 'tulip', 'magnolia', 'lily', 'lisianthus', 'queen_of_the_night', 'white_champaca', 'iris', 'tuberose', 'spiraea', 'wisteria', 'narcissus'],
        ['sunflower', 'gerbera', 'poppy', 'allium', 'apricot_blossom', 'peach_blossom', 'cherry_blossom', 'bird_of_paradise', 'dahlia', 'bombax', 'anthurium', 'oncidium', 'rangoon_creeper'],
        ['hydrangea', 'forget_me_not', 'statice', 'marigold', 'hibiscus', 'lily_of_the_valley', 'dandelion', 'wax_flower', 'aster', 'globe_amaranth', 'hyacinth', 'crape_myrtle', 'carnation']
    ];

    // Các hàm tính toán đại số vector (Vector Algebra Helpers)
    const dotProduct = (v1, v2) => {
        let sum = 0;
        TRAIT_AXES.forEach((axis) => { sum += (v1[axis] || 0) * (v2[axis] || 0); });
        return sum;
    };
    const vectorMagnitude = (v) => {
        let sum = 0;
        TRAIT_AXES.forEach((axis) => { const val = v[axis] || 0; sum += val * val; });
        return Math.sqrt(sum) || 1;
    };
    const cosineSimilarity = (v1, v2) => {
        const mag1 = vectorMagnitude(v1);
        const mag2 = vectorMagnitude(v2);
        if (mag1 === 0 || mag2 === 0) return 0;
        return dotProduct(v1, v2) / (mag1 * mag2);
    };

    // Tính tổng điểm tối đa có thể đạt được của mỗi loài hoa ứng với nhánh rẽ đã chọn (Opportunity Normalization)
    const computeFlowerMaxPoints = (branchIdx) => {
        const maxPoints = {};
        for (let qIdx = 0; qIdx < FLOWER_QUIZ_QUESTIONS.length; qIdx++) {
            const q = (qIdx === 3)
                ? (ADAPTIVE_BRANCH_QUESTIONS[branchIdx] || FLOWER_QUIZ_QUESTIONS[3])
                : FLOWER_QUIZ_QUESTIONS[qIdx];
            if (!q || !q.options) continue;
            const questionMaxForFlower = {};
            q.options.forEach((opt) => {
                const pts = opt.points || {};
                Object.keys(pts).forEach((fid) => {
                    const val = pts[fid] || 0;
                    if (!questionMaxForFlower[fid] || val > questionMaxForFlower[fid]) {
                        questionMaxForFlower[fid] = val;
                    }
                });
            });
            Object.keys(questionMaxForFlower).forEach((fid) => {
                maxPoints[fid] = (maxPoints[fid] || 0) + questionMaxForFlower[fid];
            });
        }
        return maxPoints;
    };

    // Thuật toán phá thế hòa điểm đa chiều (Vector Affinity Tie-Breaker) kết hợp chuẩn hóa cơ hội
    // Bảo đảm 100% tất định (deterministic), không dùng Math.random(), tính toán dựa trên vector tâm lý học
    const pickWinningResult = (scores, results, state) => {
        const branchIdx = (state && state.answers && state.answers[2] !== undefined) ? state.answers[2] : 0;
        const maxPointsMap = computeFlowerMaxPoints(branchIdx);
        const favoredFamily = branchFamilies[branchIdx] || [];

        // 1. Tổng hợp Vector tâm lý 8 chiều của người dùng (User Personality Vector)
        const userVector = { serene: 0, radiant: 0, resilient: 0, gentle: 0, free: 0, poetic: 0, noble: 0, authentic: 0 };
        let totalWeight = 0;

        state.answers.forEach((optionIndex, questionIndex) => {
            const q = getActiveQuestion(state, questionIndex);
            if (!q || !q.options || !q.options[optionIndex]) return;
            const points = q.options[optionIndex].points || {};
            Object.keys(points).forEach((fid) => {
                const fVec = FLOWER_PERSONALITY_VECTORS[fid];
                const weight = points[fid] || 1;
                if (fVec) {
                    TRAIT_AXES.forEach((axis) => {
                        userVector[axis] += (fVec[axis] || 0) * weight;
                    });
                    totalWeight += weight;
                }
            });
        });

        if (totalWeight > 0) {
            TRAIT_AXES.forEach((axis) => { userVector[axis] /= totalWeight; });
        }

        // 2. Tính điểm tổng hợp (Composite Score) đa chiều:
        // - ratio: Tỷ lệ điểm tích lũy / điểm tối đa có thể đạt được của loài hoa đó (0.0 - 1.0) -> trọng số 15.0
        // - raw: Điểm tích lũy tuyệt đối (giúp loài hoa được chọn nhiều lần duy trì ưu thế) -> trọng số 0.4
        // - affinity: Độ tương đồng Cosine (Cosine Similarity) giữa vector người dùng và vector loài hoa -> trọng số 8.0
        // - branchBonus: Ưu thế tương thích với nhánh không gian độc bản ở Câu 3 -> cộng 2.0 điểm
        let best = results[0];
        let bestCompositeScore = -Infinity;

        results.forEach((r) => {
            const raw = scores[r.id] || 0;
            if (raw === 0) return; // Loài hoa chưa từng được chọn sẽ không xét thắng
            const max = maxPointsMap[r.id] || 1;
            const ratio = raw / max;
            const fVec = FLOWER_PERSONALITY_VECTORS[r.id];
            const affinity = fVec ? cosineSimilarity(userVector, fVec) : 0;
            const branchBonus = favoredFamily.includes(r.id) ? 2.0 : 0;

            const composite = (ratio * 15.0) + (raw * 0.4) + (affinity * 8.0) + branchBonus;

            if (composite > bestCompositeScore) {
                best = r;
                bestCompositeScore = composite;
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
    const tapSfx = () => {
        if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('tap');
    };

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
        const frontMotif = document.querySelector('.polaroid-flower-motif');
        if (frontMotif) frontMotif.textContent = '🌸';
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

        // Đồng bộ biểu tượng hoa lên mặt trước ảnh Polaroid
        const frontMotif = document.querySelector('.polaroid-flower-motif');
        if (frontMotif && result.emoji) frontMotif.textContent = result.emoji;

        const medallion = el('div', 'flower-quiz__medallion', result.emoji || '🌸');
        if (result.petalColor) medallion.style.setProperty('--fq-medal', result.petalColor);
        medallion.setAttribute('aria-hidden', 'true');

        const badges = el('div', 'flower-quiz__badges');
        (result.traits || []).slice(0, 3).forEach((t) => badges.appendChild(el('span', 'flower-quiz__badge', t)));
        if (window.PHONK_ELIGIBLE_FLOWERS && window.PHONK_ELIGIBLE_FLOWERS.includes(result.id)) {
            const phonkBtn = el('button', 'flower-quiz__phonk-easter-btn' + (window.isPhonkActive ? ' is-active' : ''), '⚡ Phonk Secret Beat 🔥');
            phonkBtn.type = 'button';
            phonkBtn.title = 'Mở khóa giai điệu Phonk bí ẩn dành riêng cho tính cách rực lửa của bạn';
            phonkBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof window.togglePhonkMode === 'function') window.togglePhonkMode();
                phonkBtn.classList.toggle('is-active', Boolean(window.isPhonkActive));
            });
            badges.appendChild(phonkBtn);
        }

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

        if (typeof window.triggerHaptic === 'function') {
            window.triggerHaptic('success');
        }

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
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('flip');
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
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('tap');
                if (typeof window.playChimeSFX !== 'undefined') window.playChimeSFX();
            });
        }

        setupFontToggle();
        initFlowerQuiz();
        initGiftVideoModal();
        initGiftBoxesDeck();
    };

    // =========================================================================
    // 6. PHASE 9 & 10: ZERO-LAG GIFT VIDEO LIGHTBOX & DUAL HERITAGE GIFT BOXES
    // =========================================================================
    const initGiftVideoModal = () => {
        const modal = document.getElementById('gift-video-modal');
        const closeBtn = document.getElementById('close-gift-video-btn');

        // Khôi phục trạng thái đã xem quà 1 từ sessionStorage
        window.gardenState = window.gardenState || {};
        try {
            if (sessionStorage.getItem('gift1Watched') === 'true') {
                window.gardenState.gift1Watched = true;
                unlockGiftBox2(true);
            }
        } catch (e) {
            console.log("SessionStorage access error:", e);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeGiftVideoModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeGiftVideoModal();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const m = document.getElementById('gift-video-modal');
                if (m && !m.classList.contains('hidden')) {
                    closeGiftVideoModal();
                }
            }
        });
    };

    const unlockGiftBox2 = (isSilent = false) => {
        window.gardenState = window.gardenState || {};
        window.gardenState.gift1Watched = true;
        try {
            sessionStorage.setItem('gift1Watched', 'true');
        } catch (e) {}

        const giftBox2 = document.getElementById('gift-box-2');
        const icon2 = document.getElementById('gift-box-2-icon');
        const status2 = document.getElementById('gift-box-2-status');
        const polaroidBtn2 = document.getElementById('polaroid-gift-btn-2');

        if (giftBox2) {
            giftBox2.classList.remove('is-locked');
            giftBox2.classList.add('is-unlocked');
            giftBox2.setAttribute('aria-label', 'Mở Hộp Quà Bí Mật Số 2: Điều Kỳ Diệu Tiếp Nối');
            if (icon2) icon2.textContent = '🪷';
            if (status2) {
                status2.textContent = 'Chạm để mở ngay ✨';
                status2.className = 'gift-box-status status-ready';
            }
        }

        if (polaroidBtn2) {
            polaroidBtn2.classList.remove('is-locked');
            polaroidBtn2.textContent = '🪷 Mở Hộp Quà 2';
        }

        if (!isSilent) {
            if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
            if (typeof window.triggerHaptic === 'function') window.triggerHaptic('success');
            if (typeof window.showMascotSpeech === 'function') {
                window.showMascotSpeech("Aww tuyệt vời quá! Hộp Quà số 2 đã mở khóa rồi nè bạn ơi! 🪷✨", 4500);
            }
        }
    };

    const handleGift1Completed = () => {
        window.gardenState = window.gardenState || {};
        if (window.gardenState.gift1Watched) return;
        window.gardenState.gift1Watched = true;
        try {
            sessionStorage.setItem('gift1Watched', 'true');
        } catch (e) {}

        const noteEl = document.getElementById('gift-video-note');
        if (noteEl) {
            noteEl.textContent = '🎉 Tuyệt vời! Bạn đã mở khóa Hộp Quà số 2!';
        }

        unlockGiftBox2(false);
    };

    const openGiftVideoModal = (giftIndex = 1) => {
        const modal = document.getElementById('gift-video-modal');
        const player = document.getElementById('gift-video-player');
        const srcMp4 = document.getElementById('gift-video-src-mp4');
        const badgeEl = document.getElementById('gift-video-badge');
        const titleEl = document.getElementById('gift-video-title');
        const subtitleEl = document.getElementById('gift-video-subtitle');
        const noteEl = document.getElementById('gift-video-note');

        if (!modal || !player) return;

        window.gardenState = window.gardenState || {};
        const isBox1 = (giftIndex === 1);
        const videoData = isBox1 ? {
            mp4: './video/vid_1.mp4',
            badge: '✨ THƯỚC PHIM KỶ NIỆM · MÓN QUÀ SỐ 1 ✨',
            title: 'Kỷ Niệm Rực Rỡ & Nụ Cười Bạn',
            subtitle: 'Lắng nghe thanh âm và những khoảnh khắc ngọt ngào',
            note: window.gardenState.gift1Watched 
                ? '✨ Bạn đã xem xong món quà này. Có thể mở Hộp Quà số 2 bất cứ lúc nào!' 
                : '💡 Hãy xem hết video để mở khóa Hộp Quà Bí Mật số 2 nhé!'
        } : {
            mp4: './video/vid_2.mp4',
            badge: '✨ ĐIỀU KỲ DIỆU TIẾP NỐI · MÓN QUÀ SỐ 2 ✨',
            title: 'Gửi Trao Vạn Lời Chúc Yêu Thương',
            subtitle: 'Món quà son sắc dành tặng riêng cho bạn ngày 20/10',
            note: '🌟 Chúc bạn một ngày tràn ngập niềm vui và hạnh phúc!'
        };

        if (badgeEl) badgeEl.textContent = videoData.badge;
        if (titleEl) titleEl.textContent = videoData.title;
        if (subtitleEl) subtitleEl.textContent = videoData.subtitle;
        if (noteEl) noteEl.textContent = videoData.note;

        // Reveal modal immediately so user sees response
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');

        // Reset and set sources
        try {
            player.pause();
            if (srcMp4) srcMp4.src = videoData.mp4;
            player.src = videoData.mp4; // Direct src for bulletproof cross-browser playback
            player.load();
            player.currentTime = 0;
        } catch (e) {
            console.log("Video source load exception handled:", e);
        }

        // Auto pause BGM on video play
        player.onplay = () => {
            if (typeof window.pauseBgmForVideo === 'function') {
                window.pauseBgmForVideo();
            }
        };

        // Track 95% completion for Box 1
        player.ontimeupdate = () => {
            if (isBox1 && player.duration > 0 && (player.currentTime / player.duration >= 0.95)) {
                handleGift1Completed();
            }
        };

        // Resume BGM and unlock on end
        player.onended = () => {
            if (isBox1) {
                handleGift1Completed();
            }
            if (typeof window.resumeBgmAfterVideo === 'function') {
                window.resumeBgmAfterVideo();
            }
        };

        const playPromise = player.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.log("Video autoplay waiting for manual play:", e);
            });
        }

        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('medium');
        if (typeof window.playMatchStrikeSFX === 'function') window.playMatchStrikeSFX();
    };

    const closeGiftVideoModal = () => {
        const modal = document.getElementById('gift-video-modal');
        const player = document.getElementById('gift-video-player');
        const srcMp4 = document.getElementById('gift-video-src-mp4');

        if (!modal) return;

        if (player) {
            player.pause();
            player.onplay = null;
            player.ontimeupdate = null;
            player.onended = null;
            if (srcMp4) srcMp4.removeAttribute('src');
            player.removeAttribute('src');
            try { player.load(); } catch (_) {}
        }

        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');

        if (typeof window.resumeBgmAfterVideo === 'function') {
            window.resumeBgmAfterVideo();
        }

        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('light');
    };

    let giftBoxesInitialized = false;
    const initGiftBoxesDeck = () => {
        const giftBox1 = document.getElementById('gift-box-1');
        const giftBox2 = document.getElementById('gift-box-2');
        const polaroidBtn1 = document.getElementById('polaroid-gift-btn-1');
        const polaroidBtn2 = document.getElementById('polaroid-gift-btn-2');

        const handleBox1 = (e) => {
            if (e) {
                if (e.cancelable) e.preventDefault();
                e.stopPropagation();
            }
            openGiftVideoModal(1);
        };

        const handleBox2 = (e) => {
            if (e) {
                if (e.cancelable) e.preventDefault();
                e.stopPropagation();
            }
            window.gardenState = window.gardenState || {};
            if (!window.gardenState.gift1Watched) {
                const targetBox = document.getElementById('gift-box-2');
                if (targetBox) {
                    targetBox.classList.remove('shake-locked');
                    void targetBox.offsetWidth;
                    targetBox.classList.add('shake-locked');
                    setTimeout(() => { if (targetBox) targetBox.classList.remove('shake-locked'); }, 500);
                }
                if (typeof window.triggerHaptic === 'function') window.triggerHaptic('medium');
                if (typeof window.showMascotSpeech === 'function') {
                    window.showMascotSpeech("Bạn ơi, hãy xem trọn vẹn món quà thứ nhất trước nhé! 🎁💖", 4000);
                }
            } else {
                openGiftVideoModal(2);
            }
        };

        if (giftBox1) giftBox1.addEventListener('click', handleBox1);
        if (polaroidBtn1) polaroidBtn1.addEventListener('click', handleBox1);

        if (giftBox2) giftBox2.addEventListener('click', handleBox2);
        if (polaroidBtn2) polaroidBtn2.addEventListener('click', handleBox2);

        // Global Event Delegation so clicks always work even if DOM updates
        if (!giftBoxesInitialized) {
            giftBoxesInitialized = true;
            document.addEventListener('click', (e) => {
                const target1 = e.target && e.target.closest('#gift-box-1, #polaroid-gift-btn-1');
                if (target1) {
                    handleBox1(e);
                    return;
                }
                const target2 = e.target && e.target.closest('#gift-box-2, #polaroid-gift-btn-2');
                if (target2) {
                    handleBox2(e);
                    return;
                }
            }, true); // Capture phase to prevent any swallowing
        }

        // Check if already watched in previous session
        try {
            if (sessionStorage.getItem('gift1Watched') === 'true') {
                unlockGiftBox2(true);
            }
        } catch (e) {}
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
    window.openGiftVideoModal = openGiftVideoModal;
    window.closeGiftVideoModal = closeGiftVideoModal;
    window.handleGift1Completed = handleGift1Completed;
    window.unlockGiftBox2 = unlockGiftBox2;
    window.initGiftBoxesDeck = initGiftBoxesDeck;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecretLetter);
    } else {
        initSecretLetter();
    }
})();
