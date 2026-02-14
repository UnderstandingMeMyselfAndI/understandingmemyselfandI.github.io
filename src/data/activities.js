const activities = [
  { id: 0, title: 'Introduction', description: 'Description' },
  { id: 1, title: 'Videos', description: 'Videos Description' },
  { id: 2, title: 'About', description: 'About Description' },
]

const strings = {
  toolbox: {
    added: 'Added to your toolbox',
    removed: 'Removed from your toolbox',
    emergency: {
      added: 'Added to your emergency toolbox',
      removed: 'Removed from your emergency toolbox',
    },
  },
  tools: {
    list: {
      unfiltered: 'Showing ALL tools',
      yourToolsFiltered: 'Showing YOUR tools', //"Showing only the tools you selected"
    },
  },
  activities: [],
}

export default { activities, strings } //strings activities;
