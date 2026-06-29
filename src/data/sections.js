export const navSections = [
  { id: 'information', number: '00', label: 'About', wip: false },
  { id: 'mix-01', number: '01', label: 'Title', wip: false },
  { id: 'references', number: '02', label: 'References', wip: false },
]

export const sectionIds = navSections
  .filter((section) => !section.wip)
  .map((section) => section.id)
