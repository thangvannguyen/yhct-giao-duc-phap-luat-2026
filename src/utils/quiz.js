import { shuffle } from './shuffle'

/**
 * Trong dữ liệu gốc đáp án đúng luôn nằm ở index 0, nên MỌI màn hình hiển thị
 * lựa chọn đều phải trộn qua hàm này, nếu không đáp án đúng lúc nào cũng là câu A.
 * Trả về mỗi câu kèm `choices: [{ text, isCorrect }]`.
 */
export function prepareQuestions(questions, { shuffleQuestions = false, limit } = {}) {
  const list = shuffleQuestions ? shuffle(questions) : [...questions]
  const sliced = limit ? list.slice(0, limit) : list
  return sliced.map((q) => ({
    ...q,
    choices: shuffle(q.options.map((text, i) => ({ text, isCorrect: i === q.correctIndex }))),
  }))
}

export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

export function gradeLabel(pct) {
  if (pct >= 90) return { text: 'Xuất sắc', tone: 'text-emerald-600 dark:text-emerald-400' }
  if (pct >= 80) return { text: 'Giỏi', tone: 'text-emerald-600 dark:text-emerald-400' }
  if (pct >= 65) return { text: 'Khá', tone: 'text-indigo-600 dark:text-indigo-400' }
  if (pct >= 50) return { text: 'Đạt', tone: 'text-amber-600 dark:text-amber-400' }
  return { text: 'Chưa đạt', tone: 'text-rose-600 dark:text-rose-400' }
}
