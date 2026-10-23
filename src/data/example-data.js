const example_data = [
  {
    id: 1,
    title: 'A.B.C.D.E',
    content: {
      acronyms: [
        {
          letter: 'A',
          meaning: 'Activating event or trigger',
          definition:
            '<p>What actually happened? This is the specific situation or event that got your motor started, revved up and the wheels spinning. Think back to even before the key was in the ignition.</p>',
          scenario: '',
        },
        {
          letter: 'B',
          meaning: 'Belief',
          definition:
            "<p>What story are you telling yourself about what happened? These are your thoughts and interpretations your mind is creating for you. But be sharp enough to spot when your mind is bending the truth. You're no fool.</p>",
          scenario: '',
        },
        {
          letter: 'C',
          meaning: 'Consequence',
          definition:
            "<p>How did those thoughts make you feel and act? This is where your emotions and behaviors show up and kick into play. Sometimes it's not pretty so prep yourself, think about it and stay cool.</p>",
          scenario: '',
        },
        {
          letter: 'D',
          meaning: 'Dispute',
          definition:
            "<p>It's time to get full-on detective with your own thoughts - are they really true and helpful or pulling a swerve and working against you? You can spot the blags so don't let them fool you. Take your thoughts to court and give them a grilling.</p>",
          scenario: '',
        },
        {
          letter: 'E',
          meaning: 'Effective new belief',
          definition:
            '<p>Push the crap to one side and focus on the true stuff. With that you can create a healthier, more realistic way of thinking about the situation and not get blind sided by the BS.</p>',
          scenario: '',
        },
      ],
      explanation:
        "<p>A bad-ass tool for catching those sneaky negative thoughts and turning them around using proven therapy techniques. It's also an easy-to-remember one - the first five letters of the alphabet. Get in.</p>",
    },
    scenarios: [
      {
        title: 'Job Interview Rejection',
        content:
          "<p>You didn't get a job you really wanted.</p><p>Instead of thinking 'I'm not good enough' <b>(old belief)</b>, you recognize that one rejection doesn't define your worth and there could be many factors involved <b>(new belief)</b>.</p>",
        btnLabel: 'Reframe Rejection',
      },
      {
        title: "Friend Didn't Text Back",
        content:
          "<p>Your friend hasn't responded to your message.</p><p>Rather than assuming they're mad at you <b>(old belief)</b>, you consider they might be busy or dealing with their own stuff <b>(new belief)</b>.</p>",
        btnLabel: 'Question Assumptions',
      },
    ],
    cats: [],
    videos: [
      {
        title: 'The ABCDEs of Coping with Urges',
        url: 'https://www.youtube.com/watch?v=4Pmd7pzQI1M',
      },
    ],
  },
  {
    id: 2,
    title: 'A.C.T.',
    content: {
      acronyms: [
        {
          letter: 'A',
          meaning: 'Accept',
          definition:
            '<p>Accept the things you can’t control right now (the craving, the feeling, the situation). Fighting it just feeds it.</p>',
          scenario: '',
        },
        {
          letter: 'C',
          meaning: 'Choose',
          definition: '<p>Choose what matters most to you—your values, your recovery, your future self.</p>',
          scenario: '',
        },
        {
          letter: 'T',
          meaning: 'Take action',
          definition: '<p>Do one small thing that lines up with that choice, even if you don’t feel like it.</p>',
          scenario: '',
        },
      ],
      explanation:
        '<p>Short, sweet Acceptance & Commitment Therapy magic. Stop wrestling with feelings and start moving toward the life you actually want.</p>',
    },
    scenarios: [
      {
        title: 'Craving Hits at Night',
        content:
          '<p><b>Accept:</b> Yep, the urge is here. It sucks.<br /><b>Choose:</b> I want to wake up proud tomorrow.<br /><b>Take action:</b> Put the phone in another room and do 10 push-ups instead.</p>',
        btnLabel: 'Commit to Values',
      },
      {
        title: 'Overwhelmed by Anxiety',
        content:
          '<p><b>Accept:</b> Anxiety is loud tonight, that’s allowed.<br /><b>Choose:</b> Being a calm parent/friend matters more than feeling perfect.<br /><b>Take action:</b> Use the 4-7-8 breathing and stay with the family instead of isolating.</p>',
        btnLabel: 'Move Forward Anyway',
      },
    ],
    cats: [],
    videos: [],
  },
  {
    id: 3,
    title: 'B.A.D.S',
    content: {
      acronyms: [
        {
          letter: 'B',
          meaning: 'Bored',
          definition: '<p>Feeling restless, unstimulated, or “at a loose end.”</p>',
          scenario: '',
        },
        {
          letter: 'A',
          meaning: 'Anxious',
          definition: '<p>Experiencing worry, nervousness, or fear about the future or current situations.</p>',
          scenario: '',
        },
        {
          letter: 'D',
          meaning: 'Depressed',
          definition: '<p>Feeling low, hopeless, unmotivated, or emotionally drained.</p>',
          scenario: '',
        },
        {
          letter: 'S',
          meaning: 'Stressed',
          definition: '<p>Feeling overwhelmed by demands, responsibilities, or external pressures.</p>',
          scenario: '',
        },
      ],
      explanation:
        "<p>B.A.D.S. is a super-quick check-in. When the urge to use/drink/gamble/scroll hits, pause and ask: “Am I actually <b>bored, anxious, depressed, or stressed</b> right now?” 99 % of the time it’s one of those four jerks in disguise. B.A.D.S. is the buddies with H.A.L.T. so check out that tool if B.A.D.S. isn't cutting it. </p>",
    },
    scenarios: [
      {
        title: 'Evening Cravings from Boredom',
        content:
          "<p>John is early in recovery from alcohol use. He notices strong cravings most evenings when he has nothing to do.</p><p><b>Using B.A.D.S.:</b></p><p>He identifies he's not actually thirsty for alcohol — he’s <u>bored.</u></p><p><u>Instead of drinking</u>, he chooses to <u>go for a walk and listen to a podcast, which keeps him engaged</u> until bedtime.</p>",
        btnLabel: 'Evening Cravings',
      },
      {
        title: 'Work Stress Triggering a Relapse Urge',
        content:
          '<p>Emma, recovering from gambling, feels the urge to gamble after a very stressful day at work.</p><p><b>Using B.A.D.S.:</b></p><p>She recognises <u>her urge is linked to being stressed, not a genuine desire to gamble.</u></p><p>She <u>calls a friend and practices some breathing exercises</u> instead.</p>',
        btnLabel: 'Work Stress Triggering',
      },
    ],
    cats: [],
    videos: [],
  },
  {
    id: 4,
    title: 'C.B.A.',
    content: {
      acronyms: [
        {
          letter: 'C',
          meaning: 'Cost',
          definition:
            "<p>What's this behavior really costing you?<br />Think beyond money - your relationships, health, self-respect</p>",
          scenario: '',
        },
        {
          letter: 'B',
          meaning: 'Benefit',
          definition:
            '<p>Be honest - what are you getting out of this behavior?<br />There must be something, right?</p>',
          scenario: '',
        },
        {
          letter: 'A',
          meaning: 'Analysis',
          definition: '<p>Put it all on the table and see which side weighs more - is it worth it?</p>',
          scenario: '',
        },
      ],
      explanation: '<p>Your no-BS pro/con list that cuts straight through the excuses.</p>',
    },
    scenarios: [
      {
        title: 'Binge Watching vs. Sleep',
        content:
          "<p><b>Cost:</b><br />Exhaustion, poor work performance, health issues.</p><p><b>Benefit:</b><br />Temporary escape, entertainment.</p><p><b>Analysis:</b><br />The short-term comfort isn't worth the long-term consequences to your wellbeing.</p>",
        btnLabel: 'Weigh It Out',
      },
      {
        title: 'Avoiding Difficult Conversations',
        content:
          '<p><b>Cost:</b><br />Unresolved conflicts, built-up resentment, damaged relationships.</p><p><b>Benefit:</b><br />Temporary peace, avoiding confrontation.</p><p><b>Analysis:</b><br />The temporary comfort is creating bigger problems that will be harder to solve later.</p>',
        btnLabel: 'Face the Truth',
      },
    ],
    cats: [],
    videos: [
      {
        title: 'Cost Benefit Analysis (CBA) ',
        url: 'https://www.youtube.com/watch?v=k2e2TNSTurs',
      },
      {
        title: 'How Does Cost-Benefit Analysis Help In SMART Recovery?',
        url: 'https://www.youtube.com/watch?v=ii1zvNDbzd0',
      },
    ],
  },
  {
    id: 5,
    title: 'D.E.A.D.S.',
    content: {
      acronyms: [
        {
          letter: 'D',
          meaning: 'Deny or Delay',
          definition:
            '<p>Just say <u>&quote;not right now&quote;</u> - you don\'t have to give in immediately.<br />Urges have expiration dates</p>',
          scenario: '',
        },
        {
          letter: 'E',
          meaning: 'Escape',
          definition:
            '<p><u>Change your scenery!</u><br />Sometimes the best thing you can do is physically remove yourself from temptation</p>',
          scenario: '',
        },
        {
          letter: 'A',
          meaning: 'Avoid / Accept / Attack',
          definition:
            '<p><u>Pick your battle strategy:</u><br />dodge the trigger, accept the feeling will pass, or tackle it head-on</p>',
          scenario: '',
        },
        {
          letter: 'D',
          meaning: 'Distract',
          definition:
            '<p>Redirect that mental energy somewhere else - <b><u>call someone</u>, <u>go for a walk</u>, <u>binge a show</u></b></p>',
          scenario: '',
        },
        {
          letter: 'S',
          meaning: 'Substitute',
          definition:
            '<p>Swap out the harmful habit for something that actually <b>makes you feel good about yourself</b></p>',
          scenario: '',
        },
      ],
      explanation:
        '<p>Five solid moves when a craving knocks. Think of cravings like door-to-door salesmen—if you stop answering, they eventually leave.</p>',
    },
    scenarios: [
      {
        title: 'Craving Alcohol at a Party',
        content:
          "<p><b>Delay:</b><br />'I'll wait 15 minutes first.'</p><p><b>Escape:</b><br />Step outside or go to the bathroom.</p><p><b>Accept:</b><br />'This urge will pass.'</p><p><b>Distract:</b><br />Start a conversation with someone new.</p><p><b>Substitute:</b><br />Grab a mocktail or soda instead.</p>",
        btnLabel: 'Beat the Craving',
      },
      {
        title: 'Wanting to Text an Ex',
        content:
          "<p><b>Delay:</b><br />'I'll wait until tomorrow.'</p><p><b>Escape:</b><br />Leave your phone in another room.</p><p><b>Avoid:</b><br />Delete their number (again).</p><p><b>Distract:</b><br />Call a friend or watch funny videos.</p><p><b>Substitute:</b><br />Write in a journal instead.</p>",
        btnLabel: 'Resist the Urge',
      },
    ],
    cats: [],
    videos: [
      {
        title: 'The DEADs Tool Explained',
        url: 'https://www.youtube.com/watch?v=rHl3STAGl-I',
      },
    ],
  },
  {
    id: 6,
    title: 'D.I.S.A.R.M.',
    content: {
      acronyms: [
        {
          letter: 'D',
          meaning: 'Destructive',
          definition:
            '<p>Notice when your brain is playing up and feeding you garbage thoughts and mental images. It can be a snake at times. </p>',
          scenario: '',
        },
        {
          letter: 'I',
          meaning: 'Imagery',
          definition:
            "<p>Catch those vivid mental movies that make you want to use - they're not real predictions. It's eupohric recall. Your brain trying to trick you with the choice good times but forgetting all the crappy bits when it goes horribly wrong.</p>",
          scenario: '',
        },
        {
          letter: 'S',
          meaning: 'Self-talk',
          definition:
            "<p>What's that inner voice telling you? If it's being a jerk, it's time to change the conversation and let it know who's boss around here. </p>",
          scenario: '',
        },
        {
          letter: 'A',
          meaning: 'Awareness',
          definition:
            "<p>You can't change what you don't notice. So chill and take a moment, have a look around and check-in with yourself. Focus on your breath and have a quick think about it. You've got this. </p>",
          scenario: '',
        },
        {
          letter: 'R',
          meaning: 'Refusal',
          definition:
            '<p>Tell those toxic thoughts who\'s in control. It\'s going to be a &quote;thanks but no thanks&quote; to them and your not going to engage.</p>',
          scenario: '',
        },
        {
          letter: 'M',
          meaning: 'Method',
          definition: '<p>Have a game plan ready to replace the junk thoughts with something better</p>',
          scenario: '',
        },
      ],
      explanation:
        '<p>D.I.S.A.R.M. is like your own personal secuity team. Like the ones in the movies, and that ex World leaders have. It is your mental &quote;bodyguard system&quote; - protecting you from the gremlins creating thoughts and images that try to sabotage your progress. Use the D.I.S.A.R.M. team as they have got your back.</p>',
    },
    scenarios: [
      {
        title: 'Gambling Urge Imagery',
        content:
          '<p><b>You start &quote;visualizing&quote; winning big at the casino.</b></p><p><b>Recognize this as destructive imagery</b>,<br /><u>become aware of the pattern</u>,<br /><b>refuse to engage with the fantasy</b>,<br />and <u>replace it with images of financial stability and peace of mind.</u></p>',
        btnLabel: 'Block the Fantasy',
      },
      {
        title: 'Negative Self-Talk Spiral',
        content:
          '<p>Inner voice says <u>&quote;You will never change&quote;, why even try?</u></p><p>Catch this destructive self-talk, recognize the familiar pattern, refuse to argue with it, and replace it with <u>&quote;I amm learning and growing every day.&quote;</u></p>',
        btnLabel: 'Silence the Critic',
      },
    ],
    cats: [],
    videos: [
      {
        title: 'The DISARM Tool Explained',
        url: 'https://www.youtube.com/watch?v=pAVbXlXBthA',
      },
    ],
  },
]
