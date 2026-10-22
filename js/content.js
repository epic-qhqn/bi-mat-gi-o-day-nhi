// Nội dung bức thư chúc mừng chính 20/10
const letterContent = `
Xin chào {{NAME}}! Là chúng mình - các "quý ông" của CLB/Công ty đây.

Nhân dịp ngày Phụ nữ Việt Nam 20/10, chúng mình cũng có một lời muốn nói với mọi người đó đó!

Mong rằng các "bóng hồng" của chúng ta sẽ ngày càng xinh đẹp, tự tin, có nhiều sức khỏe, học giỏi/công tác tốt và sẽ luôn hạnh phúc với những gì mình đang có.

Ngoài ra cũng không thể quên gửi một lời cảm ơn thật to lớn đến các bạn nữ vì đã luôn đồng hành và cùng chúng mình tạo ra những kỷ niệm thật đẹp nha!
[Mở món quà bí mật và ấm áp dành riêng cho bạn tại đây nhé! 🎁](https://drive.google.com/drive/folders/1fILtFYl7tkBWg5vCPuzsZf9s9cpOf1NL?usp=drive_link)
`;

// Danh sách phong phú các lá thư gửi gắm từ các thành viên nam trong công ty / CLB
const randomClubLetters = [
    { author: "Hải Đăng", content: "Chúc bạn luôn tươi vui như đóa hoa đang nở rộ. 20/10 thật nhiều niềm vui và luôn là phiên bản hạnh phúc nhất của chính mình nhé!" },
    { author: "Minh Quân", content: "Hãy luôn tự tin và tỏa sáng theo cách riêng của mình. Nụ cười của bạn là nguồn năng lượng tuyệt vời cho cả team đấy. Chúc bạn 20/10 ngập tràn niềm vui!" },
    { author: "Hoàng Phong", content: "Cảm ơn vì đã luôn mang lại năng lượng tích cực cho mọi người xung quanh. 20/10 ngập tràn yêu thương, nhận thật nhiều hoa và quà nha!" },
    { author: "Tiến Đạt", content: "Chúc những bông hồng của chúng ta mãi luôn rạng rỡ, hoàn thành xuất sắc mọi mục tiêu và luôn được yêu thương chiều chuộng mỗi ngày!" },
    { author: "Gia Bảo", content: "Mong bạn luôn giữ nụ cười trên môi, dù công việc có bận rộn thì vẫn luôn an yên và yêu đời. Chúc mừng ngày của một nửa thế giới tuyệt vời nhất!" },
    { author: "Tuấn Anh", content: "20/10 chúc bạn visual lúc nào cũng đỉnh chóp, deadline luôn đúng hạn, bug tự động biến mất và ví tiền thì lúc nào cũng rủng rỉnh nha!" },
    { author: "Đức Huy", content: "Gửi ngàn lời chúc tốt đẹp nhất đến bạn! Mong bạn luôn bình an, may mắn trên mọi chặng đường và luôn có những người bạn đồng hành tuyệt vời bên cạnh." },
    { author: "Quang Minh", content: "Phụ nữ sinh ra là để được yêu thương. 20/10 này chúc bạn được cưng chiều như công chúa, ăn ngon không béo và luôn hạnh phúc mỗi sớm mai thức giấc!" },
    { author: "Thành Nam", content: "Cảm ơn sự dịu dàng và nhiệt huyết bạn luôn mang vào công việc mỗi ngày. Chúc bạn một ngày 20/10 trọn vẹn, ấm áp bên những người thân thương." },
    { author: "Quốc Bảo", content: "Chúc bạn có một ngày 20/10 thật 'slay', nhận được nhiều lời khen, uống trà sữa không sợ tăng cân và luôn là chính mình rạng ngời nhất!" },
    { author: "Trọng Hiếu", content: "Mỗi ngày có bạn ở văn phòng là một ngày ngập tràn tiếng cười. Cảm ơn vì bạn đã luôn là một mảnh ghép đặc biệt của tập thể chúng ta!" },
    { author: "Đình Trọng", content: "Chúc bạn một ngày 20/10 thật chill, không lo âu muộn phiền, công việc hanh thông và mọi điều ước hôm nay đều sẽ trở thành hiện thực!" },
    { author: "Văn Toàn", content: "Nụ cười của bạn làm bừng sáng cả không gian làm việc. 20/10 chúc bạn luôn giữ được nét hồn nhiên, sự kiên định và trái tim ấm áp nhé!" },
    { author: "Duy Mạnh", content: "Chúc bạn nhận được thật nhiều hoa, nhiều quà và tình cảm chân thành nhất. Bạn xứng đáng với tất cả những điều ngọt ngào nhất trên thế giới này." },
    { author: "Thế Vinh", content: "Mong rằng bạn luôn mạnh mẽ khi cần, dịu dàng khi muốn và luôn được trân trọng bởi những người xung quanh. 20/10 thật hạnh phúc nhé!" },
    { author: "Bảo Long", content: "20/10 chúc bạn vạn dặm bình an, một đời vui vẻ. Hãy cứ sống hết mình với đam mê và luôn tự hào về những điều bạn đã làm được!" },
    { author: "Hùng Cường", content: "Cảm ơn bạn vì những đóng góp tuyệt vời và sự thấu hiểu dành cho anh em. Chúc bạn ngày Phụ nữ Việt Nam thật nhiều niềm vui bất ngờ!" },
    { author: "Hoàng Anh", content: "Gửi đến bạn những lời chúc ấm áp nhất! Chúc bạn mỗi ngày đi làm đều là một ngày vui, không áp lực và luôn có động lực tiến bước." },
    { author: "Trung Kiên", content: "Chúc bạn ngày 20/10 ngập tràn 'vitamin hạnh phúc', luôn được đồng nghiệp quý mến và đạt được mọi ước mơ ấp ủ!" },
    { author: "Việt Dũng", content: "Dù thế giới ngoài kia có xô bồ, chúc bạn luôn giữ được sự bình yên trong tâm hồn và sự ngọt ngào trong ánh mắt. 20/10 vui vẻ nhé!" },
    { author: "Khánh Duy", content: "Chúc bông hoa xinh đẹp của công ty luôn tỏa ngát hương thơm, thông minh, sắc sảo và luôn là nguồn cảm hứng cho tất cả chúng mình!" },
    { author: "Phúc Lâm", content: "20/10 chúc bạn shopping không cần nhìn giá, ăn ngon ngủ ngon và luôn được chở che, yêu thương trọn vẹn!" },
    { author: "Thái Sơn", content: "Chúc bạn ngày Phụ nữ Việt Nam thật ngọt ngào như ly trà sữa full topping, rạng rỡ như nắng mai và lúc nào cũng ngập tràn may mắn!" }
];

// Cơ chế Non-Repeating Random Deck (Fisher-Yates Shuffled Pool)
// Đảm bảo rút ngẫu nhiên tuần tự không bao giờ bị trùng lặp cho đến khi đọc hết toàn bộ thư
let letterDeck = [];
let lastAuthor = null;

function shuffleLetters(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

window.randomClubLetters = randomClubLetters;

window.getNextRandomLetter = function() {
    if (!window.randomClubLetters || window.randomClubLetters.length === 0) {
        return { author: "Nam Đồng Nghiệp", content: "Chúc bạn ngày 20/10 thật nhiều niềm vui và hạnh phúc!" };
    }

    // Nếu bộ bài đã rút hết hoặc chưa khởi tạo, xáo bộ mới
    if (letterDeck.length === 0) {
        letterDeck = shuffleLetters(window.randomClubLetters);
        // Tránh trùng lặp lá thư đầu tiên của đợt mới với lá thư cuối cùng vừa rút
        if (letterDeck.length > 1 && letterDeck[0].author === lastAuthor) {
            const swapIdx = Math.floor(Math.random() * (letterDeck.length - 1)) + 1;
            [letterDeck[0], letterDeck[swapIdx]] = [letterDeck[swapIdx], letterDeck[0]];
        }
    }

    const picked = letterDeck.shift();
    lastAuthor = picked.author;
    return picked;
};

// ==========================================================================
// 5th Season Floral Studio: Flower ID Profiles Database (Sub-phase 4.1)
// ==========================================================================
const flowerProfiles = [
    {
        id: "lotus",
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
    },
    {
        id: "allium",
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
    },
    {
        id: "poppy",
        flowerName: "Poppy",
        vietnameseName: "Anh Túc",
        title: "Bạn là một đóa Anh Túc.",
        quote: "Tự do, nồng nhiệt và không thể trộn lẫn.",
        emoji: "🌺",
        traits: ["Nổi loạn ngọt ngào", "Nhiệt huyết", "Trực giác nhạy bén"],
        petalColor: "#F87171",
        bgColor: "#FEF2F2",
        match: [
            { icon: "🌸", name: "Allium", desc: "Hai cá tính độc lạ gặp nhau là quậy tưng bừng." },
            { icon: "🌻", name: "Hướng dương", desc: "Tiếp lửa cho nhau không bao giờ cạn nguồn năng lượng." }
        ],
        clash: [
            { icon: "🌾", name: "Oải hương", desc: "Một người thích ngẫu hứng, một người thích trật tự." },
            { icon: "🌿", name: "Cẩm tú cầu", desc: "Cảm xúc thất thường gặp người trầm tính." }
        ],
        checklist: {
            friend: "Luôn là người khuấy động mọi cuộc vui bất thình lình.",
            love: "Yêu hết mình, cháy bỏng và cực kỳ bảo vệ người ấy.",
            pressure: "Càng áp lực càng bộc lộ sự kiên cường đáng nể."
        }
    },
    {
        id: "tulip",
        flowerName: "Tulip",
        vietnameseName: "Uất Kim Hương",
        title: "Bạn là một bông Tulip kiêu sa.",
        quote: "Thanh lịch tự nhiên, dịu dàng nhưng đầy bản lĩnh.",
        emoji: "🌷",
        traits: ["Tinh tế", "Độc lập", "Biết lắng nghe"],
        petalColor: "#EC4899",
        bgColor: "#FDF2F8",
        match: [
            { icon: "🌹", name: "Hoa hồng", desc: "Cùng trân trọng cái đẹp và những điều sâu sắc." },
            { icon: "🌼", name: "Cúc họa mi", desc: "Bình yên và ấm áp khi ngồi cạnh nhau." }
        ],
        clash: [
            { icon: "🌵", name: "Xương rồng", desc: "Quá sắc nhọn khiến sự tinh tế bị tổn thương." },
            { icon: "🌺", name: "Anh túc", desc: "Đôi khi quá ồn ào so với không gian bạn cần." }
        ],
        checklist: {
            friend: "Chỗ dựa tinh thần dịu dàng, lắng nghe không phán xét.",
            love: "Thương bằng sự chu đáo tỉ mỉ, để ý từng chi tiết nhỏ.",
            pressure: "Bình tĩnh tìm góc tĩnh lặng để sắp xếp lại mọi thứ."
        }
    },
    {
        id: "sunflower",
        flowerName: "Sunflower",
        vietnameseName: "Hướng Dương",
        title: "Bạn là đóa Hướng Dương rực rỡ.",
        quote: "Nơi nào có bạn, nơi đó ngập tràn ánh nắng ấm áp.",
        emoji: "🌻",
        traits: ["Lạc quan", "Chân thành", "Tràn đầy năng lượng"],
        petalColor: "#F59E0B",
        bgColor: "#FEF3C7",
        match: [
            { icon: "🌺", name: "Anh túc", desc: "Cặp đôi lan tỏa năng lượng tích cực cho cả vũ trụ." },
            { icon: "🌷", name: "Tulip", desc: "Sưởi ấm tâm hồn kín đáo của người bạn." }
        ],
        clash: [
            { icon: "🥀", name: "Liễu rũ", desc: "Năng lượng đối lập dễ làm cả hai kiệt sức." },
            { icon: "🌑", name: "Hoa bóng đêm", desc: "Một bên muốn ra sáng, một bên thích trốn trong tối." }
        ],
        checklist: {
            friend: "Gói vitamin cười di động, kéo mood cả đám lên tức thì.",
            love: "Yêu chân thành, không giấu giếm, sẵn sàng công khai cả thế giới.",
            pressure: "Tự động viên bản thân: 'Mọi chuyện rồi sẽ ổn thôi mà!'"
        }
    },
    {
        id: "daisy",
        flowerName: "Daisy",
        vietnameseName: "Cúc Họa Mi",
        title: "Bạn là đóa Cúc Họa Mi trong veo.",
        quote: "Bình yên giữa phố thị, đơn sơ mà chạm đến đáy lòng.",
        emoji: "🌼",
        traits: ["Hồn nhiên", "Chữa lành", "Dễ mến"],
        petalColor: "#FBBF24",
        bgColor: "#F0FDF4",
        match: [
            { icon: "🌷", name: "Tulip", desc: "Thấu hiểu nhau mà không cần nói quá nhiều lời." },
            { icon: "🌸", name: "Allium", desc: "Bạn cân bằng lại những cơn bão ý tưởng của Allium." }
        ],
        clash: [
            { icon: "⚡", name: "Gai nhọn", desc: "Sự thô ráp dễ làm tổn thương nét ngây thơ." },
            { icon: "🌪️", name: "Bão cát", desc: "Sự ồn ào vội vã làm mất đi vẻ trong trẻo." }
        ],
        checklist: {
            friend: "Người bạn chữa lành, ở cạnh thấy nhẹ nhõm như vừa uống ngụm trà mát.",
            love: "Thương bằng những cử chỉ mộc mạc: tin nhắn 'ăn cơm chưa?', cái ôm ấm áp.",
            pressure: "Hít một hơi thật sâu, ngắm trời xanh và mỉm cười bắt đầu lại."
        }
    },
    {
        id: "peony",
        flowerName: "Peony",
        vietnameseName: "Mẫu Đơn",
        title: "Bạn là một đóa Mẫu Đơn vương giả.",
        quote: "Hào phóng, ấm áp và luôn là chỗ dựa vững chãi.",
        emoji: "💐",
        traits: ["Đẳng cấp", "Hào phóng", "Đáng tin cậy"],
        petalColor: "#FB7185",
        bgColor: "#FFF1F2",
        match: [
            { icon: "🌻", name: "Hướng dương", desc: "Cả hai cùng mang đến sự ấm áp và hào phóng vô điều kiện." },
            { icon: "🌷", name: "Tulip", desc: "Đồng điệu về gu thẩm mỹ và cách đối nhân xử thế." }
        ],
        clash: [
            { icon: "🎭", name: "Mặt nạ", desc: "Không chịu được sự thiếu chân thành và tính toán chi li." },
            { icon: "🕳️", name: "Hố sâu", desc: "Năng lượng bi quan quá mức làm cạn kiệt nguồn hào phóng." }
        ],
        checklist: {
            friend: "Chị đại/Bạn thân bảo kê, luôn sẵn sàng đứng ra che chở mọi người.",
            love: "Chiều chuộng hết nấc, sẵn sàng trao những điều tốt nhất cho người thương.",
            pressure: "Ngẩng cao đầu đối mặt và tìm giải pháp triệt để nhất."
        }
    }
];

window.flowerProfiles = flowerProfiles;
window.currentFlowerIndex = 0;

window.getCurrentFlowerProfile = function() {
    return flowerProfiles[window.currentFlowerIndex % flowerProfiles.length];
};

window.getNextFlowerProfile = function() {
    window.currentFlowerIndex = (window.currentFlowerIndex + 1) % flowerProfiles.length;
    return window.getCurrentFlowerProfile();
};

