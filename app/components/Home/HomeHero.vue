<template>
  <div class="gsky-home-hero">
    <v-row no-gutters class="mx-15 fill-height">
      <v-col :cols="12" class="gsky-home-hero__logo">

        <swiper-container
          slides-per-view="1"
          loop="1"
          autoplay-delay="5000"
          class="fill-height"
        >
          <swiper-slide>
            <Icon name="lucide:sparkles" :size="88"/>
          </swiper-slide>
          <swiper-slide>
            <Icon name="simple-icons:bluesky" :size="88"/>
          </swiper-slide>
          <swiper-slide>
            <Icon name="lucide:at-sign" :size="88"/>
          </swiper-slide>
        </swiper-container>

      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.gsky-home-hero {
  &__logo {
    position: relative;
    pointer-events: none;

    .iconify {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
