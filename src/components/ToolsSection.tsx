import React, { useState } from 'react';
import { BookOpen, Hotel, Car, Train, Plane, ArrowRight, RotateCcw, Info, Check, Sparkles } from 'lucide-react';

export const ToolsSection: React.FC = () => {
  // Tab control: 'theory' is first tab (pure theoretical formula content, no calculation inputs),
  // remaining tabs are interactive calculation tools.
  const [activeTab, setActiveTab] = useState<'theory' | 'accommodation' | 'vehicle' | 'transit' | 'flight'>('theory');

  // 1. Lưu trú State
  const [accRooms, setAccRooms] = useState<number>(10);
  const [accNights, setAccNights] = useState<number>(3);
  const [accCountryFactor, setAccCountryFactor] = useState<number>(25);

  const countryPresets = [
    { name: 'Ví dụ đề bài (25.0 kg)', factor: 25.0 },
    { name: 'Việt Nam (24.5 kg CO₂e/phòng/đêm)', factor: 24.5 },
    { name: 'Thái Lan (28.2 kg CO₂e/phòng/đêm)', factor: 28.2 },
    { name: 'Singapore (21.0 kg CO₂e/phòng/đêm)', factor: 21.0 },
    { name: 'Nhật Bản (19.5 kg CO₂e/phòng/đêm)', factor: 19.5 },
    { name: 'Châu Âu - Trung bình (14.2 kg CO₂e/phòng/đêm)', factor: 14.2 },
    { name: 'Hoa Kỳ (22.8 kg CO₂e/phòng/đêm)', factor: 22.8 },
  ];

  const accommodationTotal = Math.max(0, accRooms) * Math.max(0, accNights) * Math.max(0, accCountryFactor);

  // 2. Phương tiện đường bộ State
  const [vehDistance, setVehDistance] = useState<number>(100);
  const [vehFactor, setVehFactor] = useState<number>(0.25);
  const [vehPassengers, setVehPassengers] = useState<number>(5);

  const vehiclePresets = [
    { name: 'Ví dụ đề bài: Ô tô / SUV (0.25 kg CO₂e/km)', factor: 0.25 },
    { name: 'Ô tô sedan xăng (0.19 kg CO₂e/km)', factor: 0.19 },
    { name: 'Ô tô máy dầu Diesel (0.21 kg CO₂e/km)', factor: 0.21 },
    { name: 'Xe Hybrid xăng lai điện (0.13 kg CO₂e/km)', factor: 0.13 },
    { name: 'Xe ô tô điện EV (0.05 kg CO₂e/km)', factor: 0.05 },
    { name: 'Xe máy xăng (0.10 kg CO₂e/km)', factor: 0.10 },
  ];

  const vehicleTotal = Math.max(0, vehDistance) * Math.max(0, vehFactor);
  const vehiclePerPassenger = vehPassengers > 0 ? vehicleTotal / vehPassengers : 0;

  // 3. Đường sắt & Giao thông công cộng (DEFRA) State
  const [transitDistance, setTransitDistance] = useState<number>(80);
  const [transitPassengers, setTransitPassengers] = useState<number>(2);
  const [transitFactor, setTransitFactor] = useState<number>(0.035);

  const transitPresets = [
    { name: 'Đường sắt cao tốc - DEFRA (0.035 kg CO₂e/pkm)', factor: 0.035 },
    { name: 'Tàu điện ngầm / Metro - DEFRA (0.028 kg CO₂e/pkm)', factor: 0.028 },
    { name: 'Tàu hỏa thông thường (0.041 kg CO₂e/pkm)', factor: 0.041 },
    { name: 'Xe buýt nội đô - DEFRA (0.089 kg CO₂e/pkm)', factor: 0.089 },
    { name: 'Xe buýt đường dài / Xe khách - DEFRA (0.027 kg CO₂e/pkm)', factor: 0.027 },
  ];

  const transitTotal = Math.max(0, transitDistance) * Math.max(0, transitPassengers) * Math.max(0, transitFactor);

  // 4. Chuyến bay State
  const [flightDistance, setFlightDistance] = useState<number>(630);
  const [flightFactor, setFlightFactor] = useState<number>(0.158);
  const [flightPassengers, setFlightPassengers] = useState<number>(1);

  const flightRoutePresets = [
    { name: 'Hà Nội – Đà Nẵng (630 km)', distance: 630 },
    { name: 'TP.HCM – Đà Nẵng (610 km)', distance: 610 },
    { name: 'Hà Nội – TP.HCM (1.140 km)', distance: 1140 },
    { name: 'TP.HCM – Phú Quốc (300 km)', distance: 300 },
    { name: 'Hà Nội – Phú Quốc (1.230 km)', distance: 1230 },
    { name: 'Hà Nội – Bangkok (990 km)', distance: 990 },
    { name: 'TP.HCM – Singapore (1.090 km)', distance: 1090 },
  ];

  const flightPresets = [
    { name: 'Bay chặng ngắn < 1000km - DEFRA/ICAO (0.158 kg CO₂e/km)', factor: 0.158 },
    { name: 'Bay chặng trung bình 1000 - 3700km (0.142 kg CO₂e/km)', factor: 0.142 },
    { name: 'Bay chặng dài > 3700km (0.128 kg CO₂e/km)', factor: 0.128 },
  ];

  const flightTotal = Math.max(0, flightDistance) * Math.max(0, flightFactor) * Math.max(0, flightPassengers);

  return (
    <section id="tools" className="py-5 sm:py-8 bg-stone-50 border-t border-stone-200">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="mb-4 text-center max-w-6xl mx-auto">
          <div className="text-xs sm:text-sm font-semibold text-[#01914c] uppercase tracking-wider mb-1">
            Công thức & Tính toán phát thải
          </div>
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Công Thức & Bộ Máy Tính Phát Thải Carbon (CO₂e)
          </h2>
          <p className="mt-1 text-sm sm:text-base text-stone-600 leading-snug">
            Hệ thống hóa các công thức định lượng phát thải khí nhà kính trong du lịch theo chuẩn khoa học và công cụ tính toán tương tác trực tiếp.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-1.5 p-1.5 bg-stone-200/70 rounded-xl max-w-5xl mx-auto mb-5 border border-stone-300/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('theory')}
            className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'theory'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#01914c]" />
            <span>Công thức lý thuyết</span>
          </button>
          <button
            onClick={() => setActiveTab('accommodation')}
            className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'accommodation'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Hotel className="w-4 h-4 text-[#01914c]" />
            <span>Lưu trú</span>
          </button>
          <button
            onClick={() => setActiveTab('vehicle')}
            className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'vehicle'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Car className="w-4 h-4 text-[#2a40d2]" />
            <span>Phương tiện</span>
          </button>
          <button
            onClick={() => setActiveTab('transit')}
            className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'transit'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Train className="w-4 h-4 text-[#01914c]" />
            <span>Đường sắt & Công cộng</span>
          </button>
          <button
            onClick={() => setActiveTab('flight')}
            className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'flight'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Plane className="w-4 h-4 text-[#2a40d2]" />
            <span>Chuyến bay</span>
          </button>
        </div>

        {/* 1. TAB CÔNG THỨC LÝ THUYẾT (CHỈ GHI NỘI DUNG CÔNG THỨC, KHÔNG CÓ PHÉP TÍNH NHẬP SỐ) */}
        {activeTab === 'theory' && (
          <div className="space-y-5">
            <div className="bg-[#f2f7ef] p-4 sm:p-5 rounded-xl border border-[#01914c]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-[#01914c] uppercase tracking-wider mb-1">
                  Khung Phương Pháp Luận Định Lượng
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-stone-900">
                  4 Công Thức Tính Toán Phát Thải Carbon Trong Du Lịch
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-600 mt-1 leading-snug">
                  Mục này tổng hợp nội dung lý thuyết, cơ chế tính toán và các hệ số quy chuẩn khoa học. Để nhập số liệu tính toán cụ thể, bạn có thể chuyển qua các mục tương ứng ở trên.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Formula 1: Lưu trú */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#f2f7ef] text-[#01914c] flex items-center justify-center font-bold">
                      <Hotel className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-stone-900">
                      1. Lưu Trú (Accommodation)
                    </h4>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 mb-3 font-mono text-[11px] sm:text-xs text-stone-900 leading-snug font-semibold">
                    Số phòng × Số đêm × Hệ số phát thải trên mỗi phòng/đêm theo từng quốc gia
                  </div>

                  <div className="space-y-1.5 text-[11px] sm:text-xs text-stone-600 leading-snug mb-3">
                    <p>
                      <strong>Định nghĩa:</strong> Lượng phát thải phát sinh từ điện năng tiêu thụ, điều hòa nhiệt độ, giặt ủi và các tiện ích vận hành cơ sở lưu trú.
                    </p>
                    <p>
                      <strong>Hệ số quốc gia (Cornell Benchmark / DEFRA):</strong> Phản ánh cơ cấu năng lượng lưới điện của nước sở tại (Việt Nam: ~24.5 kg, Thái Lan: ~28.2 kg, Singapore: ~21.0 kg, Nhật Bản: ~19.5 kg CO₂e/phòng/đêm).
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 bg-[#f9fbf7] p-2.5 rounded-md text-[11px] sm:text-xs text-stone-700 leading-snug">
                  <span className="font-bold text-[#01914c]">Ví dụ mẫu:</span> 10 phòng × 3 đêm × 25 kg CO₂e/phòng/đêm = <strong>750 kg CO₂e</strong>.
                </div>
              </div>

              {/* Formula 2: Phương tiện di chuyển đường bộ */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#f0f3fa] text-[#2a40d2] flex items-center justify-center font-bold">
                      <Car className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-stone-900">
                      2. Phương Tiện & Quãng Đường Di Chuyển
                    </h4>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 mb-3 font-mono text-[11px] sm:text-xs text-stone-900 leading-snug font-semibold">
                    Tổng quãng đường × Hệ số phát thải của phương tiện
                    <div className="text-stone-500 font-normal mt-1">(Nếu tính theo từng hành khách: chia kết quả cho số hành khách)</div>
                  </div>

                  <div className="space-y-1.5 text-[11px] sm:text-xs text-stone-600 leading-snug mb-3">
                    <p>
                      <strong>Định nghĩa:</strong> Khí thải nhà kính trực tiếp từ đốt cháy nhiên liệu (xăng, dầu) hoặc gián tiếp từ sạc điện của các phương tiện đường bộ.
                    </p>
                    <p>
                      <strong>Hệ số phát thải chuẩn:</strong> Ô tô/SUV: ~0.25 kg CO₂e/km; Xe sedan: ~0.19 kg CO₂e/km; Xe Hybrid: ~0.13 kg CO₂e/km; Xe điện EV: ~0.05 kg CO₂e/km.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 bg-[#f0f3fa] p-2.5 rounded-md text-[11px] sm:text-xs text-stone-700 leading-snug">
                  <span className="font-bold text-[#2a40d2]">Ví dụ mẫu:</span> 100 km × 0,25 kg CO₂e/km = <strong>25 kg CO₂e</strong> (hoặc <strong>5 kg CO₂e/hành khách</strong> đối với nhóm năm người).
                </div>
              </div>

              {/* Formula 3: Đường sắt và giao thông công cộng */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#f2f7ef] text-[#01914c] flex items-center justify-center font-bold">
                      <Train className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-stone-900">
                      3. Đường Sắt & Giao Thông Công Cộng
                    </h4>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 mb-3 font-mono text-[11px] sm:text-xs text-stone-900 leading-snug font-semibold">
                    Khoảng cách × Số lượng hành khách × Hệ số phát thải riêng từng loại phương tiện
                  </div>

                  <div className="space-y-1.5 text-[11px] sm:text-xs text-stone-600 leading-snug mb-3">
                    <p>
                      <strong>Định nghĩa:</strong> Phương tiện giao thông tập thể được tính trên chỉ số người-km (passenger-kilometer: pkm).
                    </p>
                    <p>
                      <strong>Tiêu chuẩn DEFRA (Vương quốc Anh):</strong> Cung cấp các giá trị định mức riêng biệt cho đường sắt cao tốc (0.035 kg CO₂e/pkm), tàu điện ngầm (0.028 kg CO₂e/pkm) và xe buýt nội đô (0.089 kg CO₂e/pkm).
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 bg-[#f9fbf7] p-2.5 rounded-md text-[11px] sm:text-xs text-stone-700 leading-snug">
                  <span className="font-bold text-[#01914c]">Ý nghĩa:</span> Giúp du khách nhận thấy rõ việc đi tàu điện hoặc xe khách giúp giảm phát thải tới 70% so với ô tô cá nhân.
                </div>
              </div>

              {/* Formula 4: Chuyến bay */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#f0f3fa] text-[#2a40d2] flex items-center justify-center font-bold">
                      <Plane className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-stone-900">
                      4. Chuyến Bay (Aviation)
                    </h4>
                  </div>

                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 mb-3 font-mono text-[11px] sm:text-xs text-stone-900 leading-snug font-semibold">
                    Công thức 1: Khoảng cách bay (km) × Hệ số phát thải (kg CO₂e/km)
                  </div>

                  <div className="space-y-1.5 text-[11px] sm:text-xs text-stone-600 leading-snug mb-3">
                    <p>
                      <strong>Định nghĩa:</strong> Tính toán phát thải trực tiếp từ đốt cháy nhiên liệu phản lực Jet-A1 và hiệu ứng cưỡng bức bức xạ trên tầng bình lưu.
                    </p>
                    <p>
                      <strong>Định mức theo cự ly bay:</strong> Chặng ngắn &lt; 1000 km (~0.158 kg CO₂e/km/khách vì giai đoạn cất hạ cánh tốn nhiều nhiên liệu); Chặng trung bình 1000-3700 km (~0.142 kg CO₂e/km/khách).
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 bg-[#f0f3fa] p-2.5 rounded-md text-[11px] sm:text-xs text-stone-700 leading-snug">
                  <span className="font-bold text-[#2a40d2]">Ứng dụng:</span> Chặng bay khứ hồi Hà Nội – Đà Nẵng (630 km) tạo ra xấp xỉ ~100 kg CO₂e/mỗi hành khách.
                </div>
              </div>

            </div>

            {/* Hint to use calculator tabs */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 text-center space-y-3">
              <div className="text-xs font-bold text-[#01914c] uppercase tracking-wide">
                Trải nghiệm tính toán trực quan
              </div>
              <h4 className="font-heading text-base font-bold text-stone-900">
                Bạn muốn thử nghiệm tính lượng phát thải cho chuyến đi cụ thể?
              </h4>
              <p className="text-xs text-stone-600 max-w-lg mx-auto leading-relaxed">
                Các mục tiếp theo đã được lập trình sẵn công thức và giao diện nhập số liệu, giúp bạn tính ngay phát thải cho lưu trú, xe ô tô, tàu điện ngầm hoặc chuyến bay.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('accommodation')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#01914c] hover:bg-[#01783e] rounded-md transition-all cursor-pointer"
                >
                  Lưu trú
                </button>
                <button
                  onClick={() => setActiveTab('vehicle')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2a40d2] hover:bg-[#1f30a8] rounded-md transition-all cursor-pointer"
                >
                  Phương tiện
                </button>
                <button
                  onClick={() => setActiveTab('transit')}
                  className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-all cursor-pointer"
                >
                  Đường sắt & Công cộng
                </button>
                <button
                  onClick={() => setActiveTab('flight')}
                  className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-all cursor-pointer"
                >
                  Chuyến bay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. TAB TÍNH LƯU TRÚ */}
        {activeTab === 'accommodation' && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#f2f7ef] text-[#01914c] flex items-center justify-center font-bold">
                  <Hotel className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-stone-900">
                    Máy Tính Phát Thải Lưu Trú (Accommodation)
                  </h3>
                  <div className="text-xs text-stone-500 font-mono">
                    Công thức: Số phòng × Số đêm × Hệ số phát thải trên mỗi phòng/đêm theo từng quốc gia
                  </div>
                </div>
              </div>
              <div className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
                Ví dụ: 10 phòng × 3 đêm × 25 kg CO₂e = <strong>750 kg CO₂e</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Inputs */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Số phòng
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={accRooms}
                    onChange={(e) => setAccRooms(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Đơn vị: phòng</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Số đêm
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={accNights}
                    onChange={(e) => setAccNights(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Đơn vị: đêm</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Hệ số phát thải (kg CO₂e/phòng/đêm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={accCountryFactor}
                    onChange={(e) => setAccCountryFactor(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Tự do chỉnh số</span>
                </div>

                {/* Quick Preset Selector */}
                <div className="sm:col-span-3 pt-1">
                  <span className="text-xs text-stone-500 mr-2 font-medium">Hoặc chọn nhanh theo quốc gia:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {countryPresets.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAccCountryFactor(p.factor)}
                        className={`text-[11px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                          accCountryFactor === p.factor
                            ? 'bg-[#01914c] text-white border-[#01914c] font-semibold'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculation formula display & Result */}
              <div className="lg:col-span-4 bg-[#f2f7ef] p-5 rounded-lg border border-[#01914c]/20">
                <div className="text-xs text-[#01914c] font-bold uppercase tracking-wider mb-2">
                  Phép tính chi tiết:
                </div>
                <div className="font-mono text-xs text-stone-700 space-y-1 mb-3 bg-white p-3 rounded border border-stone-200">
                  <div>{accRooms} phòng × {accNights} đêm × {accCountryFactor} kg CO₂e</div>
                </div>
                <div className="text-xs text-stone-600">Tổng lượng phát thải lưu trú:</div>
                <div className="text-2xl font-extrabold text-[#01914c] tabular-data mt-0.5">
                  {accommodationTotal.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} <span className="text-sm font-normal text-stone-600">kg CO₂e</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. TAB TÍNH PHƯƠNG TIỆN */}
        {activeTab === 'vehicle' && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#f0f3fa] text-[#2a40d2] flex items-center justify-center font-bold">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-stone-900">
                    Máy Tính Phương Tiện & Quãng Đường (Road Vehicles)
                  </h3>
                  <div className="text-xs text-stone-500 font-mono">
                    Công thức: Tổng quãng đường × hệ số phát thải của phương tiện (Chia cho số hành khách nếu tính theo người)
                  </div>
                </div>
              </div>
              <div className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
                Ví dụ: 100 km × 0,25 = <strong>25 kg CO₂e</strong> (hoặc <strong>5 kg CO₂e/người</strong> cho nhóm 5 người)
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Inputs */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Tổng quãng đường (km)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={vehDistance}
                    onChange={(e) => setVehDistance(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a40d2]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Đơn vị: km</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Hệ số phương tiện (kg CO₂e/km)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={vehFactor}
                    onChange={(e) => setVehFactor(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a40d2]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Tự do chỉnh số</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Số lượng hành khách
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={vehPassengers}
                    onChange={(e) => setVehPassengers(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a40d2]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Để chia theo đầu người</span>
                </div>

                {/* Preset Buttons */}
                <div className="sm:col-span-3 pt-1">
                  <span className="text-xs text-stone-500 mr-2 font-medium">Hoặc chọn loại phương tiện:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {vehiclePresets.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setVehFactor(p.factor)}
                        className={`text-[11px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                          vehFactor === p.factor
                            ? 'bg-[#2a40d2] text-white border-[#2a40d2] font-semibold'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Formula display & Result */}
              <div className="lg:col-span-4 bg-[#f0f3fa] p-5 rounded-lg border border-[#2a40d2]/20">
                <div className="text-xs text-[#2a40d2] font-bold uppercase tracking-wider mb-2">
                  Phép tính chi tiết:
                </div>
                <div className="font-mono text-xs text-stone-700 space-y-1 mb-3 bg-white p-3 rounded border border-stone-200">
                  <div>{vehDistance} km × {vehFactor} kg CO₂e/km</div>
                  <div className="text-stone-400">÷ {vehPassengers} hành khách</div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-stone-600">Tổng phát thải phương tiện:</div>
                    <div className="text-xl font-extrabold text-[#2a40d2] tabular-data">
                      {vehicleTotal.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} <span className="text-xs font-normal text-stone-600">kg CO₂e</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#2a40d2]/10">
                    <div className="text-xs text-stone-600">Tính trên mỗi hành khách:</div>
                    <div className="text-lg font-bold text-stone-900 tabular-data">
                      {vehiclePerPassenger.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} <span className="text-xs font-normal text-stone-600">kg CO₂e / người</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. TAB TÍNH ĐƯỜNG SẮT VÀ CÔNG CỘNG */}
        {activeTab === 'transit' && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#f2f7ef] text-[#01914c] flex items-center justify-center font-bold">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-stone-900">
                    Máy Tính Đường Sắt & Giao Thông Công Cộng (DEFRA Standard)
                  </h3>
                  <div className="text-xs text-stone-500 font-mono">
                    Công thức: Khoảng cách × số lượng hành khách × hệ số phát thải riêng từng loại phương tiện
                  </div>
                </div>
              </div>
              <div className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
                DEFRA: Giá trị riêng cho đường sắt cao tốc, tàu điện ngầm và xe buýt
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Inputs */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Khoảng cách (km)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={transitDistance}
                    onChange={(e) => setTransitDistance(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Đơn vị: km</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Số lượng hành khách
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={transitPassengers}
                    onChange={(e) => setTransitPassengers(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Đơn vị: người</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Hệ số DEFRA (kg CO₂e/pkm)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    value={transitFactor}
                    onChange={(e) => setTransitFactor(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Tự do chỉnh số</span>
                </div>

                {/* Preset selector */}
                <div className="sm:col-span-3 pt-1">
                  <span className="text-xs text-stone-500 mr-2 font-medium">Chọn phương tiện công cộng DEFRA:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {transitPresets.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setTransitFactor(p.factor)}
                        className={`text-[11px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                          transitFactor === p.factor
                            ? 'bg-[#01914c] text-white border-[#01914c] font-semibold'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculation formula display & Result */}
              <div className="lg:col-span-4 bg-[#f2f7ef] p-5 rounded-lg border border-[#01914c]/20">
                <div className="text-xs text-[#01914c] font-bold uppercase tracking-wider mb-2">
                  Phép tính chi tiết:
                </div>
                <div className="font-mono text-xs text-stone-700 space-y-1 mb-3 bg-white p-3 rounded border border-stone-200">
                  <div>{transitDistance} km × {transitPassengers} khách × {transitFactor} kg CO₂e/pkm</div>
                </div>
                <div className="text-xs text-stone-600">Tổng phát thải giao thông công cộng:</div>
                <div className="text-2xl font-extrabold text-[#01914c] tabular-data mt-0.5">
                  {transitTotal.toLocaleString('vi-VN', { maximumFractionDigits: 2 })} <span className="text-sm font-normal text-stone-600">kg CO₂e</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. TAB TÍNH CHUYẾN BAY */}
        {activeTab === 'flight' && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#f0f3fa] text-[#2a40d2] flex items-center justify-center font-bold">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-stone-900">
                    Máy Tính Chuyến Bay (Flights)
                  </h3>
                  <div className="text-xs text-stone-500 font-mono">
                    Công thức 1: Khoảng cách bay (km) × Hệ số phát thải (kg CO₂e/km) × Số hành khách
                  </div>
                </div>
              </div>
              <div className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
                Chuẩn DEFRA / ICAO hàng không
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Inputs */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Khoảng cách bay (km)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={flightDistance}
                    onChange={(e) => setFlightDistance(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a40d2]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Đơn vị: km bay</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Hệ số phát thải (kg CO₂e/km)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    value={flightFactor}
                    onChange={(e) => setFlightFactor(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a40d2]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Tự do chỉnh số</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Số lượng hành khách
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={flightPassengers}
                    onChange={(e) => setFlightPassengers(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a40d2]"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Số vé bay</span>
                </div>

                {/* Route Quick Picks */}
                <div className="sm:col-span-3 pt-1">
                  <span className="text-xs text-stone-500 mr-2 font-medium">Chọn nhanh tuyến bay phổ biến:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {flightRoutePresets.map((r, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFlightDistance(r.distance)}
                        className={`text-[11px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                          flightDistance === r.distance
                            ? 'bg-[#2a40d2] text-white border-[#2a40d2] font-semibold'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flight Factor Presets */}
                <div className="sm:col-span-3 pt-1">
                  <span className="text-xs text-stone-500 mr-2 font-medium">Chuẩn cự ly bay:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {flightPresets.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFlightFactor(p.factor)}
                        className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                          flightFactor === p.factor
                            ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculation formula display & Result */}
              <div className="lg:col-span-4 bg-[#f0f3fa] p-5 rounded-lg border border-[#2a40d2]/20">
                <div className="text-xs text-[#2a40d2] font-bold uppercase tracking-wider mb-2">
                  Phép tính chi tiết:
                </div>
                <div className="font-mono text-xs text-stone-700 space-y-1 mb-3 bg-white p-3 rounded border border-stone-200">
                  <div>{flightDistance} km × {flightFactor} kg CO₂e/km × {flightPassengers} khách</div>
                </div>
                <div className="text-xs text-stone-600">Tổng phát thải chuyến bay:</div>
                <div className="text-2xl font-extrabold text-[#2a40d2] tabular-data mt-0.5">
                  {flightTotal.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} <span className="text-sm font-normal text-stone-600">kg CO₂e</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
