import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Session } from '@/types'

const ENDPOINT = '/sessions.json'

export const useSessionStore = defineStore('session', () => {
  const sessionCollection = ref<Session[]>([] as Session[])
  const isLoading = ref(true)
  const isError = ref(false)

  async function fetchSessions(isSimulateError = false) {
    isLoading.value = true
    isError.value = false

    try {
      // 5. for simulated error
      if (isSimulateError) {
        throw new Error('Simulated network error: Failed to fetch data')
      }

      const response = await fetch(ENDPOINT)
      if (!response.ok) throw new Error('Failed to fetch data')

      const data = await response.json()
      // 1. cast mins to number
      sessionCollection.value = data.sessions.map((item: Session) => ({
        ...item,
        mins: Number(item.mins), // 1. coercion to number type
      }))
    } catch (error: unknown) {
      console.error('Error retrieving data from API: ', error)
      isError.value = true

      throw error
    } finally {
      isLoading.value = false
    }
  }

  function updateStatus(id: string, isComplete?: boolean) {
    const session = sessionCollection.value.find((item) => item.id === id)
    if (session) {
      session.completed = isComplete ?? !session.completed
    }
  }

  return { sessionCollection, isLoading, isError, fetchSessions, updateStatus }
})
