<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute, useSeoMeta} from "nuxt/app";
import {useProfileStore} from "@gridsky/core/runtime/stores/storeProfile"
import {useProfileFeedStore} from "@gridsky/core/runtime/stores/storeProfileFeed"
import {makeHandleShort} from "@gridsky/core/runtime/utils/utilProfile"
import {useAppPageStore} from "../../stores/storeAppPage";

const route = useRoute()

const profileHandle: string = String(route.params.handle)
const profileStore = useProfileStore(profileHandle)
const appPageStore = useAppPageStore()

const profileFeedStore = useProfileFeedStore(profileStore.did)

onMounted(async () => {
  appPageStore.setLoadingMessage('loading profile...')
  await profileStore.loadProfile()

  appPageStore.setLoadingMessage('loading posts...')
  profileFeedStore.setup()
  profileFeedStore.model.requestItems()

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
  <PocketLayoutProfile>

    <template #header>
      <ProfileCardItem
        v-if="appPageStore.pageLoaded"
        :profile="profileStore.profile"
        show-display-name
      />
    </template>



  </PocketLayoutProfile>
</template>

<style scoped lang="scss">

</style>
