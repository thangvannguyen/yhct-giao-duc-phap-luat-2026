import { useCallback, useEffect, useMemo, useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { useProgressStore } from '../context/ProgressContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { prepareQuestions } from '../utils/quiz'
import TopicFilter from '../components/TopicFilter'
import OptionList from '../components/OptionList'
import ExplainBox from '../components/ExplainBox'
import TopicBadge from '../components/TopicBadge'
import { Badge, Button, Card, EmptyState, NumberBadge, PageHeader, ProgressBar } from '../components/ui'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconEye,
  IconShuffle,
} from '../components/icons'

export default function FlashcardPage() {
  useDocumentTitle('Flashcard')
  const { learned, setLearned } = useProgressStore()
  const [topic, setTopic] = useState('all')
  const [seed, setSeed] = useState(0)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [revealed, setRevealed] = useState({})

  const counts = useMemo(() => {
    const c = { all: QUESTIONS.length }
    for (const q of QUESTIONS) c[q.topic] = (c[q.topic] ?? 0) + 1
    return c
  }, [])

  const deck = useMemo(() => {
    const pool = topic === 'all' ? QUESTIONS : QUESTIONS.filter((q) => q.topic === topic)
    return prepareQuestions(pool, { shuffleQuestions: seed > 0 })
  }, [topic, seed])

  useEffect(() => {
    setIndex(0)
    setAnswers({})
    setRevealed({})
  }, [topic, seed])

  const total = deck.length
  const goNext = useCallback(() => setIndex((i) => (total ? (i + 1) % total : 0)), [total])
  const goPrev = useCallback(() => setIndex((i) => (total ? (i - 1 + total) % total : 0)), [total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  // Khi đổi chủ đề, deck đổi ngay ở render này còn index chỉ được reset ở effect sau đó,
  // nên phải kẹp lại để không hiện nhầm trạng thái rỗng trong một khung hình.
  const safeIndex = index < deck.length ? index : 0
  const card = deck[safeIndex]
  const answeredCount = Object.keys(answers).length

  const choose = (optionIndex) => {
    if (revealed[card.id]) return
    setAnswers((a) => ({ ...a, [card.id]: optionIndex }))
    setRevealed((r) => ({ ...r, [card.id]: true }))
  }

  return (
    <>
      <PageHeader
        title="Flashcard"
        subtitle="Mỗi thẻ một câu — chọn đáp án để tự kiểm tra, rồi bấm sang thẻ tiếp theo"
      />

      <TopicFilter selected={topic} onChange={setTopic} counts={counts} />

      {!card ? (
        <EmptyState>Không có câu hỏi nào trong chủ đề này.</EmptyState>
      ) : (
        <>
          <div>
            <div className="mb-1.5 flex items-baseline justify-between text-xs text-stone-500 dark:text-stone-400">
              <span className="tabular-nums">
                Thẻ {safeIndex + 1}/{total}
              </span>
              <span className="tabular-nums">Đã trả lời {answeredCount}</span>
            </div>
            <ProgressBar value={safeIndex + 1} total={total} />
          </div>

          {/* Từ lg trở lên nút nằm dưới thẻ nên cần min-height để nút đứng yên;
              dưới lg nút đã ghim đáy màn hình rồi nên không cần. */}
          <Card key={card.id} className="animate-rise p-5 sm:p-6 lg:min-h-[31rem]">
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              <NumberBadge>Câu {card.number}</NumberBadge>
              <TopicBadge topic={card.topic} />
              {learned[card.id] && (
                <Badge className="bg-emerald-50 text-emerald-700 ring-emerald-200/70 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20">
                  Đã thuộc
                </Badge>
              )}
            </div>

            <p className="mb-5 text-[15px] leading-relaxed font-semibold text-balance text-stone-900 sm:text-lg dark:text-white">
              {card.question}
            </p>

            <OptionList
              choices={card.choices}
              selected={answers[card.id] ?? null}
              revealed={!!revealed[card.id]}
              onSelect={revealed[card.id] ? undefined : choose}
            />

            {/* Chừa sẵn chỗ cho phần phản hồi để thẻ không giật khi vừa chọn đáp án */}
            <div className="mt-4 min-h-14">
              {revealed[card.id] ? (
                <div className="animate-rise border-t border-stone-100 pt-4 dark:border-white/5">
                  <p
                    className={`text-sm font-semibold ${
                      card.choices[answers[card.id]]?.isCorrect
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {card.choices[answers[card.id]]?.isCorrect ? '✓ Chính xác!' : '✕ Chưa đúng'}
                  </p>
                  {card.note && (
                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{card.note}</p>
                  )}
                  <ExplainBox text={card.explain} className="mt-2.5" />
                </div>
              ) : (
                <button
                  onClick={() => setRevealed((r) => ({ ...r, [card.id]: true }))}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <IconEye className="h-3.5 w-3.5" />
                  Chưa biết, xem đáp án luôn
                </button>
              )}
            </div>
          </Card>

          {/* Chừa chỗ cho thanh điều khiển dán đáy trên mobile */}
          <div className="h-14 lg:hidden" aria-hidden="true" />

          {/* Dưới lg: ghim ngay trên thanh nav để nút không xê dịch theo độ dài thẻ.
              Từ lg trở lên: nằm bình thường dưới thẻ, hiện đầy đủ chữ. */}
          <div className="fixed inset-x-0 bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom))] z-20 flex items-center justify-between gap-2 border-t border-stone-200/80 bg-[var(--page)]/95 px-4 py-2.5 backdrop-blur-xl lg:static lg:justify-center lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none dark:border-white/[0.07]">
            <Button size="icon" onClick={goPrev} aria-label="Thẻ trước" title="Thẻ trước">
              <IconArrowLeft className="h-4.5 w-4.5" />
            </Button>

            <div className="flex items-center gap-2">
              <Button
                size="navIcon"
                variant={learned[card.id] ? 'success' : 'neutral'}
                onClick={() => setLearned(card.id, !learned[card.id])}
                aria-pressed={!!learned[card.id]}
                aria-label={learned[card.id] ? 'Bỏ đánh dấu đã thuộc' : 'Đánh dấu đã thuộc'}
                title={learned[card.id] ? 'Bỏ đánh dấu đã thuộc' : 'Đánh dấu đã thuộc'}
              >
                <IconCheck className="h-4 w-4" />
                <span className="hidden lg:inline">
                  {learned[card.id] ? 'Đã thuộc' : 'Đánh dấu thuộc'}
                </span>
              </Button>

              <Button
                size="navIcon"
                onClick={() => setSeed((s) => s + 1)}
                aria-label="Trộn lại thứ tự thẻ"
                title="Trộn lại thứ tự thẻ"
              >
                <IconShuffle className="h-4 w-4" />
                <span className="hidden lg:inline">Trộn thẻ</span>
              </Button>
            </div>

            <Button size="icon" onClick={goNext} aria-label="Thẻ tiếp theo" title="Thẻ tiếp theo">
              <IconArrowRight className="h-4.5 w-4.5" />
            </Button>
          </div>

          <p className="hidden text-center text-[11px] text-stone-400 lg:block">
            Phím tắt: ← → để chuyển thẻ
          </p>
        </>
      )}
    </>
  )
}
