<script setup lang="ts">
import {formatLocaleTimeAgo} from "@gridsky/core/runtime/utils/utilTimeAgo"

defineProps<{
  profile: any
  thread: any
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

      <v-row no-gutters>
        <v-col class="flex-grow-1">

          <ProfileCardItem
            clas="gsky-pocket-thread__header pl-3 py-2"
            :profile="profile"
            :time="formatLocaleTimeAgo(thread.post.record.createdAt)"
            show-time class="ml-3 my-2"
          />

          <div class="gsky-pocket-thread__content">
            <slot/>
          </div>

        </v-col>
        <v-col class="flex-grow-0" style="min-width: 64px;">

          <ThreadActionListVertical
            class="gsky-pocket-thread__actions"
            :thread="thread"
            show-comments-count
            show-likes-count
          />

        </v-col>
      </v-row>

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

  &__content {
    position: absolute;
    transition: all 0.2s ease-in-out;
    top: 64px;
    left: 0;
    right: 64px;
    bottom: 0;
    border-radius: 0 24px 0 0;
    overflow: hidden;
  }

  &__actions {
    position: absolute;
    bottom: 12px;
    right: 0;
    width: 64px;
  }

  &--fullscreen {
    .gsky-pocket-thread__content {
      top: 0;
      right: 0;
      border-radius: 0;
    }
  }
}
</style>
