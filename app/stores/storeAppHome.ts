import {defineStore} from "pinia";
import {ref} from "vue";

export const useAppHomeStore = defineStore("app/home", () => {
  const hideContent = ref<boolean>(false)

  function setContentHidden(value: boolean) {
    hideContent.value = value
  }

  return {
    hideContent,
    setContentHidden,
  }
})
