import { TOPICS } from '../data/topics'
import ProgressRing from './ProgressRing'
import { IconTrash } from './icons'

export default function StatsPanel({ questions, learned, quizHistory, onReset }) {
  const total = questions.length
  const learnedCount = questions.filter((q) => learned[q.id]).length
  const lastQuiz = quizHistory[quizHistory.length - 1]
  const best = quizHistory.reduce(
    (acc, r) => (acc === null || r.score / r.total > acc.score / acc.total ? r : acc),
    null,
  )

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <ProgressRing value={learnedCount} total={total} />
          <div>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Tiến độ ôn tập</p>
            <p className="mt-0.5 text-2xl font-semibold tabular-nums text-stone-900 dark:text-stone-50">
              {learnedCount}
              <span className="text-base font-normal text-stone-400">/{total} câu</span>
            </p>
            {lastQuiz && (
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Lần thi gần nhất {lastQuiz.score}/{lastQuiz.total}
                {best && ` · Tốt nhất ${best.score}/${best.total}`}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 sm:pl-6">
          <div className="grid gap-x-5 gap-y-2 sm:grid-cols-2">
            {TOPICS.map((t) => {
              const inTopic = questions.filter((q) => q.topic === t.id)
              if (inTopic.length === 0) return null
              const done = inTopic.filter((q) => learned[q.id]).length
              return (
                <div key={t.id}>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="flex min-w-0 items-center gap-1.5 text-stone-600 dark:text-stone-400">
                      <t.Icon className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      <span className="truncate">{t.short}</span>
                    </span>
                    <span className="tabular-nums text-stone-400">
                      {done}/{inTopic.length}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-stone-200/70 dark:bg-white/10">
                    <div
                      className={`h-full rounded-full transition-[width] duration-500 ${t.bar}`}
                      style={{ width: `${(done / inTopic.length) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {(learnedCount > 0 || quizHistory.length > 0) && (
        <div className="mt-3 flex justify-end border-t border-stone-100 pt-3 dark:border-white/5">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-stone-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          >
            <IconTrash className="h-3.5 w-3.5" />
            Xoá tiến độ
          </button>
        </div>
      )}
    </section>
  )
}
