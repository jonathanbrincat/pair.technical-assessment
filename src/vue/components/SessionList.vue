<script setup lang="ts">
import { ref, computed } from 'vue'
import SessionItem from './SessionItem.vue'
import type { Session } from '@/types'

const props = defineProps<{
  data: Session[]
  isLoading: boolean
}>()

const query = ref('')
const sortOrder = ref<'desc' | 'asc'>('desc')

const filteredSessions = computed(() => {
  return props.data
})

const sortedSessions = computed(() => {
  return filteredSessions.value
})

const filterSessionsHandler = () => {}
</script>

<template>
  <p v-if="isLoading" aria-live="polite" role="status">Loading sessions&hellip;</p>

  <template v-else>
    <div class="flex justify-between gap-4 mb-4">
      <p class="basis-2/5">
        <label>
          <span class="sr-only">Filter sessions by title</span>
          <input
            id="filter"
            class="border-3 rounded-sm w-full p-1"
            type="text"
            placeholder="Filter sessions..."
            aria-controls="session-list"
            :value="query"
            @input="filterSessionsHandler"
          />
        </label>
      </p>

      <p class="inline-flex items-center">
        <span class="mr-2">Sort by popularity:</span>

        <label>
          <span aria-label="Descending order">↓</span>
          <input id="sortByDesc" type="radio" value="desc" name="sortOrder" v-model="sortOrder" />
        </label>

        <label>
          <span aria-label="Ascending order">↑</span>
          <input id="sortByAsc" type="radio" value="asc" name="sortOrder" v-model="sortOrder" />
        </label>
      </p>
    </div>

    <ul id="session-list" class="flex flex-col gap-4" aria-live="polite" role="list">
      <li v-for="(item, index) in sortedSessions" :key="index" role="listitem">
        <SessionItem :item />
      </li>
    </ul>
  </template>
</template>
