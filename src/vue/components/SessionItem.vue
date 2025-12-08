<script setup lang="ts">
defineProps<{
  item: Record<string, string | number>
}>()
</script>

<template>
  <article>{{ item }}</article>
</template>
