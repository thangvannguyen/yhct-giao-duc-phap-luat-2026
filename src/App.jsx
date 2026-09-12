import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './layouts/AppShell'
import { ProgressProvider } from './context/ProgressContext'
import ListPage from './pages/ListPage'
import FlashcardPage from './pages/FlashcardPage'
import PracticePage from './pages/PracticePage'
import ExamPage from './pages/ExamPage'
import PrintPage from './pages/PrintPage'

// Khi deploy lên GitHub Pages, site nằm trong thư mục con nên router phải biết
// tiền tố đó. BASE_URL của Vite là '/' khi dev và '/yhct-.../' khi build.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Navigate to="/danh-sach" replace />} />
            <Route path="danh-sach" element={<ListPage />} />
            <Route path="flashcard" element={<FlashcardPage />} />
            <Route path="trac-nghiem" element={<PracticePage />} />
            <Route path="thi-thu" element={<ExamPage />} />
            <Route path="tai-lieu" element={<PrintPage />} />
            <Route path="*" element={<Navigate to="/danh-sach" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  )
}
