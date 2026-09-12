import { useMemo, useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { prepareQuestions } from '../utils/quiz'
import TopicFilter from '../components/TopicFilter'
import OptionList from '../components/OptionList'
import ExplainBox from '../components/ExplainBox'
import TopicBadge from '../components/TopicBadge'
import { Badge, Button, Card, EmptyState, PageHeader } from '../components/ui'
import { IconEye, IconRotate, IconSend } from '../components/icons'

export default function PracticePage() {
  useDocumentTitle('Ôn trắc nghiệm')
  const [topic, setTopic] = useState('all')
  const [seed, setSeed] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [revealAll, setRevealAll] = useState(false)

  const counts = useMemo(() => {
    const c = { all: QUESTIONS.length }
    for (const q of QUESTIONS) c[q.topic] = (c[q.topic] ?? 0) + 1
    return c
  }, [])

  const sheet = useMemo(() => {
    const pool = topic === 'all' ? QUESTIONS : QUESTIONS.filter((q) => q.topic === topic)
    // Mỗi lần "Làm lại" (seed đổi) phải ra đề mới: trộn cả thứ tự câu hỏi lẫn thứ tự đáp án.
    return prepareQuestions(pool, { shuffleQuestions: true })
    // seed chỉ dùng để ép useMemo tính lại, không xuất hiện trong thân hàm
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, seed])

  const reset = (nextTopic = topic) => {
    setTopic(nextTopic)
    setAnswers({})
    setSubmitted(false)
    setRevealAll(false)
    setSeed((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const answeredCount = Object.keys(answers).length
  const score = sheet.reduce(
    (acc, q) => acc + (answers[q.id] !== undefined && q.choices[answers[q.id]].isCorrect ? 1 : 0),
    0,
  )
  const showResult = submitted || revealAll

  return (
    <>
      <PageHeader
        title="Ôn trắc nghiệm"
        subtitle={`Toàn bộ ${sheet.length} câu dạng đề thi — chọn đáp án rồi nộp bài để chấm điểm`}
      />

      <TopicFilter selected={topic} onChange={(t) => reset(t)} counts={counts} />

      {sheet.length === 0 ? (
        <EmptyState>Không có câu hỏi nào trong chủ đề này.</EmptyState>
      ) : (
        <>
          {/* Thanh công cụ dính trên đầu */}
          <div className="sticky top-[57px] z-20 -mx-4 border-y border-stone-200/80 bg-[var(--page)]/90 px-4 py-2.5 backdrop-blur-xl lg:top-0 lg:rounded-2xl lg:border dark:border-white/[0.07]">
            <div className="flex flex-wrap items-center gap-2">
              <div className="min-w-0 flex-1">
                {submitted ? (
                  <p className="text-sm font-semibold tabular-nums">
                    Kết quả:{' '}
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {score}/{sheet.length}
                    </span>{' '}
                    <span className="font-normal text-stone-500">
                      ({Math.round((score / sheet.length) * 100)}%)
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-stone-500 tabular-nums dark:text-stone-400">
                    Đã chọn <span className="font-semibold text-stone-800 dark:text-stone-100">{answeredCount}</span>
                    /{sheet.length} câu
                  </p>
                )}
              </div>

              {!submitted && (
                <Button size="sm" onClick={() => setRevealAll((v) => !v)}>
                  <IconEye className="h-3.5 w-3.5" />
                  {revealAll ? 'Ẩn đáp án' : 'Hiện đáp án'}
                </Button>
              )}
              <Button size="sm" onClick={() => reset()}>
                <IconRotate className="h-3.5 w-3.5" />
                Làm lại
              </Button>
              {!submitted && (
                <Button
                  size="sm"
                  variant="primary"
                  disabled={answeredCount === 0}
                  onClick={() => {
                    setSubmitted(true)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  <IconSend className="h-3.5 w-3.5" />
                  Nộp bài
                </Button>
              )}
            </div>
          </div>

          <ol className="flex flex-col gap-3">
            {sheet.map((q, qi) => {
              const picked = answers[q.id]
              const isCorrect = picked !== undefined && q.choices[picked].isCorrect
              return (
                <Card
                  as="li"
                  key={q.id}
                  className={`p-4 sm:p-5 ${
                    showResult && picked !== undefined
                      ? isCorrect
                        ? 'border-emerald-300 dark:border-emerald-400/30'
                        : 'border-rose-300 dark:border-rose-400/30'
                      : ''
                  }`}
                >
                  <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-stone-900 text-[11px] font-bold text-white dark:bg-white dark:text-stone-900">
                      {qi + 1}
                    </span>
                    <TopicBadge topic={q.topic} />
                    {showResult && picked === undefined && (
                      <Badge className="bg-amber-50 text-amber-700 ring-amber-200/70 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20">
                        Chưa trả lời
                      </Badge>
                    )}
                  </div>

                  <p className="mb-3.5 text-[14px] leading-relaxed font-medium text-stone-900 sm:text-[15px] dark:text-stone-50">
                    {q.question}
                  </p>

                  <OptionList
                    choices={q.choices}
                    selected={picked ?? null}
                    revealed={showResult}
                    size="sm"
                    onSelect={
                      showResult ? undefined : (oi) => setAnswers((a) => ({ ...a, [q.id]: oi }))
                    }
                  />

                  {showResult && q.note && (
                    <p className="mt-2.5 text-xs text-stone-500 dark:text-stone-400">{q.note}</p>
                  )}
                  {showResult && <ExplainBox text={q.explain} className="mt-2.5" />}
                </Card>
              )
            })}
          </ol>

          {!submitted && (
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={answeredCount === 0}
              onClick={() => {
                setSubmitted(true)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <IconSend className="h-4 w-4" />
              Nộp bài ({answeredCount}/{sheet.length})
            </Button>
          )}
        </>
      )}
    </>
  )
}
