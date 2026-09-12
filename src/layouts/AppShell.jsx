import { NavLink, Outlet } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { useProgressStore } from '../context/ProgressContext'
import { useTheme } from '../hooks/useTheme'
import { usePageTracking } from '../hooks/usePageTracking'
import ProgressRing from '../components/ProgressRing'
import { NAV_ITEMS } from '../data/nav'
import { IconMoon, IconSun } from '../components/icons'

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

export default function AppShell() {
  usePageTracking()
  const { theme, toggleTheme } = useTheme()
  const { learned } = useProgressStore()
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

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white p-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
          <ProgressRing value={learnedCount} total={QUESTIONS.length} size={52} stroke={5} />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-stone-500 dark:text-stone-400">Đã thuộc</p>
            <p className="text-sm font-semibold tabular-nums">
              {learnedCount}/{QUESTIONS.length} câu
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
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
