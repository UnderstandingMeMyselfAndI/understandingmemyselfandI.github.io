import HandymanIcon from '@mui/icons-material/Handyman';
import {isTouchDevice} from '@/js/utils.js';
// import { title } from "process";
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
};

// ---------------------------------------------------------------
// Icon ids are fixed and should not be mutated as they are used as reference
//
const baseActivities = [
  {
    id: 0,
    url: 'introduction',
    title: 'Introduction',
    menu: true,
  },
  {
    id: 1,
    url: 'tools',
    title: 'Tools',
    menu: true,
  },
  {
    id: 2,
    url: 'days-counter',
    title: 'Days Counter',
    menu: true,
  },
  {
    id: 3,
    url: 'motivation',
    title: 'Motivation',
    menu: true,
  },
  {
    id: 4,
    url: 'inspiration',
    title: 'Inspiration',
    menu: true,
  },
  {
    id: 5,
    url: 'units-calculator',
    title: 'Units Calculator',
    menu: true,
  },
  {
    id: 6,
    url: 'wallpaper-gallery',
    title: 'Wallpapers',
    menu: true,
  },
  {
    id: 7,
    url: 'about',
    title: 'About',
    menu: true,
  },
  {
    id: 8,
    url: 'tour',
    title: 'Tour',
    menu: true,
  },
  {
    id: 9,
    url: 'search',
    title: 'Search',
    menu: true,
  },
  {
    id: 10,
    url: 'privacy',
    title: 'Your Privacy & Privacy Policy',
    menu: true,
  },
  {
    id: 11,
    url: 'ccpaprivacy',
    title: 'CCPA Privacy Policy',
    menu: true,
  },
  {
    id: 12,
    url: 'settings',
    title: 'Settings',
    menu: true,
  },
  {
    id: 13,
    url: 'lingo-and-phrases',
    title: 'Lingo & Phrases',
    menu: true,
  },
  {
    id: 14,
    url: 'share',
    title: 'Share',
    menu: true,
  },
  {
    id: 15,
    url: 'newsletter',
    title: 'Newsletter',
    menu: true,
  },
  {
    id: 16,
    url: 'install',
    title: 'Install Ummi',
    menu: true,
  },

  {
    id: 17,
    url: 'AcronymExlpained',
    title: 'Acronym Exlpained',
    menu: false,
  },

];
const activities = baseActivities.map((item) => ({
  ...item,
  icon: null, // add the sequential icon
}));

const strings = {
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
           '<b><span class="ummi">U</span></b>nderstanding <b><span class="ummi">M</span></b>e, <b><span class="ummi">M</span></b>yself, and <b><span class="ummi">I</span></b> <b><u class="yellow-ul ummi">(U.M.M.I)</u></b>, is your <b><u class="yellow">FREE</u> companion app.</b>',
          ],
        },
      {
          title: '',
          content: [
            'If you\'re <b>looking</b> for <u class="yellow-ul lrg yellow">information</u> about <b><u class="orange-ul">Alcohol Recovery </u></b> <br /><br /><br /><b><u class="yellow-ul lrg yellow">this app is for you.</u></b>',
            'If you\'re <b>learning</b> <b><u class="orange-ul">recovery tools</u></b> <br />at groups using <br /><u class="blue-ul"><b>ACT, CBT, DBT, REBT,</b> or <b>SMART</b> therapists?</u><br /><br /><br /><b><u class="yellow-ul lrg yellow">this app is for you.</u>.</b>',
            '<u class="white-ul"><b><span class="ummi">Ummi</span></b></u> was created because <u class="yellow-ul lrg"><b>the tools are great</b></u>.',
            'But <b class="yellow">remembering</b> them <u><b>can be hard</b></u>',
            '<u class="white-ul"><b><span class="ummi">Ummi</span></b></u> helps you <b><u class="blue-ul">find  tools</u></b> that work <b><u class="yellow">for you,</u></b> and <b><u>your journey</u></b>.',
            '<u class="light-blue">Completely</u> <b><u class="yellow-ul lrg">for free</b></u>'
          ],
        },
        {
          title: 'FEATURES:',
          icon: HandymanIcon,
          content: [
            'Explanations of <b><u class="yellow-ul">Addiction Recovery</u> <u>tools </u></b>.',
            '<u class="yellow-ul"><b>Scenarios</b></u> describing <u>when tools <b>could be useful</b></u>.',
            // 'Find tools <u>that work for you</u>.',
            '<u><b>Favourites</b></u> to <b>save tools</b> to <b><u class="yellow-ul light-blue">your own toolbox</u></b>.',
            // 'Easily to understand descriptions.',
            
            '<u class="yellow-ul"><b>Private Days Counter</b></u> to <u><b>track recovery</b></u>.',
            '<u><b class="yellow">Alcohol Units Calculator</b></u>.',
            '<u class="yellow-ul">Recovery <b>Lingo &amp; Phrases</b> explained.</u>.',
            '<b class="yellow">Quick Exit button.</b> <b><u class="yellow-ul">Leave fast</u></b> to Google.com<br /><b><u>Just in case it\'s needed.</b></u>',
            '<b>Complete privacy</b> <u>you control</u>. <b class="light-blue">Erase <u class="yellow-ul">all data</u></b>, <b><u >instantly</u>, <u class="yellow-ul yellow">at anytime</u></b>.',
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
      introduction: (isTouchDevice() ? "Tap" : "Click") + ' on a tool to learn more about it',
      description: [
        'These tools <br /><u class="yellow-ul"><b>might not </b></u>work <br />for<u><b class="yellow"> everbody.</b></u>',
        'They <u>could work</u><br /> for <b><u class="yellow">one person</u></b> <br />and <u class="yellow-ul">not the next</u>.',
        'But they <br /><u><b>have worked</b></u><br /> for <b><u class="yellow-ul">somebody</u></b>.',
        // "<u>Everbody's<br /> journey <br /></u><u><b class='yellow'>is different.</b></u>",
      ],
      content: [],
      cta: {
        title: 'The Tools',
        content: [
          'Find tools that are used in Recovery groups and classes.',
          'Save the ones that work for you to your toolbox.',
          'Try them out to see if they work for you.'],
           btn: {
            
            label: {
              unused:'See the tools',
              used:'See the tools',
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
            unused:'Set Dates',
            used:'View Dates',
          }
        }        
        
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
          'Calculate the Alcholic Units for standard measures and custom drink sizes and ABV.',
        ],
         btn: {
        
          label: {
            unused:'Use the Calculator',
            used:'View your Calculation',
          }
        },
      },
    },
    {
      name: 'install',
      title: 'Install',
      slug: '#install',
      url: '#install',
      htmlContent: [],

      cta: {
        title: 'Install Ummi',
        content: ['Install Ummi for quick access'],
        btn: {

          label: {
            unused:'Install ',
            used:'Install',
          }
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
        'Any data we send to our servers is encrypted and anonymised so it cannot be used to identify you and is used to improve the app.',
        '<b><u>We will never sell your data.</u></b>',
      ],
      btnLabel: '',
      cta: {
        title: 'We respect you<br />and your privacy',
        content: [
          'You are fully in control<br />of any data you provide.',
          'Visit Settings in the menu<br /> to remove it at any time',
        ],
        btnLabel: 'Privacy Policy',
        label: {
            unused:'Privacy Policy',
            used:'Privacy Policy',
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
            unused:'Settings',
            used:'',
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
};

export { cnf, activities, strings }; //strings activities;
