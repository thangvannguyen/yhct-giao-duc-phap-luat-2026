import { IconCheck, IconX } from './icons'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

/**
 * Danh sách lựa chọn A/B/C/D dùng chung cho Flashcard, Ôn trắc nghiệm và Thi thử.
 * Cố tình KHÔNG dùng viền và KHÔNG tô nền cả dòng: trạng thái chỉ thể hiện ở
 * badge chữ cái (đổi màu nền) và màu chữ, để phần đọc luôn sạch mắt.
 * - `revealed = false`: chỉ đánh dấu lựa chọn đang chọn, chưa lộ đúng/sai.
 * - `revealed = true` : badge xanh cho đáp án đúng, badge đỏ cho lựa chọn sai.
 */
export default function OptionList({ choices, selected, revealed, onSelect, size = 'md' }) {
  const pad = size === 'sm' ? 'px-2.5 py-2 sm:px-3 sm:py-2.5' : 'px-3 py-2.5 sm:px-3.5 sm:py-3'

  return (
    <div className="flex flex-col gap-0.5">
      {choices.map((choice, i) => {
        const isSelected = selected === i
        const showCorrect = revealed && choice.isCorrect
        const showWrong = revealed && isSelected && !choice.isCorrect
        const isDimmed = revealed && !showCorrect && !showWrong

        const row = onSelect ? 'hover:bg-stone-100/70 dark:hover:bg-white/[0.04]' : ''
        let badge = 'bg-stone-100 text-stone-500 dark:bg-white/[0.08] dark:text-stone-400'
        let text = 'text-stone-800 dark:text-stone-100'

        if (isSelected && !revealed) {
          badge = 'bg-indigo-600 text-white'
          text = 'font-medium text-indigo-700 dark:text-indigo-300'
        }
        if (showCorrect) {
          badge = 'bg-emerald-600 text-white'
          text = 'font-medium text-emerald-700 dark:text-emerald-400'
        } else if (showWrong) {
          badge = 'bg-rose-600 text-white'
          text = 'font-medium text-rose-600 dark:text-rose-400'
        } else if (isDimmed) {
          badge = 'bg-stone-100 text-stone-400 dark:bg-white/[0.05] dark:text-stone-600'
          text = 'text-stone-400 dark:text-stone-500'
        }

        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect?.(i)}
            disabled={!onSelect}
            className={`flex w-full items-start gap-3 rounded-xl text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${pad} ${row} ${
              onSelect ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors ${badge}`}
            >
              {showCorrect ? (
                <IconCheck className="h-3.5 w-3.5" />
              ) : showWrong ? (
                <IconX className="h-3.5 w-3.5" />
              ) : (
                LETTERS[i]
              )}
            </span>
            <span className={`text-[13.5px] leading-relaxed sm:text-[14.5px] ${text}`}>{choice.text}</span>
          </button>
        )
      })}
    </div>
  )
}
