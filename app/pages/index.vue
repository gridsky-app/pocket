<script setup lang="ts">
import {useMagicKeys} from '@vueuse/core'
import {ref} from "vue"
import {useAppHomeStore} from "../stores/storeAppHome";

const appHomeStore = useAppHomeStore()

const drawer = ref(false)

const {left, right} = useMagicKeys()

watch(left, (pressed) => {
  if (pressed) {
    drawer.value = !drawer.value
  }
})

watch(right, (pressed) => {
  if (pressed) {
    drawer.value = false
  }
})

watch(drawer, (value) => {
  appHomeStore.setContentHidden(value)
})
</script>

<template>
  <Pocket>

    <NavigationDrawer
      v-model="drawer"
    />

    <div class="gsky-pocket-index">

      <div class="gsky-pocket-index__content" v-if="!appHomeStore.hideContent">

        <div>
          <LogoPocket/>
        </div>

        <div class="text-center">
          <HomeHero @click="drawer = true"/>
        </div>

        <PocketFooter class="py-2"/>

      </div>

    </div>

  </Pocket>
</template>

<style scoped lang="scss">
.gsky-pocket-index {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: var(--gsky-background-image);
    background-size: cover;
    background-position: center;
    opacity: 0.4;
    content: '';
  }

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(64px);
    mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 100%);
    content: '';
    z-index: 1;
  }

  &__content {
    height: 100%;

    div {
      position: relative;
      height: 100%;
      z-index: 2;

      &:nth-child(1) {
        height: 50%;
      }

      &:nth-child(2) {
        height: 40%;
      }
    }
  }
}
</style>
