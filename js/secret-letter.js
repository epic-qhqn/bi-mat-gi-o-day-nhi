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
        {
            category: 'Đi chơi nhóm',
            art: { emoji: '🌻🪴', tone: 'blue' },
            text: 'Cả nhóm bàn mãi vẫn chưa chốt được đi đâu, lúc đó bạn sẽ...',
            options: [
                { text: 'Nhắn riêng cho đứa thân nhất: “Đi đâu cũng được, có cậu là vui.”', points: { daisy: 2, lotus: 1 } },
                { text: 'Thôi để mình quyết, rồi giao việc luôn cho từng người.', points: { peony: 2, tulip: 1 } },
                { text: 'Rủ cả nhóm thử một chỗ chưa ai từng đến.', points: { poppy: 2, allium: 1 } },
                { text: 'Ngồi yên quan sát, để ý xem ai đang không thoải mái.', points: { lotus: 2, tulip: 1 } }
            ]
        },
        {
            category: 'Chiều rảnh rỗi',
            art: { emoji: '☕📖', tone: 'blush' },
            text: 'Một buổi chiều không phải làm gì cả, bạn thường...',
            options: [
                { text: 'Pha trà, mở nhạc và đọc nốt cuốn sách dang dở.', points: { lotus: 2, tulip: 1 } },
                { text: 'Nghĩ ra một trò điên rồ rồi rủ cả hội thử.', points: { allium: 2, poppy: 1 } },
                { text: 'Gọi điện hỏi thăm một người lâu rồi chưa nói chuyện.', points: { sunflower: 2, daisy: 1 } },
                { text: 'Nấu một bữa thật ngon rồi nhắn mọi người ghé qua.', points: { peony: 2, sunflower: 1 } }
            ]
        },
        {
            category: 'Khi áp lực',
            art: { emoji: '⏰🌧️', tone: 'sage' },
            text: 'Deadline dí sát nút mà mọi thứ rối tung, bạn sẽ...',
            options: [
                { text: 'Hít thở sâu, làm từng việc một cho tới khi xong.', points: { tulip: 2, lotus: 1 } },
                { text: 'Đổi hẳn cách làm, biết đâu lại nhanh hơn.', points: { allium: 2, poppy: 1 } },
                { text: 'Cười trừ, rồi kéo mọi người làm cùng cho vui.', points: { sunflower: 2, daisy: 1 } },
                { text: 'Nhận phần việc khó nhất về mình, không để ai phải lo.', points: { peony: 2, tulip: 1 } }
            ]
        },
        {
            category: 'Nét duyên của bạn',
            art: { emoji: '💌🌷', tone: 'sun' },
            text: 'Người ta quý bạn nhất vì điều gì?',
            options: [
                { text: 'Luôn lắng nghe và không bao giờ phán xét.', points: { daisy: 2, lotus: 1 } },
                { text: 'Dám nói thật và sống hết mình.', points: { poppy: 2, sunflower: 1 } },
                { text: 'Ở cạnh bạn ai cũng thấy được tiếp thêm năng lượng.', points: { sunflower: 2, allium: 1 } },
                { text: 'Là chỗ dựa vững vàng mỗi khi người ta cần.', points: { peony: 2, tulip: 1 } }
            ]
        }
    ];

    // Nhãn 3 dòng chi tiết ↔ khóa trong flowerProfiles[].checklist
    const FLOWER_QUIZ_DETAIL_ROWS = [
        { key: 'friend',   label: 'Nét duyên ngày thường' },
        { key: 'love',     label: 'Khi trao yêu thương' },
        { key: 'pressure', label: 'Khi đối diện âu lo' }
    ];

    // Dữ liệu kết quả = window.flowerProfiles (content.js). Dự phòng nếu content.js chưa tải.
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
        const options = state.questions[getQuizIndex(state)].options;
        if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= options.length) return state;
        return { ...state, answers: [...state.answers, optionIndex] };
    };
    const goBackOneQuestion = (state) =>
        state.answers.length ? { ...state, answers: state.answers.slice(0, -1) } : state;

    const computeQuizScores = (state) => {
        const scores = {};
        state.answers.forEach((optionIndex, questionIndex) => {
            const points = state.questions[questionIndex].options[optionIndex].points || {};
            Object.keys(points).forEach((id) => { scores[id] = (scores[id] || 0) + points[id]; });
        });
        return scores;
    };

    // Điểm cao nhất thắng; hòa điểm → loại đứng trước trong danh sách profiles.
    const pickWinningResult = (scores, results) => {
        let best = results[0];
        let bestScore = -1;
        results.forEach((r) => {
            const sc = scores[r.id] || 0;
            if (sc > bestScore) { best = r; bestScore = sc; }
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
        const question = quizState.questions[index];
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
        const result = pickWinningResult(computeQuizScores(quizState), getFlowerResults());
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
