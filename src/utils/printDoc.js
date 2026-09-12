const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export const DOC_MODES = [
  { id: 'full', label: 'Câu hỏi + 4 phương án', hint: 'Có đánh dấu đáp án đúng' },
  { id: 'compact', label: 'Câu hỏi + đáp án ngắn', hint: 'Gọn nhất, tiết kiệm giấy' },
  { id: 'blank', label: 'Đề trắng để tự làm', hint: 'Đáp án in ở cuối trang' },
]

export const docTitle = (mode) =>
  mode === 'blank' ? 'ĐỀ ÔN TẬP (TỰ LÀM)' : 'CÂU HỎI ÔN TẬP KÈM ĐÁP ÁN'

export function todayVi() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

/** Vị trí (A/B/C/D) của đáp án đúng — dùng cho bảng đáp án ở cuối đề trắng. */
export const correctLetter = (q) => LETTERS[q.choices.findIndex((c) => c.isCorrect)]
