import { useEffect } from 'react'

const SUFFIX = 'GDPL 2026'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SUFFIX}` : SUFFIX
  }, [title])
}
