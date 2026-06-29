import { ref, onMounted, onUnmounted } from 'vue'

function getSectionEl(root, id) {
  const el = document.getElementById(id)
  return el && root?.contains(el) ? el : null
}

export function useScrollSpy(scrollRoot, sectionIds) {
  const activeId = ref('information')

  let observer = null

  function scrollToSection(id) {
    const root = scrollRoot.value
    const target = getSectionEl(root, id)
    if (!target || !root) return

    activeId.value = id
    const top =
      target.getBoundingClientRect().top -
      root.getBoundingClientRect().top +
      root.scrollTop
    root.scrollTo({ top, behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  onMounted(() => {
    const root = scrollRoot.value
    if (!root) return

    const hash = window.location.hash.replace('#', '')
    if (hash && sectionIds.value.includes(hash)) {
      requestAnimationFrame(() => scrollToSection(hash))
    }

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          activeId.value = visible[0].target.id
          history.replaceState(null, '', `#${visible[0].target.id}`)
        }
      },
      {
        root,
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    )

    for (const id of sectionIds.value) {
      const el = getSectionEl(root, id)
      if (el) observer.observe(el)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeId, scrollToSection }
}
