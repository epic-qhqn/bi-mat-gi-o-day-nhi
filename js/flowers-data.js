// ==========================================================================
// 5th Season Floral Studio: Heritage Flower Profiles Database (54 Flowers)
// Phục vụ ngày Phụ nữ Việt Nam 20/10 — Tôn vinh nét đẹp & tâm hồn người phụ nữ
// ==========================================================================

const flowerProfiles = [
    // ----------------------------------------------------------------------
    // Nhóm 1: Hoa Truyền Thống Cốt Cách & Thanh Tao
    // ----------------------------------------------------------------------
    {
        id: "lotus",
        flowerName: "Lotus",
        vietnameseName: "Hoa Sen",
        title: "Đóa Sen Lụa Tinh Tế & An Nhiên",
        quote: "Giữ một khoảng lặng trong veo để tâm mình an yên giữa những xao động thường nhật.",
        emoji: "🪷",
        traits: ["Thanh tao", "An nhiên", "Thấu cảm"],
        petalColor: "#D47A88",
        bgColor: "#FAF7F0",
        match: [
            { icon: "🌼", name: "Cúc họa mi", desc: "Cùng chuộng sự tĩnh lặng, mộc mạc và cảm giác chữa lành êm dịu." },
            { icon: "🌷", name: "Tulip", desc: "Đồng điệu về chiều sâu nội tâm và gu thẩm mỹ thanh lịch." }
        ],
        clash: [
            { icon: "🌪️", name: "Xô bồ & thị phi", desc: "Dễ kiệt sức trước môi trường quá ồn ào, ưa thích những cuộc trò chuyện sâu sắc hơn." },
            { icon: "⚡", name: "Hối hả ép buộc", desc: "Cần nhịp điệu riêng để lắng nghe cảm xúc, không chịu được sự thúc ép vô lý." }
        ],
        checklist: {
            friend: "Người bạn tạo cảm giác bình yên đến lạ; ngồi cạnh bạn chẳng cần nói nhiều lòng cũng thấy nhẹ nhõm.",
            love: "Yêu bằng sự thấu hiểu sâu kín; không ồn ào phô trương nhưng cực kỳ bền chặt theo năm tháng.",
            pressure: "Thong thả hít sâu một nhịp, chọn cách tĩnh lặng quan sát và xử lý mọi chuyện bằng cái đầu sáng suốt."
        }
    },
    {
        id: "apricot_blossom",
        flowerName: "Apricot Blossom",
        vietnameseName: "Hoa Mai Vàng",
        title: "Mai Vàng Kiên Định & Rạng Rỡ",
        quote: "Lặng lẽ tích lũy năng lượng qua ngày đông để bung nở rực rỡ đón bình minh.",
        emoji: "🌼",
        traits: ["Kiên định", "Lạc quan", "Khí chất"],
        petalColor: "#EAB308",
        bgColor: "#FEFCE8",
        match: [
            { icon: "🌸", name: "Hoa đào", desc: "Bộ đôi mang lại nguồn sinh khí ấm áp và niềm hy vọng mới mẻ." },
            { icon: "⚜️", name: "Bách hợp", desc: "Đồng điệu về sự đoan trang, chữ tín và lòng kiên định." }
        ],
        clash: [
            { icon: "🥀", name: "Than vãn kéo dài", desc: "Năng lượng u uất dễ làm hao mòn tinh thần hành động tích cực của bạn." },
            { icon: "🎭", name: "Thiếu chân thành", desc: "Thích sự ngay thẳng, không bao giờ thỏa hiệp với lối cư xử đãi bôi." }
        ],
        checklist: {
            friend: "Ngọn đuốc truyền động lực; mỗi khi bạn bè bế tắc đều tìm đến bạn để nạp lại niềm tin.",
            love: "Chân tình, đồng hành và tôn trọng; luôn mong muốn cả hai cùng nhau tiến bộ mỗi ngày.",
            pressure: "Càng trong gian khó càng bình tĩnh lạ thường, biến thử thách thành bệ phóng tôi luyện bản lĩnh."
        }
    },
    {
        id: "peach_blossom",
        flowerName: "Peach Blossom",
        vietnameseName: "Hoa Đào",
        title: "Cánh Đào Duyên Dáng & Tươi Mới",
        quote: "Nụ cười nở bừng như hoa đầu mùa, mang theo hơi thở ấm áp xua tan giá lạnh.",
        emoji: "🌸",
        traits: ["Duyên dáng", "Ngọt ngào", "Tràn đầy sức sống"],
        petalColor: "#FB7185",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌼", name: "Mai vàng", desc: "Hòa nhịp sắc xuân, cùng thắp sáng niềm vui và năng lượng tươi tắn." },
            { icon: "🌺", name: "Cẩm chướng", desc: "Sự kết hợp giữa nét duyên rạng ngời và tấm lòng chăm chút dịu dàng." }
        ],
        clash: [
            { icon: "❄️", name: "Lạnh lùng xa cách", desc: "Cảm giác vô cảm, đóng kín cánh cửa giao tiếp khiến bạn thấy ngột ngạt." },
            { icon: "🌧️", name: "Khắt khe xét nét", desc: "Nụ cười hồn nhiên của bạn không hợp với những soi mói định kiến." }
        ],
        checklist: {
            friend: "Chất xúc tác kết nối; ở đâu có bạn là ở đó có tiếng cười rộn rã và sự thoải mái.",
            love: "Ngọt ngào, nồng ấm và luôn biết cách tạo bất ngờ nho nhỏ làm mềm lòng đối phương.",
            pressure: "Mỉm cười đón nhận, tự nhủ ngày mai trời lại sáng và nhanh chóng vực dậy tinh thần."
        }
    },
    {
        id: "jasmine",
        flowerName: "Jasmine",
        vietnameseName: "Hoa Lài",
        title: "Hương Lài Thuần Khiết & Dịu Êm",
        quote: "Không cần phô trương sắc màu lộng lẫy, hương thơm mộc mạc tự khắc chạm đến trái tim.",
        emoji: "🤍",
        traits: ["Thuần khiết", "Mộc mạc", "Tế nhị"],
        petalColor: "#F8FAFC",
        bgColor: "#F1F5F9",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng trân quý vẻ đẹp ban sơ và sự tĩnh tại trong tâm khảm." },
            { icon: "🌾", name: "Hoa baby", desc: "Cộng hưởng nét trong trẻo, không một chút gợn toan tính." }
        ],
        clash: [
            { icon: "📢", name: "Phô trương khoe mẽ", desc: "Không thích lối sống chuộng bề nổi, tôn sùng giá trị thật hơn hư danh." },
            { icon: "🧨", name: "Bốc đồng gay gắt", desc: "Những cơn giận dữ mất kiểm soát dễ làm tổn thương nét dịu dàng của bạn." }
        ],
        checklist: {
            friend: "Chỗ dựa kín đáo, luôn nhớ những sở thích nhỏ nhất của bạn bè mà không bao giờ kể công.",
            love: "E ấp, chân thành và sâu sắc; tình cảm như dòng suối trong nuôi dưỡng tâm hồn người thương.",
            pressure: "Dành cho mình một tách trà ấm, lặng lẽ sắp xếp lại cảm xúc rồi từng bước gỡ rối êm xuôi."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 2: Hoa Quý Tộc Kiêu Sa & Bản Lĩnh
    // ----------------------------------------------------------------------
    {
        id: "rose",
        flowerName: "Rose",
        vietnameseName: "Hoa Hồng",
        title: "Đóa Hồng Quyến Rũ & Bản Lĩnh",
        quote: "Dịu dàng tỏa sắc hương say đắm, nhưng luôn giữ những chiếc gai để tự bảo vệ chính mình.",
        emoji: "🌹",
        traits: ["Quyến rũ", "Bản lĩnh", "Chân thành"],
        petalColor: "#E11D48",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌺", name: "Mẫu đơn", desc: "Đồng điệu về sự tự tin, khí chất kiêu kỳ và gu sống tinh tế." },
            { icon: "🌷", name: "Tulip", desc: "Bổ trợ hoàn hảo giữa sự nồng nàn cuốn hút và nét thanh lịch trang nhã." }
        ],
        clash: [
            { icon: "🎭", name: "Thao túng dối lừa", desc: "Tuyệt đối không dung thứ cho sự phản bội và mập mờ trong tình cảm." },
            { icon: "🌫️", name: "Thiếu chính kiến", desc: "Bạn tôn trọng người dám nghĩ dám làm, không hợp với sự nhu nhược ba phải." }
        ],
        checklist: {
            friend: "Bảo vệ bạn bè hết mình; ai đụng đến người bạn yêu quý là bạn sẽ sẵn sàng xù gai chở che.",
            love: "Yêu hết mình, mãnh liệt và thẳng thắn; nhưng luôn giữ trọn lòng tự trọng và ranh giới riêng.",
            pressure: "Đối diện trực diện, không né tránh; biến nỗi đau thành bài học để ngày càng sắc sảo hơn."
        }
    },
    {
        id: "peony",
        flowerName: "Peony",
        vietnameseName: "Hoa Mẫu Đơn",
        title: "Mẫu Đơn Vương Giả & Đài Các",
        quote: "Tự tin bước đi trong kiêu hãnh, lấy sự bao dung và cốt cách cao quý làm vương miện.",
        emoji: "🌺",
        traits: ["Vương giả", "Đài các", "Bao dung"],
        petalColor: "#EC4899",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌹", name: "Hoa hồng", desc: "Cùng mang thần thái rực rỡ, tự tin làm chủ cuộc đời mình." },
            { icon: "🪴", name: "Lan hồ điệp", desc: "Đồng điệu về sự chỉn chu, quý phái và chiều sâu tư duy." }
        ],
        clash: [
            { icon: "🐜", name: "Chi li tính toán", desc: "Lối sống hẹp hòi, chấp vặt từng li từng tí làm bạn cảm thấy bức bối." },
            { icon: "💨", name: "Nói lời không giữ lời", desc: "Trọng danh dự và lời hứa, cực kỳ dị ứng với sự thất hứa tùy tiện." }
        ],
        checklist: {
            friend: "Người hào phóng, nghĩa hiệp; luôn sẵn lòng hỗ trợ bạn bè một cách chu đáo và đàng hoàng nhất.",
            love: "Tình yêu viên mãn, chung thủy; luôn biết cách vun vén cho tổ ấm và nâng tầm người bạn đời.",
            pressure: "Tự chủ và đĩnh đạc; không để cảm xúc tiêu cực chi phối những quyết định mang tính chiến lược."
        }
    },
    {
        id: "orchid",
        flowerName: "Orchid",
        vietnameseName: "Lan Hồ Điệp",
        title: "Hồ Điệp Sang Trọng & Trí Tuệ",
        quote: "Càng tĩnh lặng càng toát lên chiều sâu, nét đẹp của tri thức và sự tinh tế vượt thời gian.",
        emoji: "🪴",
        traits: ["Sang trọng", "Trí tuệ", "Tinh tế"],
        petalColor: "#8B5CF6",
        bgColor: "#F5F3FF",
        match: [
            { icon: "🌺", name: "Mẫu đơn", desc: "Tương xứng về vị thế và sự trân trọng những giá trị bền vững." },
            { icon: "🪷", name: "Hoa sen", desc: "Cùng hướng đến sự thanh cao, không bị cuốn vào những đua chen vô bổ." }
        ],
        clash: [
            { icon: "🤡", name: "Cợt nhả nông cạn", desc: "Không thích sự suồng sã, luôn giữ khoảng cách chừng mực với người thiếu nghiêm túc." },
            { icon: "🌪️", name: "Hỗn loạn bừa bãi", desc: "Yêu chuộng trật tự và sự ngăn nắp từ không gian sống đến tư duy." }
        ],
        checklist: {
            friend: "Cố vấn thông thái; người bạn luôn đưa ra những lời khuyên sâu sắc, công tâm vào lúc cần nhất.",
            love: "Tôn trọng không gian riêng tư của nhau; yêu bằng sự thấu hiểu từ chiều sâu tâm thức.",
            pressure: "Phân tích logic, vạch rõ ngọn ngành vấn đề và bình thản tháo gỡ từng nút thắt một."
        }
    },
    {
        id: "tulip",
        flowerName: "Tulip",
        vietnameseName: "Hoa Tulip",
        title: "Tulip Kiêu Hãnh & Thanh Lịch",
        quote: "Nét duyên hiện đại nằm ở sự giản đơn, độc lập và luôn ngẩng cao đầu trước nắng gió.",
        emoji: "🌷",
        traits: ["Kiêu hãnh", "Thanh lịch", "Độc lập"],
        petalColor: "#F43F5E",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng tôn sùng phong cách sống thanh lịch, tối giản mà sâu lắng." },
            { icon: "🌹", name: "Hoa hồng", desc: "Cân bằng hoàn hảo giữa nét kiêu kỳ hiện đại và niềm say mê nồng ấm." }
        ],
        clash: [
            { icon: "⛓️", name: "Ràng buộc gò bó", desc: "Tự do là dưỡng khí của bạn; không ai có thể giam cầm cá tính độc lập ấy." },
            { icon: "😒", name: "Phán xét hẹp hòi", desc: "Bạn sống văn minh và tôn trọng sự khác biệt, ghét cay ghét đắng tính tọc mạch." }
        ],
        checklist: {
            friend: "Độc lập, văn minh; tôn trọng tuyệt đối lựa chọn của bạn bè và không bao giờ áp đặt quan điểm.",
            love: "Thẳng thắn, bình đẳng và đồng điệu; tìm kiếm một tâm hồn có thể trò chuyện suốt đêm thâu.",
            pressure: "Tự lập xử lý, dành cho mình một khoảng trời riêng để tái tạo năng lượng rồi trở lại mạnh mẽ."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 3: Hoa Nắng Ấm & Năng Lượng Rạng Rỡ
    // ----------------------------------------------------------------------
    {
        id: "sunflower",
        flowerName: "Sunflower",
        vietnameseName: "Hướng Dương",
        title: "Hướng Dương Tỏa Nắng & Tự Tin",
        quote: "Luôn hướng về nguồn sáng phía trước, để mọi bóng tối tự nhiên rơi lại sau lưng.",
        emoji: "🌻",
        traits: ["Lạc quan", "Nhiệt huyết", "Chân thành"],
        petalColor: "#F59E0B",
        bgColor: "#FEF3C7",
        match: [
            { icon: "🌼", name: "Hoa đồng tiền", desc: "Cặp đôi lan tỏa năng lượng tích cực, xua tan mọi âu lo buồn phiền." },
            { icon: "🌿", name: "Cẩm tú cầu", desc: "Sự nhiệt thành ấm áp của bạn sưởi ấm những góc tâm tư sâu kín của đối phương." }
        ],
        clash: [
            { icon: "☁️", name: "Bi quan độc hại", desc: "Những lời bàn lùi và suy nghĩ u ám dễ làm nghẽn nguồn cảm hứng sống của bạn." },
            { icon: "🧊", name: "Lãnh cảm ơ hờ", desc: "Sự lạnh nhạt vô cớ có thể làm tổn thương trái tim nhiệt tình chân chất." }
        ],
        checklist: {
            friend: "Vitamin nụ cười; chỉ cần bạn xuất hiện là bầu không khí ảm đạm lập tức bừng sáng.",
            love: "Chân thành, ấm áp như ánh dương; luôn muốn mang lại những điều tốt đẹp nhất cho người mình yêu.",
            pressure: "Tìm kiếm góc nhìn tích cực trong mọi nghịch cảnh, tin tưởng vững chắc vào tương lai tươi sáng."
        }
    },
    {
        id: "gerbera",
        flowerName: "Gerbera",
        vietnameseName: "Hoa Đồng Tiền",
        title: "Đồng Tiền Tươi Vui & Hồn Nhiên",
        quote: "Cuộc đời ngắn ngủi, hãy chọn nụ cười thật tươi và đón nhận mọi điều bằng lòng biết ơn.",
        emoji: "🌼",
        traits: ["Hồn nhiên", "Vui vẻ", "Hào sảng"],
        petalColor: "#FB923C",
        bgColor: "#FFF7ED",
        match: [
            { icon: "🌻", name: "Hướng dương", desc: "Hòa nhịp trong tinh thần tích cực, cùng tạo nên những kỷ niệm rực rỡ." },
            { icon: "🌸", name: "Hoa đào", desc: "Cộng hưởng nét tươi vui, mang lại sinh khí dồi dào cho mọi người." }
        ],
        clash: [
            { icon: "🧐", name: "Bới lông tìm vết", desc: "Sự phán xét khắt khe làm thui chột tinh thần vô tư, yêu đời của bạn." },
            { icon: "🌧️", name: "U sầu kéo dài", desc: "Thích sự rạng rỡ dứt khoát, không thích đắm chìm trong những sầu muộn luẩn quẩn." }
        ],
        checklist: {
            friend: "Người pha trò hóm hỉnh, luôn biết cách làm dịu đi những căng thẳng bằng sự hồn nhiên đáng yêu.",
            love: "Trong sáng, vô tư và hào sảng; yêu bạn là chuỗi ngày ngập tràn những niềm vui giản dị.",
            pressure: "Thả lỏng, nghe một bản nhạc vui, ngủ một giấc thật sâu rồi thức dậy bắt đầu lại từ đầu."
        }
    },
    {
        id: "poppy",
        flowerName: "Poppy",
        vietnameseName: "Hoa Anh Túc",
        title: "Anh Túc Bí Ẩn & Cuốn Hút",
        quote: "Nét cuốn hút kỳ lạ đến từ một tâm hồn tự do, giàu cảm xúc và dám sống đúng bản sắc.",
        emoji: "🌺",
        traits: ["Bí ẩn", "Mãnh liệt", "Tự do"],
        petalColor: "#EF4444",
        bgColor: "#FEF2F2",
        match: [
            { icon: "💜", name: "Oải hương", desc: "Sự kết hợp giữa cảm xúc mãnh liệt và khoảng lặng thư thái tĩnh tại." },
            { icon: "🌹", name: "Hoa hồng", desc: "Đồng điệu về niềm đam mê sâu sắc và vẻ đẹp sắc sảo riêng biệt." }
        ],
        clash: [
            { icon: "📦", name: "Khuôn mẫu cứng nhắc", desc: "Tâm hồn nghệ sĩ tự do của bạn ngột ngạt trước những chiếc hộp định kiến chật hẹp." },
            { icon: "🥱", name: "Nhạt nhòa đơn điệu", desc: "Thích chiều sâu cảm xúc, không chịu nổi sự hời hợt tầm thường." }
        ],
        checklist: {
            friend: "Người bạn đặc biệt luôn có những góc nhìn độc đáo, không bao giờ để câu chuyện rơi vào nhàm chán.",
            love: "Yêu nồng nhiệt, sâu sắc và đầy mê hoặc; một khi đã thương ai là khắc cốt ghi tâm.",
            pressure: "Tìm về nghệ thuật, viết lách hoặc âm nhạc để giãi bày và chuyển hóa những xung đột nội tâm."
        }
    },
    {
        id: "allium",
        flowerName: "Allium",
        vietnameseName: "Hành Kiểng",
        title: "Allium Độc Bản & Kiên Nhẫn",
        quote: "Đừng ngại khác biệt; sự kiên nhẫn kết tinh nên hình cầu hoàn mỹ độc nhất vô nhị.",
        emoji: "🌸",
        traits: ["Độc bản", "Kiên nhẫn", "Khác biệt"],
        petalColor: "#A855F7",
        bgColor: "#FAF5FF",
        match: [
            { icon: "🪴", name: "Lan hồ điệp", desc: "Trân trọng sự khác biệt và cùng theo đuổi sự hoàn hảo trong từng chi tiết." },
            { icon: "🌾", name: "Cẩm tú cầu", desc: "Sự đồng điệu giữa cấu trúc gắn kết kỳ diệu của hàng trăm đóa hoa nhỏ." }
        ],
        clash: [
            { icon: "👥", name: "Tâm lý đám đông", desc: "Bạn có lối đi riêng, không bao giờ mù quáng hùa theo những trào lưu vô bổ." },
            { icon: "⚡", name: "Nóng vội đốt cháy giai đoạn", desc: "Tin vào quy luật thời gian, ghét thói làm ẩu ăn xổi ở thì." }
        ],
        checklist: {
            friend: "Người bạn chân thật, không a dua; luôn mang lại cho bạn bè sự tin cậy tuyệt đối về mặt nhân cách.",
            love: "Chậm mà chắc, kiên định và sâu sắc; dành thời gian xây đắp nền tảng niềm tin vững chắc.",
            pressure: "Tĩnh tâm lùi lại một bước, kiên trì theo đuổi kế hoạch dài hạn với sự bền bỉ đáng kinh ngạc."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 4: Hoa Đồng Nội Mộc Mạc & Tự Tại
    // ----------------------------------------------------------------------
    {
        id: "daisy",
        flowerName: "Daisy",
        vietnameseName: "Cúc Họa Mi",
        title: "Cúc Họa Mi Trong Trẻo & Tự Tại",
        quote: "Bình dị nở rộ giữa gió đầu đông, mang nét đẹp tinh khôi sưởi ấm lòng người qua phố.",
        emoji: "🌼",
        traits: ["Trong trẻo", "Bình dị", "Tự tại"],
        petalColor: "#E2E8F0",
        bgColor: "#F8FAFC",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng mang cốt cách thanh thuần, an yên giữa dòng đời tất bật." },
            { icon: "🌾", name: "Hoa baby", desc: "Cộng hưởng nét mong manh dễ thương khiến ai cũng muốn nâng niu." }
        ],
        clash: [
            { icon: "🦚", name: "Hợm hĩnh màu mè", desc: "Bạn yêu sự chân chất giản đơn, khó hòa nhập với thói chuộng danh ảo." },
            { icon: "🗣️", name: "Toan tính thị phi", desc: "Tâm hồn trong trẻo của bạn không hợp với những âm mưu phức tạp." }
        ],
        checklist: {
            friend: "Chốn bình yên ai cũng muốn tìm về; bên bạn người ta thấy cuộc đời nhẹ nhõm như mây trời.",
            love: "Thương bằng sự bình dị, chân phương; những cái nắm tay ấm áp và sự thấu cảm thầm lặng.",
            pressure: "Đi dạo dưới hàng cây, hít thở khí trời trong lành và buông bỏ những muộn phiền không đáng có."
        }
    },
    {
        id: "baby_breath",
        flowerName: "Baby's Breath",
        vietnameseName: "Hoa Baby",
        title: "Hoa Baby Dịu Dàng & Tinh Khôi",
        quote: "Như muôn ngàn đốm tuyết nhỏ dịu dàng, âm thầm tôn vinh vẻ đẹp của vạn vật xung quanh.",
        emoji: "🌾",
        traits: ["Tinh khôi", "Dịu dàng", "Thầm lặng"],
        petalColor: "#CBD5E1",
        bgColor: "#F8FAFC",
        match: [
            { icon: "🌼", name: "Cúc họa mi", desc: "Cùng mang sắc trắng trong trẻo và trái tim thuần hậu không tì vết." },
            { icon: "🌹", name: "Hoa hồng", desc: "Sự hòa quyện tuyệt vời giữa nền nã dịu dàng và nét rạng ngời kiêu sa." }
        ],
        clash: [
            { icon: "🌪️", name: "Thô lỗ cộc cằn", desc: "Cần được đối xử nhẹ nhàng, lời nói khiếm nhã dễ làm bạn tổn thương sâu sắc." },
            { icon: "🎯", name: "Vị kỷ cá nhân", desc: "Bạn biết nghĩ cho người khác nên rất thất vọng trước thói ích kỷ chỉ biết mình." }
        ],
        checklist: {
            friend: "Người lắng nghe kiên nhẫn nhất; luôn tạo cảm giác an toàn để bạn bè trải lòng mọi bí mật.",
            love: "Dịu dàng, chăm chút từng li từng tí; tình yêu như hạt sương mai trong trẻo vỗ về tâm hồn.",
            pressure: "Tìm chốn yên tĩnh một mình, nhẹ nhàng gom nhặt lại từng mảnh cảm xúc để tự chữa lành."
        }
    },
    {
        id: "lavender",
        flowerName: "Lavender",
        vietnameseName: "Hoa Oải Hương",
        title: "Oải Hương Lắng Đọng & Chữa Lành",
        quote: "Hương thơm tím biếc xoa dịu những âu lo, mang đến sự an trú tĩnh tại sâu thẳm tâm hồn.",
        emoji: "💜",
        traits: ["Chữa lành", "Thủy chung", "Tĩnh tại"],
        petalColor: "#8B5CF6",
        bgColor: "#F5F3FF",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng hướng về sự an nhiên nội tại và nguồn năng lượng tích cực tĩnh lặng." },
            { icon: "🌿", name: "Hoa lưu ly", desc: "Đồng điệu về sự thủy chung son sắt và trân trọng ký ức sâu sắc." }
        ],
        clash: [
            { icon: "⚡", name: "Vội vã hỗn loạn", desc: "Nhịp sống gấp gáp, xáo trộn dễ làm đứt gãy mạch suy tư an bình của bạn." },
            { icon: "🎭", name: "Dối trá hai mặt", desc: "Bạn đề cao sự chung thủy và lòng chân thành, ghét thói giả tạo." }
        ],
        checklist: {
            friend: "Liều thuốc an thần cho bạn bè; một cuộc trò chuyện với bạn đủ làm dịu đi bao giông bão lòng.",
            love: "Thủy chung, sâu sắc và gắn kết bền lâu; tình yêu vượt qua thử thách của thời gian và khoảng cách.",
            pressure: "Thắp một ngọn nến thơm, ngâm mình trong dòng nước ấm và để tâm trí được thả lỏng hoàn toàn."
        }
    },
    {
        id: "hydrangea",
        flowerName: "Hydrangea",
        vietnameseName: "Cẩm Tú Cầu",
        title: "Cẩm Tú Cầu Thấu Cảm & Biết Ơn",
        quote: "Hàng trăm cánh hoa nhỏ đan kết thành hình cầu trọn vẹn, tượng trưng cho lòng biết ơn chân thành.",
        emoji: "🌿",
        traits: ["Thấu cảm", "Biết ơn", "Đa cảm"],
        petalColor: "#38BDF8",
        bgColor: "#F0F9FF",
        match: [
            { icon: "🌻", name: "Hướng dương", desc: "Sự hòa quyện giữa lòng thấu cảm chân thành và năng lượng ấm áp rạng rỡ." },
            { icon: "🌺", name: "Cẩm chướng", desc: "Đồng điệu về lòng biết ơn sâu nặng và sự quan tâm chu đáo đến người khác." }
        ],
        clash: [
            { icon: "🧊", name: "Vô ơn bội bạc", desc: "Bạn sống tình nghĩa nên cực kỳ tổn thương trước sự vô ơn và phụ bạc." },
            { icon: "🎯", name: "Lợi dụng tình cảm", desc: "Trực giác nhạy bén giúp bạn sớm nhận ra và xa lánh những kẻ toan tính trục lợi." }
        ],
        checklist: {
            friend: "Người nhớ từng ngày kỷ niệm, luôn gửi những món quà bất ngờ đong đầy tình cảm chân thành.",
            love: "Yêu sâu sắc, thấu hiểu và gắn kết; biến tình yêu thành bến đỗ bình yên che chở mọi giông bão.",
            pressure: "Chia sẻ với người tri kỷ, trải lòng qua từng con chữ để giải tỏa những dồn nén cảm xúc."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 5: Hoa Di Sản Đoan Trang & Sâu Sắc
    // ----------------------------------------------------------------------
    {
        id: "lily",
        flowerName: "Lily",
        vietnameseName: "Hoa Bách Hợp",
        title: "Bách Hợp Thanh Nhã & Đoan Trang",
        quote: "Đoan trang trong cốt cách, thanh nhã giữa đời thường, sắc hương thuần khiết tựa trăng rằm.",
        emoji: "⚜️",
        traits: ["Đoan trang", "Thanh nhã", "Kiên định"],
        petalColor: "#E2E8F0",
        bgColor: "#F8FAFC",
        match: [
            { icon: "🌼", name: "Mai vàng", desc: "Cùng tôn vinh giá trị trung kiên, giữ trọn lời hứa và sự đoan chính." },
            { icon: "🪷", name: "Hoa sen", desc: "Đồng điệu về vẻ đẹp chuẩn mực, thanh cao không vướng bụi trần." }
        ],
        clash: [
            { icon: "🗑️", name: "Xuề xòa cẩu thả", desc: "Bạn chuộng sự chỉn chu, khó chịu trước thái độ làm việc tắc trách, nửa vời." },
            { icon: "🤡", name: "Suồng sã thiếu tôn trọng", desc: "Luôn giữ ranh giới lịch thiệp, không chấp nhận sự khiếm nhã vô duyên." }
        ],
        checklist: {
            friend: "Người giữ chữ tín hàng đầu; đã hứa điều gì là bạn sẽ dốc lòng thực hiện cho bằng được.",
            love: "Nghiêm túc, son sắt và tôn trọng; xây đắp tình yêu dựa trên nền tảng đạo đức và sự thấu hiểu.",
            pressure: "Tự nhắc nhở về giá trị cốt lõi của bản thân, kiên định với con đường đúng đắn đã chọn."
        }
    },
    {
        id: "magnolia",
        flowerName: "Magnolia",
        vietnameseName: "Hoa Mộc Lan",
        title: "Mộc Lan Quý Phái & Can Trường",
        quote: "Nở rộ kiêu hãnh trên những cành trơ trụi giữa mùa đông, biểu tượng của người phụ nữ kiên cường.",
        emoji: "🤍",
        traits: ["Can trường", "Quý phái", "Bản lĩnh"],
        petalColor: "#FDA4AF",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🪴", name: "Lan hồ điệp", desc: "Cùng toát lên khí chất quý phái, độc lập và khả năng tự chủ tuyệt vời." },
            { icon: "🌺", name: "Hoa trà", desc: "Sự đồng điệu giữa sức chịu đựng dẻo dai và nét đẹp mặn mà đằm thắm." }
        ],
        clash: [
            { icon: "💨", name: "Hèn nhát thoái lui", desc: "Bạn coi trọng tinh thần dám chịu trách nhiệm, ghét thói đổ lỗi cho người khác." },
            { icon: "🥀", name: "Yếu đuối giả tạo", desc: "Không thích sự ủy mị thái quá, đề cao tinh thần tự lực cánh sinh." }
        ],
        checklist: {
            friend: "Chỗ dựa vững chãi trong giông bão; bạn luôn là người đứng ra gánh vác khi tập thể gặp nguy nan.",
            love: "Đồng cam cộng khổ, chung lưng đấu cật; tình yêu cùng nhau trưởng thành và vượt qua thử thách.",
            pressure: "Bản lĩnh vững vàng, nhìn thẳng vào chông gai và xem đó là cơ hội tôi rèn ý chí thép."
        }
    },
    {
        id: "camellia",
        flowerName: "Camellia",
        vietnameseName: "Hoa Trà",
        title: "Hoa Trà Đằm Thắm & Bền Bỉ",
        quote: "Cánh hoa dày dặn kiên cường qua sương gió, mặn mà đằm thắm theo dòng thời gian.",
        emoji: "🌺",
        traits: ["Đằm thắm", "Kiên nhẫn", "Chân chất"],
        petalColor: "#FB7185",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🤍", name: "Mộc lan", desc: "Cùng mang vẻ đẹp dẻo dai qua sương giá, bền bỉ qua năm tháng." },
            { icon: "🪷", name: "Hoa sen", desc: "Đồng điệu về sự tĩnh tại, không phô trương mà càng ngắm càng say." }
        ],
        clash: [
            { icon: "⚡", name: "Cả thèm chóng chán", desc: "Bạn chuộng sự bền lâu, khó chấp nhận những người dễ dàng bỏ cuộc giữa chừng." },
            { icon: "🎭", name: "Nông nổi màu mè", desc: "Thích giá trị thực tế lâu dài hơn là những màn trình diễn hào nhoáng nhất thời." }
        ],
        checklist: {
            friend: "Tình bạn tri kỷ mười năm như một; dù ít gặp nhưng khi cần là luôn có mặt trọn vẹn.",
            love: "Sâu lắng, bền bỉ và thủy chung; tình yêu càng trải qua thăng trầm càng thêm mặn nồng son sắt.",
            pressure: "Kiên nhẫn chờ đợi thời cơ, âm thầm chuẩn bị kỹ lưỡng và không bao giờ đánh mất niềm tin."
        }
    },
    {
        id: "carnation",
        flowerName: "Carnation",
        vietnameseName: "Cẩm Chướng",
        title: "Cẩm Chướng Ấm Áp & Chở Che",
        quote: "Từng cánh hoa mềm mại xếp tầng như vòng tay ấm áp, chở che và nuôi dưỡng yêu thương.",
        emoji: "🌺",
        traits: ["Ấm áp", "Chở che", "Chu đáo"],
        petalColor: "#F472B6",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌸", name: "Hoa đào", desc: "Sự kết hợp giữa tình cảm ấm áp chở che và nét duyên dáng tươi vui." },
            { icon: "🌿", name: "Cẩm tú cầu", desc: "Cùng đong đầy sự thấu hiểu và lòng biết ơn sâu sắc đối với người thân yêu." }
        ],
        clash: [
            { icon: "🧊", name: "Lãnh đạm vô tình", desc: "Trái tim giàu tình cảm của bạn dễ chạnh lòng trước sự lạnh nhạt thờ ơ." },
            { icon: "🗡️", name: "Lời nói cay nghiệt", desc: "Bạn trân trọng lời hay ý đẹp, dị ứng với lối nói xúc phạm tổn thương nhau." }
        ],
        checklist: {
            friend: "Người chăm lo chu đáo nhất; luôn để ý xem bạn bè ăn uống đủ chưa, có mệt mỏi ở đâu không.",
            love: "Bao dung, hy sinh và chăm chút; tình yêu tràn ngập sự ấm áp như được trở về nhà sau ngày dài.",
            pressure: "Nghĩ về những người thân yêu để lấy lại sức mạnh, kiên cường vượt khó vì trách nhiệm và tình thương."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 6: Hoa Nước & Tinh Khôi Duyên Dáng
    // ----------------------------------------------------------------------
    {
        id: "plumeria",
        flowerName: "Plumeria",
        vietnameseName: "Hoa Sứ",
        title: "Hoa Sứ Bình Thản & Khoan Dung",
        quote: "Sắc trắng viền vàng thoang thoảng hương ấm, an trú trọn vẹn trong từng khoảnh khắc hiện tại.",
        emoji: "🌼",
        traits: ["Bình thản", "Khoan dung", "Ấm áp"],
        petalColor: "#FBBF24",
        bgColor: "#FEFCE8",
        match: [
            { icon: "🤍", name: "Hoa lài", desc: "Cùng mang lại cảm giác an bình mộc mạc, hương thơm nhẹ nhàng vương vấn." },
            { icon: "🪷", name: "Hoa súng", desc: "Hòa nhịp trong sự thư thái tĩnh lặng, buông bỏ những ưu phiền cuộc sống." }
        ],
        clash: [
            { icon: "🔥", name: "Sân si chấp nhặt", desc: "Tâm thế bình thản của bạn không phù hợp với những cuộc tranh đấu hơn thua." },
            { icon: "🌪️", name: "Áp lực dồn dập", desc: "Cần nhịp sống thong dong, dễ mỏi mệt trước môi trường căng thẳng quá độ." }
        ],
        checklist: {
            friend: "Người luôn mỉm cười lắng nghe, không bao giờ phán xét hay thêm dầu vào lửa khi bạn bè nóng giận.",
            love: "Bình yên, tin cậy và ấm cúng; tình yêu như nắng sớm sưởi ấm tâm hồn mỗi sớm mai thức dậy.",
            pressure: "Tập thở chậm lại, tự nhủ 'chuyện gì rồi cũng sẽ qua' và giữ tâm mình bình lặng như mặt hồ."
        }
    },
    {
        id: "water_lily",
        flowerName: "Water Lily",
        vietnameseName: "Hoa Súng",
        title: "Hoa Súng Lắng Đọng & Kiên Trì",
        quote: "Vươn mình từ mặt nước tĩnh lặng đón ánh ban mai, vẻ đẹp mộc mạc mà tràn đầy sức sống.",
        emoji: "🪷",
        traits: ["Lắng đọng", "Kiên trì", "Thuần hậu"],
        petalColor: "#C084FC",
        bgColor: "#FAF5FF",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng chung cốt cách hướng thiện, vươn lên từ bùn đất mà vẫn giữ hương sắc trong ngần." },
            { icon: "🌼", name: "Hoa sứ", desc: "Sự kết nối giữa tinh thần thư thái và lòng khoan dung độ lượng." }
        ],
        clash: [
            { icon: "📢", name: "Huyên náo thị phi", desc: "Thích sự yên ả của dòng sông quê, dị ứng với những cuộc khẩu chiến vô bổ." },
            { icon: "⚡", name: "Đốt cháy giai đoạn", desc: "Bạn tin vào nhịp điệu tự nhiên, không chịu được sự thúc bách nóng vội." }
        ],
        checklist: {
            friend: "Người bạn thủy chung son sắt, dù năm tháng đổi thay vẫn giữ trọn sự chân tình nguyên sơ nhất.",
            love: "Lặng lẽ, sâu sắc và bền bỉ; luôn là hậu phương vững chắc cho người mình yêu thương.",
            pressure: "Lắng lòng quan sát, kiên nhẫn chờ thời điểm thích hợp để giải quyết vấn đề một cách thấu đáo."
        }
    },
    {
        id: "forget_me_not",
        flowerName: "Forget-me-not",
        vietnameseName: "Hoa Lưu Ly",
        title: "Lưu Ly Thủy Chung & Hoài Niệm",
        quote: "Những cánh hoa xanh biếc giữ trọn lời hứa, trân quý từng mảnh ghép kỷ niệm trong đời.",
        emoji: "💙",
        traits: ["Thủy chung", "Hoài niệm", "Chân thành"],
        petalColor: "#60A5FA",
        bgColor: "#EFF6FF",
        match: [
            { icon: "💜", name: "Oải hương", desc: "Đồng điệu về sự sâu sắc trong tình cảm và khả năng trân trọng ký ức đẹp." },
            { icon: "🌾", name: "Hoa baby", desc: "Cộng hưởng nét mong manh, tinh tế và trái tim chân thành biết nghĩ cho người khác." }
        ],
        clash: [
            { icon: "💨", name: "Bội bạc quên ơn", desc: "Bạn trọng tình trọng nghĩa, cực kỳ thất vọng trước những người phụ bạc thâm tình." },
            { icon: "🧊", name: "Vô cảm hời hợt", desc: "Không thể kết nối với những người coi nhẹ cảm xúc và xem kỷ niệm như phù du." }
        ],
        checklist: {
            friend: "Người giữ hộp ký ức của nhóm; luôn nhắc nhở về những kỷ niệm đẹp đã gắn kết mọi người lại với nhau.",
            love: "Son sắt, một lòng một dạ; tình yêu là lời thề ước được gìn giữ trọn vẹn theo năm tháng.",
            pressure: "Mở lại những tấm ảnh cũ, tìm về những ký ức ấm áp để được tiếp thêm sức mạnh bước tiếp."
        }
    },
    {
        id: "statice",
        flowerName: "Statice",
        vietnameseName: "Hoa Salem",
        title: "Salem Bền Bỉ & Khiêm Nhường",
        quote: "Ngay cả khi khô đi vẫn giữ trọn màu sắc nguyên bản, biểu tượng của sự kiên định không đổi thay.",
        emoji: "🌸",
        traits: ["Bền bỉ", "Khiêm nhường", "Son sắt"],
        petalColor: "#E879F9",
        bgColor: "#FDF4FF",
        match: [
            { icon: "🤍", name: "Hoa trà", desc: "Cùng mang đức tính kiên nhẫn, bền bỉ và chung thủy lâu dài." },
            { icon: "🌾", name: "Cúc họa mi", desc: "Sự kết hợp giữa nét mộc mạc thôn dã và lòng thủy chung son sắt." }
        ],
        clash: [
            { icon: "🎭", name: "Sớm nắng chiều mưa", desc: "Bạn sống nhất quán, khó dung hòa với những người thay đổi tính khí thất thường." },
            { icon: "💨", name: "Lời hứa gió bay", desc: "Ghét sự hứa suông, luôn nhìn vào hành động cụ thể để đánh giá người khác." }
        ],
        checklist: {
            friend: "Chân thành, đáng tin cậy; bạn luôn là điểm tựa âm thầm không bao giờ rời bỏ bạn bè lúc gian nan.",
            love: "Bền chặt, không phai nhạt; tình cảm dung dị nhưng càng ở bên nhau lâu càng thấy trân quý.",
            pressure: "Bền bỉ bám đuổi mục tiêu, không than vãn, kiên trì tích lũy từng chút một để vượt qua thử thách."
        }
    },
    {
        id: "marigold",
        flowerName: "Marigold",
        vietnameseName: "Cúc Vạn Thọ",
        title: "Vạn Thọ Ấm Cúng & Nghĩa Tình",
        quote: "Sắc vàng cam đượm hương đồng nội, mang theo lời chúc sức khỏe, trường thọ và bình an.",
        emoji: "🏵️",
        traits: ["Ấm cúng", "Nghĩa tình", "Vững chãi"],
        petalColor: "#F59E0B",
        bgColor: "#FEF3C7",
        match: [
            { icon: "🌼", name: "Mai vàng", desc: "Cùng mang lại không khí sum vầy, đoàn tụ ấm áp trong những ngày lễ Tết." },
            { icon: "🌺", name: "Cẩm chướng", desc: "Đồng điệu về sự hiếu nghĩa, lòng tri ân sâu sắc đối với cội nguồn gia đình." }
        ],
        clash: [
            { icon: "❄️", name: "Lạnh nhạt gia đình", desc: "Bạn coi trọng tình thân, rất đau lòng trước những ai đối xử bạc bẽo với người nhà." },
            { icon: "🌪️", name: "Phù phiếm xa hoa", desc: "Thích sự ấm cúng mộc mạc, không hợp với lối sống đua đòi lãng phí." }
        ],
        checklist: {
            friend: "Người luôn kết nối các thành viên, tổ chức những buổi sum họp ấm áp đậm đà tình thân.",
            love: "Vững chãi, chân thành và vun vén; tình yêu gắn liền với ước nguyện xây dựng tổ ấm hạnh phúc lâu dài.",
            pressure: "Tìm về với gia đình, ăn một bữa cơm ấm cúng cùng người thân để nạp lại nguồn năng lượng bình an."
        }
    },
    {
        id: "cherry_blossom",
        flowerName: "Cherry Blossom",
        vietnameseName: "Hoa Anh Đào",
        title: "Anh Đào Tinh Khôi & Bay Bổng",
        quote: "Nở rộ kiêu hãnh và nhẹ nhàng buông mình theo gió, trân trọng trọn vẹn từng khoảnh khắc thanh xuân.",
        emoji: "🌸",
        traits: ["Tinh khôi", "Bay bổng", "Trân quý hiện tại"],
        petalColor: "#F472B6",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌸", name: "Hoa đào", desc: "Cùng mang sắc hồng lãng mạn và sự tươi mới đánh thức mọi giác quan." },
            { icon: "🪷", name: "Hoa sen", desc: "Đồng điệu về nét tinh khiết, nhẹ nhàng thanh lọc những xô bồ trần thế." }
        ],
        clash: [
            { icon: "⛓️", name: "Cố chấp níu kéo", desc: "Bạn hiểu lẽ vô thường của vạn vật, không thích sự bảo thủ cố chấp cực đoan." },
            { icon: "🖤", name: "Cay nghiệt tiêu cực", desc: "Tâm hồn trong trẻo của bạn cần không gian lãng mạn, thanh tao để cất cánh." }
        ],
        checklist: {
            friend: "Người luôn truyền cảm hứng sống đẹp, nhắc nhở bạn bè biết trân trọng những phút giây hiện tại.",
            love: "Yêu say đắm và trân trọng hiện tại, biến từng buổi hẹn hò thành kỷ niệm đáng nhớ.",
            pressure: "Tập trung vào giải pháp trước mắt, mỉm cười đón nhận và không hối tiếc."
        }
    },
    {
        id: "hibiscus",
        flowerName: "Hibiscus",
        vietnameseName: "Hoa Phù Dung",
        title: "Phù Dung Biến Hóa & Tự Do",
        quote: "Mỗi thời khắc trong ngày mang một nét cuốn hút riêng, linh hoạt, duyên dáng và đầy tính nghệ thuật.",
        emoji: "🌺",
        traits: ["Linh hoạt", "Quyến rũ", "Nghệ sĩ"],
        petalColor: "#F97316",
        bgColor: "#FFF7ED",
        match: [
            { icon: "🌹", name: "Hoa hồng", desc: "Đồng điệu về vẻ đẹp sắc sảo và niềm say mê cái đẹp tinh tế." },
            { icon: "🌸", name: "Allium", desc: "Sự kết hợp bất ngờ giữa tính nghệ sĩ và óc sáng tạo dí dỏm." }
        ],
        clash: [
            { icon: "📋", name: "Rập khuôn đơn điệu", desc: "Cuộc sống một màu tẻ nhạt dễ khiến tâm hồn nghệ sĩ cảm thấy bế tắc." },
            { icon: "⛓️", name: "Kiềm tỏa khắt khe", desc: "Cần không gian phóng khoáng để tự do thể hiện bản sắc cá nhân." }
        ],
        checklist: {
            friend: "Người luôn đem lại sự tươi mới và những bất ngờ thú vị cho các cuộc gặp gỡ.",
            love: "Yêu lãng mạn và tinh tế, luôn biết cách làm cho tình yêu ngập tràn màu sắc mới mẻ.",
            pressure: "Linh hoạt biến đổi theo hoàn cảnh, tìm thấy nét tích cực và góc nhìn mới trong nghịch cảnh."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 7: Hoa Di Sản Bổ Sung (Floriography & Chiều Sâu Tâm Hồn)
    // ----------------------------------------------------------------------
    {
        id: "lisianthus",
        flowerName: "Lisianthus",
        vietnameseName: "Hoa Cát Tường",
        title: "Cát Tường Dịu Êm & May Mắn",
        quote: "Cánh hoa mỏng manh như dải lụa nhưng ẩn chứa nội lực kiên cường, mang lại sự cát tường an nhiên.",
        emoji: "🌸",
        traits: ["May mắn", "Dịu dàng", "Kiên cường"],
        petalColor: "#818CF8",
        bgColor: "#F5F3FF",
        match: [
            { icon: "🌼", name: "Cúc họa mi", desc: "Đồng điệu nét bình dị, ngồi bên nhau là bao âu lo tan biến." },
            { icon: "⚜️", name: "Bách hợp", desc: "Cùng tôn vinh sự đoan trang, dung dị mà toát lên khí chất quý phái." }
        ],
        clash: [
            { icon: "⚡", name: "Áp đặt định kiến", desc: "Bạn cần sự tôn trọng nhẹ nhàng, bức bối trước những áp đặt gia trưởng." },
            { icon: "🗡️", name: "Lời nói cay nghiệt", desc: "Tâm hồn mỏng manh dễ trầy xước trước những lời công kích vô cớ." }
        ],
        checklist: {
            friend: "Ngôi sao may mắn của nhóm; ở bên bạn người ta luôn cảm nhận được sự dịu dàng và an tâm kỳ lạ.",
            love: "Yêu êm đềm, chăm chút và tinh tế; dùng sự kiên nhẫn và thấu hiểu để vun đắp hạnh phúc lâu bền.",
            pressure: "Mềm dẻo như dòng nước, nhẫn nại vượt qua ghềnh đá mà không hề đánh mất bản sắc trong trẻo."
        }
    },
    {
        id: "lily_of_the_valley",
        flowerName: "Lily of the Valley",
        vietnameseName: "Hoa Linh Lan",
        title: "Linh Lan Thuần Khiết & An Nhiên",
        quote: "Từng chiếc chuông trắng nhỏ rung lên khúc hoan ca, báo hiệu hạnh phúc ngọt ngào đã tìm về gõ cửa.",
        emoji: "🔔",
        traits: ["Thuần khiết", "May mắn", "Hy vọng"],
        petalColor: "#2DD4BF",
        bgColor: "#F0FDFA",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng giữ trọn tâm hồn trong veo, không một chút bụi trần vương vấn." },
            { icon: "🌾", name: "Hoa baby", desc: "Cộng hưởng nét mong manh thánh thiện, lay động mọi trái tim sắt đá." }
        ],
        clash: [
            { icon: "💰", name: "Toan tính vụ lợi", desc: "Trực giác nhạy bén ghét cay ghét đắng những mối quan hệ sặc mùi thực dụng." },
            { icon: "📢", name: "Tranh đoạt ồn ào", desc: "Không thích chen lấn xô bồ, bạn chọn một góc vườn tĩnh lặng để ngát hương." }
        ],
        checklist: {
            friend: "Người bạn chữa lành tuyệt vời; chỉ cần một tin nhắn thăm hỏi của bạn là đủ xoa dịu một ngày giông bão.",
            love: "Tình yêu như cổ tích ban sơ; chân thành, thủy chung và luôn mong cầu những điều bình an nhất cho người thương.",
            pressure: "Tìm về chốn thiên nhiên thanh vắng, để tiếng chuông gió vỗ về và tái tạo nguồn năng lượng trong lành."
        }
    },
    {
        id: "queen_of_the_night",
        flowerName: "Queen of the Night",
        vietnameseName: "Hoa Quỳnh",
        title: "Dạ Quỳnh Kiêu Sa Trong Lặng Lẽ",
        quote: "Nở rộ lộng lẫy giữa đêm sâu thẳm, chắt chiu tinh túy đất trời cho một khoảnh khắc thăng hoa trọn vẹn.",
        emoji: "🌙",
        traits: ["Kiêu sa", "Sâu sắc", "Chân thành"],
        petalColor: "#E2E8F0",
        bgColor: "#F8FAFC",
        match: [
            { icon: "🌺", name: "Hoa trà", desc: "Cùng thấu hiểu giá trị của sự kiên nhẫn và những khoảnh khắc bung nở sâu lắng." },
            { icon: "💜", name: "Oải hương", desc: "Đồng điệu về năng lượng tĩnh tại, thích hợp cho những cuộc trò chuyện đêm muộn." }
        ],
        clash: [
            { icon: "🎭", name: "Thao túng bề nổi", desc: "Bạn nhìn thấu những chiêu trò giả tạo và lập tức thu mình lại để bảo vệ năng lượng." },
            { icon: "⏳", name: "Hối thúc nông nổi", desc: "Vẻ đẹp của bạn cần thời gian để thấu cảm, không dành cho những kẻ vội vàng cưỡi ngựa xem hoa." }
        ],
        checklist: {
            friend: "Người bạn tâm giao đêm muộn; sẵn sàng thức cùng bạn đến sáng để nghe hết những tâm tư giấu kín.",
            love: "Yêu sâu sắc và hiến dâng trọn vẹn; chỉ trao đi những gì tinh túy nhất cho người xứng đáng hiểu mình.",
            pressure: "Tĩnh lặng một mình trong bóng đêm, viết nhật ký hoặc thiền định để sắp xếp lại miền tâm tưởng."
        }
    },
    {
        id: "white_champaca",
        flowerName: "White Champaca",
        vietnameseName: "Hoa Ngọc Lan",
        title: "Ngọc Lan Thanh Cao & Hướng Thiện",
        quote: "Hương thơm vấn vương góc phố xưa, dịu dàng lan tỏa như tâm hồn đôn hậu hướng về điều thiện lành.",
        emoji: "🕊️",
        traits: ["Thanh cao", "Đoan trang", "Hướng thiện"],
        petalColor: "#FDE047",
        bgColor: "#FEFCE8",
        match: [
            { icon: "🤍", name: "Hoa lài", desc: "Bộ đôi hương thơm truyền thống đánh thức những ký ức tuổi thơ thanh bình." },
            { icon: "🤍", name: "Mộc lan", desc: "Cùng toát lên cốt cách đoan trang, nho nhã và lòng nhân hậu bao dung." }
        ],
        clash: [
            { icon: "🎭", name: "Giả tạo hai mặt", desc: "Bạn sống ngay thẳng và tôn trọng đạo nghĩa, không thể hòa hợp với thói đâm sau lưng." },
            { icon: "📢", name: "Càn quấy bất kính", desc: "Luôn tôn trọng người lớn tuổi và chuẩn mực gia phong, dị ứng với sự xấc xược." }
        ],
        checklist: {
            friend: "Chỗ dựa đạo đức và tinh thần; mỗi khi lạc lối bạn bè đều tìm đến bạn để lấy lại sự định tâm.",
            love: "Trang nhã, tôn trọng và ấm cúng; tình cảm như hương ngọc lan vương trên mái tóc người thương.",
            pressure: "Tìm về chốn cửa thiền hoặc góc sân nhà, ngửi mùi hương quen thuộc để lòng lắng lại như mặt nước phẳng."
        }
    },
    {
        id: "bird_of_paradise",
        flowerName: "Bird of Paradise",
        vietnameseName: "Hoa Thiên Điểu",
        title: "Thiên Điểu Bản Lĩnh & Khát Vọng",
        quote: "Sải cánh kiêu hãnh vươn mình đón ánh mặt trời, biểu tượng của sự tự do, khát vọng và thành công.",
        emoji: "🪶",
        traits: ["Tự do", "Bản lĩnh", "Khát vọng"],
        petalColor: "#EA580C",
        bgColor: "#FFF7ED",
        match: [
            { icon: "🌻", name: "Hướng dương", desc: "Cùng sở hữu nguồn năng lượng vươn lên mạnh mẽ, không gì ngăn cản nổi." },
            { icon: "🪴", name: "Lan hồ điệp", desc: "Sự kết hợp giữa thần thái tự tin phóng khoáng và trí tuệ lãnh đạo sắc sảo." }
        ],
        clash: [
            { icon: "⛓️", name: "Kiểm soát tù túng", desc: "Bạn sinh ra để bay lượn trên bầu trời rộng lớn, tuyệt đối không chấp nhận lồng son." },
            { icon: "🐢", name: "An phận thụ động", desc: "Bạn thích tiến về phía trước, dễ mất kiên nhẫn với những người ì ạch không chịu thay đổi." }
        ],
        checklist: {
            friend: "Người truyền lửa táo bạo; luôn thôi thúc bạn bè bước ra khỏi vùng an toàn để chạm tới ước mơ.",
            love: "Tình yêu của hai kẻ độc lập, cùng sát cánh bay về một hướng mà vẫn tôn trọng bầu trời riêng của nhau.",
            pressure: "Hành động quyết liệt để thay đổi cục diện thay vì ngồi một chỗ than vãn hay đổ lỗi."
        }
    },
    {
        id: "osmanthus",
        flowerName: "Osmanthus",
        vietnameseName: "Hoa Mộc Hương",
        title: "Mộc Hương Khiêm Nhường & Lan Xa",
        quote: "Bông hoa nhỏ bé ẩn mình trong vòm lá, nhưng hương thơm đượm tình bay xa muôn dặm nẻo đường đời.",
        emoji: "🍃",
        traits: ["Khiêm nhường", "Đằm thắm", "Lan tỏa"],
        petalColor: "#F59E0B",
        bgColor: "#FEF3C7",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng giữ nét đẹp khiêm tốn, lấy đức hạnh làm hương thơm lan tỏa tự nhiên." },
            { icon: "🌺", name: "Hoa trà", desc: "Đồng điệu về sự đằm thắm theo thời gian, không cần ồn ào mà sâu sắc khó quên." }
        ],
        clash: [
            { icon: "🦚", name: "Huênh hoang phô trương", desc: "Thùng rỗng kêu to khiến bạn mệt mỏi; bạn chuộng sự âm thầm cống hiến hơn." },
            { icon: "⚡", name: "Xốc nổi bốc đồng", desc: "Bạn coi trọng chiều sâu và sự chín chắn, khó gần người thiếu suy nghĩ trước sau." }
        ],
        checklist: {
            friend: "Người bạn chân phương, ấm áp; lặng lẽ quan tâm và xuất hiện đúng lúc người khác cần nhất.",
            love: "Chân thành, kín đáo và son sắt; tình yêu như chén trà mộc ngát hương sau cơn mưa chiều.",
            pressure: "Nhẫn nại hoàn thiện bản thân trong tĩnh lặng, tin tưởng hương thơm của nỗ lực sẽ có ngày tỏa ngát."
        }
    },
    {
        id: "dandelion",
        flowerName: "Dandelion",
        vietnameseName: "Hoa Bồ Công Anh",
        title: "Bồ Công Anh Tự Do & Hy Vọng",
        quote: "Can đảm buông mình theo cơn gió ngàn, mang theo những hạt mầm ước mơ gieo khắp nẻo đường mới.",
        emoji: "🌬️",
        traits: ["Tự do", "Can đảm", "Hy vọng"],
        petalColor: "#FACC15",
        bgColor: "#FEF9C3",
        match: [
            { icon: "🌼", name: "Cúc họa mi", desc: "Cùng yêu thích cỏ cây đồng nội, nhịp sống hồn nhiên và trái tim phóng khoáng." },
            { icon: "💃", name: "Lan vũ nữ", desc: "Cộng hưởng điệu vũ tự do, không chịu bất kỳ sự câu thúc nào của số phận." }
        ],
        clash: [
            { icon: "🔒", name: "Trói buộc độc đoán", desc: "Tâm hồn bạn là của gió trời; mọi nỗ lực chiếm hữu độc quyền chỉ làm bạn bay đi xa hơn." },
            { icon: "📜", name: "Cổ hủ giáo điều", desc: "Thích khám phá những chân trời mới, ngột ngạt trước những luật lệ vô căn cứ." }
        ],
        checklist: {
            friend: "Người bạn đồng hành trong những chuyến đi phượt ngẫu hứng, luôn mang lại góc nhìn mới mẻ về cuộc đời.",
            love: "Yêu tự do và tôn trọng; sẵn sàng trao trọn niềm tin cho người biết nâng niu đôi cánh ước mơ của bạn.",
            pressure: "Hít một hơi thật sâu, thổi bay những vướng bận như cánh hoa theo gió và sẵn sàng cho khởi đầu mới."
        }
    },
    {
        id: "wax_flower",
        flowerName: "Wax Flower",
        vietnameseName: "Hoa Thanh Liễu",
        title: "Thanh Liễu Bền Bỉ & Quý Phái",
        quote: "Cánh hoa phủ sáp dẻo dai qua sương nắng, tượng trưng cho tình cảm kiên nhẫn và sự giàu sang thịnh vượng.",
        emoji: "✨",
        traits: ["Bền bỉ", "Kiên nhẫn", "Thanh quý"],
        petalColor: "#FB7185",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌷", name: "Tulip", desc: "Đồng điệu về sự trang nhã hiện đại và phong thái sống độc lập tự chủ." },
            { icon: "💜", name: "Cúc thạch thảo", desc: "Cùng trân trọng sự gắn kết dài lâu và những giá trị tình cảm bền chặt." }
        ],
        clash: [
            { icon: "💨", name: "Hời hợt cả thèm chóng chán", desc: "Bạn coi trọng độ bền của mối quan hệ, rất dị ứng với người đổi ý xoành xoạch." },
            { icon: "🤥", name: "Thất hứa vô cớ", desc: "Sự kiên nhẫn của bạn có giới hạn với những ai coi thường thời gian và uy tín." }
        ],
        checklist: {
            friend: "Người bạn bền bỉ như kim cương; qua bao năm tháng vật đổi sao dời vẫn luôn ở đó ủng hộ bạn.",
            love: "Kiên nhẫn thấu hiểu, cùng nhau vượt qua giai đoạn khó khăn để đi đến bến bờ viên mãn.",
            pressure: "Bền bỉ chịu đựng và thích nghi dẻo dai; không bỏ cuộc cho đến khi đạt được mục tiêu đã đề ra."
        }
    },
    {
        id: "iris",
        flowerName: "Iris",
        vietnameseName: "Hoa Diên Vĩ",
        title: "Diên Vĩ Trí Tuệ & Dũng Cảm",
        quote: "Sắc tím kiêu hãnh của nữ thần cầu vồng, mang theo thông điệp về niềm tin, lòng dũng cảm và trí tuệ sáng ngời.",
        emoji: "🌈",
        traits: ["Trí tuệ", "Dũng cảm", "Niềm tin"],
        petalColor: "#6366F1",
        bgColor: "#EEF2FF",
        match: [
            { icon: "🪴", name: "Lan hồ điệp", desc: "Tương xứng về trí tuệ sắc bén và sự đánh giá sâu sắc về cuộc đời." },
            { icon: "⚜️", name: "Bách hợp", desc: "Cùng mang khí chất hoàng gia cao quý và sự trung thực thẳng thắn." }
        ],
        clash: [
            { icon: "🙈", name: "Cố chấp hẹp hòi", desc: "Bạn tôn trọng sự thật và logic, khó tranh luận với người mù quáng không chịu mở mang." },
            { icon: "🗣️", name: "Đặt điều bịa đặt", desc: "Ghét cay ghét đắng sự thêu dệt sai sự thật, luôn đứng lên bảo vệ công lý." }
        ],
        checklist: {
            friend: "Người bảo vệ lẽ phải; bạn sẵn sàng lên tiếng bảo vệ bạn bè trước những bất công vô lý.",
            love: "Tình yêu gắn liền với sự ngưỡng mộ và tin cậy; tìm kiếm một người bạn đời có thể đối thoại trí tuệ.",
            pressure: "Vận dụng tư duy sắc bén để tìm ra nguyên căn vấn đề và dũng cảm đối mặt giải quyết."
        }
    },
    {
        id: "dahlia",
        flowerName: "Dahlia",
        vietnameseName: "Hoa Thược Dược",
        title: "Thược Dược Kiêu Hãnh & Đa Tài",
        quote: "Từng lớp cánh hoa bung nở rực rỡ sắc màu, tượng trưng cho sự tự trọng, tài năng và nội lực bứt phá.",
        emoji: "🌺",
        traits: ["Đa tài", "Kiêu hãnh", "Bứt phá"],
        petalColor: "#E11D48",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌺", name: "Mẫu đơn", desc: "Cặp đôi vương giả cùng tỏa sáng lộng lẫy và giàu sức ảnh hưởng." },
            { icon: "🌹", name: "Hoa hồng", desc: "Đồng điệu về sự kiêu hãnh và khả năng tự làm chủ vận mệnh của mình." }
        ],
        clash: [
            { icon: "🐍", name: "Đố kỵ ngấm ngầm", desc: "Bạn tỏa sáng tự nhiên nên rất cảnh giác với những kẻ thích dìm hàng sau lưng." },
            { icon: "🌧️", name: "Bàn lùi tiêu cực", desc: "Bạn thích hành động bứt phá, không hợp với người luôn nhìn thấy rủi ro rồi chùn bước." }
        ],
        checklist: {
            friend: "Người luôn cổ vũ bạn bè tự tin thể hiện tài năng, không bao giờ ngần ngại nâng đỡ người khác.",
            love: "Nồng nhiệt, cuốn hút và kiêu hãnh; một khi đã yêu là biến mối quan hệ thành một tác phẩm nghệ thuật.",
            pressure: "Biến áp lực thành động lực bứt phá; càng bị thử thách bạn càng bung nở rực rỡ hơn bao giờ hết."
        }
    },
    {
        id: "wisteria",
        flowerName: "Wisteria",
        vietnameseName: "Hoa Tử Đằng",
        title: "Tử Đằng Thâm Tình & Gắn Kết",
        quote: "Từng chùm hoa tím biếc rủ bóng thướt tha, biểu tượng của sự kiên nhẫn, tình yêu bền chặt và lòng thủy chung.",
        emoji: "💜",
        traits: ["Thâm tình", "Kiên nhẫn", "Gắn kết"],
        petalColor: "#A855F7",
        bgColor: "#FAF5FF",
        match: [
            { icon: "💙", name: "Hoa lưu ly", desc: "Cùng khắc sâu những lời thề nguyền và tình cảm sâu nặng không đổi dời." },
            { icon: "🌿", name: "Cẩm tú cầu", desc: "Sự đồng điệu về lòng gắn kết tha thiết và mong muốn cùng nhau đi qua năm tháng." }
        ],
        clash: [
            { icon: "🧊", name: "Lạnh lùng vô cảm", desc: "Trái tim giàu ân tình của bạn không chịu nổi sự hờ hững, quay lưng không một lời giải thích." },
            { icon: "🏃", name: "Trốn tránh trách nhiệm", desc: "Bạn coi trọng sự cam kết, thất vọng trước người dễ dàng buông tay khi gặp sóng gió." }
        ],
        checklist: {
            friend: "Mối gắn kết keo sơn; người bạn luôn gìn giữ sợi dây liên lạc dù khoảng cách địa lý xa xôi.",
            love: "Kiên nhẫn chờ đợi, bền bỉ cùng nhau vun đắp tình yêu qua mọi mùa mưa nắng cuộc đời.",
            pressure: "Dành thời gian chăm sóc khu vườn tâm hồn, tin rằng thời gian sẽ chữa lành và trả lời tất cả."
        }
    },
    {
        id: "aster",
        flowerName: "Aster",
        vietnameseName: "Cúc Thạch Thảo",
        title: "Thạch Thảo Dịu Dàng & Hoài Niệm",
        quote: "Sắc tím biếc e ấp giữa trời thu trong trẻo, mang theo những rung cảm ngọt ngào và lòng thủy chung son sắt.",
        emoji: "💜",
        traits: ["Dịu dàng", "Thủy chung", "Hoài niệm"],
        petalColor: "#C084FC",
        bgColor: "#FAF5FF",
        match: [
            { icon: "🌼", name: "Cúc họa mi", desc: "Cùng thuộc về mùa thu đông êm đềm, mang lại cảm giác bình dị thân thương." },
            { icon: "💙", name: "Hoa lưu ly", desc: "Đồng điệu về sự lưu luyến hoài niệm và trân trọng tình cảm trong sáng thuở ban đầu." }
        ],
        clash: [
            { icon: "💨", name: "Thay lòng đổi dạ", desc: "Bạn yêu sự bền lâu, ghét thói bồng bột xem nhẹ tình cảm chân thật." },
            { icon: "⚡", name: "Vội vã ồn ào", desc: "Cần nhịp sống trầm lắng, dễ mỏi mệt trước những xô bồ gấp gáp." }
        ],
        checklist: {
            friend: "Người bạn lắng nghe dịu dàng nhất; luôn mang lại cho bạn bè sự ấm áp như chiếc khăn len mùa lạnh.",
            love: "E ấp, chung thủy và sâu lắng; yêu bằng những cử chỉ quan tâm nhỏ nhẹ nhưng thấm sâu vào tim.",
            pressure: "Lắng nghe một bản tình ca cổ điển, thong thả ngắm hoàng hôn buông để tìm lại sự bình yên."
        }
    },
    {
        id: "narcissus",
        flowerName: "Narcissus",
        vietnameseName: "Hoa Thủy Tiên",
        title: "Thủy Tiên Tự Tin & Khởi Sắc",
        quote: "Nở rộ thanh tao bên thềm xuân mới, biết yêu thương trân quý chính mình để tỏa hương rực rỡ nhất.",
        emoji: "💛",
        traits: ["Tự tin", "Thanh tao", "May mắn"],
        petalColor: "#FBBF24",
        bgColor: "#FFFBEB",
        match: [
            { icon: "🌷", name: "Tulip", desc: "Cùng toát lên vẻ đẹp kiêu hãnh, biết chăm chút cho giá trị bản thân." },
            { icon: "🕊️", name: "Ngọc lan", desc: "Sự kết hợp giữa nét thanh quý đoan trang và hương sắc báo hiệu may mắn đầu mùa." }
        ],
        clash: [
            { icon: "😞", name: "Tự ti yếm thế", desc: "Bạn yêu cuộc sống và tự hào về bản thân, không hợp với những ai suốt ngày than thân trách phận." },
            { icon: "🧹", name: "Cẩu thả luộm thuộm", desc: "Chuộng sự gọn gàng, tinh tế từ ngoại hình đến phong thái cư xử." }
        ],
        checklist: {
            friend: "Người truyền cảm hứng biết yêu bản thân; luôn khuyên bạn bè hãy tự tin ngẩng cao đầu làm chủ cuộc đời.",
            love: "Độc lập, rạng rỡ và tự chủ; tình yêu là hai tâm hồn trọn vẹn cùng đồng hành thăng hoa.",
            pressure: "Chăm chút lại bản thân, dành một ngày yêu chiều cơ thể và tâm trí để lấy lại phong độ đỉnh cao."
        }
    },
    {
        id: "sim_flower",
        flowerName: "Rose Myrtle",
        vietnameseName: "Hoa Sim Rừng",
        title: "Sim Rừng Nguyên Sơ & Thủy Chung",
        quote: "Sắc tím miền sơn cước mộc mạc hoang dại, mang theo tình cảm trong veo, e ấp mà son sắt một lòng.",
        emoji: "💜",
        traits: ["Nguyên sơ", "Mộc mạc", "Thủy chung"],
        petalColor: "#9333EA",
        bgColor: "#FAF5FF",
        match: [
            { icon: "🌼", name: "Cúc họa mi", desc: "Cùng mang vẻ đẹp hoang dại tự nhiên, không cần bàn tay uốn nắn cầu kỳ." },
            { icon: "🌼", name: "Hoa sứ", desc: "Đồng điệu về sự mộc mạc, bình thản và tình nghĩa chân quê mặn mà." }
        ],
        clash: [
            { icon: "🎭", name: "Điêu ngoa toan tính", desc: "Bạn sống bằng sự chân chất của núi rừng, dị ứng với lối cư xử xảo trá nơi phố thị." },
            { icon: "💰", name: "Khinh thường sự giản dị", desc: "Tự hào về nguồn cội, không thể kết nối với người coi thường những điều bình dị." }
        ],
        checklist: {
            friend: "Mộc mạc, ruột để ngoài da; có gì nói nấy, là người bạn thật lòng và đáng tin cậy nhất.",
            love: "E ấp ban đầu nhưng cực kỳ bền chặt; tình yêu sâu sắc như dòng suối nguồn không bao giờ cạn.",
            pressure: "Tìm về với thiên nhiên hoang dã, leo một ngọn đồi hoặc thả hồn theo mây trời để thấy lòng nhẹ nhõm."
        }
    },
    {
        id: "bombax",
        flowerName: "Bombax / Red Silk Cotton",
        vietnameseName: "Hoa Mộc Miên (Hoa Gạo)",
        title: "Mộc Miên Ấm Áp & Che Chở",
        quote: "Sắc đỏ nồng nàn thắp sáng bầu trời tháng Ba quê hương, như ngọn lửa sưởi ấm và che chở cho đàn em nhỏ.",
        emoji: "🏮",
        traits: ["Che chở", "Nghĩa tình", "Ấm áp"],
        petalColor: "#DC2626",
        bgColor: "#FEF2F2",
        match: [
            { icon: "🌼", name: "Mai vàng", desc: "Cùng mang sắc màu rực rỡ và sức sống nồng nàn của đất mẹ quê hương." },
            { icon: "🏵️", name: "Cúc vạn thọ", desc: "Đồng điệu về tình làng nghĩa xóm, sự sum vầy và tấm lòng gắn bó keo sơn." }
        ],
        clash: [
            { icon: "🧊", name: "Vô ơn bạc nghĩa", desc: "Bạn luôn sống vì người khác, tổn thương nhất khi lòng bao dung bị phản bội." },
            { icon: "💨", name: "Quên cội quên nguồn", desc: "Coi trọng gốc rễ truyền thống, khó chấp nhận người chối bỏ cội nguồn." }
        ],
        checklist: {
            friend: "Người chị cả đáng kính của nhóm; luôn đứng mũi chịu sào và lo toan cho mọi người từng bữa ăn giấc ngủ.",
            love: "Chân thành, ấm áp và chở che; tình yêu là bến đỗ vững chãi bảo bọc người thương qua mọi sóng gió.",
            pressure: "Tự nhắc nhở về trách nhiệm và tình yêu thương, kiên cường đứng vững như cây gạo đầu làng."
        }
    },
    {
        id: "globe_amaranth",
        flowerName: "Globe Amaranth",
        vietnameseName: "Hoa Bách Nhật",
        title: "Bách Nhật Bền Sắc & Son Sắt",
        quote: "Trăm ngày sắc đỏ tím vẫn nguyên vẹn không phai, minh chứng cho tấm lòng thủy chung bền bỉ trước thời gian.",
        emoji: "🟣",
        traits: ["Son sắt", "Bền bỉ", "Mộc mạc"],
        petalColor: "#D946EF",
        bgColor: "#FDF4FF",
        match: [
            { icon: "🌸", name: "Salem", desc: "Bộ đôi hoa khô bất tử, minh chứng cho sự kiên định không phai tàn theo năm tháng." },
            { icon: "💜", name: "Cúc thạch thảo", desc: "Cùng trân trọng sự thủy chung và tình cảm dung dị, bền chặt." }
        ],
        clash: [
            { icon: "🌪️", name: "Nông nổi cả thèm chóng chán", desc: "Bạn kiên nhẫn tích lũy, khó hòa nhập với người thích ăn xổi ở thì." },
            { icon: "🎭", name: "Phù phiếm hư ảo", desc: "Thích giá trị lâu bền, không tin vào những lời hứa hão huyền nhất thời." }
        ],
        checklist: {
            friend: "Người bạn bền bỉ như kim loại quý; dù trải qua bao sóng gió vẫn luôn giữ trọn một lòng một dạ.",
            love: "Chậm rãi, chắc chắn và son sắt; tình yêu là sự đồng hành bền bỉ qua từng chặng đường đời.",
            pressure: "Lầm lũi kiên trì làm việc, dùng thời gian và kết quả thực tế để chứng minh năng lực của mình."
        }
    },
    {
        id: "tana_daisy",
        flowerName: "Tana Daisy",
        vietnameseName: "Cúc Tana",
        title: "Cúc Tana Nắng Mai & Hồn Nhiên",
        quote: "Những cánh hoa nhỏ như mặt trời tí hon nhảy múa, đánh thức nụ cười trong trẻo xua tan mọi ảm đạm.",
        emoji: "🌼",
        traits: ["Hồn nhiên", "Trong trẻo", "Tươi mới"],
        petalColor: "#FDE047",
        bgColor: "#FEFCE8",
        match: [
            { icon: "🌼", name: "Hoa đồng tiền", desc: "Bộ đôi lan tỏa năng lượng vui tươi và tiếng cười rộn rã khắp mọi nơi." },
            { icon: "🌻", name: "Hướng dương", desc: "Sự kết hợp giữa mặt trời rạng rỡ và những đốm nắng mai nhỏ nhắn ấm áp." }
        ],
        clash: [
            { icon: "🌧️", name: "Bi quan cằn nhằn", desc: "Năng lượng u ám và thái độ soi mói làm bạn thấy mất hết sinh khí yêu đời." },
            { icon: "🧐", name: "Quá nghiêm trọng hóa vấn đề", desc: "Bạn thích sự nhẹ nhàng đơn giản, mệt mỏi trước những tranh cãi đao to búa lớn." }
        ],
        checklist: {
            friend: "Gói kẹo ngọt của nhóm; chỉ cần ngồi cạnh bạn là thấy cuộc đời này sao mà đáng yêu đến thế.",
            love: "Hồn nhiên, ngọt ngào và đầy ắp những niềm vui nho nhỏ; yêu bạn là chuỗi ngày tràn ngập tiếng cười.",
            pressure: "Ra ngoài hít thở nắng sớm, uống một ly trà trái cây mát lạnh và mỉm cười xua tan âu lo."
        }
    },
    {
        id: "rangoon_creeper",
        flowerName: "Rangoon Creeper",
        vietnameseName: "Hoa Sử Quân Tử",
        title: "Sử Quân Tử Kiên Cường & Hiên Ngang",
        quote: "Vươn mình qua hàng rào bung nở sắc hoa đổi màu từ trắng sang hồng đỏ, bất chấp nghịch cảnh đất cằn.",
        emoji: "🌺",
        traits: ["Kiên cường", "Hiên ngang", "Biến chuyển"],
        petalColor: "#F43F5E",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌼", name: "Mai vàng", desc: "Cùng sở hữu khí phách quân tử, kiên cường vượt qua khó khăn để tỏa sắc rực rỡ." },
            { icon: "🪶", name: "Thiên điểu", desc: "Đồng điệu về khát vọng vươn lên và tinh thần độc lập mạnh mẽ." }
        ],
        clash: [
            { icon: "💨", name: "Hèn nhát trốn tránh", desc: "Bạn coi trọng lòng can đảm, không tôn trọng những kẻ đùn đẩy trách nhiệm." },
            { icon: "⛓️", name: "Giam cầm rào cản", desc: "Càng bị ngăn trở bạn càng vươn cao mạnh mẽ hơn bao giờ hết." }
        ],
        checklist: {
            friend: "Người bạn dám nói dám làm; luôn đứng ra bảo vệ tập thể và thúc đẩy mọi người cùng tiến lên.",
            love: "Mãnh liệt, thẳng thắn và giàu đức hy sinh; luôn sẵn sàng đương đầu với mọi bão dông vì người mình thương.",
            pressure: "Càng áp lực càng kích thích ý chí chiến đấu; biến chướng ngại vật thành nấc thang vươn tới thành công."
        }
    },
    {
        id: "hyacinth",
        flowerName: "Hyacinth",
        vietnameseName: "Hoa Dạ Lan Hương",
        title: "Dạ Lan Hương Thấu Cảm & Sâu Lắng",
        quote: "Hương đêm dịu ngọt vỗ về vết thương cũ, khát khao sự thấu hiểu chân thành từ một tâm hồn đồng điệu.",
        emoji: "🪻",
        traits: ["Thấu cảm", "Sâu lắng", "Chữa lành"],
        petalColor: "#38BDF8",
        bgColor: "#F0F9FF",
        match: [
            { icon: "🌿", name: "Cẩm tú cầu", desc: "Cùng mang trái tim đa cảm, biết lắng nghe và trân trọng cảm xúc của đối phương." },
            { icon: "💜", name: "Oải hương", desc: "Bộ đôi xoa dịu những tổn thương, mang lại giấc ngủ an lành và sự bình tâm." }
        ],
        clash: [
            { icon: "🧊", name: "Thờ ơ vô tâm", desc: "Trái tim nhạy cảm của bạn rất dễ tổn thương trước thái độ dửng dưng xem thường." },
            { icon: "🤡", name: "Chế giễu cảm xúc", desc: "Tuyệt đối không kết nối với những kẻ đem nỗi đau của người khác ra làm trò đùa." }
        ],
        checklist: {
            friend: "Người bạn thấu hiểu nhất trần đời; bạn không cần nói hết câu người ấy cũng đã hiểu bạn đang nghĩ gì.",
            love: "Yêu sâu sắc, đong đầy sự quan tâm và chở che; khát khao một mối gắn kết tâm hồn bền chặt.",
            pressure: "Nghe những giai điệu êm dịu, cho phép mình được khóc một trận đã đời rồi đứng dậy bước tiếp."
        }
    },
    {
        id: "tuberose",
        flowerName: "Tuberose",
        vietnameseName: "Hoa Huệ Ta",
        title: "Huệ Ta Tinh Khiết & Quý Phái",
        quote: "Hương thơm về đêm thanh tao sâu lắng, biểu tượng của sự thuần khiết, lòng tôn kính và nếp nhà thanh bạch.",
        emoji: "🤍",
        traits: ["Tinh khiết", "Quý phái", "Đoan trang"],
        petalColor: "#E0E7FF",
        bgColor: "#EEF2FF",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng đại diện cho sự thanh tịnh, nét đẹp tâm linh và sự đoan trang truyền thống." },
            { icon: "🕊️", name: "Ngọc lan", desc: "Hương thơm vương vấn đánh thức những giá trị thuần khiết, tôn nghiêm của gia đình." }
        ],
        clash: [
            { icon: "👺", name: "Thô lỗ suồng sã", desc: "Bạn giữ gìn cốt cách thanh bạch, cực kỳ dị ứng với những hành vi bất nhã thiếu chuẩn mực." },
            { icon: "⚡", name: "Nông nổi thị phi", desc: "Không thích sự huyên náo phù phiếm, luôn chọn lối sống tĩnh tại, thanh bần." }
        ],
        checklist: {
            friend: "Người bạn mẫu mực, luôn giữ gìn thể diện và uy tín cho bạn bè trong mọi tình huống xã hội.",
            love: "Tình cảm sâu sắc, thiêng liêng và son sắt; hướng tới một tình yêu gắn kết thủy chung cả cuộc đời.",
            pressure: "Tìm về với những giá trị tâm linh, thắp nén nhang thơm để lòng thanh thản và định hướng lại tương lai."
        }
    },
    {
        id: "geranium",
        flowerName: "Geranium",
        vietnameseName: "Hoa Phong Lữ",
        title: "Phong Lữ Ấm Cúng & An Ủi",
        quote: "Hương lá ấm nồng xua đi giá lạnh, mang lại cảm giác chở che, bình yên và sự hòa thuận sum vầy.",
        emoji: "🌺",
        traits: ["Ấm cúng", "An ủi", "Hòa nhã"],
        petalColor: "#F87171",
        bgColor: "#FEF2F2",
        match: [
            { icon: "🌺", name: "Cẩm chướng", desc: "Cùng mang lại cảm giác gia đình ấm áp, chu đáo và biết vun vén cho tổ ấm." },
            { icon: "🌼", name: "Cúc Tana", desc: "Sự kết hợp giữa hơi ấm chở che và nét hồn nhiên trong trẻo làm dịu mát lòng người." }
        ],
        clash: [
            { icon: "⚔️", name: "Chia rẽ bè phái", desc: "Bạn yêu chuộng hòa khí, cực kỳ ghét thói châm chọc gây xích mích nội bộ." },
            { icon: "🧊", name: "Lạnh lùng ích kỷ", desc: "Không thể sống chung với người chỉ biết bản thân mà không màng tới cảm xúc xung quanh." }
        ],
        checklist: {
            friend: "Người hòa giải tuyệt vời; luôn biết cách hàn gắn những rạn nứt và kéo mọi người xích lại gần nhau.",
            love: "Ấm áp, tận tụy và đáng tin cậy; tình yêu như tách trà gừng thơm lừng sưởi ấm mùa đông buốt giá.",
            pressure: "Tự tay dọn dẹp nhà cửa, cắm một bình hoa thơm và nấu một bữa ăn ngon để cân bằng lại tinh thần."
        }
    },
    {
        id: "melastoma",
        flowerName: "Malabar Melastome",
        vietnameseName: "Hoa Mua",
        title: "Hoa Mua Kiên Cường & Chân Chất",
        quote: "Nở rộ tím ngát nơi sườn đồi cằn cỗi, kiêu hãnh vươn lên mà không cần bất kỳ sự chăm bẵm cầu kỳ nào.",
        emoji: "💜",
        traits: ["Kiên cường", "Chân chất", "Mộc mạc"],
        petalColor: "#A21CAF",
        bgColor: "#FDF4FF",
        match: [
            { icon: "💜", name: "Sim rừng", desc: "Cặp đôi sơn dã cùng chia sẻ tình cảm mộc mạc và sức sống bền bỉ nơi núi đồi." },
            { icon: "💙", name: "Dừa cạn", desc: "Đồng điệu về khả năng thích nghi phi thường và ý chí kiên định vượt khó." }
        ],
        clash: [
            { icon: "🏰", name: "Ảo tưởng xa hoa", desc: "Bạn trân trọng sự bình dị tự nhiên, không chịu nổi thói đua đòi học làm sang." },
            { icon: "😒", name: "Kỳ thị thôn dã", desc: "Tự hào về sức sống kiên cường, bạn ngẩng cao đầu trước những ánh nhìn khinh khi." }
        ],
        checklist: {
            friend: "Người bạn chân chất nhất; không bao giờ màu mè khách sáo, có một bát cơm cũng sẵn lòng bẻ đôi chia sẻ.",
            love: "Chân thành, mộc mạc và sâu thẳm; tình yêu bình dị nhưng kiên cường trước mọi bão giông thời cuộc.",
            pressure: "Tự lực cánh sinh, tin vào đôi tay và sức mạnh của chính mình để từng bước san bằng gian khó."
        }
    },
    {
        id: "periwinkle",
        flowerName: "Periwinkle",
        vietnameseName: "Hoa Dừa Cạn",
        title: "Dừa Cạn Bền Bỉ & Sức Sống",
        quote: "Bền bỉ trổ hoa qua mọi mùa nắng bỏng mưa sa, minh chứng cho sức sống dẻo dai phi thường của phái đẹp.",
        emoji: "🌸",
        traits: ["Bền bỉ", "Dẻo dai", "Lạc quan"],
        petalColor: "#60A5FA",
        bgColor: "#EFF6FF",
        match: [
            { icon: "🏵️", name: "Cúc vạn thọ", desc: "Cùng sở hữu sức sống bền bỉ, thích nghi dễ dàng với mọi hoàn cảnh sống." },
            { icon: "💜", name: "Hoa mua", desc: "Bộ đôi dẻo dai kiên cường, luôn giữ trọn màu hoa tươi tắn giữa đất cằn." }
        ],
        clash: [
            { icon: "🥀", name: "Than vãn buông xuôi", desc: "Bạn luôn tìm cách vượt qua nghịch cảnh, dị ứng với những người chưa đánh đã hàng." },
            { icon: "🥱", name: "Ỷ lại thụ động", desc: "Tôn trọng tính tự lập, không chịu được thói quen trông chờ vào sự giúp đỡ của người khác." }
        ],
        checklist: {
            friend: "Người bạn bền bỉ tiếp sức; luôn ở bên cạnh động viên bạn bè 'cố lên một chút nữa thôi'.",
            love: "Bền chặt, thủy chung và giàu nghị lực; cùng người thương xây dựng tương lai từ hai bàn tay trắng.",
            pressure: "Thích nghi ngay lập tức với hoàn cảnh mới, tìm kiếm giải pháp thực tiễn và kiên trì từng bước một."
        }
    },
    {
        id: "spiraea",
        flowerName: "Spiraea",
        vietnameseName: "Hoa Tuyết Mai",
        title: "Tuyết Mai Thanh Mảnh & Tinh Khôi",
        quote: "Những dải hoa trắng li ti phủ tuyết mềm mại, mang vẻ đẹp kiêu sa tinh tế đánh thức mùa xuân rạng ngời.",
        emoji: "❄️",
        traits: ["Thanh mảnh", "Tinh khôi", "Quý phái"],
        petalColor: "#94A3B8",
        bgColor: "#F8FAFC",
        match: [
            { icon: "🌸", name: "Hoa anh đào", desc: "Cùng sở hữu nét đẹp bồng bềnh thanh thoát tựa mây trời đầu xuân." },
            { icon: "🔔", name: "Linh lan", desc: "Đồng điệu về sắc trắng tinh khôi và thần thái thanh nhã khó lẫn vào đâu được." }
        ],
        clash: [
            { icon: "🥊", name: "Cục cằn thô bạo", desc: "Nét duyên thanh mảnh của bạn cần được nâng niu, không thể gần người cư xử bỗ bã." },
            { icon: "📢", name: "Ồn ào khiếm nhã", desc: "Thích sự yên ả thanh lịch, bạn tránh xa những môi trường xô bồ náo loạn." }
        ],
        checklist: {
            friend: "Người bạn có gu thẩm mỹ tuyệt vời; luôn biết cách biến những điều giản dị trở nên thơ mộng và trang nhã.",
            love: "Tinh tế, e ấp và sâu lắng; tình yêu như cành tuyết mai nở bừng trong sương sớm mùa xuân.",
            pressure: "Uống một tách trà nóng, ngắm nhìn hoa cỏ và để tâm trí được thư thái trong sự tĩnh lặng."
        }
    },
    {
        id: "anthurium",
        flowerName: "Anthurium",
        vietnameseName: "Hoa Hồng Môn",
        title: "Hồng Môn Nhiệt Thành & Khí Chất",
        quote: "Cánh hoa hình trái tim đỏ thắm đón chào cuộc sống, biểu tượng của sự hiếu khách, nồng ấm và tràn đầy sinh khí.",
        emoji: "❤️",
        traits: ["Nhiệt thành", "Khí chất", "Chân thật"],
        petalColor: "#EF4444",
        bgColor: "#FEF2F2",
        match: [
            { icon: "🌻", name: "Hướng dương", desc: "Cùng lan tỏa nguồn năng lượng nồng hậu, ấm áp và sự nhiệt thành từ tận đáy lòng." },
            { icon: "🌼", name: "Hoa đồng tiền", desc: "Sự kết hợp tươi vui mang lại sinh khí thịnh vượng và tiếng cười cho mọi người." }
        ],
        clash: [
            { icon: "🧊", name: "Lãnh đạm thờ ơ", desc: "Trái tim nhiệt thành của bạn rất dễ bị dập tắt bởi thái độ lạnh lùng giả tạo." },
            { icon: "🎭", name: "Khách sáo xa cách", desc: "Bạn thích sự chân tình cởi mở, không chịu được những bức tường khoảng cách vô lý." }
        ],
        checklist: {
            friend: "Gia chủ hiếu khách nhất; nhà bạn luôn là tụ điểm ấm áp mà bạn bè muốn ghé thăm để được tiếp đón nồng hậu.",
            love: "Trái tim nồng cháy, yêu ghét rõ ràng; luôn trao đi tình cảm ấm áp và sự tin cậy tuyệt đối.",
            pressure: "Bộc lộ cảm xúc thẳng thắn, giải tỏa năng lượng qua thể thao hoặc những cuộc trò chuyện cởi mở."
        }
    },
    {
        id: "oncidium",
        flowerName: "Dancing Lady Orchid",
        vietnameseName: "Lan Vũ Nữ",
        title: "Vũ Nữ Phóng Khoáng & Tỏa Sáng",
        quote: "Như vũ công yêu kiều khiêu vũ trong gió, tự tin phô diễn tài năng và tinh thần tự do phóng khoáng.",
        emoji: "💃",
        traits: ["Tự do", "Tỏa sáng", "Lạc quan"],
        petalColor: "#EAB308",
        bgColor: "#FEFCE8",
        match: [
            { icon: "🌬️", name: "Bồ công anh", desc: "Cùng chia sẻ niềm khao khát tự do bay bổng và tinh thần không ràng buộc." },
            { icon: "🌺", name: "Phù dung", desc: "Sự đồng điệu giữa tâm hồn nghệ sĩ và khả năng biến hóa rực rỡ đầy cuốn hút." }
        ],
        clash: [
            { icon: "⛓️", name: "Định kiến khắt khe", desc: "Tâm hồn nghệ sĩ của bạn cần đất diễn tự do, ngột ngạt trước những chiếc lồng quy chụp." },
            { icon: "🥱", name: "Tẻ nhạt một màu", desc: "Thích sự biến chuyển sinh động, khó chịu với những gì quá nhàm chán lặp lại." }
        ],
        checklist: {
            friend: "Tâm điểm của mọi cuộc vui; ở đâu có bạn là ở đó có âm nhạc, sự sáng tạo và nguồn cảm hứng bất tận.",
            love: "Say đắm, lãng mạn và bay bổng; tình yêu là điệu van-xơ thăng hoa của hai tâm hồn tự do.",
            pressure: "Bật nhạc lớn, nhảy múa hoặc sáng tạo nghệ thuật để giải phóng hoàn toàn những cảm xúc tiêu cực."
        }
    },
    {
        id: "crape_myrtle",
        flowerName: "Queen's Crape Myrtle",
        vietnameseName: "Hoa Bằng Lăng",
        title: "Bằng Lăng Dịu Dàng & Thanh Xuân",
        quote: "Sắc tím thủy chung phủ bóng mát trưa hè, lưu giữ những ký ức tuổi học trò trong trẻo và mối tình đầu e ấp.",
        emoji: "💜",
        traits: ["Dịu dàng", "Thanh xuân", "Thủy chung"],
        petalColor: "#C084FC",
        bgColor: "#FAF5FF",
        match: [
            { icon: "💙", name: "Hoa lưu ly", desc: "Cùng trân quý những kỷ niệm đẹp thuở hoa niên và sự thủy chung son sắt." },
            { icon: "🌸", name: "Hoa đào", desc: "Sự hòa quyện giữa nét duyên dáng thanh xuân và những rung động đầu đời trong trẻo." }
        ],
        clash: [
            { icon: "💨", name: "Vội vã lãng quên", desc: "Bạn coi trọng ký ức đẹp, buồn lòng trước những ai dễ dàng rũ bỏ kỷ niệm cũ." },
            { icon: "🎭", name: "Giả dối đãi bôi", desc: "Thích sự mộc mạc chân phương của tuổi học trò, ghét cay ghét đắng thói lừa lọc." }
        ],
        checklist: {
            friend: "Người bạn cùng bàn thân thương; luôn nhắc nhở về những ước mơ thuở ban đầu khi cả hai còn tay trắng.",
            love: "E ấp, ngọt ngào và thủy chung; tình yêu trong sáng như trang lưu bút thơm mùi mực tím ngày chia tay mái trường.",
            pressure: "Tìm về một góc phố quen xưa, thong thả ngắm nhìn dòng người qua lại để lòng lắng dịu như mây trời."
        }
    }
];

// Gán toàn cục và các phương thức truy xuất cho các module khác
window.flowerProfiles = flowerProfiles;
window.currentFlowerIndex = 0;

window.getCurrentFlowerProfile = function() {
    if (!Array.isArray(window.flowerProfiles) || window.flowerProfiles.length === 0) {
        return flowerProfiles[0];
    }
    return window.flowerProfiles[window.currentFlowerIndex % window.flowerProfiles.length];
};

window.getNextFlowerProfile = function() {
    if (!Array.isArray(window.flowerProfiles) || window.flowerProfiles.length === 0) {
        return flowerProfiles[0];
    }
    window.currentFlowerIndex = (window.currentFlowerIndex + 1) % window.flowerProfiles.length;
    return window.getCurrentFlowerProfile();
};

window.getFlowerProfileById = function(flowerId) {
    if (!Array.isArray(window.flowerProfiles)) return null;
    return window.flowerProfiles.find(f => f.id === flowerId) || null;
};

window.setFlowerProfileById = function(flowerId) {
    if (!Array.isArray(window.flowerProfiles)) return null;
    const idx = window.flowerProfiles.findIndex(f => f.id === flowerId);
    if (idx >= 0) {
        window.currentFlowerIndex = idx;
        return window.flowerProfiles[idx];
    }
    return null;
};
