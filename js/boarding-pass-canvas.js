/**
 * ============================================================================
 * SUB-PHASE 4.2 / PHASE 3: RETINA CANVAS 2D EXPORT ENGINE (1080 x 1920 STORY RESOLUTION)
 * 100% Client-Side Pure HTML5 Canvas rendering for "Bưu Thiếp Hương Đồng Cỏ Nội 20/10"
 * ============================================================================
 */

(function () {
    // Preload Ao Dai asset for Story Canvas
    if (typeof window !== 'undefined' && !window.aoDaiVietImg) {
        window.aoDaiVietImg = new Image();
        window.aoDaiVietImg.src = './img/ao-dai-viet.webp';
    }

    // Utility: Safe roundRect polyfill for canvas context
    function drawRoundRect(ctx, x, y, width, height, radius) {
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            radius = Object.assign({ tl: 0, tr: 0, br: 0, bl: 0 }, radius);
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
    }

    // Utility: Multiline word wrapping
    function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
        if (!text) return y;
        const words = text.split(' ');
        let line = '';
        let currentY = y;
        let lineCount = 0;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lineCount++;
                if (lineCount >= maxLines) {
                    ctx.fillText(line.trim() + '...', x, currentY);
                    return currentY + lineHeight;
                }
                ctx.fillText(line.trim(), x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line.trim(), x, currentY);
        return currentY + lineHeight;
    }

    /**
     * Core Render Engine: Renders 1080x1920 Story Postcard Canvas
     * @param {Object} options Custom overrides for profile, passenger, etc.
     * @returns {HTMLCanvasElement}
     */
    window.generateBoardingPassCanvas = function (options = {}) {
        const width = 1080;
        const height = 1920;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Data sources
        const profile = options.profile || (typeof window.getCurrentFlowerProfile === 'function' ? window.getCurrentFlowerProfile() : null) || {
            flowerName: "Lotus",
            vietnameseName: "Hoa Sen",
            title: "Bạn là đóa Sen Lụa thanh tao.",
            quote: "Gần bùn chẳng vướng bụi trần, thơm ngát dịu dàng.",
            emoji: "🪷",
            traits: ["Thanh cao", "Dịu dàng", "Tâm hồn thuần khiết"],
            petalColor: "#D47A88",
            bgColor: "#FAF7F0",
            match: [
                { icon: "🌼", name: "Cúc họa mi", desc: "Cùng mang nét đẹp bình dị, thanh tao." },
                { icon: "🌷", name: "Tulip", desc: "Đồng điệu sự trang nhã và chiều sâu tâm hồn." }
            ],
            clash: [
                { icon: "🌪️", name: "Bão cát", desc: "Ồn ào náo nhiệt không hợp với nét tĩnh tại." },
                { icon: "🌵", name: "Gai nhọn", desc: "Dễ làm tổn thương vẻ mềm mại, e ấp." }
            ],
            checklist: {
                friend: "Chốn bình yên ai cũng muốn tìm về sau những mệt mỏi.",
                love: "Thương bằng tình cảm sâu lắng, chung thủy và sắt son.",
                pressure: "Tĩnh lặng nhìn nhận, giữ trọn cốt cách và nét an nhiên."
            }
        };

        const passengerName = (options.passengerName || window.currentUserName || (typeof userName !== 'undefined' ? userName : '') || 'Bạn Yêu Thương').trim();

        // -------------------------------------------------------------
        // 1. Background (Warm Giấy Dó Ivory & Soft Autumn Petals)
        // -------------------------------------------------------------
        ctx.fillStyle = "#FAF7F0";
        ctx.fillRect(0, 0, width, height);

        // Soft Decorative Dó Paper Fibers & Starlight Dots
        ctx.fillStyle = "rgba(212, 122, 136, 0.16)";
        for (let gx = 30; gx < width; gx += 40) {
            for (let gy = 30; gy < height; gy += 40) {
                if ((gx + gy) % 80 === 0) {
                    ctx.beginPath();
                    ctx.arc(gx, gy, 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // -------------------------------------------------------------
        // 2. The Main Postcard Card (960 x 1760 at x=60, y=70)
        // -------------------------------------------------------------
        const cardX = 60;
        const cardY = 70;
        const cardW = 960;
        const cardH = 1760;
        const cardRadius = 24;

        // Soft ambient mist shadow
        ctx.save();
        ctx.shadowColor = "rgba(74, 55, 40, 0.1)";
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 16;
        ctx.fillStyle = "#FFFDF9";
        drawRoundRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
        ctx.fill();
        ctx.restore();

        // Card Outer Border
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 2.5;
        drawRoundRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
        ctx.stroke();

        // Card Inner Decorative Inset Border
        ctx.strokeStyle = "rgba(212, 122, 136, 0.3)";
        ctx.lineWidth = 1;
        drawRoundRect(ctx, cardX + 8, cardY + 8, cardW - 16, cardH - 16, cardRadius - 4);
        ctx.stroke();

        // -------------------------------------------------------------
        // 3. Postcard Header (x=60, y=70, w=960, h=300)
        // -------------------------------------------------------------
        const headerH = 300;
        ctx.save();
        drawRoundRect(ctx, cardX, cardY, cardW, headerH, { tl: cardRadius, tr: cardRadius, bl: 0, br: 0 });
        ctx.clip();
        ctx.fillStyle = "#FAF7F0";
        ctx.fillRect(cardX, cardY, cardW, headerH);
        ctx.restore();

        // Top Badge: BƯU THIẾP KỶ NIỆM · 20/10 ĐONG ĐẦY YÊU THƯƠNG
        ctx.fillStyle = "#F5EBE6";
        drawRoundRect(ctx, cardX + cardW / 2 - 270, cardY + 28, 540, 38, 10);
        ctx.fill();
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, cardX + cardW / 2 - 270, cardY + 28, 540, 38, 10);
        ctx.stroke();

        ctx.fillStyle = "#4A3728";
        ctx.font = "bold 15px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("BƯU THIẾP KỶ NIỆM · 20/10 ĐONG ĐẦY YÊU THƯƠNG", cardX + cardW / 2, cardY + 47);

        // Circular Postmark Cancellation Stamp (Top-Left of Header)
        ctx.save();
        const stampX = cardX + 115;
        const stampY = cardY + 68;
        ctx.translate(stampX, stampY);
        ctx.rotate((-10 * Math.PI) / 180);

        // Outer Ring
        ctx.strokeStyle = "#C53030";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 34, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Ring
        ctx.strokeStyle = "rgba(197, 48, 48, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.stroke();

        // Stamp Text
        ctx.fillStyle = "#C53030";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 7px 'Outfit', sans-serif";
        ctx.fillText("★ 20/10/2026 ★", 0, -14);
        ctx.font = "bold 8.5px 'Outfit', sans-serif";
        ctx.fillText("BƯU ĐIỆN", 0, -1);
        ctx.fillText("ĐỒNG NỘI", 0, 10);
        ctx.font = "bold 6.5px 'Outfit', sans-serif";
        ctx.fillText("ĐÃ TRAO", 0, 20);

        // Wavy Cancellation Lines
        ctx.strokeStyle = "#C53030";
        ctx.lineWidth = 1.8;
        for (let waveY of [-8, 0, 8]) {
            ctx.beginPath();
            for (let wx = 42; wx <= 100; wx += 2) {
                const wy = waveY + Math.sin((wx - 42) * 0.2) * 3;
                if (wx === 42) ctx.moveTo(wx, wy);
                else ctx.lineTo(wx, wy);
            }
            ctx.stroke();
        }
        ctx.restore();

        // Postal Route Display: VƯỜN BÍ MẬT  🕊️ THƯ TÌNH ĐỒNG NỘI  NÀNG THƠ
        const routeY = cardY + 125;
        // Point: Vườn Bí Mật
        ctx.textAlign = "left";
        ctx.font = "900 32px 'Outfit', sans-serif";
        ctx.fillStyle = "#4A3728";
        ctx.fillText("VƯỜN BÍ MẬT", cardX + 60, routeY);
        ctx.font = "600 17px 'Outfit', sans-serif";
        ctx.fillStyle = "#8C7A6B";
        ctx.fillText("Nơi Gieo Mầm 🪷", cardX + 60, routeY + 28);

        // Middle Postal Tag
        const midX = cardX + cardW / 2;
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        drawRoundRect(ctx, midX - 110, routeY - 26, 220, 38, 10);
        ctx.fill();
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, midX - 110, routeY - 26, 220, 38, 10);
        ctx.stroke();

        ctx.fillStyle = "#4A3728";
        ctx.font = "bold 13.5px 'Outfit', sans-serif";
        ctx.fillText("🕊️ THƯ TÌNH ĐỒNG NỘI", midX, routeY - 7);

        // Connecting dotted line
        ctx.strokeStyle = "#D6CBC0";
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cardX + 270, routeY - 8);
        ctx.lineTo(midX - 120, routeY - 8);
        ctx.moveTo(midX + 120, routeY - 8);
        ctx.lineTo(cardX + cardW - 240, routeY - 8);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Point: Nàng Thơ
        ctx.textAlign = "right";
        ctx.font = "900 32px 'Outfit', sans-serif";
        ctx.fillStyle = "#D47A88";
        ctx.fillText("NÀNG THƠ", cardX + cardW - 60, routeY);
        ctx.font = "600 17px 'Outfit', sans-serif";
        ctx.fillStyle = "#8C7A6B";
        ctx.fillText("Trái Tim Nàng 💖", cardX + cardW - 60, routeY + 28);

        // Meta Info Grid (3 Parchment cards)
        const metaY = cardY + 185;
        const metaCardW = (cardW - 120 - 32) / 3;
        const metaH = 80;

        const metaItems = [
            { label: "NGƯỜI NHẬN", val: passengerName, highlight: false },
            { label: "NGÀY TRAO GỬI", val: "20/10/2026", highlight: false },
            { label: "TÌNH CẢM", val: "ĐONG ĐẦY NẮNG ẤM", highlight: true }
        ];

        metaItems.forEach((item, idx) => {
            const mx = cardX + 60 + idx * (metaCardW + 16);
            ctx.fillStyle = "#FFFFFF";
            drawRoundRect(ctx, mx, metaY, metaCardW, metaH, 12);
            ctx.fill();
            ctx.strokeStyle = "#E6DED5";
            ctx.lineWidth = 1.5;
            drawRoundRect(ctx, mx, metaY, metaCardW, metaH, 12);
            ctx.stroke();

            ctx.textAlign = "center";
            ctx.fillStyle = "#8C7A6B";
            ctx.font = "bold 12.5px 'Outfit', sans-serif";
            ctx.fillText(item.label, mx + metaCardW / 2, metaY + 28);

            ctx.fillStyle = item.highlight ? "#D47A88" : "#4A3728";
            ctx.font = "bold 19px 'Outfit', sans-serif";
            let displayVal = item.val;
            if (ctx.measureText(displayVal).width > metaCardW - 20) {
                displayVal = displayVal.substring(0, 12) + '...';
            }
            ctx.fillText(displayVal, mx + metaCardW / 2, metaY + 56);
        });

        // -------------------------------------------------------------
        // 4. Perforated Tear Notch Line (at y = cardY + headerH)
        // -------------------------------------------------------------
        const tearY = cardY + headerH;
        const notchRadius = 24;

        // Left Notch
        ctx.save();
        ctx.fillStyle = "#FAF7F0";
        ctx.beginPath();
        ctx.arc(cardX, tearY, notchRadius, -Math.PI / 2, Math.PI / 2);
        ctx.fill();
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();

        // Right Notch
        ctx.save();
        ctx.fillStyle = "#FAF7F0";
        ctx.beginPath();
        ctx.arc(cardX + cardW, tearY, notchRadius, Math.PI / 2, -Math.PI / 2);
        ctx.fill();
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();

        // Dashed Perforation Line
        ctx.save();
        ctx.strokeStyle = "#D6CBC0";
        ctx.setLineDash([12, 10]);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cardX + notchRadius + 10, tearY);
        ctx.lineTo(cardX + cardW - notchRadius - 10, tearY);
        ctx.stroke();
        ctx.restore();

        // Center Seal Pill (💌 Mở niêm phong)
        const sealPillW = 150;
        const sealPillH = 32;
        ctx.fillStyle = "#FFFDF9";
        drawRoundRect(ctx, cardX + cardW / 2 - sealPillW / 2, tearY - sealPillH / 2, sealPillW, sealPillH, 10);
        ctx.fill();
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, cardX + cardW / 2 - sealPillW / 2, tearY - sealPillH / 2, sealPillW, sealPillH, 10);
        ctx.stroke();

        ctx.fillStyle = "#4A3728";
        ctx.font = "bold 13px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("💌 Mở niêm phong", cardX + cardW / 2, tearY);

        // -------------------------------------------------------------
        // 5. Postcard Body: 2 Columns Layout
        // Left: Flower ID (x=cardX+44, w=530)
        // Right: Photobooth Strip (x=cardX+595, w=320)
        // -------------------------------------------------------------
        const bodyY = tearY + 36;
        const colLeftX = cardX + 44;
        const colLeftW = 530;

        // Badge: HOA TÂM HỒN NÀNG THƠ · 20/10
        ctx.fillStyle = "#F5EBE6";
        drawRoundRect(ctx, colLeftX, bodyY, 240, 32, 10);
        ctx.fill();
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 1;
        drawRoundRect(ctx, colLeftX, bodyY, 240, 32, 10);
        ctx.stroke();

        ctx.fillStyle = "#4A3728";
        ctx.font = "bold 12.5px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("HOA TÂM HỒN NÀNG THƠ · 20/10", colLeftX + 120, bodyY + 17);

        // Flower Identity Title
        ctx.textAlign = "left";
        ctx.fillStyle = "#4A3728";
        ctx.font = "800 30px 'Outfit', sans-serif";
        ctx.fillText(profile.title, colLeftX, bodyY + 70);

        // Flower Quote
        ctx.fillStyle = "#8C7A6B";
        ctx.font = "500 17.5px 'Outfit', sans-serif";
        ctx.fillText(profile.quote, colLeftX, bodyY + 100);

        // -------------------------------------------------------------
        // 6. Flower Vector Art & Center Avatar (Selfie or Emoji)
        // -------------------------------------------------------------
        const flowerCenterX = colLeftX + colLeftW / 2;
        const flowerCenterY = bodyY + 225;
        const flowerRadius = 95;

        // Outer flower background circle
        ctx.fillStyle = profile.bgColor || "#FAF7F0";
        ctx.beginPath();
        ctx.arc(flowerCenterX, flowerCenterY, flowerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 8 Petals radiating outward
        const petalColor = profile.petalColor || "#D47A88";
        const petalDist = 68;
        const petalRadius = 18;
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const px = flowerCenterX + Math.cos(angle) * petalDist;
            const py = flowerCenterY + Math.sin(angle) * petalDist;
            ctx.fillStyle = petalColor;
            ctx.globalAlpha = 0.88;
            ctx.beginPath();
            ctx.arc(px, py, petalRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }

        // Center Avatar Slot (Radius 50)
        const centerAvatarRadius = 50;
        const customImg = window.customFlowerAvatarImg;

        if (customImg && customImg.complete && customImg.naturalWidth > 0) {
            // Render user selfie with circular clipping
            ctx.save();
            ctx.beginPath();
            ctx.arc(flowerCenterX, flowerCenterY, centerAvatarRadius, 0, Math.PI * 2);
            ctx.clip();

            // Cover fit calculation
            const imgAspect = customImg.naturalWidth / customImg.naturalHeight;
            let drawW, drawH, drawX, drawY;
            if (imgAspect > 1) {
                drawH = centerAvatarRadius * 2;
                drawW = drawH * imgAspect;
                drawX = flowerCenterX - drawW / 2;
                drawY = flowerCenterY - centerAvatarRadius;
            } else {
                drawW = centerAvatarRadius * 2;
                drawH = drawW / imgAspect;
                drawX = flowerCenterX - centerAvatarRadius;
                drawY = flowerCenterY - drawH / 2;
            }
            ctx.drawImage(customImg, drawX, drawY, drawW, drawH);
            ctx.restore();

            // Circular rim
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(flowerCenterX, flowerCenterY, centerAvatarRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = "#E6DED5";
            ctx.lineWidth = 2;
            ctx.stroke();
        } else {
            // Render Default Emoji
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(flowerCenterX, flowerCenterY, centerAvatarRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#E6DED5";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = "46px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(profile.emoji || "🪷", flowerCenterX, flowerCenterY + 4);
        }

        // -------------------------------------------------------------
        // 7. Trait Pills Row
        // -------------------------------------------------------------
        const traitsY = flowerCenterY + flowerRadius + 32;
        const traits = Array.isArray(profile.traits) ? profile.traits : ["Thanh cao", "Dịu dàng", "Tâm hồn thuần khiết"];
        let traitStartX = colLeftX + (colLeftW - (traits.length * 135 + (traits.length - 1) * 12)) / 2;

        traits.forEach((t) => {
            const pillW = 135;
            const pillH = 36;
            ctx.fillStyle = "#FAF7F0";
            drawRoundRect(ctx, traitStartX, traitsY, pillW, pillH, 10);
            ctx.fill();
            ctx.strokeStyle = "#E6DED5";
            ctx.lineWidth = 1.5;
            drawRoundRect(ctx, traitStartX, traitsY, pillW, pillH, 10);
            ctx.stroke();

            ctx.fillStyle = "#4A3728";
            ctx.font = "bold 14px 'Outfit', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(t, traitStartX + pillW / 2, traitsY + pillH / 2);

            traitStartX += pillW + 12;
        });

        // -------------------------------------------------------------
        // 8. Compatibility Match & Clash Boxes (Side-by-side)
        // -------------------------------------------------------------
        const compatY = traitsY + 60;
        const boxW = (colLeftW - 16) / 2;
        const boxH = 150;

        // Box 1: Match (Đồng điệu tâm hồn)
        ctx.fillStyle = "#FFF5F7";
        drawRoundRect(ctx, colLeftX, compatY, boxW, boxH, 14);
        ctx.fill();
        ctx.strokeStyle = "#FED7E2";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, colLeftX, compatY, boxW, boxH, 14);
        ctx.stroke();

        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#4A3728";
        ctx.font = "bold 13.5px 'Outfit', sans-serif";
        ctx.fillText("ĐỒNG ĐIỆU TÂM HỒN", colLeftX + 16, compatY + 14);

        if (profile.match && profile.match.length >= 2) {
            // Item 1
            ctx.font = "18px sans-serif";
            ctx.fillText(profile.match[0].icon, colLeftX + 16, compatY + 42);
            ctx.fillStyle = "#4A3728";
            ctx.font = "bold 14px 'Outfit', sans-serif";
            ctx.fillText(profile.match[0].name, colLeftX + 44, compatY + 42);
            ctx.fillStyle = "#8C7A6B";
            ctx.font = "500 12px 'Outfit', sans-serif";
            ctx.fillText(profile.match[0].desc, colLeftX + 44, compatY + 62);

            // Item 2
            ctx.font = "18px sans-serif";
            ctx.fillText(profile.match[1].icon, colLeftX + 16, compatY + 92);
            ctx.fillStyle = "#4A3728";
            ctx.font = "bold 14px 'Outfit', sans-serif";
            ctx.fillText(profile.match[1].name, colLeftX + 44, compatY + 92);
            ctx.fillStyle = "#8C7A6B";
            ctx.font = "500 12px 'Outfit', sans-serif";
            ctx.fillText(profile.match[1].desc, colLeftX + 44, compatY + 112);
        }

        // Box 2: Clash (Khác biệt nét duyên)
        const box2X = colLeftX + boxW + 16;
        ctx.fillStyle = "#F8F6F0";
        drawRoundRect(ctx, box2X, compatY, boxW, boxH, 14);
        ctx.fill();
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, box2X, compatY, boxW, boxH, 14);
        ctx.stroke();

        ctx.fillStyle = "#4A3728";
        ctx.font = "bold 13.5px 'Outfit', sans-serif";
        ctx.fillText("KHÁC BIỆT NÉT DUYÊN", box2X + 16, compatY + 14);

        if (profile.clash && profile.clash.length >= 2) {
            // Item 1
            ctx.font = "18px sans-serif";
            ctx.fillText(profile.clash[0].icon, box2X + 16, compatY + 42);
            ctx.fillStyle = "#4A3728";
            ctx.font = "bold 14px 'Outfit', sans-serif";
            ctx.fillText(profile.clash[0].name, box2X + 44, compatY + 42);
            ctx.fillStyle = "#8C7A6B";
            ctx.font = "500 12px 'Outfit', sans-serif";
            ctx.fillText(profile.clash[0].desc, box2X + 44, compatY + 62);

            // Item 2
            ctx.font = "18px sans-serif";
            ctx.fillText(profile.clash[1].icon, box2X + 16, compatY + 92);
            ctx.fillStyle = "#4A3728";
            ctx.font = "bold 14px 'Outfit', sans-serif";
            ctx.fillText(profile.clash[1].name, box2X + 44, compatY + 92);
            ctx.fillStyle = "#8C7A6B";
            ctx.font = "500 12px 'Outfit', sans-serif";
            ctx.fillText(profile.clash[1].desc, box2X + 44, compatY + 112);
        }

        // -------------------------------------------------------------
        // 9. Detailed Personality Checklist (3 rows)
        // -------------------------------------------------------------
        const checkY = compatY + boxH + 20;
        const checkRows = [
            { label: "NÉT DUYÊN NGÀY THƯỜNG", desc: profile.checklist ? profile.checklist.friend : "Chốn bình yên ai cũng muốn tìm về sau những mệt mỏi." },
            { label: "KHI TRAO YÊU THƯƠNG", desc: profile.checklist ? profile.checklist.love : "Thương bằng tình cảm sâu lắng, chung thủy và sắt son." },
            { label: "KHI ĐỐI DIỆN ÂU LO", desc: profile.checklist ? profile.checklist.pressure : "Tĩnh lặng nhìn nhận, giữ trọn cốt cách và nét an nhiên." }
        ];

        checkRows.forEach((r, idx) => {
            const ry = checkY + idx * 56;
            ctx.fillStyle = "#FAF7F0";
            drawRoundRect(ctx, colLeftX, ry, colLeftW, 46, 10);
            ctx.fill();
            ctx.strokeStyle = "#E6DED5";
            ctx.lineWidth = 1;
            drawRoundRect(ctx, colLeftX, ry, colLeftW, 46, 10);
            ctx.stroke();

            // Label pill inside
            ctx.fillStyle = "#FFFFFF";
            drawRoundRect(ctx, colLeftX + 6, ry + 6, 160, 34, 8);
            ctx.fill();
            ctx.strokeStyle = "#E6DED5";
            ctx.lineWidth = 1;
            drawRoundRect(ctx, colLeftX + 6, ry + 6, 160, 34, 8);
            ctx.stroke();

            ctx.fillStyle = "#4A3728";
            ctx.font = "bold 10px 'Outfit', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(r.label, colLeftX + 86, ry + 23);

            // Description text
            ctx.textAlign = "left";
            ctx.fillStyle = "#4A3728";
            ctx.font = "500 13px 'Outfit', sans-serif";
            let descStr = r.desc;
            if (ctx.measureText(descStr).width > colLeftW - 190) {
                while (ctx.measureText(descStr + '...').width > colLeftW - 190 && descStr.length > 0) {
                    descStr = descStr.substring(0, descStr.length - 1);
                }
                descStr += '...';
            }
            ctx.fillText(descStr, colLeftX + 175, ry + 23);
        });

        // -------------------------------------------------------------
        // 10. Right Column: Bốn Mùa Đồng Nội Photobooth Strip (320px)
        // -------------------------------------------------------------
        const colRightX = cardX + 595;
        const colRightW = 320;
        const stripY = bodyY;
        const stripH = 800;

        // Filmstrip outer container
        ctx.fillStyle = "#FAF7F0";
        drawRoundRect(ctx, colRightX, stripY, colRightW, stripH, 16);
        ctx.fill();
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 2;
        drawRoundRect(ctx, colRightX, stripY, colRightW, stripH, 16);
        ctx.stroke();

        // Strip Header: BỐN MÙA ĐỒNG NỘI · 20/10/2026
        ctx.textAlign = "left";
        ctx.fillStyle = "#4A3728";
        ctx.font = "800 13px 'Outfit', sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillText("BỐN MÙA ĐỒNG NỘI", colRightX + 16, stripY + 24);

        ctx.textAlign = "right";
        ctx.fillStyle = "#8C7A6B";
        ctx.font = "700 13px 'Outfit', sans-serif";
        ctx.fillText("20/10/2026", colRightX + colRightW - 16, stripY + 24);

        // Header divider
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(colRightX + 16, stripY + 40);
        ctx.lineTo(colRightX + colRightW - 16, stripY + 40);
        ctx.stroke();

        // 4 Photo Frames
        const frames = [
            { emoji: "🌱", caption: "01 · Hạt Mầm Khởi Nguyên" },
            { emoji: "🌾✨", caption: "02 · Nắng Sớm Bờ Tre" },
            { emoji: "🪷💖", caption: "03 · Sen Hồng Ngát Hương" },
            { isAoDai: true, emoji: "✨👗", caption: `04 · Nét Duyên Gửi Bạn` }
        ];

        const frameH = 155;
        const frameW = colRightW - 32;

        frames.forEach((f, idx) => {
            const fy = stripY + 54 + idx * (frameH + 12);
            ctx.fillStyle = "#FFFFFF";
            drawRoundRect(ctx, colRightX + 16, fy, frameW, frameH, 12);
            ctx.fill();
            ctx.strokeStyle = "#E6DED5";
            ctx.lineWidth = 1.5;
            drawRoundRect(ctx, colRightX + 16, fy, frameW, frameH, 12);
            ctx.stroke();

            // Frame Visual Content
            if (f.isAoDai && window.aoDaiVietImg && window.aoDaiVietImg.complete && window.aoDaiVietImg.naturalWidth > 0) {
                // Draw Ao Dai art centered in frame
                const imgW = 75;
                const imgH = 75;
                ctx.drawImage(window.aoDaiVietImg, colRightX + 16 + (frameW - imgW) / 2, fy + 20, imgW, imgH);
            } else {
                ctx.font = "40px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(f.emoji, colRightX + 16 + frameW / 2, fy + 58);
            }

            // Caption text
            ctx.fillStyle = "#4A3728";
            ctx.font = "bold 13px 'Outfit', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            let capStr = f.caption;
            if (ctx.measureText(capStr).width > frameW - 20) {
                capStr = capStr.substring(0, 18) + '...';
            }
            ctx.fillText(capStr, colRightX + 16 + frameW / 2, fy + 124);
        });

        // Strip Footer Doodle & Stamp
        const stripFooterY = stripY + stripH - 52;
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(colRightX + 16, stripFooterY);
        ctx.lineTo(colRightX + colRightW - 16, stripFooterY);
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.fillStyle = "#4A3728";
        ctx.font = "bold 13px 'Outfit', sans-serif";
        ctx.fillText("♡ Nắng thu đọng nét cười thơ ♡", colRightX + colRightW / 2, stripFooterY + 20);

        ctx.fillStyle = "#8C7A6B";
        ctx.font = "bold 10px 'Outfit', sans-serif";
        ctx.fillText("VIETNAMESE HERITAGE EDITION", colRightX + colRightW / 2, stripFooterY + 38);

        // -------------------------------------------------------------
        // 11. Postcard Footer: Con Tem Hoa Sen & Mộc Triện Son
        // -------------------------------------------------------------
        const footerY = cardY + cardH - 250;
        const footerH = 250;

        ctx.save();
        drawRoundRect(ctx, cardX, footerY, cardW, footerH, { tl: 0, tr: 0, bl: cardRadius, br: cardRadius });
        ctx.clip();
        ctx.fillStyle = "#FAF7F0";
        ctx.fillRect(cardX, footerY, cardW, footerH);
        ctx.restore();

        // Top divider for footer
        ctx.strokeStyle = "#E6DED5";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cardX, footerY);
        ctx.lineTo(cardX + cardW, footerY);
        ctx.stroke();

        // Left: Con Tem Bưu Chính Hoa Sen Cổ Điển
        const stampW = 280;
        const stampH = 120;
        const stampBoxX = cardX + 60;
        const stampBoxY = footerY + 50;

        // Stamp Outer Perforated Teeth (Tiny scalloped circles)
        ctx.fillStyle = "#FFFFFF";
        drawRoundRect(ctx, stampBoxX, stampBoxY, stampW, stampH, 4);
        ctx.fill();

        ctx.strokeStyle = "#D47A88";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2;
        drawRoundRect(ctx, stampBoxX, stampBoxY, stampW, stampH, 4);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Stamp Inner Frame
        ctx.fillStyle = "#FFFDF9";
        drawRoundRect(ctx, stampBoxX + 6, stampBoxY + 6, stampW - 12, stampH - 12, 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(212, 122, 136, 0.4)";
        ctx.lineWidth = 1;
        drawRoundRect(ctx, stampBoxX + 6, stampBoxY + 6, stampW - 12, stampH - 12, 2);
        ctx.stroke();

        // Stamp Text & Art
        ctx.fillStyle = "#D47A88";
        ctx.font = "bold 10px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("BƯU CHÍNH VIỆT NAM", stampBoxX + stampW / 2, stampBoxY + 22);

        ctx.font = "32px sans-serif";
        ctx.fillText("🪷", stampBoxX + 60, stampBoxY + 62);

        ctx.font = "900 24px 'Outfit', sans-serif";
        ctx.fillStyle = "#4A3728";
        ctx.textAlign = "left";
        ctx.fillText("20/10 Đ", stampBoxX + 110, stampBoxY + 62);

        ctx.fillStyle = "#6A8D73";
        ctx.font = "bold 9px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("HƯƠNG ĐỒNG NỘI", stampBoxX + stampW / 2, stampBoxY + 98);

        // Stamp postal reference text below
        ctx.fillStyle = "#8C7A6B";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("VN-2010 · THƯ TÌNH ĐỒNG NỘI · KỶ NIỆM", stampBoxX + 10, stampBoxY + stampH + 14);

        // Right: Traditional Mộc Triện Son Đỏ
        const sealCenterX = cardX + cardW - 140;
        const sealCenterY = footerY + footerH / 2;
        const sealR = 66;

        ctx.save();
        ctx.translate(sealCenterX, sealCenterY);
        ctx.rotate((-8 * Math.PI) / 180); // Tilt by -8 degrees

        // Vermilion Lacquer Base
        ctx.shadowColor = "rgba(185, 28, 28, 0.35)";
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 8;
        ctx.fillStyle = "#B91C1C";
        ctx.beginPath();
        ctx.arc(0, 0, sealR, 0, Math.PI * 2);
        ctx.fill();

        // Inner Red Core
        ctx.fillStyle = "#DC2626";
        ctx.beginPath();
        ctx.arc(0, 0, sealR - 6, 0, Math.PI * 2);
        ctx.fill();

        // Dashed Golden Rim
        ctx.strokeStyle = "#FEF08A";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, sealR - 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Seal Typography
        ctx.textAlign = "center";
        ctx.fillStyle = "#FEF08A";
        ctx.font = "bold 13px 'Outfit', sans-serif";
        ctx.fillText("★ 20/10 ★", 0, -22);

        ctx.font = "900 20px 'Outfit', sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("NÉT DUYÊN", 0, 4);

        ctx.font = "bold 12px 'Outfit', sans-serif";
        ctx.fillStyle = "#FEE2E2";
        ctx.fillText("AN YÊN", 0, 24);

        ctx.restore();

        // -------------------------------------------------------------
        // 12. Bottom Watermark (outside ticket card)
        // -------------------------------------------------------------
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#8C7A6B";
        ctx.font = "500 16px 'Outfit', sans-serif";
        ctx.fillText("✦ Bưu Thiếp Kỷ Niệm 20/10 · Tôn Vinh Nét Duyên & Tâm Hồn Phụ Nữ Việt Nam ✦", width / 2, height - 42);

        return canvas;
    };

    /**
     * Export canvas to PNG Blob
     * @returns {Promise<Blob>}
     */
    window.exportBoardingPassImageBlob = function () {
        return new Promise((resolve, reject) => {
            try {
                const canvas = window.generateBoardingPassCanvas();
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Canvas toBlob failed"));
                    }
                }, "image/png", 0.98);
            } catch (err) {
                reject(err);
            }
        });
    };

    /**
     * Download the rendered Boarding Pass to local machine
     */
    window.downloadBoardingPassImage = async function (filename) {
        const downloadBtn = document.getElementById('download-ticket-btn');
        const defaultText = downloadBtn ? downloadBtn.innerHTML : '';

        try {
            if (downloadBtn) {
                downloadBtn.disabled = true;
                downloadBtn.innerHTML = `<span>⏳</span><span>Đang xuất ảnh 1080x1920...</span>`;
            }

            const rawName = window.currentUserName || (typeof userName !== 'undefined' ? userName : '') || '20-10';
            const safeName = rawName.trim().replace(/[^a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ_-]/g, '_');
            const targetFilename = filename || `Buu-Thiep-20-10_${safeName}.png`;

            const blob = await window.exportBoardingPassImageBlob();
            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = targetFilename;
            const container = document.body || document.documentElement;
            if (container && container.appendChild) {
                container.appendChild(a);
                a.click();
                container.removeChild(a);
            } else if (a.click) {
                a.click();
            }

            setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

            if (typeof window.triggerCameraFlash === 'function') {
                window.triggerCameraFlash();
            }

            if (typeof window.playCameraClickSFX === 'function') {
                window.playCameraClickSFX();
            }

            if (typeof window.showTicketToast === 'function') {
                window.showTicketToast("Đã tải bưu thiếp kỷ niệm 1080x1920 HD thành công! 📸🪷");
            }
        } catch (err) {
            console.error("Export error:", err);
            if (typeof window.showTicketToast === 'function') {
                window.showTicketToast("Có lỗi khi tạo ảnh, vui lòng thử lại nhé!");
            }
        } finally {
            if (downloadBtn) {
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = defaultText;
            }
        }
    };

    /**
     * Share Boarding Pass via Web Share API Level 2 (with image file)
     * Fallbacks to Clipboard Image on Desktop or auto-download
     */
    window.shareBoardingPass = async function () {
        const shareBtn = document.getElementById('share-social-btn');
        const defaultText = shareBtn ? shareBtn.innerHTML : '';

        try {
            if (shareBtn) {
                shareBtn.disabled = true;
                shareBtn.innerHTML = `<span>⏳</span><span>Đang chuẩn bị chia sẻ...</span>`;
            }

            const rawName = window.currentUserName || (typeof userName !== 'undefined' ? userName : '') || '20-10';
            const safeName = rawName.trim().replace(/[^a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ_-]/g, '_');
            const filename = `Buu-Thiep-20-10_${safeName}.png`;

            const blob = await window.exportBoardingPassImageBlob();
            const file = new File([blob], filename, { type: 'image/png' });

            const shareTitle = `Bưu Thiếp Kỷ Niệm 20/10 · ${rawName}`;
            const shareText = `Bưu thiếp kỷ niệm 20/10 đong đầy yêu thương gửi tặng ${rawName}! 🪷💌✨`;

            // Case A: Mobile Native Web Share API (Level 2 with File support)
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: shareTitle,
                    text: shareText
                });
                if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
                if (typeof window.showTicketToast === 'function') {
                    window.showTicketToast("Đã mở hộp thoại chia sẻ bưu thiếp thành công! 🕊️🌸");
                }
                return;
            }

            // Case B: Desktop Clipboard Image Copy (Ctrl + V into Zalo/Messenger/Discord)
            if (navigator.clipboard && typeof window.ClipboardItem !== 'undefined') {
                try {
                    const item = new ClipboardItem({ 'image/png': blob });
                    await navigator.clipboard.write([item]);
                    if (typeof window.playBubblePopSFX === 'function') window.playBubblePopSFX();
                    if (typeof window.showTicketToast === 'function') {
                        window.showTicketToast("Đã chép ảnh vào Clipboard! Bạn có thể dán (Ctrl+V) vào Zalo/Messenger ngay 📋✨", 4000);
                    }
                    return;
                } catch (clipErr) {
                    console.log("Clipboard image write failed, falling back to download:", clipErr);
                }
            }

            // Case C: Standard Web Share (text/link only) or Fallback Download
            if (navigator.share) {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: window.location.href
                });
                if (typeof window.showTicketToast === 'function') {
                    window.showTicketToast("Đã chia sẻ thành công! 🚀💖");
                }
            } else {
                // Trigger auto download and copy message
                await window.downloadBoardingPassImage(filename);
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
                }
                if (typeof window.showTicketToast === 'function') {
                    window.showTicketToast("Đã tải ảnh về máy và sao chép lời chúc! Bạn có thể gửi tặng ngay 💌✨", 4000);
                }
            }
        } catch (err) {
            // Ignore AbortError when user cancels share dialog
            if (err.name !== 'AbortError') {
                console.error("Share error:", err);
                if (typeof window.showTicketToast === 'function') {
                    window.showTicketToast("Không thể chia sẻ trực tiếp, đang tải ảnh về máy cho bạn...");
                }
                window.downloadBoardingPassImage();
            }
        } finally {
            if (shareBtn) {
                shareBtn.disabled = false;
                shareBtn.innerHTML = defaultText;
            }
        }
    };

    /**
     * Copy ticket quote text to clipboard with legacy fallbacks
     */
    window.copyTicketQuote = async function () {
        const quoteEl = document.getElementById('flower-id-quote');
        const letterEl = document.getElementById('random-letter-content');
        const textToCopy = (letterEl && letterEl.textContent && letterEl.textContent.trim()) 
            || (quoteEl && quoteEl.textContent && quoteEl.textContent.trim()) 
            || 'Chúc bạn một ngày 20/10 ngập tràn niềm vui và hạnh phúc!';

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                // Fallback legacy textarea copy
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            if (typeof window.playBubblePopSFX === 'function') window.playBubblePopSFX();
            if (typeof window.showTicketToast === 'function') {
                window.showTicketToast('Đã sao chép lời chúc vào khay nhớ tạm! 📋💖');
            }
        } catch (e) {
            if (typeof window.showTicketToast === 'function') {
                window.showTicketToast('Lời chúc: ' + textToCopy);
            }
        }
    };

    // Auto-wire all CTA buttons on DOM ready
    function wireActionButtons() {
        const downloadBtn = document.getElementById('download-ticket-btn');
        if (downloadBtn && !downloadBtn.getAttribute('data-wired')) {
            downloadBtn.setAttribute('data-wired', 'true');
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.downloadBoardingPassImage();
            });
        }

        const shareBtn = document.getElementById('share-social-btn');
        if (shareBtn && !shareBtn.getAttribute('data-wired')) {
            shareBtn.setAttribute('data-wired', 'true');
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.shareBoardingPass();
            });
        }

        const copyBtn = document.getElementById('copy-ticket-quote-btn');
        if (copyBtn && !copyBtn.getAttribute('data-wired')) {
            copyBtn.setAttribute('data-wired', 'true');
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.copyTicketQuote();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireActionButtons);
    } else {
        wireActionButtons();
    }
})();
