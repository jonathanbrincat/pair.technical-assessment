<script setup lang="ts">
import type { Session } from '@/types'

defineProps<{
  item: Session
}>()

const emit = defineEmits<{
  (event: 'toggle-complete', id: string, isComplete: boolean): void
}>()
</script>

<template>
  <article class="border-3 rounded-sm" :aria-label="item.title">
    <header class="bg-black text-white flex justify-between items-center px-2 p-1">
      <h2 class="text-lg">{{ item.title }}</h2>

      <p class="text-sm">
        <label class="flex item-center gap-2 cursor-pointer select-none">
          <span aria-live="polite">{{ item.completed ? 'Mark Incomplete' : 'Mark Complete' }}</span>
          <input
            type="checkbox"
            :checked="item.completed"
            @change="emit('toggle-complete', item.id, !item.completed)"
          />
        </label>
      </p>
    </header>

    <div class="px-2 my-2">
      <p><span class="text-xs font-semibold uppercase mr-2">Tags:</span>{{ item.tags }}</p>
      <p><span class="text-xs font-semibold uppercase mr-2">Minutes:</span>{{ item.mins }}</p>
      <p>
        <span class="text-xs font-semibold uppercase mr-2">Difficulty:</span>{{ item.difficulty }}
      </p>
    </div>

    <footer class="rounded-tl-md bg-black text-white justify-self-end px-2 mt-2">
      <p>
        <span class="text-xs font-semibold uppercase mr-2">Popularity:</span>{{ item.popularity }}
      </p>
    </footer>
  </article>
</template>
