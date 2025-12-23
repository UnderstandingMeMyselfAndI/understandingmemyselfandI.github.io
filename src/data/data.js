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
		videos: [{ title: 'The ABCDEs of Coping with Urges', url: 'https://www.youtube.com/watch?v=4Pmd7pzQI1M' }],
	},
	{
		id: 2,
		title: 'A.C.T.',
		content: {
			acronyms: [
				{
					letter: 'A',
					meaning: 'Accept',
					definition: '<p>Accept the things you can’t control right now (the craving, the feeling, the situation). Fighting it just feeds it.</p>',
					scenario: '',
				},
				{ letter: 'C', meaning: 'Choose', definition: '<p>Choose what matters most to you—your values, your recovery, your future self.</p>', scenario: '' },
				{ letter: 'T', meaning: 'Take action', definition: '<p>Do one small thing that lines up with that choice, even if you don’t feel like it.</p>', scenario: '' },
			],
			explanation: '<p>Short, sweet Acceptance & Commitment Therapy magic. Stop wrestling with feelings and start moving toward the life you actually want.</p>',
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
				{ letter: 'B', meaning: 'Bored', definition: '<p>Feeling restless, unstimulated, or “at a loose end.”</p>', scenario: '' },
				{ letter: 'A', meaning: 'Anxious', definition: '<p>Experiencing worry, nervousness, or fear about the future or current situations.</p>', scenario: '' },
				{ letter: 'D', meaning: 'Depressed', definition: '<p>Feeling low, hopeless, unmotivated, or emotionally drained.</p>', scenario: '' },
				{ letter: 'S', meaning: 'Stressed', definition: '<p>Feeling overwhelmed by demands, responsibilities, or external pressures.</p>', scenario: '' },
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
					definition: "<p>What's this behavior really costing you?<br />Think beyond money - your relationships, health, self-respect</p>",
					scenario: '',
				},
				{ letter: 'B', meaning: 'Benefit', definition: '<p>Be honest - what are you getting out of this behavior?<br />There must be something, right?</p>', scenario: '' },
				{ letter: 'A', meaning: 'Analysis', definition: '<p>Put it all on the table and see which side weighs more - is it worth it?</p>', scenario: '' },
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
			{ title: 'Cost Benefit Analysis (CBA) ', url: 'https://www.youtube.com/watch?v=k2e2TNSTurs' },
			{ title: 'How Does Cost-Benefit Analysis Help In SMART Recovery?', url: 'https://www.youtube.com/watch?v=ii1zvNDbzd0' },
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
					definition: '<p>Just say <u>"not right now"</u> - you don\'t have to give in immediately.<br />Urges have expiration dates</p>',
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Escape',
					definition: '<p><u>Change your scenery!</u><br />Sometimes the best thing you can do is physically remove yourself from temptation</p>',
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Avoid / Accept / Attack',
					definition: '<p><u>Pick your battle strategy:</u><br />dodge the trigger, accept the feeling will pass, or tackle it head-on</p>',
					scenario: '',
				},
				{
					letter: 'D',
					meaning: 'Distract',
					definition: '<p>Redirect that mental energy somewhere else - <b><u>call someone</u>, <u>go for a walk</u>, <u>binge a show</u></b></p>',
					scenario: '',
				},
				{ letter: 'S', meaning: 'Substitute', definition: '<p>Swap out the harmful habit for something that actually <b>makes you feel good about yourself</b></p>', scenario: '' },
			],
			explanation: '<p>Five solid moves when a craving knocks. Think of cravings like door-to-door salesmen—if you stop answering, they eventually leave.</p>',
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
		videos: [{ title: 'The DEADs Tool Explained', url: 'https://www.youtube.com/watch?v=rHl3STAGl-I' }],
	},
	{
		id: 6,
		title: 'D.I.S.A.R.M.',
		content: {
			acronyms: [
				{
					letter: 'D',
					meaning: 'Destructive',
					definition: '<p>Notice when your brain is playing up and feeding you garbage thoughts and mental images. It can be a snake at times. </p>',
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
					definition: "<p>What's that inner voice telling you? If it's being a jerk, it's time to change the conversation and let it know who's boss around here. </p>",
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
					definition: '<p>Tell those toxic thoughts who\'s in control. It\'s going to be a "thanks but no thanks" to them and your not going to engage.</p>',
					scenario: '',
				},
				{ letter: 'M', meaning: 'Method', definition: '<p>Have a game plan ready to replace the junk thoughts with something better</p>', scenario: '' },
			],
			explanation:
				"<p>D.I.S.A.R.M. is like your own personal secuity team. Like the ones in the movies, and that ex World leaders have. It's your mental bodyguard system - protecting you from the gremlins creating thoughts and images that try to sabotage your progress. Use the D.I.S.A.R.M. team as they've got your back.</p>",
		},
		scenarios: [
			{
				title: 'Gambling Urge Imagery',
				content:
					'<p><b>You start visualizing winning big at the casino.</b></p><p><b>Recognize this as destructive imagery</b>,<br /><u>become aware of the pattern</u>,<br /><b>refuse to engage with the fantasy</b>,<br />and <u>replace it with images of financial stability and peace of mind.</u></p>',
				btnLabel: 'Block the Fantasy',
			},
			{
				title: 'Negative Self-Talk Spiral',
				content:
					"<p>Inner voice says <u>'You'll never change, why even try?'</u></p><p>Catch this destructive self-talk, recognize the familiar pattern, refuse to argue with it, and replace it with <u>'I'm learning and growing every day.'</u></p>",
				btnLabel: 'Silence the Critic',
			},
		],
		cats: [],
		videos: [{ title: 'The DISARM Tool Explained', url: 'https://www.youtube.com/watch?v=pAVbXlXBthA' }],
	},

	// {
	// 	id: 8,
	// 	title: "F.E.A.R.",
	// 	content: {
	// 		acronyms: [
	// 			{
	// 				letter: "F",
	// 				meaning: "False / Fuck",
	// 				definition: "<p>Two versions (both useful):</p><p>1. False Evidence Appearing Real (CBT)</p><p>2. Fuck Everything And Run (the meeting-room classic)</p>",
	// 				scenario: "",
	// 			},
	// 			{letter: "E", meaning: "Evidence / Everything", definition: "<p>Your brain is making stuff up and selling it as facts… or just panicking</p>", scenario: ""},
	// 			{letter: "A", meaning: "Appearing / And", definition: "<p>It feels totally real in the moment</p>", scenario: ""},
	// 			{letter: "R", meaning: "Real / Run", definition: "<p>…but it’s usually not. Fear is a terrible fortune-teller.</p>", scenario: ""},
	// 		],
	// 		explanation: "<p>Pick your flavor of F.E.A.R.—both remind you that fear lies for a living.</p>",
	// 	},
	// 	scenarios: [
	// 		{
	// 			title: "First Meeting Jitters",
	// 			content: "<p>You’re terrified to walk into your first recovery meeting. Brain says “everyone will judge me.” That’s False Evidence Appearing Real. You go anyway and people hug you.</p>",
	// 			btnLabel: "Face the Fear",
	// 		},
	// 		{
	// 			title: "Relapse Anxiety",
	// 			content: "<p>“If I feel this bad again I’ll definitely use.” Fear talking. Most people who feel bad… just feel bad for a bit and then feel better.</p>",
	// 			btnLabel: "Call Its Bluff",
	// 		},
	// 	],
	// 	cats: ["C.B.T", "D.B.T", "Emergency", "Grounding", "Assumptions", "Plans", "Urges", "Cravings", "Thoughts", "Emotions", "Mood", "Mental Health", "Anxiety", "Stress", "Depressed", "Low Mood"],
	// 	videos: [],
	// },

	{
		id: 10,
		title: 'H.A.L.T.',
		content: {
			acronyms: [
				{
					letter: 'H',
					meaning: 'Hungry',
					definition: '<p>When did you last eat? Your brain needs fuel, and "hangry" is a real thing that affects decisions. Grab something to eat. </p>',
					scenario: '',
				},
				{
					letter: 'A',
					meaning: 'Angry',
					definition:
						"<p>Are you pissed off about something? <br />Anger can be a real dumbass and hijack your judgment if you don't deal with it. Go for a walk or change your environment, it can do wonders to re-focus your thoughts.</p>",
					scenario: '',
				},
				{
					letter: 'L',
					meaning: 'Lonely',
					definition:
						"<p>Feeling disconnected from people? It's understandable at times but isolation makes everything harder and the cravings monster loves it. Kick him to the side and call or message a buddy. It's not optional. They're probably wondering why you haven't been in touch lately.</p>",
					scenario: '',
				},
				{
					letter: 'T',
					meaning: 'Tired',
					definition: "<p>Exhausted? Your willpower runs on empty when you do - rest isn't optional. Swerve the unncessary and get yourself some sleep.</p>",
					scenario: '',
				},
			],
			explanation:
				"<p>H.A.L.T is a must have self-check tool. When these four basic needs are out of whack, your judgment isn't on-point, and you're an easy target for old habits. 90% of daft decisions start with one of these four gremlins. Run a self-check with them and fix the basic stuff first — then see if the craving is still there. 9 times out of 10 it will have done one. If not you can often find H.A.L.T. hanging with the jerks of B.A.D.S so check that tool too. </p>",
		},
		scenarios: [
			{
				title: 'Afternoon Craving Attack',
				content:
					"<p>You're suddenly craving your old habit at 3 PM.</p><p><b>Check:</b></p><p>Haven't eaten since breakfast <u>(Hungry)</u>,<br />frustrated with work project <u>(Angry)</u>,<br />been alone all day <u>(Lonely)</u>,<br />only got 4 hours sleep <u>(Tired)</u>.</p><p><b>Solution:</b></p><p>Eat a healthy snack, take a walk, call a friend, plan an early bedtime.</p>",
				btnLabel: 'Check HALT',
			},
			{
				title: 'Weekend Relapse Risk',
				content:
					"<p>Saturday evening and you're thinking about using.</p><p><b>Check:</b></p><p>Skipped meals while running errands <u>(Hungry)</u>,<br />argument with family <u>(Angry)</u>,<br />friends are all busy <u>(Lonely)</u>,<br />stayed up too late binge-watching <u>(Tired)</u>.</p><p>Address each need before the craving gets stronger.</p>",
				btnLabel: 'Address Needs',
			},
		],
		cats: [],
		videos: [],
	},
	{
		id: 11,
		title: 'H.O.P.E.',
		content: {
			acronyms: [
				{ letter: 'H', meaning: 'Helping', definition: '<p>Do something for someone else - it gets your thinking out of your own head and <u>feels amazing</u></p>', scenario: '' },
				{ letter: 'O', meaning: 'Others', definition: "<p>Build real connections with people who matter to you - <b>isolation is recovery's enemy</b></p>", scenario: '' },
				{ letter: 'P', meaning: 'Purpose', definition: '<p>Find your "why" - what makes you want to get up in the morning?</p>', scenario: '' },
				{ letter: 'E', meaning: 'Esteem', definition: '<p>Do things that make you <b>proud of yourself - small wins count too</b></p>', scenario: '' },
			],
			explanation: '<p>Hope isn’t something you wait for—it’s something you build, one tiny helpful action at a time.</p>',
		},
		scenarios: [
			{
				title: 'Feeling Hopeless and Isolated',
				content:
					'<p>Volunteer at a local food bank <u>(Helping)</u>,<br />join a recovery support group <u>(Others)</u>,<br />remember your goal of being present for your kids <u>(Purpose)</u>,<br />celebrate 30 days clean <u>(Esteem)</u>.</p><p>Each action builds on the others <b>to create genuine hope.</b></p>',
				btnLabel: 'Build Hope',
			},
			{
				title: 'Lost Sense of Direction',
				content:
					"<p>Help a neighbor with groceries <u>(Helping)</u>,<br />reach out to old friends you trust <u>(Others)</u>,<br />explore going back to school <u>(Purpose)</u>,<br />acknowledge you've been handling stress better lately <u>(Esteem)</u>.</p><p><b>Small steps toward a meaningful life.</b></p>",
				btnLabel: 'Find Direction',
			},
		],
		cats: [],
		videos: [],
	},
	{
		id: 12,
		title: 'H.O.V',
		content: {
			acronyms: [
				{
					letter: 'H',
					meaning: 'Hierarchy',
					definition:
						'<p>Make a ranked list of what truly matters to you - what comes first when push comes to shove? Think of your life like a playlist or a top-10 list. The thngs that really matter at the top, others that matter less are lower down. </p>',
					scenario: '',
				},
				{
					letter: 'O',
					meaning: 'Of',
					definition:
						'<p>The connection between your priorities and your deeper values. This is NOT: What <u>your</u> family wants, What <u>society</u> says or What <u>other people think</u> you should care about. This <u>is about your actual choices</u>, not your intentions.</p>',
					scenario: '',
				},
				{
					letter: 'V',
					meaning: 'Values',
					definition: '<p>Values are what you care about enough to act on. Not slogans. Not Instagram quotes. Values show up in what you do when it gets tough.</p>',
					scenario: '',
				},
			],
			explanation:
				"<p>the Hierarchy of Values (H.O.V.) tool is a straight-up game-changer for getting your priorities locked in and staying motivated, especially when you're trying to ditch the bad habits, beat addictions, or just level up your life decisions. It's a key move from SMART Recovery — a no-nonsense, science-based program for handling urges and making smarter choices, keeping it all about real talk and zero mystical vibes.</p><p>H.O.V - Think of it as building your personal roadmap. When life's pulling you in daft directions, H.O.V. reminds you what's really worth working for, so you don't waste time on BS that doesn't align with your core. No religious angle here — just practical steps to boss up.</p>",
		},
		scenarios: [
			{
				title: 'Career vs. Family Time Decision',
				content:
					'<p>Your job offers overtime but the kids have a recital.</p><p><b>Your hierarchy:</b></p><p><u>Family relationships</u>,<br /><u>personal health</u>,<br /><u>financial stability</u>,<br /><u>career advancement</u>.</p><p><u>Since family tops your list</u>, the choice becomes clear - <u>attend the recital.</u></p>',
				btnLabel: 'Choose Values',
			},
			{
				title: 'Friend Wants You to Skip Therapy',
				content:
					'<p>Friend wants to hang out during your therapy session.</p><p><b>Your values hierarchy:</b></p><p><u>Mental health</u>,<br /><u>Authentic relationships</u>,<br /><u>Fun/socializing</u>.</p><p>Explain that <b>therapy is non-negotiable</b> and suggest meeting afterward.</p>',
				btnLabel: 'Rank Priorities',
			},
		],
		cats: ['SMART'],
		videos: [{ title: 'The Hierarchy of Values Tool (HOV)', url: 'https://www.youtube.com/watch?v=RW63Ddsgol0' }],
	},
	{
		id: 13,
		title: 'I.C.E.',
		content: {
			acronyms: [
				{ letter: 'I', meaning: 'Identify', definition: '<p>Spot the problem patterns - what thoughts, feelings, or situations keep tripping you up?</p>', scenario: '' },
				{ letter: 'C', meaning: 'Challenge', definition: '<p>Question everything - is this thought true? Is this behavior helping or hurting?</p>', scenario: '' },
				{ letter: 'E', meaning: 'Eliminate', definition: '<p>Replace the junk with something better - out with the old, in with the helpful</p>', scenario: '' },
			],
			explanation:
				"<p>Three simple steps to break free from patterns that aren't serving you anymore.<br /><u>Challenge your thoughts and </u><b>take your thoughts to court</b></p>",
		},
		scenarios: [
			{
				title: 'People-Pleasing Pattern',
				content:
					"<p><b>Identify:</b><br />You always say yes even when overwhelmed.</p><p><b>Challenge:</b><br />Is saying yes really helping anyone if you're burnt out and resentful?</p><p><b>Eliminate:</b><br />Replace automatic 'yes' with 'Let me check my schedule and get back to you.'</p>",
				btnLabel: 'Break the Pattern',
			},
			{
				title: 'Social Media Comparison',
				content:
					'<p><b>Identify:</b><br />Scrolling Instagram makes you feel inadequate.</p><p><b>Challenge:</b><br />Are these highlight reels an accurate picture of reality?</p><p><b>Eliminate:</b><br />Replace mindless scrolling with calling a real friend or going for a walk.</p>',
				btnLabel: 'Challenge & Change',
			},
		],
		cats: [],
		videos: [],
	},
	{
		id: 14,
		title: 'I.M.P.R.O.V.E.',
		content: {
			acronyms: [
				{
					letter: 'I',
					meaning: 'Imagery',
					definition:
						"<p>Picture this: Close your eyes and bounce to a chill spot in your mind, like your fave beach or a cozy crib. Make it vivid — smells, sounds, all that. It's like teleporting out of the drama for a sec to recharge. </p>",
					scenario: '',
				},
				{
					letter: 'M',
					meaning: 'Meaning',
					definition:
						"<p>Flip the script on the bad stuff. Ask yourself, \"What\'s the silver lining here? What can I learn or how can this make me tougher?\" It\'s about finding that hidden gem in the mess so it doesn\'t feel pointless.</p>",
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Pause (and Positive Vibes)',
					definition:
						"<p>Take a beat to center yourself. This is like hitting pause, breathing deep, and tapping into your inner strength or thinking about something bigger than the drama, like the universe or your crew. Just a quiet moment to regroup and remind yourself you're built for this.</p>",
					scenario: '',
				},
				{
					letter: 'R',
					meaning: 'Relaxtion',
					definition:
						"<p>Loosen up dude. Do whatever chills you out — deep breaths, stretching, a hot shower, bath or popping on some quality tunes. Tense up your muscles then let them go, or sip some tea and think about your happy place. It's all about dropping that stress from your body so you ain't wound up like a spring.</p>",
					scenario: '',
				},
				{
					letter: 'O',
					meaning: 'One (thing in the moment)',
					definition:
						"<p>Lock in on just one thing right now. Don't let your brain bounce around like a pinball — focus on breathing, counting steps while you walk, or eating a snack super slow and noticing every bite. Keeps you grounded in the now instead of spiraling on the what-ifs.</p>",
					scenario: '',
				},
				{
					letter: 'V',
					meaning: 'Vacation',
					definition:
						"<p>Nah, not booking a flight—it's a mini-escape in your day. Step away for a sec: watch a funny video, check the latest memes, or dip into a quick game on your phone. Give yourself permission to zone out for 5-10 minutes without guilt, like hitting the reset button.</p>",
					scenario: '',
				},
				{
					letter: 'E',
					meaning: 'Encouragment',
					definition:
						'<p>Talk to yourself like your own hype man. Drop some positive self-talk on yourself: "You got this," or "This crap won\'t last forever — I\'m tougher than it." Build yourself up with real talk that gets you back up, no cap.</p>',
					scenario: '',
				},
			],
			explanation:
				"<p>IMPROVE is a straight-up boss move from DBT (that's Dialectical Behavior Therapy, basically a toolkit for dealing with heavy emotions without flipping out).</p><p>It's all about upgrading the moment when life's throwing curveballs at you — keeping your head straight and riding out the storm. Think of it like hacking your brain to chill when stuff's getting intense.</p><p>The whole point? When life's comin' at you hard, IMPROVE helps you survive the storm without crashing and burning. Practice it when you're calm so it's second nature when the heat's on. If you're dealing with heavy stuff, link up with a pro therapist to level it up. Stay strong out there.</p>",
		},
		scenarios: [],
		cats: ['DBT'],
		videos: [],
	},
	{
		id: 15,
		title: 'L.F.T.',
		content: {
			acronyms: [
				{
					letter: 'L',
					meaning: 'Low',
					definition: '<p>Notice when your patience is running thin - this is when those crappy decisions happen - be a buddy to yourself and do a quick self check-in. </p>',
					scenario: '',
				},
				{
					letter: 'F',
					meaning: 'Frustration',
					definition: "<p>That feeling when things aren't going your way - totally normal, but you've got to get a game plan together.</p>",
					scenario: '',
				},
				{
					letter: 'T',
					meaning: 'Tolerance',
					definition:
						"<p>Build your ability to sit with uncomfortable thoughts and feelings without needing to escape immediately. You're stronger than you think but if sitting with it gets too much, take a swerve and distract yourself for a bit. You'll get better over time so don't sweat it.</p>",
					scenario: '',
				},
			],
			explanation: "<p>Levelling up your toolbox for dealing with life's annoying moments without needing to style it out, losing your cool or your progress.</p>",
		},
		scenarios: [
			{
				title: 'Traffic Jam Meltdown',
				content:
					"<p>Stuck in traffic,<br />running late,<br />patience is gone.</p><p>Recognize your <u>low frustration tolerance</u>,<br /><u>accept that this sucks but isn't dangerous</u>,<br /><u>practice breathing instead of road rage.</u></p><p>Build tolerance for things outside your control.</p>",
				btnLabel: 'Stay Cool',
			},
			{
				title: 'Technology Not Working',
				content:
					"<p>Computer keeps crashing while you're trying to work.</p><p><b>Notice you're at your limit</b>,<br /><b>acknowledge the frustration is valid</b>,<br /><b>take breaks between attempts instead of getting more angry.</b></p><p>Learning to tolerate technical difficulties.</p>",
				btnLabel: 'Build Tolerance',
			},
		],
		cats: [],
		videos: [],
	},

	{
		id: 16,
		title: 'P.I.E.',
		content: {
			acronyms: [
				{ letter: 'P', meaning: 'Progress', definition: "<p>Celebrate the wins, big and small - you're moving forward even if it doesn't always feel like it</p>", scenario: '' },
				{ letter: 'I', meaning: 'Insight', definition: '<p>Those "aha!" moments when you finally get why you do what you do</p>', scenario: '' },
				{ letter: 'E', meaning: 'Empowerment', definition: "<p>That growing sense that you're the one in charge of your life - and you're getting better at it</p>", scenario: '' },
			],
			explanation: '<p>Your personal growth tracker - because recovery is about so much more than just not using.</p>',
		},
		scenarios: [
			{
				title: 'Three Months Clean',
				content:
					'<p><b>Progress:</b><br />Ninety days without using, better sleep, improved relationships.</p><p><b>Insight:</b><br />Realizing you used to cope with boredom and loneliness.</p><p><b>Empowerment:</b><br />Choosing healthy activities and reaching out to friends instead of isolating.</p>',
				btnLabel: 'Track Growth',
			},
			{
				title: 'Handled Stress Without Old Habits',
				content:
					'<p><b>Progress:</b><br />Used coping skills during a tough week at work.</p><p><b>Insight:</b><br />Understanding that your anxiety spikes on Sundays because of work dread.</p><p><b>Empowerment:</b><br />Planning Sunday self-care routines to manage the anxiety proactively.</p>',
				btnLabel: 'Celebrate Wins',
			},
		],
		cats: [],
		videos: [],
	},
	// {
	// 	id: 17,
	// 	title: "P.L.E.A.S.E.",
	// 	content: {
	// 		acronyms: [
	// 			{letter: "P", meaning: "PhysicaL illness", definition: "<p>Treat any physical illness—pain or sickness makes everything harder</p>", scenario: ""},
	// 			{letter: "L", meaning: "Eat balanced", definition: "<p>Don’t let your body run on junk and caffeine</p>", scenario: ""},
	// 			{letter: "E", meaning: "Avoid mood-altering substances", definition: "<p>Even the “harmless” ones can mess with your brain chemistry</p>", scenario: ""},
	// 			{letter: "A", meaning: "Sleep", definition: "<p>Get enough—sleep deprivation turns you into a toddler</p>", scenario: ""},
	// 			{letter: "S", meaning: "Shower & self-care", definition: "<p>Basic hygiene and feeling human matter more than you think</p>", scenario: ""},
	// 			{letter: "E", meaning: "Exercise", definition: "<p>Move your body daily—even a walk counts</p>", scenario: ""},
	// 		],
	// 		explanation: "<p>DBT’s master self-care checklist. When you neglect your body, your emotions get dramatic and your coping skills go offline.</p>",
	// 	},
	// 	scenarios: [
	// 		{
	// 			title: "Feeling Irritable and Fragile",
	// 			content: "<p>Run the P.L.E.A.S.E. check: haven’t slept well in days, living on energy drinks, no exercise. Fix those first—then see how “impossible” life still feels.</p>",
	// 			btnLabel: "Body First",
	// 		},
	// 		{
	// 			title: "Pre-Menstrual Craving Spike",
	// 			content: "<p>PMDD or PMS hitting hard? Extra points for treating PhysicaL illness, Eating balanced food, and getting Sleep. Your brain will thank you.</p>",
	// 			btnLabel: "Self-Care Saves the Day",
	// 		},
	// 	],
	// 	cats: ["C.B.T", "D.B.T", "Emergency", "Grounding", "Assumptions", "Plans", "Urges", "Cravings", "Thoughts", "Emotions", "Mood", "Mental Health", "Anxiety", "Stress", "Depressed", "Low Mood"],
	// 	videos: [],
	// },
	{
		id: 18,
		title: 'P.P.P',
		content: {
			acronyms: [
				{
					letter: 'P',
					meaning: 'Practice',
					definition: '<p>Use your recovery tools regularly, not just when things get rough - like going to the gym for your brain</p>',
					scenario: '',
				},
				{ letter: 'P', meaning: 'Patience', definition: "<p>This stuff takes time, and that's totally normal - be kind to yourself while you figure it out</p>", scenario: '' },
				{ letter: 'P', meaning: 'Persistence', definition: "<p>Keep going even when it sucks, especially when it sucks - that's when the real growth happens</p>", scenario: '' },
			],
			explanation: "<p>The three P's that make the difference between trying recovery and actually succeeding at it.</p>",
		},
		scenarios: [
			{
				title: 'Daily Recovery Routine',
				content:
					'<p><b>Practice:</b><br />Meditate for 10 minutes every morning, even when you feel good.</p><p><b>Patience:</b><br />Some days meditation feels pointless, but you trust the process.</p><p><b>Persistence:</b><br />Keep the routine going even during busy or stressful weeks.</p>',
				btnLabel: 'Stick With It',
			},
			{
				title: 'Learning New Coping Skills',
				content:
					'<p><b>Practice:</b><br />Use breathing exercises daily, not just during panic attacks.</p><p><b>Patience:</b><br />Accept that it took months to feel natural instead of forced.</p><p><b>Persistence:</b><br />Continue even when the old habits seem easier and faster.</p>',
				btnLabel: 'Keep Practicing',
			},
		],
		cats: [],
		videos: [],
	},
	{
		id: 19,
		title: 'R.A.I.N.',
		content: {
			acronyms: [
				{ letter: 'R', meaning: 'Recognize', definition: '<p>Name what’s happening: “This is anxiety,” “This is shame,” “This is a craving.”</p>', scenario: '' },
				{ letter: 'A', meaning: 'Allow', definition: '<p>Let it be there without fighting or feeding it. It’s already here.</p>', scenario: '' },
				{ letter: 'I', meaning: 'Investigate', definition: '<p>Get curious—where do you feel it in your body? What does it need right now?</p>', scenario: '' },
				{ letter: 'N', meaning: 'Nurture', definition: '<p>Offer yourself kindness—like you would a good friend or a scared kid</p>', scenario: '' },
			],
			explanation: '<p>Mindfulness superpower created by Tara Brach. Turns “I can’t handle this feeling” into “I can be with this feeling until it passes.”</p>',
		},
		scenarios: [
			{
				title: 'Shame After a Slip',
				content:
					'<p><b>Recognize:</b> Shame wave.<br /><b>Allow:</b> Okay, it’s here.<br /><b>Investigate:</b> Tight chest, hot face.<br /><b>Nurture:</b> Hand on heart, “It’s okay, you’re human, we’re getting back up.”</p>',
				btnLabel: 'Be Kind to Yourself',
			},
			{
				title: 'Intense Craving',
				content:
					'<p><b>R:</b> Craving for [substance].<br /><b>A:</b> Let it be here.<br /><b>I:</b> Feel it in stomach and hands.<br /><b>N:</b> “This is hard, and I’m doing hard things. I’ve got you.”</p>',
				btnLabel: 'Ride the Wave',
			},
		],
		cats: [],
		videos: [
			{ title: 'The RAIN Technique Explained? - Stress Free Mindset', url: 'https://www.youtube.com/watch?v=8etCPEto4z4' },
			{ title: 'The RAIN Method', url: 'https://www.youtube.com/watch?v=wN0XtQumGBk' },
			{ title: 'RAIN-Method: Meditation for emotional self-regulation', url: 'https://www.youtube.com/watch?v=olCAX_C0iM8' },
			{ title: '5-Minute Meditations: R.A.I.N Technique', url: 'https://www.youtube.com/watch?v=v6k5gv3nxQ8' },
			{ title: 'Mindful Meditation - The R-A-I-N Technique', url: 'https://www.youtube.com/watch?v=kC7dJQt5BBw' },
			{ title: 'Guided Meditation: Dissolving the Trance of Unworthiness with RAIN with Tara Brach', url: 'https://www.youtube.com/watch?v=Ytr1V1R1rOw' },
		],
	},
	{
		id: 20,
		title: 'R.A.V.E.',
		content: {
			acronyms: [
				{ letter: 'R', meaning: 'Recovery', definition: '<p>Remember this is an ongoing journey, not a destination you arrive at and forget about</p>', scenario: '' },
				{ letter: 'A', meaning: 'Awareness', definition: "<p>Stay tuned in to your thoughts, feelings, and triggers - don't go on autopilot</p>", scenario: '' },
				{ letter: 'V', meaning: 'Vigilance', definition: '<p>Keep your eyes open for warning signs without becoming paranoid about them</p>', scenario: '' },
				{ letter: 'E', meaning: 'Empowerment', definition: "<p>Trust yourself to handle whatever comes up - you've got the tools and the strength</p>", scenario: '' },
			],
			explanation: '<p>Your long-term success strategy - staying strong and aware without making recovery feel like a prison.</p>',
		},
		scenarios: [
			{
				title: 'Two Years Into Recovery',
				content:
					'<p><b>Recovery:</b><br />Still attend weekly support meetings even though life is stable.</p><p><b>Awareness:</b><br />Notice when work stress builds up before it becomes overwhelming.</p><p><b>Vigilance:</b><br />Recognize old thinking patterns creeping back.</p><p><b>Empowerment:</b><br />Trust your ability to handle challenges without using.</p>',
				btnLabel: 'Stay Strong',
			},
			{
				title: 'Facing a Major Life Change',
				content:
					'<p><b>Recovery:</b><br />Remember that major transitions are high-risk times.</p><p><b>Awareness:</b><br />Monitor your stress levels during the move/job change/breakup.</p><p><b>Vigilance:</b><br />Watch for isolation, sleep problems, or negative thinking.</p><p><b>Empowerment:</b><br />Use your support system and coping tools confidently.</p>',
				btnLabel: 'Navigate Change',
			},
		],
		cats: [],
		videos: [],
	},
	{
		id: 21,
		title: 'R.E.I',
		content: {
			acronyms: [
				{ letter: 'R', meaning: 'Rational', definition: '<p>Think it through logically - what does the evidence actually say about this situation?</p>', scenario: '' },
				{ letter: 'E', meaning: 'Emotive', definition: "<p>Honor your feelings without letting them run the show - they're information, not instructions</p>", scenario: '' },
				{ letter: 'I', meaning: 'Imagery', definition: '<p>Use your imagination for good - picture yourself handling things well and feeling proud</p>', scenario: '' },
			],
			explanation: '<p>Balance your head and your heart with some positive visualization - the trifecta of healthy coping.</p>',
		},
		scenarios: [
			{
				title: 'Job Interview Anxiety',
				content:
					"<p><b>Rational:</b><br />You're qualified and have prepared well.</p><p><b>Emotional:</b><br />It's normal to feel nervous about important things.</p><p><b>Imagery:</b><br />Visualize yourself speaking confidently, connecting with the interviewer, and <u>walking out feeling proud regardless of the outcome.</u></p>",
				btnLabel: 'Balance & Visualize',
			},
			{
				title: 'Relationship Conflict',
				content:
					"<p><b>Rational:</b><br />This argument doesn't mean the relationship is over.</p><p><b>Emotional:</b><br />You're hurt and that's valid, but don't make permanent decisions from temporary emotions.</p><p><b>Imagery:</b><br />Picture having <u>a calm conversation where you both listen</u> and <u>work together to solve the problem.</u></p>",
				btnLabel: 'Think & Feel',
			},
		],
		cats: [],
		videos: [],
	},
	{
		id: 22,
		title: 'S.M.A.R.T.',
		content: {
			acronyms: [
				{ letter: 'S', meaning: 'Specific', definition: '<p>Get crystal clear about what you want - "get better" is vague, "exercise 3x a week" is specific</p>', scenario: '' },
				{ letter: 'M', meaning: 'Measurable', definition: "<p>How will you know you're making progress? You need a way to track and celebrate wins</p>", scenario: '' },
				{ letter: 'A', meaning: 'Achievable', definition: '<p>Set yourself up to succeed, not fail - ambitious is good, impossible is discouraging</p>', scenario: '' },
				{ letter: 'R', meaning: 'Relevant', definition: '<p>Make sure this goal actually matters to your life and recovery - not just what sounds impressive</p>', scenario: '' },
				{ letter: 'T', meaning: 'Time-bound', definition: '<p>Give yourself a deadline - without one, "someday" becomes "never"</p>', scenario: '' },
			],
			explanation: "<p>The gold standard for setting goals that you'll actually achieve instead of just hope for.</p>",
		},
		scenarios: [
			{
				title: 'Getting Back Into Exercise',
				content:
					'<p><b>Specific:</b><br />Walk for 30 minutes.</p><p><b>Measurable:</b><br />Track walks on phone app.</p><p><b>Achievable:</b><br />Start with 3 times per week, not daily.</p><p><b>Relevant:</b><br />Exercise helps with mood and energy in recovery.</p><p><b>Time-bound:</b><br />Build this habit over the next 4 weeks.</p>',
				btnLabel: 'Set SMART Goals',
			},
			{
				title: 'Improving Sleep Habits',
				content:
					'<p><b>Specific:</b><br />Be in bed by 10:30 PM with no screens.</p><p><b>Measurable:</b><br />Track bedtime and sleep quality.</p><p><b>Achievable:</b><br />Start with weeknights first.</p><p><b>Relevant:</b><br />Better sleep improves mood and decision-making.</p><p><b>Time-bound:</b><br />Establish routine within 2 weeks.</p>',
				btnLabel: 'Plan Success',
			},
		],
		cats: [],
		videos: [
			{ title: 'SMART Goals Explained', url: 'https://www.youtube.com/watch?v=1-SvuFIQjK8' },
			{ title: 'SMART Goals Quick Overview with 21 SMART Goals Examples', url: 'https://www.youtube.com/watch?v=elJcG83m-qg' },
			{ title: 'How to Set SMART Goals ', url: 'https://www.youtube.com/watch?v=i0QfCZjASX8' },
		],
	},
	{
		id: 23,
		title: 'S.T.O.P.',
		content: {
			acronyms: [
				{ letter: 'S', meaning: 'Stop', definition: '<p>Freeze—don’t react yet</p>', scenario: '' },
				{ letter: 'T', meaning: 'Take a breath', definition: '<p>One slow breath (or three)</p>', scenario: '' },
				{ letter: 'O', meaning: 'Observe', definition: '<p>What’s happening in your body? Thoughts? Surroundings?</p>', scenario: '' },
				{ letter: 'P', meaning: 'Proceed', definition: '<p>Now choose your next move mindfully</p>', scenario: '' },
			],
			explanation: '<p>The ultimate 10-second emergency brake. Works for anger, cravings, panic attacks, or “about to text your ex.”</p>',
		},
		scenarios: [
			{
				title: 'About to Relapse',
				content: '<p>Hand reaching for the bottle → S.T.O.P.<br />Stop moving, take a breath, notice the urge in your chest, remember why you quit… then call someone instead.</p>',
				btnLabel: 'Pause Power',
			},
			{
				title: 'Argument Escalating',
				content: '<p>Voice rising → S.T.O.P.<br />Pause, breathe, notice you’re flooded, say “I need a minute” and step outside. Saves relationships.</p>',
				btnLabel: 'Save the Fight',
			},
		],
		cats: [],
		videos: [{ title: 'DBT Distress Tolerance STOP Skill', url: 'https://www.youtube.com/watch?v=8ykrSYe6UMk' }],
	},
	{
		id: 24,
		title: 'T.A.P.E.',
		content: {
			acronyms: [
				{
					letter: 'T',
					meaning: 'Thoughts',
					definition: "<p>What's going through your mind right now? Sometimes we think things without really thinking about them</p>",
					scenario: '',
				},
				{ letter: 'A', meaning: 'Assumptions', definition: '<p>What are you taking for granted that might not actually be true? Question your defaults</p>', scenario: '' },
				{ letter: 'P', meaning: 'Predictions', definition: '<p>What do you think will happen? Your crystal ball might be foggier than you think</p>', scenario: '' },
				{ letter: 'E', meaning: 'Evaluations', definition: '<p>How are you judging yourself and others? Are you being fair, or being a harsh critic?</p>', scenario: '' },
			],
			explanation: "<p>Your mental fact-checker - helping you separate what's actually true from what just feels true.</p>",
		},
		scenarios: [
			{
				title: 'Social Anxiety at a Party',
				content:
					"<p><b>Thoughts:</b><br />'Everyone thinks I'm weird.'</p><p><b>Assumptions:</b><br />People are paying attention to and judging you.</p><p><b>Predictions:</b><br />You'll embarrass yourself and everyone will remember.</p><p><b>Evaluations:</b><br />You're being the worst critic of yourself - would you judge others this harshly?</p>",
				btnLabel: 'Check Reality',
			},
			{
				title: 'Work Performance Worry',
				content:
					"<p><b>Thoughts:</b><br />'I'm going to get fired.'</p><p><b>Assumptions:</b><br />One mistake means you're incompetent.</p><p><b>Predictions:</b><br />Your boss will call you in for a termination meeting.</p><p><b>Evaluations:</b><br />You're catastrophizing - most people make mistakes and keep their jobs.</p>",
				btnLabel: 'Fact Check',
			},
		],
		cats: [],
		videos: [
			{ title: 'Fact-Checking - A CBT tool', url: 'https://www.youtube.com/watch?v=4GEjZVZq1V0' },
			{ title: 'Cognitive Fusion and Defusion in ACT', url: 'https://www.youtube.com/watch?v=CpdVMs818AE' },
		],
	},
	{
		id: 25,
		title: 'T.I.P.',
		content: {
			acronyms: [
				{ letter: 'T', meaning: 'Temperature', definition: '<p>Change your body temp fast—ice on face/neck or cold shower (diving reflex calms you instantly)</p>', scenario: '' },
				{ letter: 'I', meaning: 'Intense exercise', definition: '<p>30–60 seconds all-out (burpees, sprinting) to burn off stress hormones</p>', scenario: '' },
				{ letter: 'P', meaning: 'Paced breathing', definition: '<p>Slow your breathing way down—4 sec in, 6 sec out (or box breathing)</p>', scenario: '' },
			],
			explanation: '<p>DBT’s fastest skills to flip your nervous system from freak-out to chill in under a minute.</p>',
		},
		scenarios: [
			{
				title: 'Panic Attack at Work',
				content: '<p>Heart racing → run to bathroom, dunk face in cold water (T), do 20 jumping jacks (I), then 4-7-8 breathing (P). Back to meeting in 90 seconds calmer.</p>',
				btnLabel: 'Cool Down Fast',
			},
			{
				title: 'Road Rage',
				content: '<p>About to lose it in traffic → crank AC on face (T), do push-ups on the steering wheel (I), box breathe at the red light (P). Arrive less murderous.</p>',
				btnLabel: 'Survive the Moment',
			},
		],
		cats: [],
		videos: [
			{ title: 'TIP Skills: Reduce Extreme Emotions Quickly', url: 'https://www.youtube.com/watch?v=UuvH_j9O0f4' },
			{ title: 'The TIPP Technique', url: 'https://www.youtube.com/watch?v=8nVady7A3Qo' },
		],
	},
	{
		id: 26,
		title: 'The Six Ps',
		content: {
			acronyms: [
				{
					letter: 'P',
					meaning: 'Proper',
					definition: "<p>Doing things the right way, not cutting corners. It’s about being honest with yourself and making sure what you're doing is sensible and realistic.</p>",
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Preparation',
					definition:
						'<p>Getting ready in advance. This might mean learning new coping skills, having a plan for tricky situations, or knowing what resources you can turn to if you’re struggling.</p>',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Planning',
					definition:
						'<p>Actually mapping out what you’re going to do. Instead of just hoping for the best, you think about the steps you’ll take — e.g., what to do when cravings come up, or how to spend time in healthier ways.</p>',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Prevents',
					definition: '<p>This is the cause-and-effect part: doing the first three steps helps to stop problems before they happen.</p>',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Poor',
					definition:
						'<p>If you don’t prepare or plan, you’re more likely to make choices that aren’t good for your recovery. “Poor” here just means unhelpful, sloppy, or not up to your best ability.</p>',
					scenario: '',
				},
				{
					letter: 'P',
					meaning: 'Performance',
					definition:
						'<p>How well you actually do in real life. With good preparation and planning, your performance (how you handle recovery, challenges, or life situations) will be much stronger and more successful.</p>',
					scenario: '',
				},
			],
			explanation: '<p><b>Proper Preparation and Planning Prevents Poor Performance</b><br />Or in recovery language: plan the night so you don’t have to fight the night.</p>',
		},
		scenarios: [
			{
				title: 'Plan the night, don’t fight the night.',
				content:
					'<p>You usually met friends at the pub on Fridays, but now you’re focusing on recovery.</p><p><b>Proper → Be honest:</b><br />Pubs are a high-risk place right now.</p><p><b>Preparation →</b><br />Have alcohol-free drinks stocked at home and line up a safe activity.</p><p><b>Planning →</b><br />Tell your friends ahead you won’t be joining at the pub.</p><p><b>Prevents →</b><br />Stops you from getting caught off-guard.</p><p><b>Poor →</b><br />If you don’t think ahead, you might end up at the pub “just for one.”</p><p><b>Performance →</b><br />You stick to your plan, avoid cravings, and still enjoy Friday night.</p>',
				btnLabel: 'Plan to Cope',
			},
			{
				title: 'Stress ahead? Take the recovery detour.',
				content:
					'<p>Work stress hits hard, and in the past you’d cope by drinking or using.</p><p><b>Proper →</b><br />Admit stress is a trigger.</p><p><b>Preparation →</b><br />Practice breathing exercises or list healthy activities.</p><p><b>Planning →</b><br />Set reminders to take breaks.</p><p><b>Prevents →</b><br />Stops pressure building to relapse.</p><p><b>Poor →</b><br />Without a plan, stress pushes you off the road.</p><p><b>Performance →</b><br />You use healthy coping tools instead of falling back.</p>',
				btnLabel: 'The Stress Detour',
			},
		],
		cats: [],
		videos: [],
	},
	{
		id: 27,
		title: 'U.R.G.E.',
		content: {
			acronyms: [
				{ letter: 'U', meaning: 'Unwanted', definition: "<p>Acknowledge that these cravings suck and you didn't ask for them - but they're temporary visitors</p>", scenario: '' },
				{ letter: 'R', meaning: 'Reduce', definition: "<p>Find ways to turn down the volume on these urges - they don't have to be so loud</p>", scenario: '' },
				{ letter: 'G', meaning: 'Gradually', definition: '<p>This process takes time - be patient with yourself as the urges slowly lose their power</p>', scenario: '' },
				{ letter: 'E', meaning: 'Eliminate', definition: '<p>The ultimate goal - getting to a place where these urges rarely show up at all</p>', scenario: '' },
			],
			explanation: '<p>Your step-by-step plan for making cravings less frequent, less intense, and eventually obsolete.</p>',
		},
		scenarios: [
			{
				title: 'Cigarette Cravings',
				content:
					'<p><b>Unwanted:</b><br />Accept that nicotine cravings are normal and temporary.</p><p><b>Reduce:</b><br />Use breathing exercises, chew gum, take a walk.</p><p><b>Gradually:</b><br />Notice cravings becoming less frequent over weeks.</p><p><b>Eliminate:</b><br />Eventually go days, then weeks without thinking about smoking.</p>',
				btnLabel: 'Reduce Urges',
			},
			{
				title: 'Shopping Addiction Urges',
				content:
					"<p><b>Unwanted:</b><br />Acknowledge the urge to buy things you don't need is part of the addiction.</p><p><b>Reduce:</b><br />Uninstall shopping apps, make a list before going to stores, bring limited cash.</p><p><b>Gradually:</b><br />Practice sitting with the discomfort of wanting something.</p><p><b>Eliminate:</b><br />Find that shopping urges rarely occur.</p>",
				btnLabel: 'Control Impulses',
			},
		],
		cats: [],
		videos: [{ title: 'Urge Surfing Meditation', url: 'https://www.youtube.com/watch?v=dHzS_RBtnXE' }],
	},
	{
		id: 28,
		title: 'U.S.A',
		content: {
			acronyms: [
				{ letter: 'U', meaning: 'Unconditional', definition: "<p>You're worthy of love and respect just because you exist - no performance required</p>", scenario: '' },
				{ letter: 'S', meaning: 'Self', definition: '<p>This is about you as a whole person, not just your mistakes or achievements</p>', scenario: '' },
				{ letter: 'A', meaning: 'Acceptance', definition: '<p>Embracing yourself as you are right now, while still working toward who you want to become</p>', scenario: '' },
			],
			explanation: '<p>The foundation of lasting recovery - learning to be on your own team, especially when you mess up.</p>',
		},
		scenarios: [
			{
				title: 'After a Relapse',
				content:
					"<p><b>Unconditional:</b><br />Your worth doesn't decrease because you used again.</p><p><b>Self:</b><br />You're a complex person dealing with a difficult challenge, not just 'an addict.'</p><p><b>Acceptance:</b><br />Accept that you slipped while still believing <u>you can get back on track.</u></p>",
				btnLabel: 'Unconditional Self Acceptance',
			},
			{
				title: 'Comparing Yourself to Others',
				content:
					"<p><b>Unconditional:</b><br />Your value isn't determined by how you stack up against others.</p><p><b>Self:</b><br />Focus on your whole journey, not just where you are right now.</p><p><b>Acceptance:</b><br />Embrace your current progress while working <u>toward your goals without self-criticism.</u></p>",
				btnLabel: 'Comparing Yourself to Others',
			},
		],
		cats: [],
		videos: [{ title: 'Unconditional Self Acceptance (USA) Explained', url: 'https://www.youtube.com/watch?v=sgM32-FF6gA' }],
	},
	// {
	// 	id: 30,
	// 	title: "V.A.C.I", NEEDS INFO
	// 	content: {
	// 		acronyms: [
	// 			{letter: "U", meaning: "Unconditional", definition: "<p>You're worthy of love and respect just because you exist - no performance required</p>", scenario: ""},
	// 			{letter: "L", meaning: "Life", definition: "<p>NEED INFO</p>", scenario: ""},
	// 			{letter: "A", meaning: "Acceptance", definition: "<p>Embracing yourself as you are right now, while still working toward who you want to become</p>", scenario: ""},
	// 		],
	// 		explanation: "<p>The foundation of lasting recovery - learning to be on your own team, especially when you mess up.</p>",
	// 	},
	// 	scenarios: [
	// 		{
	// 			title: "After a Relapse",
	// 			content:
	// 				"<p><b>Unconditional:</b><br />Your worth doesn't decrease because you used again.</p><p><b>Self:</b><br />You're a complex person dealing with a difficult challenge, not just 'an addict.'</p><p><b>Acceptance:</b><br />Accept that you slipped while still believing <u>you can get back on track.</u></p>",
	// 			btnLabel: "Unconditional Self Acceptance",
	// 		},
	// 		{
	// 			title: "Comparing Yourself to Others",
	// 			content:
	// 				"<p><b>Unconditional:</b><br />Your value isn't determined by how you stack up against others.</p><p><b>Self:</b><br />Focus on your whole journey, not just where you are right now.</p><p><b>Acceptance:</b><br />Embrace your current progress while working <u>toward your goals without self-criticism.</u></p>",
	// 			btnLabel: "Comparing Yourself to Others",
	// 		},
	// 	],
	// 	cats: ["C.B.T", "D.B.T", "Emergency", "Grounding", "Assumptions", "Plans", "Urges", "Cravings", "Thoughts", "Emotions", "Mood", "Mental Health", "Anxiety", "Stress", "Depressed", "Low Mood"],
	// 	videos: [{title: "Unconditional Self Acceptance (USA) Explained", url: "https://www.youtube.com/watch?v=sgM32-FF6gA"}],
	// },
	// {
	// 	id: 30,
	// 	title: "U.L.A",
	// 	content: {
	// 		acronyms: [
	// 			{letter: "U", meaning: "Unconditional", definition: "<p>You're worthy of love and respect just because you exist - no performance required</p>", scenario: ""},
	// 			{letter: "L", meaning: "Life", definition: "<p>NEED INFO</p>", scenario: ""},
	// 			{letter: "A", meaning: "Acceptance", definition: "<p>Embracing yourself as you are right now, while still working toward who you want to become</p>", scenario: ""},
	// 		],
	// 		explanation: "<p>The foundation of lasting recovery - learning to be on your own team, especially when you mess up.</p>",
	// 	},
	// 	scenarios: [
	// 		{
	// 			title: "After a Relapse",
	// 			content:
	// 				"<p><b>Unconditional:</b><br />Your worth doesn't decrease because you used again.</p><p><b>Self:</b><br />You're a complex person dealing with a difficult challenge, not just 'an addict.'</p><p><b>Acceptance:</b><br />Accept that you slipped while still believing <u>you can get back on track.</u></p>",
	// 			btnLabel: "Unconditional Self Acceptance",
	// 		},
	// 		{
	// 			title: "Comparing Yourself to Others",
	// 			content:
	// 				"<p><b>Unconditional:</b><br />Your value isn't determined by how you stack up against others.</p><p><b>Self:</b><br />Focus on your whole journey, not just where you are right now.</p><p><b>Acceptance:</b><br />Embrace your current progress while working <u>toward your goals without self-criticism.</u></p>",
	// 			btnLabel: "Comparing Yourself to Others",
	// 		},
	// 	],
	// 	cats: ["C.B.T", "D.B.T", "Emergency", "Grounding", "Assumptions", "Plans", "Urges", "Cravings", "Thoughts", "Emotions", "Mood", "Mental Health", "Anxiety", "Stress", "Depressed", "Low Mood"],
	// 	videos: [{title: "Unconditional Self Acceptance (USA) Explained", url: "https://www.youtube.com/watch?v=sgM32-FF6gA"}],
	// },
	{
		id: 29,
		title: 'W.A.I.T.',
		content: {
			acronyms: [
				{ letter: 'W', meaning: 'Wait', definition: "<p>Hit the pause button - you don't have to react immediately to every feeling or situation</p>", scenario: '' },
				{ letter: 'A', meaning: 'Assess', definition: "<p>Look around and take stock - what's really happening here, and how are you feeling about it?</p>", scenario: '' },
				{ letter: 'I', meaning: 'Identify', definition: "<p>Name what you're dealing with - triggers, emotions, options - get clear on the situation</p>", scenario: '' },
				{ letter: 'T', meaning: 'Take', definition: '<p>Now make your move - but make it consciously, not impulsively</p>', scenario: '' },
			],
			explanation: "<p>Your emergency brake for impulsive moments - giving yourself space to make choices you'll actually feel good about later.</p>",
		},
		scenarios: [
			{
				title: 'Angry Text Message',
				content:
					"<p><b>Wait:</b><br />Don't respond immediately to your ex's nasty text.</p><p><b>Assess:</b><br />You're hurt and angry, but also in a good place in your recovery.</p><p><b>Identify:</b><br />This is a trigger situation, you have options like blocking them or talking to your sponsor.</p><p><b>Take:</b><br />Delete the mean response you typed and call your support person instead.</p>",
				btnLabel: 'Angry Text Message',
			},
			{
				title: 'Sudden Urge to Quit Your Job',
				content:
					"<p><b>Wait:</b><br />Don't storm into your boss's office after a bad meeting.</p><p><b>Assess:</b><br />You're frustrated with work but also stressed about money.</p><p><b>Identify:</b><br />This is anger and exhaustion talking, your options include talking to HR, looking for new jobs, or addressing specific issues.</p><p><b>Take:</b><br />Schedule a conversation with your supervisor for next week to discuss concerns professionally.</p>",
				btnLabel: 'Sudden Urge to Quit Your Job',
			},
		],
		cats: [],
		videos: [],
	},
]
export default data;
