/**
 * ============================================================================
 * SUB-PHASE 4.2: RETINA CANVAS 2D EXPORT ENGINE (1080 x 1920 STORY RESOLUTION)
 * 100% Client-Side Pure HTML5 Canvas rendering for "Epic Flower Boarding Pass"
 * ============================================================================
 */

(function () {
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
     * Core Render Engine: Renders 1080x1920 Story Canvas
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
            flowerName: "Allium",
            vietnameseName: "Hành Kiểng",
            title: "Bạn là một bông Allium.",
            quote: "Đầu đầy ý tưởng, miệng đầy câu hay.",
            emoji: "🌸",
            traits: ["Sáng tạo", "Hài hước", "Có chính kiến"],
            petalColor: "#F5CE56",
            bgColor: "#EEF2FF",
            match: [
                { icon: "🌺", name: "Anh túc", desc: "Rủ nhau làm trò, vui nguyên buổi." },
                { icon: "🌼", name: "Cúc đại đóa", desc: "Bạn nghĩ ra trò, rủ cả hội chơi." }
            ],
            clash: [
                { icon: "🌸", name: "Địa lan", desc: "Bạn 'hay là...', bạn ấy cần kế hoạch." },
                { icon: "🌻", name: "Lily", desc: "Ý lạ gặp checklist, dễ cãi nhau." }
            ],
            checklist: {
                friend: "Người ném ra 'hay là...' rồi cả bàn bàn tới khuya.",
                love: "Thương bằng sự thú vị, kể chuyện và làm người kia cười.",
                pressure: "Nghĩ ra cách mới, đôi khi hơi lạ nhưng chạy được."
            }
        };

        const passengerName = (options.passengerName || window.currentUserName || (typeof userName !== 'undefined' ? userName : '') || 'Bạn Yêu Thương').trim();

        // -------------------------------------------------------------
        // 1. Background (Warm Cream & Subtle Starlight Dots)
        // -------------------------------------------------------------
        ctx.fillStyle = "#FAF8F5";
        ctx.fillRect(0, 0, width, height);

        // Soft Starlight Dotted Grid background
        ctx.fillStyle = "rgba(220, 227, 242, 0.45)";
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
        // 2. The Main Ticket Card (960 x 1760 at x=60, y=70)
        // -------------------------------------------------------------
        const cardX = 60;
        const cardY = 70;
        const cardW = 960;
        const cardH = 1760;
        const cardRadius = 36;

        // Soft ambient shadow
        ctx.save();
        ctx.shadowColor = "rgba(19, 28, 78, 0.12)";
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 18;
        ctx.fillStyle = "#FFFFFF";
        drawRoundRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
        ctx.fill();
        ctx.restore();

        // Card Border
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 3;
        drawRoundRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
        ctx.stroke();

        // -------------------------------------------------------------
        // 3. Ticket Header (x=60, y=70, w=960, h=300)
        // -------------------------------------------------------------
        const headerH = 300;
        ctx.save();
        drawRoundRect(ctx, cardX, cardY, cardW, headerH, { tl: cardRadius, tr: cardRadius, bl: 0, br: 0 });
        ctx.clip();
        ctx.fillStyle = "#FAF8F5";
        ctx.fillRect(cardX, cardY, cardW, headerH);
        ctx.restore();

        // Top Badge: EPIC TIME TRAVEL PASS · 20/10 SPECIAL EDITION
        ctx.fillStyle = "#EEF2FF";
        drawRoundRect(ctx, cardX + cardW / 2 - 250, cardY + 28, 500, 38, 999);
        ctx.fill();
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, cardX + cardW / 2 - 250, cardY + 28, 500, 38, 999);
        ctx.stroke();

        ctx.fillStyle = "#131C4E";
        ctx.font = "bold 16px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("EPIC TIME TRAVEL PASS · 20/10 SPECIAL EDITION", cardX + cardW / 2, cardY + 47);

        // Flight Route Display: REAL  ✈ EPIC-2010 ✈  GARDEN
        const routeY = cardY + 115;
        // Point REAL
        ctx.textAlign = "left";
        ctx.font = "900 40px 'Outfit', sans-serif";
        ctx.fillStyle = "#131C4E";
        ctx.fillText("REAL", cardX + 60, routeY);
        ctx.font = "600 18px 'Outfit', sans-serif";
        ctx.fillStyle = "#64748B";
        ctx.fillText("Thực Tại", cardX + 60, routeY + 30);

        // Flight Middle Badge
        const midX = cardX + cardW / 2;
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        drawRoundRect(ctx, midX - 85, routeY - 26, 170, 36, 999);
        ctx.fill();
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, midX - 85, routeY - 26, 170, 36, 999);
        ctx.stroke();

        ctx.fillStyle = "#131C4E";
        ctx.font = "bold 15px 'Outfit', sans-serif";
        ctx.fillText("EPIC-2010", midX - 10, routeY - 7);
        ctx.fillStyle = "#F5CE56";
        ctx.font = "20px 'Outfit', sans-serif";
        ctx.fillText("✈", midX + 55, routeY - 7);

        // Connecting dotted line
        ctx.strokeStyle = "#C8D3E6";
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cardX + 190, routeY - 8);
        ctx.lineTo(midX - 95, routeY - 8);
        ctx.moveTo(midX + 95, routeY - 8);
        ctx.lineTo(cardX + cardW - 190, routeY - 8);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Point GARDEN
        ctx.textAlign = "right";
        ctx.font = "900 40px 'Outfit', sans-serif";
        ctx.fillStyle = "#131C4E";
        ctx.fillText("GARDEN", cardX + cardW - 60, routeY);
        ctx.font = "600 18px 'Outfit', sans-serif";
        ctx.fillStyle = "#64748B";
        ctx.fillText("Vườn Bí Mật", cardX + cardW - 60, routeY + 30);

        // Meta Info Grid (3 White cards)
        const metaY = cardY + 185;
        const metaCardW = (cardW - 120 - 32) / 3;
        const metaH = 80;

        const metaItems = [
            { label: "HÀNH KHÁCH", val: passengerName, highlight: false },
            { label: "CỔNG LỄ HỘI", val: "GATE 20/10", highlight: false },
            { label: "HẠNG VÉ", val: "VIP SWEETHEART", highlight: true }
        ];

        metaItems.forEach((item, idx) => {
            const mx = cardX + 60 + idx * (metaCardW + 16);
            ctx.fillStyle = "#FFFFFF";
            drawRoundRect(ctx, mx, metaY, metaCardW, metaH, 16);
            ctx.fill();
            ctx.strokeStyle = "#DCE3F2";
            ctx.lineWidth = 1.5;
            drawRoundRect(ctx, mx, metaY, metaCardW, metaH, 16);
            ctx.stroke();

            ctx.textAlign = "center";
            ctx.fillStyle = "#94A3B8";
            ctx.font = "bold 13px 'Outfit', sans-serif";
            ctx.fillText(item.label, mx + metaCardW / 2, metaY + 28);

            ctx.fillStyle = item.highlight ? "#D97706" : "#131C4E";
            ctx.font = "bold 20px 'Outfit', sans-serif";
            // Trim passenger name if too long for card
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
        ctx.fillStyle = "#FAF8F5";
        ctx.beginPath();
        ctx.arc(cardX, tearY, notchRadius, -Math.PI / 2, Math.PI / 2);
        ctx.fill();
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();

        // Right Notch
        ctx.save();
        ctx.fillStyle = "#FAF8F5";
        ctx.beginPath();
        ctx.arc(cardX + cardW, tearY, notchRadius, Math.PI / 2, -Math.PI / 2);
        ctx.fill();
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();

        // Dashed Perforation Line
        ctx.save();
        ctx.strokeStyle = "#C8D3E6";
        ctx.setLineDash([12, 10]);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cardX + notchRadius + 10, tearY);
        ctx.lineTo(cardX + cardW - notchRadius - 10, tearY);
        ctx.stroke();
        ctx.restore();

        // -------------------------------------------------------------
        // 5. Ticket Body: 2 Columns Layout
        // Left: Flower ID (x=cardX+40, w=540)
        // Right: Photobooth Strip (x=cardX+610, w=310)
        // -------------------------------------------------------------
        const bodyY = tearY + 36;
        const colLeftX = cardX + 44;
        const colLeftW = 530;

        // Badge: YOUR FLOWER ID · 20/10
        ctx.fillStyle = "#EEF2FF";
        drawRoundRect(ctx, colLeftX, bodyY, 180, 30, 999);
        ctx.fill();
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 1;
        drawRoundRect(ctx, colLeftX, bodyY, 180, 30, 999);
        ctx.stroke();

        ctx.fillStyle = "#131C4E";
        ctx.font = "bold 13px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("YOUR FLOWER ID · 20/10", colLeftX + 90, bodyY + 16);

        // Flower Identity Title
        ctx.textAlign = "left";
        ctx.fillStyle = "#131C4E";
        ctx.font = "800 32px 'Outfit', sans-serif";
        ctx.fillText(profile.title, colLeftX, bodyY + 68);

        // Flower Quote
        ctx.fillStyle = "#64748B";
        ctx.font = "500 18px 'Outfit', sans-serif";
        ctx.fillText(profile.quote, colLeftX, bodyY + 98);

        // -------------------------------------------------------------
        // 6. Flower Vector Art & Center Avatar (Selfie or Emoji)
        // -------------------------------------------------------------
        const flowerCenterX = colLeftX + colLeftW / 2;
        const flowerCenterY = bodyY + 225;
        const flowerRadius = 95;

        // Outer flower background circle
        ctx.fillStyle = profile.bgColor || "#EEF2FF";
        ctx.beginPath();
        ctx.arc(flowerCenterX, flowerCenterY, flowerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 8 Petals radiating outward
        const petalColor = profile.petalColor || "#F5CE56";
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
            ctx.strokeStyle = "#DCE3F2";
            ctx.lineWidth = 2;
            ctx.stroke();
        } else {
            // Render Default Emoji
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(flowerCenterX, flowerCenterY, centerAvatarRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#DCE3F2";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = "46px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(profile.emoji || "🌸", flowerCenterX, flowerCenterY + 4);
        }

        // -------------------------------------------------------------
        // 7. Trait Pills Row
        // -------------------------------------------------------------
        const traitsY = flowerCenterY + flowerRadius + 32;
        const traits = Array.isArray(profile.traits) ? profile.traits : ["Sáng tạo", "Hài hước", "Có chính kiến"];
        let traitStartX = colLeftX + (colLeftW - (traits.length * 130 + (traits.length - 1) * 12)) / 2;

        traits.forEach((t) => {
            const pillW = 130;
            const pillH = 36;
            ctx.fillStyle = "#FAF8F5";
            drawRoundRect(ctx, traitStartX, traitsY, pillW, pillH, 999);
            ctx.fill();
            ctx.strokeStyle = "#DCE3F2";
            ctx.lineWidth = 1.5;
            drawRoundRect(ctx, traitStartX, traitsY, pillW, pillH, 999);
            ctx.stroke();

            ctx.fillStyle = "#131C4E";
            ctx.font = "bold 15px 'Outfit', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(t, traitStartX + pillW / 2, traitsY + pillH / 2);

            traitStartX += pillW + 12;
        });

        // -------------------------------------------------------------
        // 8. Compatibility Match & Clash Boxes (Side-by-side or Stacked)
        // -------------------------------------------------------------
        const compatY = traitsY + 60;
        const boxW = (colLeftW - 16) / 2;
        const boxH = 150;

        // Box 1: Match
        ctx.fillStyle = "#FFF5F7";
        drawRoundRect(ctx, colLeftX, compatY, boxW, boxH, 18);
        ctx.fill();
        ctx.strokeStyle = "#FED7E2";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, colLeftX, compatY, boxW, boxH, 18);
        ctx.stroke();

        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#131C4E";
        ctx.font = "bold 14px 'Outfit', sans-serif";
        ctx.fillText("BẠN HỢP CẠ VỚI", colLeftX + 16, compatY + 14);

        if (profile.match && profile.match.length >= 2) {
            // Item 1
            ctx.font = "18px sans-serif";
            ctx.fillText(profile.match[0].icon, colLeftX + 16, compatY + 42);
            ctx.fillStyle = "#131C4E";
            ctx.font = "bold 14px 'Outfit', sans-serif";
            ctx.fillText(profile.match[0].name, colLeftX + 44, compatY + 42);
            ctx.fillStyle = "#64748B";
            ctx.font = "500 12px 'Outfit', sans-serif";
            ctx.fillText(profile.match[0].desc, colLeftX + 44, compatY + 62);

            // Item 2
            ctx.font = "18px sans-serif";
            ctx.fillText(profile.match[1].icon, colLeftX + 16, compatY + 92);
            ctx.fillStyle = "#131C4E";
            ctx.font = "bold 14px 'Outfit', sans-serif";
            ctx.fillText(profile.match[1].name, colLeftX + 44, compatY + 92);
            ctx.fillStyle = "#64748B";
            ctx.font = "500 12px 'Outfit', sans-serif";
            ctx.fillText(profile.match[1].desc, colLeftX + 44, compatY + 112);
        }

        // Box 2: Clash
        const box2X = colLeftX + boxW + 16;
        ctx.fillStyle = "#EEF2FF";
        drawRoundRect(ctx, box2X, compatY, boxW, boxH, 18);
        ctx.fill();
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, box2X, compatY, boxW, boxH, 18);
        ctx.stroke();

        ctx.fillStyle = "#131C4E";
        ctx.font = "bold 14px 'Outfit', sans-serif";
        ctx.fillText("HƠI LỆCH SÓNG VỚI", box2X + 16, compatY + 14);

        if (profile.clash && profile.clash.length >= 2) {
            // Item 1
            ctx.font = "18px sans-serif";
            ctx.fillText(profile.clash[0].icon, box2X + 16, compatY + 42);
            ctx.fillStyle = "#131C4E";
            ctx.font = "bold 14px 'Outfit', sans-serif";
            ctx.fillText(profile.clash[0].name, box2X + 44, compatY + 42);
            ctx.fillStyle = "#64748B";
            ctx.font = "500 12px 'Outfit', sans-serif";
            ctx.fillText(profile.clash[0].desc, box2X + 44, compatY + 62);

            // Item 2
            ctx.font = "18px sans-serif";
            ctx.fillText(profile.clash[1].icon, box2X + 16, compatY + 92);
            ctx.fillStyle = "#131C4E";
            ctx.font = "bold 14px 'Outfit', sans-serif";
            ctx.fillText(profile.clash[1].name, box2X + 44, compatY + 92);
            ctx.fillStyle = "#64748B";
            ctx.font = "500 12px 'Outfit', sans-serif";
            ctx.fillText(profile.clash[1].desc, box2X + 44, compatY + 112);
        }

        // -------------------------------------------------------------
        // 9. Detailed Personality Checklist (3 rows)
        // -------------------------------------------------------------
        const checkY = compatY + boxH + 20;
        const checkRows = [
            { label: "TRONG HỘI BẠN", desc: profile.checklist ? profile.checklist.friend : "Người ném ra 'hay là...' rồi cả bàn bàn tới khuya." },
            { label: "KHI THƯƠNG AI ĐÓ", desc: profile.checklist ? profile.checklist.love : "Thương bằng sự thú vị, kể chuyện và làm người kia cười." },
            { label: "KHI ÁP LỰC", desc: profile.checklist ? profile.checklist.pressure : "Nghĩ ra cách mới, đôi khi hơi lạ nhưng chạy được." }
        ];

        checkRows.forEach((r, idx) => {
            const ry = checkY + idx * 56;
            ctx.fillStyle = "#FAF8F5";
            drawRoundRect(ctx, colLeftX, ry, colLeftW, 46, 12);
            ctx.fill();
            ctx.strokeStyle = "#DCE3F2";
            ctx.lineWidth = 1;
            drawRoundRect(ctx, colLeftX, ry, colLeftW, 46, 12);
            ctx.stroke();

            // Label pill inside
            ctx.fillStyle = "#FFFFFF";
            drawRoundRect(ctx, colLeftX + 6, ry + 6, 140, 34, 8);
            ctx.fill();
            ctx.strokeStyle = "#DCE3F2";
            ctx.lineWidth = 1;
            drawRoundRect(ctx, colLeftX + 6, ry + 6, 140, 34, 8);
            ctx.stroke();

            ctx.fillStyle = "#131C4E";
            ctx.font = "bold 11px 'Outfit', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(r.label, colLeftX + 76, ry + 23);

            // Description text
            ctx.textAlign = "left";
            ctx.fillStyle = "#131C4E";
            ctx.font = "500 13.5px 'Outfit', sans-serif";
            let descStr = r.desc;
            if (ctx.measureText(descStr).width > colLeftW - 170) {
                while (ctx.measureText(descStr + '...').width > colLeftW - 170 && descStr.length > 0) {
                    descStr = descStr.substring(0, descStr.length - 1);
                }
                descStr += '...';
            }
            ctx.fillText(descStr, colLeftX + 160, ry + 23);
        });

        // -------------------------------------------------------------
        // 10. Right Column: Life4Cuts Photobooth Filmstrip (330px width)
        // -------------------------------------------------------------
        const colRightX = cardX + 595;
        const colRightW = 320;
        const stripY = bodyY;
        const stripH = 800;

        // Filmstrip outer container
        ctx.fillStyle = "#FAF8F5";
        drawRoundRect(ctx, colRightX, stripY, colRightW, stripH, 20);
        ctx.fill();
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 2;
        drawRoundRect(ctx, colRightX, stripY, colRightW, stripH, 20);
        ctx.stroke();

        // Strip Header: EPIC MEMORIES · 4-CUTS
        ctx.textAlign = "left";
        ctx.fillStyle = "#131C4E";
        ctx.font = "800 13px 'Outfit', sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillText("EPIC MEMORIES · 4-CUTS", colRightX + 16, stripY + 24);

        ctx.textAlign = "right";
        ctx.fillStyle = "#64748B";
        ctx.font = "700 13px 'Outfit', sans-serif";
        ctx.fillText("20/10/2026", colRightX + colRightW - 16, stripY + 24);

        // Header divider
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(colRightX + 16, stripY + 40);
        ctx.lineTo(colRightX + colRightW - 16, stripY + 40);
        ctx.stroke();

        // 4 Photo Frames
        const frames = [
            { emoji: "🌱", caption: "01 · Hạt Mầm Khởi Nguyên" },
            { emoji: "🤖💦", caption: "02 · Robot Tiếp Sức" },
            { emoji: "🌸✨", caption: "03 · Bừng Nở Rực Rỡ" },
            { emoji: "💌💖", caption: `04 · Thư Gửi ${passengerName}` }
        ];

        const frameH = 155;
        const frameW = colRightW - 32;

        frames.forEach((f, idx) => {
            const fy = stripY + 54 + idx * (frameH + 12);
            ctx.fillStyle = "#FFFFFF";
            drawRoundRect(ctx, colRightX + 16, fy, frameW, frameH, 14);
            ctx.fill();
            ctx.strokeStyle = "#DCE3F2";
            ctx.lineWidth = 1.5;
            drawRoundRect(ctx, colRightX + 16, fy, frameW, frameH, 14);
            ctx.stroke();

            // Emoji Art
            ctx.font = "40px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(f.emoji, colRightX + 16 + frameW / 2, fy + 58);

            // Caption text
            ctx.fillStyle = "#131C4E";
            ctx.font = "bold 13px 'Outfit', sans-serif";
            let capStr = f.caption;
            if (ctx.measureText(capStr).width > frameW - 20) {
                capStr = capStr.substring(0, 18) + '...';
            }
            ctx.fillText(capStr, colRightX + 16 + frameW / 2, fy + 120);
        });

        // Strip Footer Doodle & Stamp
        const stripFooterY = stripY + stripH - 52;
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(colRightX + 16, stripFooterY);
        ctx.lineTo(colRightX + colRightW - 16, stripFooterY);
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.fillStyle = "#131C4E";
        ctx.font = "bold 14px 'Outfit', sans-serif";
        ctx.fillText("♡ (≧◡≦) ♡", colRightX + colRightW / 2, stripFooterY + 22);

        ctx.fillStyle = "#94A3B8";
        ctx.font = "bold 11px 'Outfit', sans-serif";
        ctx.fillText("OFFICIAL LIFE4CUTS EDITION", colRightX + colRightW / 2, stripFooterY + 40);

        // -------------------------------------------------------------
        // 11. Ticket Footer: Barcode & Wax Seal (y = cardY + cardH - 260)
        // -------------------------------------------------------------
        const footerY = cardY + cardH - 250;
        const footerH = 250;

        ctx.save();
        drawRoundRect(ctx, cardX, footerY, cardW, footerH, { tl: 0, tr: 0, bl: cardRadius, br: cardRadius });
        ctx.clip();
        ctx.fillStyle = "#FAF8F5";
        ctx.fillRect(cardX, footerY, cardW, footerH);
        ctx.restore();

        // Top divider for footer
        ctx.strokeStyle = "#DCE3F2";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cardX, footerY);
        ctx.lineTo(cardX + cardW, footerY);
        ctx.stroke();

        // Left: Barcode Graphics
        const barcodeX = cardX + 60;
        const barcodeY = footerY + 55;
        const barcodeW = 460;
        const barcodeH = 75;

        // Draw realistic barcode lines
        const barPats = [3, 2, 6, 2, 4, 3, 2, 5, 2, 7, 3, 2, 5, 4, 2, 6, 3, 2, 4, 5, 2, 8, 3, 2, 6, 2, 4, 3, 7, 2, 5, 2, 4, 6, 2, 3, 5, 2, 7, 3, 2, 4];
        let curBarX = barcodeX;
        ctx.fillStyle = "#131C4E";
        for (let i = 0; i < barPats.length; i++) {
            const bw = barPats[i];
            if (i % 2 === 0) {
                ctx.fillRect(curBarX, barcodeY, bw * 1.5, barcodeH);
            }
            curBarX += bw * 2.6;
            if (curBarX > barcodeX + barcodeW) break;
        }

        // Barcode number
        ctx.fillStyle = "#131C4E";
        ctx.font = "bold 17px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("EPIC-2010-8888-SWEETHEART", barcodeX + 40, barcodeY + barcodeH + 16);

        // Right: 3D Wax Seal Badge
        const sealCenterX = cardX + cardW - 140;
        const sealCenterY = footerY + footerH / 2;
        const sealR = 64;

        ctx.save();
        ctx.translate(sealCenterX, sealCenterY);
        ctx.rotate((-8 * Math.PI) / 180); // Tilt by -8 degrees

        // Wax Seal Outer Shadow & Base
        ctx.shadowColor = "rgba(197, 48, 48, 0.4)";
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 8;
        ctx.fillStyle = "#9B1C1C";
        ctx.beginPath();
        ctx.arc(0, 0, sealR, 0, Math.PI * 2);
        ctx.fill();

        // Wax Seal Inner Core
        ctx.fillStyle = "#DC2626";
        ctx.beginPath();
        ctx.arc(0, 0, sealR - 6, 0, Math.PI * 2);
        ctx.fill();

        // Dashed circular rim
        ctx.strokeStyle = "#FEF08A";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, sealR - 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Seal Typography
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";

        ctx.font = "bold 13px 'Outfit', sans-serif";
        ctx.fillText("★ 20/10 ★", 0, -22);

        ctx.font = "900 21px 'Outfit', sans-serif";
        ctx.fillText("APPROVED", 0, 4);

        ctx.font = "bold 12px 'Outfit', sans-serif";
        ctx.fillStyle = "#FEE2E2";
        ctx.fillText("WITH LOVE", 0, 24);

        ctx.restore();

        // -------------------------------------------------------------
        // 12. Bottom Watermark (outside ticket card)
        // -------------------------------------------------------------
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#94A3B8";
        ctx.font = "500 17px 'Outfit', sans-serif";
        ctx.fillText("✦ Made with love by EPIC Gentlemen · 20/10 Celebration · 100% Client-side Keepsake ✦", width / 2, height - 42);

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
            const targetFilename = filename || `Ve-Du-Hanh-20-10_${safeName}.png`;

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
                window.showTicketToast("Đã tải vé du hành 1080x1920 HD thành công! 📸✨");
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
            const filename = `Ve-Du-Hanh-20-10_${safeName}.png`;

            const blob = await window.exportBoardingPassImageBlob();
            const file = new File([blob], filename, { type: 'image/png' });

            const shareTitle = `Vé Du Hành 20/10 · ${rawName}`;
            const shareText = `Tấm vé du hành tới Vườn Hoa Yêu Thương 20/10 đặc biệt dành riêng cho ${rawName}! 🌸✨`;

            // Case A: Mobile Native Web Share API (Level 2 with File support)
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: shareTitle,
                    text: shareText
                });
                if (typeof window.playChimeSFX === 'function') window.playChimeSFX();
                if (typeof window.showTicketToast === 'function') {
                    window.showTicketToast("Đã mở hộp thoại chia sẻ thành công! 🚀🌸");
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
