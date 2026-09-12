const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
}

function Svg({ children, className = 'h-4 w-4', ...rest }) {
  return (
    <svg className={className} aria-hidden="true" {...base} {...rest}>
      {children}
    </svg>
  )
}

export const IconList = (p) => (
  <Svg {...p}>
    <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
  </Svg>
)

export const IconCards = (p) => (
  <Svg {...p}>
    <rect x="3" y="6" width="13" height="14" rx="2.5" />
    <path d="M8 3h9.5A3.5 3.5 0 0 1 21 6.5V16" />
  </Svg>
)

export const IconQuiz = (p) => (
  <Svg {...p}>
    <path d="M9 11.5 11 13.5 15.5 9" />
    <rect x="3.5" y="4" width="17" height="16" rx="3" />
  </Svg>
)

export const IconSearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Svg>
)

export const IconCheck = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Svg>
)

export const IconX = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const IconArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
  </Svg>
)

export const IconArrowRight = (p) => (
  <Svg {...p}>
    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
  </Svg>
)

export const IconShuffle = (p) => (
  <Svg {...p}>
    <path d="M17 4l3 3-3 3M17 14l3 3-3 3M4 7h3.5c1.6 0 2.6.9 3.4 2M20 7h-3.2c-3 0-3.6 5-6.6 5M4 17h3.5c1.6 0 2.6-.9 3.4-2M20 17h-3" />
  </Svg>
)

export const IconRotate = (p) => (
  <Svg {...p}>
    <path d="M20 11a8 8 0 1 0-2.3 6.3" />
    <path d="M20 4.5V11h-6.5" />
  </Svg>
)

export const IconSun = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
  </Svg>
)

export const IconMoon = (p) => (
  <Svg {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Svg>
)

export const IconInfo = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Svg>
)

export const IconTrash = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M10 7V5h4v2M6 7l1 13h10l1-13M10.5 11v5.5M13.5 11v5.5" />
  </Svg>
)

export const IconTimer = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="13.5" r="7.5" />
    <path d="M12 10v3.5l2.2 2.2M9.5 2.5h5" />
  </Svg>
)

export const IconGrid = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
  </Svg>
)

export const IconEye = (p) => (
  <Svg {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
)

export const IconFlag = (p) => (
  <Svg {...p}>
    <path d="M5 21V4m0 0h11l-1.5 3.5L16 11H5" />
  </Svg>
)

export const IconSend = (p) => (
  <Svg {...p}>
    <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-8-8-4L21 3Z" />
  </Svg>
)

/* ---- Icon cho từng chương học ---- */

// Lý luận Nhà nước — trụ sở nhà nước
export const IconBank = (p) => (
  <Svg {...p}>
    <path d="M3 9.5 12 4.5l9 5M5.5 9.5v8M10 9.5v8M14 9.5v8M18.5 9.5v8M3.5 20.5h17" />
  </Svg>
)

// Hiến pháp 2013 — văn bản luật
export const IconDocument = (p) => (
  <Svg {...p}>
    <path d="M13 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V8.5L13 3.5Z" />
    <path d="M13 3.5V8a.5.5 0 0 0 .5.5H18M9.5 13h5M9.5 16.5h3" />
  </Svg>
)

// Lý luận chung về Pháp luật — cán cân công lý
export const IconScales = (p) => (
  <Svg {...p}>
    <path d="M12 5v14.5M8.5 19.5h7M4 8.5h16" />
    <path d="M4 8.5 1.9 13.4a2.7 2.7 0 0 0 4.2 0L4 8.5Zm16 0-2.1 4.9a2.7 2.7 0 0 0 4.2 0L20 8.5Z" />
  </Svg>
)

// Vi phạm pháp luật & trách nhiệm — cảnh báo
export const IconAlert = (p) => (
  <Svg {...p}>
    <path d="M12 4.5 2.5 20.5h19L12 4.5Z" />
    <path d="M12 10.5v4M12 17.5h.01" />
  </Svg>
)

// Dân sự — quan hệ giữa các chủ thể
export const IconUsers = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 19.5c.6-3.2 3.3-5 6.5-5s5.9 1.8 6.5 5" />
    <path d="M16 5.6a3.2 3.2 0 0 1 0 6.3M18 14.9c2 .6 3.3 2.2 3.7 4.6" />
  </Svg>
)

// Lao động — nghề nghiệp, việc làm
export const IconBriefcase = (p) => (
  <Svg {...p}>
    <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
    <path d="M9 7.5v-2A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5v2M3 12.5h18" />
  </Svg>
)

export const IconBulb = (p) => (
  <Svg {...p}>
    <path d="M9.5 18.5h5M10.5 21.5h3" />
    <path d="M12 2.5a6 6 0 0 0-3.4 10.9c.6.5 1 1.2 1 2h4.8c0-.8.4-1.5 1-2A6 6 0 0 0 12 2.5Z" />
  </Svg>
)

export const IconPrinter = (p) => (
  <Svg {...p}>
    <path d="M7 9V3.5h10V9M7 17.5H5.5A1.5 1.5 0 0 1 4 16v-4.5A2.5 2.5 0 0 1 6.5 9h11a2.5 2.5 0 0 1 2.5 2.5V16a1.5 1.5 0 0 1-1.5 1.5H17" />
    <rect x="7" y="14" width="10" height="6.5" rx="1.5" />
  </Svg>
)

