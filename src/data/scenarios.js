const scenarios = [

    {
        id: 'cG9zdDo5NA==',
        databaseId: 94,
        title: 'Sudden Urge to Quit Your Job',
        scenariosFieldGroup: {
            description:
                '<p><b>Wait:</b><br />Don&#8217;t storm into your boss&#8217;s office after a bad meeting.</p>\n<p><b>Assess:</b><br />You&#8217;re frustrated with work but also stressed about money.</p>\n<p><b>Identify:</b><br />This is anger and exhaustion talking, your options include talking to HR, looking for new jobs, or addressing specific issues.</p>\n<p><b>Take:</b><br />Schedule a conversation with your supervisor for next week to discuss concerns professionally.</p>\n',
            buttonLabel: 'Sudden Urge to Quit Your Job',
        },
    },
    {
        id: 'cG9zdDo5Mw==',
        databaseId: 93,
        title: 'Angry Text Message',
        scenariosFieldGroup: {
            description:
                '<p><b>Wait:</b><br />Don&#8217;t respond immediately to your ex&#8217;s nasty text.</p>\n<p><b>Assess:</b><br />You&#8217;re hurt and angry, but also in a good place in your recovery.</p>\n<p><b>Identify:</b><br />This is a trigger situation, you have options like blocking them or talking to your sponsor.</p>\n<p><b>Take:</b><br />Delete the mean response you typed and call your support person instead.</p>\n',
            buttonLabel: 'Angry Text Message',
        },
    },
    {
        id: 'cG9zdDo5Mg==',
        databaseId: 92,
        title: 'Comparing Yourself to Others',
        scenariosFieldGroup: {
            description:
                '<p><b>Unconditional:</b><br />Your value isn&#8217;t determined by how you stack up against others.</p>\n<p><b>Self:</b><br />Focus on your whole journey, not just where you are right now.</p>\n<p><b>Acceptance:</b><br />Embrace your current progress while working <u>toward your goals without self-criticism.</u></p>\n',
            buttonLabel: 'Comparing Yourself to Others',
        },
    },
    {
        id: 'cG9zdDo5MQ==',
        databaseId: 91,
        title: 'After a Relapse',
        scenariosFieldGroup: {
            description:
                '<p><b>Unconditional:</b><br />Your worth doesn&#8217;t decrease because you used again.</p>\n<p><b>Self:</b><br />You&#8217;re a complex person dealing with a difficult challenge, not just &#8216;an addict.&#8217;</p>\n<p><b>Acceptance:</b><br />Accept that you slipped while still believing <u>you can get back on track.</u></p>\n',
            buttonLabel: 'Unconditional Self Acceptance',
        },
    },
    {
        id: 'cG9zdDo5MA==',
        databaseId: 90,
        title: 'Shopping Addiction Urges',
        scenariosFieldGroup: {
            description:
                '<p><b>Unwanted:</b><br />Acknowledge the urge to buy things you don&#8217;t need is part of the addiction.</p>\n<p><b>Reduce:</b><br />Uninstall shopping apps, make a list before going to stores, bring limited cash.</p>\n<p><b>Gradually:</b><br />Practice sitting with the discomfort of wanting something.</p>\n<p><b>Eliminate:</b><br />Find that shopping urges rarely occur.</p>\n',
            buttonLabel: 'Control Impulses',
        },
    },
    {
        id: 'cG9zdDo4OQ==',
        databaseId: 89,
        title: 'Cigarette Cravings',
        scenariosFieldGroup: {
            description:
                '<p><b>Unwanted:</b><br />Accept that nicotine cravings are normal and temporary.</p>\n<p><b>Reduce:</b><br />Use breathing exercises, chew gum, take a walk.</p>\n<p><b>Gradually:</b><br />Notice cravings becoming less frequent over weeks.</p>\n<p><b>Eliminate:</b><br />Eventually go days, then weeks without thinking about smoking.</p>\n',
            buttonLabel: 'Reduce Urges',
        },
    },
    {
        id: 'cG9zdDo4OA==',
        databaseId: 88,
        title: 'Stress ahead? Take the recovery detour.',
        scenariosFieldGroup: {
            description:
                '<p>Work stress hits hard, and in the past you’d cope by drinking or using.</p>\n<p><b>Proper →</b><br />Admit stress is a trigger.</p>\n<p><b>Preparation →</b><br />Practice breathing exercises or list healthy activities.</p>\n<p><b>Planning →</b><br />Set reminders to take breaks.</p>\n<p><b>Prevents →</b><br />Stops pressure building to relapse.</p>\n<p><b>Poor →</b><br />Without a plan, stress pushes you off the road.</p>\n<p><b>Performance →</b><br />You use healthy coping tools instead of falling back.</p>\n',
            buttonLabel: 'The Stress Detour',
        },
    },
    {
        id: 'cG9zdDo4Nw==',
        databaseId: 87,
        title: 'Plan the night, don’t fight the night.',
        scenariosFieldGroup: {
            description:
                '<p>You usually met friends at the pub on Fridays, but now you’re focusing on recovery.</p>\n<p><b>Proper → Be honest:</b><br />Pubs are a high-risk place right now.</p>\n<p><b>Preparation →</b><br />Have alcohol-free drinks stocked at home and line up a safe activity.</p>\n<p><b>Planning →</b><br />Tell your friends ahead you won’t be joining at the pub.</p>\n<p><b>Prevents →</b><br />Stops you from getting caught off-guard.</p>\n<p><b>Poor →</b><br />If you don’t think ahead, you might end up at the pub “just for one.”</p>\n<p><b>Performance →</b><br />You stick to your plan, avoid cravings, and still enjoy Friday night.</p>\n',
            buttonLabel: 'Plan to Cope',
        },
    },
    {
        id: 'cG9zdDo4Ng==',
        databaseId: 86,
        title: 'Road Rage',
        scenariosFieldGroup: {
            description:
                '<p>About to lose it in traffic → crank AC on face (T), do push-ups on the steering wheel (I), box breathe at the red light (P). Arrive less murderous.</p>\n',
            buttonLabel: 'Survive the Moment',
        },
    },
    {
        id: 'cG9zdDo4NQ==',
        databaseId: 85,
        title: 'Panic Attack at Work',
        scenariosFieldGroup: {
            description:
                '<p>Heart racing → run to bathroom, dunk face in cold water (T), do 20 jumping jacks (I), then 4-7-8 breathing (P). Back to meeting in 90 seconds calmer.</p>\n',
            buttonLabel: 'Cool Down Fast',
        },
    },
    {
        id: 'cG9zdDo4NA==',
        databaseId: 84,
        title: 'Work Performance Worry',
        scenariosFieldGroup: {
            description:
                '<p><b>Thoughts:</b><br />&#8216;I&#8217;m going to get fired.&#8217;</p>\n<p><b>Assumptions:</b><br />One mistake means you&#8217;re incompetent.</p>\n<p><b>Predictions:</b><br />Your boss will call you in for a termination meeting.</p>\n<p><b>Evaluations:</b><br />You&#8217;re catastrophizing &#8211; most people make mistakes and keep their jobs.</p>\n',
            buttonLabel: 'Fact Check',
        },
    },
    {
        id: 'cG9zdDo4Mw==',
        databaseId: 83,
        title: 'Social Anxiety at a Party',
        scenariosFieldGroup: {
            description:
                '<p><b>Thoughts:</b><br />&#8216;Everyone thinks I&#8217;m weird.&#8217;</p>\n<p><b>Assumptions:</b><br />People are paying attention to and judging you.</p>\n<p><b>Predictions:</b><br />You&#8217;ll embarrass yourself and everyone will remember.</p>\n<p><b>Evaluations:</b><br />You&#8217;re being the worst critic of yourself &#8211; would you judge others this harshly?</p>\n',
            buttonLabel: 'Check Reality',
        },
    },
    {
        id: 'cG9zdDo4Mg==',
        databaseId: 82,
        title: 'Argument Escalating',
        scenariosFieldGroup: {
            description: '<p>Voice rising → S.T.O.P.<br />Pause, breathe, notice you’re flooded, say “I need a minute” and step outside. Saves relationships.</p>\n',
            buttonLabel: 'Save the Fight',
        },
    },
    {
        id: 'cG9zdDo4MQ==',
        databaseId: 81,
        title: 'About to Relapse',
        scenariosFieldGroup: {
            description:
                '<p>Hand reaching for the bottle → S.T.O.P.<br />Stop moving, take a breath, notice the urge in your chest, remember why you quit… then call someone instead.</p>\n',
            buttonLabel: 'Pause Power',
        },
    },
    {
        id: 'cG9zdDo4MA==',
        databaseId: 80,
        title: 'Improving Sleep Habits',
        scenariosFieldGroup: {
            description:
                '<p><b>Specific:</b><br />Be in bed by 10:30 PM with no screens.</p>\n<p><b>Measurable:</b><br />Track bedtime and sleep quality.</p>\n<p><b>Achievable:</b><br />Start with weeknights first.</p>\n<p><b>Relevant:</b><br />Better sleep improves mood and decision-making.</p>\n<p><b>Time-bound:</b><br />Establish routine within 2 weeks.</p>\n',
            buttonLabel: 'Plan Success',
        },
    },
    {
        id: 'cG9zdDo3OQ==',
        databaseId: 79,
        title: 'Getting Back Into Exercise',
        scenariosFieldGroup: {
            description:
                '<p><b>Specific:</b><br />Walk for 30 minutes.</p>\n<p><b>Measurable:</b><br />Track walks on phone app.</p>\n<p><b>Achievable:</b><br />Start with 3 times per week, not daily.</p>\n<p><b>Relevant:</b><br />Exercise helps with mood and energy in recovery.</p>\n<p><b>Time-bound:</b><br />Build this habit over the next 4 weeks.</p>\n',
            buttonLabel: 'Set SMART Goals',
        },
    },
    {
        id: 'cG9zdDo3OA==',
        databaseId: 78,
        title: 'Relationship Conflict',
        scenariosFieldGroup: {
            description:
                '<p><b>Rational:</b><br />This argument doesn&#8217;t mean the relationship is over.</p>\n<p><b>Emotional:</b><br />You&#8217;re hurt and that&#8217;s valid, but don&#8217;t make permanent decisions from temporary emotions.</p>\n<p><b>Imagery:</b><br />Picture having <u>a calm conversation where you both listen</u> and <u>work together to solve the problem.</u></p>\n',
            buttonLabel: 'Think & Feel',
        },
    },
    {
        id: 'cG9zdDo3Nw==',
        databaseId: 77,
        title: 'Job Interview Anxiety',
        scenariosFieldGroup: {
            description:
                '<p><b>Rational:</b><br />You&#8217;re qualified and have prepared well.</p>\n<p><b>Emotional:</b><br />It&#8217;s normal to feel nervous about important things.</p>\n<p><b>Imagery:</b><br />Visualize yourself speaking confidently, connecting with the interviewer, and <u>walking out feeling proud regardless of the outcome.</u></p>\n',
            buttonLabel: 'Balance & Visualize',
        },
    },
    {
        id: 'cG9zdDo3Ng==',
        databaseId: 76,
        title: 'Facing a Major Life Change',
        scenariosFieldGroup: {
            description:
                '<p><b>Recovery:</b><br />Remember that major transitions are high-risk times.</p>\n<p><b>Awareness:</b><br />Monitor your stress levels during the move/job change/breakup.</p>\n<p><b>Vigilance:</b><br />Watch for isolation, sleep problems, or negative thinking.</p>\n<p><b>Empowerment:</b><br />Use your support system and coping tools confidently.</p>\n',
            buttonLabel: 'Navigate Change',
        },
    },
    {
        id: 'cG9zdDo3NQ==',
        databaseId: 75,
        title: 'Two Years Into Recovery',
        scenariosFieldGroup: {
            description:
                '<p><b>Recovery:</b><br />Still attend weekly support meetings even though life is stable.</p>\n<p><b>Awareness:</b><br />Notice when work stress builds up before it becomes overwhelming.</p>\n<p><b>Vigilance:</b><br />Recognize old thinking patterns creeping back.</p>\n<p><b>Empowerment:</b><br />Trust your ability to handle challenges without using.</p>\n',
            buttonLabel: 'Stay Strong',
        },
    },
    {
        id: 'cG9zdDo3NA==',
        databaseId: 74,
        title: 'Intense Craving',
        scenariosFieldGroup: {
            description:
                '<p><b>R:</b> Craving for [substance].<br /><b>A:</b> Let it be here.<br /><b>I:</b> Feel it in stomach and hands.<br /><b>N:</b> “This is hard, and I’m doing hard things. I’ve got you.”</p>\n',
            buttonLabel: 'Ride the Wave',
        },
    },
    {
        id: 'cG9zdDo3Mw==',
        databaseId: 73,
        title: 'Shame After a Slip',
        scenariosFieldGroup: {
            description:
                '<p><b>Recognize:</b> Shame wave.<br /><b>Allow:</b> Okay, it’s here.<br /><b>Investigate:</b> Tight chest, hot face.<br /><b>Nurture:</b> Hand on heart, “It’s okay, you’re human, we’re getting back up.”</p>\n',
            buttonLabel: 'Be Kind to Yourself',
        },
    },
    {
        id: 'cG9zdDo3Mg==',
        databaseId: 72,
        title: 'Learning New Coping Skills',
        scenariosFieldGroup: {
            description:
                '<p><b>Practice:</b><br />Use breathing exercises daily, not just during panic attacks.</p>\n<p><b>Patience:</b><br />Accept that it took months to feel natural instead of forced.</p>\n<p><b>Persistence:</b><br />Continue even when the old habits seem easier and faster.</p>\n',
            buttonLabel: 'Keep Practicing',
        },
    },
    {
        id: 'cG9zdDo3MQ==',
        databaseId: 71,
        title: 'Daily Recovery Routine',
        scenariosFieldGroup: {
            description:
                '<p><b>Practice:</b><br />Meditate for 10 minutes every morning, even when you feel good.</p>\n<p><b>Patience:</b><br />Some days meditation feels pointless, but you trust the process.</p>\n<p><b>Persistence:</b><br />Keep the routine going even during busy or stressful weeks.</p>\n',
            buttonLabel: 'Stick With It',
        },
    },
    {
        id: 'cG9zdDo3MA==',
        databaseId: 70,
        title: 'Handled Stress Without Old Habits',
        scenariosFieldGroup: {
            description:
                '<p><b>Progress:</b><br />Used coping skills during a tough week at work.</p>\n<p><b>Insight:</b><br />Understanding that your anxiety spikes on Sundays because of work dread.</p>\n<p><b>Empowerment:</b><br />Planning Sunday self-care routines to manage the anxiety proactively.</p>\n',
            buttonLabel: 'Celebrate Wins',
        },
    },
    {
        id: 'cG9zdDo2OQ==',
        databaseId: 69,
        title: 'Three Months Clean',
        scenariosFieldGroup: {
            description:
                '<p><b>Progress:</b><br />Ninety days without using, better sleep, improved relationships.</p>\n<p><b>Insight:</b><br />Realizing you used to cope with boredom and loneliness.</p>\n<p><b>Empowerment:</b><br />Choosing healthy activities and reaching out to friends instead of isolating.</p>\n',
            buttonLabel: 'Track Growth',
        },
    },
    {
        id: 'cG9zdDo2OA==',
        databaseId: 68,
        title: 'Technology Not Working',
        scenariosFieldGroup: {
            description:
                '<p>Computer keeps crashing while you&#8217;re trying to work.</p>\n<p><b>Notice you&#8217;re at your limit</b>,<br /><b>acknowledge the frustration is valid</b>,<br /><b>take breaks between attempts instead of getting more angry.</b></p>\n<p>Learning to tolerate technical difficulties.</p \n\n\n</p>\n',
            buttonLabel: 'Build Tolerance',
        },
    },
    {
        id: 'cG9zdDo2Nw==',
        databaseId: 67,
        title: 'Traffic Jam Meltdown',
        scenariosFieldGroup: {
            description:
                '<p>Stuck in traffic,<br />running late,<br />patience is gone.</p>\n<p>Recognize your <u>low frustration tolerance</u>,<br /><u>accept that this sucks but isn&#8217;t dangerous</u>,<br /><u>practice breathing instead of road rage.</u></p>\n<p>Build tolerance for things outside your control.</p>\n',
            buttonLabel: 'Stay Cool',
        },
    },
    {
        id: 'cG9zdDo2Ng==',
        databaseId: 66,
        title: 'Social Media Comparison',
        scenariosFieldGroup: {
            description:
                '<p><b>Identify:</b><br />Scrolling Instagram makes you feel inadequate.</p>\n<p><b>Challenge:</b><br />Are these highlight reels an accurate picture of reality?</p>\n<p><b>Eliminate:</b><br />Replace mindless scrolling with calling a real friend or going for a walk.</p>\n',
            buttonLabel: 'Challenge & Change',
        },
    },
    {
        id: 'cG9zdDo2NQ==',
        databaseId: 65,
        title: 'People-Pleasing Pattern',
        scenariosFieldGroup: {
            description:
                '<p><b>Identify:</b><br />You always say yes even when overwhelmed.</p>\n<p><b>Challenge:</b><br />Is saying yes really helping anyone if you&#8217;re burnt out and resentful?</p>\n<p><b>Eliminate:</b><br />Replace automatic &#8216;yes&#8217; with &#8216;Let me check my schedule and get back to you.&#8217;</p>\n',
            buttonLabel: 'Break the Pattern',
        },
    },
    {
        id: 'cG9zdDo2NA==',
        databaseId: 64,
        title: 'Friend Wants You to Skip Therapy',
        scenariosFieldGroup: {
            description:
                '<p>Friend wants to hang out during your therapy session.</p>\n<p><b>Your values hierarchy:</b></p>\n<p><u>Mental health</u>,<br /><u>Authentic relationships</u>,<br /><u>Fun/socializing</u>.</p>\n<p>Explain that <b>therapy is non-negotiable</b> and suggest meeting afterward.</p>\n',
            buttonLabel: 'Rank Priorities',
        },
    },
    {
        id: 'cG9zdDo2Mw==',
        databaseId: 63,
        title: 'Career vs. Family Time Decision',
        scenariosFieldGroup: {
            description:
                '<p>Your job offers overtime but the kids have a recital.</p>\n<p><b>Your hierarchy:</b></p>\n<p><u>Family relationships</u>,<br /><u>personal health</u>,<br /><u>financial stability</u>,<br /><u>career advancement</u>.</p>\n<p><u>Since family tops your list</u>, the choice becomes clear &#8211; <u>attend the recital.</u></p>\n',
            buttonLabel: 'Choose Values',
        },
    },
    {
        id: 'cG9zdDo2Mg==',
        databaseId: 62,
        title: 'Lost Sense of Direction',
        scenariosFieldGroup: {
            description:
                '<p>Help a neighbor with groceries <u>(Helping)</u>,<br />reach out to old friends you trust <u>(Others)</u>,<br />explore going back to school <u>(Purpose)</u>,<br />acknowledge you&#8217;ve been handling stress better lately <u>(Esteem)</u>.</p>\n<p><b>Small steps toward a meaningful life.</b></p>\n',
            buttonLabel: 'Find Direction',
        },
    },
    {
        id: 'cG9zdDo1OQ==',
        databaseId: 59,
        title: 'Feeling Hopeless and Isolated',
        scenariosFieldGroup: {
            description:
                '<p>Volunteer at a local food bank <u>(Helping)</u>,<br />join a recovery support group <u>(Others)</u>,<br />remember your goal of being present for your kids <u>(Purpose)</u>,<br />celebrate 30 days clean <u>(Esteem)</u>.</p>\n<p>Each action builds on the others <b>to create genuine hope.</b></p>\n',
            buttonLabel: 'Build Hope',
        },
    },
    {
        id: 'cG9zdDo1OA==',
        databaseId: 58,
        title: 'Weekend Relapse Risk',
        scenariosFieldGroup: {
            description:
                '<p>Saturday evening and you&#8217;re thinking about using.</p>\n<p><b>Check:</b></p>\n<p>Skipped meals while running errands <u>(Hungry)</u>,<br />\nargument with family <u>(Angry)</u>,<br />\nfriends are all busy <u>(Lonely)</u>,<br />\nstayed up too late binge-watching <u>(Tired)</u>.</p>\n<p>Address each need before the craving gets stronger.</p>\n',
            buttonLabel: 'Address Needs',
        },
    },
    {
        id: 'cG9zdDo1Nw==',
        databaseId: 57,
        title: 'Afternoon Craving Attack',
        scenariosFieldGroup: {
            description:
                '<p>You&#8217;re suddenly craving your old habit at 3 PM.</p>\n<p><b>Check:</b></p>\n<p>Haven&#8217;t eaten since breakfast <u>(Hungry)</u>,<br />\nfrustrated with work project <u>(Angry)</u>,<br />\nbeen alone all day <u>(Lonely)</u>,<br />\nonly got 4 hours sleep <u>(Tired)</u>.</p>\n<p><b>Solution:</b></p>\n<p>Eat a healthy snack, take a walk, call a friend, plan an early bedtime.</p>\n',
            buttonLabel: 'Check HALT',
        },
    },
    {
        id: 'cG9zdDo1Ng==',
        databaseId: 56,
        title: 'Relapse Anxiety',
        scenariosFieldGroup: {
            description: '<p>“If I feel this bad again I’ll definitely use.” Fear talking. Most people who feel bad… just feel bad for a bit and then feel better.</p>\n',
            buttonLabel: 'Call Its Bluff',
        },
    },
    {
        id: 'cG9zdDo1NQ==',
        databaseId: 55,
        title: 'First Meeting Jitters',
        scenariosFieldGroup: {
            description:
                '<p>You’re terrified to walk into your first recovery meeting. Brain says “everyone will judge me.” That’s False Evidence Appearing Real. You go anyway and people hug you.</p>\n',
            buttonLabel: 'Face the Fear',
        },
    },
    {
        id: 'cG9zdDo1NA==',
        databaseId: 54,
        title: 'Negative Self-Talk Spiral',
        scenariosFieldGroup: {
            description:
                '<p>Inner voice says <u>&#8216;You&#8217;ll never change, why even try?&#8217;</u></p>\n<p>Catch this destructive self-talk, recognize the familiar pattern, refuse to argue with it, and replace it with <u>&#8216;I&#8217;m learning and growing every day.&#8217;</u></p>\n',
            buttonLabel: 'Silence the Critic',
        },
    },
    {
        id: 'cG9zdDo1Mw==',
        databaseId: 53,
        title: 'Gambling Urge Imagery',
        scenariosFieldGroup: {
            description:
                '<p><b>You start visualizing winning big at the casino.</b></p>\n<p><b>Recognize this as destructive imagery</b>, <u>become aware of the pattern</u>, <b>refuse to engage with the fantasy</b>, and <u>replace it with images of financial stability and peace of mind.</u></p>\n',
            buttonLabel: 'Block the Fantasy',
        },
    },
    {
        id: 'cG9zdDo1Mg==',
        databaseId: 52,
        title: 'Wanting to Text an Ex',
        scenariosFieldGroup: {
            description:
                '<p><b>Delay:</b><br />\n&#8216;I&#8217;ll wait until tomorrow.&#8217;</p>\n<p><b>Escape:</b><br />\nLeave your phone in another room.</p>\n<p><b>Avoid:</b><br />\nDelete their number (again).</p>\n<p><b>Distract:</b><br />\nCall a friend or watch funny videos.</p>\n<p><b>Substitute:</b><br />\nWrite in a journal instead.</p>\n',
            buttonLabel: 'Resist the Urge',
        },
    },
    {
        id: 'cG9zdDo1MQ==',
        databaseId: 51,
        title: 'Craving Alcohol at a Party',
        scenariosFieldGroup: {
            description:
                '<p><b>Delay:</b><br />\n&#8216;I&#8217;ll wait 15 minutes first.&#8217;</p>\n<p><b>Escape:</b><br />\nStep outside or go to the bathroom.</p>\n<p><b>Accept:</b><br />\n&#8216;This urge will pass.&#8217;</p>\n<p><b>Distract:</b><br />\nStart a conversation with someone new.</p>\n<p><b>Substitute:</b><br />\nGrab a mocktail or soda instead.</p>\n',
            buttonLabel: 'Beat the Craving',
        },
    },
    {
        id: 'cG9zdDo1MA==',
        databaseId: 50,
        title: 'Avoiding Difficult Conversations',
        scenariosFieldGroup: {
            description:
                '<p><b>Cost:</b><br />Unresolved conflicts, built-up resentment, damaged relationships.</p>\n<p><b>Benefit:</b><br />Temporary peace, avoiding confrontation.</p>\n<p><b>Analysis:</b><br />The temporary comfort is creating bigger problems that will be harder to solve later.</p>\n',
            buttonLabel: 'Face the Truth',
        },
    },
    {
        id: 'cG9zdDo0OQ==',
        databaseId: 49,
        title: 'Binge Watching vs. Sleep',
        scenariosFieldGroup: {
            description:
                '<p><b>Cost:</b><br />Exhaustion, poor work performance, health issues.</p>\n<p><b>Benefit:</b><br />Temporary escape, entertainment.</p>\n<p><b>Analysis:</b><br />The short-term comfort isn&#8217;t worth the long-term consequences to your wellbeing.</p>\n',
            buttonLabel: 'Weigh It Out',
        },
    },
    {
        id: 'cG9zdDo0OA==',
        databaseId: 48,
        title: 'Work Stress Triggering a Relapse Urge',
        scenariosFieldGroup: {
            description:
                '<p>Emma, recovering from gambling, feels the urge to gamble after a very stressful day at work.</p>\n<p><b>Using B.A.D.S.:</b></p>\n<p>She recognises <u>her urge is linked to being stressed, not a genuine desire to gamble.</u></p>\n<p>She <u>calls a friend and practices some breathing exercises</u> instead.</p>\n',
            buttonLabel: 'Work Stress Triggering',
        },
    },
    {
        id: 'cG9zdDo0Nw==',
        databaseId: 47,
        title: 'Evening Cravings from Boredom',
        scenariosFieldGroup: {
            description:
                '<p>John is early in recovery from alcohol use. He notices strong cravings most evenings when he has nothing to do.</p>\n<p><b>Using B.A.D.S.:</b></p>\n<p>He identifies he&#8217;s not actually thirsty for alcohol — he’s <u>bored.</u></p>\n<p><u>Instead of drinking</u>, he chooses to <u>go for a walk and listen to a podcast, which keeps him engaged</u> until bedtime.</p>\n',
            buttonLabel: 'Evening Cravings',
        },
    },
    {
        id: 'cG9zdDo0Ng==',
        databaseId: 46,
        title: 'Overwhelmed by Anxiety',
        scenariosFieldGroup: {
            description:
                '<p><b>Accept:</b> Anxiety is loud tonight, that’s allowed.<br />\n<b>Choose:</b> Being a calm parent/friend matters more than feeling perfect.<br />\n<b>Take action:</b> Use the 4-7-8 breathing and stay with the family instead of isolating.</p>\n',
            buttonLabel: 'Move Forward Anyway',
        },
    },
    {
        id: 'cG9zdDo0NQ==',
        databaseId: 45,
        title: 'Craving Hits at Night',
        scenariosFieldGroup: {
            description:
                '<p><b>Accept:</b> Yep, the urge is here. It sucks.<br />\n<b>Choose:</b> I want to wake up proud tomorrow.<br />\n<b>Take action:</b> Put the phone in another room and do 10 push-ups instead.</p>\n',
            buttonLabel: 'Commit to Values',
        },
    },
    {
        id: 'cG9zdDo0NA==',
        databaseId: 44,
        title: 'Friend Didn’t Text Back',
        scenariosFieldGroup: {
            description:
                '<p>Your friend hasn&#8217;t responded to your message</p>\n<p>Rather than assuming they&#8217;re mad at you <b>(old belief)</b>, you consider they might be busy or dealing with their own stuff <b>(new belief)</b>.</p>\n',
            buttonLabel: 'Question Assumptions',
        },
    },
    {
        id: 'cG9zdDo0Mw==',
        databaseId: 43,
        title: 'Job Interview Rejection',
        scenariosFieldGroup: {
            description:
                '<p>You didn&#8217;t get a job you really wanted.</p>\n<p>Instead of thinking &#8216;I&#8217;m not good enough&#8217; <b>(old belief)</b>, you recognize that one rejection doesn&#8217;t define your worth and there could be many factors involved <b>(new belief)</b>.</p>\n',
            buttonLabel: 'Reframe Rejection',
        },
    },

]
export default scenarios