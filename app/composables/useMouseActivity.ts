import { watch } from 'vue'
import { useMouse } from '@vueuse/core'
import { useAppPageStore } from '@/stores/storeAppPage'

export function useMouseActivity(timeout = 2000) {
  const { x, y } = useMouse()
  const appPageStore = useAppPageStore()

  let hideTimeout: ReturnType<typeof setTimeout> | null = null

  watch([x, y], () => {
    appPageStore.setMouseActive(true)

    if (hideTimeout) clearTimeout(hideTimeout)
    hideTimeout = setTimeout(() => {
      appPageStore.setMouseActive(false)
    }, timeout)
  })
}
