import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'campus-store-recently-viewed'
const MAX_ITEMS = 6

function readStoredIds() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useRecentlyViewed() {
  const [ids, setIds] = useState(readStoredIds)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  }, [ids])

  const recordView = useCallback((id) => {
    setIds((current) =>
      [id, ...current.filter((item) => item !== id)].slice(0, MAX_ITEMS),
    )
  }, [])

  return { ids, recordView }
}
