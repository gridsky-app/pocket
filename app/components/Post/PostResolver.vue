<script setup lang="ts">
import { useThreadPost } from '../../composables/useThreadPost'

const props = defineProps<{
  uri: string
  index: number
}>()

const usePost = useThreadPost(props.uri, props.index)

const thread = await usePost.initialize()
</script>

<template>
  <slot :thread="thread" />
</template>

<style scoped lang="scss">

</style>
