// import HandymanIcon from '@mui/icons-material/Handyman'
// import { isTouchDevice } from '../js/utils.js'
// export const isTouchDevice = () => {
//   return true
// }

import DoneIcon from "@mui/icons-material/Done"
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import LayersIcon from "@mui/icons-material/Layers"

const cnf = {
  appName: "Ummi",
  appLogName: "Understanding Me, Myself, and I",
  installDescription: "Install the Ummi App",
  appDescription:
    "Understanding Me Myself & I (Ummi) is a companion app and website providing support for mental health, wellbeing, and addiction recovery. It provides quick access to tools and skills learnt in SMART, Cognitive Behavioural Therapy (CBT), Acceptance Commitment Therapy (ACT), Dialectical Behaviour Therapy (DBT) and other therapies.",
  logoURI: "/UmmiIcon2.svg",
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
      dormant: "dormant",
      awake: "show",
      hide: "hide",
    },
  },
  sel: {
    activityContainer: ".activities",
    activityNode: ".activity",
  },
}

import { activities } from "./activities.js"

const strings = {
  app: {
    appName: "Ummi",
    title: "Understanding Me, Myself, and I",
    installDescription: "Install the Ummi App",
    appDescription:
      "Understanding Me Myself & I (Ummi) is a companion app and website providing support for addiction recovery, mental health, and wellbeing. It provides quick access to tools and skills learnt in SMART, Cognitive Behavioural Therapy (CBT), Acceptance Commitment Therapy (ACT), Dialectical Behaviour Therapy (DBT) and other therapies.",
    logoURI: "/UmmiIcon2.svg",
  },
  activity: [
    {
      name: "introduction",
      url: "introduction",
      slug: "introduction",
      title: "Hey",

      content: [
        {
          title: "",
          classes: "ummi-blue",
          content: [
            '<div class="circle-bg"></div><b><span class="orange">U</span></b>nderstanding <b><span class="orange">M</span></b>e, <b><span class="orange">M</span></b>yself, and <b><span class="orange">I</span></b> <b><u class="yellow-ul ummi">(U.M.M.I)</u></b>, is your <b><u class="yellow">FREE</u> companion app</b>',
          ],
        },
        {
          title: "",
          content: [
            'If you\'re <b>looking</b> for <u class="yellow-ul lrg yellow">information</u> about <b><u class="orange-ul">Alcohol Recovery </u></b>',
            '<b class="taify">this app is for <span>you</span</b>',
            'If you\'re <b>learning</b> <b><u class="orange-ul">recovery tools</u></b> <br />at groups using <br /><u class="blue-ul"><b>ACT, CBT, DBT, REBT,</b> or <b>SMART</b> therapies?</u>',
            '<b class="taify">this app is for <span>you </span></b>',
            // 'Looking to see <b><u class="blue-ul yellow">which tools can help</u></b> <b><u class="blue-ul">in recovery?</u>?</b>',
            // '<b class="taify">this app is for  <span>you </span></b>',
            // 'Want to <b><u class="blue-ul yellow">track</u></b> <b><u class="blue-ul">your <span class="orange">recovery progress</span></u>?</b>',
            // '<b class="taify">this app is for  <span>you </span></b>',
            'Want to <u class="blue-ul yellow"><b>plan your recovery</b></u> or just<b><u class="orange-ul"> find out more </u></b>',
            '<b class="taify">this app is for  <span>you </span></b>',
            // 'Wondering what some <u class="blue-ul yellow"><b>Lingo or Phrases</b></u> used in a group means?',
            // '<b class="taify">this app is for  <span>you </span></b>',
            // '<div class="circle-bg"></div><u class="white-ul"><b><span class="ummi">Ummi</span></b></u> was created because <u class="yellow-ul lrg"><b>the tools</b></u> and <u class="yellow-ul lrg"><b class="yellow">the way they are taught</b></u> in groups <u class="blue-ul "><b>is great</b></u>',
            // 'But <b class="yellow">remembering</b> them <u><b>can be hard</b></u>',
            // '<div class="circle-bg"></div><u class="white-ul"><b><span class="ummi">Ummi</span></b></u> helps you <b><u class="blue-ul">find tools</u></b> that <b><u class="yellow">work for you,</u></b> and <b><u class="yellow">your journey</u></b>.<br />Making them <u class="blue-ul "><b>easily accessible</b></u> <u class="yellow-ul"><b>on your device</b></u>',
            // '<u class="light-blue">Completely</u> <br /><b><u class="yellow-ul lrg">for free</b></u>',
          ],
        },
        {
          title: "FEATURES:",
          icon: "HandymanIcon",
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
            "",
          ],
        },
      ],
      installed: {
        content: [
          {
            title: "Welcome back!",
            classes: "ummi-blue",
            content: [
              "How's it going?",
              "Recovery is tough work so if you're working at it, keep holding it down and stacking the wins.",
              'Struggling?<br /><b>"Play the tape forward"</b><br /> helps some people to get out of a rut. ',
              'It\'s in <a href="tools"><b>Lingo & Phrases</b></a><br /> below tools below.',
              "Stay strong and<br /> hang on in there.👊🏼",
            ],
          },
        ],
      },
      returning: {
        content: {
          title: "Welcome back!",
          titles: [
            "Welcome back",
            "Hey there",
            "You're back!",
            "Ace to see you",
            "Hello",
            "Welcome",
            "Hey",
            "Hello",
            "Hi, you good?",
            "Good to see you",
            "Great to see you",
          ],
          classes: "ummi-blue",
          content: [],
          contents: [
            "🔎Looking for Recovery tools?👀 <br /><br />👍 You're in the right place.✔<br /><br /> 👊🏾👇Check them out below👇👊",
            "👋It's great to see you again😎🫵",
            "👋You're in good Company😎🫵",
            "👋You're back, that's ace👋 <br />All the solid ones do👊",
            "🫵Hope you're doing🫵<br /> well today<br /> 🏆champ.🏆 <br /><br /> 👇 Check out some 👇<br />🛠️ tools 🛠️<br />and keep up your game💪",
            "🥾Working hard on 🥾<br /> your recovery?🫶🏻<br /><br />🏋️‍♂️Stay strong🏋🏿‍♂️<br /><br /><u>🫵You are worth it💪🏼</u>",
            "👉Pushing through Recovery?<br /><br /> 🤜Keep crushing those🤛 <br />gremlins like a boss.😎",
            "⛐Struggling with<br /> your Recovery?🚘<br /><br />🫸🏻 Keep pushing 🏋️,<br /> the future you🫵<br /> 🤝🏻 will thank you for it.👊",
            "⛐Grafting at your Recovery?🚘<br /><br /> <b>🏋️‍♂️Stay strong🏋🏿‍♂️.<br />👊You've got this.</b> 👊🏿",
            "🏋🏿‍♂️Working your recovery?🏋🏿‍♂️<br /><br />💪 Keep bossing it like<br /> 🏆the champ you are 🏆",
            "😎Bossing your Recovery?🏋🏿‍♂️<br /><br />🏋🏿‍♂️ Stay strong🏋️‍♂️<br /> and<br />🏋🏿‍♂️ keep crushing it👌 ",
            "⛐Keeping it steady⛐<br /> 🚘in recovery?🚘<br /><br /><u>You're back again<br /></u>👊<u> so keep bossing it</u>👊🏾",
            "🫵Working on the better you?🫵<br /><br /> Keep owning it like<br /> the 🏆champ🏆 you are 👌",
            "🏋️‍♂️Working at being<br /> a better you?🫵<br /><br />Keep smashing it<br /> like a ✨ star⭐",
            "🏋️‍♂️Grafting to keep💪 <br />👿the gremlins at bay?☹<br /><br />🢁Keep going🢁.<br /><br />👊🏼 You've got this👌",
          ],
        },
      },
    },
    {
      name: "tools",
      slug: "#recovery-tools",
      url: "recovery-tools",
      title: "The Tools",
      // introduction: (isTouchDevice() ? 'Tap' : 'Click') + ' on a tool to learn more about it',
      introduction: "Tap on a tool to read about it <br />and add them to your toolbox",
      description: [
        'These tools <u class="yellow-ul"><b>might not </b></u>work for<u><b class="yellow"> everbody.</b></u>',
        // 'They <u>could work</u> for <b><u class="yellow">one person</u></b> and <u class="yellow-ul">not the next</u>.',
        'But they <u><b>have worked</b></u> for <b><u class="yellow-ul">somebody</u></b>.',
        "<u>Everbody's<br /> journey <br /></u><u><b class='yellow'>is different.</b></u>",
      ],
      content: [],
      cta: {
        title: "The Tools",
        content: [
          "Find tools that are used in Recovery Groups and Classes.",
          "Save the ones that work for you and create your own recovery toolbox.",
        ],
        btn: {
          label: {
            unused: "View the tools",
            used: "View the tools",
          },
        },
      },
    },
    {
      name: "videos",
      title: "Videos",
      content: [],
    },

    {
      name: "DaysCounter",
      title: "Days Counter",
      slug: "days-counter",
      url: "days-counter",
      btnLabel: "Days Counter",
      content: {},
      counter: {
        placeholders: {
          name: "Enter Counter Name",
        },
        labels: {
          daily_amount: "Daily Cost",
          total_saved: "saved",
          week: "Per Week",
          month: "Per Month",
          year: "Per Year",
        },
        add: "Add Counter",
        delete: {
          confirm_delete: {
            title: "Delete Counter",
            msg: "Are you sure you want to delete this counter?",
          },
        },
      },

      cta: {
        title: "Days Counter",
        content: [
          "Track your progress and remind yourself how far you have come.",
          "Click the button below to start counting days.",
        ],
        btn: {
          label: {
            unused: "Set Dates",
            used: "View Dates",
          },
        },
      },
    },
    {
      name: "UnitsCalculator",
      title: "Units Calculator",
      slug: "units-calculator",
      url: "units-calculator",
      btnLabel: "Units Calculator",
      content: [],
      cta: {
        title: "Units Calculator",
        content: ["Calculate the Alcoholic Units for standard measures and custom drink sizes and ABV."],
        btn: {
          label: {
            unused: "Calculate Units",
            used: "View your Calculation",
          },
        },
      },
    },
    {
      name: "The BIG Recovery Quiz",
      title: "The BIG Recovery Quiz",
      slug: "recovery-quiz",
      url: "recovery-quiz",
      btnLabel: "Recovery Quiz",
      content: [],
      cta: {
        title: "The BIG Recovery Quiz",
        content: [
          "How much do you know about the recovery process and tools?. ",
          "Nothing? All of it? Either way, it's a great way to test your knowledge and learn something new.",
          "With three difficulty levels to choose from, there's something for everyone and nobody noting down scores.",
          "Unfortunately, there's no losers in this quiz, as only winners use tools like Ummi for their recovery!",
        ],
        btn: {
          label: {
            unused: "Play the Quiz",
            used: "Play the Quiz",
          },
        },
      },
    },
    {
      name: "install",
      title: "Install",
      slug: "install",
      url: "#install",
      anchorID: "#install",
      htmlContent: [],

      cta: {
        title: "Install Ummi",
        content: ["Install Ummi for quick access"],
        btn: {
          label: {
            unused: "Install ",
            used: "Install",
          },
        },
        postInstall: {
          title: "Thanks!",
          content: ["Thanks for installing Ummi. It's now accessible on your device."],
        },
      },
    },
    {
      name: "privacy",
      slug: "privacy",
      url: "privacy",
      title: "We respect you<br />and your privacy",
      content: [
        "Any personal data you provide to us is stored <b><u>only on your device.</u></b>",
        "You can remove the data at anytime.",
        "Any data sent externally of your device is encrypted and anonymised so it cannot be used to identify you. This data is for analytics and is used to improve the app.",
        "<b><u>We will never sell your data.</u></b>",
      ],
      btnLabel: "",
      cta: {
        title: "We respect you<br />and your privacy",
        content: [
          "You are fully in control<br />of any data you provide whilst using Ummi and it's features.",
          "Some features can be used then hidden and shown to suit your needs.",
          "Visit Settings to see the features or to remove your data at any time",
        ],
        btnLabel: "Privacy Policy",
        label: {
          unused: "Privacy Policy",
          used: "Privacy Policy",
        },
      },
    },
    {
      name: "wallpapers",
      title: "Motivational Wallpapers",
      slug: "wallpapers",
      url: "wallpapers",
      anchorID: "",
      htmlContent: ["Download for free"],

      cta: {
        btnLabel: "Wallpapers",
        title: "Motivational Wallpapers",
        content: [
          'View our <b>gallery of motivational wallpapers</b> and <b class="yellow">download them for free</b> straight to your device.',
        ],
        btn: {
          label: {
            unused: "View wallpapers ",
            used: "Install",
          },
        },
      },
    },
    {
      name: "yourData",
      title: "Your Data",
      content: [],
      btnLabel: "Manage Your Data",
      cta: {
        title: "Manage your data",
        content: [
          "Any data you provide is stored<br /> only on your device.<br />You can remove the data at anytime.",
          "<b><u>We will never sell your data.</u></b>",
        ],
      },
    },
    {
      name: "settings",
      title: "Settings",
      slug: "settings",
      url: "settings",
      id: 14,

      btnLabel: "Settings",
      cta: {
        title: "",
        content: [""],
        label: {
          unused: "Settings",
          used: "",
        },
      },
      content: {
        section: {
          title: "Your privacy is very important to us.",
          content:
            '<p>For complete privacy you can show and hide all features listed below.</p>\
          <p>Uncheck the box next to a feature to hide it everywhere in the app.</p>\
          <p>Your data is not affected.</p>\
          <p>\
            To clear your data, use the <b>"Clear your data"</b> button at the bottom of this screen.\
          </p>',
        },
      },

      actions: {
        data: {
          delete: {
            title: "Confirm Clear Data",
            msg: "Are you sure you want to clear all data?<br /><br />This will reset some settings to their default values and cannot be undone.",
            buttons: {
              confirm: "Yes",
              cancel: "Cancel",
            },
            confirm: {
              title: "Data Cleared",
              msg: "All data has been permanently cleared.",
              buttons: {
                confirm: "Close",
                cancel: "",
              },
            },
          },
        },
        buttons: {
          closeActivity: "Close",
          deleteData: "Clear Your Data",
          footer: "",
        },
      },
    },
    {
      name: "recovery-timeline",
      title: "Detox &amp; Recovery Timeline",
      slug: "recovery-timeline",
      url: "recovery-timeline",
      anchorID: "",
      content: [
        "The timeline provides support information describing the emotional and physical recovery process. ",
        "Everybody is different so not everyone will experience the same symptoms during the process.",
        "<b>Scroll down to explore the timeline</b>",
      ],
      confirm: {
        title: "Detox &amp; Recovery Timeline",
        instruction:
          '<p>The information provided in the Recovery Timeline is for <u><b>support purposes only</b></u> and should not be considered as <b><u>advice</u></b>. </p><p>If you are seeking <b><u>medical or recovery advice</u></b> please consult a qualified professional such as a <b><u class="yellow-ul">key worker or medical professional</u></b>.</p>',
        confirmBtnLabel: "I understand <br />let's go",
        cancelBtnLabel: "Get me <br />out of here",
      },

      cta: {
        title: "Recovery Timeline",
        content: ["The Detox and Recovery Timeline is a support tool to help you understand the recovery journey."],
        btn: {
          label: {
            unused: "Recovery Timeline ",
            used: "Recovery Timeline",
          },
        },
      },
    },
    {
      name: "wheel-of-life",
      title: "Wheel of Life",

      slug: "wheel-of-life",
      url: "wheel-of-life",
      anchorID: "",
      content: {
        instructions: {
          title: "How to use the Wheel of Life",
          content: [
            {
              title: "Life Balance",
              content: "",
              html: (
                <div>
                  The Wheel of Life is <strong>a visual heads-up</strong> of your life balance.
                </div>
              ),
            },
            {
              title: "",
              content: "",
              html: (
                <div>
                  The wheel, and if wheels are saved, provide a
                  <strong> visualization of life balance over time.</strong>
                </div>
              ),
            },

            {
              title: "",
              content: "",
              html: (
                <div>
                  Use the wheels to <strong>think about areas of of life</strong>, and give them a score at that point
                  in time.
                </div>
              ),
            },
            {
              title: "Visualizing",
              content: "Once all areas are scored, a shape will connect them, visualizing the current life balance.",
            },
            {
              title: "Scoring",
              content:
                "Click on any segment to rate that area of life from 0 (center) to 10 (outer edge). With 10 being the best it can be and 0 the worse.",
            },

            {
              title: "Saving",
              content: "",
              html: (
                <div>
                  <strong>Check "Remember wheels" to save wheels</strong> over time.
                </div>
              ),
            },
            {
              title: "",
              content: "Add wheels at different days and times to be able to see how your life balance is changing.",
            },
            {
              title: "Buttons",
              content: "",
            },
            {
              title: "",
              content: "",
              html: (
                <div className='wol__instruction-btn-desc'>
                  <div className='wol__instruction-icon'>
                    <LayersIcon />
                    <strong>Compare</strong>
                  </div>
                  <div>Toggles between comparison mode and current wheel</div>
                </div>
              ),
            },

            {
              title: "",
              content: "",
              html: (
                <div className='wol__instruction-btn-desc'>
                  <div className='wol__instruction-icon'>
                    <DeleteForeverIcon />
                    <strong>Delete</strong>
                  </div>
                  <div>Deletes all wheels</div>
                </div>
              ),
            },
            {
              title: "",
              content: "",
              html: (
                <div className='wol__instruction-btn-desc'>
                  <div className='wol__instruction-icon'>
                    <DoneIcon />
                    <strong>Save</strong>
                  </div>

                  <div>
                    <p>Saves the current wheel. </p>
                    <p className='wol__instruction-note'>
                      {" "}
                      <strong>"Remember wheels on this device" </strong> must be checked.
                    </p>
                  </div>
                </div>
              ),
            },
            {
              title: "",
              content: "",
              html: (
                <div className='wol__instruction-btn-desc'>
                  <div className='wol__instruction-icon'>
                    <RestoreOutlinedIcon />
                    <strong>Clear</strong>
                  </div>
                  <div>Clears the current wheel.</div>
                </div>
              ),
            },

            {
              title: "Comparison Mode",
              content:
                "If wheels have been saved, clicking the Compare button will visualize the saved wheels over time.",
            },
            {
              title: "",
              content: "",
              html: (
                <div>
                  <p>
                    <strong>Thick Line:</strong>
                    Your average score over time.
                  </p>
                  <p>
                    <strong>Ghost Lines:</strong>
                    All saved wheels
                  </p>
                </div>
              ),
            },
            {
              title: "Line Colors",
              content: "",
              html: (
                <div>
                  <p>Red on a line = low score / needs attention.</p>
                  <p>Blue on a line = high score / doing well.</p>
                </div>
              ),
            },
            {
              title: "Arrows",
              content:
                "Arrows indicate your last entered life balance scores compared to the overall average in each area.",
            },
            {
              title: "",
              content: "",
              html: (
                <div>
                  <p>
                    <strong>
                      <u className='yellow-ul'>Blue arrow pointing outwards:</u>
                    </strong>
                    The current score is better than the average.
                  </p>
                </div>
              ),
            },
            {
              title: "",
              content: "",
              html: (
                <div>
                  <strong>
                    <u className='yellow-ul'>Red arrow pointing inwards:</u>
                  </strong>
                  The current score is below the average.
                </div>
              ),
            },
            {
              title: "Arrow size",
              content: "",
              html: (
                <div>
                  <p>Bigger arrows show a bigger change from the average score. </p>
                  <p>Smaller arrows show a smaller change.</p>
                </div>
              ),
            },

            {
              title: "Using the Scores",
              content: "",
            },
            {
              title: "",
              content: "",
              html: (
                <div>
                  <strong>
                    If some areas have very high scores and some low scores, it might mean that some of the attention
                    and effort in high scoring areas can be shared with the areas with low scores.
                  </strong>
                </div>
              ),
            },
            {
              title: "",
              content:
                "If some areas have low scores, it can help to think about what is causing the low scores, how they could be improved (if that's possible), and how to improve overall life balance.",
            },

            {
              title: "",
              content: "",
              html: (
                <div>
                  Sometimes, <strong>some things can't be controlled</strong> that affect certain areas of life. These
                  are often short-term, and they result in improvements to that area.
                </div>
              ),
            },
            {
              title: "",
              content:
                "For example, moving where we live often requires a process that be longer than we want or we expected. It might mean the current living situation isn't idea and so that area has a low score.",
            },
            {
              title: "",
              content:
                "However, when we do finish the process and change where we live improves, so does the score. The now score is low but the longer term score hopefully improves.",
            },
            {
              title: "",
              content:
                "Some people say they will never give a score of 10, because there is always room for improvement. This is good and a nice way to think.",
            },
            {
              title: "",
              content: "",
              html: (
                <div>
                  <p>
                    <strong>However, some days can be really amazing and deserve a 10.</strong> So always give the score
                    you think the area deserves, and <strong>always be honest with the score.</strong>
                  </p>
                  <p>The scores are for the individual, so it's best they are honest with themselves.</p>
                </div>
              ),
            },

            {
              title: "It's a heads up, not a criticism.",
              content:
                "If areas of life have a low score, this is where the life balance may do with a little love and attention. If that's possible",
            },
            {
              title: "",
              content:
                "If it isn't, that's cool - you're aware of it. If it helps, talk to somone you trust, like a key worker, about your scores and the wheels you have created.",
            },
            {
              title: "",
              content: "",
              html: (
                <div>
                  <strong>
                    Nobody's wheel of life will ever be perfectly round and perfectly balanced. That's natural.
                  </strong>
                </div>
              ),
            },
            {
              title: "",
              content: "",
              html: (
                <div>
                  It's normal for some areas of life to have lower scores than others.{" "}
                  <strong>
                    The important thing is to notice the areas with low scores, and, if possible, make changes to
                    improve them.
                  </strong>
                </div>
              ),
            },
            {
              title: "",
              content: "The wheel will continue to change shape over time and that's perfectly natural. ",
            },
          ],
        },
      },
      dimensions: [
        {
          id: "recovery",
          label: "Recovery",
          angleAdjust: 45, // Rotates clockwise
          edge: "bottom",
          offset: -16, // Pushes "up" away from line
        },
        {
          id: "family",
          label: "Family",
          angleAdjust: 45,
          edge: "bottom",
          offset: -16,
        },
        {
          id: "education",
          label: "Education Training Work",
          angleAdjust: 45,
          edge: "bottom",
          offset: -16,
        },
        {
          id: "health",
          label: "Health & Fitness",
          angleAdjust: 45,
          rotate180: true,
          edge: "bottom",
          offset: -16,
        },
        {
          id: "social",
          label: "Social Fun",
          angleAdjust: 45,
          edge: "top",
          offset: 20,
        },
        {
          id: "friends",
          label: "Friends & Relationships",
          angleAdjust: 45,
          edge: "top",
          offset: 20,
        },
        {
          id: "purpose",
          label: "Life Purpose",
          angleAdjust: 45,
          edge: "top",
          offset: 20,
        },
        {
          id: "environment",
          label: "Physical Environment",
          angleAdjust: 45,
          rotate180: true,
          edge: "top",
          offset: 20,
        },
      ],
      storage: {
        saved: "Saved Wheels",
      },

      actions: {
        instructions: {
          btns: {
            open: "Instructions",
            close: "Close",
          },
        },
        wheels: {
          checkbox: {
            label: "Remember wheels on this device",
          },
          save: {
            title: "",
            msg: "",
            incomplete: {
              title: "Incomplete Wheel",
              msg: "You must score all areas before saving.",
            },

            success: {
              title: "Success",
              msg: "Wheel has been saved to your device.",
            },
            disabled: {
              title: "Saving disabled",
              msg: 'Check "remember wheels on this device" to enable saving.',
            },

            confirm: {
              title: "Scores Saved",
              msg: "Your scores have been saved.",
              btn: {
                confirm: "Okay",
              },
            },
          },
          clear: {
            title: "Clear Current Wheel?",
            msg: "Are you sure you want to clear the current wheel?",
            btn: {
              confirm: "Okay",
              cancel: "Cancel",
            },
          },

          confirm: {
            title: "Wheel of Life saved",
            msg: "Your wheel of life has been saved.",
            btn: {
              confirm: "Okay",
              cancel: "Cancel",
            },
          },
          delete: {
            confirm: {
              title: "Delete all saved wheels?",
              msg: "Are you sure you want to delete all saved wheels? This cannot be undone.",
            },
            noneSaved: {
              title: "No saved wheels",
              msg: "There are no saved wheels to delete.",
            },
          },
        },
      },
      cta: {
        title: "Wheel of Life",
        content: [
          "Assess your life balance and find areas that could need work.",
          "Save wheels over time and see how your hard work is paying off.",
        ],
        btn: {
          label: {
            unused: "The Wheel of Life",
            used: "The Wheel of Life",
          },
        },
      },
    },
    {
      name: "book-of-small-wins",
      title: "Book Of Small Wins",
      slug: "book-of-small-wins",
      url: "book-of-small-wins",
      btnLabel: "Book of Small Wins",
      content: [],
      cta: {
        title: "Book of Small Wins",
        content: [
          "It's easy to forget the small wins and gains we make in our recovery journey. ",
          "Jot them down and use them to remind yourself how far you've come. Read them back if your day is a bit grey and glum.",
        ],
        btn: {
          label: {
            unused: "Book of Small Wins",
            used: "Record the small wins",
          },
        },
      },
    },
  ],
  toolbox: {
    added: "Added to your toolbox",
    removed: "Removed from your toolbox",
    emergency: {
      added: "Added to your emergency toolbox",
      removed: "Removed from your emergency toolbox",
    },
  },
  tools: {
    list: {
      unfiltered: "Showing ALL tools",
      yourToolsFiltered: "Showing YOUR tools", //"Showing only the tools you selected"
    },
  },
}

export { cnf, activities, strings } //strings activities;
