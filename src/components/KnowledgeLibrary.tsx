import React from 'react';
import { RESEARCH_INFO, IMAGES } from '../data/researchData';

export const KnowledgeLibrary: React.FC = () => {
  const glossaryItems = [
    {
      term: "Carbon Surcharge (Phụ phí carbon)",
      meaning: "Khoản phí bổ sung được tính trên giá dịch vụ du lịch (vé máy bay, phòng khách sạn, tour) nhằm bù đắp lượng khí thải nhà kính (CO2e) phát sinh trong suốt hành trình.",
      roleInStudy: "Được định vị không đơn thuần là chi phí kinh tế mà là công cụ kết nối đạo đức và minh bạch giữa du khách và nhà cung cấp dịch vụ."
    },
    {
      term: "Carbon Offset (Bù đắp carbon)",
      meaning: "Cơ chế đầu tư tài chính vào các dự án giảm phát thải (trồng và phục hồi rừng, năng lượng tái tạo, bảo tồn sinh học) để triệt tiêu lượng carbon do du khách tạo ra.",
      roleInStudy: "Yếu tố cốt lõi đòi hỏi minh bạch kiểm toán (mã QR, định vị địa lý) để vượt qua tâm lý hoài nghi của Gen Z."
    },
    {
      term: "Attitude - Behavior Gap (Nghịch lý thái độ - hành vi)",
      meaning: "Hiện tượng người tiêu dùng bày tỏ sự ủng hộ mạnh mẽ với bảo vệ môi trường trong khảo sát nhưng lại ưu tiên giá rẻ và sự tiện lợi khi thực tế chi tiền.",
      roleInStudy: "Nghiên cứu chỉ ra nghịch lý này giải quyết được khi loại bỏ rào cản thao tác (Opportunity) và tăng cường niềm tin đối ứng từ doanh nghiệp."
    },
    {
      term: "Greenwashing Skepticism (Hoài nghi 'Tẩy xanh')",
      meaning: "Sự nghi ngờ của du khách rằng doanh nghiệp đưa ra các thông điệp môi trường chỉ để đánh bóng thương hiệu hoặc thu thêm phụ phí để trục lợi.",
      roleInStudy: "Chiến thuật truyền thông dựa trên cảm giác tội lỗi (guilt) kích hoạt mạnh mẽ sự hoài nghi này, trong khi sự minh bạch 50-50 hóa giải nó."
    }
  ];

  return (
    <section id="library" className="py-12 sm:py-20 bg-stone-50 border-t border-stone-200">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="mb-12 max-w-5xl">
          <div className="text-sm font-semibold text-[#01914c] uppercase tracking-wider mb-2">
            Thư viện tri thức & Báo chí
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Tài Liệu Chuyên Đề & Bài Báo Bối Cảnh
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
            Nguồn tư liệu tham khảo, bài báo chuyên sâu trên báo chí chính thống và bảng thuật ngữ nền tảng về kinh tế carbon trong du lịch.
          </p>
        </div>

        {/* Featured Articles Grid spanning full width (3 articles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 w-full">
          
          {/* Card 1: Năng Lượng Việt Nam Press Article */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
            {/* Top Image */}
            <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100">
              <img
                src={IMAGES.carbonMarket}
                alt="Tương lai thị trường carbon Việt Nam - Tạp chí Năng lượng Việt Nam"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="p-7 flex flex-col justify-between flex-1">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#01914c] mb-2">
                  {RESEARCH_INFO.externalArticle.source}
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-3">
                  {RESEARCH_INFO.externalArticle.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6 line-clamp-3">
                  {RESEARCH_INFO.externalArticle.summary}
                </p>
              </div>

              <div>
                <a
                  href={RESEARCH_INFO.externalArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#32629b] hover:bg-[#284f7e] text-white text-base font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  Đọc thêm
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Nhịp Cầu Đầu Tư Press Article */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
            {/* Top Image */}
            <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100">
              <img
                src={IMAGES.greenTravel}
                alt="Gen Z du lịch có trách nhiệm - Tạp chí Nhịp Cầu Đầu Tư"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="p-7 flex flex-col justify-between flex-1">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#01914c] mb-2">
                  {RESEARCH_INFO.secondArticle.source}
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-3">
                  {RESEARCH_INFO.secondArticle.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6 line-clamp-3">
                  {RESEARCH_INFO.secondArticle.summary}
                </p>
              </div>

              <div>
                <a
                  href={RESEARCH_INFO.secondArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#32629b] hover:bg-[#284f7e] text-white text-base font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  Đọc thêm
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: VietnamPlus Press Article */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
            {/* Top Image */}
            <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100">
              <img
                src={IMAGES.conservation}
                alt="Du lịch bền vững Việt Nam - VietnamPlus"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="p-7 flex flex-col justify-between flex-1">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#01914c] mb-2">
                  {RESEARCH_INFO.thirdArticle.source}
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-3">
                  {RESEARCH_INFO.thirdArticle.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6 line-clamp-3">
                  {RESEARCH_INFO.thirdArticle.summary}
                </p>
              </div>

              <div>
                <a
                  href={RESEARCH_INFO.thirdArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#32629b] hover:bg-[#284f7e] text-white text-base font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  Đọc thêm
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Glossary Grid */}
        <div>
          <div className="mb-6">
            <h3 className="font-heading text-2xl font-bold text-stone-900">
              Bảng Thuật Ngữ Cốt Lõi (Terminology)
            </h3>
            <p className="text-base text-stone-600 mt-1">
              Hiểu đúng các khái niệm kinh tế môi trường và tâm lý học hành vi được áp dụng trong đề tài:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {glossaryItems.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-bold text-lg text-stone-900 mb-2">
                    {item.term}
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {item.meaning}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-100 text-xs sm:text-sm text-[#01914c] font-medium">
                  <strong>Ứng dụng:</strong> {item.roleInStudy}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
