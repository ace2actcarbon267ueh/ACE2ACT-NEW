import React from 'react';
import { ActiveSection } from '../types';
import { RESEARCH_INFO } from '../data/researchData';
import heroImage from '../assets/images/netzero_hero_globe_1791739170444.jpg';
import { ArrowRight, BookOpen, Sparkles, Award } from 'lucide-react';

interface HeroSectionProps {
  setActiveSection: (section: ActiveSection) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveSection }) => {
  return (
    <section className="relative overflow-hidden py-6 lg:py-8 border-b border-stone-200">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* 2-Column Balanced Grid spanning full width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Title & Mission */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-heading text-3xl lg:text-[32px] xl:text-[38px] font-extrabold tracking-tight text-stone-900 leading-[1.15] mb-4 [text-wrap:balance]">
              Turning persuasion into participation: how Gen Z tourists respond to carbon surcharge communication
            </h1>

            <p className="text-sm lg:text-[15px] text-stone-700 leading-relaxed font-normal mb-5">
              Nghiên cứu “Turning Persuasion into Participation: How Gen Z Tourists Respond to Carbon-Surcharge Communication” tập trung những yếu tố ảnh hưởng đến nhận thức, thái độ, ý định tham gia các hoạt động bù đắp carbon. Kết quả nghiên cứu cho thấy chất lượng lập luận và các tín hiệu ngoại vi ảnh hưởng đến nhận thức về phụ phí carbon của Gen Z, từ đó ảnh hưởng đến thái độ và ý định hành động. Bên cạnh đó, nghiên cứu định tính nhấn mạnh vai trò của độ tin cậy, tính minh bạch trong việc sử dụng khoản phụ phí và những rào cản có thể khiến ý định chưa chuyển thành hành động thực tế.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveSection('research')}
                className="px-7 py-3.5 bg-[#01914c] hover:bg-[#01783e] active:scale-[0.98] text-white text-base font-semibold rounded-md transition-all shadow-sm flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a40d2]"
              >
                <span>Khám phá toàn bộ nghiên cứu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveSection('survey')}
                className="px-6 py-3.5 bg-[#dbf067] hover:bg-[#cde455] text-stone-950 text-base font-semibold rounded-md transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01914c]"
              >
                <span>Thực hiện khảo sát</span>
              </button>
            </div>

            {/* Publication citation link */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex items-center gap-4 text-sm text-stone-500">
              <span className="font-semibold text-stone-700">DOI chính thức:</span>
              <a
                href={RESEARCH_INFO.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2a40d2] hover:underline font-mono truncate max-w-xs sm:max-w-lg"
              >
                https://doi.org/{RESEARCH_INFO.doi}
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Photography & Website Introduction */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 aspect-[4/3] lg:aspect-auto lg:h-[280px]">
              <img
                src={heroImage}
                alt="Net Zero - Phát thải ròng bằng 0 trong du lịch và bảo tồn sinh thái"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Overlay Caption Scrim */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent p-6 text-white">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#dbf067] mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Mục tiêu Net Zero & Du lịch phát thải thấp</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-snug">
                  Nghiên cứu thực nghiệm kết nối nhận thức và hành động bù đắp carbon của Gen Z hướng tới mục tiêu trung hòa carbon.
                </p>
              </div>
            </div>

            {/* Nội dung giới thiệu website sau hình ảnh */}
            <div className="mt-3 p-4 rounded-xl bg-white border border-stone-200/90 shadow-xs">
              <p className="text-sm text-stone-600 leading-relaxed font-normal">
                Website được phát triển nhằm kết nối tri thức khoa học với các ứng dụng thực tiễn về môi trường trong lĩnh vực du lịch. Website là nơi đăng tải bài nghiên cứu, cập nhật thông tin về dự án tiếp theo, cung cấp kiến thức môi trường và công cụ tính toán lượng phát thải carbon trong du lịch, từ đó góp phần nâng cao nhận thức và khuyến khích những lựa chọn du lịch bền vững hơn.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
