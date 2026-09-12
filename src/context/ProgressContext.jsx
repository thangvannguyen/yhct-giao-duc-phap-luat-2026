import { createContext, useContext } from 'react'
import { useProgress } from '../hooks/useProgress'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const progress = useProgress()
  return <ProgressContext value={progress}>{children}</ProgressContext>
}

export function useProgressStore() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgressStore phải nằm trong <ProgressProvider>')
  return ctx
}
