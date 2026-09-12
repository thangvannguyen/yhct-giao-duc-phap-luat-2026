const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#38bdf8']

/**
 * Bắn pháo hoa lên canvas. Tách khỏi component để test được vòng lặp animation.
 * Trả về hàm stop() để huỷ ngay (component gọi khi unmount).
 */
export function runFireworks(canvas, { duration = 6000, onDone } = {}) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  let raf = 0
  let stopped = false
  const rockets = []
  const sparks = []

  const W = () => window.innerWidth
  const H = () => window.innerHeight

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W() * dpr
    canvas.height = H() * dpr
    canvas.style.width = `${W()}px`
    canvas.style.height = `${H()}px`
    // Vẽ theo toạ độ CSS pixel cho dễ tính, phần nhân dpr để ctx tự lo
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  window.addEventListener('resize', resize)

  const launch = () => {
    const targetY = H() * (0.18 + Math.random() * 0.3)
    rockets.push({
      x: W() * (0.12 + Math.random() * 0.76),
      y: H(),
      vy: -(H() - targetY) / 55, // bay tới đỉnh sau khoảng 55 khung hình
      targetY,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })
  }

  const explode = (r) => {
    const n = 46 + Math.floor(Math.random() * 26)
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n + Math.random() * 0.2
      const speed = 1.6 + Math.random() * 3.2
      sparks.push({
        x: r.x,
        y: r.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: r.color,
      })
    }
  }

  const dot = (x, y, r, color, alpha) => {
    ctx.globalAlpha = alpha
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const start = performance.now()
  let lastLaunch = 0

  const frame = (now) => {
    if (stopped) return
    const elapsed = now - start
    ctx.clearRect(0, 0, W(), H())

    // Ngừng bắn quả mới trước khi hết giờ để đám tàn lửa kịp tắt
    if (elapsed < duration - 1500 && now - lastLaunch > 320) {
      launch()
      lastLaunch = now
    }

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i]
      r.y += r.vy
      dot(r.x, r.y, 2.2, r.color, 1)
      if (r.y <= r.targetY) {
        explode(r)
        rockets.splice(i, 1)
      }
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i]
      s.x += s.vx
      s.y += s.vy
      s.vy += 0.045 // trọng lực
      s.vx *= 0.985
      s.vy *= 0.985
      s.life -= 0.011
      if (s.life <= 0) {
        sparks.splice(i, 1)
        continue
      }
      dot(s.x, s.y, 2, s.color, Math.max(0, s.life))
    }
    ctx.globalAlpha = 1

    if (elapsed < duration || sparks.length > 0 || rockets.length > 0) {
      raf = requestAnimationFrame(frame)
    } else {
      cleanup()
      onDone?.()
    }
  }

  function cleanup() {
    if (stopped) return
    stopped = true
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  }

  raf = requestAnimationFrame(frame)
  return cleanup
}
