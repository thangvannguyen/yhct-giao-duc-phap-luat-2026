import { NavLink, Outlet } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { useProgressStore } from '../context/ProgressContext'
import { useTheme } from '../hooks/useTheme'
import { usePageTracking } from '../hooks/usePageTracking'
import ProgressRing from '../components/ProgressRing'
import { NAV_ITEMS } from '../data/nav'
import { IconBulb, IconMoon, IconSun } from '../components/icons'

function BrandMark({ className = 'h-10 w-10 text-lg' }) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 font-bold text-white shadow-lg shadow-violet-500/25 ${className}`}
    >
      §
    </div>
  )
}

function ThemeToggle({ theme, onToggle, className = '' }) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Chuyển sang nền sáng' : 'Chuyển sang nền tối'}
      title={theme === 'dark' ? 'Nền sáng' : 'Nền tối'}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-stone-200 bg-white text-stone-500 transition-colors hover:text-stone-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400 dark:hover:text-white ${className}`}
    >
      {theme === 'dark' ? <IconSun className="h-4.5 w-4.5" /> : <IconMoon className="h-4.5 w-4.5" />}
    </button>
  )
}

function ExplainToggle({ on, onToggle }) {
  const label = on ? 'Tắt phần giải thích đáp án' : 'Bật phần giải thích đáp án'
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors ${
        on
          ? 'border-amber-300 bg-amber-50 text-amber-600 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300'
          : 'border-stone-200 bg-white text-stone-400 hover:text-stone-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-500 dark:hover:text-stone-200'
      }`}
    >
      <IconBulb className="h-4.5 w-4.5" />
    </button>
  )
}

/** Hàng tuỳ chọn có nhãn trong sidebar — rõ nghĩa hơn nút chỉ có icon. */
function SwitchRow({ Icon, label, on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-stone-100 dark:hover:bg-white/[0.05]"
    >
      <Icon
        className={`h-4 w-4 shrink-0 ${on ? 'text-indigo-600 dark:text-indigo-400' : 'text-stone-400 dark:text-stone-500'}`}
      />
      <span className="min-w-0 flex-1 truncate text-[13px] text-stone-700 dark:text-stone-300">
        {label}
      </span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          on ? 'bg-indigo-600' : 'bg-stone-300 dark:bg-white/15'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            on ? 'translate-x-4' : ''
          }`}
        />
      </span>
    </button>
  )
}

export default function AppShell() {
  usePageTracking()
  const { theme, toggleTheme } = useTheme()
  const { learned, showExplain, toggleShowExplain } = useProgressStore()
  const learnedCount = QUESTIONS.filter((q) => learned[q.id]).length

  return (
    <div className="aurora relative min-h-screen">
      {/* ---- Sidebar (desktop) ---- */}
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-stone-200/80 bg-white/70 px-4 py-5 backdrop-blur-xl lg:flex dark:border-white/[0.06] dark:bg-[#0c0c14]/80">
        <div className="flex items-center gap-3 px-1">
          <BrandMark />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold tracking-tight">Giáo dục Pháp luật</p>
            <p className="truncate text-xs text-stone-500 dark:text-stone-400">Ôn tập 2026</p>
          </div>
        </div>

        <nav className="mt-7 flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map(({ to, short, hint, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-violet-500/20'
                    : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-white/[0.05]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{short}</span>
                    <span
                      className={`block truncate text-[11px] ${
                        isActive ? 'text-white/70' : 'text-stone-400 dark:text-stone-500'
                      }`}
                    >
                      {hint}
                    </span>
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar chỉ rộng 256px nên tiến độ và tuỳ chọn phải tách thành 2 khối,
            nhồi chung một hàng thì phần chữ bị bóp lại và đè lên nhau. */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white p-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
            <ProgressRing value={learnedCount} total={QUESTIONS.length} size={44} stroke={4.5} />
            <div className="min-w-0">
              <p className="text-xs text-stone-500 dark:text-stone-400">Đã thuộc</p>
              <p className="text-sm font-semibold tabular-nums">
                {learnedCount}/{QUESTIONS.length} câu
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-1 dark:border-white/[0.07] dark:bg-white/[0.03]">
            <SwitchRow
              Icon={IconBulb}
              label="Giải thích đáp án"
              on={showExplain}
              onToggle={toggleShowExplain}
            />
            <SwitchRow
              Icon={IconMoon}
              label="Nền tối"
              on={theme === 'dark'}
              onToggle={toggleTheme}
            />
          </div>
        </div>
      </aside>

      {/* ---- Topbar (mobile) ---- */}
      <header className="no-print sticky top-0 z-30 flex items-center gap-3 border-b border-stone-200/80 bg-white/85 px-4 py-3 backdrop-blur-xl lg:hidden dark:border-white/[0.06] dark:bg-[#08080d]/85">
        <BrandMark className="h-9 w-9 text-base" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-tight">Giáo dục Pháp luật</p>
          <p className="truncate text-[11px] text-stone-500 dark:text-stone-400">
            {learnedCount}/{QUESTIONS.length} câu đã thuộc
          </p>
        </div>
        <ExplainToggle on={showExplain} onToggle={toggleShowExplain} />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      {/* ---- Nội dung ---- */}
      <div className="app-content relative z-10 lg:pl-64">
        <main className="app-main mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6 pb-28 lg:pb-12">
          <Outlet />
        </main>
      </div>

      {/* ---- Bottom nav (mobile) ---- */}
      <nav
        className="no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-stone-200/80 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden dark:border-white/[0.06] dark:bg-[#0c0c14]/90"
        style={{ height: 'calc(var(--bottom-nav-h) + env(safe-area-inset-bottom))' }}
      >
        {NAV_ITEMS.map(({ to, short, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-stone-400 dark:text-stone-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`grid h-8 w-12 place-items-center rounded-xl transition-colors ${
                    isActive ? 'bg-indigo-50 dark:bg-indigo-400/12' : ''
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                {short}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
