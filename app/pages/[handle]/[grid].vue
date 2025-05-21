<script setup lang="ts">
import {onMounted} from "vue";
import {useMagicKeys} from '@vueuse/core'
import {useRoute, useSeoMeta} from "nuxt/app";
import {useProfileStore} from "@gridsky/core/runtime/stores/storeProfile"
import {useProfileGridStore} from "@gridsky/core/runtime/stores/storeProfileGrid"
import {useProfileGridPostsStore} from "@gridsky/core/runtime/stores/storeProfileGridPosts"
import {useProfileFeedStore} from "@gridsky/core/runtime/stores/storeProfileFeed"
import {makeHandleShort} from "@gridsky/core/runtime/utils/utilProfile"
import {useAppPageStore} from "../../stores/storeAppPage";

const route = useRoute()

const profileHandle: string = String(route.params.handle)
const profileStore = useProfileStore(profileHandle)
const profileGridStore = useProfileGridStore(profileHandle)
const appPageStore = useAppPageStore()

const profileFeedStore = useProfileFeedStore(profileStore.did)

const gridSwiper = ref()

function onProfileGridSwiperReady(instance) {
  gridSwiper.value = instance
}

const {left, right, up, down, enter} = useMagicKeys()

watch(left, (pressed) => {
  if (pressed) {
    gridSwiper.value.swiper.slidePrev()
  }
})

watch(right, (pressed) => {
  if (pressed) {
    gridSwiper.value.swiper.slideNext()
  }
})

watch(enter, (pressed) => {
  if (pressed) {
    navigateTo(`/${makeHandleShort(profileStore.profile.handle)}/${profileGridStore.gridActive.name}`)
  }
})

onMounted(async () => {
  appPageStore.setLoadingMessage('loading profile...')
  await profileStore.loadProfile()

  let profileGridPostsStore

  appPageStore.setLoadingMessage('loading grids...')

  for (const grid of profileGridStore.gridList) {
    profileGridPostsStore = useProfileGridPostsStore(profileStore.profile, grid)
    profileGridPostsStore.setup()

    await profileGridPostsStore.model.requestItems()
  }

  /*
  appPageStore.setLoadingMessage('loading posts...')
  profileFeedStore.setup()
  await profileFeedStore.model.requestItems()
   */

  appPageStore.pageLoaded = true

  // changed

  nextTick(() => {
    gridSwiper.value.initialize()

    gridSwiper.value.swiper?.on('slideChange', () => {
      const index = gridSwiper.value.swiper.activeIndex

      profileGridStore.setProfileActiveGrid(
        profileGridStore.gridList[index].name
      )
    })
  })
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

    <PocketProfile
      v-if="appPageStore.pageLoaded"
      :profile="profileStore.profile"
    >

      <swiper-container
        ref="gridSwiper"
        slides-per-view="auto"
        loop="true"
        init="false"
      >
        <swiper-slide v-for="grid of profileGridStore.gridList">

          <PostResolver
            :uri="grid.posts[0]"
            :index="0"
          >
            <template v-slot="{ thread } ">
              <ThreadLayoutPocket
                :thread="thread"
              />
            </template>
          </PostResolver>

          <PocketFooter>
            {{ grid.label }}
          </PocketFooter>

        </swiper-slide>
      </swiper-container>

    </PocketProfile>

  </Pocket>
</template>

<style scoped lang="scss">
.gsky-pocket-thread__content {
  position: relative;
  aspect-ratio: 1;
}

:deep(.gsky-pocket-thread__content) {
  height: 100%;

  swiper-container {
    height: 100%;
  }
}

.gsky-thread-layout-pocket {
  position: relative;
  opacity: 0.35;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: linear-gradient(to top, rgba(10, 10, 10, 0.80), transparent);
  }
}

.gsky-footer {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>
