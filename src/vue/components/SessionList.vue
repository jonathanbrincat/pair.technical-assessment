<script setup lang="ts">
import { ref, computed } from 'vue'
import SessionItem from './SessionItem.vue'
import { stablePopularitySort, debounce } from '@/js/utils'
import type { Session } from '@/types'

const props = defineProps<{
  data: Session[]
  isLoading: boolean
}>()

const emit = defineEmits<{
  (event: 'toggle-complete', id: string, isComplete: boolean): void
}>()

const SORT_BY_ASC = 'asc'
const SORT_BY_DESC = 'desc'
const DEFAULT_SORT = SORT_BY_DESC

const query = ref('')
const sortOrder = ref<typeof SORT_BY_DESC | typeof SORT_BY_ASC>(DEFAULT_SORT)

// 2. filter functionality with debounce
const filteredSessions = computed(() => {
  return props.data.filter((item) =>
    item.title.toLowerCase().includes(query.value.trim().toLowerCase()),
  )
})

// 3. stable sort by popularity
const sortedSessions = computed(() => {
  return stablePopularitySort(filteredSessions.value, sortOrder.value)
})

const filterSessionsHandler = debounce((event: Event) => {
  query.value = (event.target as HTMLInputElement).value
}, 300)
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
            @input="filterSessionsHandler"
          />
        </label>
      </p>

      <p class="inline-flex items-center">
        <span class="mr-2">Sort by popularity:</span>

        <label class="inline-flex gap-1 cursor-pointer select-none">
          <span aria-label="Descending order">↓</span>
          <input id="sortByDesc" type="radio" value="desc" name="sortOrder" v-model="sortOrder" />
        </label>

        <label class="inline-flex gap-1 cursor-pointer select-none">
          <span aria-label="Ascending order">↑</span>
          <input id="sortByAsc" type="radio" value="asc" name="sortOrder" v-model="sortOrder" />
        </label>
      </p>
    </div>

    <ul id="session-list" class="flex flex-col gap-4" aria-live="polite" role="list">
      <li v-for="item in sortedSessions" :key="item.id" role="listitem">
        <SessionItem
          :item
          @toggle-complete="(id, isComplete) => emit('toggle-complete', id, isComplete)"
        />
      </li>

      <li role="listitem" v-show="!sortedSessions.length">No matching results found</li>
    </ul>
  </template>
</template>
