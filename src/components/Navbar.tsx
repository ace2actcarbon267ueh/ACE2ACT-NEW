import React from 'react';
import { ActiveSection } from '../types';

interface NavbarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#fcfdf9]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element, no badges or pills) */}
        <button
          onClick={() => setActiveSection('home')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01914c] rounded"
        >
          <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 group-hover:text-[#01914c] transition-colors whitespace-nowrap shrink-0">
            ACE<span className="text-[#01914c]">2</span>ACT
          </span>
        </button>

        {/* Zone 2: Single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-stone-600">
          <button
            onClick={() => setActiveSection('home')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#01914c] cursor-pointer py-1 ${
              activeSection === 'home' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : ''
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => setActiveSection('research')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#01914c] cursor-pointer py-1 ${
              activeSection === 'research' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : ''
            }`}
          >
            Nghiên cứu
          </button>
          <button
            onClick={() => setActiveSection('library')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#01914c] cursor-pointer py-1 ${
              activeSection === 'library' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : ''
            }`}
          >
            Thư viện kiến thức
          </button>
          <button
            onClick={() => setActiveSection('survey')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#01914c] cursor-pointer py-1 flex items-center gap-1.5 ${
              activeSection === 'survey' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : ''
            }`}
          >
            <span>Khảo sát</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-[#01914c] border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#01914c] animate-pulse"></span>
              Live Chart
            </span>
          </button>
          <button
            onClick={() => setActiveSection('tools')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#01914c] cursor-pointer py-1 ${
              activeSection === 'tools' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : ''
            }`}
          >
            Bộ công cụ
          </button>
          <button
            onClick={() => setActiveSection('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#01914c] cursor-pointer py-1 ${
              activeSection === 'contact' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : ''
            }`}
          >
            Liên hệ
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://doi.org/10.1080/02508281.2025.2611763"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#01914c] hover:bg-[#01783e] active:scale-[0.98] rounded-md transition-all shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a40d2]"
          >
            Bài báo
          </a>
        </div>
      </div>

      {/* Mobile nav rail */}
      <div className="md:hidden flex overflow-x-auto py-2.5 px-4 gap-4 border-t border-stone-200/60 text-xs font-medium no-scrollbar">
        <button
          onClick={() => setActiveSection('home')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 ${
            activeSection === 'home' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : 'text-stone-600'
          }`}
        >
          Trang chủ
        </button>
        <button
          onClick={() => setActiveSection('research')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 ${
            activeSection === 'research' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : 'text-stone-600'
          }`}
        >
          Nghiên cứu
        </button>
        <button
          onClick={() => setActiveSection('library')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 ${
            activeSection === 'library' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : 'text-stone-600'
          }`}
        >
          Thư viện
        </button>
        <button
          onClick={() => setActiveSection('survey')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 ${
            activeSection === 'survey' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : 'text-stone-600'
          }`}
        >
          Khảo sát
        </button>
        <button
          onClick={() => setActiveSection('tools')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 ${
            activeSection === 'tools' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : 'text-stone-600'
          }`}
        >
          Bộ công cụ
        </button>
        <button
          onClick={() => setActiveSection('contact')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 ${
            activeSection === 'contact' ? 'text-[#01914c] font-semibold border-b-2 border-[#01914c]' : 'text-stone-600'
          }`}
        >
          Liên hệ
        </button>
      </div>
    </header>
  );
};
