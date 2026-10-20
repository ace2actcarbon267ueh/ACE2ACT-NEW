import React, { useState, useEffect } from 'react';
import { SURVEY_QUESTIONS } from '../data/researchData';
import { 
  CheckCircle2, 
  RotateCcw, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  PieChart as PieIcon, 
  Layers, 
  Sparkles,
  Info,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { saveSurveySubmission } from '../lib/firebase';

interface QuestionStats {
  id: string;
  total: number;
  counts: Record<string, number>;
}

// Initial seed statistics set to 0 for a clean live start
const INITIAL_STATS: Record<string, Record<string, number>> = {
  ageGroup: {
    "Dưới 18 tuổi": 0,
    "18–22 tuổi": 0,
    "23–29 tuổi": 0,
    "30 tuổi trở lên": 0
  },
  traveledPastYear: {
    "Có": 0,
    "Chưa": 0
  },
  carbonOffsetUnderstanding: {
    "Chưa từng nghe": 0,
    "Đã nghe nhưng chưa hiểu rõ": 0,
    "Hiểu khái niệm cơ bản": 0,
    "Hiểu tương đối rõ cách hoạt động": 0
  },
  trustFactor: {
    "Có dữ liệu và chứng nhận kiểm chứng": 0,
    "Công khai cách sử dụng nguồn tiền": 0,
    "Có kết quả tác động rõ ràng": 0,
    "Được tổ chức uy tín giới thiệu": 0
  },
  willingnessToContribute: {
    "Chắc chắn có": 0,
    "Có thể có": 0,
    "Chưa quyết định": 0,
    "Có thể không": 0,
    "Chắc chắn không": 0
  },
  biggestBarrier: {
    "Thông tin chưa rõ ràng": 0,
    "Thiếu niềm tin vào hiệu quả": 0,
    "Chi phí phát sinh": 0,
    "Bất tiện khi đăng ký": 0,
    "Chưa thấy cần thiết": 0
  }
};

const BASE_TOTAL_RESPONDENTS = 0;

export const SurveySection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'survey' | 'analytics'>('survey');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hasContributed, setHasContributed] = useState<boolean>(false);
  const [selectedChartQuestionId, setSelectedChartQuestionId] = useState<string>('willingnessToContribute');

  // Firestore submission state
  const [submissionId, setSubmissionId] = useState<string>(() =>
    `survey_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Real-time survey counts state initialized to 0
  const [totalParticipants, setTotalParticipants] = useState<number>(0);
  const [statsData, setStatsData] = useState<Record<string, Record<string, number>>>(INITIAL_STATS);

  // Load from localStorage on mount (clears previous mock data and starts at 0)
  useEffect(() => {
    try {
      const storedVersion = localStorage.getItem('ace2act_survey_version');
      // If version is not 'v2_zero_start', reset localStorage completely to 0
      if (storedVersion !== 'v2_zero_start') {
        localStorage.setItem('ace2act_survey_version', 'v2_zero_start');
        localStorage.setItem('ace2act_survey_total', '0');
        localStorage.setItem('ace2act_survey_stats', JSON.stringify(INITIAL_STATS));
        localStorage.removeItem('ace2act_user_has_submitted');
        setTotalParticipants(0);
        setStatsData(INITIAL_STATS);
        setHasContributed(false);
        return;
      }

      const storedTotal = localStorage.getItem('ace2act_survey_total');
      const storedStats = localStorage.getItem('ace2act_survey_stats');
      const storedUserSubmitted = localStorage.getItem('ace2act_user_has_submitted');

      if (storedTotal) {
        setTotalParticipants(parseInt(storedTotal, 10));
      }
      if (storedStats) {
        setStatsData(JSON.parse(storedStats));
      }
      if (storedUserSubmitted === 'true') {
        setHasContributed(true);
      }
    } catch {
      // Fallback to default 0
      setTotalParticipants(0);
      setStatsData(INITIAL_STATS);
    }
  }, []);

  const totalQuestions = SURVEY_QUESTIONS.length;
  const currentQ = SURVEY_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (questionId: string, option: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNext = async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Submit survey to Firestore and update real-time statistics
      await submitSurvey();
    }
  };

  const submitSurvey = async () => {
    if (isSubmitting) return;

    // Verify all 6 questions are answered
    const unanswered = SURVEY_QUESTIONS.some(q => !answers[q.id]);
    if (unanswered) {
      setSubmitError('Vui lòng chọn đầy đủ đáp án cho tất cả các câu hỏi trước khi gửi.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Save to real Firestore collection
      await saveSurveySubmission(answers, submissionId);

      // Only mark as submitted after Firestore confirmation
      setSubmitted(true);

      if (!hasContributed) {
        const newTotal = totalParticipants + 1;
        setTotalParticipants(newTotal);
        setHasContributed(true);

        // Clone stats and increment
        const updatedStats = { ...statsData };
        Object.entries(answers).forEach(([qId, selectedOpt]) => {
          if (!updatedStats[qId]) {
            updatedStats[qId] = {};
          }
          updatedStats[qId][selectedOpt] = (updatedStats[qId][selectedOpt] || 0) + 1;
        });

        setStatsData(updatedStats);

        try {
          localStorage.setItem('ace2act_survey_version', 'v2_zero_start');
          localStorage.setItem('ace2act_survey_total', newTotal.toString());
          localStorage.setItem('ace2act_survey_stats', JSON.stringify(updatedStats));
          localStorage.setItem('ace2act_user_has_submitted', 'true');
        } catch {
          // Storage fail graceful
        }
      }
    } catch (err: any) {
      console.error('Survey submission error:', err);
      setSubmitError(
        'Không thể lưu kết quả khảo sát vào cơ sở dữ liệu. Toàn bộ câu trả lời của bạn vẫn được giữ nguyên, vui lòng bấm "Gửi khảo sát & Xem kết quả" để gửi lại.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSubmissionId(`survey_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);
    setSubmitError(null);
    setSubmitted(false);
  };

  // Reset all live chart data back to 0
  const handleResetAllToZero = () => {
    setTotalParticipants(0);
    setStatsData(INITIAL_STATS);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSubmitted(false);
    setHasContributed(false);
    try {
      localStorage.setItem('ace2act_survey_version', 'v2_zero_start');
      localStorage.setItem('ace2act_survey_total', '0');
      localStorage.setItem('ace2act_survey_stats', JSON.stringify(INITIAL_STATS));
      localStorage.removeItem('ace2act_user_has_submitted');
    } catch {
      // Storage fail graceful
    }
  };

  // Determine Persona
  const getPersona = () => {
    const willingness = answers['willingnessToContribute'];
    const trust = answers['trustFactor'];
    const barrier = answers['biggestBarrier'];

    if (willingness === 'Chắc chắn có' || willingness === 'Có thể có') {
      if (trust === 'Có dữ liệu và chứng nhận kiểm chứng' || trust === 'Công khai cách sử dụng nguồn tiền') {
        return {
          title: "Chân dung: Nhà Lý Tưởng Thực Dụng (Pragmatic Idealist)",
          badge: "Khớp 78.4% mẫu nghiên cứu",
          desc: "Bạn có nhận thức môi trường rất tích cực và sẵn sàng đóng góp, nhưng đòi hỏi sự minh bạch cao: muốn thấy số liệu kiểm toán cụ thể, mã QR theo dõi và tiền không bị phân tán lãng phí.",
          advice: "Doanh nghiệp du lịch có thể thuyết phục bạn bằng cách cung cấp chứng chỉ số (digital certificate) và liên kết trực tiếp với dự án trồng rừng được định vị GPS."
        };
      }
      return {
        title: "Chân dung: Nhà Tiên Phong Sinh Thái (Eco-Pioneer)",
        badge: "Khớp 15.2% mẫu nghiên cứu",
        desc: "Bạn có động lực đạo đức nội tại mạnh mẽ, luôn ưu tiên các lựa chọn du lịch bền vững và tin tưởng vào tác động tập thể của thế hệ trẻ.",
        advice: "Bạn là đại sứ tự nhiên tuyệt vời cho các chiến dịch lan tỏa du lịch phát thải thấp trong cộng đồng sinh viên và người trẻ."
      };
    } else {
      if (barrier === 'Thiếu niềm tin vào hiệu quả' || barrier === 'Thông tin chưa rõ ràng') {
        return {
          title: "Chân dung: Du Khách Hoài Nghi Thận Trọng (Conscious Skeptic)",
          badge: "Khớp 24.6% mẫu nghiên cứu",
          desc: "Bạn không phản đối việc bảo vệ thiên nhiên nhưng cực kỳ cảnh giác với hiện tượng 'tẩy xanh' (greenwashing) và từ chối nếu cảm thấy doanh nghiệp đang 'đổ vỏ' chi phí lên đầu khách du lịch.",
          advice: "Doanh nghiệp chỉ có thể thuyết phục bạn khi cam kết chính sách đóng góp đối ứng 50-50 và công khai báo cáo kiểm toán tài chính độc lập."
        };
      }
      return {
        title: "Chân dung: Du Khách Ưu Tiên Giá Trị & Tiện Lợi (Pragmatic Traveler)",
        badge: "Khớp 18.5% mẫu nghiên cứu",
        desc: "Bạn coi trọng tính thuận tiện trong khâu thanh toán và chi phí hợp lý. Nếu thủ tục rườm rà hoặc giá phát sinh quá lớn, bạn sẽ ưu tiên quyền lợi cá nhân trước.",
        advice: "Bạn cần trải nghiệm thanh toán 1-click không ma sát và mức phụ phí vi mô (micro-surcharge 15.000đ - 30.000đ) tích hợp sẵn trong giá tour/vé."
      };
    }
  };

  const isCurrentAnswered = Boolean(answers[currentQ.id]);

  // Calculate percentages for a given question
  const getQuestionBreakdown = (qId: string) => {
    const qConfig = SURVEY_QUESTIONS.find(q => q.id === qId);
    if (!qConfig) return [];

    const currentCounts = statsData[qId] || {};
    const totalVotes = Object.values(currentCounts).reduce((a, b) => a + b, 0);

    return qConfig.options.map(opt => {
      const count = currentCounts[opt] || 0;
      const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 1000) / 10 : 0;
      const benchmarkPct = qConfig.benchmark[opt as keyof typeof qConfig.benchmark] || 0;
      return {
        label: opt,
        count,
        pct,
        benchmarkPct
      };
    });
  };

  // Quick summary numbers
  const willingnessStats = statsData['willingnessToContribute'] || {};
  const willingnessTotal = Object.values(willingnessStats).reduce((a, b) => a + b, 0);
  const positiveWillingnessCount = (willingnessStats['Chắc chắn có'] || 0) + (willingnessStats['Có thể có'] || 0);
  const supportRate = willingnessTotal > 0 ? Math.round((positiveWillingnessCount / willingnessTotal) * 1000) / 10 : 0;

  const trustStats = statsData['trustFactor'] || {};
  const trustTotal = Object.values(trustStats).reduce((a, b) => a + b, 0);
  const verifyTrustCount = (trustStats['Có dữ liệu và chứng nhận kiểm chứng'] || 0) + (trustStats['Công khai cách sử dụng nguồn tiền'] || 0);
  const verificationDemandRate = trustTotal > 0 ? Math.round((verifyTrustCount / trustTotal) * 1000) / 10 : 0;

  // Barrier metric
  const barrierStats = statsData['biggestBarrier'] || {};
  const barrierTotal = Object.values(barrierStats).reduce((a, b) => a + b, 0);
  let topBarrierName = "Chưa có dữ liệu";
  let topBarrierSub = "0 lượt khảo sát";
  if (barrierTotal > 0) {
    let maxCount = -1;
    Object.entries(barrierStats).forEach(([name, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topBarrierName = name;
      }
    });
    const pct = Math.round((maxCount / barrierTotal) * 1000) / 10;
    topBarrierSub = `Chiếm ${pct}% ý kiến đóng góp`;
  }

  return (
    <section id="survey" className="py-4 sm:py-6 bg-white border-t border-stone-200">
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="mb-4 text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#01914c] uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#01914c] animate-pulse"></span>
            <span>Khảo sát tương tác & Thống kê dữ liệu thực tế</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight">
            Khảo Sát Hành Vi & Biểu Đồ Thống Kê Phụ Phí Carbon
          </h2>
          <p className="mt-1 text-sm sm:text-base text-stone-600 leading-snug">
            Hệ thống theo dõi trực tiếp kết quả khảo sát từ du khách, tự động tổng hợp tỷ lệ phần trăm và biểu đồ phân tích theo thời gian thực.
          </p>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="inline-flex p-1.5 bg-stone-100 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode('survey')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'survey'
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200/60 font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Làm bài khảo sát (6 câu)</span>
              {submitted && (
                <span className="text-[10px] bg-emerald-100 text-[#01914c] px-1.5 py-0.5 rounded font-bold">
                  Đã xong
                </span>
              )}
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'analytics'
                  ? 'bg-[#01914c] text-white shadow-sm font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Biểu đồ & Thống kê thực tế</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                viewMode === 'analytics' ? 'bg-white/20 text-white' : 'bg-[#dbf067] text-stone-900'
              }`}>
                {totalParticipants} lượt
              </span>
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: SURVEY QUESTIONS / DIAGNOSIS */}
        {viewMode === 'survey' && (
          <div>
            {!submitted ? (
              <div className="bg-[#fcfdf9] p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs">
                {/* Progress indicators */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium mb-2">
                    <span className="flex items-center gap-2">
                      <span className="font-bold text-stone-800">Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}</span>
                      <span className="text-stone-400">|</span>
                      <span>Dữ liệu sẽ được cập nhật vào Chart chung</span>
                    </span>
                    <span className="tabular-data font-bold text-[#01914c]">
                      {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% hoàn thành
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#01914c] h-full transition-all duration-300 rounded-full"
                      style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Current Question */}
                <div className="mb-4">
                  <div className="text-xs font-mono font-bold text-[#2a40d2] mb-1">
                    CÂU HỎI 0{currentQ.number} / 06
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2 mb-4">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = answers[currentQ.id] === opt;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(currentQ.id, opt)}
                        className={`w-full text-left px-4 py-3 min-h-[48px] rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#01914c] bg-[#f2f7ef] text-stone-950 font-semibold shadow-xs ring-1 ring-[#01914c]'
                            : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        <span className="text-sm">{opt}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 transition-colors ${
                            isSelected
                              ? 'border-[#01914c] bg-[#01914c] text-white'
                              : 'border-stone-300 bg-transparent'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation buttons */}
                <div className="pt-3 border-t border-stone-200">
                  {submitError && (
                    <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePrev}
                      disabled={currentQuestionIndex === 0 || isSubmitting}
                      className={`px-4 py-2 text-xs font-semibold rounded-md flex items-center gap-1 transition-all ${
                        currentQuestionIndex === 0 || isSubmitting
                          ? 'opacity-40 cursor-not-allowed text-stone-400'
                          : 'text-stone-700 hover:bg-stone-100 cursor-pointer'
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Quay lại</span>
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={!isCurrentAnswered || isSubmitting}
                      className={`px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-md flex items-center gap-1.5 transition-all shadow-xs ${
                        !isCurrentAnswered || isSubmitting
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : 'bg-[#01914c] hover:bg-[#01783e] text-white cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Đang lưu vào hệ thống...</span>
                        </>
                      ) : currentQuestionIndex === totalQuestions - 1 ? (
                        <>
                          <span>Gửi khảo sát & Xem kết quả</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Câu tiếp theo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Results View with Benchmark Comparison */
              <div className="space-y-8">
                {/* Notification Banner */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#01914c] text-white flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        Khảo sát hoàn thành! Lượt tham gia thứ #{totalParticipants} đã được ghi nhận.
                      </h4>
                      <p className="text-xs text-stone-600">
                        Câu trả lời của bạn đã được tính toán vào Biểu đồ thống kê thời gian thực của website.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewMode('analytics')}
                    className="px-4 py-2 bg-[#01914c] hover:bg-[#01783e] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-xs"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Xem Chart Thống Kê Ngay</span>
                  </button>
                </div>

                {/* Persona Result Box */}
                {(() => {
                  const persona = getPersona();
                  return (
                    <div className="bg-[#f2f7ef] p-6 sm:p-8 rounded-xl border border-[#01914c]/30">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-bold text-[#01914c] uppercase tracking-wider">
                          Kết quả chẩn đoán tâm lý của bạn
                        </span>
                        <span className="text-xs font-semibold text-stone-700 bg-[#dbf067] px-2.5 py-1 rounded">
                          {persona.badge}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-stone-900 mb-3">
                        {persona.title}
                      </h3>

                      <p className="text-sm text-stone-800 leading-relaxed mb-4">
                        {persona.desc}
                      </p>

                      <div className="bg-white p-4 rounded-lg border border-[#01914c]/20 text-xs text-stone-700 leading-relaxed">
                        <strong className="text-[#01914c]">Ý nghĩa cho truyền thông:</strong> {persona.advice}
                      </div>
                    </div>
                  );
                })()}

                {/* Benchmark Comparison Table */}
                <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-stone-900">
                        Đối Chiếu Câu Trả Lời Của Bạn Với Mẫu 255 Du Khách Gen Z
                      </h3>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Tỷ lệ phần trăm đại diện cho tần suất lựa chọn của người tham gia khảo sát trong công trình nghiên cứu.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode('analytics')}
                        className="px-3 py-1.5 text-xs bg-stone-900 hover:bg-stone-800 text-white rounded-md flex items-center gap-1.5 cursor-pointer font-medium"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Xem biểu đồ toàn thể</span>
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-300 rounded-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Làm lại khảo sát</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {SURVEY_QUESTIONS.map(q => {
                      const userChoice = answers[q.id];
                      const benchmarkData = q.benchmark;
                      return (
                        <div key={q.id} className="p-4 rounded-lg bg-stone-50 border border-stone-200/80">
                          <div className="text-xs font-bold text-[#2a40d2] mb-1">
                            Câu {q.number}: {q.question}
                          </div>
                          <div className="text-xs text-stone-600 mb-3">
                            Lựa chọn của bạn: <strong className="text-[#01914c] font-bold">{userChoice || 'Chưa chọn'}</strong>
                          </div>

                          {/* Bar comparison */}
                          <div className="space-y-2">
                            {q.options.map((opt, i) => {
                              const isUserPicked = userChoice === opt;
                              const pct = benchmarkData[opt as keyof typeof benchmarkData] || 0;
                              return (
                                <div key={i} className="text-xs">
                                  <div className="flex justify-between text-stone-700 mb-1">
                                    <span className={isUserPicked ? 'font-bold text-[#01914c] flex items-center gap-1' : ''}>
                                      {isUserPicked && <span className="text-[10px] bg-[#01914c] text-white px-1.5 py-0.2 rounded font-bold">Lựa chọn của bạn</span>}
                                      {opt}
                                    </span>
                                    <span className="font-mono text-stone-600 tabular-data font-semibold">{pct}%</span>
                                  </div>
                                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all duration-500 ${
                                        isUserPicked ? 'bg-[#01914c]' : 'bg-stone-400'
                                      }`}
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW MODE 2: REAL-TIME ANALYTICS DASHBOARD & CHARTS */}
        {viewMode === 'analytics' && (
          <div className="space-y-10">
            
            {/* Top 4 KPI Metrics Header & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#01914c] animate-pulse"></span>
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Dữ Liệu Thống Kê Thời Gian Thực
                </span>
                <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-mono font-medium">
                  Trạng thái: Bắt đầu từ 0
                </span>
              </div>
              <button
                onClick={handleResetAllToZero}
                title="Xóa dữ liệu thử nghiệm và đưa tất cả số liệu về 0"
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-rose-600 border border-stone-200 hover:border-rose-200 bg-white hover:bg-rose-50 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại tất cả về 0</span>
              </button>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 bg-[#fcfdf9] border border-stone-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Tổng lượt khảo sát</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#01914c] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-stone-900 tabular-data font-heading">{totalParticipants}</span>
                  <span className="text-xs text-stone-500">người đã làm</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-[#01914c] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#01914c] animate-pulse"></span>
                  <span>Đang theo dõi trực tiếp</span>
                </div>
              </div>

              <div className="p-5 bg-[#fcfdf9] border border-stone-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Tỷ lệ ủng hộ phụ phí</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#01914c] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#01914c] tabular-data font-heading">{supportRate}%</span>
                  <span className="text-xs text-stone-500">sẵn sàng chi trả</span>
                </div>
                <div className="mt-2 text-xs text-stone-600">
                  {positiveWillingnessCount} / {willingnessTotal} người chọn 'Có'
                </div>
              </div>

              <div className="p-5 bg-[#fcfdf9] border border-stone-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Đòi hỏi minh bạch dữ liệu</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2a40d2] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#2a40d2] tabular-data font-heading">{verificationDemandRate}%</span>
                  <span className="text-xs text-stone-500">yêu cầu kiểm chứng</span>
                </div>
                <div className="mt-2 text-xs text-stone-600">
                  {verifyTrustCount} / {trustTotal} người cần sao kê & kiểm chứng
                </div>
              </div>

              <div className="p-5 bg-[#fcfdf9] border border-stone-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Rào cản lớn nhất</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight font-heading truncate">
                    {topBarrierName}
                  </span>
                </div>
                <div className="mt-2 text-xs text-stone-600">
                  {topBarrierSub}
                </div>
              </div>

            </div>

            {/* Main Interactive Chart Section */}
            <div className="bg-[#fcfdf9] border border-stone-200 rounded-2xl p-6 sm:p-10">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
                <div>
                  <div className="text-xs font-bold text-[#01914c] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4" />
                    <span>Biểu đồ tỷ lệ phần trăm phân bổ câu trả lời</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900">
                    Phân Tích Chi Tiết Từng Câu Hỏi Khảo Sát
                  </h3>
                </div>

                {/* Filter Selector */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {SURVEY_QUESTIONS.map(q => (
                    <button
                      key={q.id}
                      onClick={() => setSelectedChartQuestionId(q.id)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-all ${
                        selectedChartQuestionId === q.id
                          ? 'bg-[#01914c] text-white shadow-xs font-bold'
                          : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      Câu 0{q.number}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Question Details & Chart */}
              {(() => {
                const targetQ = SURVEY_QUESTIONS.find(q => q.id === selectedChartQuestionId)!;
                const breakdown = getQuestionBreakdown(targetQ.id);
                const currentQuestionTotal = breakdown.reduce((sum, item) => sum + item.count, 0);

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Interactive Horizontal Bar Chart */}
                    <div className="lg:col-span-8 space-y-6">
                      <div className="p-4 bg-white rounded-xl border border-stone-200">
                        <div className="text-xs font-mono font-bold text-[#2a40d2] mb-1">
                          CÂU HỎI 0{targetQ.number}:
                        </div>
                        <h4 className="font-heading text-base sm:text-lg font-bold text-stone-900 leading-snug">
                          {targetQ.question}
                        </h4>
                        <div className="mt-2 text-xs text-stone-500">
                          Tổng số mẫu ghi nhận: <strong className="text-stone-800">{currentQuestionTotal} lượt trả lời</strong>
                        </div>
                      </div>

                      {/* Chart Bars */}
                      <div className="space-y-4">
                        {breakdown.map((item, idx) => {
                          const barColors = [
                            'bg-[#01914c]',
                            'bg-[#2a40d2]',
                            'bg-emerald-600',
                            'bg-amber-600',
                            'bg-stone-500'
                          ];
                          const activeColor = barColors[idx % barColors.length];

                          return (
                            <div key={idx} className="p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 transition-all">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <span className="text-xs sm:text-sm font-semibold text-stone-800">
                                  {item.label}
                                </span>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-stone-500 font-mono">
                                    {item.count} người
                                  </span>
                                  <span className="text-sm sm:text-base font-extrabold text-stone-900 font-heading tabular-data">
                                    {item.pct}%
                                  </span>
                                </div>
                              </div>

                              {/* Progress Track */}
                              <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden p-0.5 border border-stone-200/50">
                                <div
                                  className={`h-full rounded-full transition-all duration-700 ${activeColor}`}
                                  style={{ width: `${item.pct}%` }}
                                />
                              </div>

                              <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400">
                                <span>Tỷ lệ khảo sát trực tiếp website: <strong>{item.pct}%</strong></span>
                                <span>Mẫu chuẩn bài báo (n=255): <strong>{item.benchmarkPct}%</strong></span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Visual Donut Representation & Quick Takeaway */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* SVG Donut Chart Card */}
                      <div className="p-6 bg-white rounded-xl border border-stone-200 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider mb-4">
                          <PieIcon className="w-4 h-4 text-[#01914c]" />
                          <span>Tỷ trọng phần trăm</span>
                        </div>

                        {/* SVG Pie Representation */}
                        <div className="relative w-44 h-44 mx-auto mb-4 flex items-center justify-center">
                          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                            {currentQuestionTotal === 0 ? (
                              <circle
                                cx="18"
                                cy="18"
                                r="15.91549430918954"
                                fill="transparent"
                                stroke="#e7e5e4"
                                strokeWidth="3.2"
                                strokeDasharray="100 0"
                              />
                            ) : (
                              (() => {
                                let accumulatedPct = 0;
                                const colors = ['#01914c', '#2a40d2', '#10b981', '#f59e0b', '#78716c'];
                                return breakdown.map((item, i) => {
                                  const strokeDasharray = `${item.pct} ${100 - item.pct}`;
                                  const strokeDashoffset = -accumulatedPct;
                                  accumulatedPct += item.pct;
                                  return (
                                    <circle
                                      key={i}
                                      cx="18"
                                      cy="18"
                                      r="15.91549430918954"
                                      fill="transparent"
                                      stroke={colors[i % colors.length]}
                                      strokeWidth="3.2"
                                      strokeDasharray={strokeDasharray}
                                      strokeDashoffset={strokeDashoffset}
                                      className="transition-all duration-500"
                                    />
                                  );
                                });
                              })()
                            )}
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs text-stone-400 font-medium">Tổng mẫu</span>
                            <span className="text-xl font-extrabold text-stone-900 font-heading">{currentQuestionTotal}</span>
                            <span className="text-[10px] text-stone-500 font-bold">{currentQuestionTotal === 0 ? '0%' : '100%'}</span>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="space-y-1.5 text-left text-xs">
                          {breakdown.map((item, i) => {
                            const colors = ['bg-[#01914c]', 'bg-[#2a40d2]', 'bg-emerald-500', 'bg-amber-500', 'bg-stone-500'];
                            return (
                              <div key={i} className="flex items-center justify-between text-stone-600">
                                <div className="flex items-center gap-2 truncate pr-2">
                                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${colors[i % colors.length]}`} />
                                  <span className="truncate">{item.label}</span>
                                </div>
                                <span className="font-bold text-stone-900 shrink-0 tabular-data">{item.pct}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Scientific Note Card */}
                      <div className="p-5 bg-[#f2f7ef] rounded-xl border border-[#01914c]/20">
                        <h5 className="text-xs font-bold text-[#01914c] uppercase tracking-wider mb-2">
                          Nhận định học thuật
                        </h5>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          Dữ liệu khảo sát phản ánh quy luật tâm lý được công bố trên <em>Tourism Recreation Research</em>: Khi chất lượng lập luận và tính minh bạch được đảm bảo, tỷ lệ chấp nhận phụ phí carbon chuyển hóa từ thái độ thụ động sang cam kết chủ động.
                        </p>
                      </div>

                    </div>

                  </div>
                );
              })()}

            </div>

            {/* Persona Distribution Chart Breakdown */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
              <div className="mb-6">
                <div className="text-xs font-bold text-[#01914c] uppercase tracking-wider mb-1">
                  Phân tích tâm lý học du khách
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-900">
                  Phân Bổ 4 Nhóm Chân Dung Khách Du Lịch Gen Z (Psychological Personas)
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Kết quả phân cụm hành vi từ 255 người phỏng vấn định lượng và 32 phỏng vấn bán cấu trúc chuyên sâu.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 bg-[#fcfdf9] border border-[#01914c]/30 rounded-xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#01914c]">Nhóm Đa Số</span>
                    <span className="text-[10px] bg-emerald-100 text-[#01914c] font-bold px-1.5 py-0.5 rounded">Mẫu gốc: 45.2%</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-stone-900 mb-1">Nhà Lý Tưởng Thực Dụng</h4>
                  <div className="text-2xl font-extrabold text-[#01914c] font-heading my-1">
                    {totalParticipants === 0 ? '0%' : `${supportRate}%`}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium mb-1">
                    {totalParticipants === 0 ? '0 lượt trên website' : `${positiveWillingnessCount} lượt ủng hộ`}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Sẵn sàng đóng góp nhưng đòi hỏi tính minh bạch cao, có mã QR kiểm toán và không lãng phí tiền.
                  </p>
                </div>

                <div className="p-4 bg-[#fcfdf9] border border-amber-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-700">Nhóm Thận Trọng</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Mẫu gốc: 24.6%</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-stone-900 mb-1">Du Khách Hoài Nghi</h4>
                  <div className="text-2xl font-extrabold text-amber-700 font-heading my-1">
                    {totalParticipants === 0 ? '0%' : `${verificationDemandRate}%`}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium mb-1">
                    {totalParticipants === 0 ? '0 lượt trên website' : `${verifyTrustCount} lượt yêu cầu đối ứng`}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Cảnh giác với nạn tẩy xanh (greenwashing), chỉ tin khi có kiểm toán độc lập và cơ chế đối ứng 50-50.
                  </p>
                </div>

                <div className="p-4 bg-[#fcfdf9] border border-[#2a40d2]/30 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#2a40d2]">Nhóm Tiên Phong</span>
                    <span className="text-[10px] bg-blue-100 text-[#2a40d2] font-bold px-1.5 py-0.5 rounded">Mẫu gốc: 15.2%</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-stone-900 mb-1">Nhà Tiên Phong Sinh Thái</h4>
                  <div className="text-2xl font-extrabold text-[#2a40d2] font-heading my-1">
                    {totalParticipants === 0 ? '0%' : `${totalParticipants > 0 ? Math.round(((statsData['willingnessToContribute']?.['Chắc chắn có'] || 0) / totalParticipants) * 1000) / 10 : 0}%`}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium mb-1">
                    {totalParticipants === 0 ? '0 lượt trên website' : `${statsData['willingnessToContribute']?.['Chắc chắn có'] || 0} lượt cam kết chắc chắn`}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Động lực đạo đức nội tại mạnh mẽ, luôn chủ động tìm kiếm các dịch vụ phát thải thấp.
                  </p>
                </div>

                <div className="p-4 bg-[#fcfdf9] border border-stone-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-600">Nhóm Tiện Ích</span>
                    <span className="text-[10px] bg-stone-100 text-stone-700 font-bold px-1.5 py-0.5 rounded">Mẫu gốc: 15.0%</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-stone-900 mb-1">Du Khách Ưu Tiên Giá Trị</h4>
                  <div className="text-2xl font-extrabold text-stone-800 font-heading my-1">
                    {totalParticipants === 0 ? '0%' : `${totalParticipants > 0 ? Math.round(((statsData['biggestBarrier']?.['Bất tiện khi đăng ký'] || 0) / totalParticipants) * 1000) / 10 : 0}%`}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium mb-1">
                    {totalParticipants === 0 ? '0 lượt trên website' : `${statsData['biggestBarrier']?.['Bất tiện khi đăng ký'] || 0} lượt quan tâm tiện ích`}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Ưu tiên sự thuận tiện và giá vé hợp lý, cần quy trình 1-click không ma sát và mức phí vi mô.
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="p-6 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-heading text-lg font-bold">
                  Bạn Chưa Làm Khảo Sát Này?
                </h4>
                <p className="text-xs text-stone-400 mt-1 max-w-xl">
                  Chỉ mất 2 phút để hoàn thành 6 câu hỏi, nhận chẩn đoán tâm lý du lịch của riêng bạn và đóng góp thêm dữ liệu thực tế vào biểu đồ nghiên cứu!
                </p>
              </div>
              <button
                onClick={() => {
                  setViewMode('survey');
                  handleReset();
                }}
                className="px-6 py-3 bg-[#01914c] hover:bg-[#01783e] text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              >
                Bắt đầu làm khảo sát ngay
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
