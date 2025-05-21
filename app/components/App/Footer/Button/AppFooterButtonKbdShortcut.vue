<script setup>
import {ref, watch} from 'vue'

const appHomeStore = useAppHomeStore()
const appPageStore = useAppPageStore()
const appPreferencesStore = useAppPreferencesStore()

const dialog = ref(false)

watch(dialog, (value) => {
  appHomeStore.setContentHidden(value)
})
</script>

<template>
  <v-fade-transition>
    <div
      v-show="appPageStore.mouseActive"
    >
      <v-chip
        :rounded="appPreferencesStore.layoutRounded" icon
        @click="dialog = true"
      >
        <v-icon>mdi-keyboard</v-icon>
      </v-chip>

      <v-dialog v-model="dialog" :max-width="300">
        <v-card color="background" :rounded="appPreferencesStore.layoutRounded"r>
          <v-list class="bg-transparent">
            <v-list-item class="text-overline">Keyboard shortcuts</v-list-item>
            <v-list-item><kbd>B</kbd> – Toggle background</v-list-item>
            <v-list-item><kbd>G</kbd> – Toggle guides</v-list-item>
            <v-list-item><kbd>R</kbd> – Change border radius</v-list-item>
          </v-list>
          <v-card-actions>
            <v-spacer/>
            <v-btn text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-fade-transition>
</template>

<style scoped>
kbd {
  background: black;
  padding: 2px 6px;
}
</style>
