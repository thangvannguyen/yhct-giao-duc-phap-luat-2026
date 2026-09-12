import { TOPICS } from '../data/topics'
import { IconGrid } from './icons'

function Chip({ active, onClick, Icon, children, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full py-1.5 pr-3 pl-2.5 text-[13px] font-medium whitespace-nowrap transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
        active
          ? 'bg-stone-900 text-white shadow-sm dark:bg-white dark:text-stone-900'
          : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-stone-300 dark:bg-white/5 dark:text-stone-300 dark:ring-white/10 dark:hover:ring-white/20'
      }`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {children}
      <span className={`tabular-nums ${active ? 'opacity-60' : 'text-stone-400 dark:text-stone-500'}`}>
        {count}
      </span>
    </button>
  )
}

export default function TopicFilter({ selected, onChange, counts }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5">
      <Chip
        active={selected === 'all'}
        onClick={() => onChange('all')}
        Icon={IconGrid}
        count={counts.all ?? 0}
      >
        Tất cả
      </Chip>
      {TOPICS.map((t) => (
        <Chip
          key={t.id}
          active={selected === t.id}
          onClick={() => onChange(t.id)}
          Icon={t.Icon}
          count={counts[t.id] ?? 0}
        >
          {t.short}
        </Chip>
      ))}
    </div>
  )
}
