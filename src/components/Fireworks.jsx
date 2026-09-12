import { useEffect, useRef } from 'react'
import { runFireworks } from '../utils/fireworks'

/** Lớp pháo hoa phủ toàn màn hình, không chắn thao tác bên dưới. */
export default function Fireworks({ active, duration = 6000 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active || !canvasRef.current) return
    // Tôn trọng người dùng đã tắt hiệu ứng chuyển động trong cài đặt hệ thống
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    return runFireworks(canvasRef.current, { duration })
  }, [active, duration])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  )
}
