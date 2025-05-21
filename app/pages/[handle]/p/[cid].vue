<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute, useSeoMeta} from "nuxt/app";
import {ThreadModel} from "@gridsky/core/runtime/models/ThreadModel"
import {useProfileStore} from "@gridsky/core/runtime/stores/storeProfile"
import {makeHandleShort} from "@gridsky/core/runtime/utils/utilProfile"
import {useAppPageStore} from "../../../stores/storeAppPage";
import {usePocketThreadPostNavigator} from "../../../composables/usePocketThreadPostNavigator";

const route = useRoute()

const profileHandle: string = String(route.params.handle)
const profileStore = useProfileStore(profileHandle)
const appPageStore = useAppPageStore()

const thread = new ThreadModel(
  `at://${profileStore.did}/app.bsky.feed.post/${route.params.cid}`
)

function onAlbumSwiperReady(threadSwiper) {
  usePocketThreadPostNavigator(
    profileStore.profile,
    threadSwiper
  )
}

onMounted(async () => {
  appPageStore.setLoadingMessage('loading profile...')
  await profileStore.loadProfile()

  appPageStore.setLoadingMessage('loading thread...')
  await thread.getThread()

  appPageStore.pageLoaded = true
})

useSeoMeta({
  title: `@${makeHandleShort(route.params.handle)}`,
})

definePageMeta({
  showLoader: true,
})
</script>

<template>
  <Pocket>

    <PocketThread
      :profile="profileStore.profile"
      :thread="thread"
    >

      <ThreadLayoutPocket
        v-if="appPageStore.pageLoaded"
        :thread="thread"
        @albumSwiperReady="onAlbumSwiperReady"
      />

    </PocketThread>

  </Pocket>
</template>

<style scoped lang="scss">

</style>
