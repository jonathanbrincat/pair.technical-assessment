<script setup lang="ts">
import type { Session } from '@/types'

defineProps<{
  item: Session
}>()

const emit = defineEmits<{
  (event: 'toggle-complete', id: string, isComplete: boolean): void,
  (event: 'toggle-favourite', id: string, isFavourite: boolean): void
}>()

const hasBadgeClass = (difficulty: string | null) =>
  difficulty
    ? ['rounded-xl', 'bg-black', 'text-white', 'inline-flex', 'items-center', 'px-3', 'py-1']
    : null
</script>

<template>
  <article
    :class="['border-3 rounded-sm', { 'border-green-700': item.completed }]"
    :aria-label="item.title"
  >
    <header
      :class="[
        'text-white flex justify-between items-center px-2 pb-1',
        item.completed ? 'bg-green-700' : 'bg-black',
      ]"
    >
      <h2 :class="['text-lg', { 'line-through': item.completed }]">{{ item.title }}</h2>

      <div class="inline-flex gap-4">
        <p class="text-sm">
          <label class="flex item-center gap-2 cursor-pointer select-none">
            <span aria-live="polite">{{ item.completed ? 'Mark Incomplete' : 'Mark Complete' }}</span>
            <input
              class="accent-amber-500 cursor-pointer focus:outline-3 focus:outline-offset-1 focus:outline-amber-500"
              type="checkbox"
              :checked="item.completed"
              @change="emit('toggle-complete', item.id, !item.completed)"
            />
          </label>
        </p>

        <p class="text-sm">
          <label class="flex item-center gap-2 cursor-pointer select-none">
            <span aria-live="polite">Mark favourite</span>
            <input
              class="accent-amber-500 cursor-pointer focus:outline-3 focus:outline-offset-1 focus:outline-amber-500"
              type="checkbox"
              :checked="item.favourite"
              @change="emit('toggle-favourite', item.id, !item.favourite)"
            />
          </label>
        </p>
      </div>
    </header>

    <div class="grid grid-cols-2 px-2 my-2">
      <p class="col-span-2">
        <span class="text-xs font-semibold uppercase mr-2">Tags:</span>
        {{ item.tags.length ? item.tags?.join(', ') : '-' }}
      </p>
      <p class="text-xs">
        <span class="font-semibold uppercase mr-2">Difficulty:</span>
        <span :class="hasBadgeClass(item.difficulty)">{{ item.difficulty ?? 'N/A' }}</span>
      </p>
      <p class="justify-self-end">
        <span class="text-xs font-semibold uppercase mr-2">Duration:</span>
        {{ item.mins }} minute(s)
      </p>
    </div>

    <footer
      :class="[
        'rounded-tl-md text-white col-span-2 justify-self-end px-2 mt-2',
        item.completed ? 'bg-green-700' : 'bg-black',
      ]"
    >
      <p>
        <span class="text-xs font-semibold uppercase mr-2">Popularity:</span>
        {{ item.popularity }}
      </p>
    </footer>
  </article>
</template>
