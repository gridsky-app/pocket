<script setup lang="ts">
import {formatLocaleTimeAgo} from "@gridsky/core/runtime/utils/utilTimeAgo"

defineProps<{
  profile: any
}>()

const appPageStore = useAppPageStore()
const appPagePreferences = useAppPreferencesStore()
</script>

<template>
  <v-fade-transition>
    <div
      v-if="appPageStore.pageLoaded"
      :class="['gsky-pocket-thread', {'gsky-pocket-thread--fullscreen': appPagePreferences.pageFullscreen}]"
    >

    <div class="gsky-pocket-thread__content">
      <slot/>
    </div>

    </div>
  </v-fade-transition>

  <AppAnimationGrid
    v-if="!appPageStore.pageLoaded"
  />
</template>

<style scoped lang="scss">
.gsky-pocket-thread {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  aspect-ratio: 1;
}
</style>
