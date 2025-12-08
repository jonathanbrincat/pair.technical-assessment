<script setup lang="ts">
import SessionList from './components/SessionList.vue'
</script>

<template>
  <header class="bg-black text-white px-8 py-2 mb-8">
    <h1 class="text-3xl">Learning Sessions Browser</h1>
  </header>

  <main class="max-w-3xl mx-auto px-8">
    <SessionList />
  </main>
</template>
