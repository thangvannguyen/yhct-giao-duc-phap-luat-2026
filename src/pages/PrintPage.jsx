import { useMemo, useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { TOPICS, TOPIC_BY_ID } from '../data/topics'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { prepareQuestions } from '../utils/quiz'
import { DOC_MODES, correctLetter, docTitle, todayVi } from '../utils/printDoc'
import { Button, Card, PageHeader } from '../components/ui'
import { IconGrid, IconPrinter, IconShuffle } from '../components/icons'

const LETTERS = ['A', 'B', 'C', 'D']

function ModeCard({ active, onClick, label, hint }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl px-3.5 py-3 text-left transition-all ${
        active
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
          : 'bg-white text-stone-700 ring-1 ring-stone-200 hover:ring-stone-300 dark:bg-white/[0.04] dark:text-stone-200 dark:ring-white/[0.08]'
      }`}
    >
      <span className="block text-[13px] font-semibold">{label}</span>
      <span className={`mt-0.5 block text-[11px] ${active ? 'text-white/75' : 'text-stone-400'}`}>
        {hint}
      </span>
    </button>
  )
}

export default function PrintPage() {
  useDocumentTitle('Tài liệu in')
  const [mode, setMode] = useState('full')
  const [topic, setTopic] = useState('all')
  const [seed, setSeed] = useState(0)

  const scopeLabel = topic === 'all' ? 'Tất cả chủ đề' : TOPIC_BY_ID[topic].label

  const docQuestions = useMemo(() => {
    const pool = topic === 'all' ? QUESTIONS : QUESTIONS.filter((q) => q.topic === topic)
    // Phải trộn phương án, nếu không đáp án đúng in ra lúc nào cũng là câu A.
    return prepareQuestions(pool)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, seed])

  return (
    <>
      <div className="no-print flex flex-col gap-4">
        <PageHeader
          title="Tài liệu in"
          subtitle="Xuất câu hỏi và đáp án ra giấy hoặc file để học offline"
        />

        <Card className="flex flex-col gap-4 p-4">
          <div>
            <p className="mb-2 text-sm font-medium">Kiểu tài liệu</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              {DOC_MODES.map((m) => (
                <ModeCard
                  key={m.id}
                  active={mode === m.id}
                  onClick={() => setMode(m.id)}
                  label={m.label}
                  hint={m.hint}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Phạm vi</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setTopic('all')}
                className={`inline-flex items-center gap-1.5 rounded-full py-1.5 pr-3 pl-2.5 text-[13px] font-medium transition-all ${
                  topic === 'all'
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
                    : 'bg-white text-stone-600 ring-1 ring-stone-200 dark:bg-white/[0.04] dark:text-stone-300 dark:ring-white/[0.08]'
                }`}
              >
                <IconGrid className="h-3.5 w-3.5" />
                Tất cả ({QUESTIONS.length})
              </button>
              {TOPICS.map((t) => {
                const n = QUESTIONS.filter((q) => q.topic === t.id).length
                return (
                  <button
                    key={t.id}
                    onClick={() => setTopic(t.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full py-1.5 pr-3 pl-2.5 text-[13px] font-medium transition-all ${
                      topic === t.id
                        ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
                        : 'bg-white text-stone-600 ring-1 ring-stone-200 dark:bg-white/[0.04] dark:text-stone-300 dark:ring-white/[0.08]'
                    }`}
                  >
                    <t.Icon className="h-3.5 w-3.5" />
                    {t.short} ({n})
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-stone-100 pt-3 dark:border-white/5">
            <Button variant="primary" onClick={() => window.print()}>
              <IconPrinter className="h-4 w-4" />
              In / Lưu PDF
            </Button>
            <Button onClick={() => setSeed((s) => s + 1)}>
              <IconShuffle className="h-4 w-4" />
              Trộn lại phương án
            </Button>
          </div>

          <p className="text-xs text-stone-400">
            Mẹo: bấm <strong>In / Lưu PDF</strong> rồi chọn "Save as PDF" trong hộp thoại in của trình duyệt
            để lưu thành file PDF. Phần điều khiển này sẽ không nằm trong bản in.
          </p>
        </Card>
      </div>

      {/* ---- Bản xem trước (cũng chính là thứ được in ra) ---- */}
      <div className="print-sheet rounded-2xl border border-stone-200 bg-white p-6 text-stone-900 shadow-card sm:p-10 dark:border-white/[0.07]">
        <h1 className="text-center text-lg font-bold tracking-tight">
          GIÁO DỤC PHÁP LUẬT — {docTitle(mode)}
        </h1>
        <p className="mt-1 mb-5 border-b border-stone-200 pb-3 text-center text-xs text-stone-500">
          {docQuestions.length} câu · {scopeLabel} · Xuất ngày {todayVi()}
        </p>

        <ol className="flex flex-col gap-3.5">
          {docQuestions.map((q, i) => (
            <li key={q.id} className="print-item text-[13.5px] leading-relaxed">
              <p className="font-semibold">
                Câu {i + 1}. {q.question}
              </p>

              {mode === 'compact' ? (
                <p className="mt-0.5 pl-5">
                  <span className="font-semibold">Đáp án:</span> {q.choices.find((c) => c.isCorrect).text}
                </p>
              ) : (
                <div className="mt-0.5 pl-5">
                  {q.choices.map((c, ci) => {
                    const mark = mode === 'full' && c.isCorrect
                    return (
                      <p key={ci} className={mark ? 'font-bold' : ''}>
                        <span className="inline-block w-4">{LETTERS[ci]}.</span> {c.text}
                        {mark && ' ✔'}
                      </p>
                    )
                  })}
                </div>
              )}

              {mode !== 'blank' && q.note && (
                <p className="mt-0.5 pl-5 text-xs text-stone-500 italic">{q.note}</p>
              )}
            </li>
          ))}
        </ol>

        {mode === 'blank' && (
          <>
            <h2 className="mt-6 mb-2 text-center text-base font-bold">ĐÁP ÁN</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
              {docQuestions.map((q, i) => (
                <span key={q.id}>
                  <b>{i + 1}.</b> {correctLetter(q)}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
