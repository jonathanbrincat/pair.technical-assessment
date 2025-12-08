<script setup lang="ts">
import { onMounted } from 'vue'
import { useSessionStore } from './stores/sessionStore'
import SessionList from './components/SessionList.vue'

const store = useSessionStore()

onMounted(async () => {
  // 4. simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  await store.fetchSessions()
})

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
    <SessionList
      :data="store.sessionCollection"
      :isLoading="store.isLoading"
      @toggle-complete="(id, isComplete) => store.updateStatus(id, isComplete)"
    />
  </main>

  <footer class="bg-black text-white fixed bottom-0 right-0 p-4">
    <div class="flex items-center justify-end gap-4">
      <p>Debug:</p>

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
