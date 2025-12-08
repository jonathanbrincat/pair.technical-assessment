<script setup lang="ts">
defineProps<{
  item: Record<string, undefined | string | number | string[]>
}>()
</script>

<template>
  <article class="border-3 rounded-sm p-3">
    <h2 class="text-lg">{{ item.title }}</h2>
    <p><span class="text-xs font-semibold uppercase mr-2">Tags:</span>{{ item.tags }}</p>
    <p><span class="text-xs font-semibold uppercase mr-2">Minutes:</span>{{ item.mins }}</p>
    <p>
      <span class="text-xs font-semibold uppercase mr-2">Difficulty:</span>{{ item.difficulty }}
    </p>
    <p>
      <span class="text-xs font-semibold uppercase mr-2">Popularity:</span>{{ item.popularity }}
    </p>
    <p><span class="text-xs font-semibold uppercase mr-2">Status:</span>{{ item.completed }}</p>
  </article>
</template>
