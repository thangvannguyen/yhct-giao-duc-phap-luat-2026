import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PAGE_NAME_BY_PATH } from '../data/nav'
import { trackPageView } from '../utils/analytics'

/**
 * Gửi page_view mỗi khi đổi route, kèm đường dẫn và tên trang.
 * Tên trang lấy từ bảng PAGE_NAME_BY_PATH thay vì document.title để báo cáo GA
 * hiện tên gọn ("Thi thử") và không phụ thuộc vào thứ tự chạy effect giữa
 * trang con với AppShell.
 */
export function usePageTracking() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const path = pathname + search
    const name = PAGE_NAME_BY_PATH[pathname] ?? document.title
    trackPageView(path, name)
  }, [pathname, search])
}
