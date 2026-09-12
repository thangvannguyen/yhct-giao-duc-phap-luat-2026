import { useProgressStore } from '../context/ProgressContext'
import { IconBulb } from './icons'

/**
 * Khối "Vì sao đáp án này đúng".
 * Tự ẩn khi người dùng tắt công tắc giải thích, nên nơi gọi không cần kiểm tra.
 */
export default function ExplainBox({ text, className = '' }) {
  const { showExplain } = useProgressStore()
  if (!showExplain || !text) return null

  return (
    <div
      className={`animate-rise flex gap-2.5 rounded-xl bg-amber-50/80 px-3 py-2.5 text-amber-900 dark:bg-amber-400/[0.08] dark:text-amber-100/90 ${className}`}
    >
      <IconBulb className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
      <p className="text-[13px] leading-relaxed">
        <span className="font-semibold">Vì sao: </span>
        {text}
      </p>
    </div>
  )
}
