import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'gdpl-progress'

const DEFAULT_SETTINGS = { showExplain: true }

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { learned: {}, quizHistory: [], settings: { ...DEFAULT_SETTINGS } }
    const parsed = JSON.parse(raw)
    return {
      learned: parsed.learned ?? {},
      quizHistory: parsed.quizHistory ?? [],
      settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
    }
  } catch {
    return { learned: {}, quizHistory: [], settings: { ...DEFAULT_SETTINGS } }
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

  const toggleShowExplain = useCallback(() => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, showExplain: !prev.settings.showExplain },
    }))
  }, [])

  const resetProgress = useCallback(() => {
    // Chỉ xoá tiến độ học, giữ lại tuỳ chọn hiển thị của người dùng
    setState((prev) => ({ learned: {}, quizHistory: [], settings: prev.settings }))
  }, [])

  return {
    learned: state.learned,
    quizHistory: state.quizHistory,
    showExplain: state.settings.showExplain,
    toggleShowExplain,
    setLearned,
    addQuizResult,
    resetProgress,
  }
}
