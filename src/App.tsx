import React, { useState, useEffect } from 'react';
import { ActiveSection } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResearchSection } from './components/ResearchSection';
import { KnowledgeLibrary } from './components/KnowledgeLibrary';
import { SurveySection } from './components/SurveySection';
import { ToolsSection } from './components/ToolsSection';
import { ContactSection } from './components/ContactSection';
import { AdminSection } from './components/AdminSection';
import { Footer } from './components/Footer';
import { testConnection } from './lib/firebase';
import { ArrowRight, Sparkles, BookOpen, Compass, BarChart2 } from 'lucide-react';

export default function App() {
  const getInitialSection = (): ActiveSection => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin') {
        return 'admin';
      }
    }
    return 'home';
  };

  const [activeSection, setActiveSection] = useState<ActiveSection>(getInitialSection);

  // Test Firestore connection on boot
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to popstate for browser navigation (e.g. Back/Forward button)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin') {
        setActiveSection('admin');
      } else {
        setActiveSection('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync browser URL and scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (activeSection === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
    } else {
      if (window.location.pathname === '/admin') {
        window.history.pushState(null, '', '/');
      }
    }
  }, [activeSection]);

  // If in admin mode, render dedicated Admin Portal
  if (activeSection === 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-[#fcfdf9] text-stone-900 selection:bg-[#dbf067] selection:text-[#01914c]">
        <main className="flex-1">
          <AdminSection
            onBackToHome={() => {
              window.history.pushState(null, '', '/');
              setActiveSection('home');
            }}
          />
        </main>
        <Footer setActiveSection={setActiveSection} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdf9] text-stone-900 selection:bg-[#dbf067] selection:text-[#01914c]">
      {/* Top Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeSection === 'home' && (
          <>
            <HeroSection setActiveSection={setActiveSection} />

            {/* Curated Editorial Highlights for Home */}
            <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
              <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
                <div className="max-w-5xl mb-12">
                  <div className="text-sm font-semibold text-[#01914c] uppercase tracking-wider mb-2">
                    Cấu trúc nội dung đề tài
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                    Khám Phá Các Trụ Cột Nghiên Cứu
                  </h2>
                  <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
                    Dự án tích hợp đầy đủ từ lý thuyết khoa học, dữ liệu định lượng 255 mẫu, phỏng vấn sâu 32 người, đến bộ công cụ mô phỏng thực tiễn cho doanh nghiệp lữ hành.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                  {/* Pillar 1 */}
                  <div
                    onClick={() => setActiveSection('research')}
                    className="p-7 rounded-xl border border-stone-200 hover:border-[#01914c] hover:shadow-md transition-all cursor-pointer bg-[#fcfdf9] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-[#01914c] mb-2">01 / LÝ THUYẾT & MẪU</div>
                      <h3 className="font-heading text-xl font-bold text-stone-900 group-hover:text-[#01914c] transition-colors mb-2">
                        Nghiên Cứu ELM × COM-B
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        Khung lý thuyết tích hợp, tiến trình mốc thời gian (26/7 - 17/9) và các phát hiện nổi bật về tâm lý Gen Z.
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-sm font-semibold text-[#01914c]">
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Pillar 2 */}
                  <div
                    onClick={() => setActiveSection('library')}
                    className="p-7 rounded-xl border border-stone-200 hover:border-[#2a40d2] hover:shadow-md transition-all cursor-pointer bg-[#fcfdf9] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-[#2a40d2] mb-2">02 / THƯ VIỆN & BÁO CHÍ</div>
                      <h3 className="font-heading text-xl font-bold text-stone-900 group-hover:text-[#2a40d2] transition-colors mb-2">
                        Thư Viện Kiến Thức
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        Bài báo chuyên sâu trên Tạp chí Năng lượng Việt Nam, Nhịp Cầu Đầu Tư & VietnamPlus, thuật ngữ phụ phí carbon và cơ chế hóa giải hoài nghi tẩy xanh.
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-sm font-semibold text-[#2a40d2]">
                      <span>Khám phá tài liệu</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Pillar 3 */}
                  <div
                    onClick={() => setActiveSection('survey')}
                    className="p-7 rounded-xl border border-stone-200 hover:border-[#01914c] hover:shadow-md transition-all cursor-pointer bg-[#fcfdf9] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-[#01914c] mb-2">03 / KHẢO SÁT 6 CÂU</div>
                      <h3 className="font-heading text-xl font-bold text-stone-900 group-hover:text-[#01914c] transition-colors mb-2">
                        Trắc Nghiệm Hành Vi Gen Z
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        Tham gia khảo sát thực nghiệm 6 câu hỏi và đối chiếu trực tiếp lựa chọn của bạn với 255 đáp viên.
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-sm font-semibold text-[#01914c]">
                      <span>Làm khảo sát ngay</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Pillar 4 */}
                  <div
                    onClick={() => setActiveSection('tools')}
                    className="p-7 rounded-xl border border-stone-200 hover:border-[#2a40d2] hover:shadow-md transition-all cursor-pointer bg-[#fcfdf9] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-[#2a40d2] mb-2">04 / TÍNH PHÁT THẢI CO₂e</div>
                      <h3 className="font-heading text-xl font-bold text-stone-900 group-hover:text-[#2a40d2] transition-colors mb-2">
                        Công Cụ Tính Phát Thải
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        4 công thức chuẩn: Lưu trú theo quốc gia, phương tiện cá nhân, giao thông công cộng DEFRA và chuyến bay.
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-sm font-semibold text-[#2a40d2]">
                      <span>Tính toán ngay</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Survey CTA Preview */}
            <section className="py-16 sm:py-24 bg-[#f2f7ef] border-t border-stone-200">
              <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 text-center">
                <div className="text-sm font-semibold text-[#01914c] uppercase tracking-wider mb-2">
                  Trải nghiệm trực tiếp
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mb-6">
                  Bạn Sẽ Phản Ứng Thế Nào Trước Phụ Phí Carbon?
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setActiveSection('survey')}
                    className="px-7 py-3.5 bg-[#01914c] hover:bg-[#01783e] active:scale-[0.98] text-white text-base font-semibold rounded-md shadow-sm transition-all cursor-pointer"
                  >
                    Bắt đầu khảo sát
                  </button>
                  <button
                    onClick={() => setActiveSection('tools')}
                    className="px-7 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-base font-semibold rounded-md transition-all cursor-pointer"
                  >
                    Tính toán phát thải chuyến đi
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'research' && <ResearchSection />}
        {activeSection === 'library' && <KnowledgeLibrary />}
        {activeSection === 'survey' && <SurveySection />}
        {activeSection === 'tools' && <ToolsSection />}
        {activeSection === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
}
