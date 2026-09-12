import { TOPIC_BY_ID } from '../data/topics'

/** Nhãn chương học kèm icon — dùng chung cho mọi thẻ câu hỏi. */
export default function TopicBadge({ topic, full = false }) {
  const t = TOPIC_BY_ID[topic]
  if (!t) return null
  const { Icon } = t
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${t.chip}`}
    >
      <Icon className="h-3 w-3 shrink-0" />
      {full ? t.label : t.short}
    </span>
  )
}
