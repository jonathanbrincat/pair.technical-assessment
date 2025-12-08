import { describe, it, expect } from 'vitest'
import { stablePopularitySort } from '@/js/utils'
import type { Session } from '@/types'

describe('stablePopularitySort', () => {
  it('keeps original order on popularity ties (for stable sort)', () => {
    const data = [
      { id: 'a', popularity: 10 },
      { id: 'b', popularity: 10 },
      { id: 'c', popularity: 5  },
    ] as Session[]

    const result = stablePopularitySort(data, 'desc')
    expect(result.map(x => x.id)).toEqual(['a', 'b', 'c'])
  })
})
