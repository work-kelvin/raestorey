export const navSections = [
  { id: 'information', number: '00', label: 'Information', wip: false },
  { id: 'mix-01', number: '01', label: 'Mix 01', wip: false },
  { id: 'references', number: '02', label: 'References', wip: false },
  { id: 'written-work', number: '03', label: 'Written Work', wip: true },
  { id: 'projects', number: '04', label: 'Projects', wip: true },
  { id: 'merch', number: '05', label: 'Merch', wip: true },
]

export const sectionIds = navSections
  .filter((section) => !section.wip)
  .map((section) => section.id)
