import { IconCards, IconList, IconPrinter, IconQuiz, IconTimer } from '../components/icons'

// Tách riêng khỏi AppShell để usePageTracking cũng dùng được mà không bị import vòng.
export const NAV_ITEMS = [
  { to: '/danh-sach', label: 'Danh sách câu hỏi', short: 'Danh sách', hint: 'Xem câu hỏi & đáp án', Icon: IconList },
  { to: '/flashcard', label: 'Flashcard', short: 'Flashcard', hint: 'Học từng thẻ một', Icon: IconCards },
  { to: '/trac-nghiem', label: 'Ôn trắc nghiệm', short: 'Trắc nghiệm', hint: 'Làm cả đề 58 câu', Icon: IconQuiz },
  { to: '/thi-thu', label: 'Thi thử', short: 'Thi thử', hint: 'Kiểm tra có tính giờ', Icon: IconTimer },
  { to: '/tai-lieu', label: 'Tài liệu in', short: 'Tài liệu in', hint: 'Xuất PDF để in ra học', Icon: IconPrinter },
]

/** Đường dẫn -> tên trang, dùng để gửi lên Analytics cho gọn và ổn định. */
export const PAGE_NAME_BY_PATH = Object.fromEntries(NAV_ITEMS.map((i) => [i.to, i.label]))
