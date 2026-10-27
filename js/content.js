// Nội dung bức thư chúc mừng chính 20/10
const letterContent = `
Hề nhôooooo {{NAME}}! Đây là chương trình thường trực 20/10 của quý ông EPIC đè su.

Nhân dịp ngày Phụ nữ Việt Nam 20/10, chúng mình cũng có một lời muốn nói với mọi người đó đó!

Mong rằng các bạn nữ sẽ ngày càng xinh đẹp, tự tin, có thật nhiều sức khỏe, học thật giỏi và sẽ luôn làm được nhiều điều mình thích nè (❁´◡\`❁)

Ngoài ra cũng không thể quên gửi một lời cảm ơn thật to lớn đến các bạn nữ vì đã luôn đồng hành và cùng chúng mình tạo ra những kỷ niệm thật đẹp nha!

Chúng mình có chuẩn bị 2 món quà bí mật chứa đầy kỷ niệm và những lời chúc yêu thương dành riêng cho bạn ở ngay bên dưới. Hãy chạm vào từng chiếc hộp để khám phá nhé! 🎁✨
`;

// Danh sách phong phú các lá thư gửi gắm từ các thành viên nam trong công ty / CLB
const randomClubLetters = [
    { author: "Trung Con Trai", content: 'Lời chúc tuy đến hơi trễ, nhưng mong các bông hoa của EPIC đã có một ngày 20/10 thật trọn vẹn. Chúc phái đẹp của chúng ta luôn lộng lẫy rạng ngời ngay ở những ngày bình thường dù chẳng cần điểm tô son phấn, ung dung bình yên bước qua mọi giông bão. Chúc chị em luôn được nâng niu bởi người mình đã chọn, và mãi mãi là những "ngoại lệ" kiêu hãnh, ngọt ngào nhất của đại gia đình EPIC nhé! ( •̀ ω •́ )✧' },
    { author: "Trung Kiên", content: 'Chúc mừng ngày 20/10! thân chúc toàn thể chị em luôn khỏe mạnh, xinh đẹp, mãi là phiên bản độc nhất tỏa sáng và đón nhận thật nhiều thành công, hạnh phúc trong cuộc sống!' },
    { author: "Boom shakalaka m ỉa trong quần đi", content: "Chúc người con gái STREAM tớ yêu luôn là những con người hạnh phúc nhất, hiền hòa nhất, hạnh phúc nhất và luôn giữ được tinh thần hào hứng, hóng hớt, hớn hở với những sự kiện của EPIC nhóooo. Habibi VIETNAMESE(PIC)'S WOMEN DAY" },
    { author: "Kon Pò", content: "chúc các bống hồng xinh đẹp của CLB STEM càng ngày càng được toả sáng dưới ánh mặt trời nha" },
    { author: "Du Nhiên", content: "Chúc các bạn nữ clb EPIC STEMS 20/10 vui vẻ bên các anh tài nha. Ngày hôm nay các anh ấy là của các bạn hết, mình ko giành. Happi Vietnamese national Women Day" },
    { author: "XeneoBlue", content: "Chúc những bông hoa của EPIC mình sẽ luôn hạnh phúc, trọn vẹn, luôn rực rỡ theo cách riêng của chính mình. Chúc các nàng công chúa bất kể ngày nào cũng là một ngày 20/10 nha" },
    { author: "TBN", content: "Chúc những cô gái của team luôn là những bông hoa đẹp nhất, luôn xinh đẹp, mỗi ngày đều tươi cười, và sẽ luôn là người mà bất cứ ai để mất cx tiếc nuối. Chúc mn 20/10 thật rực rỡ." },
    { author: "PCN 2", content: "Bánh xèo, bánh xe, bánh khọt, bánh đúc, bánh mì,...cớ sao tui lại phải lòng bánh bèo EPIC. Chúc các bèo luôn hạnh phục, dễ thương, kute, kawai, moi moi kyu." },
    { author: "Khiết Đan", content: "Chúc các chị em trong CLB 20/10 vui vẻ, nhan sắc thăng hạng, tiền tài rủng rỉnh, deadline tự né, làm gì cũng thuận lợi, đi đâu cũng được quý, mãi keo mãi slay và luôn giữ vững phong độ nữ hoàng nhaaa!" },
    { author: "Chauzzz bell", content: "Chúc mấy bạn, mấy chị trong CLB STEM 20/10 có tất cả trừ vất vả, mọi thứ đến với mình đều suôn sẻ, không gặp khó khăn trong học tập cũng như cuộc sống. Chúc mấy bèo của tập thể mình lun xinh đẹp, mạnh khoẻ. Queen never cry!" },
    { author: "khviss=))", content: "Chúc các cô gái EPIC - STEM luôn rực rỡ, xinh đẹp và tỏa sáng theo cách riêng! Deadline tự né, niềm vui tràn trề nha" },
    { author: "ACN", content: "Hông biết cậu là ai, nhưng mà tớ chúc cậu sẽ là hoa, là gió, là mây. Được toả sáng, được bay bổng, được tự do thật toả sáng theo cách cậu muốn, thật xinh đẹp, được làm mọi điều cậu thích và điều gì cũng như ý nhoa (❁´◡`❁)" },
{ author: "Brian Palmer (NHQB)", content: "Chúc các nàng của CLB EPIC 20/10 luôn vui vẻ, hạnh phúc, xinh đẹp, học giỏi và đạt được nhiều thành công trong tương lai nha. Mãi iu!!!" },
{ author: "Tuấn", content: "Chúc các bạn nữ trong CLB STEM luôn xinh đẹp, vui vẻ, học tập tốt và luôn giữ được niềm đam mê sáng tạo. Chúc các bạn luôn tự tin, tỏa sáng và cùng CLB tạo nên thật nhiều dự án thú vị nhé!" },
{ author: "TP", content: "Chúc các bạn nữ EPIC 20/10 ngày càng xinh hơn, tiền vào như nước, deadline tự biến mất, được làm nữ chính còn hội bạn xách đồ." },
{ author: "LMN", content: "Chúc các cô gái của EPIC - STEM luôn là những bông hoa tươi sắc, sức khoẻ dồi dào, không bao giờ ốm đau bệnh tật hay làm việc quá sức. Chúc các bạn 20/10 vui vẻ" },
{ author: "NHP", content: "Tuy là hơi trễ rùi nhma chúc các bông hoa của STEM 20/10 luôn giữ đc năng lượng vui tươi, hạnh phúc, nhan sắc ngày càng thăng hạng nhaaa!! 🌸✨" },
{ author: "1m82,lạnh lùng,ít nói", content: "Khoa học có thể giải thích mọi quy luật của vũ trụ, nhưng chẳng có công thức nào định đoạt được nét duyên và sự tỏa sáng của các nàng. Các nàng chính là điều đẹp đẽ nhất mà tạo hóa ban tặng cho nơi này. Mong ngày hôm nay và mọi ngày sau này, đều tràn đầy nụ cười, bình yên và những điều kỳ diệu nhất đến với các nàng. 💖🚀" },
{ author: "hú hú khẹc khẹc (NMT)", content: "chúc các công chúa hoàng hậu của EPIC - STEM 1 bủi lễ 20/10 ngày càng xik xắn, giỏi giang, chăm sóc và yêu thương bản thân hơn, gặt hái nhìu thành công trong học tập lẫn tình yêu nhennnn!! Tự tin và bản lĩnh nhé các chị emmmmm!!!!!!" }
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

window.getNextRandomLetter = function () {
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
// 5th Season Floral Studio: Flower Profiles delegated to js/flowers-data.js
// ==========================================================================
// Toàn bộ 27 loài hoa và các accessor được quản lý độc lập tại js/flowers-data.js
if (!window.flowerProfiles && typeof flowerProfiles !== 'undefined') {
    window.flowerProfiles = flowerProfiles;
}


