import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'gdpl-progress'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { learned: {}, quizHistory: [] }
    const parsed = JSON.parse(raw)
    return { learned: parsed.learned ?? {}, quizHistory: parsed.quizHistory ?? [] }
  } catch {
    return { learned: {}, quizHistory: [] }
  }
}

export function useProgress() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage unavailable (private mode, etc.) — progress just won't persist
    }
  }, [state])

  const setLearned = useCallback((questionId, value) => {
    setState((prev) => ({
      ...prev,
      learned: { ...prev.learned, [questionId]: value },
    }))
  }, [])

  const addQuizResult = useCallback((score, total) => {
    setState((prev) => ({
      ...prev,
      quizHistory: [...prev.quizHistory, { date: new Date().toISOString(), score, total }],
    }))
  }, [])

  const resetProgress = useCallback(() => {
    setState({ learned: {}, quizHistory: [] })
  }, [])

  return { learned: state.learned, quizHistory: state.quizHistory, setLearned, addQuizResult, resetProgress }
}
