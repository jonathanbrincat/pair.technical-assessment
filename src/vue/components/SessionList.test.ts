import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSessionStore } from '@/vue/stores/sessionStore'

const MOCK = [
  {
    id: 's1',
    title: 'Prompting 101',
    tags: ['prompts', 'beginner'],
    mins: 8,
    difficulty: 'beginner',
    popularity: 187,
    updatedAt: '2025-09-01T10:00:00Z',
    completed: false,
    favourite: false,
  },
  {
    id: 's2',
    title: 'Advanced Prompt Chaining',
    tags: ['prompts', 'workflows'],
    mins: 14,
    difficulty: 'advanced',
    popularity: 122,
    updatedAt: '2025-10-12T09:00:00Z',
    completed: true,
    favourite: true,
  },
]

describe('updateStatus', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('toggles opposite status when no explicit value is passed', () => {
    const store = useSessionStore()
    store.sessionCollection = structuredClone(MOCK)

    store.updateStatus('s1')
    expect(store.sessionCollection[0]!.completed).toBe(true)
  })

  it('sets completed explicitly when provided', () => {
    const store = useSessionStore()
    store.sessionCollection = structuredClone(MOCK)

    store.updateStatus('s1', true)
    expect(store.sessionCollection[0]!.completed).toBe(true)
  })

  it('does nothing if the id does not exist', () => {
    const store = useSessionStore()
    store.sessionCollection = structuredClone(MOCK)

    store.updateStatus('s3')
    expect(store.sessionCollection).toEqual(MOCK)
  })
})
