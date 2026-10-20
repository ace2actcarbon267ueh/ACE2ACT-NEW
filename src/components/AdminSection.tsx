import React, { useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  ADMIN_EMAIL, 
  fetchAllSurveys, 
  fetchAllContacts,
  SurveyRecord, 
  ContactRecord 
} from '../lib/firebase';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { 
  exportSurveysToCSV, 
  exportContactsToCSV, 
  formatRequestType 
} from '../lib/csvExport';
import { 
  Shield, 
  ShieldAlert, 
  LogOut, 
  Download, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  Users, 
  Mail, 
  ArrowLeft, 
  Copy, 
  Check, 
  AlertTriangle,
  Info,
  Calendar,
  Building,
  UserCheck
} from 'lucide-react';

interface AdminSectionProps {
  onBackToHome: () => void;
}

export const AdminSection: React.FC<AdminSectionProps> = ({ onBackToHome }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'surveys' | 'contacts'>('surveys');

  // Surveys state
  const [surveys, setSurveys] = useState<SurveyRecord[]>([]);
  const [surveysLoading, setSurveysLoading] = useState<boolean>(false);
  const [surveysError, setSurveysError] = useState<string | null>(null);

  // Contacts state
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [contactsLoading, setContactsLoading] = useState<boolean>(false);
  const [contactsError, setContactsError] = useState<string | null>(null);

  // Copied UID state
  const [copiedUid, setCopiedUid] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      setAuthError(null);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Load data once admin is confirmed
  useEffect(() => {
    if (currentUser && isAdmin) {
      loadSurveysData();
      loadContactsData();
    } else {
      setSurveys([]);
      setContacts([]);
    }
  }, [currentUser, isAdmin]);

  const loadSurveysData = async () => {
    setSurveysLoading(true);
    setSurveysError(null);
    try {
      const data = await fetchAllSurveys();
      setSurveys(data);
    } catch (err: any) {
      setSurveysError(err?.message || 'Không thể tải dữ liệu khảo sát từ Firestore.');
    } finally {
      setSurveysLoading(false);
    }
  };

  const loadContactsData = async () => {
    setContactsLoading(true);
    setContactsError(null);
    try {
      const data = await fetchAllContacts();
      setContacts(data);
    } catch (err: any) {
      setContactsError(err?.message || 'Không thể tải dữ liệu liên hệ từ Firestore.');
    } finally {
      setContactsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Login error:', err);
      setAuthError(err?.message || 'Đăng nhập Google thất bại. Vui lòng thử lại.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSwitchAccount = async () => {
    try {
      await signOut(auth);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Switch account error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const copyUidToClipboard = () => {
    if (currentUser?.uid) {
      navigator.clipboard.writeText(currentUser.uid);
      setCopiedUid(true);
      setTimeout(() => setCopiedUid(false), 2500);
    }
  };

  const formatDateTime = (ts: any) => {
    if (!ts) return 'N/A';
    try {
      if (typeof ts.toDate === 'function') {
        return ts.toDate().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      }
      if (ts.seconds) {
        return new Date(ts.seconds * 1000).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      }
      const d = new Date(ts);
      if (!isNaN(d.getTime())) {
        return d.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      }
    } catch {
      // fallback
    }
    return String(ts);
  };

  return (
    <div className="min-h-screen bg-[#f8faf7] text-stone-900 pb-20">
      {/* Top Admin Header Bar */}
      <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-40">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về trang chủ</span>
            </button>
            <div className="h-4 w-px bg-stone-700 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#01914c] flex items-center justify-center font-bold text-white text-xs">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-base tracking-tight">
                ACE<span className="text-[#dbf067]">2</span>ACT Admin Portal
              </span>
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center gap-3 text-xs">
              <div className="hidden md:flex flex-col text-right">
                <span className="font-semibold text-stone-200">{currentUser.email}</span>
                <span className="text-stone-400 text-[11px] font-mono truncate max-w-[200px]">
                  UID: {currentUser.uid}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-8">
        {/* Loading Auth State */}
        {authLoading && (
          <div className="py-24 text-center">
            <RefreshCw className="w-8 h-8 text-[#01914c] animate-spin mx-auto mb-3" />
            <p className="text-sm text-stone-600 font-medium">Đang kiểm tra thông tin xác thực...</p>
          </div>
        )}

        {/* NOT LOGGED IN STATE */}
        {!authLoading && !currentUser && (
          <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-50 text-[#01914c] rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-100">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl font-extrabold text-stone-900 mb-2">
              Đăng Nhập Quản Trị
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              Khu vực quản trị chỉ dành cho tài khoản được cấp quyền:
              <br />
              <strong className="text-[#01914c] font-bold font-mono">{ADMIN_EMAIL}</strong>
            </p>

            {authError && (
              <div className="p-3 mb-5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2 text-left">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Đăng nhập bằng Google</span>
            </button>

            <div className="mt-6 pt-5 border-t border-stone-100 text-[11px] text-stone-500">
              Hệ thống xác thực thật qua Firebase Authentication và bảo vệ dữ liệu bằng Firestore Security Rules.
            </div>
          </div>
        )}

        {/* LOGGED IN BUT NOT ADMIN STATE */}
        {!authLoading && currentUser && !isAdmin && (
          <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-rose-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-xl font-extrabold text-stone-900 mb-2">
              Tài khoản này không có quyền quản trị
            </h2>
            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              Bạn đang đăng nhập bằng: <br />
              <strong className="text-stone-900 font-mono text-sm">{currentUser.email}</strong>
            </p>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Chỉ tài khoản chính thức <strong className="text-[#01914c]">{ADMIN_EMAIL}</strong> mới được phép truy cập và tải dữ liệu khảo sát và liên hệ.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleSwitchAccount}
                className="w-full py-2.5 px-4 bg-[#01914c] hover:bg-[#01783e] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Đổi tài khoản Google khác
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 px-4 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        )}

        {/* LOGGED IN AS ADMIN */}
        {!authLoading && currentUser && isAdmin && (
          <div className="space-y-6">
            
            {/* Admin Info & UID Guidance Box */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-[#01914c] uppercase tracking-wider">
                    Xác nhận quyền Quản trị viên
                  </span>
                </div>
                <h2 className="font-heading text-xl font-extrabold text-stone-900 mt-0.5">
                  Xin chào, {currentUser.email}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-stone-600">
                  <span>Firebase Auth UID:</span>
                  <code className="bg-stone-100 px-2 py-0.5 rounded font-mono text-stone-800 select-all font-semibold">
                    {currentUser.uid}
                  </code>
                  <button
                    onClick={copyUidToClipboard}
                    className="p-1 text-stone-500 hover:text-stone-900 rounded cursor-pointer transition-colors"
                    title="Sao chép UID"
                  >
                    {copiedUid ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  {copiedUid && <span className="text-emerald-600 text-[11px] font-bold">Đã sao chép!</span>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 border border-stone-300 rounded-lg flex items-center gap-1.5 bg-stone-50 hover:bg-stone-100 cursor-pointer font-medium"
                >
                  <Info className="w-3.5 h-3.5 text-[#01914c]" />
                  <span>{showGuide ? 'Ẩn hướng dẫn UID' : 'Xem hướng dẫn cấu hình UID'}</span>
                </button>
              </div>
            </div>

            {/* Collapsible UID & Firebase Instruction */}
            {showGuide && (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-stone-700 space-y-3 leading-relaxed">
                <div className="font-bold text-[#01914c] text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Hướng Dẫn Cấu Hình Quyền Quản Trị Theo UID Trong Firestore</span>
                </div>
                <p>
                  1. <strong>UID của tài khoản bạn:</strong> <code className="bg-white px-2 py-0.5 rounded border border-emerald-300 font-mono font-bold">{currentUser.uid}</code>.
                </p>
                <p>
                  2. <strong>Bảo mật bằng Firestore Rules:</strong> Hệ thống Security Rules đã tự động đối soát email chính chủ <code>ace2act.carbon@gmail.com</code> (với <code>email_verified == true</code>) và bảng collection <code>/admins/{'{uid}'}</code>.
                </p>
                <p>
                  3. <strong>Để khóa quyền vĩnh viễn theo UID:</strong> Trong Firebase Console &gt; Firestore Database, bạn có thể tạo 1 document tại đường dẫn <code>admins/{currentUser.uid}</code> với các trường: <code>email: "{currentUser.email}"</code>, <code>role: "admin"</code>. Khi đó, chỉ duy nhất UID này được đọc các collection khảo sát và liên hệ!
                </p>
                <p>
                  4. <strong>Authorized Domains trên Vercel:</strong> Khi triển khai lên Vercel, hãy vào <em>Firebase Console &gt; Authentication &gt; Settings &gt; Authorized domains</em> và thêm tên miền Vercel của bạn (ví dụ: <code>your-app.vercel.app</code>) để Google Sign-In hoạt động trơn tru.
                </p>
              </div>
            )}

            {/* Management Tabs */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('surveys')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'surveys'
                      ? 'bg-[#01914c] text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Kết quả khảo sát</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'surveys' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {surveys.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'contacts'
                      ? 'bg-[#01914c] text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Thông tin liên hệ</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'contacts' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {contacts.length}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {activeTab === 'surveys' ? (
                  <>
                    <button
                      onClick={loadSurveysData}
                      disabled={surveysLoading}
                      className="px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 border border-stone-300 rounded-lg flex items-center gap-1.5 bg-white cursor-pointer hover:bg-stone-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${surveysLoading ? 'animate-spin' : ''}`} />
                      <span>Làm mới</span>
                    </button>
                    <button
                      onClick={() => exportSurveysToCSV(surveys)}
                      disabled={surveys.length === 0}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs ${
                        surveys.length > 0
                          ? 'bg-stone-900 hover:bg-stone-800 text-white cursor-pointer'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Xuất kết quả khảo sát (CSV)</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={loadContactsData}
                      disabled={contactsLoading}
                      className="px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 border border-stone-300 rounded-lg flex items-center gap-1.5 bg-white cursor-pointer hover:bg-stone-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${contactsLoading ? 'animate-spin' : ''}`} />
                      <span>Làm mới</span>
                    </button>
                    <button
                      onClick={() => exportContactsToCSV(contacts)}
                      disabled={contacts.length === 0}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs ${
                        contacts.length > 0
                          ? 'bg-stone-900 hover:bg-stone-800 text-white cursor-pointer'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Xuất thông tin liên hệ (CSV)</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* TAB A: SURVEY RESULTS */}
            {activeTab === 'surveys' && (
              <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-base font-bold text-stone-900">
                      Danh Sách Lượt Khảo Sát Đã Gửi ({surveys.length} lượt)
                    </h3>
                    <p className="text-xs text-stone-500">
                      Hiển thị toàn bộ câu trả lời 6 câu hỏi của từng đáp viên, sắp xếp từ mới nhất đến cũ nhất.
                    </p>
                  </div>
                </div>

                {surveysLoading && (
                  <div className="py-16 text-center">
                    <RefreshCw className="w-6 h-6 text-[#01914c] animate-spin mx-auto mb-2" />
                    <p className="text-xs text-stone-500">Đang tải dữ liệu khảo sát từ Firestore...</p>
                  </div>
                )}

                {surveysError && (
                  <div className="p-6 text-center space-y-3">
                    <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
                    <p className="text-xs sm:text-sm text-rose-600 font-medium">{surveysError}</p>
                    <button
                      onClick={loadSurveysData}
                      className="px-4 py-2 text-xs bg-stone-900 text-white rounded-lg cursor-pointer"
                    >
                      Thử lại
                    </button>
                  </div>
                )}

                {!surveysLoading && !surveysError && surveys.length === 0 && (
                  <div className="py-16 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                      <Users className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading text-sm font-bold text-stone-800">Chưa có dữ liệu khảo sát</h4>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      Khi người dùng hoàn tất bài khảo sát 6 câu và bấm gửi, các bản ghi sẽ xuất hiện tự động tại đây.
                    </p>
                  </div>
                )}

                {!surveysLoading && !surveysError && surveys.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-stone-100 text-stone-600 font-semibold border-b border-stone-200">
                          <th className="p-3 w-12 text-center">#</th>
                          <th className="p-3 whitespace-nowrap">Thời gian gửi</th>
                          <th className="p-3">Nhóm tuổi</th>
                          <th className="p-3">Du lịch 1 năm qua</th>
                          <th className="p-3">Hiểu biết phụ phí</th>
                          <th className="p-3">Yếu tố tin cậy</th>
                          <th className="p-3">Sẵn sàng đóng góp</th>
                          <th className="p-3">Rào cản lớn nhất</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-700">
                        {surveys.map((item, index) => (
                          <tr key={item.id || index} className="hover:bg-stone-50 transition-colors">
                            <td className="p-3 text-center text-stone-400 font-mono text-[11px]">
                              {index + 1}
                            </td>
                            <td className="p-3 whitespace-nowrap text-stone-900 font-medium">
                              {formatDateTime(item.createdAt)}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-800 font-medium">
                                {item.ageGroup || '—'}
                              </span>
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                item.traveledPastYear === 'Có' 
                                  ? 'bg-emerald-100 text-[#01914c]' 
                                  : 'bg-stone-100 text-stone-600'
                              }`}>
                                {item.traveledPastYear || '—'}
                              </span>
                            </td>
                            <td className="p-3 min-w-[140px]">
                              {item.carbonOffsetUnderstanding || '—'}
                            </td>
                            <td className="p-3 min-w-[150px] font-medium text-stone-900">
                              {item.trustFactor || '—'}
                            </td>
                            <td className="p-3 min-w-[130px]">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                item.willingnessToContribute === 'Chắc chắn có' || item.willingnessToContribute === 'Có thể có'
                                  ? 'bg-emerald-100 text-[#01914c]'
                                  : item.willingnessToContribute === 'Chưa quyết định'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {item.willingnessToContribute || '—'}
                              </span>
                            </td>
                            <td className="p-3 min-w-[150px] text-stone-600">
                              {item.biggestBarrier || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB B: CONTACT INQUIRIES */}
            {activeTab === 'contacts' && (
              <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-base font-bold text-stone-900">
                      Danh Sách Yêu Cầu Liên Hệ ({contacts.length} yêu cầu)
                    </h3>
                    <p className="text-xs text-stone-500">
                      Bao gồm yêu cầu PDF toàn văn, góp ý và thắc mắc từ khách truy cập.
                    </p>
                  </div>
                </div>

                {contactsLoading && (
                  <div className="py-16 text-center">
                    <RefreshCw className="w-6 h-6 text-[#01914c] animate-spin mx-auto mb-2" />
                    <p className="text-xs text-stone-500">Đang tải dữ liệu liên hệ từ Firestore...</p>
                  </div>
                )}

                {contactsError && (
                  <div className="p-6 text-center space-y-3">
                    <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
                    <p className="text-xs sm:text-sm text-rose-600 font-medium">{contactsError}</p>
                    <button
                      onClick={loadContactsData}
                      className="px-4 py-2 text-xs bg-stone-900 text-white rounded-lg cursor-pointer"
                    >
                      Thử lại
                    </button>
                  </div>
                )}

                {!contactsLoading && !contactsError && contacts.length === 0 && (
                  <div className="py-16 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading text-sm font-bold text-stone-800">Chưa có yêu cầu liên hệ</h4>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      Các tin nhắn, góp ý hoặc yêu cầu bản PDF toàn văn gửi qua form Liên hệ sẽ xuất hiện tại đây.
                    </p>
                  </div>
                )}

                {!contactsLoading && !contactsError && contacts.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-stone-100 text-stone-600 font-semibold border-b border-stone-200">
                          <th className="p-3 w-12 text-center">#</th>
                          <th className="p-3 whitespace-nowrap">Thời gian gửi</th>
                          <th className="p-3">Họ và tên</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Trường / Đơn vị</th>
                          <th className="p-3">Nhu cầu</th>
                          <th className="p-3 min-w-[250px]">Nội dung nhắn gửi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-700">
                        {contacts.map((item, index) => (
                          <tr key={item.id || index} className="hover:bg-stone-50 transition-colors">
                            <td className="p-3 text-center text-stone-400 font-mono text-[11px]">
                              {index + 1}
                            </td>
                            <td className="p-3 whitespace-nowrap text-stone-900 font-medium">
                              {formatDateTime(item.createdAt)}
                            </td>
                            <td className="p-3 whitespace-nowrap font-bold text-stone-900">
                              {item.name}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <a 
                                href={`mailto:${item.email}`}
                                className="text-[#01914c] hover:underline font-mono"
                              >
                                {item.email}
                              </a>
                            </td>
                            <td className="p-3 min-w-[140px] text-stone-600">
                              {item.university || '—'}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                item.requestType === 'full_paper'
                                  ? 'bg-blue-100 text-[#2a40d2]'
                                  : item.requestType === 'feedback'
                                  ? 'bg-emerald-100 text-[#01914c]'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {formatRequestType(item.requestType)}
                              </span>
                            </td>
                            <td className="p-3 text-stone-800 leading-relaxed whitespace-pre-wrap">
                              {item.note || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
