// Các primitive dùng chung để giao diện các trang thống nhất một ngôn ngữ thiết kế.

export function Card({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag
      className={`rounded-2xl border border-stone-200/90 bg-white shadow-card dark:border-white/[0.07] dark:bg-[#14141d] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

const BUTTON_VARIANTS = {
  primary:
    'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 active:bg-indigo-700 dark:shadow-indigo-500/20',
  success:
    'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500 active:bg-emerald-700',
  neutral:
    'bg-stone-900 text-white hover:bg-stone-800 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200',
  outline:
    'border border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-200 dark:hover:bg-white/[0.08]',
  ghost:
    'text-stone-500 hover:bg-stone-100 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-white/[0.06] dark:hover:text-stone-100',
  danger: 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10',
}

const BUTTON_SIZES = {
  sm: 'h-8 gap-1.5 px-2.5 text-[13px]',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-12 gap-2 px-5 text-[15px]',
  icon: 'h-10 w-10',
  // Vuông (chỉ icon) trên mobile, giãn ra kèm chữ từ lg. Để chung một chuỗi
  // thay vì override bằng className, tránh đụng độ px-0 / px-4 trong Tailwind.
  navIcon: 'h-10 w-10 gap-2 px-0 text-sm lg:w-auto lg:px-4',
}

export function Button({
  variant = 'outline',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      className={`inline-flex shrink-0 items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-45 ${BUTTON_SIZES[size]} ${BUTTON_VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl dark:text-white">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export function Badge({ className = '', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  )
}

export function NumberBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-stone-100 px-2 py-0.5 font-mono text-[11px] text-stone-500 dark:bg-white/[0.07] dark:text-stone-400">
      {children}
    </span>
  )
}

export function ProgressBar({ value, total, className = 'bg-indigo-500' }) {
  const pct = total > 0 ? Math.min(100, (value / total) * 100) : 0
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-stone-200/80 dark:bg-white/[0.08]">
      <div
        className={`h-full rounded-full transition-[width] duration-500 ease-out ${className}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function EmptyState({ children }) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 py-14 text-center text-sm text-stone-400 dark:border-white/10 dark:text-stone-500">
      {children}
    </div>
  )
}
