import {useMagicKeys} from '@vueuse/core'
import {onMounted} from "vue";
import {makeHandleShort} from "@gridsky/core/runtime/utils/utilProfile";

export function usePocketThreadPostNavigator(profile: any, threadSwiper: any) {
  const {left, right, up, down} = useMagicKeys()

  watch(left, (pressed) => {
    if (pressed) {
      navigateTo(`/${makeHandleShort(profile.handle)}`)
    }
  })

  watch(up, (pressed) => {
    if (pressed) {
      threadSwiper.slidePrev()
    }
  })

  watch(down, (pressed) => {
    if (pressed) {
      threadSwiper.slideNext()
    }
  })
}
