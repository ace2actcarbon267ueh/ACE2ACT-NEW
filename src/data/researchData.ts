import { Milestone, ResearchGap, Finding } from '../types';

export const RESEARCH_INFO = {
  titleEn: "Turning persuasion into participation: how Gen Z tourists respond to carbon surcharge communication",
  titleVi: "Biến sự thuyết phục thành hành động tham gia: Phản hồi của du khách Gen Z trước truyền thông về phụ phí carbon",
  authors: "Nhóm tác giả ACE2ACT Research Group",
  contactEmail: "ace2act.carbon@gmail.com",
  journal: "Tourism Recreation Research",
  publisher: "Taylor & Francis",
  publishDate: "21/01/2026",
  doi: "10.1080/02508281.2025.2611763",
  doiUrl: "https://doi.org/10.1080/02508281.2025.2611763",
  award: "Giải C - Giải thưởng Nghiên cứu khoa học Khoa Du Lịch năm 2025",
  externalArticle: {
    title: "Tương lai thị trường carbon Việt Nam nhìn từ phiên giao dịch đầu tiên tại Hà Nội",
    source: "Tạp chí Năng lượng Việt Nam",
    url: "https://nangluongvietnam.vn/tuong-lai-thi-truong-carbon-viet-nam-nhin-tu-phien-giao-dich-dau-tien-tai-ha-noi-36287.html",
    summary: "Bài viết phân tích ý nghĩa bước ngoặt của phiên giao dịch carbon thí điểm đầu tiên tại HNX với 1.210 tấn CO2, mở ra cơ chế định giá carbon minh bạch theo nguyên tắc 'người gây ô nhiễm phải trả tiền' và lộ trình phát triển thị trường tín chỉ carbon đồng bộ tại Việt Nam."
  },
  secondArticle: {
    title: "Gen Z du lịch có trách nhiệm",
    source: "Tạp chí Nhịp Cầu Đầu Tư",
    url: "https://nhipcaudautu.vn/phong-cach-song/gen-z-du-lich-co-trach-nhiem-3359234/",
    summary: "Bài viết phân tích xu hướng người trẻ Gen Z hưởng ứng mạnh mẽ lối sống du lịch bền vững và có trách nhiệm: từ các hành trình trải nghiệm xanh, giảm thiểu rác thải nhựa, ưu tiên điểm lưu trú thân thiện với môi trường đến việc chủ động lan tỏa thông điệp bảo vệ hệ sinh thái."
  },
  thirdArticle: {
    title: "Những ưu tiên du lịch của người Việt đang thay đổi từ nhận thức đến hành động",
    source: "VietnamPlus (TTXVN)",
    url: "https://www.vietnamplus.vn/nhung-uu-tien-du-lich-cua-nguoi-viet-dang-thay-doi-tu-nhan-thuc-den-hanh-dong-post1111301.vnp#google_vignette",
    summary: "Bài báo phản ánh sự chuyển dịch rõ nét trong tâm lý du khách Việt Nam hiện đại: từ mong muốn bảo vệ môi trường trên lời nói sang đòi hỏi sự rõ ràng, minh bạch trong các trải nghiệm dịch vụ xanh thực tế."
  },
  sampleSize: {
    quantitative: 255,
    qualitative: 32,
    pilot: 50,
  },
  abstractEn: `This study investigates how Generation Z tourists form support for carbon-surcharge communication in tourism, using Vietnam as an emerging-economy case. A sequential explanatory mixed-methods design combined quantitative modelling (n = 255) with qualitative interviews (n = 32). Integrating the Elaboration Likelihood Model with the Capability, Opportunity, Motivation–Behaviour (COM-B) framework, results show that support arises from cognitive understanding built through strong arguments and clear information, affective engagement sustained by balanced emotions, and moral – social motivation grounded in fairness, verification, and peer visibility. Environmental concern moderates message processing, strengthening systematic elaboration among highly concerned individuals. An exploratory direct association further indicates that greater concern enhances attention to carbon information irrespective of framing. Behavioural intention emerges when transparent and trustworthy systems enable moral conviction to become action, highlighting the psychological and contextual conditions that convert persuasive carbon-surcharge communication into low-carbon engagement.`,
  abstractViSummary: `Nghiên cứu tìm hiểu cách khách du lịch Gen Z hình thành sự ủng hộ đối với truyền thông phụ phí carbon tại Việt Nam — đại diện cho bối cảnh nền kinh tế mới nổi. Kết hợp mô hình phương trình cấu trúc PLS-SEM (n = 255) và phỏng vấn sâu định tính (n = 32) dựa trên khung tích hợp ELM và COM-B, kết quả chỉ ra rằng sự ủng hộ bắt nguồn từ: (1) Nhận thức lý tính xây dựng qua lập luận xác thực và thông tin minh bạch; (2) Cảm xúc gắn kết được duy trì bởi tâm lý cân bằng; và (3) Động lực đạo đức – xã hội dựa trên tính công bằng, dữ liệu đối soát và sự công nhận từ cộng đồng. Mối quan tâm môi trường điều tiết quá trình xử lý thông điệp, thúc đẩy tư duy phân tích sâu. Đặc biệt, ý định hành vi thực tế chỉ chuyển hóa thành công khi các hệ sinh thái minh bạch và đáng tin cậy hỗ trợ biến niềm tin đạo đức thành hành động du lịch phát thải thấp bền vững.`,
  coreIdea: `Bằng việc giải mã phản hồi tâm lý của Gen Z trước các thông điệp môi trường, nghiên cứu định vị truyền thông là chiếc cầu nối chuyển hóa. Phụ phí carbon không đơn thuần là con số kinh tế, mà là một hành trình tương tác minh bạch và gắn kết đạo đức. Nghiên cứu xây dựng chiếc cầu nối vững chắc nhằm chuyển hóa sự quan tâm của Gen Z thành những ý định hành động du lịch phát thải thấp thiết thực và bền vững.`
};

export const MILESTONES: Milestone[] = [
  {
    date: "26/7",
    phase: "Khởi động & Thử nghiệm Pilot",
    title: "Xây dựng khung công cụ & Khảo sát thí điểm 50 người",
    description: "Thiết kế bộ câu hỏi sơ bộ dựa trên thang đo ELM & COM-B, tiến hành thu thập và đánh giá độ tin cậy sơ bộ trên 50 bạn trẻ Gen Z để tinh chỉnh câu chữ.",
    keyMetric: "N = 50 Pilot"
  },
  {
    date: "22/8",
    phase: "Thu thập Định lượng diện rộng",
    title: "Triển khai khảo sát cấu trúc trực tuyến 255 mẫu",
    description: "Tiến hành thu thập dữ liệu định lượng chính thức từ 255 du khách Gen Z tại Việt Nam; làm sạch dữ liệu và tiến hành phân tích PLS-SEM trên phần mềm SmartPLS 4.",
    keyMetric: "N = 255 Mẫu hợp lệ"
  },
  {
    date: "08/9",
    phase: "Nghiên cứu Định tính chuyên sâu",
    title: "32 phiên phỏng vấn sâu bán cấu trúc với Poster 'Now or Never'",
    description: "Sử dụng công cụ trực quan (poster truyền thông phụ phí carbon) để khơi gợi đối thoại sâu về cảm xúc hy vọng, tội lỗi, tính hoài nghi và đòi hỏi chia sẻ trách nhiệm.",
    keyMetric: "N = 32 Phỏng vấn sâu"
  },
  {
    date: "17/9",
    phase: "Hoàn thiện & Tổng hợp Mô hình",
    title: "Hoàn thiện mô hình tích hợp & Báo cáo kết quả nghiên cứu",
    description: "Tổng hợp kết quả giữa PLS-SEM và phân tích định tính chủ đề; xác lập kết luận về 'Chủ nghĩa lý tưởng thực dụng' và các khuyến nghị chính sách du lịch bền vững.",
    keyMetric: "Mô hình ELM x COM-B"
  }
];

export const RESEARCH_GAPS: ResearchGap[] = [
  {
    category: "Thực tiễn",
    title: "Nghịch lý thái độ – hành vi (Attitude-Behavior Gap)",
    problem: "Khách du lịch Gen Z có mối quan tâm môi trường cao nhưng khi ra quyết định đặt vé, đặt phòng họ thường bị chi phối mạnh mẽ bởi giá cả và sự tiện lợi, tạo nên khoảng cách lớn giữa ý định và hành động thực tế.",
    solutionInStudy: "Nghiên cứu áp dụng khung COM-B để nhận diện chính xác các rào cản về cơ hội thể chất (sự tiện lợi của cổng thanh toán) và năng lực tâm lý (sự hiểu biết về hiệu quả bù trừ)."
  },
  {
    category: "Thực tiễn",
    title: "Thiếu nghiên cứu tại thị trường mới nổi",
    problem: "Phần lớn dữ liệu hiện tại tập trung ở các nước phát triển phương Tây, rất ít nghiên cứu giải mã hành vi du lịch trách nhiệm của giới trẻ tại các nền kinh tế đang chuyển dịch xanh như Việt Nam.",
    solutionInStudy: "Thu thập dữ liệu thực nghiệm bối cảnh Việt Nam, phản ánh tâm lý văn hóa và thu nhập đặc thù của người trẻ trong nước."
  },
  {
    category: "Lý thuyết",
    title: "Thiếu góc nhìn tích hợp cảm xúc & động lực đạo đức",
    problem: "Các nghiên cứu trước chủ yếu nhìn nhận việc bù trừ carbon qua lăng kính kinh tế duy lý (sẵn lòng chi trả, tuân thủ chính sách), bỏ quên khía cạnh cảm xúc, bản sắc cá nhân và động lực đạo đức.",
    solutionInStudy: "Đưa yếu tố cảm xúc (hy vọng, tự hào, tội lỗi) và tính minh bạch đạo đức vào vai trò trung gian trong mô hình thuyết phục."
  },
  {
    category: "Lý thuyết",
    title: "Hạn chế của mô hình đơn lẻ (ELM đơn thuần)",
    problem: "Các mô hình thuyết phục như ELM giải thích tốt cách hình thành thái độ nhưng chưa làm rõ các điều kiện bối cảnh và cơ chế hệ thống cần thiết để chuyển hóa thái độ thành hành vi thực tế.",
    solutionInStudy: "Tích hợp mô hình ELM với khung sinh thái hành vi COM-B, tạo nên chiếc cầu nối hoàn chỉnh từ xử lý thông điệp tới hành động tham gia."
  }
];

export const THEORETICAL_FRAMEWORK = {
  elm: {
    name: "Mô hình Xác suất Soạn thảo (Elaboration Likelihood Model - ELM)",
    shortName: "Mô hình ELM",
    authors: "Richard E. Petty & John T. Cacioppo",
    year: "1986",
    citation: "Petty, R. E., & Cacioppo, J. T. (1986). Communication and persuasion: central and peripheral routes to attitude change.",
    description: "Giải thích cách du khách Gen Z xử lý thông điệp phụ phí carbon thông qua 2 tuyến nhận thức:",
    centralRoute: {
      name: "Tuyến trung tâm (Central Route)",
      desc: "Xử lý sâu dựa trên chất lượng lập luận, số liệu kiểm toán cụ thể, tính logic và thông tin đối soát minh bạch của khoản phụ phí carbon."
    },
    peripheralRoute: {
      name: "Tuyến ngoại vi (Peripheral Route)",
      desc: "Xử lý nhanh dựa trên tín hiệu trực quan, poster truyền thông, uy tín người phát ngôn, cảm xúc hy vọng và niềm tự hào."
    }
  },
  comb: {
    name: "Khung Sinh Thái Hành Vi COM-B (Capability, Opportunity, Motivation - Behaviour)",
    shortName: "Khung COM-B",
    authors: "Susan Michie, Maartje M. van Stralen, & Robert West",
    year: "2011",
    citation: "Michie, S., van Stralen, M. M., & West, R. (2011). The behaviour change wheel: A new method for characterising and designing behaviour change interventions.",
    description: "Lăng kính chẩn đoán sinh thái hành vi, chỉ ra điều kiện để biến nhận thức thành hành động:",
    capability: "Năng lực (Capability): Nhận thức rõ ràng về cơ chế phụ phí carbon và hiểu rõ đồng tiền đóng góp đi đâu.",
    opportunity: "Cơ hội (Opportunity): Giao diện thanh toán tiện lợi 1 chạm, chi phí hợp lý, chính sách rõ ràng tại điểm đặt phòng/vé.",
    motivation: "Động lực (Motivation): Niềm tin vào tác động tích cực, cảm xúc tự hào, cùng trách nhiệm bảo tồn thiên nhiên."
  },
  foundations: [
    {
      theoryName: "Thuyết Sẵn sàng Chi trả cho Môi trường (Willingness to Pay - WTP in Tourism)",
      authors: "Susanne Becken",
      year: "2004",
      citation: "Becken, S. (2004). How tourists and tourism experts perceive climate change and carbon-offsetting schemes.",
      topic: "Đặt nền tảng lý thuyết đo lường mức độ sẵn sàng chi trả thêm cho các giải pháp giảm thiểu phát thải và phân tích nhận thức của du khách về biến đổi khí hậu."
    },
    {
      theoryName: "Khung Bù đắp Carbon Tự nguyện & Hoài nghi (Voluntary Carbon Offsetting - VCO)",
      authors: "Evert Eijgelaar",
      year: "2011",
      citation: "Eijgelaar, E. (2011). Voluntary carbon offsetting issues and challenges for the tourism sector.",
      topic: "Phân tích cơ chế phụ phí bù trừ carbon tự nguyện, chỉ ra các rào cản tâm lý hoài nghi (greenwashing) và sự cần thiết của cơ chế kiểm chứng minh bạch dữ liệu."
    },
    {
      theoryName: "Thuyết Mô hình Sinh thái Mới (New Ecological Paradigm - NEP)",
      authors: "Riley E. Dunlap & Robert Emmet Jones",
      year: "2002",
      citation: "Dunlap, R. E., & Jones, R. E. (2002). Environmental concern: Conceptual and measurement issues.",
      topic: "Thang đo chuẩn mực quốc tế về thế giới quan sinh thái, được kế thừa để đo lường mối quan tâm môi trường (biến điều tiết) của du khách trẻ."
    }
  ]
};

export const KEY_FINDINGS: Finding[] = [
  {
    id: "pragmatic_idealism",
    title: "Chủ nghĩa lý tưởng thực dụng",
    englishTerm: "Pragmatic Idealism",
    shortDesc: "Gen Z sẵn sàng đóng góp phụ phí carbon nếu thông điệp rõ ràng, có dữ liệu đối soát minh bạch và tiện lợi khi thanh toán.",
    fullAnalysis: "Gen Z không phản đối việc đóng góp cho môi trường, nhưng họ từ chối những lời kêu gọi sáo rỗng. Họ muốn thấy bằng chứng cụ thể: số kg CO2 được bù đắp, định vị dự án trồng rừng hoặc năng lượng sạch bằng mã QR, và quy trình thanh toán diễn ra mượt mà trong 1 chạm ngay lúc đặt vé.",
    implication: "Doanh nghiệp lữ hành cần số hóa dữ liệu đối soát và tích hợp phụ phí liền mạch vào quy trình checkout, không bắt người dùng qua nhiều trang phụ."
  },
  {
    id: "positive_emotions",
    title: "Cảm xúc tích cực duy trì cam kết",
    englishTerm: "Positive Emotions Over Fear & Guilt",
    shortDesc: "Cảm xúc hy vọng và tự hào giúp duy trì hành động lâu dài hơn cảm giác tội lỗi hay sợ hãi.",
    fullAnalysis: "Chiến thuật 'gây cảm giác tội lỗi' (guilt-tripping) hay hù dọa về thảm họa môi trường dễ gây ra phản ứng tự vệ tâm lý (psychological reactance) và hoài nghi rằng doanh nghiệp đang 'tẩy xanh' (greenwashing). Ngược lại, thông điệp truyền cảm hứng về tác động tích cực tập thể khơi dậy niềm tự hào và sự gắn kết.",
    implication: "Chuyển đổi tông giọng truyền thông từ 'Nếu bạn không bù đắp, bạn đang hủy hoại trái đất' sang 'Cùng bạn kiến tạo 100 hecta rừng mới vì tương lai xanh'."
  },
  {
    id: "dual_process_persuasion",
    title: "Cơ chế thuyết phục kép và sự phân hóa tiếp nhận",
    englishTerm: "Dual-Process Persuasion & Audience Segmentation",
    shortDesc: "Cả lập luận logic lẫn tín hiệu cảm xúc đều tác động đến nhận thức thông điệp và thái độ.",
    fullAnalysis: "Cả lập luận logic lẫn tín hiệu cảm xúc trực quan đều tác động đến nhận thức thông điệp và thái độ. Nhóm quan tâm môi trường cao xử lý theo tư duy phân tích (tuyến trung tâm), trong khi nhóm ít quan tâm hơn phụ thuộc vào tín hiệu cảm xúc (tuyến ngoại vi); tuy nhiên, tầng đệm minh bạch và xác thực kết quả là điều kiện tiên quyết để củng cố niềm tin cho cả hai nhóm.",
    implication: "Kết hợp truyền thông phân hóa theo mức độ quan tâm môi trường của du khách, đồng thời luôn cung cấp công cụ đối soát dữ liệu và minh bạch kết quả để củng cố niềm tin."
  },
  {
    id: "system_alignment",
    title: "Đồng bộ giữa truyền thông và hệ thống",
    englishTerm: "Communication-System Synchrony",
    shortDesc: "Truyền thông thuyết phục sẽ thất bại nếu gặp rào cản vận hành (giao diện thanh toán phức tạp, thiếu kiểm toán độc lập).",
    fullAnalysis: "Mọi chiến dịch truyền thông thuyết phục đều sẽ sụp đổ nếu đối mặt với rào cản vận hành như thanh toán phức tạp, dòng tiền mờ ám hoặc cảm giác doanh nghiệp đùn đẩy trách nhiệm. Động lực nhận thức chỉ chuyển hóa thành hành vi du lịch phát thải thấp khi được nâng đỡ bởi một hệ thống công bằng, minh bạch và liền mạch.",
    implication: "Truyền thông môi trường và đội ngũ sản phẩm công nghệ (Product/UX) phải làm việc đồng bộ để biến ý định thành hành động chỉ trong 3 giây."
  }
];

export const SURVEY_QUESTIONS = [
  {
    id: "ageGroup",
    number: 1,
    question: "Bạn thuộc độ tuổi nào?",
    options: [
      "Dưới 18 tuổi",
      "18–22 tuổi",
      "23–29 tuổi",
      "30 tuổi trở lên"
    ],
    benchmark: {
      "Dưới 18 tuổi": 4.7,
      "18–22 tuổi": 62.4,
      "23–29 tuổi": 29.8,
      "30 tuổi trở lên": 3.1
    }
  },
  {
    id: "traveledPastYear",
    number: 2,
    question: "Trong 12 tháng qua, bạn đã đi du lịch giải trí chưa?",
    options: [
      "Có",
      "Chưa"
    ],
    benchmark: {
      "Có": 91.8,
      "Chưa": 8.2
    }
  },
  {
    id: "carbonOffsetUnderstanding",
    number: 3,
    question: "Bạn hiểu carbon offset ở mức độ nào?",
    options: [
      "Chưa từng nghe",
      "Đã nghe nhưng chưa hiểu rõ",
      "Hiểu khái niệm cơ bản",
      "Hiểu tương đối rõ cách hoạt động"
    ],
    benchmark: {
      "Chưa từng nghe": 18.4,
      "Đã nghe nhưng chưa hiểu rõ": 47.1,
      "Hiểu khái niệm cơ bản": 25.5,
      "Hiểu tương đối rõ cách hoạt động": 9.0
    }
  },
  {
    id: "trustFactor",
    number: 4,
    question: "Điều gì khiến bạn tin tưởng một chương trình bù đắp carbon?",
    options: [
      "Có dữ liệu và chứng nhận kiểm chứng",
      "Công khai cách sử dụng nguồn tiền",
      "Có kết quả tác động rõ ràng",
      "Được tổ chức uy tín giới thiệu"
    ],
    benchmark: {
      "Có dữ liệu và chứng nhận kiểm chứng": 41.2,
      "Công khai cách sử dụng nguồn tiền": 32.5,
      "Có kết quả tác động rõ ràng": 17.6,
      "Được tổ chức uy tín giới thiệu": 8.7
    }
  },
  {
    id: "willingnessToContribute",
    number: 5,
    question: "Nếu được cung cấp thông tin minh bạch, bạn có sẵn sàng đóng góp cho chương trình bù đắp carbon khi đi du lịch không?",
    options: [
      "Chắc chắn không",
      "Có thể không",
      "Chưa quyết định",
      "Có thể có",
      "Chắc chắn có"
    ],
    benchmark: {
      "Chắc chắn không": 2.4,
      "Có thể không": 5.9,
      "Chưa quyết định": 15.3,
      "Có thể có": 48.6,
      "Chắc chắn có": 27.8
    }
  },
  {
    id: "biggestBarrier",
    number: 6,
    question: "Điều gì là rào cản lớn nhất khiến bạn chưa muốn tham gia?",
    options: [
      "Thông tin chưa rõ ràng",
      "Chi phí phát sinh",
      "Thiếu niềm tin vào hiệu quả",
      "Bất tiện khi đăng ký",
      "Chưa thấy cần thiết"
    ],
    benchmark: {
      "Thông tin chưa rõ ràng": 36.5,
      "Thiếu niềm tin vào hiệu quả": 28.2,
      "Chi phí phát sinh": 18.0,
      "Bất tiện khi đăng ký": 12.2,
      "Chưa thấy cần thiết": 5.1
    }
  }
];

export const IMAGES = {
  hero: "/src/assets/images/netzero_hero_globe_1791739170444.jpg",
  carbonMarket: "/src/assets/images/carbon_market_vn_1792165708142.jpg",
  greenTravel: "/src/assets/images/hero_green_travel_1791684059703.jpg",
  poster: "/src/assets/images/poster_now_or_never_1791684071312.jpg",
  conservation: "/src/assets/images/sustainable_tourism_vietnam_1791684083162.jpg"
};
