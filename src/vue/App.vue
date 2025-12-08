<script setup lang="ts">
import { onMounted } from 'vue'
import { useSessionStore } from './stores/sessionStore'
import SessionList from './components/SessionList.vue'

const store = useSessionStore()

onMounted(async () => {
  await store.fetchSessions()

  console.log('jb :: ', store.sessionCollection)
})
</script>

<template>
  <header class="bg-black text-white px-8 py-2 mb-8">
    <h1 class="text-3xl">Learning Sessions Browser</h1>
  </header>

  <main class="max-w-3xl mx-auto px-8">
    <SessionList />
  </main>
</template>
