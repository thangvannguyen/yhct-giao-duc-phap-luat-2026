import {
  IconAlert,
  IconBank,
  IconBriefcase,
  IconDocument,
  IconScales,
  IconUsers,
} from '../components/icons'

// `chip` / `bar` là class Tailwind viết đầy đủ (không ghép chuỗi động) để Tailwind quét được.
export const TOPICS = [
  {
    id: 'nha-nuoc',
    label: 'Lý luận Nhà nước',
    short: 'Nhà nước',
    Icon: IconBank,
    chip: 'bg-indigo-50 text-indigo-700 ring-indigo-200/70 dark:bg-indigo-400/10 dark:text-indigo-300 dark:ring-indigo-400/20',
    bar: 'bg-indigo-500',
  },
  {
    id: 'hien-phap-2013',
    label: 'Hiến pháp 2013 & bộ máy nhà nước',
    short: 'Hiến pháp 2013',
    Icon: IconDocument,
    chip: 'bg-violet-50 text-violet-700 ring-violet-200/70 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/20',
    bar: 'bg-violet-500',
  },
  {
    id: 'ly-luan-phap-luat',
    label: 'Lý luận chung về Pháp luật',
    short: 'Lý luận PL',
    Icon: IconScales,
    chip: 'bg-sky-50 text-sky-700 ring-sky-200/70 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/20',
    bar: 'bg-sky-500',
  },
  {
    id: 'vi-pham-trach-nhiem',
    label: 'Vi phạm pháp luật & trách nhiệm',
    short: 'Vi phạm PL',
    Icon: IconAlert,
    chip: 'bg-rose-50 text-rose-700 ring-rose-200/70 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20',
    bar: 'bg-rose-500',
  },
  {
    id: 'dan-su',
    label: 'Dân sự',
    short: 'Dân sự',
    Icon: IconUsers,
    chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200/70 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
    bar: 'bg-emerald-500',
  },
  {
    id: 'lao-dong',
    label: 'Lao động',
    short: 'Lao động',
    Icon: IconBriefcase,
    chip: 'bg-amber-50 text-amber-700 ring-amber-200/70 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20',
    bar: 'bg-amber-500',
  },
]

export const TOPIC_BY_ID = Object.fromEntries(TOPICS.map((t) => [t.id, t]))
export const TOPIC_LABEL = Object.fromEntries(TOPICS.map((t) => [t.id, t.label]))
