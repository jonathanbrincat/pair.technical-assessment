import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('session', () => {
  const sessionCollection = ref([])
  const isLoading = ref(true)
  const isError = ref(false)

  async function fetchSessions() {
    isLoading.value = true
    isError.value = false

    try {
      sessionCollection.value = []
    } catch (error: unknown) {
      console.error('Error retrieving data from API: ', error)
    } finally {
      isLoading.value = false
    }
  }

  return { sessionCollection, isLoading, isError }
})
