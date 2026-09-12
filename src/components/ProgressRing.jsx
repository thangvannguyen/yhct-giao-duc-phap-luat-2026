export default function ProgressRing({ value, total, size = 88, stroke = 8 }) {
  const pct = total > 0 ? value / total : 0
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-stone-200 dark:stroke-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          className="stroke-indigo-500 transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-semibold tabular-nums text-stone-900 dark:text-stone-50"
          style={{ fontSize: Math.max(11, Math.round(size * 0.21)) }}
        >
          {Math.round(pct * 100)}%
        </span>
      </div>
    </div>
  )
}
