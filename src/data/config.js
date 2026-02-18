import HandymanIcon from '@mui/icons-material/Handyman'
// import { isTouchDevice } from '../js/utils.js'
const isTouchDevice = () => { return true;} 


const cnf = {
  appName: 'Ummi',
  appLogName: 'Understanding Me, Myself, and I',
  installDescription: 'Install the Ummi App',
  appDescription:
    'Understanding Me Myself & I (Ummi) is a companion app and website providing support for mental health, wellbeing, and addiction recovery. It provides quick access to tools and skills learnt in SMART, Cognitive Behavioural Therapy (CBT), Acceptance Commitment Therapy (ACT), Dialectical Behaviour Therapy (DBT) and other therapies.',
  logoURI: '/UmmiIcon2.svg',
  duration: {
    hide: {
      snackbar: 2000,
    },
    show: {},
    ani: {
      in: 350,
      out: 350,
    },
  },
  classes: {
    activity: {
      dormant: 'dormant',
      awake: 'show',
      hide: 'hide',
    },
  },
  sel: {
    activityContainer: '.activities',
    activityNode: '.activity',
  },
}

// ---------------------------------------------------------------
// Icon ids are fixed and should not be mutated as they are used as reference
//
export const baseActivities = [
  {
    id: -1,
    url: '',
    title: 'Home',
    menu: false,
    shortcuts:false,
    modal: false,
    conditions: [],
  },
  {
    id: 0,
    url: 'introduction',
    title: 'Introduction',
    menu: false,
    shortcuts:false,
    modal: false,
    conditions: [],
  },
  {
    id: 1,
    url: 'tools',
    title: 'Tools',
    menuPosition: 1,
    menu: true,
    shortcuts:true,
    modal: true,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 2,
    url: 'days-counter',
    title: 'Days Counter',
    menuPosition: 2,
    menu: true,
    shortcuts:true,
    modal: true,
    classes: 'new',
    anchorID: '',
    conditions: [{ state: 'daysCounterEnabled', value: true }],
  },
  {
    id: 3,
    url: 'motivation',
    title: 'Motivation',
    menuPosition: 8,
    menu: false,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 4,
    url: 'inspiration',
    title: 'Inspiration',
    menuPosition: 6,
    menu: false,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 5,
    url: 'units-calculator',
    title: 'Units Calculator',
    menuPosition: 3,
    menu: true,
    shortcuts:true,
    modal: true,
    classes: 'new',
    anchorID: '',
    conditions: [{ state: 'unitsCalculatorEnabled', value: true }],
  },
  {
    id: 6,
    url: 'wallpaper-gallery',
    title: 'Wallpapers',
    menuPosition: 4,
    menu: true,
    shortcuts:false,
    modal: true,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 7,
    url: 'about',
    title: 'About',
    menuPosition: 7,
    menu: false,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 8,
    url: 'tour',
    title: 'Tour',
    menuPosition: 6,
    menu: false,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 9,
    url: 'search',
    title: 'Search',
    menuPosition: 10,
    menu: false,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 10,
    url: 'privacy-policy',
    title: 'Privacy Policy',
    menuPosition: 16,
    menu: false,
    shortcuts:false,
    modal: true,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 11,
    url: 'ccpaprivacy',
    title: 'CCPA Privacy Policy',
    menuPosition: 16,
    menu: false,
    shortcuts:false,
    modal: true,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 12,
    url: 'settings',
    title: 'Settings',
    menuPosition: 18,
    menu: true,
    shortcuts:true,
    modal: true,
    classes: '',
    anchorID: '',
    conditions: [],
  },
  {
    id: 13,
    url: 'lingo-and-phrases',
    title: 'Lingo & Phrases',
    menuPosition: 2,
    menu: true,
    shortcuts:true,
    modal: false,
    classes: 'new',
    anchorID: 'lingo',
    conditions: [],
  },
  {
    id: 14,
    url: 'share',
    title: 'Share',
    menuPosition: 7,
    menu: true,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: 'share',
    conditions: [],
  },
  {
    id: 15,
    url: 'newsletter',
    title: 'Newsletter',
    menuPosition: 8,
    menu: false,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: 'newsletter',
    conditions: [],
  },
  {
    id: 16,
    url: 'install',
    title: 'Install Ummi',
    menuPosition: 7,
    menu: true,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: 'install',
    conditions: [
      { state: 'isInstalled', value: false },
      { state: 'isInstallable', value: true },
    ],
  },

  {
    id: 17,
    url: 'AcronymExlpained',
    title: 'Acronym Exlpained',
    menuPosition: 20,
    menu: false,
    shortcuts:false,
    modal: true,
    classes: '',
    anchorID: '',
    conditions: [],
  },

  {
    id: 18,
    url: 'footer',
    title: 'Footer',
    menuPosition: 20,
    menu: false,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: 'footer',
    conditions: [],
  },

  {
    id: 19,
    url: 'header',
    title: 'Header',
    menuPosition: 20,
    menu: false,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: 'header',
    conditions: [],
  },

  {
    id: 20,
    url: 'your-privacy-cta',
    title: 'Your Privacy',
    menuPosition: 20,
    menu: false,
    shortcuts:false,
    modal: false,
    classes: '',
    anchorID: 'your-privacy-cta',
    conditions: [],
  },
  {
    id: 21,
    url: 'recovery-timeline',
    title: 'Recovery Timeline',
    menuPosition: 3,
    menu: true,
    shortcuts:true,
    modal: true,
    classes: 'new',
    anchorID: '',
    conditions: [],
  },
  {
    id: 22,
    url: 'wheel-of-life',
    title: 'Wheel of Life',
    menuPosition: 3,
    menu: true,
    shortcuts:true,
    modal: true,
    classes: 'new',
    anchorID: '',
    conditions: [],
  },
  {
    id: 23,
    url: 'recovery-quiz',
    title: 'The BIG Recovery Quiz!',
    menuPosition: 3,
    menu: true,
    shortcuts: true,
    modal: true,
    classes: 'new',
    anchorID: '',
    conditions: [],
  },
]
const activities = baseActivities.map((item) => ({
  ...item,
  icon: null, // add the sequential icon
}))

const strings = {
  app: {
    appName: 'Ummi',
    title: 'Understanding Me, Myself, and I',
    installDescription: 'Install the Ummi App',
    appDescription:
      'Understanding Me Myself & I (Ummi) is a companion app and website providing support for addiction recovery, mental health, and wellbeing. It provides quick access to tools and skills learnt in SMART, Cognitive Behavioural Therapy (CBT), Acceptance Commitment Therapy (ACT), Dialectical Behaviour Therapy (DBT) and other therapies.',
    logoURI: '/UmmiIcon2.svg',
  },
  activity: [
    {
      name: 'introduction',
      url: 'introduction',
      slug: 'introduction',
      title: 'Hey',

      content: [
        {
          title: '',
          classes: 'ummi-blue',
          content: [
            '<div class="circle-bg"></div><b><span class="orange">U</span></b>nderstanding <b><span class="orange">M</span></b>e, <b><span class="orange">M</span></b>yself, and <b><span class="orange">I</span></b> <b><u class="yellow-ul ummi">(U.M.M.I)</u></b>, is your <b><u class="yellow">FREE</u> companion app</b>',
          ],
        },
        {
          title: '',
          content: [
            'If you\'re <b>looking</b> for <u class="yellow-ul lrg yellow">information</u> about <b><u class="orange-ul">Alcohol Recovery </u></b>',
            '<b class="taify">this app is for <span>you</span</b>',
            'If you\'re <b>learning</b> <b><u class="orange-ul">recovery tools</u></b> <br />at groups using <br /><u class="blue-ul"><b>ACT, CBT, DBT, REBT,</b> or <b>SMART</b> therapies?</u>',
            '<b class="taify">this app is for <span>you </span></b>',
            'Looking to see <b><u class="blue-ul yellow">which tools can help</u></b> <b><u class="blue-ul">in recovery?</u>?</b>',
            '<b class="taify">this app is for  <span>you </span></b>',
            'Want to <b><u class="blue-ul yellow">track</u></b> <b><u class="blue-ul">your <span class="orange">recovery progress</span></u>?</b>',
            '<b class="taify">this app is for  <span>you </span></b>',
            'Want to <u class="blue-ul yellow"><b>plan your recovery</b></u> or just<b><u class="orange-ul"> find out more </u></b>',
            '<b class="taify">this app is for  <span>you </span></b>',
            'Wondering what some <u class="blue-ul yellow"><b>Lingo or Phrases</b></u> used in a group means?',
            '<b class="taify">this app is for  <span>you </span></b>',
            '<div class="circle-bg"></div><u class="white-ul"><b><span class="ummi">Ummi</span></b></u> was created because <u class="yellow-ul lrg"><b>the tools</b></u> and <u class="yellow-ul lrg"><b class="yellow">the way they are taught</b></u> in groups <u class="blue-ul "><b>is great</b></u>',
            'But <b class="yellow">remembering</b> them <u><b>can be hard</b></u>',
            '<div class="circle-bg"></div><u class="white-ul"><b><span class="ummi">Ummi</span></b></u> helps you <b><u class="blue-ul">find tools</u></b> that <b><u class="yellow">work for you,</u></b> and <b><u class="yellow">your journey</u></b>.<br />Making them <u class="blue-ul "><b>easily accessible</b></u> <u class="yellow-ul"><b>on your device</b></u>',
            '<u class="light-blue">Completely</u> <br /><b><u class="yellow-ul lrg">for free</b></u>',
          ],
        },
        {
          title: 'FEATURES:',
          icon: HandymanIcon,
          content: [
            '<b class="yellow">Explanations</b> of <b><u class="yellow-ul">Addiction Recovery</u> <u>tools </u></b>',
            '<u class="yellow-ul yellow"><b>Scenarios</b></u> describing <u>when tools <b>could be useful</b></u>',
            // 'Find tools <u>that work for you</u>.',
            '<u><b class="yellow">Favourites</b></u> to <b>save tools</b> to <b><u class="yellow-ul light-blue">your own toolbox</u></b>',
            // 'Easily to understand descriptions.',
            '<u class="yellow-ul yellow"><b>Recovery timeline</b></u> covering the <b><u class="blue-ul">days before detox</u></b>, <b><u class="orange-ul light-blue">during detox</u></b>, and through the <b><u class="yellow-ul">first year of recovery</u></b>',
            '<u class="yellow-ul yellow"><b>Private Days Counter</b></u> to <u><b>track recovery</b></u>',
            '<u><b class="yellow">Alcohol Units Calculator</b></u> to help <u><b>plan recovery</b></u>',
            '<u class="yellow-ul">Recovery <b class="yellow">Lingo &amp; Phrases</b> explained</u>',
            '<u><b class="yellow">Wheel of Life</b></u> for keeping a <b><u class="yellow-ul">healthy life balance</u><b>',
            '<u class="blue-ul"><b class="yellow">Quick Exit button.</b></u> <b><u class="yellow-ul">Leave fast</u></b> to Google.com<br /><b><u>Just in case it\'s needed</b></u>',
            '<b class="yellow">Complete privacy</b> <u>you control</u>. <b class="light-blue">Erase <u class="yellow-ul">all data</u></b>, <b><u >instantly</u>, <u class="yellow-ul yellow">at anytime</u></b>',
            '',
          ],
        },
      ],
      installed: {
        content: [
          {
            title: 'Welcome back!',
            classes: 'ummi-blue',
            content: [
              "How's it going?",
              "Recovery is tough work so if you're working at it, keep holding it down and stacking the wins.",
              'Struggling?<br /><b>"Play the tape forward"</b><br /> helps some people to get out of a rut. ',
              'It\'s in <a href="tools"><b>Lingo & Phrases</b></a><br /> below tools below.',
              'Stay strong and<br /> hang on in there.👊🏼',
            ],
          },
        ],
      },
      returning: {
        content: {
          title: 'Welcome back!',
          titles: [
            'Welcome back',
            'Hey there',
            "You're back!",
            'Ace to see you',
            'Hello',
            'Welcome',
            'Hey',
            'Hello',
            'Hi, you good?',
            'Good to see you',
            'Great to see you',
          ],
          classes: 'ummi-blue',
          content: [],
          contents: [
            "🔎Looking for Recovery tools?👀 <br /><br />👍 You're in the right place.✔<br /><br /> 👊🏾👇Check them out below👇👊",
            "👋It's great to see you again😎🫵",
            "👋You're in good Company😎🫵",
            "👋You're back, that's ace👋 <br />All the solid ones do👊",
            "🫵Hope you're doing🫵<br /> well today<br /> 🏆champ.🏆 <br /><br /> 👇 Check out some 👇<br />🛠️ tools 🛠️<br />and keep up your game💪",
            '🥾Working hard on 🥾<br /> your recovery?🫶🏻<br /><br />🏋️‍♂️Stay strong🏋🏿‍♂️<br /><br /><u>🫵You are worth it💪🏼</u>',
            '👉Pushing through Recovery?<br /><br /> 🤜Keep crushing those🤛 <br />gremlins like a boss.😎',
            '⛐Struggling with<br /> your Recovery?🚘<br /><br />🫸🏻 Keep pushing 🏋️,<br /> the future you🫵<br /> 🤝🏻 will thank you for it.👊',
            "⛐Grafting at your Recovery?🚘<br /><br /> <b>🏋️‍♂️Stay strong🏋🏿‍♂️.<br />👊You've got this.</b> 👊🏿",
            '🏋🏿‍♂️Working your recovery?🏋🏿‍♂️<br /><br />💪 Keep bossing it like<br /> 🏆the champ you are 🏆',
            '😎Bossing your Recovery?🏋🏿‍♂️<br /><br />🏋🏿‍♂️ Stay strong🏋️‍♂️<br /> and<br />🏋🏿‍♂️ keep crushing it👌 ',
            "⛐Keeping it steady⛐<br /> 🚘in recovery?🚘<br /><br /><u>You're back again<br /></u>👊<u> so keep bossing it</u>👊🏾",
            '🫵Working on the better you?🫵<br /><br /> Keep owning it like<br /> the 🏆champ🏆 you are 👌',
            '🏋️‍♂️Working at being<br /> a better you?🫵<br /><br />Keep smashing it<br /> like a ✨ star⭐',
            "🏋️‍♂️Grafting to keep💪 <br />👿the gremlins at bay?☹<br /><br />🢁Keep going🢁.<br /><br />👊🏼 You've got this👌",
          ],
        },
      },
    },
    {
      name: 'tools',
      slug: '#recovery-tools',
      url: 'recovery-tools',
      title: 'The Tools',
      introduction:
        (isTouchDevice() ? 'Tap' : 'Click') +
        ' on a tool to learn more about it',
      description: [
        'These tools <u class="yellow-ul"><b>might not </b></u>work for<u><b class="yellow"> everbody.</b></u>',
        'They <u>could work</u> for <b><u class="yellow">one person</u></b> and <u class="yellow-ul">not the next</u>.',
        'But they <u><b>have worked</b></u> for <b><u class="yellow-ul">somebody</u></b>.',
        // "<u>Everbody's<br /> journey <br /></u><u><b class='yellow'>is different.</b></u>",
      ],
      content: [],
      cta: {
        title: 'The Tools',
        content: [
          'Find tools that are used in Recovery Groups and Classes.',
          'Save the ones that work for you to your own toolbox.',
        ],
        btn: {
          label: {
            unused: 'View the tools',
            used: 'View the tools',
          },
        },
      },
    },
    {
      name: 'videos',
      title: 'Videos',
      content: [],
    },

    {
      name: 'DaysCounter',
      title: 'Days Counter',
      slug: 'days-counter',
      url: 'days-counter',
      btnLabel: 'Days Counter',
      content: [],
      cta: {
        title: 'Days Counter',
        content: [
          'Track your progress and remind yourself how far you have come.',
          'Click the button below to start counting days.',
        ],
        btn: {
          label: {
            unused: 'Set Dates',
            used: 'View Dates',
          },
        },
      },
    },
    {
      name: 'UnitsCalculator',
      title: 'Units Calculator',
      slug: 'units-calculator',
      url: 'units-calculator',
      btnLabel: 'Units Calculator',
      content: [],
      cta: {
        title: 'Units Calculator',
        content: [
          'Calculate the Alcoholic Units for standard measures and custom drink sizes and ABV.',
        ],
        btn: {
          label: {
            unused: 'Calculate Units',
            used: 'View your Calculation',
          },
        },
      },
    },
    {
      name: 'The BIG Recovery Quiz',
      title: 'The BIG Recovery Quiz',
      slug: 'recovery-quiz',
      url: 'recovery-quiz',
      btnLabel: 'Recovery Quiz',
      content: [],
      cta: {
        title: 'The BIG Recovery Quiz',
        content: [
          'How much do you know about the recovery process and tools?. ',
          'Nothing? All of it? Either way, it\'s a great way to test your knowledge and learn something new.',
          'With three difficulty levels to choose from, there\'s something for everyone and nobody noting down scores.',
          'Unfortunately, there\'s no losers in this quiz, as only winners use tools like Ummi for their recovery!',
        ],
        btn: {
          label: {
            unused: 'Play the Quiz',
            used: 'Play the Quiz',
          },
        },
      },
    },
    {
      name: 'install',
      title: 'Install',
      slug: 'install',
      url: '#install',
      anchorID: '#install',
      htmlContent: [],

      cta: {
        title: 'Install Ummi',
        content: ['Install Ummi for quick access'],
        btn: {
          label: {
            unused: 'Install ',
            used: 'Install',
          },
        },
        postInstall: {
          title: 'Thanks!',
          content: [
            "Thanks for installing Ummi. It's now accessible on your device.",
          ],
        },
      },
    },
    {
      name: 'privacy',
      slug: 'privacy',
      url: 'privacy',
      title: 'We respect you<br />and your privacy',
      content: [
        'Any personal data you provide to us is stored <b><u>only on your device.</u></b>',
        'You can remove the data at anytime.',
        'Any data sent externally of your device is encrypted and anonymised so it cannot be used to identify you. This data is for analytics and is used to improve the app.',
        '<b><u>We will never sell your data.</u></b>',
      ],
      btnLabel: '',
      cta: {
        title: 'We respect you<br />and your privacy',
        content: [
          "You are fully in control<br />of any data you provide whilst using Ummi and it's features.",
          'Some features can be used then hidden and shown to suit your needs.',
          'Visit Settings to see the features or to remove your data at any time',
        ],
        btnLabel: 'Privacy Policy',
        label: {
          unused: 'Privacy Policy',
          used: 'Privacy Policy',
        },
      },
    },
    {
      name: 'wallpapers',
      title: 'Motivational Wallpapers',
      slug: 'wallpapers',
      url: 'wallpapers',
      anchorID: '',
      htmlContent: ['Download for free'],

      cta: {
        btnLabel: 'Wallpapers',
        title: 'Motivational Wallpapers',
        content: [
          'View our <b>gallery of motivational wallpapers</b> and <b class="yellow">download them for free</b> straight to your device.',
        ],
        btn: {
          label: {
            unused: 'View wallpapers ',
            used: 'Install',
          },
        },
      },
    },
    {
      name: 'yourData',
      title: 'Your Data',
      content: [],
      btnLabel: 'Manage Your Data',
      cta: {
        title: 'Manage your data',
        content: [
          'Any data you provide is stored<br /> only on your device.<br />You can remove the data at anytime.',
          '<b><u>We will never sell your data.</u></b>',
        ],
      },
    },
    {
      name: 'settings',
      title: 'Settings',
      slug: 'settings',
      url: 'settings',
      id: 14,
      content: [],
      btnLabel: 'Settings',
      cta: {
        title: '',
        content: [''],
        label: {
          unused: 'Settings',
          used: '',
        },
      },
    },
    {
      name: 'recovery-timeline',
      title: 'Detox &amp; Recovery Timeline',

      slug: 'recovery-timeline',
      url: 'recovery-timeline',
      anchorID: '',
      content: [
        'The timeline provides support information describing the emotional and physical recovery process. ',
        'Everybody is different so not everyone will experience the same symptoms during the process.',
        '<b>Scroll down to explore the timeline</b>',
      ],
      confirm: {
        title: 'Detox &amp; Recovery Timeline',
        instruction:
          '<p>The information provided in the Recovery Timeline is for <u><b>support purposes only</b></u> and should not be considered as <b><u>advice</u></b>. </p><p>If you are seeking <b><u>medical or recovery advice</u></b> please consult a qualified professional such as a <b><u class="yellow-ul">key worker or medical professional</u></b>.</p>',
        confirmBtnLabel: "I understand <br />let's go",
        cancelBtnLabel: 'Get me <br />out of here',
      },

      cta: {
        title: 'Recovery Timeline',
        content: [
          'The Detox and Recovery Timeline is a support tool to help you understand the recovery journey.',
        ],
        btn: {
          label: {
            unused: 'Recovery Timeline ',
            used: 'Recovery Timeline',
          },
        },
      },
    },
    {
      name: 'wheel-of-life',
      title: 'The Wheel of Life',

      slug: 'wheel-of-life',
      url: 'wheel-of-life',
      anchorID: '',
      content: ['The Wheel of Life content to go here'],
      confirm: {
        title: 'Show me The Wheel of Life',
        instruction: '',
        confirmBtnLabel: "I understand <br />let's go",
        cancelBtnLabel: 'Get me <br />out of here',
      },

      cta: {
        title: 'Wheel of Life',
        content: [
          'Assess your life balance and find areas that could need work.',
          'Save wheels over time and see how your hard work is paying off.',
        ],
        btn: {
          label: {
            unused: 'The Wheel of Life',
            used: 'The Wheel of Life',
          },
        },
      },
    },
  ],
  toolbox: {
    added: 'Added to your toolbox',
    removed: 'Removed from your toolbox',
    emergency: {
      added: 'Added to your emergency toolbox',
      removed: 'Removed from your emergency toolbox',
    },
  },
  tools: {
    list: {
      unfiltered: 'Showing ALL tools',
      yourToolsFiltered: 'Showing YOUR tools', //"Showing only the tools you selected"
    },
  },
}

export { cnf, activities, strings } //strings activities;
