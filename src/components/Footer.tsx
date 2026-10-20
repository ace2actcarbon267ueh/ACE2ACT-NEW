import React from 'react';
import { RESEARCH_INFO } from '../data/researchData';
import { ActiveSection } from '../types';

interface FooterProps {
  setActiveSection: (section: ActiveSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-stone-800">
          
          {/* Brand info */}
          <div className="md:col-span-6 space-y-3">
            <div className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              ACE<span className="text-[#dbf067]">2</span>ACT
            </div>
            <p className="text-sm text-stone-400 max-w-xl leading-relaxed">
              Thông tin dự án: Turning persuasion into participation: how Gen Z tourists respond to carbon surcharge communication. Công trình nghiên cứu khoa học công bố trên Tourism Recreation Research (Taylor & Francis).
            </p>
            <div className="text-sm text-stone-400">
              Liên hệ nghiên cứu: <a href={`mailto:${RESEARCH_INFO.contactEmail}`} className="text-[#dbf067] hover:underline font-medium">{RESEARCH_INFO.contactEmail}</a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Chuyên mục
            </div>
            <ul className="text-xs space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => setActiveSection('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('research')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nghiên cứu & Khung lý thuyết
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('library')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thư viện kiến thức
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('survey')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Khảo sát Gen Z
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('tools')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bộ công cụ tính phát thải
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Liên hệ
                </button>
              </li>
              <li className="pt-1 border-t border-stone-800/80">
                <a
                  href="/admin"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState(null, '', '/admin');
                    setActiveSection('admin');
                  }}
                  className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer text-[11px]"
                >
                  Quản trị
                </a>
              </li>
            </ul>
          </div>

          {/* Academic identifiers */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Chỉ số học thuật
            </div>
            <div className="text-xs text-stone-400 space-y-1 leading-relaxed">
              <div>Tạp chí: Tourism Recreation Research</div>
              <div>DOI: <a href={RESEARCH_INFO.doiUrl} target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-white underline">{RESEARCH_INFO.doi}</a></div>
              <div className="text-[#dbf067]">{RESEARCH_INFO.award}</div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div>
            © 2026 ACE2ACT Research Group. Mọi quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span>Viện Nghiên Cứu Du Lịch</span>
            <span aria-hidden="true">·</span>
            <span>Phụ Phí Carbon & Du Lịch Bền Vững</span>
            <span aria-hidden="true">·</span>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/admin');
                setActiveSection('admin');
              }}
              className="text-stone-400 hover:text-[#dbf067] transition-colors cursor-pointer text-[11px]"
            >
              Quản trị
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
