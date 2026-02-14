const data = {
  title: 'Your Recovery Journey',
  description: 'A timeline of the positive changes you can expect.',
  timePeriods: [
    {
      id: 'tp1',
      header: 'First 24 Hours',
      offset: 0,
      categories: [
        {
          id: 'cat1',
          type: 'physical',
          title: 'Blood Pressure Normalizes',
          description: 'Your blood pressure begins to drop and stabilize.',
        },
        {
          id: 'cat2',
          type: 'mental',
          title: 'Anxiety Peaks',
          description: 'Initial anxiety may be high but will start to subside.',
        },
      ],
    },
    {
      id: 'tp2',
      header: 'First Week',
      offset: 100, // Example offset for positioning
      categories: [
        {
          id: 'cat3',
          type: 'physical',
          title: 'Improved Sleep',
          description: 'REM sleep rebounds, improving rest quality.',
        },
        {
          id: 'cat4',
          type: 'lifestyle',
          title: 'Saving Money',
          description: "You've already saved a significant amount of money.",
        },
        {
          id: 'cat5',
          type: 'mental',
          title: 'Increased Clarity',
          description: 'Cognitive function begins to improve.',
        },
      ],
    },
    // ... more time periods
  ],
}
