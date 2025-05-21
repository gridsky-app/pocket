<script setup lang="ts">
import {useMouseActivity} from "./composables/useMouseActivity";

const appPreferencesStore = useAppPreferencesStore()

useMouseActivity()
</script>

<template>
  <v-app>

    <AppToolGuides
      :enabled="appPreferencesStore.helperGuides"
    />

    <AppPageBackground
      v-if="$route.name === 'index'"
      :enabled="appPreferencesStore.homePageBackground"
    />

    <NuxtLayout/>

    <AppFooterButtons />

  </v-app>
</template>

<style lang="scss">
:root {
  --gsky-background-image: url('https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:fgnp656eaylvgokf3s573244/bafkreiesg7zuzp7ni6zx3bv6hsplbvdwycdfjo3tlimdtdewikon3vi76a@jpeg');
}
</style>
