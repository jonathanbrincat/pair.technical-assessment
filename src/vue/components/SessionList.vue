<script setup lang="ts">
import SessionItem from './SessionItem.vue'
import { useSessionStore } from '../stores/sessionStore'

const store = useSessionStore()
</script>

<template>
  <pre class="text-xs">{{ JSON.stringify(store.sessionCollection, null, 2) }}</pre>

  <ul id="session-list" class="flex flex-col gap-4" aria-live="polite" role="list">
    <li v-for="(item, index) in store.sessionCollection" :key="index" role="listitem">
      <SessionItem :item />
    </li>
  </ul>
</template>
