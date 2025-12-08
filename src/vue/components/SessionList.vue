<script setup lang="ts">
import SessionItem from './SessionItem.vue'
import { useSessionStore } from '../stores/sessionStore'

const store = useSessionStore()
</script>

<template>
  <pre class="text-xs">{{ JSON.stringify(store.sessionCollection, null, 2) }}</pre>

  <ul>
    <li>
      <SessionItem />
    </li>
  </ul>
</template>
