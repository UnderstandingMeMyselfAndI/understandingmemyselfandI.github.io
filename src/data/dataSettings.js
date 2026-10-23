const settingsData = [
  {
    groupTitle: 'Tools Enabled',
    settings: [
      {
        name: 'Tools',
        store: 'private',
        stateSelector: (state) => state.toolsEnabled,
        setStateAction: (state) => state.enableTools,
        label: 'Enable Tools',
        information: 'Control the display of the Tools Feature.',
        classnames: [''],
      },
      {
        name: 'YourToolsEnabled',
        store: 'private',
        stateSelector: (state) => state.yourToolsEnabled,
        setStateAction: (state) => state.enableYourTools,
        label: 'Enable Your Tools',
        information: 'Show a favourite / toolbox indicator so you can see which tools you have added at a glance.',
        classnames: [''],
      },
      {
        name: 'YourToolbox',
        store: 'private',
        stateSelector: (state) => state.toolboxFilterEnabled,
        setStateAction: (state) => state.enableToolboxFilter,
        label: 'Enable Your Toolbox filter',
        information: 'Displays a button that shows only the tools added to Your Toolbox or all tools.',
        classnames: [],
      },
    ],
  },
  {
    groupTitle: 'Days Counter',
    settings: [
      {
        name: 'DaysCounter',
        store: 'private',
        stateSelector: (state) => state.daysCounterEnabled,
        setStateAction: (state) => state.enableDaysCounter,
        label: 'Enable Days Counter',
        information: 'Set up to two dates and see how many days since the dates.',
        classnames: [''],
      },
    ],
  },
  {
    groupTitle: 'Units Calculator',
    settings: [
      {
        name: 'UnitsCalculator',
        store: 'private',
        stateSelector: (state) => state.unitsCalculatorEnabled,
        setStateAction: (state) => state.enableUnitsCalculator,
        label: 'Enable Units Calculator',
        information: 'Calculate the total amount of units for different types and measures of alcoholic drinks.',
        classnames: [''],
      },
    ],
  },
  {
    groupTitle: 'Quiz',
    settings: [
      {
        name: 'Quiz',
        store: 'private',
        stateSelector: (state) => state.quizEnabled,
        setStateAction: (state) => state.enableQuiz,
        label: 'Enable Quiz',
        information: 'Play the Recovery Quiz to test your knowledge and learn new things about recovery.',
        classnames: [''],
      },
    ],
  },
  {
    groupTitle: 'Wheel of Life',
    settings: [
      {
        name: 'WheelOfLife',
        store: 'private',
        stateSelector: (state) => state.wheelOfLifeEnabled,
        setStateAction: (state) => state.enableWheelOfLife,
        label: 'Enable Wheel of Life',
        information:
          'Assess your life balance and find areas that could need work. Save wheels over time and see how your hard work is paying off.',
        classnames: [''],
      },
    ],
  },
  {
    groupTitle: 'Quick Exit Button',
    settings: [
      {
        name: 'QuickExit',
        stateSelector: (state) => state.quickExitEnabled,
        setStateAction: (state) => state.enableQuickExit,
        label: 'Enable Quick Exit Button',
        information: 'Lets you leave the app immediately and open google.com whenever you need to.',
        classnames: [''],
      },
      {
        name: 'QuickExitMessage',
        stateSelector: (state) => state.quickExitMessageEnabled,
        setStateAction: (state) => state.enableQuickExitMessage,
        label: 'Show message before Quick Exit',
        information: '',
        classnames: [''],
      },
    ],
  },
  {
    groupTitle: 'Privacy and Your Data',
    settings: [
      {
        name: 'AnalyticsCookies',
        stateSelector: (state) => state.allowCookies,
        setStateAction: (state) => state.setAllowCookies,
        label: 'Allow cookies (non-advertising)',
        information: 'Accepts the use of analytics cookies to improve your experience.',
        classnames: [''],
      },
    ],
  },
]

export default settingsData
