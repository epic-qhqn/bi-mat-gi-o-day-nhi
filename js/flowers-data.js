// ==========================================================================
// 5th Season Floral Studio: Heritage Flower Profiles Database (27 Flowers)
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
        title: "Hoa Đào Ngọt Ngào & Đằm Thắm",
        quote: "Nụ cười ngọt ngào như làn gió xuân, sưởi ấm những ngày chông chênh và kết nối muôn người.",
        emoji: "🌸",
        traits: ["Ngọt ngào", "Duyên dáng", "Gắn kết"],
        petalColor: "#F472B6",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌼", name: "Hoa mai", desc: "Cùng mang sắc xuân tươi mới và tinh thần khởi sắc rực rỡ." },
            { icon: "💐", name: "Cẩm chướng", desc: "Gắn kết bởi tình cảm gia đình ấm áp và sự chu đáo ân cần." }
        ],
        clash: [
            { icon: "❄️", name: "Lạnh lùng vô cảm", desc: "Sự thờ ơ hờ hững dễ làm tổn thương trái tim giàu tình cảm của bạn." },
            { icon: "⚡", name: "Gắt gỏng cộc cằn", desc: "Cần không gian mềm mại, lịch thiệp để nuôi dưỡng các mối quan hệ." }
        ],
        checklist: {
            friend: "Người luôn gắn kết cả nhóm; nhớ từng món ăn yêu thích và thói quen nhỏ của bạn bè.",
            love: "Chăm chút từng điều nhỏ xíu, thích những cử chỉ quan tâm ấm áp hơn là những lời hứa xa vời.",
            pressure: "Tự tạo cho mình những niềm vui nho nhỏ để lấy lại thăng bằng, tin rằng ngày mai trời lại sáng."
        }
    },
    {
        id: "jasmine",
        flowerName: "Jasmine",
        vietnameseName: "Hoa Lài",
        title: "Hoa Lài Mộc Mạc & Khiêm Nhường",
        quote: "Hương thơm thuần khiết thấm sâu, không cần phô trương mà vẫn đọng lại rất lâu trong lòng người.",
        emoji: "🤍",
        traits: ["Khiêm nhường", "Thuần khiết", "Lắng nghe"],
        petalColor: "#94A3B8",
        bgColor: "#F8FAFC",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng trân trọng tâm hồn trong sạch và tìm kiếm sự tĩnh tại." },
            { icon: "🌾", name: "Oải hương", desc: "Mang lại cảm giác thư thái, giải tỏa mọi căng thẳng sau ngày dài." }
        ],
        clash: [
            { icon: "📢", name: "Khoe khoang phô trương", desc: "Không thấy thoải mái trước những màn thể hiện quá đà, thiếu chiều sâu." },
            { icon: "🌪️", name: "Hỗn loạn ồn ào", desc: "Cần không gian tĩnh tại để sạc lại năng lượng cho tâm hồn." }
        ],
        checklist: {
            friend: "Hòm thư bí mật đáng tin cậy; bạn luôn lắng nghe trọn vẹn mà không bao giờ phán xét.",
            love: "Yêu kín đáo, tinh tế; để ý cảm xúc của đối phương từ những ánh mắt và nụ cười nhỏ nhất.",
            pressure: "Rút về không gian riêng tư, pha tách trà ấm và bình tâm sắp xếp lại suy nghĩ."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 2: Nữ Vương Quyến Rũ & Bản Lĩnh Hiện Đại
    // ----------------------------------------------------------------------
    {
        id: "rose",
        flowerName: "Rose",
        vietnameseName: "Hoa Hồng",
        title: "Hoa Hồng Kiêu Hãnh & Bản Lĩnh",
        quote: "Tự tin rực rỡ với sắc màu của riêng mình, mang theo gai nhọn chỉ để bảo vệ những điều trân quý.",
        emoji: "🌹",
        traits: ["Quyến rũ", "Bản lĩnh", "Rõ ràng"],
        petalColor: "#E11D48",
        bgColor: "#FFF1F2",
        match: [
            { icon: "💐", name: "Mẫu đơn", desc: "Cùng sở hữu thần thái tự tin, phóng khoáng và gu thẩm mỹ sắc sảo." },
            { icon: "🌷", name: "Tulip", desc: "Tôn trọng ranh giới cá nhân và thấu hiểu chiều sâu của nhau." }
        ],
        clash: [
            { icon: "🕳️", name: "Mập mờ dối trá", desc: "Tuyệt đối không dung thứ cho sự thiếu minh bạch và phản bội lòng tin." },
            { icon: "🌫️", name: "Hời hợt nước đôi", desc: "Cần sự rõ ràng và nhiệt huyết, không thể đồng hành cùng người vô định." }
        ],
        checklist: {
            friend: "Đồng minh kiên cường; ai bắt nạt bạn bè là bạn sẵn sàng đứng lên bảo vệ tới cùng.",
            love: "Yêu cháy bỏng, rõ ràng và trọn vẹn; đã thương là thương hết lòng nhưng giữ trọn tự tôn.",
            pressure: "Ngẩng cao đầu đối diện, coi thử thách là cơ hội để chứng minh năng lực vượt trội."
        }
    },
    {
        id: "peony",
        flowerName: "Peony",
        vietnameseName: "Hoa Mẫu Đơn",
        title: "Mẫu Đơn Hào Sảng & Đáng Tin",
        quote: "Hào sảng, ấm áp và luôn là chỗ dựa vững chãi cho những người mình yêu thương.",
        emoji: "💐",
        traits: ["Vương giả", "Hào sảng", "Vững chãi"],
        petalColor: "#FB7185",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌻", name: "Hướng dương", desc: "Cùng lan tỏa nguồn năng lượng ấm áp, quang minh chính đại." },
            { icon: "🌹", name: "Hoa hồng", desc: "Cùng trân trọng cái đẹp chỉn chu và khí chất độc lập." }
        ],
        clash: [
            { icon: "🎭", name: "Chi li tính toán", desc: "Khó chịu trước sự vụ lợi, so đo từng chút một trong quan hệ bạn bè." },
            { icon: "🕳️", name: "Thụ động bi quan", desc: "Thích chủ động giải quyết vấn đề hơn là ngồi than vãn bế tắc." }
        ],
        checklist: {
            friend: "Người chị cả/Bạn thân bảo kê; chuyện gì khó chỉ cần bạn xuất hiện là mọi người yên tâm hẳn.",
            love: "Chiều chuộng hết lòng, sẵn sàng dành tặng những điều tốt đẹp nhất cho người thương.",
            pressure: "Chủ động kiểm soát tình hình, tìm giải pháp thực tế và dứt khoát giải quyết triệt để."
        }
    },
    {
        id: "orchid",
        flowerName: "Orchid",
        vietnameseName: "Lan Hồ Điệp",
        title: "Lan Hồ Điệp Thông Tuệ & Tự Chủ",
        quote: "Sự thanh lịch toát lên từ chiều sâu hiểu biết và phong thái điềm tĩnh, tự chủ.",
        emoji: "🪻",
        traits: ["Quý phái", "Thông tuệ", "Chỉn chu"],
        petalColor: "#A855F7",
        bgColor: "#FAF5FF",
        match: [
            { icon: "⚜️", name: "Mộc lan", desc: "Cặp đôi khí chất xuất chúng, luôn tôn trọng trí tuệ và tài năng của nhau." },
            { icon: "🌷", name: "Tulip", desc: "Đồng điệu về sự kín đáo, tinh tế và tính độc lập cao." }
        ],
        clash: [
            { icon: "📢", name: "Bốc đồng xốc nổi", desc: "Khó làm việc chung với những người thiếu suy nghĩ chín chắn." },
            { icon: "🌪️", name: "Cẩu thả qua loa", desc: "Coi trọng chất lượng và sự chỉn chu trong từng chi tiết nhỏ." }
        ],
        checklist: {
            friend: "Nhà cố vấn sắc sảo; luôn đưa ra những lời khuyên khách quan, logic và thấu đáo.",
            love: "Coi trọng sự đồng điệu về tư duy và tâm hồn; tình yêu cần sự tôn trọng lẫn nhau.",
            pressure: "Giữ cái đầu lạnh, phân tích bản chất vấn đề và giải quyết từng bước một cách khoa học."
        }
    },
    {
        id: "tulip",
        flowerName: "Tulip",
        vietnameseName: "Hoa Tulip",
        title: "Tulip Thanh Lịch & Độc Lập",
        quote: "Vẻ đẹp hiện đại, tự nhiên và độc lập; biết rõ mình muốn gì và kiên định theo đuổi.",
        emoji: "🌷",
        traits: ["Thanh lịch", "Độc lập", "Có gu"],
        petalColor: "#EC4899",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌹", name: "Hoa hồng", desc: "Cùng trân trọng cái đẹp tinh tế và giá trị của sự tự lập." },
            { icon: "🌼", name: "Cúc họa mi", desc: "Bình yên và thoải mái khi chia sẻ những điều giản dị mỗi ngày." }
        ],
        clash: [
            { icon: "🌵", name: "Thô lỗ bạo miệng", desc: "Lời nói cộc cằn dễ làm tổn thương nét thanh lịch tự nhiên của bạn." },
            { icon: "⛓️", name: "Kiểm soát ngột ngạt", desc: "Cần không gian riêng để thở và tự do phát triển bản thân." }
        ],
        checklist: {
            friend: "Người bạn tâm lý có gu; ở cạnh bạn luôn thấy dễ chịu vì không bị phán xét.",
            love: "Thương bằng sự chu đáo tỉ mỉ, để ý từng chi tiết nhỏ và luôn tôn trọng tự do của đối phương.",
            pressure: "Dành cho mình một khoảng lặng ngắn để sắp xếp lại trật tự, sau đó hành động dứt khoát."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 3: Nắng Ấm Rạng Rỡ & Lan Tỏa Niềm Vui
    // ----------------------------------------------------------------------
    {
        id: "sunflower",
        flowerName: "Sunflower",
        vietnameseName: "Hướng Dương",
        title: "Hướng Dương Nắng Ấm & Tràn Năng Lượng",
        quote: "Luôn hướng về phía có ánh sáng, mang năng lượng ấm áp lan tỏa đến mọi người xung quanh.",
        emoji: "🌻",
        traits: ["Nhiệt huyết", "Chân thành", "Lạc quan"],
        petalColor: "#F59E0B",
        bgColor: "#FEF3C7",
        match: [
            { icon: "🌺", name: "Anh túc", desc: "Cặp đôi lan tỏa cảm hứng bất tận, kéo mood cả tập thể lên cao." },
            { icon: "🌻", name: "Đồng tiền", desc: "Tiếng cười rộn rã xua tan mọi mỏi mệt của ngày dài làm việc." }
        ],
        clash: [
            { icon: "🥀", name: "U sầu bị động", desc: "Không khí ủ rũ kéo dài làm tiêu hao nguồn năng lượng ấm áp của bạn." },
            { icon: "🌑", name: "Kín kẽ mập mờ", desc: "Thích sự thẳng thắn, không ưa lối nói bóng gió hay giấu giếm." }
        ],
        checklist: {
            friend: "Cục sạc năng lượng tích cực; chỉ cần bạn có mặt là không khí vui tươi hẳn lên.",
            love: "Yêu nồng nhiệt, thẳng thắn và tự hào công khai; không bao giờ để đối phương phải hoài nghi.",
            pressure: "Lạc quan tự nhủ 'chuyện gì rồi cũng có cách giải quyết', nhanh chóng lấy lại phong độ."
        }
    },
    {
        id: "gerbera",
        flowerName: "Gerbera",
        vietnameseName: "Hoa Đồng Tiền",
        title: "Đồng Tiền Hồn Nhiên & Hăng Say",
        quote: "Hồn nhiên đón nhận cuộc sống với nụ cười tươi rói, biến ngày bình thường thành ngày vui.",
        emoji: "🌻",
        traits: ["Hồn nhiên", "Vui tươi", "Hăng say"],
        petalColor: "#FB923C",
        bgColor: "#FFF7ED",
        match: [
            { icon: "🌻", name: "Hướng dương", desc: "Nhân đôi nguồn năng lượng tích cực và sự ấm áp tự nhiên." },
            { icon: "🌸", name: "Hoa anh đào", desc: "Đồng điệu về sự tươi vui và tình yêu trọn vẹn dành cho cuộc sống." }
        ],
        clash: [
            { icon: "🌧️", name: "Nghiêm trọng hóa vấn đề", desc: "Khó thở trước những người luôn phức tạp hóa những việc giản đơn." },
            { icon: "⛓️", name: "Ràng buộc gò bó", desc: "Cần không gian tự do để thoải mái bộc lộ sự ngẫu hứng." }
        ],
        checklist: {
            friend: "Cây hài của hội bạn; luôn có những câu pha trò duyên dáng khiến ai nấy đều bật cười.",
            love: "Mang lại cho người ấy sự vui vẻ, hồn nhiên và cảm giác thoải mái như thời áo trắng.",
            pressure: "Tìm niềm vui từ những món ăn ngon hay một bài hát yêu thích để nạp lại tinh thần."
        }
    },
    {
        id: "poppy",
        flowerName: "Poppy",
        vietnameseName: "Hoa Anh Túc",
        title: "Anh Túc Phóng Khoáng & Độc Bản",
        quote: "Tự do bay bổng với đam mê, kiêu hãnh vì mình là phiên bản độc bản không trộn lẫn.",
        emoji: "🌺",
        traits: ["Tự do", "Nồng nhiệt", "Trực giác"],
        petalColor: "#F87171",
        bgColor: "#FEF2F2",
        match: [
            { icon: "🌸", name: "Allium", desc: "Hai cá tính sáng tạo gặp nhau là lập tức nảy ra những ý tưởng bùng nổ." },
            { icon: "🌻", name: "Hướng dương", desc: "Tiếp lửa cho nhau, không bao giờ để cuộc sống rơi vào sự nhàm chán." }
        ],
        clash: [
            { icon: "🌾", name: "Khuôn phép cứng nhắc", desc: "Khó gò mình theo những quy định mang tính áp đặt, thiếu tính logic." },
            { icon: "🌿", name: "Dè dặt thụ động", desc: "Cảm xúc mãnh liệt của bạn đôi khi khiến người quá khép kín thấy e dè." }
        ],
        checklist: {
            friend: "Người luôn rủ bạn bè thử những trải nghiệm mới mẻ, vượt ra khỏi vùng an toàn quen thuộc.",
            love: "Yêu hết mình, mãnh liệt và đầy xúc cảm; trân trọng sự chân thật và ghét thói giả tạo.",
            pressure: "Biến áp lực thành động lực bứt phá, càng khó khăn càng kích hoạt sự sáng tạo độc đáo."
        }
    },
    {
        id: "allium",
        flowerName: "Allium",
        vietnameseName: "Hành Kiểng",
        title: "Allium Sáng Tạo & Dí Dỏm",
        quote: "Trí óc tràn ngập ý tưởng bất ngờ, luôn nhìn cuộc sống qua lăng kính dí dỏm và độc đáo.",
        emoji: "🌸",
        traits: ["Sáng tạo", "Dí dỏm", "Phá cách"],
        petalColor: "#F5CE56",
        bgColor: "#EEF2FF",
        match: [
            { icon: "🌺", name: "Anh túc", desc: "Rủ nhau làm những dự án mới lạ, hào hứng sáng tạo không biết mệt." },
            { icon: "🌻", name: "Đồng tiền", desc: "Sự kết hợp hoàn hảo giữa tính hài hước và tinh thần vui vẻ." }
        ],
        clash: [
            { icon: "📋", name: "Lối mòn bảo thủ", desc: "Ý tưởng mới lạ gặp tư duy giáo điều dễ dẫn đến những cuộc tranh luận nảy lửa." },
            { icon: "🧊", name: "Cứng nhắc thiếu hài hước", desc: "Khó làm việc lâu dài với những ai quá nghiêm trọng hóa mọi chuyện." }
        ],
        checklist: {
            friend: "Bộ não hài hước của nhóm; chỉ một câu ném ra 'Hay là tụi mình...' cũng khuấy động cả hội.",
            love: "Biết cách làm cho từng ngày bên nhau đều thú vị, không bao giờ để tình yêu bị cũ kỹ.",
            pressure: "Nghĩ ra những cách tiếp cận thông minh, phá vỡ lối mòn để tháo gỡ vấn đề hiệu quả."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 4: Dịu Dàng Trong Trẻo & Chữa Lành Tâm Hồn
    // ----------------------------------------------------------------------
    {
        id: "daisy",
        flowerName: "Daisy",
        vietnameseName: "Cúc Họa Mi",
        title: "Cúc Họa Mi Trong Veo & Chữa Lành",
        quote: "Nét mộc mạc dịu êm giữa dòng đời vội vã, chạm đến trái tim bằng sự chân thành thuần khiết.",
        emoji: "🌼",
        traits: ["Trong trẻo", "Chân thành", "Chữa lành"],
        petalColor: "#FBBF24",
        bgColor: "#F0FDF4",
        match: [
            { icon: "🌷", name: "Tulip", desc: "Thấu hiểu nhau một cách tự nhiên mà không cần phải dùng quá nhiều lời." },
            { icon: "❄️", name: "Hoa baby", desc: "Bộ đôi trong trẻo mang lại cảm giác bình yên và thư thái tuyệt đối." }
        ],
        clash: [
            { icon: "⚡", name: "Gắt gỏng thô ráp", desc: "Sự thô lỗ làm tổn thương nét nhạy cảm và lòng chân thành của bạn." },
            { icon: "🌪️", name: "Bon chen chụp giật", desc: "Thích sự thảnh thơi, không hợp với nhịp sống tranh giành xô bồ." }
        ],
        checklist: {
            friend: "Người bạn chữa lành; nói chuyện với bạn thấy nhẹ nhõm như vừa bước ra một thảm cỏ xanh.",
            love: "Thương bằng những cử chỉ bình dị: một cốc trà đúng vị, một lời hỏi han đúng lúc.",
            pressure: "Thả lỏng cơ thể, cho phép mình nghỉ một nhịp rồi mỉm cười đón nhận ngày mới."
        }
    },
    {
        id: "baby_breath",
        flowerName: "Baby's Breath",
        vietnameseName: "Hoa Baby",
        title: "Hoa Baby Dịu Êm & Thuần Khiết",
        quote: "Nhẹ nhàng như làn gió sớm, lặng lẽ điểm tô và nâng niu vẻ đẹp của những người xung quanh.",
        emoji: "❄️",
        traits: ["Dịu êm", "Chu đáo", "Thuần khiết"],
        petalColor: "#93C5FD",
        bgColor: "#F0F9FF",
        match: [
            { icon: "🌹", name: "Hoa hồng", desc: "Sự nâng đỡ thầm lặng tôn vinh trọn vẹn nét đẹp rực rỡ của đối phương." },
            { icon: "🌼", name: "Cúc họa mi", desc: "Gắn kết bởi tâm hồn mộc mạc, biết trân trọng những điều giản đơn." }
        ],
        clash: [
            { icon: "🌪️", name: "Áp đặt chuyên quyền", desc: "Dễ bị lấn át và kiệt sức trước những cá tính quá kiểm soát." },
            { icon: "🎭", name: "Toan tính vụ lợi", desc: "Tâm hồn trong sáng khó thích nghi với môi trường nhiều mưu tính." }
        ],
        checklist: {
            friend: "Người bạn tinh tế; luôn để ý nhu cầu của người khác và hỗ trợ thầm lặng từ phía sau.",
            love: "Yêu bằng sự dịu dàng, nhẫn nại và mong muốn người mình yêu luôn được bình an.",
            pressure: "Tìm về góc nhỏ quen thuộc, để âm nhạc và thiên nhiên vỗ về những mỏi mệt."
        }
    },
    {
        id: "lavender",
        flowerName: "Lavender",
        vietnameseName: "Hoa Oải Hương",
        title: "Oải Hương Tĩnh Tại & Thư Thái",
        quote: "Hương thơm xoa dịu những âu lo, mang đến sự an yên và chiều sâu tĩnh lặng cho tâm hồn.",
        emoji: "🌾",
        traits: ["Tĩnh tại", "Thư thái", "Thủy chung"],
        petalColor: "#8B5CF6",
        bgColor: "#F5F3FF",
        match: [
            { icon: "🤍", name: "Hoa lài", desc: "Cùng tạo nên không gian thanh bình, xua tan mọi áp lực bộn bề." },
            { icon: "🪻", name: "Lưu ly", desc: "Đồng điệu về sự chung thủy và lòng trân trọng những ký ức đẹp." }
        ],
        clash: [
            { icon: "📢", name: "Ồn ào kịch tính", desc: "Không thích những mâu thuẫn hay tranh cãi kịch tính không cần thiết." },
            { icon: "⚡", name: "Thiếu kiên nhẫn", desc: "Khó đồng hành cùng những người nông nổi, thiếu chiều sâu suy nghĩ." }
        ],
        checklist: {
            friend: "Chuyên gia gỡ rối cảm xúc; bạn bè có chuyện buồn luôn tin tưởng tìm đến để giãi bày.",
            love: "Tình cảm sâu lắng, chung thủy và mong mỏi một mối quan hệ gắn kết bền vững.",
            pressure: "Dành thời gian chăm sóc bản thân, đi dạo một mình hoặc đọc sách để phục hồi năng lượng."
        }
    },
    {
        id: "hydrangea",
        flowerName: "Hydrangea",
        vietnameseName: "Cẩm Tú Cầu",
        title: "Cẩm Tú Cầu Thấu Cảm & Sâu Sắc",
        quote: "Từng cánh hoa nhỏ đan cài bền chặt, tượng trưng cho sự thấu cảm và trái tim đong đầy yêu thương.",
        emoji: "🌸",
        traits: ["Thấu cảm", "Sâu sắc", "Bao dung"],
        petalColor: "#60A5FA",
        bgColor: "#EFF6FF",
        match: [
            { icon: "💐", name: "Cẩm chướng", desc: "Cùng thấu hiểu giá trị của sự gắn kết gia đình và tình thân ấm áp." },
            { icon: "🌷", name: "Tulip", desc: "Hòa quyện sự sâu sắc cảm xúc với tư duy độc lập, thanh lịch." }
        ],
        clash: [
            { icon: "🧊", name: "Vô tâm hời hợt", desc: "Khó chịu trước những ai xem nhẹ cảm xúc và sự tổn thương của người khác." },
            { icon: "🔨", name: "Độc đoán bảo thủ", desc: "Sự thấu cảm bị dập tắt trước những thái độ áp đặt thiếu lắng nghe." }
        ],
        checklist: {
            friend: "Chất keo gắn kết cả nhóm; khéo léo hòa giải những hiểu lầm và kéo mọi người lại gần nhau.",
            love: "Trân trọng từng kỷ niệm bên nhau, yêu bằng sự thấu hiểu và sẻ chia sâu sắc.",
            pressure: "Tâm sự cùng người mình thực sự tin cậy để giải tỏa những nút thắt trong lòng."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 5: Khí Chất Thanh Cao & Kiên Định Vững Vàng
    // ----------------------------------------------------------------------
    {
        id: "lily",
        flowerName: "Lily",
        vietnameseName: "Hoa Bách Hợp",
        title: "Bách Hợp Đoan Trang & Sáng Suốt",
        quote: "Đoan trang, tinh khôi và luôn giữ trọn phẩm chất trong sáng giữa mọi biến thiên.",
        emoji: "⚜️",
        traits: ["Đoan trang", "Ngay thẳng", "Sáng suốt"],
        petalColor: "#FB923C",
        bgColor: "#FFF7ED",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng giữ gìn cốt cách thanh tao và nét đẹp đạo đức bền lâu." },
            { icon: "🪻", name: "Lan hồ điệp", desc: "Tương thích cao về gu thẩm mỹ và cách đối nhân xử thế chuẩn mực." }
        ],
        clash: [
            { icon: "🎭", name: "Đố kỵ hẹp hòi", desc: "Ghét sự ganh ghét, săm soi và những toan tính ngầm sau lưng." },
            { icon: "🌪️", name: "Hấp tấp thiếu lễ độ", desc: "Coi trọng sự tôn trọng chừng mực trong các mối quan hệ xã hội." }
        ],
        checklist: {
            friend: "Người bạn mực thước, uy tín; luôn giữ đúng lời hứa và là chỗ dựa tinh thần vững chắc.",
            love: "Son sắt, rõ ràng và trân quý giá trị gia đình; yêu là xác định cùng nhau đi đường dài.",
            pressure: "Kiên định với nguyên tắc đạo đức và giá trị sống của mình, không để ngoại cảnh làm lung lay."
        }
    },
    {
        id: "magnolia",
        flowerName: "Magnolia",
        vietnameseName: "Hoa Mộc Lan",
        title: "Mộc Lan Can Trường & Kiêu Hãnh",
        quote: "Bản lĩnh kiêu hãnh nở rộ đón gió trời, dám dấn thân và tự tin làm chủ cuộc đời mình.",
        emoji: "🌺",
        traits: ["Can trường", "Tự chủ", "Bản lĩnh"],
        petalColor: "#F43F5E",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🪻", name: "Lan hồ điệp", desc: "Cặp đôi khí chất xuất chúng, luôn tôn trọng trí tuệ và tài năng của nhau." },
            { icon: "🌼", name: "Hoa mai", desc: "Cùng chung ý chí sắt son vượt qua phong ba bão táp để đạt mục tiêu." }
        ],
        clash: [
            { icon: "⛓️", name: "Kìm hãm áp chế", desc: "Không bao giờ để người khác tước đoạt quyền tự quyết và tiếng nói của mình." },
            { icon: "🥀", name: "Né tránh trách nhiệm", desc: "Coi trọng lòng dũng cảm và tinh thần dám chịu trách nhiệm." }
        ],
        checklist: {
            friend: "Người tiên phong đáng nể; luôn cổ vũ bạn bè tự tin theo đuổi ước mơ và không sợ thất bại.",
            love: "Yêu thẳng thắn, công bằng và tôn trọng lẫn nhau; cùng nhau xây dựng sự nghiệp và tương lai.",
            pressure: "Dũng cảm đương đầu, tin tưởng vào năng lực của bản thân để vượt qua mọi trở ngại."
        }
    },
    {
        id: "camellia",
        flowerName: "Camellia",
        vietnameseName: "Hoa Trà",
        title: "Trà My Kiên Nhẫn & Bền Bỉ",
        quote: "Vẻ đẹp duyên dáng ẩn chứa lòng kiên nhẫn bền bỉ, son sắt vẹn nguyên trước thời gian.",
        emoji: "🌺",
        traits: ["Kiên nhẫn", "Duyên dáng", "Bền bỉ"],
        petalColor: "#E11D48",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌸", name: "Hoa đào", desc: "Cùng mang nét duyên Á Đông thanh lịch và vẻ đẹp dịu dàng." },
            { icon: "🌾", name: "Oải hương", desc: "Đồng điệu về sự điềm tĩnh, mực thước và chiều sâu nội tâm." }
        ],
        clash: [
            { icon: "⚡", name: "Nóng vội đốt giai đoạn", desc: "Coi trọng nguyên tắc 'chậm mà chắc', dị ứng với sự cẩu thả qua loa." },
            { icon: "🌪️", name: "Thất thường sớm nắng chiều mưa", desc: "Sự bốc đồng làm mất đi tính nhẫn nại và sự tin cậy lâu dài." }
        ],
        checklist: {
            friend: "Người bạn chí cốt; dù bao lâu không gặp, khi ngồi lại tình cảm vẫn vẹn nguyên như ngày đầu.",
            love: "Thương yêu sâu nặng, bền chặt; tình cảm càng qua thử thách càng thêm gắn bó.",
            pressure: "Bình tĩnh nhẫn nại, hiểu rằng mọi quả ngọt đều cần thời gian chín muồi."
        }
    },
    {
        id: "carnation",
        flowerName: "Carnation",
        vietnameseName: "Cẩm Chướng",
        title: "Cẩm Chướng Ấm Áp & Vị Tha",
        quote: "Trái tim ấm áp giàu lòng vị tha, luôn biết chăm chút và thắp lửa yêu thương cho mọi người.",
        emoji: "💐",
        traits: ["Ấm áp", "Vị tha", "Chu đáo"],
        petalColor: "#FB7185",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌸", name: "Cẩm tú cầu", desc: "Cùng hướng về sự êm ấm của mái nhà và niềm vui của những người thân yêu." },
            { icon: "🏵️", name: "Vạn thọ", desc: "Gắn kết bởi lòng hiếu nghĩa và sự trân trọng những giá trị cội nguồn." }
        ],
        clash: [
            { icon: "🧊", name: "Vô ơn phụ bạc", desc: "Dễ thất vọng trước những người xem thường sự hy sinh và tấm lòng của người khác." },
            { icon: "🌵", name: "Cay nghiệt phán xét", desc: "Sự khắt khe làm tổn thương trái tim luôn muốn trao đi tình thương." }
        ],
        checklist: {
            friend: "Người bạn chu đáo nhất trần đời; luôn lo cho bạn bè từ cái ăn cái mặc đến sức khỏe.",
            love: "Yêu bằng sự chăm sóc ân cần, luôn đặt sự thoải mái của người thương lên hàng đầu.",
            pressure: "Nghĩ về những người mình thương yêu để tiếp thêm sức mạnh vượt qua khó khăn."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 6: Tự Tại Thoát Tục & Hoài Niệm Bền Lâu
    // ----------------------------------------------------------------------
    {
        id: "plumeria",
        flowerName: "Plumeria",
        vietnameseName: "Hoa Sứ",
        title: "Hoa Sứ Tự Tại & Hiền Hòa",
        quote: "Hương thơm dịu dàng thanh khiết, mang lại cảm giác an yên và buông bỏ mọi muộn phiền.",
        emoji: "🌼",
        traits: ["Tự tại", "Hiền hòa", "Thanh thản"],
        petalColor: "#FCD34D",
        bgColor: "#FEFCE8",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cặp đôi mang lại cảm giác an lạc, buông bỏ những hơn thua danh lợi." },
            { icon: "🪷", name: "Hoa súng", desc: "Đồng điệu về tâm hồn tự do tự tại, hòa hợp cùng thiên nhiên." }
        ],
        clash: [
            { icon: "🌪️", name: "Tranh đua đố kỵ", desc: "Không muốn lãng phí năng lượng vào những cuộc ganh đua xô bồ ngoài kia." },
            { icon: "⚡", name: "Căng thẳng dồn dập", desc: "Cần nhịp sống thong dong để nuôi dưỡng sự tĩnh tại nội tâm." }
        ],
        checklist: {
            friend: "Ở cạnh bạn, mọi người đều thấy tâm trí nhẹ bẫng, bớt đi những so đo tính toán thường ngày.",
            love: "Yêu bình dị, tự nhiên; cùng nhau tận hưởng từng buổi chiều thảnh thơi mà không cần câu nệ.",
            pressure: "Học cách buông bỏ những điều nằm ngoài tầm kiểm soát, giữ cho tâm mình luôn thong dong."
        }
    },
    {
        id: "water_lily",
        flowerName: "Water Lily",
        vietnameseName: "Hoa Súng",
        title: "Hoa Súng Thong Dong & Khoáng Đạt",
        quote: "Vươn mình khoáng đạt giữa mặt nước trong lành, yêu tự do và luôn hòa mình cùng thiên nhiên.",
        emoji: "🪷",
        traits: ["Khoáng đạt", "Tự do", "Kiên cường"],
        petalColor: "#EC4899",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌼", name: "Hoa sứ", desc: "Cùng chung lối sống hòa nhã, gần gũi với thiên nhiên cỏ cây." },
            { icon: "🪷", name: "Hoa sen", desc: "Đồng điệu về vẻ đẹp thanh sạch vươn lên từ dòng nước mát lành." }
        ],
        clash: [
            { icon: "⛓️", name: "Gò bó nguyên tắc", desc: "Khó phát triển trong môi trường ngột ngạt, thiếu không gian sáng tạo." },
            { icon: "📢", name: "Thị phi đặt điều", desc: "Tránh xa những tranh cãi vô bổ không mang lại giá trị tích cực." }
        ],
        checklist: {
            friend: "Người bạn phóng khoáng; sẵn sàng cùng bạn xách balo lên và khám phá những vùng đất mới.",
            love: "Tôn trọng khoảng trời riêng của nhau; tình yêu nhẹ nhàng mà gắn bó keo sơn.",
            pressure: "Thả lỏng hòa mình vào thiên nhiên để tái tạo lại nguồn cảm hứng sống."
        }
    },
    {
        id: "forget_me_not",
        flowerName: "Forget-Me-Not",
        vietnameseName: "Hoa Lưu Ly",
        title: "Lưu Ly Sâu Lắng & Chân Tình",
        quote: "Những kỷ niệm đẹp đẽ luôn được nâng niu trọn vẹn nơi đáy tim, thủy chung và đong đầy ân nghĩa.",
        emoji: "🪻",
        traits: ["Chân tình", "Thủy chung", "Trọng ân nghĩa"],
        petalColor: "#38BDF8",
        bgColor: "#F0F9FF",
        match: [
            { icon: "🌾", name: "Oải hương", desc: "Đồng cảm sâu sắc về tình nghĩa dài lâu và sự chung thủy trước sau như một." },
            { icon: "🪻", name: "Hoa salem", desc: "Cặp đôi trân quý từng kỷ niệm, sống trọn vẹn nghĩa tình." }
        ],
        clash: [
            { icon: "🥀", name: "Vô tình lãng quên", desc: "Nỗi buồn lớn nhất là sự hời hợt và chóng quên từ người mình tin cậy." },
            { icon: "🌫️", name: "Giả tạo đãi bôi", desc: "Cần tình cảm chân thành từ đáy lòng, dị ứng với thói xảo biện." }
        ],
        checklist: {
            friend: "Người luôn nhớ ngày sinh nhật và giữ gìn từng món quà kỷ niệm nhỏ xíu của bạn bè.",
            love: "Tình cảm son sắt, sâu nặng; dù thời gian trôi qua vẫn trọn vẹn một lòng hướng về đối phương.",
            pressure: "Nhìn lại những cột mốc đã vượt qua để nhắc nhở bản thân rằng mình mạnh mẽ hơn mình nghĩ."
        }
    },
    {
        id: "statice",
        flowerName: "Statice",
        vietnameseName: "Hoa Salem",
        title: "Hoa Salem Bền Bỉ & Son Sắt",
        quote: "Sắc hoa bền bỉ không phai tàn theo năm tháng, biểu tượng của sự kiên định và lòng thủy chung.",
        emoji: "🪻",
        traits: ["Kiên định", "Bền bỉ", "Son sắt"],
        petalColor: "#C084FC",
        bgColor: "#FAF5FF",
        match: [
            { icon: "🪻", name: "Lưu ly", desc: "Cùng nhau gìn giữ những giá trị dài lâu và tình nghĩa không phai." },
            { icon: "🏵️", name: "Vạn thọ", desc: "Đồng điệu về sự trường tồn và tinh thần trách nhiệm cao." }
        ],
        clash: [
            { icon: "🌪️", name: "Chóng vánh hời hợt", desc: "Khó hòa hợp với những mối quan hệ chớp nhoáng, thiếu sự cam kết." },
            { icon: "🎭", name: "Đổi trắng thay đen", desc: "Mất lòng tin trước những ai dễ dàng thay lòng đổi dạ vì lợi ích." }
        ],
        checklist: {
            friend: "Tri kỷ cả đời; bạn là người mà dù 10 năm sau gặp lại vẫn tin cậy như ngày đầu.",
            love: "Một lòng một dạ; tình yêu trải qua giông bão thời gian càng thêm vững chãi.",
            pressure: "Kiên nhẫn thích nghi, giữ vững phẩm chất cốt lõi dù hoàn cảnh có đổi thay."
        }
    },
    {
        id: "marigold",
        flowerName: "Marigold",
        vietnameseName: "Cúc Vạn Thọ",
        title: "Vạn Thọ Vững Chãi & Trọng Nghĩa",
        quote: "Sắc vàng cam rạng ngời và ấm cúng, chở che cho mái ấm và gìn giữ những giá trị cội nguồn.",
        emoji: "🏵️",
        traits: ["Vững chãi", "Hiếu nghĩa", "Trách nhiệm"],
        petalColor: "#F59E0B",
        bgColor: "#FEF3C7",
        match: [
            { icon: "💐", name: "Cẩm chướng", desc: "Cùng chăm lo và vun vén cho sự êm ấm, vững vàng của gia đình." },
            { icon: "🌼", name: "Hoa mai", desc: "Mang lại sinh khí may mắn, sum vầy và niềm vui đoàn tụ." }
        ],
        clash: [
            { icon: "⚡", name: "Bất kính thất lễ", desc: "Coi trọng lễ nghĩa và tình cảm gắn kết giữa các thế hệ." },
            { icon: "🌪️", name: "Vô tâm bỏ bê", desc: "Khó chịu trước những ai quên đi cội nguồn và thiếu trách nhiệm với người thân." }
        ],
        checklist: {
            friend: "Chỗ dựa trách nhiệm và đáng tin; luôn chu toàn việc lớn việc nhỏ cho tập thể.",
            love: "Yêu với tinh thần xây đắp tương lai bền vững, ấm áp và chân thành.",
            pressure: "Lấy điểm tựa gia đình và trách nhiệm làm nguồn động lực vững vàng nhất."
        }
    },
    {
        id: "cherry_blossom",
        flowerName: "Cherry Blossom",
        vietnameseName: "Hoa Anh Đào",
        title: "Anh Đào Tinh Khôi & Sống Hết Mình",
        quote: "Nở rộ lộng lẫy và sống trọn vẹn từng khoảnh khắc thanh xuân tươi đẹp.",
        emoji: "🌸",
        traits: ["Nhiệt huyết", "Tinh tế", "Hiện sinh"],
        petalColor: "#FBCFE8",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌻", name: "Đồng tiền", desc: "Cùng lan tỏa niềm vui và tình yêu trọn vẹn dành cho cuộc sống rực rỡ." },
            { icon: "🌺", name: "Anh túc", desc: "Cùng sống hết mình với đam mê, không để lãng phí tháng ngày tuổi trẻ." }
        ],
        clash: [
            { icon: "🥀", name: "Chần chừ do dự", desc: "Thời gian trôi nhanh, không muốn lãng phí thanh xuân trong sự ngập ngừng." },
            { icon: "🌫️", name: "U ám ngột ngạt", desc: "Cần ánh sáng tươi tắn và tinh thần lạc quan để vươn mình tỏa sắc." }
        ],
        checklist: {
            friend: "Người luôn cổ vũ bạn bè sống nhiệt huyết, trân quý từng ngày được ở bên nhau.",
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
