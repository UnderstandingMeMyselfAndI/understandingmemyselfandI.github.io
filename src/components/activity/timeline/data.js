export const TIMELINE_DATA = [
  {
    id: 's1',
    title: 'Detox preparation',
    period: '7 days before detox',
    startLabel: 'Start of detox preparation', // New Field
    endLabel: 'End of detox preparation',     // New Field
    events: [
      { id: 101, title: 'Reduction', description: 'Slow reducition of intake.' },
      { id: 102, title: 'Heightened anxiety', description: 'Anxiety over the future is likely.' },
      { id: 103, title: 'Doubts', description: 'Doubts may surface. Unsure that detox will work? Speak with key worker.' },
      { id: 103, title: 'Medication', description: 'What, if any, medications are being used? <br /> How will these make you feel?' },
      { id: 104, title: 'Location', description: 'Where is the detox taking place? <br />Can you get there on your own?' },
      { id: 105, title: 'Food', description: 'What food is provided during detox? <br />Prep own food if necessary.' },
      { id: 106, title: 'Friends and Family', description: 'What rules are in place for friends and family to visit?' },
      { id: 107, title: 'Rules', description: 'What rules are in place for you? <br />Can you come and go as you please?' },
      { id: 108, title: 'Breathaliser', description: 'When will you be breathalised? <br />What happens if you don\'t blow zero?' },
      { id: 109, title: 'Plan', description: 'You will have time on your hands. <br />What can you do with it positively and keep yourself occupied? <br />Is there a TV, books or anything else? <br />Will you need cash or cards for anything? <br />What is NOT allowed?' },
    ]
  },
  {
    id: 's2',
    title: 'Detox',
    period: 'First 24 hours',
    startLabel: 'Start of first 24 hours',
    endLabel: 'End of first 24 hours',
    events: [
      { id: 201, title: 'Withdrawal', description: 'Acute withdrawal begins. <br />Medication to help may be given.' },
      { id: 202, title: 'Sleep', description: 'Sleep likely be disrupted. <br />Trying to get back to a normal sleep routine is important but not critical at this stage.' },
      { id: 203, title: 'Anxiety', description: 'Anxiety could be heightened. <br /> Reach out if help is needed.' },
      { id: 204, title: 'Concentrating', description: 'Concentrating may seem difficult but will pass.' },
      { id: 205, title: 'Cravings', description: 'Strong cravings are likely as body begins to adjust.' },
      { id: 206, title: 'Negative thoughts', description: 'Negative thinking very possible. Your brain may try to convince you that drinking is a good idea. <br />It\'s not. <br />You\'ve not come this far to only come this far. <br /><b>Stay strong.</b>' },
      { id: 206, title: 'Be kind to yourself', description: 'Big changes are happening so be kind and patient to yourself. ' },
    ]
  },
  {
    id: 's3',
    title: 'Peak Withdrawal',
    period: 'First <br />3 Days',
    startLabel: 'Peak Withdrawal begins',
    endLabel: 'Peak Withdrawal ends',
    events: [
      { id: 301, title: 'Physical symptoms peak', description: 'Physical symptoms peak' },
      { id: 302, title: 'Appetite remains suppressed', description: 'Appetite remains suppressed but nutrition is important.' },
      { id: 302, title: 'Blood pressure may be higher', description: 'Blood pressure may be higher.' },
      { id: 302, title: 'Heart rate may increase', description: 'Heart rate may increase.' },
      { id: 302, title: 'Cognitive function impaired', description: 'Cognitive function impaired. Brain fog and confusion can be possible.' },
      { id: 302, title: 'Emotional volatility', description: 'Feeling unusually emotional can happen but entirely normal.' },
      { id: 302, title: 'Cravings intense & persistent', description: 'Cravings intense & persistent.' },
    ]
  },
  {
    id: 's4',
    title: 'Acute Symptoms Subside',
    period: 'Days <br />4-7',
    startLabel: 'Acute symptoms begin to subside',
    endLabel: 'Acute symptoms continue subsiding',
    events: [
      { id: 401, title: 'Acute physical symptoms', description: 'Acute physical symptoms start to diminish.' },
      { id: 402, title: 'Appetite suppressed', description: 'Appetite remains suppressed.' },
      { id: 403, title: 'Sleep normalized', description: 'Sleep may normalize.' },
      { id: 404, title: 'Appetite', description: 'Appetite starts to return.' },
      { id: 405, title: 'Sugar cravings', description: 'Craving sugary foods and drinks is common.' },
      { id: 406, title: 'Nausea improves', description: 'Nausea symptoms improve.' },
      { id: 407, title: 'Brain fog lifts', description: 'Initial brain fog lifts.' },
      { id: 408, title: 'Anxiety levels decrease', description: 'Anxiety levels decrease.' },
      { id: 409, title: 'Brief periods of clarity', description: 'Brief periods of clarity.' },
      { id: 410, title: 'Fewer Cravings', description: 'Fewer Cravings.' },
    ]
  },
  {
    id: 's5',
    title: 'Early Stabilization Phase',
    period: 'Days <br />7-10',
    startLabel: 'Early Stabilization begins',
    endLabel: 'Stabilization continues',
    events: [
      { id: 501, title: 'Sleep', description: 'Sleep patterns improve.' },
      { id: 502, title: 'Energy', description: 'Energy levels increase.' },
      { id: 503, title: 'Appetite', description: 'Appetite normalizes and food becomes more desirable.' },
      { id: 504, title: 'Nutritional Deficiencies', description: 'Nutritional deficiencies may surface.' },
      { id: 505, title: 'Skin', description: 'Skin hydration improves and starts to look clearer.' },
      { id: 506, title: 'Eyes', description: 'Eyes appear clearer and less blood shot.' },
      { id: 507, title: 'Cognitive Function', description: 'Cognitive function improves and the brain faster, sharper, and better at handling information.' },
      { id: 508, title: 'Concentration', description: 'Ability to concentrate returns.' },
      { id: 509, title: 'Pink Cloud Phenomenon', description: 'Some experience pink cloud phenomenon - feelings of extreme euphoria, optimism, and bliss.' },
      { id: 510, title: 'Emotional Regulation', description: 'Emotional regulation stabilizes as the mind moves from a state of impulsive, substance-dependent reactivity to a sustainable, conscious, and balanced way of navigating emotions.' },
    ]
  },
  {
    id: 's6',
    title: 'Post-Acute Withdrawal',
    period: 'Weeks <br />2-4',
    startLabel: 'Post-Acute Withdrawal Begins',
    endLabel: 'Post-Acute Withdrawal Ends',
    events: [
      { id: 601, title: 'Sleep', description: 'Sleep patterns continue to improve. Body and mind start to feel fresher.' },
      { id: 602, title: 'Energy', description: 'Natural energy rhythms re-establish.' },
      { id: 603, title: 'Cravings', description: 'Physical cravings diminish in frequency.' },
      { id: 604, title: 'Feelings', description: 'Mood swings, anxiety waves, low energy periods.' },
      { id: 605, title: 'Post-Acute Withdrawal Syndrome', description: 'PAWS (Post-Acute Withdrawal Syndrome) may occur. Persistent psychological and emotional symptoms—such as mood swings, anxiety, depression, insomnia, and cognitive fog.' },
      { id: 606, title: 'Mental Clarity', description: 'Mental clarity becomes more consistent.' },
      { id: 607, title: 'Negative Thought', description: 'Negative thought patterns reduce and outlook starts to feel more positive.' },
      { id: 608, title: 'Concentration', description: 'Ability to concentrate returns.' },
      { id: 609, title: 'Positive Emotions', description: 'Genuine positive emotions return.' },
    ]
  },{
    id: 's7',
    title: 'Neurological Rebalancing ',
    period: 'Months <br />1-3',
    startLabel: 'Neurological Rebalancing Begins',
    endLabel: 'Neurological Rebalancing Continues',
    events: [
      { id: 701, title: 'Liver', description: 'Liver enzymes begin to normalize.' },
      { id: 702, title: 'Blood Pressure', description: 'Blood pressure reduces.' },
      { id: 703, title: 'Heart Rate', description: 'General heart rate reduced.' },
      { id: 704, title: 'Energy Levels', description: 'Energy levels stabilize.' },
      { id: 705, title: 'Exercise Capacity', description: 'Exercise capacity increases and benefits become more apparent.' },
      { id: 706, title: 'PAWS Symptoms', description: 'PAWS symptoms may continue to occur, gradually diminishing' },
      { id: 707, title: 'Cravings', description: 'Cravings become more manageable and less frequent.' },
      { id: 708, title: 'Emotional Regulation', description: 'Emotional regulation continues to improve.' },
      { id: 709, title: 'Self-efficacy grows', description: 'Self-efficacy grows and belief in ability to succeed increases.' },
      { id: 710, title: 'Better Confidence', description: 'Confidence increases as benefits of recovery become more apparent.' },
    ]
  },
  ,{
    id: 's8',
    title: 'Sustained Recovery',
    period: 'Months <br />3-6',
    startLabel: 'Month 3 Significant Milestone Passed',
    endLabel: 'Sustained Recovery Continues',
    events: [
      { id: 801, title: 'Physical Health', description: 'Physical health continues improving.' },
      { id: 802, title: 'Sleep', description: 'Sleep becomes much better.' },
      { id: 803, title: 'Appetite', description: 'Appetite normalizes fully.' },
      { id: 804, title: 'Metabolism stabilizes', description: 'Metabolism stabilizes. Body reaches a steady, predictable rhythm in how it burns fuel (calories) for energy.' },
      { id: 805, title: 'Feeling healthy', description: 'Feeling healthy becomes a regular occurrence.' },
      { id: 806, title: 'Thinking patterns shift', description: 'Thinking patterns shift - negative thoughts diminish and strong positive outlook begins to emerge.' },
      { id: 807, title: 'Resilience', description: 'Resilience to stress improves.' },
      { id: 808, title: 'Confidence grows', description: 'Confidence grows as identity shifts to new, alcohol-free self.' },
      { id: 809, title: 'Identity Shift', description: 'Sense of identity begins to shift to one with more positive values.' },
    ]
  }
  ,{
    id: 's9',
    title: 'Sustained Recovery',
    period: 'Months <br />6-12',
    startLabel: 'Sustained Recovery Continues',
    endLabel: 'Recovery Continues with New Self',
    events: [
      { id: 901, title: 'Physical Healing', description: 'Physical healing reaches completion.' },
      { id: 902, title: 'Alcohol-free state', description: 'Body fully adapts to alcohol-free state.' },
      { id: 903, title: 'Exercise', description: 'Exercise fully possible.' },
      { id: 904, title: 'Nutrition', description: 'Full benefits of nutrition clear.' },
      { id: 905, title: 'Emotions', description: 'Emotional baseline stabilizes.' },
      { id: 906, title: 'Cravings', description: 'Cravings rare and easily managed.' },
      { id: 907, title: 'Outlook', description: 'Strong positive outlook.' },
      { id: 908, title: 'Identity shifts', description: 'Identity shifts to new, alcohol-free self.' },
      { id: 909, title: 'Self-efficacy grows', description: 'Self-efficacy grows and belief in ability to succeed increases.' },
      { id: 910, title: 'Purpose and Meaning', description: 'Purpose and meaning solidify as benefits of recovery clear.' },
    ]
  }

];