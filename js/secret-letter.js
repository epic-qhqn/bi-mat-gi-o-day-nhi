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
        if (typeof window.playKeyTapSFX !== 'undefined') window.playKeyTapSFX();
    };

    const revealSecretLetterButton = () => {
        if (secretContainer) {
            secretContainer.classList.remove('hidden');
            secretContainer.classList.add('show');
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
    // 4. INITIALIZATION & EVENT LISTENERS
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
                if (e.target && (e.target.closest('#polaroid-font-btn') || e.target.closest('#polaroid-shuffle-btn'))) return;

                e.stopPropagation();
                const willBeFlipped = !polaroid.classList.contains('flipped');
                if (willBeFlipped) {
                    updatePolaroidLetterContent();
                }
                polaroid.classList.toggle('flipped');
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
    };

    // Public API
    window.openSecretLetterModal = openSecretLetterModal;
    window.closeSecretLetterModal = closeSecretLetterModal;
    window.revealSecretLetterButton = revealSecretLetterButton;
    window.updatePolaroidLetterContent = updatePolaroidLetterContent;
    window.typeWriter = typeWriter;
    window.loadContentAndAnimateText = loadContentAndAnimateText;
    window.initSecretLetter = initSecretLetter;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecretLetter);
    } else {
        initSecretLetter();
    }
})();
