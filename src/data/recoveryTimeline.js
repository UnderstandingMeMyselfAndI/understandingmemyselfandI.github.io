// timelineData.js
export const timelineData = {
  disclaimer: {
    title: 'Medical Disclaimer',
    content:
      'Important: Alcohol withdrawal can be medically serious. The first 72 hours carry risk of severe symptoms including seizures and delirium tremens. Always seek professional medical guidance when stopping alcohol use. This timeline describes common recovery patterns but individual experiences may vary.',
  },
  header: {
    title: 'Recovery Timeline',
    description: 'What someone might expect after stopping use',
  },

  timeline: [
    {
      id: '7-days-before',
      numDays: 1,
      timePeriod: '7 days before',
      phaseTitle: 'Preparing for Withdrawal',
      offset: 0,
      symptoms: [
        '1 slowly reducing intake',
        '2 Anxiety over the future',
        '3 Heightened anxiety',
        '4 Symptom 7-days-before',
        '5 Symptom 7-days-before',
      ],
    },
    {
      id: '24-hours',
      numDays: 1,
      timePeriod: 'First 24 Hours',
      phaseTitle: 'Acute Withdrawal Onset Phase',
      offset: 0,
      symptoms: [
        '6 Withdrawal begins',
        '7 Sleep is disrupted',
        '8 Heightened anxiety',
        '9 Difficulty concentrating',
        '10 Strong cravings',
      ],
    },
    {
      id: '3-days',
      numDays: 3,
      timePeriod: 'First 3 Days',
      phaseTitle: 'Peak Withdrawal Phase',
      offset: 300,
      symptoms: [
        '11 Physical symptoms peak',
        '12 Appetite remains suppressed',
        '13 Blood pressure may be higher',
        '14 Heart rate may increase',
        '15 Cognitive function impaired',
        '16 Emotional volatility common',
        '17 Cravings intense & persistent',
      ],
    },
    {
      id: 'days-4-7',
      daysSpeed: 1,
      timePeriod: 'Days 4-7',
      numDays: 4,
      phaseTitle: 'Acute Symptoms Subside',
      offset: 600,
      symptoms: [
        'Acute physical symptoms diminish',
        'Sleep may normalize',
        'Appetite starts to return',
        'Possible sugar cravings',
        'Nausea symptoms improve',
        'Initial brain fog lifts',
        'Anxiety levels decrease',
        'Brief periods of clarity',
        'Fewer Cravings',
      ],
    },
    {
      id: '7-10-days',
      numDays: 3,
      timePeriod: 'Days 7-10',
      phaseTitle: 'Early Stabilization Phase',
      offset: 900,
      symptoms: [
        'Sleep patterns improve',
        'Energy levels increase',
        'Appetite normalizes',
        'Nutritional deficiencies may surface',
        'Skin hydration improves',
        'Eyes appear clearer',
        'Cognitive function improves',
        'Ability to concentrate returns',
        'Some experience pink cloud phenomenon',
        'Emotional regulation stabilizes',
      ],
    },
    {
      id: '2-4-weeks',
      numDays: 14,
      timePeriod: 'Weeks 2-4',
      phaseTitle: 'Post-Acute Withdrawal Begins',
      offset: 1200,
      symptoms: [
        'Sleep patterns continue to improve',
        'Natural energy rhythms reestablish',
        // "Exercise tolerance improves",
        'Physical cravings diminish in frequency',
        'PAWS (Post-Acute Withdrawal Syndrome)',
        'Mood swings, anxiety waves, low energy periods',
        'Mental clarity more consistent',
        'Negative thought patterns reduce',
        'Genuine positive emotions return',
      ],
    },
    {
      id: '1-3-months',
      numDays: 76,
      timePeriod: 'Months 1-3',
      phaseTitle: 'Neurological Rebalancing',
      offset: 1500,
      symptoms: [
        'Liver enzymes begin to normalize',
        // "Cardiovascular improvements: ",
        'Reduced blood pressure',
        'Reduced heart rate',
        'Energy levels stabilize',
        'Exercise capacity increases',
        'PAWS symptoms occur, gradually diminishing',
        // "Neuroplasticity allows new neural pathways to form",
        'Cravings manageable',
        'Cravings less frequent',
        'Emotional regulation improves',
        'Self-efficacy grows',
        'Better confidence',
      ],
    },
    {
      id: '3-6-months',
      numDays: 110,
      timePeriod: 'Months 3-6',
      phaseTitle: 'Consolidation Phase',
      offset: 1800,
      symptoms: [
        'Physical health continues improving',
        'Sleep becomes much better',
        'Appetite normalizes fully',
        // "Metabolism stabilize",
        'Feeling healthy regularly',
        'Thinking patterns shift ',
        'Negative thoughts diminish',
        'Resilience to stress improves',
        'Confidence grows',
        'Sense of identity begins to shift',
      ],
    },
    {
      id: '6-12-months',
      numDays: 255,
      timePeriod: 'Months 6-12',
      phaseTitle: 'Sustained Recovery',
      offset: 2100,
      symptoms: [
        'Physical healing reaches completion',
        'Body fully adapts to alcohol-free state',
        'Exercise fully possible',
        'Benefits of nutrition clear',
        'Emotional baseline stabilizes',
        'Cravings rare and easily managed',
        'Strong Positive outlook',
        'Identity shifts -> new self',
        'Purpose and meaning solidify',
      ],
    },
  ],

  terminology: [
    {
      term: 'Delirium Tremens (DTs)',
      definition:
        'Severe form of alcohol withdrawal involving confusion, rapid heartbeat, fever, and hallucinations. Requires emergency medical care.',
    },
    {
      term: 'PAWS (Post-Acute Withdrawal Syndrome)',
      definition:
        'Persistent symptoms after acute withdrawal ends, caused by neurological healing. Symptoms come in waves and gradually diminish over months.',
    },
    {
      term: 'Neuroplasticity',
      definition:
        "The brain's ability to reorganize neural pathways, allowing healing and new habit formation.",
    },
    {
      term: 'REM Rebound',
      definition:
        'Increased REM sleep after periods of deprivation, often causing vivid dreams in early recovery.',
    },
    {
      term: 'Anhedonia',
      definition:
        'Temporary inability to feel pleasure, common in early recovery as dopamine systems recalibrate.',
    },
  ],

  progressionNotes: [
    'Individual variation is normal. This timeline represents common patterns, but your experience may differ.',
    "Healing isn't linear—expect some fluctuation even as overall trend is positive.",
    'Medical monitoring is especially important in the first week. Regular check-ins with healthcare providers can ensure safe progression and address complications early.',
    'The 3-month mark represents a significant milestone where physiological stability typically allows focus on psychological and social healing.',
    "Beyond one year, recovery becomes less about not drinking and more about living a fulfilled, purposeful life with the tools and resilience you've developed.",
  ],
}

export const timelineConfig = {
  // Parallax configuration
  parallax: {
    slowLayerSpeed: 0.75, // Time period headers scroll at 75% speed
    fastLayerSpeed: 1.25, // Change categories scroll at 125% speed
    mobileReduction: 0.1, // Reduce parallax intensity on mobile by 10%
  },

  // Responsive offsets (pixels)

  // Animation states (CSS class hooks)
  animationStates: {
    entering: 'timeline__element--entering',
    active: 'timeline__element--active',
    exiting: 'timeline__element--exiting',
  },

  // Category types and colors (for CSS theming)
}

// Helper function to get timeline data with consistent structure
export const getTimelineData = () => timelineData

// Helper function to get config
export const getTimelineConfig = () => timelineConfig

// Helper function to get all categories
export const getAllCategories = () => timelineConfig.categories

export default {
  data: timelineData,
  config: timelineConfig,
  getTimelineData,
  getTimelineConfig,
  getAllCategories,
}
