import { useMemo, useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { useProgressStore } from '../context/ProgressContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import TopicFilter from '../components/TopicFilter'
import StatsPanel from '../components/StatsPanel'
import TopicBadge from '../components/TopicBadge'
import { Button, Card, EmptyState, NumberBadge, PageHeader } from '../components/ui'
import { IconCheck, IconSearch } from '../components/icons'

function LearnedToggle({ learned, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={learned}
      title={learned ? 'Bỏ đánh dấu đã thuộc' : 'Đánh dấu đã thuộc'}
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all ${
        learned
          ? 'border-emerald-500 bg-emerald-500 text-white'
          : 'border-stone-300 text-transparent hover:border-emerald-400 hover:text-emerald-300 dark:border-white/15'
      }`}
    >
      <IconCheck className="h-3.5 w-3.5" />
    </button>
  )
}

export default function ListPage() {
  useDocumentTitle('Danh sách câu hỏi')
  const { learned, quizHistory, setLearned, resetProgress } = useProgressStore()
  const [topic, setTopic] = useState('all')
  const [search, setSearch] = useState('')
  const [onlyUnlearned, setOnlyUnlearned] = useState(false)
  const [openId, setOpenId] = useState(null)

  const counts = useMemo(() => {
    const c = { all: QUESTIONS.length }
    for (const q of QUESTIONS) c[q.topic] = (c[q.topic] ?? 0) + 1
    return c
  }, [])

  const visible = QUESTIONS.filter((q) => {
    if (topic !== 'all' && q.topic !== topic) return false
    if (onlyUnlearned && learned[q.id]) return false
    return q.question.toLowerCase().includes(search.trim().toLowerCase())
  })

  return (
    <>
      <PageHeader title="Danh sách câu hỏi" subtitle="58 câu hỏi kèm đáp án, bấm vào câu để mở đáp án" />

      <StatsPanel questions={QUESTIONS} learned={learned} quizHistory={quizHistory} onReset={resetProgress} />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <IconSearch className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm câu hỏi theo từ khoá..."
              className="h-11 w-full rounded-xl border border-stone-200 bg-white pr-3 pl-10 text-sm text-stone-900 shadow-card placeholder:text-stone-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none dark:border-white/[0.08] dark:bg-[#14141d] dark:text-stone-100"
            />
          </div>
          <Button
            variant={onlyUnlearned ? 'primary' : 'outline'}
            size="md"
            className="h-11"
            onClick={() => setOnlyUnlearned((v) => !v)}
          >
            Chỉ câu chưa thuộc
          </Button>
        </div>

        <TopicFilter selected={topic} onChange={setTopic} counts={counts} />
      </div>

      {visible.length === 0 ? (
        <EmptyState>Không có câu hỏi nào phù hợp.</EmptyState>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {visible.map((q) => {
            const isOpen = openId === q.id
            const isLearned = !!learned[q.id]
            return (
              <Card
                as="li"
                key={q.id}
                className={`overflow-hidden transition-colors ${
                  isOpen ? 'border-indigo-300 dark:border-indigo-400/40' : ''
                }`}
              >
                <div className="flex items-start gap-3 p-4">
                  <button
                    className="flex-1 cursor-pointer text-left"
                    onClick={() => setOpenId(isOpen ? null : q.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <NumberBadge>Câu {q.number}</NumberBadge>
                      <TopicBadge topic={q.topic} />
                    </div>
                    <p className="text-[13.5px] leading-relaxed font-medium text-stone-800 sm:text-[14.5px] dark:text-stone-100">
                      {q.question}
                    </p>
                  </button>
                  <LearnedToggle learned={isLearned} onToggle={() => setLearned(q.id, !isLearned)} />
                </div>

                {isOpen && (
                  <div className="animate-rise border-t border-stone-100 bg-emerald-50/60 px-4 py-3.5 dark:border-white/5 dark:bg-emerald-400/[0.07]">
                    <p className="mb-1 text-[11px] font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
                      Đáp án
                    </p>
                    <p className="text-[13.5px] leading-relaxed text-emerald-900 sm:text-[14.5px] dark:text-emerald-100">
                      {q.options[q.correctIndex]}
                    </p>
                    {q.note && (
                      <p className="mt-2 text-xs text-emerald-700/80 dark:text-emerald-300/70">{q.note}</p>
                    )}
                  </div>
                )}
              </Card>
            )
          })}
        </ul>
      )}
    </>
  )
}
