// Flat data only: strings, limits, static examples and educational copy.

export const LIMITS = {
  titleMax: 250,
  descriptionMaxWords: 500,
  whoWithMax: 20, // per win
  peopleMax: 100, // maximum unique people in the store
  suggestionLimit: 8,
}

export const AUTOSAVE_DEBOUNCE_MS = 400

export const AUTO_PRUNE_EMPTY_DRAFT = false

export const STRINGS = {
  overviewTitle: 'Book of Small Wins',
  createNew: 'Record a win',
  emptyStateTitle: 'No wins recorded yet',
  emptyState: 'Drop your first one in. It can be tiny, it all counts. Small wins stack up.',
  emptyStateExamples: "Need some ideas to start?<br /> Here's a few:",

  titleLabel: 'What was the win?',
  titlePlaceholder: 'e.g. Got out for a 10 minute walk',
  descriptionLabel: 'Want to add more? (optional)',
  descriptionPlaceholder: 'What went down, how it felt, what helped…',
  dateLabel: 'When was this?',
  whoWithLabel: 'Who was with you? (optional)',
  whoWithPlaceholder: 'Start typing a name…',

  editorCreateTitle: 'Record a win',
  editorEditTitle: 'Edit your win',
  done: 'Done',
  back: 'Back',
  deleteWin: 'Delete',
  deleteConfirmTitle: 'Delete this win?',
  deleteConfirmBody: "Once it's gone, it's gone.",
  discardTitle: 'Bin your changes?',
  discardBody: 'Anything you changed since the last save will be lost.',
  discardConfirm: 'Bin it',
  discardCancel: 'Keep editing',
  cancel: 'Cancel',

  saving: 'Saving…',
  saved: 'Saved',
  saveError: "Couldn't save that",
  loading: 'Loading…',
  loadError: "Couldn't load your wins.",
  retry: 'Try again',

  searchPlaceholder: 'Search wins…',
  searchLabel: 'Search wins',
  tabWins: 'Wins',
  tabWhy: 'Why Small Wins',
  untitledWin: 'Untitled win',
  noResults: 'Nothing matches that search.',
  clearSearch: 'Clear',
  removePerson: 'Remove',
  lowStorageTitle: "Storage's running low",
  addPerson: 'Add',
  suggestionsLabel: 'Suggestions',

  whyMattersTitle: 'Why This Matters',

  lockedTitle: 'Locked',
  unlock: 'Unlock',
  passcodeLabel: 'Passcode',
}

export const EXAMPLE_WINS = [
  'Woke up with a clear head',
  'Rode out a craving for 10 minutes',
  'Made my bed',
  'Hit up someone in my corner',
  'Got outside for some fresh air',
  'Water first thing, before anything else',
  'Asked for help',
  'Got to bed on time',
]

export const WHY_SMALL_WINS = [
  {
    heading: 'Expert level self-critics',
    body: "<p>If there were qualifications in self-criticism we would be Professors.</p><p>In addiction people can become some of the best self critics in the world, and accepting praise can be really uncomfortable.</p> <p>The Book of Little Wins shows us that we're not as bad as we think we are, and that we can be proud of ourselves for the small things we do.</p>",
  },
  {
    heading: 'Small wins are still wins',
    body: "Change doesn't usually show up in one big moment. <br /><br />It's built from small moves you keep making, and they prove to you that change is possible.",
  },
  {
    heading: "They're proof",
    body: "Every entry is proof against that voice saying nothing's changing. <br /><br />On the rough days, this book does the talking back for you.",
  },
  {
    heading: "They're allowed to be tiny",
    body: 'Making your bed counts.<br /> Drinking water counts. <br />Getting through ten minutes counts. <br /><br />Nothing in here is too small to record.',
  },
  {
    heading: "It's yours and only yours",
    body: 'Your book is locked with your passcode and lives only on this device. <br /><br />Nothing leaves your device and you can delete your data at any time.',
  },
]
