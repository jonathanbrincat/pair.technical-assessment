import { ref } from 'vue'
import { defineStore } from 'pinia'

const ENDPOINT = '/sessions.json'

export const useSessionStore = defineStore('session', () => {
  const sessionCollection = ref([])
  const isLoading = ref(true)
  const isError = ref(false)

  async function fetchSessions() {
    isLoading.value = true
    isError.value = false

    try {
      const response = await fetch(ENDPOINT)
      if (!response.ok) throw new Error('Failed to fetch data')

      const data = await response.json()
      sessionCollection.value = data.sessions
    } catch (error: unknown) {
      console.error('Error retrieving data from API: ', error)
      isError.value = true

      throw error
    } finally {
      isLoading.value = false
    }
  }

  return { sessionCollection, isLoading, isError, fetchSessions }
})
