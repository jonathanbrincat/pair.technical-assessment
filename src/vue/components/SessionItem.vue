<script setup lang="ts">
import type { Session } from '@/types'

defineProps<{
  item: Session
}>()
</script>

<template>
  <article class="border-3 rounded-sm" :aria-label="item.title">
    <header class="bg-black text-white flex justify-between items-center px-2 p-1">
      <h2 class="text-lg">{{ item.title }}</h2>
      <p><span class="text-xs font-semibold uppercase mr-2">Status:</span>{{ item.completed }}</p>
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
