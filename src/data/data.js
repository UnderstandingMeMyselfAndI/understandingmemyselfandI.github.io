const data = [
	{
		id: 1,
		title: 'A.B.C.D.E',
		content: {
			acronyms: [
				{
					letter: 'A',
					meaning: 'Activating event or trigger',
					definition:
						'What actually happened? This is the specific situation or event that got your wheels turning',
					scenario: '',
				},
				{
					letter: 'B',
					meaning: 'Belief',
					definition:
						'What story are you telling yourself about what happened? These are your thoughts and interpretations',
					scenario: '',
				},
				{
					letter: 'C',
					meaning: 'Consequence',
					definition:
						'How did those thoughts make you feel and act? This is where your emotions and behaviors show up',
					scenario: '',
				},
				{
					letter: 'D',
					meaning: 'Dispute',
					definition:
						'Time to play detective with your own thoughts - are they really true and helpful?',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Effective new belief',
					definition:
						'Create a healthier, more realistic way of thinking about the situation',
					scenario: '',
				},
			],
			explanation:
				'Your personal toolkit for catching those sneaky negative thoughts and turning them around using proven therapy techniques.',
		},
		scenarios: [
			{
				title: 'Job Interview Rejection',
				content:
					"You didn't get a job you really wanted.<br /><br /> Instead of thinking 'I'm not good enough' <b>(old belief)</b>, you recognize that one rejection doesn't define your worth and there could be many factors involved <b>(new belief)</b>.",
				btnLabel: 'Reframe Rejection',
			},
			{
				title: "Friend Didn't Text Back",
				content:
					"Your friend hasn't responded to your message.<br /><br />Rather than assuming they're mad at you <b>(old belief)</b>, you consider they might be busy or dealing with their own stuff <b>(new belief)</b>.",
				btnLabel: 'Question Assumptions',
			},
		],
	},
	{
		id: 2,
		title: 'C.B.A.',
		content: {
			acronyms: [
				{
					letter: 'C',
					meaning: 'Cost',
					definition:
						"What's this behavior really costing you?<br /><br /> Think beyond money - your relationships, health, self-respect",
					scenario: '',
				},
				{
					letter: 'B',
					meaning: 'Benefit',
					definition:
						'Be honest - what are you getting out of this behavior?<br /><br /> There must be something, right?',
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Analysis',
					definition:
						'Put it all on the table and see which side weighs more - is it worth it?',
					scenario: '',
				},
			],
			explanation:
				'Your personal pro/con list that cuts through the BS - helping you see if a behavior is actually serving you or just feels like it is.',
		},
		scenarios: [
			{
				title: 'Binge Watching vs. Sleep',
				content:
					"<b>Cost:</b> <br /> Exhaustion, poor work performance, health issues.<br /> <br />  <b>Benefit:</b><br />  Temporary escape, entertainment.<br /> <br />  <b>Analysis:</b> <br /> The short-term comfort isn't worth the long-term consequences to your wellbeing.",
				btnLabel: 'Weigh It Out',
			},
			{
				title: 'Avoiding Difficult Conversations',
				content:
					'<b>Cost:</b><br />  Unresolved conflicts, built-up resentment, damaged relationships.<br /> <br />  <b>Benefit:</b><br />  Temporary peace, avoiding confrontation. <br /> <br /> <b>Analysis:</b><br />  The temporary comfort is creating bigger problems that will be harder to solve later.',
				btnLabel: 'Face the Truth',
			},
		],
	},
	{
		id: 3,
		title: 'D.E.A.D.S.',
		content: {
			acronyms: [
				{
					letter: 'D',
					meaning: 'Deny or Delay',
					definition:
						'Just say <u>"not right now"</u> - you don\'t have to give in immediately.<br /><br /> Urges have expiration dates',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Escape',
					definition:
						'<u>Change your scenery!</u><br /><br /> Sometimes the best thing you can do is physically remove yourself from temptation',
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Avoid / Accept / Attack',
					definition:
						'<u>Pick your battle strategy:</u><br /><br /> dodge the trigger, accept the feeling will pass, or tackle it head-on',
					scenario: '',
				},
				{
					letter: 'D',
					meaning: 'Distract',
					definition:
						'Redirect that mental energy somewhere else - <b><u>call someone</u>, <u>go for a walk</u>, <u>binge a show</u></b>',
					scenario: '',
				},
				{
					letter: 'S',
					meaning: 'Substitute',
					definition:
						'Swap out the harmful habit for something that actually <b>makes you feel good about yourself</b>',
					scenario: '',
				},
			],
			explanation:
				"Five solid moves you can make when cravings hit - because you've got options, and <b><u>every craving eventually fades.</u></b>",
		},
		scenarios: [
			{
				title: 'Craving Alcohol at a Party',
				content:
					"<b>Delay:</b><br />  'I'll wait 15 minutes first.'<br /> <br />  <b>Escape:</b><br />  Step outside or go to the bathroom.<br /> <br />  <b>Accept:</b><br />  'This urge will pass.'<br /> <br />  <b>Distract:</b><br />  Start a conversation with someone new.<br /> <br />  <b>Substitute:</b><br />  Grab a mocktail or soda instead.",
				btnLabel: 'Beat the Craving',
			},
			{
				title: 'Wanting to Text an Ex',
				content:
					"<b>Delay:</b><br />  'I'll wait until tomorrow.'<br /> <br />  <b>Escape:</b><br /> Leave your phone in another room.<br /> <br />  <b>Avoid:</b> <br /> Delete their number (again).<br /> <br />  <b>Distract:</b> <br /> Call a friend or watch funny videos. <br /> <br /> <b>Substitute:</b><br />  Write in a journal instead.<br /> <br /> ",
				btnLabel: 'Resist the Urge',
			},
		],
	},
	{
		id: 4,
		title: 'D.I.S.A.R.M.',
		content: {
			acronyms: [
				{
					letter: 'D',
					meaning: 'Destructive',
					definition:
						'Notice when your brain is feeding you garbage thoughts and mental images',
					scenario: '',
				},
				{
					letter: 'I',
					meaning: 'Imagery',
					definition:
						"Catch those vivid mental movies that make you want to use - they're not real predictions",
					scenario: '',
				},
				{
					letter: 'S',
					meaning: 'Self-talk',
					definition:
						"What's that inner voice telling you? If it's being a jerk, it's time to change the conversation",
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Awareness',
					definition:
						"Wake up to these patterns - you can't change what you don't notice",
					scenario: '',
				},
				{
					letter: 'R',
					meaning: 'Refusal',
					definition:
						'Tell those toxic thoughts "thanks but no thanks" - you don\'t have to engage',
					scenario: '',
				},
				{
					letter: 'M',
					meaning: 'Method',
					definition:
						'Have a game plan ready to replace the junk thoughts with something better',
					scenario: '',
				},
			],
			explanation:
				'Your mental bodyguard system - protecting you from the thoughts and images that try to sabotage your progress.',
		},
		scenarios: [
			{
				title: 'Gambling Urge Imagery',
				content:
					'<b>You start visualizing winning big at the casino.</b> <br /> <br /><b>Recognize this as destructive imagery</b>,<br /> <u>become aware of the pattern</u>,<br /> <b>refuse to engage with the fantasy</b>,<br /><br /> and <u>replace it with images of financial stability <br />and peace of mind.</u>',
				btnLabel: 'Block the Fantasy',
			},
			{
				title: 'Negative Self-Talk Spiral',
				content:
					"Inner voice says <u>'You'll never change, why even try?</u>'<br /><br /> Catch this destructive self-talk, recognize the familiar pattern, refuse to argue with it, and replace it with <u>'I'm learning and growing every day.'</u>",
				btnLabel: 'Silence the Critic',
			},
		],
	},
	{
		id: 5,
		title: 'H.A.L.T.',
		content: {
			acronyms: [
				{
					letter: 'H',
					meaning: 'Hungry',
					definition:
						'When did you last eat? Your brain needs fuel, and "hangry" is a real thing that affects decisions',
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Angry',
					definition:
						"Are you pissed off about something?<br /><br /> Anger can hijack your judgment if you don't deal with it",
					scenario: '',
				},
				{
					letter: 'L',
					meaning: 'Lonely',
					definition:
						'Feeling disconnected from people?<br /><br /> Isolation makes everything harder and cravings stronger',
					scenario: '',
				},
				{
					letter: 'T',
					meaning: 'Tired',
					definition:
						"Exhausted? Your willpower runs on empty when you do - rest isn't optional",
					scenario: '',
				},
			],
			explanation:
				'Your basic human needs checklist - because sometimes the solution is as simple as a snack, a nap, or a hug.',
		},
		scenarios: [
			{
				title: 'Afternoon Craving Attack',
				content:
					"You're suddenly craving your old habit at 3 PM.<br /> <br />  <b>Check:</b> <br /> Haven't eaten since breakfast <u>(Hungry)</u>,<br />  frustrated with work project <u>(Angry)</u>,<br /> been alone all day <u>(Lonely)</u>, <br /> only got 4 hours sleep <u>(Tired)</u>. <br /> <br /> <b>Solution:</b> <br /> Eat a healthy snack, take a walk, call a friend, plan an early bedtime.<br /> <br /> ",
				btnLabel: 'Check HALT',
			},
			{
				title: 'Weekend Relapse Risk',
				content:
					"Saturday evening and you're thinking about using.<br /> <br />  <b>Check:</b><br />  Skipped meals while running errands <u>(Hungry)</u>, <br /> argument with family <u>(Angry)</u>, <br /> friends are all busy <u>(Lonely)</u>, <br /> stayed up too late binge-watching <u>(Tired)</u>. <br /> <br /> Address each need before the craving gets stronger.",
				btnLabel: 'Address Needs',
			},
		],
	},
	{
		id: 6,
		title: 'H.O.P.E.',
		content: {
			acronyms: [
				{
					letter: 'H',
					meaning: 'Helping',
					definition:
						'Do something for someone else - it gets your thinking out of your own head and <u>feels amazing</u>',
					scenario: '',
				},
				{
					letter: 'O',
					meaning: 'Others',
					definition:
						"Build real connections with people who matter to you - <b>isolation is recovery's enemy</b>",
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Purpose',
					definition:
						'Find your "why" - what makes you want to get up in the morning?',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Esteem',
					definition:
						'Do things that make you <b>proud of yourself - small wins count too</b>',
					scenario: '',
				},
			],
			explanation:
				"Your recipe for building a life that feels worth living - because hope isn't just a feeling, it's something you create.",
		},
		scenarios: [
			{
				title: 'Feeling Hopeless and Isolated',
				content:
					'Volunteer at a local food bank <u>(Helping)</u>,<br />  join a recovery support group <u>(Others)</u>, <br /> remember your goal of being present for your kids <u>(Purpose)</u>, <br /> celebrate 30 days clean <u>(Esteem)</u>. <br /> <br /> Each action builds on the others <b>to create genuine hope.</b>',
				btnLabel: 'Build Hope',
			},
			{
				title: 'Lost Sense of Direction',
				content:
					"Help a neighbor with groceries <u>(Helping)</u>,<br />  reach out to old friends you trust <u>(Others)</u>, <br />explore going back to school <u>(Purpose)</u>, <br />acknowledge you've been handling stress better lately <u>(Esteem)</u>. <br /> <br /> <b>Small steps toward a meaningful life.</b>",
				btnLabel: 'Find Direction',
			},
		],
	},
	{
		id: 7,
		title: 'H.O.V',
		content: {
			acronyms: [
				{
					letter: 'H',
					meaning: 'Hierarchy',
					definition:
						'Make a ranked list of what truly matters to you - what comes first when push comes to shove?',
					scenario: '',
				},
				{
					letter: 'O',
					meaning: 'Of',
					definition:
						'The connection between your priorities and your deeper values',
					scenario: '',
				},
				{
					letter: 'V',
					meaning: 'Values',
					definition:
						'What do you really care about? Not what you think you should care about, but what actually moves you',
					scenario: '',
				},
			],
			explanation:
				'Your personal compass for making decisions - when you know what matters most, choices become clearer.',
		},
		scenarios: [
			{
				title: 'Career vs. Family Time Decision',
				content:
					'Your job offers overtime but the kids have a recital. <br /> <br /> <b>Your hierarchy:</b> <br /><u>Family relationships</u>, <br /><u>personal health</u>, <br /><u>financial stability</u>, <br /><u>career advancement</u>. <br /><br /> <u>Since family tops your list</u>, the choice becomes clear - <u>attend the recital.</u>',
				btnLabel: 'Choose Values',
			},
			{
				title: 'Friend Wants You to Skip Therapy',
				content:
					'Friend wants to hang out during your therapy session.<br /><br /><b>Your values hierarchy:</b><br /> <u>Mental health</u>, <br /><u>Authentic relationships</u>, <br /><u>Fun/socializing</u>. <br /><br /> Explain that <b>therapy is non-negotiable</b> and suggest meeting afterward.',
				btnLabel: 'Rank Priorities',
			},
		],
	},
	{
		id: 8,
		title: 'I.C.E.',
		content: {
			acronyms: [
				{
					letter: 'I',
					meaning: 'Identify',
					definition:
						'Spot the problem patterns - what thoughts, feelings, or situations keep tripping you up?',
					scenario: '',
				},
				{
					letter: 'C',
					meaning: 'Challenge',
					definition:
						'Question everything - is this thought true? Is this behavior helping or hurting?',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Eliminate',
					definition:
						'Replace the junk with something better - out with the old, in with the helpful',
					scenario: '',
				},
			],
			explanation:
				"Three simple steps to break free from patterns that aren't serving you anymore.",
		},
		scenarios: [
			{
				title: 'People-Pleasing Pattern',
				content:
					"<b>Identify:</b><br /> You always say yes even when overwhelmed. <br /><br /><b>Challenge:</b> <br />Is saying yes really helping anyone if you're burnt out and resentful?<br /><br /> <b>Eliminate:</b><br /> Replace automatic 'yes' with 'Let me check my schedule and get back to you.'",
				btnLabel: 'Break the Pattern',
			},
			{
				title: 'Social Media Comparison',
				content:
					'<b>Identify:</b><br /> Scrolling Instagram makes you feel inadequate.<br /><br /> <b>Challenge:</b><br /> Are these highlight reels an accurate picture of reality?<br /><br /> <b>Eliminate:</b><br /> Replace mindless scrolling with calling a real friend or going for a walk.',
				btnLabel: 'Challenge & Change',
			},
		],
	},
	{
		id: 9,
		title: 'L.F.T.',
		content: {
			acronyms: [
				{
					letter: 'L',
					meaning: 'Low',
					definition:
						'Notice when your patience is running thin - this is when bad decisions happen',
					scenario: '',
				},
				{
					letter: 'F',
					meaning: 'Frustration',
					definition:
						"That feeling when things aren't going your way - totally normal, but needs managing",
					scenario: '',
				},
				{
					letter: 'T',
					meaning: 'Tolerance',
					definition:
						'Build your ability to sit with uncomfortable feelings without needing to escape immediately',
					scenario: '',
				},
			],
			explanation:
				"Learning to deal with life's annoying moments without losing your cool or your progress.",
		},
		scenarios: [
			{
				title: 'Traffic Jam Meltdown',
				content:
					"Stuck in traffic, <br />running late,<br /> patience is gone. <br /><br />Recognize your <u>low frustration tolerance</u>, <br /><u>accept that this sucks but isn't dangerous</u>,<br /><u>practice breathing instead of road rage.</u> <br /><br />Build tolerance for things outside your control.",
				btnLabel: 'Stay Cool',
			},
			{
				title: 'Technology Not Working',
				content:
					"Computer keeps crashing while you're trying to work. <br /><br /><b>Notice you're at your limit</b>, <br /><b>acknowledge the frustration is valid</b>, <br /><b>take breaks between attempts instead of getting more angry.</b> <br /><br />Learning to tolerate technical difficulties.",
				btnLabel: 'Build Tolerance',
			},
		],
	},
	{
		id: 10,
		title: 'P.I.E.',
		content: {
			acronyms: [
				{
					letter: 'P',
					meaning: 'Progress',
					definition:
						"Celebrate the wins, big and small - you're moving forward even if it doesn't always feel like it",
					scenario: '',
				},
				{
					letter: 'I',
					meaning: 'Insight',
					definition:
						'Those "aha!" moments when you finally get why you do what you do',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Empowerment',
					definition:
						"That growing sense that you're the one in charge of your life - and you're getting better at it",
					scenario: '',
				},
			],
			explanation:
				'Your personal growth tracker - because recovery is about so much more than just not using.',
		},
		scenarios: [
			{
				title: 'Three Months Clean',
				content:
					'<b>Progress:</b><br /> Ninety days without using, better sleep, improved relationships. <br /><br /><b>Insight:</b> <br />Realizing you used to cope with boredom and loneliness. <br /><br /><b>Empowerment:</b> <br />Choosing healthy activities and reaching out to friends instead of isolating.',
				btnLabel: 'Track Growth',
			},
			{
				title: 'Handled Stress Without Old Habits',
				content:
					'<b>Progress:</b><br /> Used coping skills during a tough week at work.<br /><br /> <b>Insight:</b><br /> Understanding that your anxiety spikes on Sundays because of work dread.<br /><br /> <b>Empowerment:</b><br /> Planning Sunday self-care routines to manage the anxiety proactively.',
				btnLabel: 'Celebrate Wins',
			},
		],
	},
	{
		id: 11,
		title: 'P.P.P',
		content: {
			acronyms: [
				{
					letter: 'P',
					meaning: 'Practice',
					definition:
						'Use your recovery tools regularly, not just when things get rough - like going to the gym for your brain',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Patience',
					definition:
						"This stuff takes time, and that's totally normal - be kind to yourself while you figure it out",
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Persistence',
					definition:
						"Keep going even when it sucks, especially when it sucks - that's when the real growth happens",
					scenario: '',
				},
			],
			explanation:
				"The three P's that make the difference between trying recovery and actually succeeding at it.",
		},
		scenarios: [
			{
				title: 'Daily Recovery Routine',
				content:
					'<b>Practice:</b><br /> Meditate for 10 minutes every morning, even when you feel good.<br /><br /> <b>Patience:</b><br /> Some days meditation feels pointless, but you trust the process. <br /><br /><b>Persistence:</b><br /> Keep the routine going even during busy or stressful weeks.',
				btnLabel: 'Stick With It',
			},
			{
				title: 'Learning New Coping Skills',
				content:
					'<b>Practice:</b><br /> Use breathing exercises daily, not just during panic attacks.<br /><br /> <b>Patience:</b> <br />Accept that it took months to feel natural instead of forced. <br /><br /><b>Persistence:</b> <br />Continue even when the old habits seem easier and faster.',
				btnLabel: 'Keep Practicing',
			},
		],
	},
	{
		id: 12,
		title: 'The Six Ps',
		content: {
			acronyms: [
				{
					letter: 'P',
					meaning: 'Piss',
					definition:
						'Bluntly reminds us that careless or sloppy effort in recovery can set you up for failure.',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Poor',
					definition:
						'Signals low-quality or half-hearted planning — a weak starting point that undermines progress.',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Planning',
					definition:
						'Strong preparation in recovery helps you anticipate challenges, avoid pitfalls, and stay accountable.',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Piss',
					definition:
						'A repeat of the warning — lack of effort and foresight will echo back later.',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Poor',
					definition:
						'Represents the outcome of inadequate preparation — weak coping strategies and unnecessary risks.',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Performance',
					definition:
						'How you actually show up in recovery. Without good planning, performance suffers, leading to setbacks or relapse.',
					scenario: '',
				},
			],
			explanation:
				'<b>A memorable recovery slogan:</b><br /> Piss Poor Planning leads to Piss Poor Performance. <br />It’s a tough-love reminder that preparation directly impacts outcomes. <u>The more effort you put into planning, the stronger your recovery performance will be.</u>',
		},
		scenarios: [
			{
				title: 'Facing a Stressful Event',
				content:
					'<b>Piss Poor Planning:</b><br /> You don’t practice coping skills before going to a party. <br /><br /><b>Piss Poor Performance:</b><br /> Anxiety overwhelms you, and you feel tempted to use as an escape.',
				btnLabel: 'Plan to Cope',
			},
			{
				title: 'Financial Triggers',
				content:
					'<b>Piss Poor Planning:</b><br /> You don’t budget or prepare for payday spending urges. <br /><br /><b>Piss Poor Performance:</b><br /> Money disappears quickly, leaving you stressed and vulnerable to relapse.',
				btnLabel: 'Budget & Prepare',
			},
		],
	},
	{
		id: 13,
		title: 'R.A.V.E.',
		content: {
			acronyms: [
				{
					letter: 'R',
					meaning: 'Recovery',
					definition:
						'Remember this is an ongoing journey, not a destination you arrive at and forget about',
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Awareness',
					definition:
						"Stay tuned in to your thoughts, feelings, and triggers - don't go on autopilot",
					scenario: '',
				},
				{
					letter: 'V',
					meaning: 'Vigilance',
					definition:
						'Keep your eyes open for warning signs without becoming paranoid about them',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Empowerment',
					definition:
						"Trust yourself to handle whatever comes up - you've got the tools and the strength",
					scenario: '',
				},
			],
			explanation:
				'Your long-term success strategy - staying strong and aware without making recovery feel like a prison.',
		},
		scenarios: [
			{
				title: 'Two Years Into Recovery',
				content:
					'<b>Recovery:</b><br /> Still attend weekly support meetings even though life is stable. <br /><br /><b>Awareness:</b><br /> Notice when work stress builds up before it becomes overwhelming. <br /><br /><b>Vigilance:</b><br /> Recognize old thinking patterns creeping back. <br /><br /><b>Empowerment:</b><br /> Trust your ability to handle challenges without using.',
				btnLabel: 'Stay Strong',
			},
			{
				title: 'Facing a Major Life Change',
				content:
					'<b>Recovery:</b><br /> Remember that major transitions are high-risk times.<br /><br /> <b>Awareness:</b><br /> Monitor your stress levels during the move/job change/breakup.<br /><br /> <b>Vigilance:</b><br /> Watch for isolation, sleep problems, or negative thinking.<br /><br /> <b>Empowerment:</b><br /> Use your support system and coping tools confidently.',
				btnLabel: 'Navigate Change',
			},
		],
	},
	{
		id: 14,
		title: 'R.E.I',
		content: {
			acronyms: [
				{
					letter: 'R',
					meaning: 'Rational',
					definition:
						'Think it through logically - what does the evidence actually say about this situation?',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Emotional',
					definition:
						"Honor your feelings without letting them run the show - they're information, not instructions",
					scenario: '',
				},
				{
					letter: 'I',
					meaning: 'Imagery',
					definition:
						'Use your imagination for good - picture yourself handling things well and feeling proud',
					scenario: '',
				},
			],
			explanation:
				'Balance your head and your heart with some positive visualization - the trifecta of healthy coping.',
		},
		scenarios: [
			{
				title: 'Job Interview Anxiety',
				content:
					"<b>Rational:</b><br /> You're qualified and have prepared well. <br /><br /><b>Emotional:</b><br /> It's normal to feel nervous about important things. <br /><br /><b>Imagery:</b><br /> Visualize yourself speaking confidently, connecting with the interviewer, and <u>walking out feeling proud regardless of the outcome.</u>",
				btnLabel: 'Balance & Visualize',
			},
			{
				title: 'Relationship Conflict',
				content:
					"<b>Rational:</b><br /> This argument doesn't mean the relationship is over.<br /><br /> <b>Emotional:</b><br /> You're hurt and that's valid, but don't make permanent decisions from temporary emotions.<br /><br /> <b>Imagery:</b><br /> Picture having <u>a calm conversation where you both listen</u> and <u>work together to solve the problem.</u>",
				btnLabel: 'Think & Feel',
			},
		],
	},
	{
		id: 15,
		title: 'S.M.A.R.T.',
		content: {
			acronyms: [
				{
					letter: 'S',
					meaning: 'Specific',
					definition:
						'Get crystal clear about what you want - "get better" is vague, "exercise 3x a week" is specific',
					scenario: '',
				},
				{
					letter: 'M',
					meaning: 'Measurable',
					definition:
						"How will you know you're making progress? You need a way to track and celebrate wins",
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Achievable',
					definition:
						'Set yourself up to succeed, not fail - ambitious is good, impossible is discouraging',
					scenario: '',
				},
				{
					letter: 'R',
					meaning: 'Relevant',
					definition:
						'Make sure this goal actually matters to your life and recovery - not just what sounds impressive',
					scenario: '',
				},
				{
					letter: 'T',
					meaning: 'Time-bound',
					definition:
						'Give yourself a deadline - without one, "someday" becomes "never"',
					scenario: '',
				},
			],
			explanation:
				"The gold standard for setting goals that you'll actually achieve instead of just hope for.",
		},
		scenarios: [
			{
				title: 'Getting Back Into Exercise',
				content:
					'<b>Specific:</b><br /> Walk for 30 minutes. <br /><br /><b>Measurable:</b><br /> Track walks on phone app. <br /><br /><b>Achievable:</b><br /> Start with 3 times per week, not daily. <br /><br /><b>Relevant:</b><br /> Exercise helps with mood and energy in recovery. <br /><br /><b>Time-bound:</b><br /> Build this habit over the next 4 weeks.',
				btnLabel: 'Set SMART Goals',
			},
			{
				title: 'Improving Sleep Habits',
				content:
					'<b>Specific:</b><br /> Be in bed by 10:30 PM with no screens.<br /><br /> <b>Measurable:</b><br /> Track bedtime and sleep quality.<br /><br /> <b>Achievable:</b><br /> Start with weeknights first.<br /><br /> <b>Relevant:</b><br /> Better sleep improves mood and decision-making. <br /><br /><b>Time-bound:</b><br /> Establish routine within 2 weeks.',
				btnLabel: 'Plan Success',
			},
		],
	},
	{
		id: 16,
		title: 'T.A.P.E.',
		content: {
			acronyms: [
				{
					letter: 'T',
					meaning: 'Thoughts',
					definition:
						"What's going through your mind right now? Sometimes we think things without really thinking about them",
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Assumptions',
					definition:
						'What are you taking for granted that might not actually be true? Question your defaults',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Predictions',
					definition:
						'What do you think will happen? Your crystal ball might be foggier than you think',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Evaluations',
					definition:
						'How are you judging yourself and others? Are you being fair, or being a harsh critic?',
					scenario: '',
				},
			],
			explanation:
				"Your mental fact-checker - helping you separate what's actually true from what just feels true.",
		},
		scenarios: [
			{
				title: 'Social Anxiety at a Party',
				content:
					"<b>Thoughts:</b><br /> 'Everyone thinks I'm weird.' <br /><br /><b>Assumptions:</b><br /> People are paying attention to and judging you. <br /><br /><b>Predictions:</b><br /> You'll embarrass yourself and everyone will remember. <br /><br /><b>Evaluations:</b><br /> You're being the worst critic of yourself - would you judge others this harshly?",
				btnLabel: 'Check Reality',
			},
			{
				title: 'Work Performance Worry',
				content:
					"<b>Thoughts:</b><br /> 'I'm going to get fired.' <br /><br /><b>Assumptions:</b><br /> One mistake means you're incompetent. <br /><br /><b>Predictions:</b><br /> Your boss will call you in for a termination meeting. <br /><br /><b>Evaluations:</b><br /> You're catastrophizing - most people make mistakes and keep their jobs.",
				btnLabel: 'Fact Check',
			},
		],
	},
	{
		id: 17,
		title: 'U.R.G.E.',
		content: {
			acronyms: [
				{
					letter: 'U',
					meaning: 'Unwanted',
					definition:
						"Acknowledge that these cravings suck and you didn't ask for them - but they're temporary visitors",
					scenario: '',
				},
				{
					letter: 'R',
					meaning: 'Reduce',
					definition:
						"Find ways to turn down the volume on these urges - they don't have to be so loud",
					scenario: '',
				},
				{
					letter: 'G',
					meaning: 'Gradually',
					definition:
						'This process takes time - be patient with yourself as the urges slowly lose their power',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Eliminate',
					definition:
						'The ultimate goal - getting to a place where these urges rarely show up at all',
					scenario: '',
				},
			],
			explanation:
				'Your step-by-step plan for making cravings less frequent, less intense, and eventually obsolete.',
		},
		scenarios: [
			{
				title: 'Cigarette Cravings',
				content:
					'<b>Unwanted:</b><br /> Accept that nicotine cravings are normal and temporary. <br /> <br /> <b>Reduce:</b><br /> Use breathing exercises, chew gum, take a walk. <br /> <br /> <b>Gradually:</b><br /> Notice cravings becoming less frequent over weeks. <br /> <br /> <b>Eliminate:</b><br /> Eventually go days, then weeks without thinking about smoking.',
				btnLabel: 'Reduce Urges',
			},
			{
				title: 'Shopping Addiction Urges',
				content:
					"<b>Unwanted:</b><br /> Acknowledge the urge to buy things you don't need is part of the addiction. <br /> <br /> <b>Reduce:</b><br /> Uninstall shopping apps, make a list before going to stores, bring limited cash. <br /> <br /> <b>Gradually:</b><br /> Practice sitting with the discomfort of wanting something. <br /> <br /> <b>Eliminate:</b><br /> Find that shopping urges rarely occur.",
				btnLabel: 'Control Impulses',
			},
		],
	},

	{
		id: 18,
		title: 'U.S.A',
		content: {
			acronyms: [
				{
					letter: 'U',
					meaning: 'Unconditional',
					definition:
						"You're worthy of love and respect just because you exist - no performance required",
					scenario: '',
				},
				{
					letter: 'S',
					meaning: 'Self',
					definition:
						'This is about you as a whole person, not just your mistakes or achievements',
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Acceptance',
					definition:
						'Embracing yourself as you are right now, while still working toward who you want to become',
					scenario: '',
				},
			],
			explanation:
				'The foundation of lasting recovery - learning to be on your own team, especially when you mess up.',
		},
		scenarios: [
			{
				title: 'After a Relapse',
				content:
					"<b>Unconditional:</b><br /> Your worth doesn't decrease because you used again.  <br /><br /><b>Self:</b><br /> You're a complex person dealing with a difficult challenge, not just 'an addict.'<br /><br /><b>Acceptance:</b><br /> Accept that you slipped while still believing <u>you can get back on track.</u>",
				btnLabel: 'Unconditional Self Acceptance',
			},
			{
				title: 'Comparing Yourself to Others',
				content:
					"<b>Unconditional:</b><br /> Your value isn't determined by how you stack up against others.  <br /><br /><b>Self:</b><br /> Focus on your whole journey, not just where you are right now. <br /><br /><b>Acceptance:</b><br /> Embrace your current progress while working <u>toward your goals without self-criticism.</u>",
				btnLabel: 'Comparing Yourself to Others',
			},
		],
	},
	{
		id: 19,
		title: 'W.A.I.T.',
		content: {
			acronyms: [
				{
					letter: 'W',
					meaning: 'Wait',
					definition:
						"Hit the pause button - you don't have to react immediately to every feeling or situation",
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Assess',
					definition:
						"Look around and take stock - what's really happening here, and how are you feeling about it?",
					scenario: '',
				},
				{
					letter: 'I',
					meaning: 'Identify',
					definition:
						"Name what you're dealing with - triggers, emotions, options - get clear on the situation",
					// scenario: '',
				},
				{
					letter: 'T',
					meaning: 'Take',
					definition:
						'Now make your move - but make it consciously, not impulsively',
					// scenario: '',
				},
			],
			explanation:
				"Your emergency brake for impulsive moments - giving yourself space to make choices you'll actually feel good about later.",
		},
		scenarios: [
			{
				title: 'Angry Text Message',
				content:
					"<b>Wait:</b><br /> Don't respond immediately to your ex's nasty text. <br /> <br /> <b>Assess:</b><br /> You're hurt and angry, but also in a good place in your recovery.<br /> <br /> <b>Identify:</b><br /> This is a trigger situation, you have options like blocking them or talking to your sponsor.<br /> <br />  <b>Take:</b><br /> Delete the mean response you typed and call your support person instead.",
				btnLabel: 'Angry Text Message',
			},
			{
				title: 'Sudden Urge to Quit Your Job',
				content:
					"<b>Wait:</b><br /> Don't storm into your boss's office after a bad meeting. <br /><br /><b>Assess:</b><br /> You're frustrated with work but also stressed about money. <br /><br /><b>Identify:</b><br /> This is anger and exhaustion talking, your options include talking to HR, looking for new jobs, or addressing specific issues. <br /><br /><b>Take:</b><br /> Schedule a conversation with your supervisor for next week to discuss concerns professionally.",
				btnLabel: 'Sudden Urge to Quit Your Job',
			},
		],
	},
];

export default data;
