import {defineStore} from "pinia";
import {ref} from "vue";

export const useAppPageStore = defineStore("app/page", () => {
  const pageLoaded = ref<boolean>(false)
  const pageLoadingMessage = ref<string>('')
  const mouseActive = ref<boolean>(true)

  function setLoadingMessage(message: string) {
    pageLoadingMessage.value = message
  }

  function setMouseActive(value: boolean) {
    mouseActive.value = value
  }

  return {
    mouseActive,
    setMouseActive,
    pageLoaded,
    pageLoadingMessage,
    setLoadingMessage,
  }
})
