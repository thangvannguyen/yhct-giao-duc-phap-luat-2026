// Google Analytics 4.
// ID lấy từ biến môi trường VITE_GA_ID (xem .env.example). Không có ID hoặc đang
// chạy dev thì mọi hàm ở đây đều không làm gì — để số liệu không bị lẫn lượt truy
// cập của chính mình lúc code.

const GA_ID = import.meta.env.VITE_GA_ID
const enabled = Boolean(GA_ID) && import.meta.env.PROD

export function initAnalytics() {
  if (!enabled || typeof window === 'undefined' || window.gtag) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())

  // send_page_view: false — app là SPA, đổi trang không tải lại nên GA không tự
  // đếm được. Tự gửi page_view trong usePageTracking để số liệu đúng từng trang.
  window.gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageView(path, title) {
  if (!enabled || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  })
}

/** Gửi một sự kiện tuỳ ý, ví dụ: trackEvent('nop_bai_thi', { score: 18, total: 20 }) */
export function trackEvent(name, params = {}) {
  if (!enabled || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
