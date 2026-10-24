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
        title: "Bạn là đóa Sen Lụa thanh tao.",
        quote: "Gần bùn mà chẳng hôi tanh mùi bùn, tỏa ngát dịu dàng giữa đời.",
        emoji: "🪷",
        traits: ["Thanh cao", "Dịu dàng", "Tâm hồn thuần khiết"],
        petalColor: "#D47A88",
        bgColor: "#FAF7F0",
        match: [
            { icon: "🌼", name: "Cúc họa mi", desc: "Cùng mang nét đẹp mộc mạc, tĩnh lặng và chữa lành." },
            { icon: "🌷", name: "Tulip", desc: "Đồng điệu sự trang nhã và chiều sâu tâm hồn." }
        ],
        clash: [
            { icon: "🌪️", name: "Bão cát", desc: "Ồn ào náo nhiệt không hợp với nét thanh tịnh." },
            { icon: "🌵", name: "Gai nhọn", desc: "Dễ làm tổn thương vẻ mềm mại, bao dung." }
        ],
        checklist: {
            friend: "Chốn bình yên ai cũng muốn tìm về sau những mệt mỏi.",
            love: "Thương bằng tình cảm sâu lắng, chung thủy và sắt son.",
            pressure: "Tĩnh lặng nhìn nhận, giữ trọn cốt cách và nét an nhiên."
        }
    },
    {
        id: "apricot_blossom",
        flowerName: "Apricot Blossom",
        vietnameseName: "Hoa Mai Vàng",
        title: "Bạn là cành Mai Vàng thanh khiết kiên cường.",
        quote: "Vượt qua gió lạnh mùa đông để nở rộ đón ánh nắng bình minh.",
        emoji: "🌼",
        traits: ["Kiên định", "Lạc quan", "Khí chất thanh cao"],
        petalColor: "#EAB308",
        bgColor: "#FEFCE8",
        match: [
            { icon: "🌸", name: "Hoa đào", desc: "Cặp đôi mang lại sinh khí và niềm vui đầu xuân." },
            { icon: "⚜️", name: "Bách hợp", desc: "Đồng điệu về sự đoan trang và lòng trung trinh." }
        ],
        clash: [
            { icon: "🥀", name: "U sầu", desc: "Năng lượng tiêu cực làm giảm đi sinh khí tươi tắn." },
            { icon: "🎭", name: "Giả tạo", desc: "Không bao giờ thỏa hiệp với sự thiếu chân thành." }
        ],
        checklist: {
            friend: "Người bạn mang lại may mắn, động lực và niềm tin vững chắc.",
            love: "Yêu chân tình, gắn bó bền chặt và luôn cùng nhau tiến bước.",
            pressure: "Càng trong gian khó càng rèn giũa bản lĩnh phi thường."
        }
    },
    {
        id: "peach_blossom",
        flowerName: "Peach Blossom",
        vietnameseName: "Hoa Đào",
        title: "Bạn là đóa Hoa Đào đằm thắm duyên dáng.",
        quote: "Nét duyên e ấp gọi xuân về, sưởi ấm những ngày đông giá.",
        emoji: "🌸",
        traits: ["Ngọt ngào", "Duyên dáng", "Tràn đầy sức sống"],
        petalColor: "#F472B6",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌼", name: "Hoa mai", desc: "Cùng mang sắc xuân rạng rỡ và niềm hy vọng." },
            { icon: "💐", name: "Cẩm chướng", desc: "Gắn kết bởi tình cảm gia đình ấm áp, đong đầy." }
        ],
        clash: [
            { icon: "❄️", name: "Băng giá", desc: "Sự lạnh lùng vô cảm làm thui chột tình cảm ngọt ngào." },
            { icon: "⚡", name: "Khắc nghiệt", desc: "Dễ làm tổn thương trái tim nhạy cảm, ấm áp." }
        ],
        checklist: {
            friend: "Gói sưởi ấm di động, mang lại cảm giác thân thương như người một nhà.",
            love: "Dịu dàng chăm chút, ngọt ngào và biết trân trọng từng kỷ niệm.",
            pressure: "Mỉm cười đón nhận và tin rằng mùa xuân luôn ở phía trước."
        }
    },
    {
        id: "jasmine",
        flowerName: "Jasmine",
        vietnameseName: "Hoa Lài",
        title: "Bạn là đóa Hoa Lài ngát hương kín đáo.",
        quote: "Hương thơm thuần khiết thấm sâu, mộc mạc mà lắng đọng.",
        emoji: "🤍",
        traits: ["Khiêm nhường", "Thuần khiết", "Thấm đượm lòng nhân ái"],
        petalColor: "#94A3B8",
        bgColor: "#F8FAFC",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng chung tâm hồn thanh sạch và yêu chuộng sự tĩnh lặng." },
            { icon: "🌾", name: "Oải hương", desc: "Mang lại cảm giác thư thái, chữa lành tuyệt đối." }
        ],
        clash: [
            { icon: "📢", name: "Phô trương", desc: "Không thích sự khoe khoang hay khoa trương quá đà." },
            { icon: "🌪️", name: "Hỗn loạn", desc: "Cần không gian bình lặng để dưỡng nuôi tâm hồn." }
        ],
        checklist: {
            friend: "Người bạn biết lắng nghe trong thầm lặng, không bao giờ để lộ bí mật.",
            love: "Yêu kín đáo, sâu bền và đặt hạnh phúc của người ấy lên trên.",
            pressure: "Tìm về chốn bình yên, pha một ấm trà và sắp xếp lại nội tâm."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 2: Nữ Vương Quyến Rũ & Bản Lĩnh Hiện Đại
    // ----------------------------------------------------------------------
    {
        id: "rose",
        flowerName: "Rose",
        vietnameseName: "Hoa Hồng",
        title: "Bạn là đóa Hoa Hồng kiêu sa bản lĩnh.",
        quote: "Nồng nàn quyến rũ, kiêu hãnh nở rộ với gai nhọn tự vệ.",
        emoji: "🌹",
        traits: ["Quyến rũ", "Bản lĩnh", "Son sắt nồng nàn"],
        petalColor: "#E11D48",
        bgColor: "#FFF1F2",
        match: [
            { icon: "💐", name: "Mẫu đơn", desc: "Cùng mang thần thái đỉnh cao và gu thẩm mỹ tinh tế." },
            { icon: "🌷", name: "Tulip", desc: "Tôn trọng ranh giới và thấu hiểu chiều sâu của nhau." }
        ],
        clash: [
            { icon: "🕳️", name: "Bội ước", desc: "Tuyệt đối không dung thứ cho sự phản bội và dối trá." },
            { icon: "🌫️", name: "Nhạt nhòa", desc: "Cần ngọn lửa đam mê, không chịu nổi sự hời hợt." }
        ],
        checklist: {
            friend: "Người bảo vệ đáng tin, sẵn sàng lên tiếng đòi công bằng cho bạn bè.",
            love: "Yêu hết mình, cháy bỏng và trọn vẹn từng khoảnh khắc.",
            pressure: "Bộc lộ bản lĩnh kiên cường, biến thử thách thành vương miện."
        }
    },
    {
        id: "peony",
        flowerName: "Peony",
        vietnameseName: "Hoa Mẫu Đơn",
        title: "Bạn là đóa Mẫu Đơn vương giả cao quý.",
        quote: "Hào phóng, ấm áp và luôn là chỗ dựa vững chãi cho muôn người.",
        emoji: "💐",
        traits: ["Vương giả", "Hào phóng", "Đáng tin cậy"],
        petalColor: "#FB7185",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌻", name: "Hướng dương", desc: "Cả hai cùng tỏa sáng và mang lại năng lượng hào sảng." },
            { icon: "🌹", name: "Hoa hồng", desc: "Cùng trân trọng cái đẹp tráng lệ và khí chất độc lập." }
        ],
        clash: [
            { icon: "🎭", name: "Tính toán", desc: "Không chịu được sự chi li, vụ lợi và ích kỷ." },
            { icon: "🕳️", name: "Bi quan", desc: "Năng lượng u ám dễ làm cạn kiệt nguồn hào phóng." }
        ],
        checklist: {
            friend: "Người chị cả/Bạn thân bảo kê, luôn rộng lượng che chở cho mọi người.",
            love: "Chiều chuộng hết lòng, trao tặng những gì tốt đẹp nhất cho người thương.",
            pressure: "Ngẩng cao đầu đối mặt và tìm giải pháp triệt để, dứt khoát."
        }
    },
    {
        id: "orchid",
        flowerName: "Orchid",
        vietnameseName: "Lan Hồ Điệp",
        title: "Bạn là đóa Lan Hồ Điệp quý phái trí tuệ.",
        quote: "Nét kiêu sa bền bỉ, tao nhã và toát lên chiều sâu học thức.",
        emoji: "🪻",
        traits: ["Quý phái", "Thông tuệ", "Tự chủ"],
        petalColor: "#A855F7",
        bgColor: "#FAF5FF",
        match: [
            { icon: "⚜️", name: "Mộc lan", desc: "Cùng mang khí chất đĩnh đạc và cốt cách cao sang." },
            { icon: "🌷", name: "Tulip", desc: "Đồng điệu về sự kín đáo, tinh tế và tính độc lập." }
        ],
        clash: [
            { icon: "📢", name: "Ồn ào", desc: "Sự xốc nổi thiếu suy nghĩ khiến bạn khó chịu." },
            { icon: "🌪️", name: "Hấp tấp", desc: "Bạn coi trọng quy trình chỉn chu và sự hoàn hảo." }
        ],
        checklist: {
            friend: "Cố vấn thông thái, luôn đưa ra lời khuyên khách quan và sắc sảo.",
            love: "Tình yêu xây dựng trên sự tôn trọng trí tuệ và sự đồng điệu tâm hồn.",
            pressure: "Giữ cái đầu lạnh, phân tích thấu đáo và giải quyết từng bước."
        }
    },
    {
        id: "tulip",
        flowerName: "Tulip",
        vietnameseName: "Hoa Tulip",
        title: "Bạn là đóa Tulip thanh lịch tinh tế.",
        quote: "Đẹp đẽ tự nhiên, kín đáo nhưng ẩn chứa một bản lĩnh kiên cường.",
        emoji: "🌷",
        traits: ["Tinh tế", "Độc lập", "Biết lắng nghe"],
        petalColor: "#EC4899",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌹", name: "Hoa hồng", desc: "Cùng trân trọng cái đẹp và những giá trị sâu sắc." },
            { icon: "🌼", name: "Cúc họa mi", desc: "Bình yên và ấm áp khi ngồi cạnh nhau." }
        ],
        clash: [
            { icon: "🌵", name: "Thô bạo", desc: "Lời nói thô ráp dễ làm tổn thương nét thanh lịch." },
            { icon: "🌺", name: "Anh túc", desc: "Đôi khi quá ồn ào so với khoảng lặng bạn cần." }
        ],
        checklist: {
            friend: "Chỗ dựa tinh thần dịu dàng, biết lắng nghe mà không phán xét.",
            love: "Thương bằng sự chu đáo tỉ mỉ, để ý từng chi tiết nhỏ nhất.",
            pressure: "Bình tĩnh tìm góc tĩnh lặng để sắp xếp lại mọi thứ trật tự."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 3: Nắng Ấm Rạng Rỡ & Lan Tỏa Niềm Vui
    // ----------------------------------------------------------------------
    {
        id: "sunflower",
        flowerName: "Sunflower",
        vietnameseName: "Hướng Dương",
        title: "Bạn là đóa Hướng Dương rực rỡ ấm áp.",
        quote: "Nơi nào có bạn, nơi đó bừng sáng ánh mặt trời của niềm vui.",
        emoji: "🌻",
        traits: ["Lạc quan", "Chân thành", "Tràn đầy năng lượng"],
        petalColor: "#F59E0B",
        bgColor: "#FEF3C7",
        match: [
            { icon: "🌺", name: "Anh túc", desc: "Cặp đôi lan tỏa nguồn cảm hứng bất tận cho xung quanh." },
            { icon: "🌻", name: "Đồng tiền", desc: "Tiếng cười rộn rã xua tan mọi mỏi mệt." }
        ],
        clash: [
            { icon: "🥀", name: "Tiêu cực", desc: "Năng lượng u uất làm hao tổn sinh khí ấm áp của bạn." },
            { icon: "🌑", name: "Kín kẽ", desc: "Bạn thích sự thẳng thắn, không ưa giấu giếm." }
        ],
        checklist: {
            friend: "Gói vitamin hạnh phúc di động, kéo mood cả nhóm lên tức thì.",
            love: "Yêu chân thành, tự hào công khai và hết lòng vun đắp.",
            pressure: "Tự động viên bản thân: 'Mọi chuyện rồi sẽ ổn thôi, trời lại sáng mà!'"
        }
    },
    {
        id: "gerbera",
        flowerName: "Gerbera",
        vietnameseName: "Hoa Đồng Tiền",
        title: "Bạn là đóa Hoa Đồng Tiền vui tươi may mắn.",
        quote: "Nụ cười rạng rỡ mang lại may mắn, tài lộc và niềm vui cho mọi người.",
        emoji: "🌻",
        traits: ["Vui vẻ", "Hồn nhiên", "Hăng say"],
        petalColor: "#FB923C",
        bgColor: "#FFF7ED",
        match: [
            { icon: "🌻", name: "Hướng dương", desc: "Nhân đôi nguồn năng lượng tích cực và sự ấm áp." },
            { icon: "🌸", name: "Hoa anh đào", desc: "Đồng điệu về sự tươi vui và tình yêu cuộc sống." }
        ],
        clash: [
            { icon: "🌧️", name: "Ảm đạm", desc: "Không gian buồn bã làm nghẽn nguồn vui sáng tạo." },
            { icon: "⛓️", name: "Ràng buộc", desc: "Cần không gian tự do để bay nhảy và cười đùa." }
        ],
        checklist: {
            friend: "Cây hài của hội bạn, chỉ cần xuất hiện là có tiếng cười rộn rã.",
            love: "Mang lại cho người ấy sự vui vẻ, hồn nhiên như trẻ thơ.",
            pressure: "Tìm niềm vui trong những điều giản đơn, nhanh chóng lấy lại cân bằng."
        }
    },
    {
        id: "poppy",
        flowerName: "Poppy",
        vietnameseName: "Hoa Anh Túc",
        title: "Bạn là một đóa Anh Túc phóng khoáng độc bản.",
        quote: "Tự do, nồng nhiệt và không bao giờ chịu hòa lẫn vào đám đông.",
        emoji: "🌺",
        traits: ["Tự do", "Nhiệt huyết", "Trực giác nhạy bén"],
        petalColor: "#F87171",
        bgColor: "#FEF2F2",
        match: [
            { icon: "🌸", name: "Allium", desc: "Hai cá tính độc lạ gặp nhau là quậy tưng bừng." },
            { icon: "🌻", name: "Hướng dương", desc: "Tiếp lửa cho nhau không bao giờ cạn nguồn năng lượng." }
        ],
        clash: [
            { icon: "🌾", name: "Trật tự", desc: "Ngẫu hứng khó hòa hợp với người quá nguyên tắc." },
            { icon: "🌿", name: "Dè dặt", desc: "Cảm xúc mãnh liệt dễ làm người e ấp bối rối." }
        ],
        checklist: {
            friend: "Luôn là người khuấy động mọi cuộc vui bất thình lình nhất.",
            love: "Yêu hết mình, cháy bỏng và cực kỳ bảo vệ người yêu.",
            pressure: "Càng áp lực càng bộc lộ sự kiên cường và liều lĩnh đáng nể."
        }
    },
    {
        id: "allium",
        flowerName: "Allium",
        vietnameseName: "Hành Kiểng",
        title: "Bạn là đóa Allium sáng tạo độc đáo.",
        quote: "Đầu đầy ý tưởng táo bạo, mở lời là mang lại nụ cười bất ngờ.",
        emoji: "🌸",
        traits: ["Sáng tạo", "Dí dỏm", "Có chính kiến"],
        petalColor: "#F5CE56",
        bgColor: "#EEF2FF",
        match: [
            { icon: "🌺", name: "Anh túc", desc: "Rủ nhau làm những trò thú vị, vui cả ngày." },
            { icon: "🌻", name: "Đồng tiền", desc: "Sự kết hợp hoàn hảo giữa hài hước và ngẫu hứng." }
        ],
        clash: [
            { icon: "📋", name: "Khuôn mẫu", desc: "Ý tưởng lạ gặp lối mòn giáo điều dễ sinh tranh cãi." },
            { icon: "🧊", name: "Đơ cứng", desc: "Khó làm việc với người thiếu óc hài hước." }
        ],
        checklist: {
            friend: "Người luôn ném ra câu: 'Hay là tụi mình thử...' làm cả hội hào hứng.",
            love: "Thương bằng sự thú vị, kể chuyện dí dỏm làm người kia cười hoài.",
            pressure: "Nghĩ ra cách tiếp cận mới lạ, đôi khi phá cách nhưng hiệu quả."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 4: Dịu Dàng Trong Trẻo & Chữa Lành Tâm Hồn
    // ----------------------------------------------------------------------
    {
        id: "daisy",
        flowerName: "Daisy",
        vietnameseName: "Cúc Họa Mi",
        title: "Bạn là đóa Cúc Họa Mi trong veo chữa lành.",
        quote: "Bình yên giữa phố thị, đơn sơ mộc mạc mà chạm đến đáy lòng.",
        emoji: "🌼",
        traits: ["Hồn nhiên", "Chữa lành", "Dễ mến"],
        petalColor: "#FBBF24",
        bgColor: "#F0FDF4",
        match: [
            { icon: "🌷", name: "Tulip", desc: "Thấu hiểu nhau mà không cần phải nói quá nhiều lời." },
            { icon: "❄️", name: "Hoa baby", desc: "Bộ đôi trong trẻo mang lại cảm giác bình yên tuyệt đối." }
        ],
        clash: [
            { icon: "⚡", name: "Thô lỗ", desc: "Sự gắt gỏng thô ráp dễ làm tổn thương nét ngây thơ." },
            { icon: "🌪️", name: "Vội vã", desc: "Cuộc sống bon chen xô bồ làm mất đi vẻ trong trẻo." }
        ],
        checklist: {
            friend: "Người bạn chữa lành, ở cạnh thấy nhẹ nhõm như vừa uống ngụm trà mát.",
            love: "Thương bằng những cử chỉ mộc mạc: tin nhắn 'ăn cơm chưa?', cái ôm ấm áp.",
            pressure: "Hít một hơi thật sâu, ngắm trời mây và mỉm cười bắt đầu lại."
        }
    },
    {
        id: "baby_breath",
        flowerName: "Baby's Breath",
        vietnameseName: "Hoa Baby",
        title: "Bạn là những đóa Baby tinh khôi thuần khiết.",
        quote: "Thầm lặng điểm tô cho cuộc đời, nhẹ nhàng như mây trời sớm mai.",
        emoji: "❄️",
        traits: ["Trong sáng", "Tận tụy", "Dễ thương"],
        petalColor: "#93C5FD",
        bgColor: "#F0F9FF",
        match: [
            { icon: "🌹", name: "Hoa hồng", desc: "Sự nâng đỡ thầm lặng làm nổi bật nét đẹp rực rỡ." },
            { icon: "🌼", name: "Cúc họa mi", desc: "Gắn kết bởi tâm hồn mộc mạc và chân thành." }
        ],
        clash: [
            { icon: "🌪️", name: "Cường bạo", desc: "Dễ bị lấn át bởi những cá tính quá áp đặt." },
            { icon: "🎭", name: "Xảo quyệt", desc: "Tâm hồn trong trẻo không thích nghi được với mưu toan." }
        ],
        checklist: {
            friend: "Người luôn có mặt trong im lặng, nâng đỡ bạn bè mà không đòi hỏi đền đáp.",
            love: "Yêu thuần khiết, bao dung và luôn muốn người mình yêu được hạnh phúc.",
            pressure: "Tìm chốn bình an của riêng mình, để âm nhạc và thiên nhiên vỗ về."
        }
    },
    {
        id: "lavender",
        flowerName: "Lavender",
        vietnameseName: "Hoa Oải Hương",
        title: "Bạn là đóa Oải Hương tím dịu dàng thư thái.",
        quote: "Hương thơm xoa dịu mọi âu lo, mang lại an yên cho tâm hồn.",
        emoji: "🌾",
        traits: ["Tĩnh tại", "Thủy chung", "Biết chữa lành"],
        petalColor: "#8B5CF6",
        bgColor: "#F5F3FF",
        match: [
            { icon: "🤍", name: "Hoa lài", desc: "Cùng tạo nên không gian thanh bình và xua tan mỏi mệt." },
            { icon: "🪻", name: "Lưu ly", desc: "Đồng điệu về sự chung tình và trân trọng ký ức." }
        ],
        clash: [
            { icon: "📢", name: "Huyên náo", desc: "Tiếng ồn và tranh cãi làm tổn thương tâm hồn tĩnh lặng." },
            { icon: "⚡", name: "Bốc đồng", desc: "Khó đồng hành cùng những người thiếu kiên nhẫn." }
        ],
        checklist: {
            friend: "Chuyên gia lắng nghe, giúp bạn bè trút bỏ mọi muộn phiền.",
            love: "Tình cảm sâu lắng, chung thủy và mong muốn một mái ấm bình yên.",
            pressure: "Đốt chút nến thơm, thả lỏng cơ thể và cho phép bản thân nghỉ ngơi."
        }
    },
    {
        id: "hydrangea",
        flowerName: "Hydrangea",
        vietnameseName: "Cẩm Tú Cầu",
        title: "Bạn là đóa Cẩm Tú Cầu thấu cảm bao dung.",
        quote: "Nhiều cánh hoa kết thành một khối, tượng trưng cho tình cảm đong đầy.",
        emoji: "🌸",
        traits: ["Thấu cảm", "Sâu sắc", "Bao dung"],
        petalColor: "#60A5FA",
        bgColor: "#EFF6FF",
        match: [
            { icon: "💐", name: "Cẩm chướng", desc: "Cùng thấu hiểu giá trị của sự hy sinh và gắn kết gia đình." },
            { icon: "🌷", name: "Tulip", desc: "Hòa quyện sự sâu sắc cảm xúc với trí tuệ thanh lịch." }
        ],
        clash: [
            { icon: "🧊", name: "Vô cảm", desc: "Không thể chịu được người xem nhẹ cảm xúc của người khác." },
            { icon: "🔨", name: "Độc đoán", desc: "Sự thấu cảm bị dập tắt trước tính cách gia trưởng." }
        ],
        checklist: {
            friend: "Chất keo gắn kết cả nhóm, luôn dung hòa mọi bất đồng giữa bạn bè.",
            love: "Yêu hết lòng, biết ơn và trân trọng từng phút giây bên nhau.",
            pressure: "Tâm sự cùng người mình tin cậy để giải tỏa những gợn sóng lòng."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 5: Khí Chất Thanh Cao & Kiên Định Vững Vàng
    // ----------------------------------------------------------------------
    {
        id: "lily",
        flowerName: "Lily",
        vietnameseName: "Hoa Bách Hợp",
        title: "Bạn là đóa Bách Hợp thanh tao đức hạnh.",
        quote: "Trang nhã vẹn tròn, đức hạnh sáng ngời như trăng rằm mùa thu.",
        emoji: "⚜️",
        traits: ["Trang nhã", "Thủy chung", "Khí chất thanh bạch"],
        petalColor: "#FB923C",
        bgColor: "#FFF7ED",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cùng giữ gìn phẩm hạnh và nét đẹp thanh cao bền lâu." },
            { icon: "🪻", name: "Lan hồ điệp", desc: "Tương thích cao về gu thẩm mỹ và cách đối nhân xử thế." }
        ],
        clash: [
            { icon: "🎭", name: "Hẹp hòi", desc: "Ghét sự ganh ghét, đố kỵ và tính toán chi li." },
            { icon: "🌪️", name: "Xốc nổi", desc: "Cần sự chừng mực và tôn trọng trong các mối quan hệ." }
        ],
        checklist: {
            friend: "Tấm gương về sự đoan trang, luôn mang lại cảm giác an tâm tuyệt đối.",
            love: "Son sắt một lòng, tôn trọng lời thề ước và sự vẹn tròn gia đình.",
            pressure: "Kiên định giữ vững lập trường, không để hoàn cảnh làm lung lay."
        }
    },
    {
        id: "magnolia",
        flowerName: "Magnolia",
        vietnameseName: "Hoa Mộc Lan",
        title: "Bạn là đóa Mộc Lan can trường kiêu hãnh.",
        quote: "Nở rộ trên cành cao trước khi đâm chồi, khí chất nữ hiệp bất phàm.",
        emoji: "🌺",
        traits: ["Can trường", "Đoan trang", "Tự tôn"],
        petalColor: "#F43F5E",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🪻", name: "Lan hồ điệp", desc: "Cặp đôi khí chất xuất chúng, tương trợ nhau hoàn hảo." },
            { icon: "🌼", name: "Hoa mai", desc: "Cùng chung ý chí sắt son vượt qua phong ba bão táp." }
        ],
        clash: [
            { icon: "⛓️", name: "Áp chế", desc: "Không bao giờ để ai tước đoạt quyền tự quyết của mình." },
            { icon: "🥀", name: "Hèn nhát", desc: "Bạn coi trọng lòng dũng cảm và tinh thần trách nhiệm." }
        ],
        checklist: {
            friend: "Người tiên phong dẫn lối, sẵn sàng đứng mũi chịu sào bảo vệ nhóm.",
            love: "Yêu bằng sự tự trọng, thẳng thắn và cùng nhau xây đắp lý tưởng.",
            pressure: "Càng bão giông càng đứng thẳng, dũng cảm vượt qua mọi nghịch cảnh."
        }
    },
    {
        id: "camellia",
        flowerName: "Camellia",
        vietnameseName: "Hoa Trà",
        title: "Bạn là đóa Hoa Trà duyên dáng kiên nhẫn.",
        quote: "Rơi rụng nguyên bông giữ trọn vẹn sự kiêu hãnh và lòng son sắt.",
        emoji: "🌺",
        traits: ["Kiên nhẫn", "Duyên dáng", "Bền bỉ"],
        petalColor: "#E11D48",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌸", name: "Hoa đào", desc: "Cùng mang nét xuân dịu dàng và nét đẹp Á Đông thuần khiết." },
            { icon: "🌾", name: "Oải hương", desc: "Đồng điệu về sự điềm tĩnh và chiều sâu nội tâm." }
        ],
        clash: [
            { icon: "⚡", name: "Vội vã", desc: "Bạn coi trọng việc 'chậm mà chắc', ghét sự cẩu thả." },
            { icon: "🌪️", name: "Bốc đồng", desc: "Sự thất thường làm mất đi tính nhẫn nại bền bỉ." }
        ],
        checklist: {
            friend: "Người bạn bền bỉ, dù thời gian trôi qua vẫn vẹn nguyên tấm lòng.",
            love: "Thương yêu sâu nặng, son sắt và trọn vẹn cả cuộc đời.",
            pressure: "Kiên nhẫn chờ đợi thời cơ, không bao giờ bỏ cuộc giữa chừng."
        }
    },
    {
        id: "carnation",
        flowerName: "Carnation",
        vietnameseName: "Cẩm Chướng",
        title: "Bạn là đóa Cẩm Chướng ấm áp yêu thương.",
        quote: "Tình mẫu tử thiêng liêng, bao la và chở che như dòng sữa mẹ.",
        emoji: "💐",
        traits: ["Vị tha", "Ấm áp", "Biết hy sinh"],
        petalColor: "#FB7185",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌸", name: "Cẩm tú cầu", desc: "Cùng hướng về gia đình và sự ấm no của người thân." },
            { icon: "🏵️", name: "Vạn thọ", desc: "Gắn kết bởi lòng hiếu thảo và sự kính trọng cội nguồn." }
        ],
        clash: [
            { icon: "🧊", name: "Vô ơn", desc: "Khó tha thứ cho kẻ chối bỏ tình cảm và sự hy sinh." },
            { icon: "🌵", name: "Gai góc", desc: "Sự cay nghiệt làm đau đớn trái tim giàu lòng vị tha." }
        ],
        checklist: {
            friend: "Người chăm sóc chu đáo, luôn chuẩn bị đồ ăn và lo từng cái áo ấm.",
            love: "Yêu bằng sự chăm chút, luôn hy sinh cho hạnh phúc của đối phương.",
            pressure: "Nghĩ về những người mình yêu thương để tiếp thêm nguồn sức mạnh."
        }
    },

    // ----------------------------------------------------------------------
    // Nhóm 6: Tự Tại Thoát Tục & Hoài Niệm Bền Lâu
    // ----------------------------------------------------------------------
    {
        id: "plumeria",
        flowerName: "Plumeria",
        vietnameseName: "Hoa Sứ",
        title: "Bạn là đóa Hoa Sứ an yên thoát tục.",
        quote: "Nở rộ bên hiên chùa, thơm ngát dịu dàng giữa cõi trần gian.",
        emoji: "🌼",
        traits: ["An yên", "Hiền hòa", "Thoát tục"],
        petalColor: "#FCD34D",
        bgColor: "#FEFCE8",
        match: [
            { icon: "🪷", name: "Hoa sen", desc: "Cặp đôi mang lại cảm giác an lạc, buông bỏ muộn phiền." },
            { icon: "🪷", name: "Hoa súng", desc: "Đồng điệu về tâm hồn tự do tự tại giữa thiên nhiên." }
        ],
        clash: [
            { icon: "🌪️", name: "Tranh đua", desc: "Không muốn tham gia vào những cuộc đua danh lợi xô bồ." },
            { icon: "⚡", name: "Hối hả", desc: "Cần nhịp sống thong dong, hòa mình vào đất trời." }
        ],
        checklist: {
            friend: "Ở cạnh bạn, ai cũng thấy tâm hồn nhẹ bẫng như trút được gánh nặng.",
            love: "Yêu bình dị, không đòi hỏi, cùng nhau tận hưởng từng buổi chiều thanh tịnh.",
            pressure: "Học cách buông bỏ điều không thuộc về mình, giữ lòng thanh thản."
        }
    },
    {
        id: "water_lily",
        flowerName: "Water Lily",
        vietnameseName: "Hoa Súng",
        title: "Bạn là đóa Hoa Súng thong dong tự tại.",
        quote: "Vươn mình từ làn nước mát, đón ánh mặt trời với tâm hồn khoáng đạt.",
        emoji: "🪷",
        traits: ["Tự do", "Kiên cường", "Thong dong"],
        petalColor: "#EC4899",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌼", name: "Hoa sứ", desc: "Cùng chung lối sống hòa nhã, gần gũi với mẹ thiên nhiên." },
            { icon: "🪷", name: "Hoa sen", desc: "Đồng điệu về vẻ đẹp vươn lên từ dòng nước biếc." }
        ],
        clash: [
            { icon: "⛓️", name: "Gò bó", desc: "Không thể tồn tại trong môi trường ngột ngạt, thiếu tự do." },
            { icon: "📢", name: "Thị phi", desc: "Tránh xa những tranh cãi vô bổ không hồi kết." }
        ],
        checklist: {
            friend: "Người bạn phóng khoáng, sẵn sàng cùng bạn xách balo lên và đi.",
            love: "Yêu tôn trọng khoảng trời riêng của nhau, gắn kết tự nhiên không trói buộc.",
            pressure: "Thả trôi cảm xúc theo dòng nước, tái tạo năng lượng từ thiên nhiên."
        }
    },
    {
        id: "forget_me_not",
        flowerName: "Forget-Me-Not",
        vietnameseName: "Hoa Lưu Ly",
        title: "Bạn là đóa Lưu Ly chân tình sâu lắng.",
        quote: "Xin đừng quên tôi — hoài niệm đẹp đẽ đọng lại nơi đáy tim.",
        emoji: "🪻",
        traits: ["Chân tình", "Thủy chung", "Trọng ân nghĩa"],
        petalColor: "#38BDF8",
        bgColor: "#F0F9FF",
        match: [
            { icon: "🌾", name: "Oải hương", desc: "Đồng cảm sâu sắc về tình nghĩa dài lâu và sự chung thủy." },
            { icon: "🪻", name: "Hoa salem", desc: "Cặp đôi trân quý từng kỷ niệm, sống trọn đạo nghĩa." }
        ],
        clash: [
            { icon: "🥀", name: "Phụ bạc", desc: "Nỗi đau lớn nhất là sự thờ ơ và lãng quên từ người thương." },
            { icon: "🌫️", name: "Hời hợt", desc: "Cần tình cảm chân thật, ghét sự giả dối đãi bôi." }
        ],
        checklist: {
            friend: "Người luôn nhớ ngày sinh nhật và từng thói quen nhỏ của bạn bè.",
            love: "Tình yêu son sắt, dù xa xôi cách trở vẫn một lòng hướng về người ấy.",
            pressure: "Mở cuốn nhật ký, nhìn lại chặng đường đã qua để vững tin bước tiếp."
        }
    },
    {
        id: "statice",
        flowerName: "Statice",
        vietnameseName: "Hoa Salem",
        title: "Bạn là cành Salem vĩnh cửu bền màu.",
        quote: "Sắc hoa không tàn phai theo năm tháng, minh chứng cho lòng kiên định.",
        emoji: "🪻",
        traits: ["Kiên định", "Bền bỉ", "Son sắt"],
        petalColor: "#C084FC",
        bgColor: "#FAF5FF",
        match: [
            { icon: "🪻", name: "Lưu ly", desc: "Cùng nhau gìn giữ những giá trị vĩnh hằng và tình nghĩa bền lâu." },
            { icon: "🏵️", name: "Vạn thọ", desc: "Đồng điệu về sự trường tồn và lòng thành kính." }
        ],
        clash: [
            { icon: "🌪️", name: "Chóng vánh", desc: "Khó hòa hợp với những mối quan hệ chớp nhoáng, thoáng qua." },
            { icon: "🎭", name: "Thay đổi", desc: "Không tin tưởng người hay thay lòng đổi dạ." }
        ],
        checklist: {
            friend: "Tri kỷ cả đời, dù năm tháng đổi thay thì tình bạn vẫn vẹn nguyên.",
            love: "Một lòng một dạ, tình yêu vượt qua mọi thử thách của thời gian.",
            pressure: "Bền bỉ như hoa khô, chịu đựng sương gió và giữ nguyên bản sắc."
        }
    },
    {
        id: "marigold",
        flowerName: "Marigold",
        vietnameseName: "Cúc Vạn Thọ",
        title: "Bạn là đóa Vạn Thọ ấm áp trường tồn.",
        quote: "Sắc vàng cam rực rỡ mang ước nguyện trường thọ, chở che cho mái ấm.",
        emoji: "🏵️",
        traits: ["Hiếu nghĩa", "Ấm áp", "Vững chãi"],
        petalColor: "#F59E0B",
        bgColor: "#FEF3C7",
        match: [
            { icon: "💐", name: "Cẩm chướng", desc: "Cùng chăm lo và vun vén cho hạnh phúc gia đình." },
            { icon: "🌼", name: "Hoa mai", desc: "Mang lại sinh khí may mắn và sự sum vầy ngày Tết." }
        ],
        clash: [
            { icon: "⚡", name: "Bất kính", desc: "Coi trọng lễ nghĩa và tình cảm hiếu đạo trong gia đình." },
            { icon: "🌪️", name: "Vô tâm", desc: "Không thích người quên cội nguồn và bỏ bê người thân." }
        ],
        checklist: {
            friend: "Chỗ dựa vững chãi, luôn chu toàn mọi việc từ lớn đến nhỏ cho nhóm.",
            love: "Yêu với tinh thần trách nhiệm cao, hướng tới tương lai bền vững.",
            pressure: "Lấy tình thân gia đình làm động lực mạnh mẽ nhất để vượt qua."
        }
    },
    {
        id: "cherry_blossom",
        flowerName: "Cherry Blossom",
        vietnameseName: "Hoa Anh Đào",
        title: "Bạn là đóa Anh Đào tinh khôi sống hết mình.",
        quote: "Nở rộ lộng lẫy và sống trọn vẹn từng khoảnh khắc thanh xuân tươi đẹp.",
        emoji: "🌸",
        traits: ["Nhiệt huyết", "Tinh tế", "Biết trân trọng hiện tại"],
        petalColor: "#FBCFE8",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌻", name: "Đồng tiền", desc: "Cùng lan tỏa niềm vui và tình yêu cuộc sống rực rỡ." },
            { icon: "🌺", name: "Anh túc", desc: "Cùng sống hết mình với đam mê và hoài bão tuổi trẻ." }
        ],
        clash: [
            { icon: "🥀", name: "Chần chừ", desc: "Thanh xuân ngắn ngủi, không nên lãng phí thời gian do dự." },
            { icon: "🌫️", name: "U ám", desc: "Cần ánh sáng và tinh thần lạc quan để tỏa sáng." }
        ],
        checklist: {
            friend: "Người luôn rủ bạn bè sống hết mình, không để thanh xuân trôi qua vô nghĩa.",
            love: "Yêu mãnh liệt, trân quý từng phút giây bên nhau như ngày đầu tiên.",
            pressure: "Tập trung vào hiện tại, nở nụ cười rạng rỡ và tiếp tục bước đi."
        }
    },
    {
        id: "hibiscus",
        flowerName: "Hibiscus",
        vietnameseName: "Hoa Phù Dung",
        title: "Bạn là đóa Phù Dung biến hóa rực rỡ.",
        quote: "Mỗi thời khắc trong ngày là một sắc thái quyến rũ không thể lãng quên.",
        emoji: "🌺",
        traits: ["Linh hoạt", "Quyến rũ", "Nghệ sĩ"],
        petalColor: "#F97316",
        bgColor: "#FFF7ED",
        match: [
            { icon: "🌺", name: "Hoa hồng", desc: "Đồng điệu về vẻ đẹp sắc sảo và niềm đam mê cái đẹp." },
            { icon: "🌸", name: "Allium", desc: "Sự kết hợp bất ngờ giữa tính nghệ sĩ và óc sáng tạo." }
        ],
        clash: [
            { icon: "📋", name: "Đơn điệu", desc: "Cuộc sống một màu khiến bạn nhanh chóng chán nản." },
            { icon: "⛓️", name: "Kiềm tỏa", desc: "Tâm hồn nghệ sĩ cần không gian phóng khoáng để thăng hoa." }
        ],
        checklist: {
            friend: "Người luôn mang lại những bất ngờ thú vị và gu thời trang ấn tượng.",
            love: "Yêu lãng mạn, luôn biết cách làm mới tình yêu để ngọn lửa không bao giờ tắt.",
            pressure: "Biến đổi linh hoạt theo hoàn cảnh, tìm thấy vẻ đẹp trong mọi thử thách."
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
