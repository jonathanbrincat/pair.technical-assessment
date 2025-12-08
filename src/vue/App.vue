<script setup lang="ts">
import { onMounted, useTemplateRef, nextTick, ref } from 'vue'
import { useSessionStore } from './stores/sessionStore'
import SessionList from './components/SessionList.vue'

const store = useSessionStore()

const retryButton = useTemplateRef('retry-button')

const errorMessage = ref<string | null | unknown>('')

onMounted(async () => {
  // 4. simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  loadSessions()
})

async function loadSessions(simulateError = false) {
  errorMessage.value = null

  try {
    await store.fetchSessions(simulateError)
  } catch (error: unknown) {
    errorMessage.value = error

    await nextTick()
    retryButton.value?.focus()
  }
}

function retryHandler() {
  loadSessions()
}

function simulateErrorHandler() {
  loadSessions(true)
}

function testReactivityHandler() {
  const first = store.sessionCollection[0]
  if (!first) return
  first.completed = !first.completed
}
</script>

<template>
  <header class="bg-black text-white px-8 py-2 mb-8">
    <h1 class="text-3xl">Learning Sessions Browser</h1>
  </header>

  <main class="max-w-3xl mx-auto px-8">
    <div
      id="ui__toast"
      class="bg-red-100 border-3 border-red-600 rounded text-red-700 p-4 my-4 overflow-hidden"
      aria-live="assertive"
      role="alert"
      v-if="store.isError"
    >
      <p class="mb-4">Something went wrong while loading sessions.</p>
      <p class="text-xs italic mb-4" v-if="errorMessage">{{ errorMessage }}</p>
      <button
        class="bg-red-600 hover:bg-red-700 text-white rounded float-right focus:outline-2 focus:outline-offset-1 focus:outline-red-600 active:bg-red-300 px-3 py-1 cursor-pointer"
        ref="retry-button"
        @click="retryHandler"
      >
        Retry
      </button>
    </div>

    <SessionList
      :data="store.sessionCollection"
      :isLoading="store.isLoading"
      @toggle-complete="(id, isComplete) => store.updateStatus(id, isComplete)"
      v-if="!store.isError"
    />
  </main>

  <footer class="bg-black text-white fixed bottom-0 right-0 p-4">
    <div class="flex items-center justify-end gap-4">
      <p>Debug:</p>
      <button
        class="border-3 border-red-600 rounded hover:border-white text-red-700 hover:text-white focus:outline-2 focus:outline-offset-1 focus:outline-red-600 active:bg-red-300 px-3 py-1 cursor-pointer"
        @click="simulateErrorHandler"
      >
        Simulate Error
      </button>

      <!--JB: this was something I added to validate the reactivity was behaving as expected and have left it in situ -->
      <button
        class="border-3 border-blue-600 rounded hover:border-white text-blue-700 hover:text-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-600 active:bg-blue-300 px-3 py-1 cursor-pointer"
        @click="testReactivityHandler"
      >
        Reactivity Test (toggle completed)
      </button>
    </div>
  </footer>
</template>
