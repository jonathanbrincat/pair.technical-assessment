import type { Session } from '@/types'

export function stablePopularitySort(data: Session[], order = 'desc'): Session[] {
  return data
    .map((s, i) => ({ s, i }))
    .sort((a, b) => {
      if (a.s.popularity === b.s.popularity) return a.i - b.i
      return order === 'desc'
        ? b.s.popularity - a.s.popularity // higher => lower
        : a.s.popularity - b.s.popularity // lower => higher
    })
    .map((x) => x.s)
}

export function debounce(fn: (event: Event) => void, delay = 300) {
  let timer: ReturnType<typeof setTimeout>

  return (event: Event) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(event), delay)
  }
}
