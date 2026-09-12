import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { TOPICS } from '../data/topics'
import { useProgressStore } from '../context/ProgressContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDuration, gradeLabel, prepareQuestions } from '../utils/quiz'
import OptionList from '../components/OptionList'
import ExplainBox from '../components/ExplainBox'
import Fireworks from '../components/Fireworks'
import ProgressRing from '../components/ProgressRing'
import TopicBadge from '../components/TopicBadge'
import { Button, Card, NumberBadge, PageHeader, ProgressBar } from '../components/ui'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconRotate,
  IconSend,
  IconTimer,
  IconX,
} from '../components/icons'

const SIZE_OPTIONS = [10, 20, 30, 58]
const TIME_OPTIONS = [
  { value: 0, label: 'Không giới hạn' },
  { value: 10, label: '10 phút' },
  { value: 20, label: '20 phút' },
  { value: 45, label: '45 phút' },
]

function SetupChoice({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all ${
        active
          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400/60 dark:bg-indigo-400/10 dark:text-indigo-300'
          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-stone-300'
      }`}
    >
      {children}
    </button>
  )
}

export default function ExamPage() {
  useDocumentTitle('Thi thử')
  const { quizHistory, addQuizResult } = useProgressStore()

  const [phase, setPhase] = useState('setup') // setup | running | result
  const [size, setSize] = useState(20)
  const [minutes, setMinutes] = useState(20)
  const [topic, setTopic] = useState('all')

  const [exam, setExam] = useState([])
  const [answers, setAnswers] = useState({})
  const [index, setIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  const pool = useMemo(
    () => (topic === 'all' ? QUESTIONS : QUESTIONS.filter((q) => q.topic === topic)),
    [topic],
  )
  const maxSize = pool.length

  const score = useMemo(
    () =>
      exam.reduce(
        (acc, q) => acc + (answers[q.id] !== undefined && q.choices[answers[q.id]].isCorrect ? 1 : 0),
        0,
      ),
    [exam, answers],
  )

  // Ghi điểm ngay trong finish() thay vì trong effect, để StrictMode không lưu lịch sử 2 lần.
  const finish = useCallback(() => {
    if (exam.length > 0) addQuizResult(score, exam.length)
    setPhase('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [addQuizResult, exam.length, score])

  // Đồng hồ đếm chỉ đọc finish qua ref để không phải dựng lại interval mỗi lần chọn đáp án.
  const finishRef = useRef(finish)
  finishRef.current = finish

  useEffect(() => {
    if (phase !== 'running') return
    const timer = setInterval(() => {
      setElapsed((e) => e + 1)
      if (minutes > 0) setSecondsLeft((s) => Math.max(0, s - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [phase, minutes])

  // Hết giờ thì tự nộp bài
  useEffect(() => {
    if (phase === 'running' && minutes > 0 && secondsLeft === 0) finishRef.current()
  }, [phase, minutes, secondsLeft])

  const startExam = () => {
    const count = Math.min(size, maxSize)
    setExam(prepareQuestions(pool, { shuffleQuestions: true, limit: count }))
    setAnswers({})
    setIndex(0)
    setElapsed(0)
    setSecondsLeft(minutes * 60)
    setPhase('running')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const backToSetup = () => {
    setPhase('setup')
    setExam([])
    setAnswers({})
  }

  // ---------- Màn hình cài đặt ----------
  if (phase === 'setup') {
    const best = quizHistory.reduce(
      (acc, r) => (acc === null || r.score / r.total > acc.score / acc.total ? r : acc),
      null,
    )
    return (
      <>
        <PageHeader title="Thi thử" subtitle="Tạo một bài kiểm tra ngẫu nhiên có tính giờ để tự đánh giá" />

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <IconTimer className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-semibold">Bài kiểm tra thử</p>
                <p className="text-sm text-white/80">
                  Câu hỏi và đáp án được trộn ngẫu nhiên mỗi lần thi
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5">
            <div>
              <p className="mb-2 text-sm font-medium">Số câu hỏi</p>
              <div className="flex flex-wrap gap-2">
                {SIZE_OPTIONS.filter((n) => n < maxSize).concat(maxSize).map((n) => (
                  <SetupChoice
                    key={n}
                    active={Math.min(size, maxSize) === n}
                    onClick={() => setSize(n)}
                  >
                    {n === maxSize ? `Tất cả (${maxSize})` : `${n} câu`}
                  </SetupChoice>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Thời gian làm bài</p>
              <div className="flex flex-wrap gap-2">
                {TIME_OPTIONS.map((t) => (
                  <SetupChoice key={t.value} active={minutes === t.value} onClick={() => setMinutes(t.value)}>
                    {t.label}
                  </SetupChoice>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Phạm vi</p>
              <div className="flex flex-wrap gap-2">
                <SetupChoice active={topic === 'all'} onClick={() => setTopic('all')}>
                  Tất cả chủ đề
                </SetupChoice>
                {TOPICS.map((t) => (
                  <SetupChoice key={t.id} active={topic === t.id} onClick={() => setTopic(t.id)}>
                    <t.Icon className="h-3.5 w-3.5" />
                    {t.short}
                  </SetupChoice>
                ))}
              </div>
            </div>

            <Button variant="primary" size="lg" onClick={startExam} className="w-full">
              Bắt đầu thi · {Math.min(size, maxSize)} câu
              {minutes > 0 ? ` · ${minutes} phút` : ''}
            </Button>
          </div>
        </Card>

        {quizHistory.length > 0 && (
          <Card className="p-4">
            <p className="mb-3 text-sm font-semibold">Lịch sử làm bài</p>
            <div className="mb-3 flex gap-3 text-sm">
              <div className="flex-1 rounded-xl bg-stone-50 p-3 dark:bg-white/[0.04]">
                <p className="text-xs text-stone-500 dark:text-stone-400">Số lần thi</p>
                <p className="text-lg font-semibold tabular-nums">{quizHistory.length}</p>
              </div>
              {best && (
                <div className="flex-1 rounded-xl bg-stone-50 p-3 dark:bg-white/[0.04]">
                  <p className="text-xs text-stone-500 dark:text-stone-400">Điểm cao nhất</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {best.score}/{best.total}
                  </p>
                </div>
              )}
            </div>
            <ul className="flex flex-col gap-1.5">
              {[...quizHistory]
                .slice(-5)
                .reverse()
                .map((r, i) => {
                  const pct = Math.round((r.score / r.total) * 100)
                  return (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-16 shrink-0 tabular-nums text-stone-500 dark:text-stone-400">
                        {r.score}/{r.total}
                      </span>
                      <div className="flex-1">
                        <ProgressBar
                          value={r.score}
                          total={r.total}
                          className={pct >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-stone-400">
                        {pct}%
                      </span>
                    </li>
                  )
                })}
            </ul>
          </Card>
        )}
      </>
    )
  }

  const current = exam[index]
  const answeredCount = Object.keys(answers).length

  // ---------- Màn hình kết quả ----------
  if (phase === 'result') {
    const pct = Math.round((score / exam.length) * 100)
    const grade = gradeLabel(pct)
    const wrong = exam.filter((q) => answers[q.id] === undefined || !q.choices[answers[q.id]].isCorrect)
    const perfect = exam.length > 0 && score === exam.length

    return (
      <>
        <Fireworks active={perfect} />

        <PageHeader title="Kết quả thi thử" />

        <Card className="animate-pop flex flex-col items-center gap-4 p-6 text-center">
          <ProgressRing value={score} total={exam.length} size={120} stroke={10} />
          <div>
            <p className="text-2xl font-bold tabular-nums">
              {score}/{exam.length} câu đúng
            </p>
            <p className={`mt-1 text-sm font-semibold ${grade.tone}`}>{grade.text}</p>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Thời gian làm bài {formatDuration(elapsed)}
              {answeredCount < exam.length && ` · bỏ trống ${exam.length - answeredCount} câu`}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="primary" onClick={startExam}>
              <IconRotate className="h-4 w-4" />
              Thi lại đề mới
            </Button>
            <Button onClick={backToSetup}>Đổi cấu hình</Button>
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          <p className="px-1 text-sm font-semibold">
            Xem lại bài làm {wrong.length > 0 && `· ${wrong.length} câu chưa đúng`}
          </p>
          {exam.map((q, qi) => {
            const picked = answers[q.id]
            const ok = picked !== undefined && q.choices[picked].isCorrect
            return (
              <Card
                as="div"
                key={q.id}
                className={`p-4 ${ok ? 'border-emerald-300 dark:border-emerald-400/30' : 'border-rose-300 dark:border-rose-400/30'}`}
              >
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-lg text-[11px] font-bold text-white ${
                      ok ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  >
                    {ok ? <IconCheck className="h-3.5 w-3.5" /> : <IconX className="h-3.5 w-3.5" />}
                  </span>
                  <NumberBadge>Câu {qi + 1}</NumberBadge>
                  <TopicBadge topic={q.topic} />
                </div>
                <p className="mb-3 text-[13.5px] leading-relaxed font-medium sm:text-[14.5px]">{q.question}</p>
                <OptionList choices={q.choices} selected={picked ?? null} revealed size="sm" />
                {q.note && <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">{q.note}</p>}
                <ExplainBox text={q.explain} className="mt-2.5" />
              </Card>
            )
          })}
        </div>
      </>
    )
  }

  // ---------- Màn hình đang thi ----------
  if (!current) return null

  const lowTime = minutes > 0 && secondsLeft <= 60

  return (
    <>
      <div className="sticky top-[57px] z-20 -mx-4 border-b border-stone-200/80 bg-[var(--page)]/90 px-4 py-2.5 backdrop-blur-xl lg:top-0 lg:rounded-2xl lg:border dark:border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm font-semibold tabular-nums ${
              minutes === 0
                ? 'bg-stone-100 text-stone-600 dark:bg-white/[0.07] dark:text-stone-300'
                : lowTime
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
                  : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-400/12 dark:text-indigo-300'
            }`}
          >
            <IconTimer className="h-4 w-4" />
            {minutes === 0 ? formatDuration(elapsed) : formatDuration(secondsLeft)}
          </div>
          <div className="min-w-0 flex-1">
            <ProgressBar value={answeredCount} total={exam.length} />
            <p className="mt-1 text-[11px] text-stone-500 tabular-nums dark:text-stone-400">
              Đã làm {answeredCount}/{exam.length}
            </p>
          </div>
          <Button size="sm" variant="primary" onClick={finish}>
            <IconSend className="h-3.5 w-3.5" />
            Nộp bài
          </Button>
        </div>
      </div>

      {/* Bảng số câu để nhảy nhanh */}
      <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 py-0.5 sm:flex-wrap sm:overflow-visible">
        {exam.map((q, i) => {
          const done = answers[q.id] !== undefined
          const active = i === index
          return (
            <button
              key={q.id}
              onClick={() => setIndex(i)}
              className={`h-8 w-8 shrink-0 rounded-lg text-xs font-semibold tabular-nums transition-all ${
                active
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 dark:ring-indigo-400/40'
                  : done
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300'
                    : 'bg-white text-stone-400 ring-1 ring-stone-200 dark:bg-white/[0.04] dark:text-stone-500 dark:ring-white/[0.08]'
              }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* Từ lg trở lên nút nằm dưới thẻ nên cần min-height để nút đứng yên;
          dưới lg nút đã ghim đáy màn hình rồi nên không cần. */}
      <Card key={current.id} className="animate-rise p-5 sm:p-6 lg:min-h-[27rem]">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-stone-900 text-[11px] font-bold text-white dark:bg-white dark:text-stone-900">
            {index + 1}
          </span>
          <TopicBadge topic={current.topic} />
        </div>

        <p className="mb-5 text-[15px] leading-relaxed font-semibold text-balance text-stone-900 sm:text-lg dark:text-white">
          {current.question}
        </p>

        <OptionList
          choices={current.choices}
          selected={answers[current.id] ?? null}
          revealed={false}
          onSelect={(oi) => {
            setAnswers((a) => ({ ...a, [current.id]: oi }))
            if (index + 1 < exam.length) setTimeout(() => setIndex((i) => i + 1), 220)
          }}
        />
      </Card>

      {/* Chừa chỗ cho thanh điều hướng dán đáy trên mobile */}
      <div className="h-14 lg:hidden" aria-hidden="true" />

      {/* Dưới lg: ghim xuống ngay trên thanh nav để nút không xê dịch theo độ dài câu hỏi.
          Từ lg trở lên: nằm bình thường dưới thẻ câu hỏi. */}
      <div className="fixed inset-x-0 bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom))] z-20 flex items-center justify-between gap-2 border-t border-stone-200/80 bg-[var(--page)]/95 px-4 py-2.5 backdrop-blur-xl lg:static lg:mt-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none dark:border-white/[0.07]">
        <Button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          aria-label="Câu trước"
          size="navIcon"
        >
          <IconArrowLeft className="h-4 w-4" />
          <span className="hidden lg:inline">Câu trước</span>
        </Button>

        <span className="text-xs tabular-nums text-stone-400 lg:hidden">
          {index + 1}/{exam.length}
        </span>

        {index + 1 < exam.length ? (
          <Button
            variant="neutral"
            onClick={() => setIndex((i) => Math.min(exam.length - 1, i + 1))}
            aria-label="Câu sau"
            size="navIcon"
          >
            <span className="hidden lg:inline">Câu sau</span>
            <IconArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="primary" onClick={finish}>
            <IconSend className="h-4 w-4" />
            Nộp bài
          </Button>
        )}
      </div>
    </>
  )
}
