import React, { useState } from 'react';
import {
  RESEARCH_INFO,
  MILESTONES,
  RESEARCH_GAPS,
  THEORETICAL_FRAMEWORK,
  KEY_FINDINGS
} from '../data/researchData';
import {
  Check,
  Copy,
  ExternalLink,
  Award,
  Calendar,
  Layers,
  Search,
  Zap,
  TrendingUp,
  ShieldCheck,
  Heart,
  Scale,
  Cpu
} from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'theory' | 'methodology' | 'findings' | 'citation'>('overview');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const apaCitation = `ACE2ACT Research Group. (2026). Turning persuasion into participation: how Gen Z tourists respond to carbon surcharge communication. Tourism Recreation Research. https://doi.org/${RESEARCH_INFO.doi}`;

  const bibtexCitation = `@article{ace2act2026turning,
  title={Turning persuasion into participation: how Gen Z tourists respond to carbon surcharge communication},
  author={ACE2ACT Research Group},
  journal={Tourism Recreation Research},
  year={2026},
  publisher={Taylor & Francis},
  doi={${RESEARCH_INFO.doi}}
}`;

  const handleCopyCitation = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <section id="research" className="py-12 sm:py-20 bg-[#fcfdf9]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-5xl mx-auto">
          <div className="text-sm font-semibold text-[#01914c] uppercase tracking-wider mb-2">
            Công trình nghiên cứu khoa học
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-snug mb-3 [text-wrap:balance]">
            Turning persuasion into participation: how Gen Z tourists respond to carbon-surcharge communication
          </h2>
          <div className="text-sm sm:text-base text-[#2a40d2] font-semibold mb-3">
            Khung Nghiên Cứu & Phát Hiện Thực Nghiệm
          </div>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl mx-auto">
            Giải mã cơ chế tâm lý và hành vi của khách du lịch thế hệ Z tại Việt Nam trong việc tiếp nhận và chuyển hóa thông điệp phụ phí carbon.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="w-full max-w-7xl mx-auto mb-12">
          <div className="flex items-center justify-start xl:justify-center overflow-x-auto gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-stone-100/90 rounded-xl border border-stone-200/80 no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 min-w-max px-3 sm:px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer text-center ${
                activeTab === 'overview'
                  ? 'bg-white text-stone-950 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              01. Ý tưởng & Tổng quan
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 min-w-max px-3 sm:px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer text-center ${
                activeTab === 'timeline'
                  ? 'bg-white text-stone-950 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              02. Mốc thời gian
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`flex-1 min-w-max px-3 sm:px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer text-center ${
                activeTab === 'theory'
                  ? 'bg-white text-stone-950 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              03. Lý thuyết ELM × COM-B
            </button>
            <button
              onClick={() => setActiveTab('methodology')}
              className={`flex-1 min-w-max px-3 sm:px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer text-center ${
                activeTab === 'methodology'
                  ? 'bg-white text-stone-950 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              04. Phương pháp & Mẫu
            </button>
            <button
              onClick={() => setActiveTab('findings')}
              className={`flex-1 min-w-max px-3 sm:px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer text-center ${
                activeTab === 'findings'
                  ? 'bg-white text-[#01914c] shadow-sm font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              05. Phát hiện nổi bật
            </button>
            <button
              onClick={() => setActiveTab('citation')}
              className={`flex-1 min-w-max px-3 sm:px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer text-center ${
                activeTab === 'citation'
                  ? 'bg-white text-[#2a40d2] shadow-sm font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              06. Công bố & Trích dẫn
            </button>
          </div>
        </div>

        {/* Tab Content 1: Overview & Idea */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Core Mission Banner */}
            <div className="bg-white p-6 sm:p-10 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-full">
                <div className="text-sm font-semibold text-[#01914c] uppercase tracking-wider mb-2">
                  Tóm tắt nghiên cứu (Abstract)
                </div>
                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 mb-4 leading-snug">
                  Chiếc cầu nối chuyển hóa: Từ nhận thức đến hành động du lịch phát thải thấp
                </h3>
                <p className="text-stone-700 leading-relaxed text-base sm:text-lg">
                  {RESEARCH_INFO.abstractViSummary}
                </p>
              </div>
            </div>

            {/* Research Gaps (Khoảng trống nghiên cứu) */}
            <div>
              <div className="mb-6">
                <h3 className="font-heading text-2xl font-bold text-stone-900">
                  Khoảng Trống Nghiên Cứu (Research Gaps)
                </h3>
                <p className="text-base text-stone-600 mt-1">
                  Đề tài giải quyết trực tiếp 4 khoảng trống cấp thiết về cả thực tiễn và lý thuyết:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {RESEARCH_GAPS.map((gap, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
                        <span className={gap.category === 'Thực tiễn' ? 'text-[#01914c]' : 'text-[#2a40d2]'}>
                          Khía cạnh: {gap.category}
                        </span>
                        <span>0{index + 1}</span>
                      </div>
                      <h4 className="font-heading font-bold text-base text-stone-900 mb-3">
                        {gap.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                        <strong className="text-stone-800">Thực trạng:</strong> {gap.problem}
                      </p>
                    </div>

                    <div className="mt-2 pt-4 border-t border-stone-100 bg-[#f9fbf7] p-3 rounded-md">
                      <div className="text-xs font-semibold text-[#01914c] mb-1">
                        Giải pháp đóng góp trong đề tài:
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {gap.solutionInStudy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Timeline */}
        {activeTab === 'timeline' && (
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-stone-200">
            <div className="max-w-2xl mb-8">
              <h3 className="font-heading text-xl font-bold text-stone-900">
                Mốc Thời Gian Chính Của Đề Tài
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Lộ trình triển khai tuần tự từ chuẩn hóa công cụ, khảo sát diện rộng, phỏng vấn sâu đến hoàn thiện mô hình.
              </p>
            </div>

            <div className="relative border-l-2 border-[#01914c]/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
              {MILESTONES.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[#01914c] group-hover:scale-110 transition-transform" />
                  
                  <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs">
                    <span className="font-bold text-[#01914c] text-sm tabular-data">{item.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-stone-500">{item.phase}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#2a40d2] bg-blue-50 px-2 py-0.5 rounded text-[11px]">{item.keyMetric}</span>
                  </div>

                  <h4 className="font-heading text-base sm:text-lg font-bold text-stone-900 mb-2">
                    {item.title}
                  </h4>

                  <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 3: Theory Framework (ELM x COM-B) */}
        {activeTab === 'theory' && (
          <div className="space-y-10">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200">
              <div className="max-w-3xl mb-8">
                <div className="text-xs font-semibold text-[#2a40d2] uppercase tracking-wider mb-2">
                  Khung lý thuyết tích hợp
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 mb-3">
                  Mô hình Kết hợp ELM & Khung Sinh thái Hành vi COM-B
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  Thay vì dùng đơn lẻ các lý thuyết kinh tế duy lý hay chỉ giải thích thái độ, nghiên cứu tích hợp hai mô hình bổ trợ: ELM đóng vai trò giải thích quá trình xử lý thuyết phục của nhận thức, còn COM-B đóng vai trò chẩn đoán các điều kiện hệ thống cần thiết để tạo ra hành vi du lịch phát thải thấp.
                </p>
              </div>

              {/* Integrated Visual Model Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-stone-200">
                {/* Column 1: ELM */}
                <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                  <div className="mb-3">
                    <h4 className="font-heading font-bold text-base text-stone-900 leading-snug">
                      1. {THEORETICAL_FRAMEWORK.elm.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-1.5">
                      <span className="font-semibold text-stone-800">Tác giả:</span>
                      <span className="font-medium text-stone-700">{THEORETICAL_FRAMEWORK.elm.authors}</span>
                      <span className="text-stone-300">·</span>
                      <span className="font-mono font-semibold text-[#01914c]">{THEORETICAL_FRAMEWORK.elm.year}</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 mb-5 leading-relaxed">
                    {THEORETICAL_FRAMEWORK.elm.description}
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md border border-stone-200">
                      <div className="text-xs font-bold text-[#01914c] mb-1">
                        Tuyến trung tâm (Central Route)
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {THEORETICAL_FRAMEWORK.elm.centralRoute.desc}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-md border border-stone-200">
                      <div className="text-xs font-bold text-[#2a40d2] mb-1">
                        Tuyến ngoại vi (Peripheral Route)
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {THEORETICAL_FRAMEWORK.elm.peripheralRoute.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 2: COM-B */}
                <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                  <div className="mb-3">
                    <h4 className="font-heading font-bold text-base text-stone-900 leading-snug">
                      2. {THEORETICAL_FRAMEWORK.comb.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-1.5">
                      <span className="font-semibold text-stone-800">Tác giả:</span>
                      <span className="font-medium text-stone-700">{THEORETICAL_FRAMEWORK.comb.authors}</span>
                      <span className="text-stone-300">·</span>
                      <span className="font-mono font-semibold text-[#2a40d2]">{THEORETICAL_FRAMEWORK.comb.year}</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 mb-5 leading-relaxed">
                    {THEORETICAL_FRAMEWORK.comb.description}
                  </p>

                  <div className="space-y-3">
                    <div className="bg-white p-3.5 rounded-md border border-stone-200">
                      <div className="text-xs font-bold text-stone-900 mb-0.5">
                        Năng lực (Capability)
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        Hiểu biết rõ ràng về ý nghĩa phụ phí carbon; không bị bối rối trước các định nghĩa chuyên môn.
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-md border border-stone-200">
                      <div className="text-xs font-bold text-stone-900 mb-0.5">
                        Cơ hội (Opportunity)
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        Cổng thanh toán thuận tiện, tích hợp 1 chạm tại bước đặt vé; doanh nghiệp cùng chia sẻ kinh phí.
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-md border border-stone-200">
                      <div className="text-xs font-bold text-stone-900 mb-0.5">
                        Động lực (Motivation)
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        Cảm xúc hy vọng và tự hào; niềm tin đạo đức không bị hoài nghi là hành vi tẩy xanh (greenwashing).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Foundational Literature (Tài liệu nền tảng) */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200">
              <div className="mb-5">
                <div className="text-xs font-semibold text-[#01914c] uppercase tracking-wider mb-1">
                  Cơ sở học thuật kế thừa
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-900">
                  Các Lý Thuyết & Mô Hình Nền Tảng Kế Thừa (Foundational Theories)
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Các lý thuyết kinh điển và nghiên cứu thực nghiệm quốc tế được kế thừa để thiết kế biến số và thang đo trong đề tài.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {THEORETICAL_FRAMEWORK.foundations.map((item, i) => (
                  <div key={i} className="p-5 rounded-lg bg-stone-50 border border-stone-200/90 flex flex-col justify-between">
                    <div>
                      {/* Tên lý thuyết rõ ràng */}
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#2a40d2] mb-1">
                        Lý thuyết {i + 1}
                      </div>
                      <h4 className="font-heading text-sm sm:text-base font-bold text-stone-900 leading-snug mb-2.5">
                        {item.theoryName}
                      </h4>

                      {/* Tên tác giả và năm ở dưới */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-white px-2.5 py-1.5 rounded border border-stone-200 mb-3">
                        <span className="font-semibold text-stone-900">Tác giả:</span>
                        <span className="font-medium text-stone-800">{item.authors}</span>
                        <span className="text-stone-300">·</span>
                        <span className="font-mono font-semibold text-[#01914c]">{item.year}</span>
                      </div>

                      {/* Mô tả vai trò kế thừa */}
                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {item.topic}
                      </p>
                    </div>

                    {item.citation && (
                      <div className="pt-2.5 border-t border-stone-200/70 text-[11px] text-stone-500 italic">
                        {item.citation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Methodology & Samples */}
        {activeTab === 'methodology' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200">
              <div className="max-w-3xl mb-8">
                <div className="text-xs font-semibold text-[#01914c] uppercase tracking-wider mb-2">
                  Thiết kế nghiên cứu
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 mb-3">
                  Phương Pháp Hỗn Hợp Tuần Tự Giải Thích (Sequential Explanatory Mixed-Methods)
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  Thiết kế gồm hai giai đoạn phối hợp chặt chẽ: Dữ liệu định lượng kiểm định mô hình phương trình cấu trúc PLS-SEM trên mẫu 255 khách du lịch Gen Z, sau đó dữ liệu định tính phỏng vấn sâu 32 đối tượng giúp đào sâu bản chất cảm xúc và giải thích cặn kẽ các mối quan hệ thống kê.
                </p>
              </div>

              {/* Phase Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
                <div className="bg-[#f2f7ef] p-6 rounded-lg border border-[#01914c]/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#01914c] uppercase">Giai đoạn 1 · Định lượng (Quantitative)</span>
                    <span className="text-xs font-mono font-bold text-stone-700">N = 255</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-stone-900 mb-2">
                    Khảo sát cấu trúc & PLS-SEM
                  </h4>
                  <ul className="text-xs text-stone-700 space-y-2 leading-relaxed">
                    <li>• <strong>Công cụ:</strong> Khảo sát trực tuyến với thang đo Likert 7 điểm chuẩn hóa.</li>
                    <li>• <strong>Phần mềm phân tích:</strong> SmartPLS 4 (Partial Least Squares Structural Equation Modeling).</li>
                    <li>• <strong>Đối tượng:</strong> Khách du lịch thuộc thế hệ Gen Z (sinh năm 1997 - 2012) tại Việt Nam.</li>
                    <li>• <strong>Mục tiêu:</strong> Đo lường tác động của các tuyến truyền thông lên thái độ và ý định sẵn lòng đóng góp.</li>
                  </ul>
                </div>

                <div className="bg-[#f0f3fa] p-6 rounded-lg border border-[#2a40d2]/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#2a40d2] uppercase">Giai đoạn 2 · Định tính (Qualitative)</span>
                    <span className="text-xs font-mono font-bold text-stone-700">N = 32</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-stone-900 mb-2">
                    Phỏng vấn sâu bán cấu trúc với Poster "Now or Never"
                  </h4>
                  <ul className="text-xs text-stone-700 space-y-2 leading-relaxed">
                    <li>• <strong>Công cụ trực quan:</strong> Poster truyền thông với khẩu hiệu "Now or Never" khơi gợi phản xạ tâm lý.</li>
                    <li>• <strong>Phương pháp:</strong> Phỏng vấn sâu bán cấu trúc (In-depth semi-structured interviews).</li>
                    <li>• <strong>Mục tiêu:</strong> Làm rõ rào cản tâm lý hoài nghi, nhu cầu đối ứng của doanh nghiệp và cảm xúc hy vọng.</li>
                    <li>• <strong>Thử nghiệm Pilot:</strong> 50 người tham gia khảo sát thử nghiệm trước đó để hoàn thiện công cụ.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sample Demographics Summary */}
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <h4 className="font-heading text-base font-bold text-stone-900 mb-4">
                Cơ cấu mẫu nghiên cứu thực nghiệm
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="text-xs text-stone-500 mb-1">Khảo sát pilot tiền khả thi</div>
                  <div className="text-2xl font-extrabold text-stone-900 tabular-data">50</div>
                  <div className="text-xs text-stone-600 mt-1">Đánh giá độ tin cậy sơ bộ</div>
                </div>
                <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <div className="text-xs text-[#01914c] mb-1">Mẫu khảo sát chính thức</div>
                  <div className="text-2xl font-extrabold text-[#01914c] tabular-data">255</div>
                  <div className="text-xs text-stone-600 mt-1">Du khách Gen Z tại Việt Nam</div>
                </div>
                <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-100">
                  <div className="text-xs text-[#2a40d2] mb-1">Phiên phỏng vấn sâu</div>
                  <div className="text-2xl font-extrabold text-[#2a40d2] tabular-data">32</div>
                  <div className="text-xs text-stone-600 mt-1">Dữ liệu định tính giải thích</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 5: Key Findings */}
        {activeTab === 'findings' && (
          <div className="space-y-6">
            <div className="max-w-5xl mb-8">
              <div className="text-sm font-semibold text-[#01914c] uppercase tracking-wider mb-2">
                Kết quả thực nghiệm
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                Phát Hiện Nổi Bật Về Hành Vi Gen Z
              </h3>
              <p className="text-base text-stone-600 leading-relaxed">
                Những insight có giá trị lý luận và thực tiễn sâu sắc cho các nhà hoạch định chính sách du lịch và doanh nghiệp lữ hành.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {KEY_FINDINGS.map((finding, idx) => (
                <div
                  key={finding.id}
                  className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200 hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-mono font-bold text-[#01914c]">Phát hiện 0{idx + 1}</span>
                      <span className="text-stone-400 italic">{finding.englishTerm}</span>
                    </div>

                    <h4 className="font-heading text-lg font-bold text-stone-900 mb-2">
                      {finding.title}
                    </h4>

                    <p className="text-sm text-stone-700 leading-relaxed mb-4">
                      {finding.fullAnalysis}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-md">
                      <strong className="text-stone-800">Khuyến nghị thực thi:</strong> {finding.implication}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 6: Citation & Publications */}
        {activeTab === 'citation' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-semibold text-[#01914c] uppercase tracking-wider mb-1">
                    Công bố quốc tế chính thức
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900">
                    Tourism Recreation Research
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2a40d2] bg-blue-50 border border-blue-200/80 px-3 py-1.5 rounded-md">
                  <Award className="w-4 h-4 text-[#2a40d2]" />
                  <span>{RESEARCH_INFO.award}</span>
                </div>
              </div>

              <div className="bg-stone-50 p-5 rounded-lg border border-stone-200 text-sm space-y-2 mb-6">
                <div>
                  <strong className="text-stone-900">Tên bài báo:</strong> {RESEARCH_INFO.titleEn}
                </div>
                <div>
                  <strong className="text-stone-900">Tạp chí:</strong> {RESEARCH_INFO.journal} ({RESEARCH_INFO.publisher})
                </div>
                <div>
                  <strong className="text-stone-900">Ngày xuất bản trực tuyến:</strong> {RESEARCH_INFO.publishDate}
                </div>
                <div className="flex items-center gap-2">
                  <strong className="text-stone-900">DOI:</strong>
                  <a
                    href={RESEARCH_INFO.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2a40d2] hover:underline font-mono inline-flex items-center gap-1"
                  >
                    <span>{RESEARCH_INFO.doi}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Citation Copy Boxes */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-700">Định dạng APA 7th Edition</span>
                    <button
                      onClick={() => handleCopyCitation(apaCitation, 'apa')}
                      className="text-xs text-[#01914c] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedFormat === 'apa' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép APA</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-stone-100 rounded-md font-mono text-xs text-stone-800 leading-relaxed select-all">
                    {apaCitation}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-700">Định dạng BibTeX (LaTeX)</span>
                    <button
                      onClick={() => handleCopyCitation(bibtexCitation, 'bibtex')}
                      className="text-xs text-[#01914c] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedFormat === 'bibtex' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép BibTeX</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 bg-stone-100 rounded-md font-mono text-xs text-stone-800 leading-relaxed overflow-x-auto select-all">
                    {bibtexCitation}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
