import React, { useState } from 'react';
import { Send, CheckCircle2, GraduationCap, FileText, Loader2, AlertCircle } from 'lucide-react';
import { saveContactSubmission } from '../lib/firebase';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    requestType: 'full_paper',
    note: ''
  });
  const [submissionId, setSubmissionId] = useState<string>(() => 
    `contact_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await saveContactSubmission(
        {
          name: formData.name,
          email: formData.email,
          university: formData.university,
          requestType: formData.requestType,
          note: formData.note
        },
        submissionId
      );
      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setSubmitError(
        'Không thể lưu thông tin liên hệ vào cơ sở dữ liệu. Vui lòng kiểm tra kết nối mạng và thử lại.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      university: '',
      requestType: 'full_paper',
      note: ''
    });
    setSubmissionId(`contact_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);
    setSubmitError(null);
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-white border-t border-stone-200">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-sm font-semibold text-[#01914c] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-5 h-5 text-[#01914c]" />
                <span>Kết nối & Đồng hành</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
                Liên hệ
              </h2>
              <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
                Nhóm nghiên cứu luôn sẵn sàng lắng nghe mọi góp ý, thắc mắc cũng như chia sẻ bản PDF toàn văn của công trình nghiên cứu. Hãy gửi thông tin cho chúng tôi qua mẫu bên cạnh.
              </p>
            </div>

            {/* Support Highlight Card */}
            <div className="p-4 bg-[#f2f7ef] rounded-xl border border-[#01914c]/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#01914c]">
                <FileText className="w-4 h-4" />
                <span>Bản toàn văn & Trao đổi</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                Bạn cần bản PDF toàn văn, muốn đóng góp ý kiến hoặc có thắc mắc về đề tài? Điền thông tin vào mẫu và nhóm tác giả sẽ phản hồi trực tiếp qua email.
              </p>
            </div>
          </div>

          {/* Right form column: Yêu cầu Full Paper & Hỗ trợ sinh viên */}
          <div className="lg:col-span-7 bg-[#fcfdf9] p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-2">
                  <h3 className="font-heading text-lg font-bold text-stone-900">
                    Gửi Thông Tin Liên Hệ
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Chọn nhu cầu (PDF toàn văn / Góp ý / Thắc mắc) và để lại thông tin để nhóm tác giả phản hồi.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="example@student.edu.vn"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Trường Đại học / Đơn vị công tác
                    </label>
                    <input
                      type="text"
                      placeholder="Trường, viện hoặc đơn vị..."
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nhu cầu
                    </label>
                    <select
                      value={formData.requestType}
                      onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                    >
                      <option value="full_paper">PDF toàn văn</option>
                      <option value="feedback">Góp ý</option>
                      <option value="question">Thắc mắc</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nội dung nhắn gửi
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Nội dung chi tiết góp ý, thắc mắc hoặc yêu cầu tài liệu..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#01914c]"
                  />
                </div>

                {submitError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-md text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a40d2] ${
                      isSubmitting
                        ? 'bg-[#01914c]/70 cursor-not-allowed'
                        : 'bg-[#01914c] hover:bg-[#01783e] active:scale-[0.98] cursor-pointer'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang lưu vào hệ thống...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Gửi liên hệ</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-[#f2f7ef] text-[#01914c] rounded-full flex items-center justify-center mx-auto border border-[#01914c]/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-stone-900">
                  Thông Tin Đã Được Gửi Thành Công!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Cảm ơn bạn! Nhóm nghiên cứu sẽ phản hồi đến email <strong>{formData.email}</strong> trong thời gian sớm nhất.
                </p>
                <div>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-xs text-stone-700 hover:text-stone-900 border border-stone-300 rounded-md cursor-pointer hover:bg-stone-50"
                  >
                    Gửi thêm liên hệ khác
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
