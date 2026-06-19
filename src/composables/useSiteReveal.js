import { ref } from 'vue'

const siteRevealed = ref(false)

export function useSiteReveal() {
  function revealSite() {
    siteRevealed.value = true
  }

  return {
    siteRevealed,
    revealSite,
  }
}
