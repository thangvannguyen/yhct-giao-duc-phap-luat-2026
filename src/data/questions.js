// Nguồn dữ liệu:
// - Câu hỏi + đáp án đúng: trích từ "Ôn tập-Đáp án thi PL.pdf" (đáp án thật, không phải AI sinh ra).
// - 3 phương án nhiễu (distractors) trong mỗi câu: do AI soạn thêm để phục vụ chế độ trắc nghiệm,
//   CHỈ đáp án đúng (index 0 trước khi shuffle) là lấy từ tài liệu gốc.
// Giao diện đánh số tuần tự 1..58 bằng `number`. `originalNumber` chỉ giữ lại trong dữ liệu để
// tra ngược về file PDF gốc khi cần đối chiếu, không hiển thị ra ngoài.

export const QUESTIONS = [
  {
    id: 1,
    originalNumber: 1,
    topic: 'nha-nuoc',
    question: 'Chủ quyền quốc gia là gì?',
    options: [
      'Quyền tối cao, toàn vẹn và độc lập của quốc gia trong lãnh thổ, dân cư và đối ngoại.',
      'Quyền của công dân được nhà nước bảo hộ khi ở nước ngoài.',
      'Quyền của Quốc hội trong việc ban hành luật.',
      'Quyền sở hữu tài sản công của nhà nước.',
    ],
    explain:
      'Chủ quyền quốc gia có hai mặt: đối nội là quyền lực tối cao với toàn bộ lãnh thổ và dân cư, đối ngoại là quyền độc lập tự quyết, không chịu áp đặt từ quốc gia khác. Các phương án còn lại chỉ là quyền của một cơ quan hoặc một nhóm chủ thể cụ thể, không phải thuộc tính của cả quốc gia.',
  },
  {
    id: 2,
    originalNumber: 2,
    topic: 'hien-phap-2013',
    question: 'Theo Hiến pháp năm 2013, Chủ tịch nước ban hành loại văn bản nào để thực hiện nhiệm vụ, quyền hạn của mình?',
    options: [
      'Lệnh và Quyết định.',
      'Nghị quyết và Nghị định.',
      'Luật và Pháp lệnh.',
      'Thông tư và Chỉ thị.',
    ],
    explain:
      'Mỗi cơ quan có hình thức văn bản riêng: Quốc hội ban hành luật và nghị quyết, Chính phủ ban hành nghị định, Thủ tướng ban hành quyết định, bộ trưởng ban hành thông tư. Riêng Chủ tịch nước ban hành lệnh và quyết định, ví dụ lệnh công bố luật hay quyết định đặc xá.',
  },
  {
    id: 3,
    originalNumber: 3,
    topic: 'ly-luan-phap-luat',
    question: 'Các con đường hình thành nên pháp luật nói chung là gì?',
    options: [
      'Tập quán pháp, tiền lệ pháp và văn bản quy phạm pháp luật.',
      'Đạo đức, phong tục và tôn giáo.',
      'Nghị quyết của Đảng và điều lệ của các tổ chức xã hội.',
      'Học thuyết pháp lý và các án lệ quốc tế.',
    ],
    explain:
      'Nhà nước không tạo ra pháp luật từ số không mà bằng ba cách: thừa nhận tập quán sẵn có (tập quán pháp), thừa nhận cách giải quyết của cơ quan xét xử làm khuôn mẫu (tiền lệ pháp), và trực tiếp soạn thảo ban hành (văn bản quy phạm pháp luật). Đạo đức hay tôn giáo không tự thành pháp luật nếu nhà nước không thừa nhận.',
  },
  {
    id: 4,
    originalNumber: 4,
    topic: 'ly-luan-phap-luat',
    question: 'Nhận định nào sau đây là SAI?',
    options: [
      'Pháp luật chỉ do nhân dân ban hành.',
      'Pháp luật do Nhà nước ban hành và bảo đảm thực hiện.',
      'Pháp luật mang tính bắt buộc chung đối với mọi thành viên trong xã hội.',
      'Pháp luật thể hiện ý chí của giai cấp thống trị.',
    ],
    note: 'Câu chọn nhận định SAI. Nguyên văn tài liệu đáp án: “Pháp luật chỉ do nhân dân ban hành (→ sai, do Nhà nước ban hành).”',
    explain:
      'Sai ở chữ "chỉ do nhân dân". Pháp luật do Nhà nước ban hành hoặc thừa nhận rồi bảo đảm thực hiện bằng quyền lực nhà nước. Nhân dân tham gia qua việc bầu ra Quốc hội và góp ý xây dựng luật, nhưng chủ thể ban hành là cơ quan nhà nước có thẩm quyền. Ba phương án còn lại đều là đặc điểm đúng của pháp luật.',
  },
  {
    id: 5,
    originalNumber: 5,
    topic: 'vi-pham-trach-nhiem',
    question: 'Trong lỗi, thái độ tâm lý của người phạm tội thể hiện ở đâu?',
    options: [
      'Lỗi cố ý hoặc lỗi vô ý.',
      'Động cơ và mục đích phạm tội.',
      'Nhân thân và hoàn cảnh phạm tội.',
      'Hậu quả thiệt hại thực tế xảy ra.',
    ],
    explain:
      'Lỗi là thái độ tâm lý của người vi phạm đối với hành vi và hậu quả, chỉ có hai hình thức: cố ý (nhận thức được hậu quả mà vẫn làm) và vô ý (không thấy trước, hoặc thấy trước nhưng cho rằng ngăn được). Động cơ, mục đích, nhân thân cũng nằm trong cấu thành vi phạm nhưng thuộc yếu tố khác, không phải bản thân lỗi.',
  },
  {
    id: 6,
    originalNumber: 7,
    topic: 'ly-luan-phap-luat',
    question: 'Chọn nhận định SAI.',
    options: [
      'Pháp luật ra đời trước Nhà nước.',
      'Pháp luật và Nhà nước cùng ra đời trong một điều kiện lịch sử nhất định.',
      'Nhà nước ban hành pháp luật để quản lý xã hội.',
      'Pháp luật chỉ tồn tại trong xã hội có Nhà nước.',
    ],
    note: 'Câu chọn nhận định SAI — đáp án đúng là phương án đầu tiên.',
    explain:
      'Sai về trình tự lịch sử. Pháp luật do Nhà nước ban hành hoặc thừa nhận, nên phải có Nhà nước mới có pháp luật. Hai hiện tượng này cùng ra đời khi xã hội phân chia giai cấp, pháp luật không thể có trước.',
  },
  {
    id: 7,
    originalNumber: 8,
    topic: 'hien-phap-2013',
    question: 'Theo Hiến pháp năm 2013, Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam quản lý xã hội bằng gì?',
    options: [
      'Bằng Hiến pháp và pháp luật.',
      'Bằng đạo đức và phong tục tập quán.',
      'Bằng các nghị quyết của Mặt trận Tổ quốc.',
      'Bằng chính sách kinh tế và ngoại giao.',
    ],
    explain:
      'Đây là nguyên tắc của nhà nước pháp quyền: mọi hoạt động quản lý phải dựa trên Hiến pháp và pháp luật, và chính cơ quan nhà nước cũng phải tuân theo. Đạo đức, phong tục vẫn có vai trò nhưng không phải công cụ quản lý chính thức của nhà nước.',
  },
  {
    id: 8,
    originalNumber: 9,
    topic: 'ly-luan-phap-luat',
    question: 'Chế tài có các loại nào?',
    options: [
      'Hình sự, hành chính, dân sự, kỷ luật.',
      'Cưỡng chế, thuyết phục, giáo dục, răn đe.',
      'Phạt tiền, cảnh cáo, tịch thu, trục xuất.',
      'Bồi thường, khôi phục, cải tạo, giám sát.',
    ],
    explain:
      'Chế tài được phân loại theo ngành luật điều chỉnh, tương ứng bốn loại trách nhiệm pháp lý: hình sự, hành chính, dân sự và kỷ luật. Các phương án khác liệt kê hình thức xử phạt cụ thể (phạt tiền, cảnh cáo) hoặc phương pháp tác động (thuyết phục, giáo dục), không phải cách phân loại chế tài.',
  },
  {
    id: 9,
    originalNumber: 11,
    topic: 'hien-phap-2013',
    question: 'Theo Hiến pháp năm 2013, nước Cộng hòa xã hội chủ nghĩa Việt Nam do ai làm chủ?',
    options: [
      'Nhân dân làm chủ.',
      'Đảng Cộng sản Việt Nam làm chủ.',
      'Quốc hội làm chủ.',
      'Nhà nước làm chủ.',
    ],
    explain:
      'Bản chất nhà nước của Nhân dân, do Nhân dân, vì Nhân dân: tất cả quyền lực nhà nước thuộc về Nhân dân. Đảng giữ vai trò lãnh đạo, Quốc hội là cơ quan đại biểu cao nhất do dân bầu, nhưng chủ thể làm chủ đất nước là Nhân dân.',
  },
  {
    id: 10,
    originalNumber: 12,
    topic: 'hien-phap-2013',
    question: 'Chủ tịch nước Cộng hòa xã hội chủ nghĩa Việt Nam có những quyền gì?',
    options: [
      'Công bố Hiến pháp, luật, pháp lệnh; bổ nhiệm, miễn nhiệm, cách chức các chức danh; quyết định đặc xá; tặng thưởng huân chương, huy chương, đại diện đối ngoại...',
      'Ban hành luật và giám sát tối cao hoạt động của Nhà nước.',
      'Xét xử các vụ án và quyết định hình phạt.',
      'Quản lý ngân sách nhà nước và điều hành Chính phủ.',
    ],
    explain:
      'Chủ tịch nước là nguyên thủ quốc gia, thay mặt Nhà nước về đối nội và đối ngoại, nên các quyền nêu trên đều mang tính nguyên thủ. Ban hành luật là của Quốc hội, xét xử là của Tòa án, điều hành ngân sách là của Chính phủ.',
  },
  {
    id: 11,
    originalNumber: 14,
    topic: 'nha-nuoc',
    question: 'Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam là gì?',
    options: [
      'Là Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân.',
      'Là Nhà nước liên bang gồm nhiều nước cộng hòa tự trị.',
      'Là Nhà nước quân chủ lập hiến do Đảng lãnh đạo.',
      'Là Nhà nước tư bản chủ nghĩa đang trong giai đoạn quá độ.',
    ],
    explain:
      'Đây là định danh chính thức trong Hiến pháp 2013. Pháp quyền nghĩa là nhà nước tổ chức và hoạt động trên cơ sở Hiến pháp, pháp luật; của dân, do dân, vì dân chỉ nguồn gốc và mục đích của quyền lực. Việt Nam là nhà nước đơn nhất, không phải liên bang.',
  },
  {
    id: 12,
    originalNumber: 15,
    topic: 'ly-luan-phap-luat',
    question: 'Quy phạm pháp luật là cách xử sự do nhà nước quy định để làm gì?',
    options: [
      'Để điều chỉnh các quan hệ xã hội.',
      'Để giáo dục đạo đức công dân.',
      'Để phát triển kinh tế thị trường.',
      'Để bảo vệ chủ quyền quốc gia.',
    ],
    explain:
      'Chức năng gốc của quy phạm pháp luật là điều chỉnh hành vi trong các quan hệ xã hội, tức đặt ra khuôn mẫu xử sự: được làm gì, phải làm gì, cấm làm gì. Giáo dục đạo đức hay phát triển kinh tế là hệ quả kéo theo, không phải mục đích trực tiếp.',
  },
  {
    id: 13,
    originalNumber: 16,
    topic: 'hien-phap-2013',
    question: 'Theo Hiến pháp năm 2013, ai có thẩm quyền quyết định tặng thưởng huân chương, huy chương, danh hiệu vinh dự nhà nước?',
    options: [
      'Chủ tịch nước.',
      'Thủ tướng Chính phủ.',
      'Chủ tịch Quốc hội.',
      'Chánh án Tòa án nhân dân tối cao.',
    ],
    explain:
      'Khen thưởng cấp nhà nước gồm huân chương, huy chương, danh hiệu vinh dự nhà nước thuộc thẩm quyền của nguyên thủ quốc gia là Chủ tịch nước. Thủ tướng chỉ tặng bằng khen và cờ thi đua của Chính phủ.',
  },
  {
    id: 14,
    originalNumber: 17,
    topic: 'nha-nuoc',
    question: 'Hình thức nhà nước được thể hiện chủ yếu ở mấy khía cạnh?',
    options: [
      'Ba khía cạnh: chính thể, cấu trúc và chế độ chính trị.',
      'Hai khía cạnh: lập pháp và hành pháp.',
      'Bốn khía cạnh: chính thể, cấu trúc, chế độ chính trị và tư pháp.',
      'Ba khía cạnh: kinh tế, chính trị và văn hóa.',
    ],
    explain:
      'Ba khía cạnh trả lời ba câu hỏi khác nhau: chính thể là quyền lực tối cao được lập ra thế nào (quân chủ hay cộng hòa), cấu trúc là nhà nước chia thành đơn vị lãnh thổ ra sao (đơn nhất hay liên bang), chế độ chính trị là dùng phương pháp gì để thực hiện quyền lực (dân chủ hay phản dân chủ).',
  },
  {
    id: 15,
    originalNumber: 18,
    topic: 'dan-su',
    question: 'Người có quyền sở hữu tài sản bao gồm các quyền nào?',
    options: [
      'Quyền chiếm hữu, quyền sử dụng, quyền định đoạt.',
      'Quyền chiếm hữu, quyền hưởng dụng, quyền thừa kế.',
      'Quyền sử dụng, quyền định đoạt, quyền thế chấp.',
      'Quyền chiếm hữu, quyền sử dụng, quyền chuyển nhượng.',
    ],
    explain:
      'Ba quyền năng ứng với ba mức tác động lên tài sản: nắm giữ và quản lý (chiếm hữu), khai thác công dụng và hưởng hoa lợi (sử dụng), quyết định số phận pháp lý như bán, tặng, tiêu huỷ (định đoạt). Thế chấp hay chuyển nhượng chỉ là cách thực hiện quyền định đoạt, không phải quyền năng riêng.',
  },
  {
    id: 16,
    originalNumber: 21,
    topic: 'dan-su',
    question: 'Chiếm hữu là gì?',
    options: [
      'Là việc một chủ thể nắm giữ, quản lý tài sản như của mình.',
      'Là việc chuyển giao quyền sở hữu tài sản cho người khác.',
      'Là việc khai thác công dụng, hưởng hoa lợi từ tài sản.',
      'Là việc định đoạt số phận pháp lý của tài sản.',
    ],
    explain:
      'Chiếm hữu là quan hệ thực tế giữa người và tài sản, tức đang nắm giữ, quản lý nó. Cần phân biệt với sử dụng (khai thác công dụng) và định đoạt (quyết định số phận tài sản). Lưu ý người chiếm hữu chưa chắc là chủ sở hữu, ví dụ người thuê hay người mượn.',
  },
  {
    id: 17,
    originalNumber: 22,
    topic: 'nha-nuoc',
    question: 'Nguyên nhân cốt lõi của sự ra đời nhà nước là gì?',
    options: [
      'Mâu thuẫn giai cấp không thể điều hòa được.',
      'Nhu cầu trị thủy và chống ngoại xâm.',
      'Sự phát triển của lực lượng sản xuất.',
      'Nhu cầu quản lý dân số và lãnh thổ.',
    ],
    explain:
      'Khi tư hữu xuất hiện, xã hội phân hoá thành các giai cấp có lợi ích đối kháng đến mức không tự điều hoà được, cần một bộ máy cưỡng chế đứng ra duy trì trật tự, đó là nhà nước. Trị thuỷ hay chống ngoại xâm chỉ là điều kiện thúc đẩy, không phải nguyên nhân cốt lõi.',
  },
  {
    id: 18,
    originalNumber: 23,
    topic: 'ly-luan-phap-luat',
    question: 'Để đảm bảo nguyên tắc thống nhất trong việc xây dựng và áp dụng pháp luật thì cần phải làm gì?',
    options: [
      'Xây dựng hệ thống pháp luật thống nhất, đồng bộ, có hiệu lực cao.',
      'Tăng cường tuyên truyền, giáo dục pháp luật trong nhân dân.',
      'Đẩy mạnh cải cách hành chính và tư pháp.',
      'Mở rộng quyền lập pháp cho các địa phương.',
    ],
    explain:
      'Muốn áp dụng thống nhất thì bản thân hệ thống pháp luật phải thống nhất trước: văn bản cấp dưới không trái cấp trên, các ngành luật không mâu thuẫn nhau. Tuyên truyền hay cải cách hành chính chỉ hỗ trợ; giao quyền lập pháp cho địa phương lại càng phá vỡ tính thống nhất.',
  },
  {
    id: 19,
    originalNumber: 24,
    topic: 'ly-luan-phap-luat',
    question: '"Pháp luật là hệ thống quy tắc xử sự mang tính ..., do ... ban hành và bảo đảm thực hiện, thể hiện ... của giai cấp thống trị và phụ thuộc vào các điều kiện ..., là nhân tố điều chỉnh các quan hệ xã hội." Điền vào chỗ trống theo đúng thứ tự.',
    options: [
      'Bắt buộc chung – do Nhà nước ban hành – thể hiện ý chí giai cấp thống trị – phụ thuộc điều kiện kinh tế xã hội.',
      'Tự nguyện – do cộng đồng dân cư đặt ra – thể hiện phong tục tập quán – phụ thuộc điều kiện tự nhiên.',
      'Khuyến khích – do các tổ chức xã hội ban hành – thể hiện đạo đức chung – phụ thuộc trình độ dân trí.',
      'Bắt buộc chung – do Tòa án ban hành – thể hiện ý chí của thẩm phán – phụ thuộc vào án lệ.',
    ],
    explain:
      'Bốn chỗ trống ứng với bốn dấu hiệu của pháp luật: tính bắt buộc chung (áp dụng cho mọi người), chủ thể ban hành (Nhà nước), nội dung ý chí (giai cấp thống trị), và cơ sở quyết định nội dung đó (điều kiện kinh tế xã hội, vì pháp luật thuộc kiến trúc thượng tầng).',
  },
  {
    id: 20,
    originalNumber: 25,
    topic: 'nha-nuoc',
    question: 'Lịch sử xã hội loài người đã tồn tại mấy kiểu nhà nước, bao gồm những kiểu nào?',
    options: [
      'Bốn kiểu – chiếm hữu nô lệ, phong kiến, tư sản, xã hội chủ nghĩa.',
      'Ba kiểu: phong kiến, tư sản, xã hội chủ nghĩa.',
      'Năm kiểu: cộng sản nguyên thủy, chiếm hữu nô lệ, phong kiến, tư sản, xã hội chủ nghĩa.',
      'Bốn kiểu: quân chủ, cộng hòa, liên bang, đơn nhất.',
    ],
    explain:
      'Kiểu nhà nước gắn với hình thái kinh tế xã hội có giai cấp. Xã hội cộng sản nguyên thuỷ chưa có giai cấp nên chưa có nhà nước, đó là lý do không tính thành kiểu thứ năm. Quân chủ hay cộng hòa, đơn nhất hay liên bang là hình thức nhà nước, không phải kiểu nhà nước.',
  },
  {
    id: 21,
    originalNumber: 27,
    topic: 'hien-phap-2013',
    question: 'Về tính chất, văn bản Hiến pháp được xác định là gì?',
    options: [
      'Là đạo luật cơ bản, có hiệu lực pháp lý cao nhất.',
      'Là văn bản dưới luật do Chính phủ ban hành.',
      'Là điều ước quốc tế mà Việt Nam tham gia.',
      'Là văn bản chỉ có giá trị tham khảo, không bắt buộc thi hành.',
    ],
    explain:
      'Hiến pháp quy định những vấn đề gốc như chế độ chính trị, quyền con người, tổ chức bộ máy nhà nước nên gọi là đạo luật cơ bản. Mọi văn bản khác phải phù hợp với Hiến pháp, trái thì bị bãi bỏ, đó là ý nghĩa của hiệu lực pháp lý cao nhất.',
  },
  {
    id: 22,
    originalNumber: 28,
    topic: 'ly-luan-phap-luat',
    question: 'Để đảm bảo nguyên tắc thống nhất trong việc xây dựng và áp dụng pháp luật thì cần phải làm gì? ',
    options: [
      'Xây dựng và áp dụng pháp luật thống nhất, đồng bộ, công khai, minh bạch.',
      'Ưu tiên áp dụng tập quán địa phương trước pháp luật thành văn.',
      'Cho phép mỗi ngành ban hành quy định riêng không cần thống nhất.',
      'Chỉ cần công bố pháp luật rộng rãi trên phương tiện truyền thông.',
    ],
    explain:
      'Câu này nhấn cả hai khâu: xây dựng (văn bản không chồng chéo, mâu thuẫn) và áp dụng (cùng một vụ việc thì xử lý như nhau ở mọi nơi). Công khai, minh bạch để người dân biết mà tuân theo và giám sát được.',
  },
  {
    id: 23,
    originalNumber: 29,
    topic: 'nha-nuoc',
    question: 'Kết cấu của Hệ thống chính trị xã hội chủ nghĩa Việt Nam bao gồm những gì?',
    options: [
      'Đảng Cộng sản Việt Nam, Nhà nước, Mặt trận Tổ quốc và các tổ chức chính trị – xã hội.',
      'Nhà nước, Chính phủ và các Bộ, ngành trung ương.',
      'Quốc hội, Chính phủ và Tòa án nhân dân tối cao.',
      'Đảng Cộng sản Việt Nam, Quốc hội và Chính phủ.',
    ],
    explain:
      'Hệ thống chính trị rộng hơn bộ máy nhà nước: Đảng lãnh đạo, Nhà nước quản lý, Mặt trận Tổ quốc và các đoàn thể tập hợp nhân dân. Các phương án chỉ liệt kê cơ quan nhà nước là nhầm hệ thống chính trị với bộ máy nhà nước.',
  },
  {
    id: 24,
    originalNumber: 30,
    topic: 'hien-phap-2013',
    question: 'Theo Hiến pháp năm 2013, tổ chức nào tập hợp, phát huy sức mạnh đại đoàn kết dân tộc, thực hiện dân chủ, tăng cường đồng thuận xã hội?',
    options: [
      'Mặt trận Tổ quốc Việt Nam.',
      'Tổng Liên đoàn Lao động Việt Nam.',
      'Đoàn Thanh niên Cộng sản Hồ Chí Minh.',
      'Hội Liên hiệp Phụ nữ Việt Nam.',
    ],
    explain:
      'Mặt trận Tổ quốc là liên minh chính trị, liên hiệp tự nguyện, nơi tập hợp mọi giai cấp, dân tộc, tôn giáo. Công đoàn, Đoàn Thanh niên, Hội Phụ nữ là thành viên của Mặt trận và chỉ đại diện cho một nhóm đối tượng.',
  },
  {
    id: 25,
    originalNumber: 31,
    topic: 'hien-phap-2013',
    question: 'Cơ quan thường trực của Quốc hội là cơ quan nào?',
    options: [
      'Ủy ban Thường vụ Quốc hội.',
      'Hội đồng Dân tộc.',
      'Văn phòng Quốc hội.',
      'Ủy ban Pháp luật của Quốc hội.',
    ],
    explain:
      'Quốc hội mỗi năm chỉ họp hai kỳ nên cần một cơ quan hoạt động thường xuyên giữa hai kỳ họp, đó là Ủy ban Thường vụ Quốc hội, cơ quan ban hành pháp lệnh và giám sát. Hội đồng Dân tộc và các ủy ban là cơ quan chuyên môn; Văn phòng Quốc hội chỉ là bộ máy giúp việc hành chính.',
  },
  {
    id: 26,
    originalNumber: 33,
    topic: 'hien-phap-2013',
    question: 'Việc sửa đổi, bổ sung Hiến pháp phải có điều kiện gì?',
    options: [
      'Ít nhất 2/3 tổng số đại biểu Quốc hội tán thành.',
      'Quá nửa tổng số đại biểu Quốc hội tán thành.',
      'Toàn bộ đại biểu Quốc hội biểu quyết nhất trí.',
      '2/3 số đại biểu có mặt tại kỳ họp tán thành.',
    ],
    explain:
      'Hiến pháp là đạo luật cơ bản nên thủ tục sửa phải chặt hơn luật thường (luật thường chỉ cần quá nửa tán thành). Lưu ý là 2/3 trên tổng số đại biểu Quốc hội, không phải 2/3 số đại biểu có mặt tại kỳ họp.',
  },
  {
    id: 27,
    originalNumber: 35,
    topic: 'hien-phap-2013',
    question: 'Theo Hiến pháp năm 2013, nước Cộng hòa xã hội chủ nghĩa Việt Nam bao gồm những bộ phận lãnh thổ nào?',
    options: [
      'Đất liền, vùng biển, vùng trời và các đảo, quần đảo.',
      'Đất liền, vùng biển và vùng đặc quyền kinh tế.',
      'Đất liền, hải đảo và thềm lục địa.',
      'Đất liền, vùng trời và các khu vực biên giới.',
    ],
    explain:
      'Lãnh thổ quốc gia là một khối thống nhất gồm vùng đất (đất liền và các đảo, quần đảo), vùng biển và vùng trời phía trên. Với vùng đặc quyền kinh tế và thềm lục địa, quốc gia có quyền chủ quyền và quyền tài phán chứ không phải lãnh thổ.',
  },
  {
    id: 28,
    originalNumber: 37,
    topic: 'dan-su',
    question: 'Bộ luật Dân sự 2015 quy định các quyền khác đối với tài sản bao gồm những quyền gì?',
    options: [
      'Quyền hưởng dụng và quyền bề mặt.',
      'Quyền sở hữu và quyền chiếm hữu.',
      'Quyền thế chấp và quyền cầm cố.',
      'Quyền sử dụng hạn chế bất động sản liền kề và quyền thừa kế.',
    ],
    explain:
      'Hưởng dụng là quyền khai thác công dụng và hưởng hoa lợi trên tài sản của người khác; bề mặt là quyền sử dụng mặt đất, mặt nước, khoảng không của người khác. Cả hai đều là quyền trên tài sản thuộc sở hữu của người khác nên xếp vào nhóm quyền khác, phân biệt với quyền sở hữu.',
  },
  {
    id: 29,
    originalNumber: 38,
    topic: 'lao-dong',
    question: 'Thỏa ước lao động tập thể là gì?',
    options: [
      'Là thỏa thuận giữa tập thể người lao động và người sử dụng lao động về điều kiện, quyền và nghĩa vụ trong lao động.',
      'Là hợp đồng lao động ký giữa từng cá nhân người lao động với người sử dụng lao động.',
      'Là quyết định đơn phương của người sử dụng lao động về lương thưởng.',
      'Là văn bản do cơ quan nhà nước ban hành quy định mức lương tối thiểu.',
    ],
    explain:
      'Mấu chốt nằm ở hai chữ tập thể và thỏa thuận: một bên là tập thể người lao động thông qua tổ chức đại diện, thương lượng với người sử dụng lao động rồi ký kết. Khác hợp đồng lao động (ký với từng cá nhân) và khác nội quy lao động (do người sử dụng lao động đơn phương ban hành).',
  },
  {
    id: 30,
    originalNumber: 41,
    topic: 'dan-su',
    question: 'Năng lực của chủ thể bao gồm những gì?',
    options: [
      'Năng lực pháp luật và năng lực hành vi.',
      'Năng lực hành vi và năng lực trách nhiệm hình sự.',
      'Năng lực pháp luật và năng lực tài chính.',
      'Năng lực chuyên môn và năng lực pháp luật.',
    ],
    explain:
      'Hai thành tố bổ sung nhau: năng lực pháp luật là khả năng có quyền và nghĩa vụ, thường có từ khi sinh ra; năng lực hành vi là khả năng tự mình xác lập và thực hiện quyền, nghĩa vụ đó, phụ thuộc độ tuổi và khả năng nhận thức. Có đủ cả hai mới trở thành chủ thể của quan hệ pháp luật.',
  },
  {
    id: 31,
    originalNumber: 45,
    topic: 'ly-luan-phap-luat',
    question: 'Hình thức pháp luật có mấy loại?',
    options: [
      'Ba loại – tập quán pháp, tiền lệ pháp và văn bản quy phạm pháp luật.',
      'Hai loại: luật thành văn và luật bất thành văn.',
      'Bốn loại: tập quán pháp, tiền lệ pháp, văn bản quy phạm pháp luật và điều ước quốc tế.',
      'Ba loại: hiến pháp, luật và văn bản dưới luật.',
    ],
    explain:
      'Ba hình thức tương ứng ba con đường hình thành pháp luật. Cách chia hiến pháp, luật, văn bản dưới luật là phân loại văn bản quy phạm pháp luật theo hiệu lực, nằm bên trong hình thức thứ ba chứ không song song với nó.',
  },
  {
    id: 32,
    originalNumber: 46,
    topic: 'nha-nuoc',
    question: 'Cơ quan nào thực hiện chức năng thực hành quyền công tố và kiểm sát các hoạt động tư pháp?',
    options: [
      'Viện Kiểm sát nhân dân.',
      'Tòa án nhân dân.',
      'Bộ Công an.',
      'Thanh tra Chính phủ.',
    ],
    explain:
      'Viện kiểm sát giữ hai chức năng gắn liền nhau: thực hành quyền công tố (nhân danh Nhà nước truy tố người phạm tội) và kiểm sát hoạt động tư pháp (giám sát việc tuân theo pháp luật trong điều tra, xét xử, thi hành án). Tòa án xét xử, Công an điều tra, đều không phải cơ quan công tố.',
  },
  {
    id: 33,
    originalNumber: 47,
    topic: 'ly-luan-phap-luat',
    question: 'Chức năng nào không phải là chức năng của pháp luật?',
    options: [
      'Chức năng kinh tế trực tiếp.',
      'Chức năng điều chỉnh các quan hệ xã hội.',
      'Chức năng bảo vệ các quan hệ xã hội.',
      'Chức năng giáo dục.',
    ],
    explain:
      'Pháp luật có ba chức năng: điều chỉnh, bảo vệ và giáo dục. Pháp luật tác động tới kinh tế bằng cách tạo hành lang pháp lý chứ không trực tiếp sản xuất kinh doanh, nên chức năng kinh tế trực tiếp không phải chức năng của pháp luật.',
  },
  {
    id: 34,
    originalNumber: 49,
    topic: 'ly-luan-phap-luat',
    question: 'Văn bản nào có hiệu lực cao nhất trong Hệ thống Pháp luật Việt Nam?',
    options: ['Hiến pháp.', 'Bộ luật.', 'Luật.', 'Pháp lệnh.'],
    explain:
      'Hệ thống văn bản quy phạm pháp luật xếp theo thứ bậc hiệu lực: Hiến pháp đứng đầu, dưới là bộ luật và luật, rồi pháp lệnh, nghị định, thông tư. Văn bản cấp dưới trái Hiến pháp thì bị đình chỉ hoặc bãi bỏ.',
  },
  {
    id: 35,
    originalNumber: 51,
    topic: 'nha-nuoc',
    question: 'Khẳng định nào là đúng về sự ra đời của nhà nước?',
    options: [
      'Nhà nước ra đời khi xã hội xuất hiện giai cấp và mâu thuẫn giai cấp.',
      'Nhà nước ra đời cùng với sự xuất hiện của loài người.',
      'Nhà nước ra đời do ý chí của một cá nhân kiệt xuất.',
      'Nhà nước ra đời trước khi xã hội phân chia giai cấp.',
    ],
    explain:
      'Nhà nước là hiện tượng lịch sử, không phải lúc nào loài người cũng có nhà nước. Thời cộng sản nguyên thuỷ chưa có tư hữu, chưa có giai cấp thì chưa có nhà nước; khi giai cấp đối kháng xuất hiện thì nhà nước ra đời.',
  },
  {
    id: 36,
    originalNumber: 52,
    topic: 'ly-luan-phap-luat',
    question: 'Chọn nhận định SAI.',
    options: [
      'Pháp luật chỉ điều chỉnh quan hệ kinh tế.',
      'Pháp luật điều chỉnh nhiều lĩnh vực quan hệ xã hội khác nhau.',
      'Pháp luật vừa điều chỉnh vừa bảo vệ các quan hệ xã hội.',
      'Pháp luật có mối quan hệ chặt chẽ với kinh tế nhưng không chỉ điều chỉnh quan hệ kinh tế.',
    ],
    note: 'Câu chọn nhận định SAI — đáp án đúng là phương án đầu tiên.',
    explain:
      'Sai ở chữ chỉ. Pháp luật điều chỉnh hầu hết các lĩnh vực của đời sống: dân sự, hôn nhân gia đình, lao động, hành chính, hình sự. Quan hệ kinh tế chỉ là một nhóm trong số đó.',
  },
  {
    id: 37,
    originalNumber: 55,
    topic: 'lao-dong',
    question: 'Phương pháp điều chỉnh của ngành luật Lao động là gì?',
    options: [
      'Kết hợp giữa thỏa thuận và mệnh lệnh – quyền uy.',
      'Chỉ dựa trên nguyên tắc bình đẳng thỏa thuận thuần túy.',
      'Chỉ dựa trên mệnh lệnh hành chính từ Nhà nước.',
      'Kết hợp giữa cưỡng chế và tự nguyện thi hành án.',
    ],
    explain:
      'Quan hệ lao động có hai mặt: hình thành trên cơ sở tự nguyện thỏa thuận (ký hợp đồng, thương lượng lương), nhưng khi đã làm việc thì người lao động chịu sự quản lý điều hành của người sử dụng lao động, đồng thời cả hai phải tuân thủ quy định bắt buộc của Nhà nước. Vì vậy ngành luật này dùng cả hai phương pháp.',
  },
  {
    id: 38,
    originalNumber: 56,
    topic: 'dan-su',
    question: 'Phương thức nào sau đây được coi là phương thức bảo vệ quyền dân sự?',
    options: [
      'Tự bảo vệ, hòa giải, hoặc yêu cầu cơ quan có thẩm quyền giải quyết',
      'Chỉ có thể khởi kiện ra Tòa án.',
      'Chỉ có thể yêu cầu cơ quan công an can thiệp.',
      'Thương lượng với bên vi phạm là phương thức duy nhất được pháp luật công nhận.',
    ],
    explain:
      'Pháp luật dân sự cho nhiều lựa chọn chứ không bắt buộc phải ra tòa: chủ thể có thể tự bảo vệ trong giới hạn luật cho phép, thương lượng hoà giải với nhau, hoặc yêu cầu Tòa án và cơ quan nhà nước có thẩm quyền giải quyết. Vì vậy các phương án dùng chữ chỉ có thể hay duy nhất đều sai.',
  },
  {
    id: 39,
    originalNumber: 61,
    topic: 'ly-luan-phap-luat',
    question: 'Nhận định nào dưới đây là chính xác?',
    options: [
      'Pháp luật là công cụ quản lý nhà nước và điều chỉnh quan hệ xã hội.',
      'Pháp luật chỉ là công cụ trấn áp của giai cấp thống trị.',
      'Pháp luật tồn tại độc lập, không liên quan đến Nhà nước.',
      'Pháp luật chỉ có giá trị đạo đức, không có tính cưỡng chế.',
    ],
    explain:
      'Câu này nêu đủ hai vai trò của pháp luật: với Nhà nước, pháp luật là công cụ quản lý xã hội; với xã hội, pháp luật là chuẩn mực điều chỉnh hành vi. Các phương án còn lại thu hẹp pháp luật thành công cụ trấn áp hoặc tách pháp luật khỏi nhà nước, đều phiến diện.',
  },
  {
    id: 40,
    originalNumber: 64,
    topic: 'hien-phap-2013',
    question: 'Theo Hiến pháp năm 2013, cơ quan nào có quyền quyết định trưng cầu ý dân?',
    options: ['Quốc hội.', 'Chủ tịch nước.', 'Chính phủ.', 'Ủy ban Thường vụ Quốc hội.'],
    explain:
      'Trưng cầu ý dân là hỏi ý kiến toàn dân về vấn đề đặc biệt quan trọng nên thẩm quyền quyết định thuộc Quốc hội, cơ quan quyền lực nhà nước cao nhất đại diện cho Nhân dân. Ủy ban Thường vụ Quốc hội, Chủ tịch nước hay Chính phủ có thể đề nghị nhưng không tự quyết định.',
  },
  {
    id: 41,
    originalNumber: 66,
    topic: 'ly-luan-phap-luat',
    question: 'Chức năng nào không phải là chức năng của pháp luật? ',
    options: [
      'Chức năng sáng tạo nghệ thuật.',
      'Chức năng điều chỉnh quan hệ xã hội.',
      'Chức năng bảo vệ trật tự pháp luật.',
      'Chức năng giáo dục ý thức pháp luật.',
    ],
    explain:
      'Ba chức năng của pháp luật là điều chỉnh, bảo vệ và giáo dục. Sáng tạo nghệ thuật thuộc lĩnh vực văn hoá; pháp luật chỉ bảo hộ quyền tác giả chứ bản thân không sáng tạo nghệ thuật.',
  },
  {
    id: 42,
    originalNumber: 69,
    topic: 'vi-pham-trach-nhiem',
    question: 'Cấu thành của vi phạm pháp luật bao gồm những yếu tố nào?',
    options: [
      'Chủ thể, khách thể, mặt chủ quan, mặt khách quan.',
      'Chủ thể, khách thể, hành vi và hậu quả.',
      'Lỗi, động cơ, mục đích và hậu quả.',
      'Chủ thể, đối tượng, nguyên nhân và điều kiện.',
    ],
    explain:
      'Bốn yếu tố trả lời bốn câu hỏi: ai vi phạm (chủ thể), xâm hại quan hệ xã hội nào (khách thể), biểu hiện bên ngoài gồm hành vi và hậu quả (mặt khách quan), diễn biến tâm lý bên trong gồm lỗi, động cơ, mục đích (mặt chủ quan). Thiếu một yếu tố thì chưa cấu thành vi phạm pháp luật.',
  },
  {
    id: 43,
    originalNumber: 71,
    topic: 'nha-nuoc',
    question: 'Nhà nước là gì?',
    options: [
      'Là tổ chức đặc biệt của quyền lực chính trị, có bộ máy cưỡng chế và quản lý xã hội.',
      'Là tổ chức xã hội tự nguyện của mọi công dân.',
      'Là tổ chức kinh tế điều tiết sản xuất và phân phối của cải.',
      'Là liên minh các giai cấp không phân biệt lợi ích.',
    ],
    explain:
      'Chữ đặc biệt là mấu chốt phân biệt nhà nước với mọi tổ chức khác: chỉ nhà nước có quyền lực công, có bộ máy cưỡng chế chuyên nghiệp như quân đội, công an, tòa án, có quyền ban hành pháp luật và thu thuế. Các tổ chức xã hội khác không có những dấu hiệu này.',
  },
  {
    id: 44,
    originalNumber: 72,
    topic: 'ly-luan-phap-luat',
    question: 'Tính giai cấp của pháp luật thể hiện ở chỗ nào?',
    options: [
      'Thể hiện ý chí và bảo vệ lợi ích của giai cấp thống trị.',
      'Thể hiện ý chí chung của toàn thể nhân dân không phân biệt giai cấp.',
      'Thể hiện ở việc áp dụng như nhau cho mọi quốc gia.',
      'Thể hiện ở tính khách quan, trung lập tuyệt đối.',
    ],
    explain:
      'Pháp luật do nhà nước ban hành, mà nhà nước nằm trong tay giai cấp thống trị, nên nội dung pháp luật trước hết phản ánh ý chí và bảo vệ lợi ích của giai cấp đó. Bên cạnh tính giai cấp, pháp luật còn có tính xã hội là duy trì trật tự chung, hai tính chất tồn tại song song.',
  },
  {
    id: 45,
    originalNumber: 74,
    topic: 'ly-luan-phap-luat',
    question: 'Nhận định nào sau đây là SAI? ',
    options: [
      'Pháp luật và đạo đức là một.',
      'Pháp luật và đạo đức là hai hình thái ý thức xã hội khác nhau nhưng có quan hệ mật thiết.',
      'Pháp luật mang tính cưỡng chế còn đạo đức mang tính tự giác.',
      'Pháp luật do Nhà nước ban hành, đạo đức hình thành từ dư luận xã hội.',
    ],
    note: 'Câu chọn nhận định SAI — đáp án đúng là phương án đầu tiên.',
    explain:
      'Hai hiện tượng này gần nhau nhưng khác bản chất: pháp luật do Nhà nước ban hành, bắt buộc chung, vi phạm thì bị cưỡng chế; đạo đức hình thành tự phát trong xã hội, thực hiện tự giác, vi phạm thì chịu dư luận lên án. Nhiều quy tắc đạo đức được luật hoá nhưng không vì thế mà đồng nhất hai khái niệm.',
  },
  {
    id: 46,
    originalNumber: 79,
    topic: 'nha-nuoc',
    question: 'Trong bộ máy nhà nước xã hội chủ nghĩa có sự gì?',
    options: [
      'Sự thống nhất trong việc thực hiện ba quyền lập pháp, hành pháp và tư pháp.',
      'Sự phân chia quyền lực tuyệt đối giữa ba nhánh lập pháp, hành pháp, tư pháp.',
      'Sự độc lập hoàn toàn giữa các cơ quan nhà nước.',
      'Sự cạnh tranh quyền lực giữa Quốc hội và Chính phủ.',
    ],
    explain:
      'Việt Nam không áp dụng tam quyền phân lập theo kiểu phân chia đối trọng. Quyền lực nhà nước là thống nhất, thuộc về Nhân dân, có sự phân công, phối hợp và kiểm soát giữa các cơ quan trong việc thực hiện ba quyền. Vì vậy phương án nói phân chia tuyệt đối hay độc lập hoàn toàn đều sai.',
  },
  {
    id: 47,
    originalNumber: 81,
    topic: 'nha-nuoc',
    question: 'Nhận định nào là đúng về nguồn gốc nhà nước?',
    options: [
      'Nhà nước ra đời cùng với sự xuất hiện của tư hữu và giai cấp.',
      'Nhà nước ra đời trước khi có chế độ tư hữu.',
      'Nhà nước ra đời do quyết định của thần quyền.',
      'Nhà nước ra đời cùng lúc với ngôn ngữ loài người.',
    ],
    explain:
      'Chuỗi nhân quả: lực lượng sản xuất phát triển, có sản phẩm dư thừa, xuất hiện chế độ tư hữu, xã hội phân hoá giai cấp, mâu thuẫn không điều hoà được và nhà nước ra đời. Do đó tư hữu và giai cấp là điều kiện tiên quyết, không thể có nhà nước trước chúng.',
  },
  {
    id: 48,
    originalNumber: 82,
    topic: 'dan-su',
    question: 'Đối tượng của nghĩa vụ là gì?',
    options: [
      'Hành vi mà bên có nghĩa vụ phải thực hiện hoặc không được thực hiện.',
      'Tài sản thuộc sở hữu của bên có quyền.',
      'Ý chí chủ quan của các bên trong quan hệ dân sự.',
      'Hợp đồng được giao kết giữa các bên.',
    ],
    explain:
      'Nghĩa vụ dân sự luôn hướng tới hành vi của bên có nghĩa vụ: phải làm một việc như giao hàng, trả tiền, hoặc không được làm một việc. Tài sản chỉ là thứ mà hành vi đó tác động tới, còn hợp đồng là căn cứ làm phát sinh nghĩa vụ, cả hai đều không phải đối tượng.',
  },
  {
    id: 49,
    originalNumber: 83,
    topic: 'nha-nuoc',
    question: 'Hình thức chính thể của nhà nước Việt Nam là gì?',
    options: [
      'Cộng hòa xã hội chủ nghĩa.',
      'Quân chủ lập hiến.',
      'Cộng hòa liên bang.',
      'Cộng hòa tổng thống.',
    ],
    explain:
      'Chính thể trả lời câu hỏi quyền lực tối cao được lập ra bằng cách nào. Ở Việt Nam, Quốc hội do Nhân dân bầu ra theo nhiệm kỳ nên là chính thể cộng hòa, cụ thể là cộng hòa xã hội chủ nghĩa, không phải quân chủ truyền ngôi cũng không phải cộng hòa tổng thống.',
  },
  {
    id: 50,
    originalNumber: 106,
    topic: 'ly-luan-phap-luat',
    question: 'Chọn nhận định SAI. ',
    options: [
      'Pháp luật không phụ thuộc vào kinh tế, xã hội.',
      'Pháp luật phụ thuộc vào điều kiện kinh tế - xã hội của mỗi giai đoạn.',
      'Pháp luật thay đổi khi cơ sở kinh tế - xã hội thay đổi.',
      'Pháp luật là kiến trúc thượng tầng, chịu sự quyết định của cơ sở hạ tầng kinh tế.',
    ],
    note: 'Câu chọn nhận định SAI — đáp án đúng là phương án đầu tiên.',
    explain:
      'Sai vì pháp luật thuộc kiến trúc thượng tầng, do cơ sở hạ tầng kinh tế quyết định. Điều kiện kinh tế xã hội thay đổi thì pháp luật phải sửa đổi theo, ví dụ chuyển từ kinh tế kế hoạch hoá sang kinh tế thị trường kéo theo hàng loạt luật mới về doanh nghiệp, đầu tư.',
  },
  {
    id: 51,
    originalNumber: 121,
    topic: 'ly-luan-phap-luat',
    question: 'Nhận định nào sau đây là đúng?',
    options: [
      'Pháp luật là công cụ quản lý nhà nước và điều chỉnh quan hệ xã hội.',
      'Pháp luật chỉ nhằm mục đích trừng phạt người vi phạm.',
      'Pháp luật không có vai trò trong quản lý nhà nước.',
      'Pháp luật chỉ điều chỉnh quan hệ giữa các cơ quan nhà nước.',
    ],
    explain:
      'Nhà nước quản lý xã hội chủ yếu bằng pháp luật vì pháp luật có tính bắt buộc chung và được bảo đảm thực hiện bằng cưỡng chế nhà nước. Nói pháp luật chỉ để trừng phạt là nhầm chức năng bảo vệ với toàn bộ vai trò của pháp luật.',
  },
  {
    id: 52,
    originalNumber: 123,
    topic: 'nha-nuoc',
    question: 'Khẳng định nào là đúng về sự tồn tại của nhà nước?',
    options: [
      'Nhà nước chỉ tồn tại khi có giai cấp và mâu thuẫn giai cấp.',
      'Nhà nước tồn tại vĩnh viễn trong mọi hình thái xã hội.',
      'Nhà nước sẽ mất đi ngay khi giai cấp thống trị thay đổi.',
      'Nhà nước là hiện tượng tồn tại từ khi loài người xuất hiện.',
    ],
    explain:
      'Nhà nước là phạm trù lịch sử gắn với xã hội có giai cấp: ra đời khi giai cấp xuất hiện và theo lý luận sẽ tiêu vong khi không còn giai cấp. Vì vậy không thể nói nhà nước tồn tại vĩnh viễn hay có từ khi loài người xuất hiện.',
  },
  {
    id: 53,
    originalNumber: 130,
    topic: 'ly-luan-phap-luat',
    question: 'Nhận định nào sau đây là đúng? ',
    options: [
      'Pháp luật là phương tiện để nhà nước quản lý xã hội.',
      'Pháp luật là mục đích cuối cùng mà nhà nước hướng tới.',
      'Pháp luật đứng trên nhà nước và không chịu sự chi phối của nhà nước.',
      'Pháp luật chỉ là công cụ của các tổ chức xã hội, không phải của nhà nước.',
    ],
    explain:
      'Pháp luật là phương tiện chứ không phải mục đích: nhà nước dùng nó để đạt mục tiêu quản lý, giữ trật tự và phát triển xã hội. Pháp luật cũng do nhà nước ban hành nên không thể đứng trên nhà nước.',
  },
  {
    id: 54,
    originalNumber: 141,
    topic: 'ly-luan-phap-luat',
    question: 'Nhận định nào sau đây là SAI? ',
    options: [
      'Pháp luật chỉ điều chỉnh lĩnh vực chính trị.',
      'Pháp luật điều chỉnh nhiều lĩnh vực của đời sống xã hội như kinh tế, dân sự, lao động.',
      'Pháp luật có phạm vi điều chỉnh rộng hơn lĩnh vực chính trị.',
      'Pháp luật vừa mang tính giai cấp vừa mang tính xã hội.',
    ],
    note: 'Câu chọn nhận định SAI — đáp án đúng là phương án đầu tiên.',
    explain:
      'Sai ở phạm vi. Pháp luật phủ khắp đời sống: kinh tế, dân sự, lao động, hôn nhân gia đình, hình sự, hành chính. Lĩnh vực chính trị chỉ là một phần trong số đó.',
  },
  {
    id: 55,
    originalNumber: 142,
    topic: 'ly-luan-phap-luat',
    question: 'Khẳng định nào là đúng về bản chất pháp luật?',
    options: [
      'Pháp luật phản ánh ý chí của giai cấp thống trị.',
      'Pháp luật phản ánh ý chí của toàn dân một cách tuyệt đối, không qua giai cấp nào.',
      'Pháp luật không phản ánh ý chí của bất kỳ giai cấp nào.',
      'Pháp luật chỉ phản ánh ý chí của các cơ quan lập pháp.',
    ],
    explain:
      'Đây chính là tính giai cấp của pháp luật. Cần hiểu đúng: pháp luật phản ánh ý chí giai cấp thống trị nhưng đồng thời vẫn phải tính đến lợi ích chung của xã hội, nếu không sẽ không được chấp nhận và không thể thực hiện được.',
  },
  {
    id: 56,
    originalNumber: 149,
    topic: 'nha-nuoc',
    question: 'Nhận định nào dưới đây là chính xác về nhà nước? ',
    options: [
      'Nhà nước là tổ chức quyền lực chính trị đặc biệt của giai cấp thống trị.',
      'Nhà nước là tổ chức phi chính trị, đứng trung lập giữa các giai cấp.',
      'Nhà nước là tổ chức kinh tế do các doanh nghiệp thành lập.',
      'Nhà nước là tổ chức tôn giáo có quyền lực tối cao.',
    ],
    explain:
      'Định nghĩa nêu đủ ba dấu hiệu: là tổ chức quyền lực chính trị, mang tính đặc biệt vì có bộ máy cưỡng chế, quyền ban hành pháp luật và thu thuế, và mang bản chất giai cấp. Nhà nước không trung lập giữa các giai cấp.',
  },
  {
    id: 57,
    originalNumber: 150,
    topic: 'hien-phap-2013',
    question: 'Nhận định nào sau đây là đúng về Hiến pháp?',
    options: [
      'Hiến pháp là đạo luật cơ bản, có hiệu lực pháp lý cao nhất trong hệ thống pháp luật Việt Nam.',
      'Hiến pháp là văn bản dưới luật, có thể bị luật khác thay thế.',
      'Hiến pháp chỉ có giá trị áp dụng trong một số lĩnh vực nhất định.',
      'Hiến pháp có hiệu lực ngang với các nghị định của Chính phủ.',
    ],
    explain:
      'Hiến pháp do Quốc hội ban hành theo thủ tục đặc biệt, cần ít nhất 2/3 tổng số đại biểu tán thành, và quy định những vấn đề nền tảng nhất của quốc gia. Mọi văn bản khác kể cả luật đều phải phù hợp với Hiến pháp.',
  },
  {
    id: 58,
    originalNumber: 181,
    topic: 'ly-luan-phap-luat',
    question: 'Hình thức pháp luật là gì?',
    options: [
      'Cách thức mà giai cấp thống trị thể hiện ý chí của mình thành pháp luật – gồm tập quán pháp, tiền lệ pháp, văn bản quy phạm pháp luật.',
      'Là nội dung các quy phạm pháp luật điều chỉnh quan hệ xã hội.',
      'Là trình tự, thủ tục ban hành văn bản của cơ quan nhà nước.',
      'Là cơ cấu tổ chức của hệ thống cơ quan tư pháp.',
    ],
    explain:
      'Hình thức ở đây là cái vỏ chứa đựng ý chí giai cấp thống trị, tức ý chí đó được thể hiện ra ngoài dưới dạng nào để trở thành pháp luật, gồm tập quán pháp, tiền lệ pháp và văn bản quy phạm pháp luật. Đừng nhầm với nội dung pháp luật hay trình tự ban hành văn bản.',
  },
].map((q, i) => ({ ...q, number: i + 1, correctIndex: 0, aiGenerated: 'distractors-only' }))
