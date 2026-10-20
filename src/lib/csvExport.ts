import { SurveyRecord, ContactRecord } from './firebase';

/**
 * Escape a CSV field value properly according to RFC 4180
 * Handles quotes, commas, newlines, null/undefined
 */
function escapeCSVValue(val: unknown): string {
  if (val === null || val === undefined) {
    return '""';
  }
  const str = String(val);
  // If string contains quotes, commas, newlines, or carriage returns, wrap in quotes and escape internal quotes
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Format Firestore timestamp or Date to readable string
 */
function formatTimestamp(ts: any): string {
  if (!ts) return 'N/A';
  try {
    if (typeof ts.toDate === 'function') {
      const d = ts.toDate();
      return d.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    }
    if (ts.seconds) {
      const d = new Date(ts.seconds * 1000);
      return d.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    }
    const d = new Date(ts);
    if (!isNaN(d.getTime())) {
      return d.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    }
  } catch {
    // Fallback
  }
  return String(ts);
}

/**
 * Download a CSV file with UTF-8 BOM for Microsoft Excel compatibility
 */
function downloadCSV(csvContent: string, filename: string) {
  // UTF-8 BOM prefix \uFEFF ensures Excel displays Vietnamese accents properly
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export Survey Records to CSV
 */
export function exportSurveysToCSV(surveys: SurveyRecord[]) {
  const headers = [
    'STT',
    'Thời gian gửi (VN)',
    'Mã bản ghi (ID)',
    '1. Nhóm tuổi',
    '2. Du lịch trong năm qua',
    '3. Mức hiểu biết về phụ phí carbon',
    '4. Yếu tố tạo niềm tin lớn nhất',
    '5. Sẵn sàng đóng góp phụ phí',
    '6. Rào cản lớn nhất'
  ];

  const rows = surveys.map((item, index) => {
    return [
      escapeCSVValue(index + 1),
      escapeCSVValue(formatTimestamp(item.createdAt)),
      escapeCSVValue(item.id || item.clientSubmissionId || ''),
      escapeCSVValue(item.ageGroup || ''),
      escapeCSVValue(item.traveledPastYear || ''),
      escapeCSVValue(item.carbonOffsetUnderstanding || ''),
      escapeCSVValue(item.trustFactor || ''),
      escapeCSVValue(item.willingnessToContribute || ''),
      escapeCSVValue(item.biggestBarrier || '')
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const nowStr = new Date().toISOString().slice(0, 10);
  downloadCSV(csvContent, `Ket_qua_khao_sat_ACE2ACT_${nowStr}.csv`);
}

/**
 * Translate request type to friendly Vietnamese
 */
export function formatRequestType(type: string): string {
  switch (type) {
    case 'full_paper':
      return 'PDF toàn văn';
    case 'feedback':
      return 'Góp ý';
    case 'question':
      return 'Thắc mắc';
    default:
      return type || 'Khác';
  }
}

/**
 * Export Contact Records to CSV
 */
export function exportContactsToCSV(contacts: ContactRecord[]) {
  const headers = [
    'STT',
    'Thời gian gửi (VN)',
    'Mã bản ghi (ID)',
    'Họ và tên',
    'Email',
    'Trường Đại học / Đơn vị công tác',
    'Nhu cầu liên hệ',
    'Nội dung tin nhắn / Thắc mắc / Góp ý'
  ];

  const rows = contacts.map((item, index) => {
    return [
      escapeCSVValue(index + 1),
      escapeCSVValue(formatTimestamp(item.createdAt)),
      escapeCSVValue(item.id || item.clientSubmissionId || ''),
      escapeCSVValue(item.name || ''),
      escapeCSVValue(item.email || ''),
      escapeCSVValue(item.university || ''),
      escapeCSVValue(formatRequestType(item.requestType)),
      escapeCSVValue(item.note || '')
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const nowStr = new Date().toISOString().slice(0, 10);
  downloadCSV(csvContent, `Thong_tin_lien_he_ACE2ACT_${nowStr}.csv`);
}
