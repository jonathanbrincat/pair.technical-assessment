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
</template>
