// questions.js
const levels = {
  easy: [
    {
      question: "What does CBT stand for when we're talking recovery tools?",
      correctMessage:
        'Correct! Cognitive Behavioral Therapy – the one that helps you sort out dodgy thinking patterns.',
      incorrectMessage: "Nearly correct, it's Cognitive Behavioral Therapy.",
      answers: [
        { text: 'Cognitive Behavioral Therapy', isCorrect: true },
        { text: 'Comprehensive Behavioral Training', isCorrect: false },
        { text: 'Clinical Brain Therapy', isCorrect: false },
        { text: 'Conscious Breathing Technique', isCorrect: false },
      ],
    },
    {
      question: "What's a relapse in recovery terms?",
      correctMessage:
        'Correct! Going back to using after a period of being clean.',
      incorrectMessage:
        'Not quite. A relapse is returning to substance use after stopping.',
      answers: [
        { text: 'Going back to using after stopping', isCorrect: true },
        { text: 'Taking a break from recovery meetings', isCorrect: false },
        { text: 'Feeling tempted but not using', isCorrect: false },
        { text: 'Reducing your substance use', isCorrect: false },
      ],
    },
    {
      question: 'What does NA stand for in recovery circles?',
      correctMessage: "That's right! Narcotics Anonymous.",
      incorrectMessage: 'Not quite. NA stands for Narcotics Anonymous.',
      answers: [
        { text: 'Narcotics Anonymous', isCorrect: true },
        { text: 'New Awareness', isCorrect: false },
        { text: 'No Addiction', isCorrect: false },
        { text: 'Nationwide Alliance', isCorrect: false },
      ],
    },
    {
      question: 'What is withdrawal in addiction recovery?',
      correctMessage: 'Yes! The body and mind adjusting when you stop using.',
      incorrectMessage:
        'Not quite. Withdrawal is your body reacting to stopping substance use.',
      answers: [
        { text: 'Body adjusting when stopping use', isCorrect: true },
        { text: 'Leaving a recovery program', isCorrect: false },
        { text: 'Taking money out the bank', isCorrect: false },
        { text: 'Isolating from others', isCorrect: false },
      ],
    },
    {
      question: "What's harm reduction all about?",
      correctMessage:
        'Correct! Reducing risks and damage, even if not fully abstinent.',
      incorrectMessage:
        "Not quite. It's about reducing risks and damage, even if not fully abstinent.",
      answers: [
        {
          text: 'Reducing risks even without full abstinence',
          isCorrect: true,
        },
        { text: 'Complete abstinence only', isCorrect: false },
        { text: 'Avoiding all risky situations', isCorrect: false },
        { text: 'Harm reduction medication', isCorrect: false },
      ],
    },
    {
      question: 'What does "clean time" mean in recovery?',
      correctMessage: "That's right! How long you've been substance-free.",
      incorrectMessage:
        "Close. It's the time you've stayed away from substances.",
      answers: [
        { text: "Time you've been substance-free", isCorrect: true },
        { text: 'Time spent cleaning your house', isCorrect: false },
        { text: 'Hours in therapy sessions', isCorrect: false },
        { text: 'Time since last meeting', isCorrect: false },
      ],
    },
    {
      question: "What's the main point of group therapy?",
      correctMessage: 'Exactly! Sharing experiences and supporting each other.',
      incorrectMessage:
        "Not quite. It's about mutual support and shared experiences.",
      answers: [
        { text: 'Sharing experiences and mutual support', isCorrect: true },
        {
          text: 'One therapist treating many people separately',
          isCorrect: false,
        },
        { text: 'Competitive recovery challenges', isCorrect: false },
        { text: 'Large lectures about addiction', isCorrect: false },
      ],
    },
    {
      question: "What's peer support in recovery?",
      correctMessage:
        "Legend! Help from others who've been through similar struggles.",
      incorrectMessage:
        "Close. It's support from people with lived recovery experience.",
      answers: [
        { text: 'Support from others in recovery', isCorrect: true },
        { text: 'Professional counseling only', isCorrect: false },
        { text: 'Support from friends who never used', isCorrect: false },
        { text: 'Online forums exclusively', isCorrect: false },
      ],
    },
    {
      question: 'What are healthy boundaries in recovery?',
      correctMessage: 'Correct! Limits you set to protect your recovery.',
      incorrectMessage: "Close. They're protective limits for your wellbeing.",
      answers: [
        { text: 'Limits to protect your recovery', isCorrect: true },
        { text: 'Avoiding everyone from your past', isCorrect: false },
        { text: 'Never saying no to anyone', isCorrect: false },
        { text: 'Physical fences around your home', isCorrect: false },
      ],
    },
    {
      question: 'In ACT, what\'s the "A" all about?',
      correctMessage:
        "That's right! Acceptance – letting stuff be without kicking off.",
      incorrectMessage: 'Close but not quite. A stands for Acceptance.',
      answers: [
        { text: 'Acceptance', isCorrect: true },
        { text: 'Avoidance', isCorrect: false },
        { text: 'Anger', isCorrect: false },
        { text: 'Action', isCorrect: false },
      ],
    },
    {
      question:
        "What's one big skill you learn in DBT to keep your emotions in check?",
      correctMessage:
        'Exactly right! Mindfulness – staying in the moment like a boss.',
      incorrectMessage: "Not quite. It's mindfulness.",
      answers: [
        { text: 'Mindfulness', isCorrect: true },
        { text: 'Muscle relaxation technique', isCorrect: false },
        { text: 'Separating memories', isCorrect: false },
        { text: 'How to really let go by venting', isCorrect: false },
      ],
    },
    {
      question: 'SMART Recovery is all about what kind of vibe?',
      correctMessage:
        'You got it! Self-empowerment –  when you run your own show with tools that work.',
      incorrectMessage: "Nearly correct, it's self-empowerment, no higher power needed.",
      answers: [
        { text: 'Self-empowerment', isCorrect: true },
        { text: 'Spiritual surrender', isCorrect: false },
        { text: 'Super strict rules', isCorrect: false },
        { text: 'Shutting yourself away', isCorrect: false },
      ],
    },
    {
      question: 'What\'s "urge surfing" mean in recovery slang?',
      correctMessage:
        'Legend! Riding the craving wave till it dies down - no drama.',
      incorrectMessage:
        "Not quite. It's riding out cravings without jumping in and making mistakes.",
      answers: [
        { text: 'Riding out cravings like a wave', isCorrect: true },
        { text: 'Blocking urges forever', isCorrect: false },
        { text: 'Scrolling social media to forget', isCorrect: false },
        { text: 'Actual surfing on water to distract', isCorrect: false },
      ],
    },
    {
      question: 'In CBT, what are we challenging?',
      correctMessage: 'Yes! Negative thoughts that mess with your head.',
      incorrectMessage: 'Nearly correct, we challenge negative thoughts.',
      answers: [
        { text: 'Negative thoughts', isCorrect: true },
        { text: 'Automatic behaviors', isCorrect: false },
        { text: 'Past traumas', isCorrect: false },
        { text: 'Physical cravings', isCorrect: false },
      ],
    },
    {
      question: 'DBT stands for what?',
      correctMessage: 'Correct! Dialectical Behavior Therapy.',
      incorrectMessage: "Nearly correct, it's Dialectical Behavior Therapy.",
      answers: [
        { text: 'Dialectical Behavior Therapy', isCorrect: true },
        { text: 'Dialectic Behavioral Treatment', isCorrect: false },
        { text: 'Dynamic Behavior Therapy', isCorrect: false },
        { text: 'Diagnostic Behavior Technique', isCorrect: false },
      ],
    },
    {
      question: "What's the big idea in ACT?",
      correctMessage:
        'Correct! Accepting thoughts without letting them run the show.',
      incorrectMessage:
        "Not quite. It's accepting tough thoughts instead of battling them.",
      answers: [
        { text: 'Accepting thoughts without judgment', isCorrect: true },
        { text: 'Maintaining positivity 24/7', isCorrect: false },
        { text: 'Arguing with thoughts', isCorrect: false },
        { text: 'Swerving all feelings', isCorrect: false },
      ],
    },
    {
      question: 'SMART loves which tool for weighing up choices?',
      correctMessage: 'You know it! Cost-Benefit Analysis.',
      incorrectMessage: "Close, but it's Cost-Benefit Analysis.",
      answers: [
        { text: 'Cost Benefit Analysis', isCorrect: true },
        { text: 'Calm Before Action', isCorrect: false },
        { text: 'Conducting Better Analysis', isCorrect: false },
        { text: 'Crowd Beating Answers', isCorrect: false },
      ],
    },
    {
      question: 'What\'s "defusion" in Acceptance Commitment Therapy - A.C.T?',
      correctMessage:
        "Excellent! Stepping back so thoughts don't boss you around.",
      incorrectMessage: 'Not quite, defusion is unhooking from dank thoughts.',
      answers: [
        { text: 'Unhooking from thoughts', isCorrect: true },
        { text: 'Fusing and then defusing thoughts', isCorrect: false },
        { text: 'Defusing the past', isCorrect: false },
        { text: 'Defusing bad relationships', isCorrect: false },
      ],
    },
    {
      question: "In recovery, what's H.A.L.T. a quick check for?",
      correctMessage: 'Yes! Hungry, Angry, Lonely, Tired.',
      incorrectMessage:
        "Not quite. It's Hungry, Angry, Lonely, Tired. A useful tool from SMART and other therapies. Check one of their meet ups.",
      answers: [
        { text: 'Hungry, Angry, Lonely, Tired', isCorrect: true },
        { text: 'Happy, Active, Loving, Thankful', isCorrect: false },
        { text: 'Healing, Attentive, Leave, Tough', isCorrect: false },
        { text: 'Hectic, Anxious, Lazy, Tense', isCorrect: false },
      ],
    },
    {
      question: "What's the Pause Button in recovery?",
      correctMessage:
        'Legend! That mental freeze to stop impulsive decisions and moves.',
      incorrectMessage:
        "Nearly correct, it's hitting pause before doing something you'll regret.",
      answers: [
        { text: 'Mental break before reacting', isCorrect: true },
        { text: 'Button to push thoughts away', isCorrect: false },
        { text: 'Skip button for feelings', isCorrect: false },
        { text: 'Play button for old habits', isCorrect: false },
      ],
    },
    {
      question: 'In DBT, what is the "Wise Mind"?',
      correctMessage:
        'Brilliant!  Wise Mind is the perfect balance between your emotional, reactive side and your cold, logical side.',
      incorrectMessage:
        "Close, it's balancing your emotional, reactive side and your cold, logical side.",
      answers: [
        { text: 'Balance of emotion and logic', isCorrect: true },
        { text: 'Being in pure emotion mode', isCorrect: false },
        { text: 'Seeing only cold facts', isCorrect: false },
        { text: 'In a daydreaming state', isCorrect: false },
      ],
    },
    {
      question: "What's a common trigger people talk about in recovery?",
      correctMessage:
        'You got it! People, places, or things linked to past use.',
      incorrectMessage:
        'Almost, triggers are anything that sparks cravings. Common triggers are People, places, or things linked to past use.',
      answers: [
        { text: 'People, places, and things', isCorrect: true },
        { text: 'Positive memories and thoughts', isCorrect: false },
        { text: 'Physical exercise', isCorrect: false },
        { text: 'Fast food places', isCorrect: false },
      ],
    },
    {
      question: 'What does "one day at a time" really mean?',
      correctMessage: "Boom! Focus on today, don't stress tomorrow.",
      incorrectMessage:
        "Not quite. It's staying sober just for today, one step at a time.",
      answers: [
        { text: 'Focusing on today only', isCorrect: true },
        { text: 'Not planning anything over a day', isCorrect: false },
        { text: 'Not committing to anything long term', isCorrect: false },
        { text: 'Getting everything done in a day', isCorrect: false },
      ],
    },
    {
      question: "In SMART, what's the DISARM tool for?",
      correctMessage:
        "Smashing! It's battling the addictive voice in your head. - the Destructive Imagery and Self-talk Awareness and Refusal Method",
      incorrectMessage:
        'Not quite, DISARM helps you fight off craving thoughts. It stands for Destructive Imagery and Self-talk Awareness and Refusal Method',
      answers: [
        { text: 'Fighting addictive thoughts', isCorrect: true },
        { text: 'Disarming people attacking you', isCorrect: false },
        { text: 'Distracting with loud music', isCorrect: false },
        { text: 'Using alarm reminders for distraction', isCorrect: false },
      ],
    },
    {
      question: 'What\'s "play the tape forward" mean?',
      correctMessage:
        "Correct! It's thinking about the whole disaster that will unfold if you pick up or use. Because you have played that tape before and know how it ends.",
      incorrectMessage:
        "Not quite – check out the Tools section! It's thinking through consequences of picking up or having a drink, right to the end. You've probably played the tape before.",
      answers: [
        { text: 'Thinking through the full consequences', isCorrect: true },
        { text: 'Rewatching old videos to reminisce', isCorrect: false },
        { text: 'Skipping music tracks on a playlist', isCorrect: false },
        { text: 'Only listening to or watching new content', isCorrect: false },
      ],
    },
    {
      question: 'In ACT, what\'s "committed action"?',
      correctMessage: 'You know it! Doing stuff that matches your values.',
      incorrectMessage: "Close, it's taking steps toward what matters to you.",
      answers: [
        { text: 'Actions matching your values', isCorrect: true },
        { text: 'Committing to negative thoughts', isCorrect: false },
        { text: 'Committing to therapy only', isCorrect: false },
        { text: 'Doing distracting random moves', isCorrect: false },
      ],
    },
    {
      question: "What's box breathing good for?",
      correctMessage:
        'Great! Calming down by using breathing when stress, cravings or life gets heavy.',
      incorrectMessage:
        "Not quite. It's a quick way to chill your nervous system using your breathing. It can turn down the volume when it gets chaotic, giving you space to think clearly before making a move you'll later regret.",
      answers: [
        { text: 'A way to calm stress fast', isCorrect: true },
        { text: 'Increasing lung capacity', isCorrect: false },
        { text: 'Improving cardio fitness', isCorrect: false },
        { text: 'Deepening meditation practice', isCorrect: false },
      ],
    },
    {
      question: 'In recovery, what\'s a "dry drunk"?',
      correctMessage:
        'Yep! It is when someone is sober but they still behave like their old using self and have changed nothing.',
      incorrectMessage:
        'Nearly correct, It is when someone is sober but they still behave like their old using self and have changed nothing.',
      answers: [
        { text: 'Being sober without changing behaviors', isCorrect: true },
        { text: 'Remembering being drunk without drinking', isCorrect: false },
        { text: 'Recovering from hangovers', isCorrect: false },
        { text: 'Pretending to be drunk to forget', isCorrect: false },
      ],
    },
    {
      question: 'What does "connection is the opposite of addiction" mean?',
      correctMessage:
        'Yes! Building real bonds beats isolation - a core addiction driver.',
      incorrectMessage:
        'Close. Addiction loves loneliness, connection fights it.',
      answers: [
        { text: 'Real bonds fight addiction', isCorrect: true },
        { text: 'Replacing drinking with lots of social media', isCorrect: false },
        { text: 'Building professional networks', isCorrect: false },
        { text: 'Meeting up with old using friends', isCorrect: false },
      ],
    },
    {
      question: "What's a sponsor in a 12-step programs?",
      correctMessage:
        'Yup! Someone more experienced in the program that a newbie can lean on for support.',
      incorrectMessage:
        'Not quite. A sponsor is a recovery mentor. Someone more experienced in the program that a newbie can lean on for support.',
      answers: [
        { text: 'A recovery mentor', isCorrect: true },
        { text: 'Someone who pays you to attend', isCorrect: false },
        { text: 'A company who pay the group leader', isCorrect: false },
        { text: 'A dedicated therapy coordinator', isCorrect: false },
      ],
    },
    {
      question: "In CBT, what's the thought-feeling-behavior triangle?",
      correctMessage:
        'You got it! Thoughts, Feelings and Behaviors all link and affect each other.',
      incorrectMessage:
        'Not quite – worth checking out a CBT resource. Thoughts, Feelings and Behaviors all link and affect each other. They link together in a triangle.',
      answers: [
        { text: 'How thoughts, feelings, actions are linked', isCorrect: true },
        { text: 'A process of spiritual connection', isCorrect: false },
        { text: 'A way to divide up the group in sessions', isCorrect: false },
        { text: 'A triangle used for meditations', isCorrect: false },
      ],
    },
    {
      question: 'What\'s "Radical Acceptance" in DBT?',
      correctMessage:
        "Excellent! It's fully accepting reality, all of it, the good bits and the bad,  and not fighting it.",
      incorrectMessage:
        "Not quite. It's accepting all the stuff you can't change – completely. No selecting choice parts, and no fighting it.",
      answers: [
        { text: 'Full acceptance of reality', isCorrect: true },
        { text: 'Radical political views', isCorrect: false },
        { text: 'Giving all your money away', isCorrect: false },
        { text: 'Accepting lame effort as the norm ', isCorrect: false },
      ],
    },
    {
      question: "In SMART, what's VACI stand for?",
      correctMessage: 'Yes! Vital Absorbing Creative Interests.',
      incorrectMessage:
        "Close, it stands for Vital Absorbing Creative Interests. That's hobbies and interest that get your motor started and grab your attention.",
      answers: [
        { text: 'Vital Absorbing Creative Interests', isCorrect: true },
        { text: 'Very Annoying Daily Interruptions', isCorrect: false },
        { text: 'Video And Console Input', isCorrect: false },
        { text: 'Vacation All Costs Included', isCorrect: false },
      ],
    },
    {
      question: 'What\'s "euphoric recall"?',
      correctMessage: 'Correct! Remembering only the good bits of using.',
      incorrectMessage: "Not quite. It's your brain glamorizing past highs.",
      answers: [
        { text: 'Glorifying past highs', isCorrect: true },
        { text: 'A Perfect memory', isCorrect: false },
        { text: 'A recovery film', isCorrect: false },
        { text: 'Recalling phone numbers', isCorrect: false },
      ],
    },

    {
      question: 'What\'s a "pink cloud" in early recovery?',
      correctMessage: 'You know it! That super happy phase that can fade.',
      incorrectMessage: "Close. It's feeling unrealistically amazing early on.",
      answers: [
        { text: 'An early super happy phase', isCorrect: true },
        { text: 'A temporary mood boost in recovery', isCorrect: false },
        { text: 'Initial withdrawal symptoms', isCorrect: false },
        { text: 'Foggy vision in withdrawal', isCorrect: false },
      ],
    },
    {
      question: 'In ACT, why do we "make room" for feelings?',
      correctMessage: "Excellent! So they don't control your moves.",
      incorrectMessage: 'Not quite, allow feelings without letting them drive.',
      answers: [
        { text: 'It allows feelings without fighting', isCorrect: true },
        { text: 'So it blocks out emotions', isCorrect: false },
        { text: 'To push feelings away', isCorrect: false },
        { text: 'So we can find the negative ones', isCorrect: false },
      ],
    },
    {
      question: 'What\'s the opposite of the "F*ck It Button"?',
      correctMessage: 'Exactly right! The Pause Button!',
      incorrectMessage: "Not quite. It's the Pause Button.",
      answers: [
        { text: 'The Pause Button', isCorrect: true },
        { text: 'The Stop Button', isCorrect: false },
        { text: 'The F*ck Us Button', isCorrect: false },
        { text: 'The F*ck Them Button', isCorrect: false },
      ],
    },
    {
      question: 'What does mindfulness mean in simple terms?',
      correctMessage: 'Correct! Paying attention to right now without judging.',
      incorrectMessage: 'Not quite. It\'s being present in the moment.',
      answers: [
       
        { text: 'Watching where we walk', isCorrect: false },
        { text: 'Never letting your mind wander', isCorrect: false },
         { text: 'Being present in the moment', isCorrect: true },
        { text: 'Always watching out for danger', isCorrect: false },
      ],
    },
    {
      question: 'What\'s codependency in recovery?',
      correctMessage: 'Yes! Relying too much on others for self-worth.',
      incorrectMessage: 'Close. It\'s unhealthy dependence on relationships.',
      answers: [
       
        { text: 'Two people in recovery together', isCorrect: false },
        { text: 'Depending on medication only', isCorrect: false },
         { text: 'Unhealthy reliance on others for worth', isCorrect: true },
        { text: 'Mental health software', isCorrect: false },
      ],
    },
    {
      question: 'What\'s abstinence in recovery?',
      correctMessage: 'That\'s right! Complete avoidance of substances.',
      incorrectMessage: 'Not quite. It means staying completely clean.',
      answers: [
        { text: 'Complete avoidance of substances', isCorrect: true },
        { text: 'An alcohol free shot', isCorrect: false },
        { text: 'Switching to safer substances', isCorrect: false },
        { text: 'Taking breaks between using', isCorrect: false },
      ],
    },
    {
      question: 'What\'s a relapse warning sign?',
      correctMessage: 'Exactly! Changes in mood or behavior before relapse.',
      incorrectMessage: 'Close. It\'s early indicators you might be heading for trouble.',
      answers: [
        { text: 'An early warning of potential relapse', isCorrect: true },
        { text: 'Physical symptoms during withdrawal', isCorrect: false },
        { text: 'Signs you need more medication', isCorrect: false },
        { text: 'Warnings from family members', isCorrect: false },
      ],
    },
    {
      question: 'Why is gratitude important in recovery?',
      correctMessage: 'Yes! Shifts focus from what\'s missing to what you have.',
      incorrectMessage: 'Not quite. It helps you appreciate the good stuff.',
      answers: [
        { text: 'Focuses on positives not negatives', isCorrect: true },
        { text: 'Makes you forget past mistakes', isCorrect: false },
        { text: 'It replaces therapy completely', isCorrect: false },
        { text: 'It earns rewards in meetings', isCorrect: false },
      ],
    },
    {
      question: 'What does the 12-step slogan "Keep it simple" mean?',
      correctMessage: 'That\'s right! Don\'t overthink recovery, take it step by step.',
      incorrectMessage: 'Close. Focus on basics without overcomplicating.',
      answers: [
        { text: 'Don\'t overcomplicate recovery', isCorrect: true },
        { text: 'Only go to simple meetings', isCorrect: false },
        { text: 'Avoid complex emotions', isCorrect: false },
        { text: 'Use basic language only', isCorrect: false },
      ],
    },
    {
      question: 'What\'s a trigger plan?',
      correctMessage: 'Correct! Steps to take when you face triggers.',
      incorrectMessage: 'Not quite. It\'s your game plan for handling triggers.',
      answers: [
        { text: 'Plan for handling triggers', isCorrect: true },
        { text: 'Listing of all your triggers', isCorrect: false },
        { text: 'Schedule for therapy sessions', isCorrect: false },
        { text: 'A way to test your limits', isCorrect: false },
      ],
    },
    {
      question: 'What does "making amends" mean in recovery?',
      correctMessage: 'Yes! Making things right with people you\'ve harmed.',
      incorrectMessage: 'Close. It\'s repairing damage from your addiction.',
      answers: [
        { text: 'Making things right with people you harmed', isCorrect: true },
        { text: 'Paying back money you owe', isCorrect: false },
        { text: 'Apologizing to everyone you know', isCorrect: false },
        { text: 'Changing who you are', isCorrect: false },
      ],
    },
  ],
  medium: [
    {
      question: 'How does CBT actually help when a craving hits?',
      correctMessage:
        "That's right! Spots and swaps out thoughts that make you wanna use.",
      incorrectMessage:
        'Nearly correct, it helps by changing the dodgy stories your brain tells you.',
      answers: [
        { text: 'Changes negative thought patterns', isCorrect: true },
        { text: 'Teaches distraction techniques', isCorrect: false },
        { text: 'Focuses on willpower building', isCorrect: false },
        { text: 'Provides ways to avoid triggers', isCorrect: false },
      ],
    },
    {
      question: 'What\'s "Wise Mind" in DBT slang?',
      correctMessage: 'Excellent! That sweet spot mixing feelings and logic.',
      incorrectMessage: "Close, it's blending emotion mind and reason mind.",
      answers: [
        { text: 'Balance between feelings and logic', isCorrect: true },
        { text: 'Studying and learning things all the time', isCorrect: false },
        { text: 'Behaving like a Buddha', isCorrect: false },
        { text: 'Letting your mind wandering off', isCorrect: false },
      ],
    },
    {
      question: "In SMART, what's the ABC tool proper good for?",
      correctMessage:
        'You got it! Breaking down trigger → thought → consequence.',
      incorrectMessage: "Nearly correct, it's event-belief-consequence breakdown.",
      answers: [
        { text: 'Activating-Event, Belief, Consequence', isCorrect: true },
        { text: 'Awareness, Behavior, Change', isCorrect: false },
        { text: 'Accept, Believe, Commit', isCorrect: false },
        { text: 'Analyze, Build, Continue', isCorrect: false },
      ],
    },
    {
      question: 'ACT says do what with rough feelings?',
      correctMessage: 'Legend! Accept the feelings instead of swerving them.',
      incorrectMessage: 'Almost. Accept tough emotions rather than fight.',
      answers: [
        { text: 'Accept instead of avoid', isCorrect: true },
        { text: 'Transform them into positivity', isCorrect: false },
        { text: 'Express them immediately', isCorrect: false },
        { text: 'Analyze their root causes', isCorrect: false },
      ],
    },
    {
      question: 'DBT has distress tolerance tricks like what?',
      correctMessage: 'Exactly right! Radical acceptance – letting reality be.',
      incorrectMessage: 'Nearly correct, radical acceptance is the one.',
      answers: [
        { text: 'Radical acceptance', isCorrect: true },
        { text: 'Emotional regulation', isCorrect: false },
        { text: 'Mindful distraction', isCorrect: false },
        { text: 'Self-soothing techniques', isCorrect: false },
      ],
    },
    {
      question: "SMART's DISARM is a weapon against what?",
      correctMessage: "That's right! That addictive voice chatting rubbish.",
      incorrectMessage: 'Close, it disarms craving thoughts.',
      answers: [
        { text: 'Addictive voice in head', isCorrect: true },
        { text: 'Negative people', isCorrect: false },
        { text: 'Old using friends', isCorrect: false },
        { text: 'Boring therapists', isCorrect: false },
      ],
    },
    {
      question: 'The CBT triangle links thoughts, feelings and what else?',
      correctMessage: 'Correct! Behaviors – they all bounce off each other.',
      incorrectMessage: "Nearly correct, it's thoughts, feelings, behaviors.",
      answers: [
        { text: 'Behaviors', isCorrect: true },
        { text: 'Beliefs', isCorrect: false },
        { text: 'Biology', isCorrect: false },
        { text: 'Bossing it', isCorrect: false },
      ],
    },
    {
      question: 'In ACT, "committed action" means what on the street?',
      correctMessage:
        'Excellent! Doing stuff that lines up with what you actually care about.',
      incorrectMessage: 'Not quite. Taking steps toward your real values.',
      answers: [
        { text: 'Steps matching your values', isCorrect: true },
        { text: 'Committing to random stuff', isCorrect: false },
        { text: 'Acting like a ninja', isCorrect: false },
        { text: 'Jumping-in head first', isCorrect: false },
      ],
    },
    {
      question: 'DBT teaches interpersonal skills for what?',
      correctMessage: 'You know it! Saying what you need without beef.',
      incorrectMessage: "Nearly correct, it's assertive communication in relationships.",
      answers: [
        { text: 'Assertive relationship skills', isCorrect: true },
        { text: 'Passive communication', isCorrect: false },
        { text: 'Developing dating skills', isCorrect: false },
        { text: 'Indirect communication', isCorrect: false },
      ],
    },
    {
      question: "SMART's four core areas cover what?",
      correctMessage:
        'Legend! Motivation, urges, thoughts, and lifestyle balance.',
      incorrectMessage:
        "Close, it's building motivation, coping with urges, etc.",
      answers: [
        { text: 'Motivation, urges, thoughts, and lifestyle', isCorrect: true },
        {
          text: 'Mindfulness, triggers, support, and planning',
          isCorrect: false,
        },
        { text: 'Awareness, habits, goals, and wellness', isCorrect: false },
        {
          text: 'Honesty, willingness, acceptance, and action',
          isCorrect: false,
        },
      ],
    },
    {
      question: 'Why is "connection" a BIG driver in beating addiction?',
      correctMessage:
        'Yes! Because addiction loves isolation, and connection pushes it to the curb.',
      incorrectMessage: 'Nearly correct, real bonds are the opposite of addiction.',
      answers: [
        { text: 'Real bonds starve addiction', isCorrect: true },
        { text: 'Good WiFi is always needed', isCorrect: false },
        { text: 'It\'s good to keep in touch with old using friends', isCorrect: false },
        { text: 'You feel better with more social media friends', isCorrect: false },
      ],
    },
    {
      question: 'What\'s "opposite action" in DBT?',
      correctMessage:
        'Excellent! Doing the opposite of what your emotion screams.',
      incorrectMessage: 'Close, act opposite to unhelpful emotion urges.',
      answers: [
        { text: 'Doing the opposite of emotion urges', isCorrect: true },
        { text: 'Running away from every feeling', isCorrect: false },
        { text: 'Pushing people away', isCorrect: false },
        { text: 'Doing things people don\'t expect', isCorrect: false },
      ],
    },
    {
      question: 'What\'s the main difference between a craving and an urge?',
      correctMessage: 'Exactly! A craving is mental desire, an urge is the physical push to act.',
      incorrectMessage: 'Close. Cravings are thoughts, urges are impulses to act.',
      answers: [
        { text: 'Craving is mental, urge is impulse to act', isCorrect: true },
        { text: 'They mean the same thing', isCorrect: false },
        { text: 'Cravings are stronger than urges', isCorrect: false },
        { text: 'Urges come before cravings', isCorrect: false },
      ],
    },
    {
      question: 'What is cross-addiction in recovery?',
      correctMessage: 'That\'s right! Swapping one addiction for another.',
      incorrectMessage: 'Not quite. It\'s replacing one substance with a different one.',
      answers: [
        { text: 'Replacing one addiction with another', isCorrect: true },
        { text: 'Being addicted to multiple things at once', isCorrect: false },
        { text: 'Finding religion in recovery', isCorrect: false },
        { text: 'Mixing different substances together', isCorrect: false },
      ],
    },
    {
      question: 'How does mindfulness help manage cravings in DBT?',
      correctMessage: 'Correct! Observing cravings without reacting lets them pass naturally.',
      incorrectMessage: 'Close. It\'s about noticing cravings without acting on them.',
      answers: [
        { text: 'By observing cravings without reacting', isCorrect: true },
        { text: 'By distracting you from thinking about using', isCorrect: false },
        { text: 'By making cravings disappear instantly', isCorrect: false },
        { text: 'By replacing negative thoughts with positive ones', isCorrect: false },
      ],
    },
    {
      question: 'What\'s PAWS in recovery terms?',
      correctMessage: 'Yes! Post-Acute Withdrawal Syndrome - symptoms that last after detox.',
      incorrectMessage: 'Not quite. It\'s Post-Acute Withdrawal Syndrome.',
      answers: [
        { text: 'Post-Acute Withdrawal Syndrome', isCorrect: true },
        { text: 'Positive Attitudes While Sober', isCorrect: false },
        { text: 'Progressive Addiction Warning Signs', isCorrect: false },
        { text: 'Personal Awareness While Struggling', isCorrect: false },
      ],
    },
    {
      question: 'What\'s the purpose of emotional regulation in DBT?',
      correctMessage: 'Exactly! Managing emotions so they don\'t trigger relapse.',
      incorrectMessage: 'Close. It\'s about handling feelings without letting them control you.',
      answers: [
        { text: 'Managing emotions without being controlled', isCorrect: true },
        { text: 'Eliminating all negative emotions', isCorrect: false },
        { text: 'Only focusing on positive feelings', isCorrect: false },
        { text: 'Suppressing emotions until therapy', isCorrect: false },
      ],
    },
    {
      question: 'In CBT, what are cognitive distortions?',
      correctMessage: 'That\'s right! Twisted thinking patterns that aren\'t based on reality.',
      incorrectMessage: 'Not quite. They\'re unhelpful thinking patterns that distort reality.',
      answers: [
        { text: 'Twisted thinking patterns', isCorrect: true },
        { text: 'Memory problems from substance use', isCorrect: false },
        { text: 'Confusion during withdrawal', isCorrect: false },
        { text: 'Difficulty concentrating in therapy', isCorrect: false },
      ],
    },
    {
      question: 'What\'s the difference between enabling and supporting?',
      correctMessage: 'Correct! Enabling protects from consequences, supporting encourages recovery.',
      incorrectMessage: 'Close. Enabling shields from consequences, supporting aids recovery.',
      answers: [
        { text: 'Enabling shields from consequences, supporting aids recovery', isCorrect: true },
        { text: 'They\'re basically the same thing', isCorrect: false },
        { text: 'Enabling is for family, supporting is for friends', isCorrect: false },
        { text: 'Supporting costs money, enabling doesn\'t', isCorrect: false },
      ],
    },
    {
      question: 'Why is identifying your values important in ACT?',
      correctMessage: 'Yes! Values guide your actions toward a meaningful life.',
      incorrectMessage: 'Not quite. Values help guide meaningful action and decisions.',
      answers: [
        { text: 'Guides meaningful actions and decisions', isCorrect: true },
        { text: 'Helps you set strict recovery rules', isCorrect: false },
        { text: 'Shows others how good you are', isCorrect: false },
        { text: 'Replaces all negative thoughts', isCorrect: false },
      ],
    },
    {
      question: 'What\'s progressive muscle relaxation used for in recovery?',
      correctMessage: 'Exactly! Reduces physical tension that can trigger cravings.',
      incorrectMessage: 'Close. It helps manage stress and physical tension.',
      answers: [
        { text: 'Reduces physical tension and stress', isCorrect: true },
        { text: 'Builds muscle strength for fitness', isCorrect: false },
        { text: 'Helps you sleep through withdrawal', isCorrect: false },
        { text: 'Replaces exercise completely', isCorrect: false },
      ],
    },
    {
      question: 'What does "situational confidence" mean in relapse prevention?',
      correctMessage: 'That\'s right! Belief you can handle high-risk situations without using.',
      incorrectMessage: 'Not quite. It\'s confidence in handling triggers without relapsing.',
      answers: [
        { text: 'Confidence handling triggers without using', isCorrect: true },
        { text: 'Being confident in social situations', isCorrect: false },
        { text: 'Always trusting your gut instincts ', isCorrect: false },
        { text: 'Believing you\'re cured from addiction', isCorrect: false },
      ],
    },
  ],
  hard: [
    {
      question:
        'How does cognitive restructuring shut down cravings in CBT?',
      correctMessage:
        'Exactly right! Challenges thoughts saying "one won\'t hurt".',
      incorrectMessage: 'Nearly correct, it challenges irrational beliefs about using.',
      answers: [
        { text: 'Challenges beliefs about using', isCorrect: true },
        {
          text: 'Replaces thoughts with positive affirmations',
          isCorrect: false,
        },
        { text: 'Redirects attention to healthy activities', isCorrect: false },
        { text: 'Reinforces rational thinking patterns', isCorrect: false },
      ],
    },
    {
      question:
        'In ACT, cognitive defusion helps you do what with sticky thoughts?',
      correctMessage: "That's right! See them as just words, not boss orders.",
      incorrectMessage: 'Nearly correct, it unhooks you so thoughts lose power.',
      answers: [
        { text: 'Unhooking from thoughts so they lose power', isCorrect: true },
        { text: 'Fusing them with helpful thoughts', isCorrect: false },
        { text: 'Distancing from all emotions', isCorrect: false },
        { text: 'Temporarily detaching from reality', isCorrect: false },
      ],
    },
    {
      question: 'DBT\'s "opposite action" is proper useful when?',
      correctMessage: 'Legend! When emotions push you toward old habits.',
      incorrectMessage: 'Close, counters unhelpful emotion-driven behaviors.',
      answers: [
        { text: 'Counters emotion-driven bad moves', isCorrect: true },
        { text: 'Balances conflicting emotions', isCorrect: false },
        { text: 'Suppresses negative emotions', isCorrect: false },
        { text: 'Redirects emotional energy', isCorrect: false },
      ],
    },
    {
      question: 'What\'s the abstinence violation effect in relapse prevention?',
      correctMessage: 'Legend! When one slip triggers full relapse thinking.',
      incorrectMessage: 'Close. It\'s the \"all or nothing\" response to a lapse.',
      answers: [
        { text: 'One slip triggers a full relapse mindset', isCorrect: true },
        { text: 'Violating abstinence rules repeatedly', isCorrect: false },
        { text: 'Physical effects of breaking sobriety', isCorrect: false },
        { text: 'Legal consequences of using', isCorrect: false },
      ],
    },
    {
      question: 'How does psychological flexibility in ACT help recovery?',
      correctMessage: 'Exactly! Adapting to situations while staying value-driven.',
      incorrectMessage: 'Not quite. It\'s staying flexible with thoughts while committed to values.',
      answers: [
        { text: 'Adapt to challenges while pursuing values', isCorrect: true },
        { text: 'Being flexible with recovery rules', isCorrect: false },
        { text: 'Changing values to fit situations', isCorrect: false },
        { text: 'Having multiple backup plans', isCorrect: false },
      ],
    },
    {
      question: 'What\'s interpersonal effectiveness in DBT specifically target?',
      correctMessage: 'That\'s right! Getting needs met while keeping relationships and self-respect.',
      incorrectMessage: 'Close. Balancing what you want with relationships and dignity.',
      answers: [
        { text: 'Balance needs, relationships, and self-respect', isCorrect: true },
        { text: 'Making more friends in recovery', isCorrect: false },
        { text: 'Always putting others first', isCorrect: false },
        { text: 'Avoiding all conflict permanently', isCorrect: false },
      ],
    },
    {
      question: 'In CBT relapse prevention, what\'s a high-risk situation analysis?',
      correctMessage: 'Correct! Breaking down triggers to understand and plan responses.',
      incorrectMessage: 'Not quite. It\'s examining trigger scenarios in detail.',
      answers: [
        { text: 'Detailed analysis of trigger scenarios', isCorrect: true },
        { text: 'Avoiding all risky situations', isCorrect: false },
        { text: 'Rating situations by danger level', isCorrect: false },
        { text: 'Emergency planning for crises', isCorrect: false },
      ],
    },
    {
      question: 'What\'s the \"window of tolerance\" in trauma-informed recovery?',
      correctMessage: 'Yes! The zone where you can handle emotions without overwhelm.',
      incorrectMessage: 'Close. It\'s your emotional sweet spot for processing.',
      answers: [
        { text: 'Optimal zone for processing emotions', isCorrect: true },
        { text: 'Time limit for tolerating cravings', isCorrect: false },
        { text: 'How long you can stay sober', isCorrect: false },
        { text: 'Tolerance for frustration in therapy', isCorrect: false },
      ],
    },
    {
      question: 'What does \"double awareness\" mean in mindfulness practice?',
      correctMessage: 'Exactly! Being aware of thoughts while aware you\'re observing them.',
      incorrectMessage: 'Not quite. Simultaneously experiencing and observing your experience.',
      answers: [
        { text: 'Observing experience while aware of observing', isCorrect: true },
        { text: 'Tracking two things at once', isCorrect: false },
        { text: 'Being aware in dreams and waking', isCorrect: false },
        { text: 'Noticing pairs of triggers', isCorrect: false },
      ],
    },
    {
      question: 'In motivational interviewing, what\'s the purpose of \"rolling with resistance\"?',
      correctMessage: 'That\'s right! Not fighting pushback, but exploring it to find motivation.',
      incorrectMessage: 'Close. Accepting resistance rather than challenging it directly.',
      answers: [
        { text: 'Explore resistance instead of fighting it', isCorrect: true },
        { text: 'Being difficult with therapists to get attention', isCorrect: false },
        { text: 'Rolling back treatment when challenged', isCorrect: false },
        { text: 'Moving past difficult topics quickly', isCorrect: false },
      ],
    },
    {
      question: "In SMART, what's the whole point of VACI?",
      correctMessage:
        "Spot on! Vital Absorbing Creative Interests – hobbies that are so boss they actually compete with the urge to use.",
      incorrectMessage:
        "Almost, VACI is about finding proper absorbing hobbies to fill the void.",
      answers: [
        { text: 'Hobbies that compete with using', isCorrect: true },
        { text: 'It\'s very active clinical interventions', isCorrect: false },
        { text: 'Videos explaining Cognitive Imagery', isCorrect: false },
        { text: 'Show the benefits of vacations and comfort incentives', isCorrect: false },
      ],
    },
    {
      question: 'When life is getting way too "peak", which DBT skill helps dial down the physical distress fast?',
      correctMessage:
        'Legend! TIPP (Temperature, Intense exercise, Paced breathing, Paired muscle relaxation) – a total game changer for physical regulation.',
      incorrectMessage:
        "Close, but TIPP is the one for immediate 'stop the madness' body regulation.",
      answers: [
        { text: 'TIPP skills', isCorrect: true },
        { text: 'DEAR MAN', isCorrect: false },
        { text: 'ABC PLEASE', isCorrect: false },
        { text: 'GIVE FAST', isCorrect: false },
      ],
    },
    {
      question: 'In CBT, what are ANTs and why are they dodgy?',
      correctMessage:
        "Exactly! Automatic Negative Thoughts – those sneaky, unhelpful thoughts that crawl in and ruin your vibe without you even notice.",
      incorrectMessage:
        "Nearly correct, ANTs are Automatic Negative Thoughts that mess with your recovery.",
      answers: [
        { text: 'Automatic Negative Thoughts', isCorrect: true },
        { text: 'Addictive Neuroplastic Tendencies', isCorrect: false },
        { text: 'Aggressive Night-time Triggers', isCorrect: false },
        { text: 'Associated Negative Traits', isCorrect: false },
      ],
    },
    {
      question: "ACT talks about the 'Hexaflex' – what on earth is that?",
      correctMessage:
        "Brilliant! It's the six core processes that build psychological flexibility. Proper deep stuff.",
      incorrectMessage: "Almost, it's the six-sided model of psychological flexibility.",
      answers: [
        { text: 'Six core processes of flexibility', isCorrect: true },
        { text: 'A six-step detox program', isCorrect: false },
        { text: 'Six types of addictive personality', isCorrect: false },
        { text: 'A physical stretching routine', isCorrect: false },
      ],
    },
    {
      question: 'If you need to ask for something or say "no" without blowing your cool, which DBT skill is your best mate?',
      correctMessage:
        'Spot on! DEAR MAN helps you get your point across clearly without the beef.',
      incorrectMessage:
        "Nearly. DEAR MAN is the one for interpersonal effectiveness.",
      answers: [
        { text: 'DEAR MAN', isCorrect: true },
        { text: 'STOP skill', isCorrect: false },
        { text: 'PLEASE skill', isCorrect: false },
        { text: 'WISE MIND', isCorrect: false },
      ],
    },
    {
      question: "In SMART, the DISARM tool helps you label 'the voice' as what?",
      correctMessage:
        "Legend! It helps you see the addictive voice as a separate, dodgy salesman trying to sell you a bad deal.",
      incorrectMessage:
        "Nearly correct, it's about seeing the addictive voice as external and untrustworthy.",
      answers: [
        { text: 'A dodgy salesman or enemy', isCorrect: true },
        { text: 'Your true inner self', isCorrect: false },
        { text: 'A logical advisor', isCorrect: false },
        { text: 'A harmless memory', isCorrect: false },
      ],
    },
    {
      question: "In CBT, what's the goal of Socratic Questioning?",
      correctMessage:
        "You got it! It's about asking yourself proper deep questions to see if your dodgy beliefs actually hold any water.",
      incorrectMessage:
        "Almost, it's a way to challenge your own thoughts by looking for evidence.",
      answers: [
        { text: 'Challenge beliefs with evidence', isCorrect: true },
        { text: 'Memorize ancient philosophy', isCorrect: false },
        { text: 'Stop thinking completely', isCorrect: false },
        { text: 'Argue with your therapist', isCorrect: false },
      ],
    },
    {
      question: "ACT mentions the 'Observer Self' – what's the vibe there?",
      correctMessage:
        "Exactly! The part of you that notices thoughts and feelings without getting sucked into the drama.",
      incorrectMessage:
        "Nearly correct, it's the transcendent part of you that observes your own experience.",
      answers: [
        { text: 'The part of you that notices thoughts', isCorrect: true },
        { text: 'Constantly monitoring your heart rate', isCorrect: false },
        { text: 'Watching others for triggers', isCorrect: false },
        { text: 'Judging your own behavior', isCorrect: false },
      ],
    },
    {
      question: "What's 'Dialectic' in DBT?",
      correctMessage:
        "Boss! It's the idea that two opposite things can both be true at once – like accepting yourself while also wanting to change.",
      incorrectMessage:
        "Almost, it's the balance between two opposing truths.",
      answers: [
        { text: 'Two opposing truths co-existing', isCorrect: true },
        { text: 'A type of regional slang', isCorrect: false },
        { text: 'An electronic therapy tool', isCorrect: false },
        { text: 'A strictly logical framework', isCorrect: false },
      ],
    },
    {
      question: "SMART uses the 'Hula Hoop' or 'Circle of Control' to stop you stressing over what?",
      correctMessage:
        "Spot on! It reminds you to only faff about with the stuff inside your hoop (your own moves) and leave the rest alone.",
      incorrectMessage: "Almost, it's about focusing only on what you can actually control.",
      answers: [
        { text: 'Stuff you can\'t actually control', isCorrect: true },
        { text: 'A type of physical fitness exercise', isCorrect: false },
        { text: 'Complex therapy homework', isCorrect: false },
        { text: 'Thinking about eating crisps', isCorrect: false },
      ],
    },
    {
      question: "In CBT, the 'Downward Arrow Technique' is used for what?",
      correctMessage:
        "Legend! It's digging down through surface thoughts to find the proper deep 'core beliefs' that are making you miserable.",
      incorrectMessage:
        "Nearly correct, it's about finding the underlying core beliefs.",
      answers: [
        { text: 'Finding deep core beliefs', isCorrect: true },
        { text: 'Tracking a mood drop', isCorrect: false },
        { text: 'Planning a quick exit', isCorrect: false },
        { text: 'Deprioritizing the important stuff', isCorrect: false },
      ],
    },
    {
      question: "In ACT, 'Expansion' is a way to handle tough physical feelings by...",
      correctMessage:
        "Exactly! Instead of tensing up, you make room for the feeling, proper breathing into it so it doesn't crush you.",
      incorrectMessage:
        "Almost, it's about making space for physical discomfort.",
      answers: [
        { text: 'Making space for discomfort', isCorrect: true },
        { text: 'Opening your lungs when box-breathing', isCorrect: false },
        { text: 'Growing your social circle', isCorrect: false },
        { text: 'Trying to make the feeling bigger', isCorrect: false },
      ],
    },
    {
      question: "What's the 'STOP' skill in DBT used for?",
      correctMessage:
        "Perfect! Stop, Take a step back, Observe, Proceed mindfully. Keeps you from doing something proper daft when you're emotional.",
      incorrectMessage:
        "Nearly correct, it's a four-step process to prevent impulsive actions.",
      answers: [
        { text: 'Preventing impulsive actions', isCorrect: true },
        { text: 'Ending a therapy session', isCorrect: false },
        { text: 'Quitting using immediately', isCorrect: false },
        { text: 'Stopping negative people speaking', isCorrect: false },
      ],
    },
    {
      question: "In SMART, what's a 'Three-way Mirror' used to look at?",
      correctMessage:
        "You got it! Looking at how you see yourself, how others see you, and how you *think* others see you. Proper eye-opener.",
      incorrectMessage:
        "Almost, it explores self-perception and how it differs from reality.",
      answers: [
        { text: 'Self and social perception', isCorrect: true },
        { text: 'Three different relapse triggers', isCorrect: false },
        { text: 'Past, present, and future goals', isCorrect: false },
        { text: 'Physical appearance during recovery', isCorrect: false },
      ],
    },
    {
      question: "CBT's 'Behavioral Activation' is basically...",
      correctMessage:
        "Spot on! Doing stuff even when you don't feel like it, to break the cycle of feeling 'meh' and doing nothing.",
      incorrectMessage:
        "Almost, it's about acting first to change your mood later.",
      answers: [
        { text: 'Acting to change mood', isCorrect: true },
        { text: 'Working out at the gym', isCorrect: false },
        { text: 'Motivating yourself for chores', isCorrect: false },
        { text: 'Going to more meetings', isCorrect: false },
      ],
    },
    {
      question: "In DBT, the 'FAST' skill is part of keeping what?",
      correctMessage:
        "Legend! It's about keeping your self-respect (Fair, Apologies-free, Stick to values, Truthful) while dealing with others.",
      incorrectMessage:
        "Nearly correct, FAST is specifically for maintaining self-respect in interactions.",
      answers: [
        { text: 'Maintain self-respect', isCorrect: true },
        { text: 'Speed up your recovery', isCorrect: false },
        { text: 'Finish chores quickly', isCorrect: false },
        { text: 'Stashing bad thoughts away', isCorrect: false },
      ],
    },
    {
      question: "ACT says 'Goals' are destinations, but 'Values' are...",
      correctMessage:
        "Exactly! A direction or a compass. You never 'arrive' at a value, you just keep living it every day. Proper deep.",
      incorrectMessage: "Almost, values are like directions, not endpoints.",
      answers: [
        { text: 'Directions, not endpoints', isCorrect: true },
        { text: 'Optional suggestions', isCorrect: false },
        { text: 'Specific achievements', isCorrect: false },
        { text: 'Rules you must follow', isCorrect: false },
      ],
    },
    {
      question: "In SMART, the 'Point of Choice' is that split second between...",
      correctMessage:
        "Boom! The moment between an urge hitting and you actually making a move. That's where your power lives.",
      incorrectMessage:
        "Almost, it's the gap between an impulse and an action.",
      answers: [
        { text: 'Impulse and action', isCorrect: true },
        { text: 'Buying and using', isCorrect: false },
        { text: 'Waking up and craving', isCorrect: false },
        { text: 'Meeting and talking', isCorrect: false },
      ],
    },
    {
      question: "In CBT, 'Emotional Reasoning' is the dodgy trap of...",
      correctMessage:
        "Exactly! Thinking that because you *feel* like a failure, you actually *are* one. Feelings aren't facts, mate!",
      incorrectMessage:
        "Nearly correct, it's believing that your feelings represent objective reality.",
      answers: [
        { text: 'Believing feelings are facts', isCorrect: true },
        { text: 'Being too emotional to think', isCorrect: false },
        { text: 'Crying during a breakthrough', isCorrect: false },
        { text: 'Using logic to stop crying', isCorrect: false },
      ],
    },
    {
      question: "What's a 'Chain Analysis' in DBT used to figure out?",
      correctMessage:
        "Spot on! Looking at every tiny link in the chain that led to a bad move, so you can break it next time. No more 'oops, it just happened'.",
      incorrectMessage:
        "Almost, it's a step-by-step breakdown of how a problem behavior occurred.",
      answers: [
        { text: 'Breakdown of problem behavior', isCorrect: true },
        { text: 'Linking your past traumas', isCorrect: false },
        { text: 'Listing your recovery friends who know each other', isCorrect: false },
        { text: 'Tracking your daily routines', isCorrect: false },
      ],
    },
  ],
}

const completionStatus = [
  {
    minScore: 13,
    title: 'Recovery Boss!',
    description: 'You smashed it, legend!  🔥🔥🏆🏆🔥🔥',
  },
  {
    minScore: 10,
    title: 'Solid Performance!',
    description: 'Big up yourself, keep levelling up your game That was 🔥🔥🔥',
  },
  {
    minScore: 6,
    title: 'A Recovery ninja in the making!',
    description: "You're on it, keep pushing! 🙌💪",
  },
  {
    minScore: 0,
    title: 'You\'re on the right path!',
    description: 'Everyone starts somewhere – have another go. A bit more practice and you\'ve got this! 🙌',
  },
]

export default { levels, completionStatus }
