// src/utils/seedSmallWins.js
// DEV-ONLY seeder for Small Wins. Uses the public storage layer so seeded data
// is encrypted and stored exactly like real user data.
//
// Usage from the browser console (Vite dev server):
//   const { seedSmallWins } = await import('/src/utils/seedSmallWins.js');
//   await seedSmallWins();                      // 100 wins over 40 days
//   await seedSmallWins({ count: 300, days: 90 });
//   await seedSmallWins({ clear: true });       // wipe first, then seed
//
// Or, if you call attachToWindow() once (see below):
//   await window.seedSmallWins()
//   await window.clearAllSmallWins()

import * as storage from './smallWinsStorage'
import { useSmallWinsStore } from '@store/smallWinsStore'
import { toIsoDate } from './formatSmallWinDate'

const TITLES = [
  'Woke up on time',
  'Went for a 10 minute walk',
  'Made my bed',
  'Drank a glass of water first thing',
  'Called a friend',
  'Asked for help',
  'Took my medication',
  'Went to bed on time',
  'Ate a proper breakfast',
  'Cleaned one small thing',
  'Resisted a craving',
  'Took a shower',
  'Went outside for fresh air',
  'Wrote in my journal',
  'Stretched for 5 minutes',
  'Cooked a meal',
  'Finished a chapter',
  'Replied to a message I was avoiding',
  'Took the stairs',
  'Sat with a difficult feeling',
  'Said no to something',
  'Said yes to something',
  'Turned off my phone for an hour',
  'Watered the plants',
  'Opened the curtains',
  'Brushed my teeth twice',
  'Tidied my desk',
  'Made a phone call I had been putting off',
  'Went to the shop',
  'Rested without guilt',
  'Got out of bed within 20 minutes of waking',
  'Did the washing up',
  'Reached out to someone I had not spoken to in a while',
  'Finished a work task',
  'Read for 10 minutes',
  'Slept without my phone in the room',
  'Drank less caffeine than usual',
  'Turned off notifications for an hour',
  'Left the house without checking the mirror five times',
  'Practiced breathing exercises',
  'Wrote down three things I am grateful for',
  'Took a break when I needed one',
  'Ate lunch away from my desk',
  'Set a boundary with someone',
  'Said how I actually felt',
  'Let myself cry',
  'Got dressed properly',
  'Answered an email I was dreading',
  'Listened to an album I love',
  'Did 10 minutes of tidying',
  'Walked to the shop instead of driving',
  'Paused before replying to a message',
  'Went to bed before midnight',
  'Resisted checking my phone in bed',
  'Finished a small project',
  'Watched a film without multitasking',
  'Made a cup of tea and sat with it',
  'Avoided a doom-scroll',
  'Took my vitamins',
  'Went for a walk without my phone',
  'Wrote something',
  'Doodled',
  'Finished a to-do list item',
  'Took a full lunch break',
  'Sat in the sun for 10 minutes',
  'Cleaned my shoes',
  'Took out the rubbish',
  'Drank enough water today',
  'Did the laundry',
  'Replied to a text I had left on read',
  'Asked for a hug',
  'Told someone I was struggling',
  'Turned the lights off earlier',
  'Cooked enough food for leftovers',
  'Made a meal plan',
  'Did a chore I had been avoiding',
  'Replied to a work message within the hour',
  'Got outside before 9am',
  'Ate a piece of fruit',
  'Went for a bike ride',
  'Called a family member',
  'Sent a birthday message on time',
  'Did my stretching routine',
  'Did 5 minutes of mindfulness',
  'Wrote a list of things I am looking forward to',
  'Played with a pet',
  'Tidied my bag',
  'Did one small thing for future me',
  'Spent 10 minutes on a hobby',
  'Took a photo of something nice',
  'Ate breakfast sitting down',
  'Noticed something I would usually miss',
  'Apologised when I was wrong',
  'Let someone else be right',
  'Kept a promise to myself',
  'Kept a promise to someone else',
  'Said thank you and meant it',
  'Accepted a compliment',
  'Forgave myself for something',
  'Simply got through the day',
]

const DESCRIPTIONS = [
  'Felt harder than it should have, but I did it.',
  'Small, but it counts.',
  'Took about ten minutes. Felt good afterwards.',
  'Did not think I would, but I managed.',
  'Second time this week.',
  'Only just managed. Still counts.',
  'A quiet win.',
  'Nothing dramatic, just steady.',
  'Worth noting.',
  'Noticed I felt lighter afterwards.',
  'Bit of a struggle, but here we are.',
  'Going to try to do this again tomorrow.',
  'Easier than I expected.',
  'Harder than I expected. But done.',
  'Forgot last time, made sure this time.',
  'Took a lot of effort.',
  'Wrote it down so I remember.',
  'Ten seconds of dread, then a minute of ease.',
  'Actually enjoyed it.',
  'Barely noticed I was doing it.',
  'Not sure I feel different but I did it.',
  'Will try to make this a habit.',
  'Starting to feel less like a chore.',
  'Small victory in a long week.',
  'First time in a while.',
  'Annoyed myself, then did it anyway.',
  'Nearly skipped it. Glad I did not.',
  'Did it for past me.',
  'Did it for future me.',
  'Just for the sake of doing something.',
  'Tiny step.',
  'Sat with the discomfort and got through it.',
  'Took a breath, then acted.',
  'Rewarding in a way I did not expect.',
  'Simple but not easy.',
  'Kept my word.',
  'Showed up.',
  'Counted to ten, then did it.',
  'Was not perfect. Still counts.',
  'Did it badly, on purpose.',
  'Better than nothing.',
  'Small in scope, big in effect.',
  'Five minutes of trying.',
  'Did not want to. Did it anyway.',
  'Wanted to stop. Kept going.',
  'Set a timer and did not stop until it went off.',
  'The bar was low and I met it.',
  'Acknowledge. Move on. Repeat.',
  'Worth doing for its own sake.',
  'Made me smile.',
  'Not a big deal to anyone else.',
  'Big deal to me.',
  'Secret win.',
  'Nobody knows but me.',
  'Doing the small things.',
  'Got there in the end.',
  'Cost me energy but I have plenty left.',
  'Next time might be easier.',
  'The first step is the hardest.',
  'Marked the start of something.',
  'Solid ground.',
  'Steady progress.',
  'Not glamorous, but real.',
  'Sort of a relief.',
  'A good kind of tired afterwards.',
  'The kind of thing I would normally skip.',
  'Decided not to overthink it.',
  'Just did it.',
  'Stopped negotiating with myself.',
  'Went with the first instinct and it was right.',
  'Tried something different.',
  'Back to basics.',
  'Did what I said I would.',
  'The thought was worse than the doing.',
  'Closed a loop.',
  'Ticked a box.',
  'Small, but with follow-through.',
  'Kept the momentum.',
  'One small brick in the wall.',
  'Groundwork.',
  'Investment in future me.',
  'Will look back and be glad.',
  'Made it happen.',
  'Did not wait for motivation.',
  'Acted my way into feeling, rather than the other way round.',
  'Proved a thought wrong.',
  'Quietly pleased with myself.',
  'Little buzz of pride.',
  'Something to build on.',
  'Starting to trust myself a bit more.',
  'Found it easier than last time.',
  'This is becoming part of the routine.',
  'No longer feels forced.',
  'A small change I want to keep.',
  'Wanted to record it so I do not forget.',
  'Important enough to write down.',
  'For the log.',
  'For the version of me who will need to see this.',
  'Because it matters to me.',
  'Because I did.',
]

const NAMES = [
  'Sam',
  'Alex',
  'Jamie',
  'Jordan',
  'Taylor',
  'Morgan',
  'Casey',
  'Riley',
  'Charlie',
  'Drew',
  'Robin',
  'Quinn',
  'Rowan',
  'Sage',
  'Ellis',
  'Finley',
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** 'YYYY-MM-DD' within the last `days` days, inclusive of today. */
function randomPastDate(days) {
  const offset = Math.floor(Math.random() * days)
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return toIsoDate(d)
}

function generateWhoWith() {
  const r = Math.random()
  if (r < 0.35) return []
  const first = pick(NAMES)
  if (r < 0.75) return [first]
  const others = NAMES.filter((n) => n !== first)
  return [first, pick(others)]
}

let running = false

/**
 * Seed the Small Wins stores with synthetic wins.
 *
 * @param {object} [opts]
 * @param {number} [opts.count=100]  how many wins to create
 * @param {number} [opts.days=40]    spread dates over the last N days
 * @param {boolean} [opts.clear=false] wipe all existing wins + people first
 * @param {boolean} [opts.verbose=true] log progress to the console
 * @returns {Promise<{cancelled?:boolean, requested?:number, added?:number, total?:number}>}
 */
export async function seedSmallWins(opts = {}) {
  const { count = 100, days = 40, clear = false, verbose = true } = opts

  if (!Number.isInteger(count) || count < 1) {
    throw new Error('count must be an integer >= 1')
  }
  if (!Number.isInteger(days) || days < 1) {
    throw new Error('days must be an integer >= 1')
  }
  if (running) {
    console.warn('[seedSmallWins] already running; ignoring')
    return { cancelled: true }
  }

  const store = useSmallWinsStore.getState()
  const existing = store.entries.length

  if (existing > 0 && !clear) {
    const ok = window.confirm(
      `There are already ${existing} wins in the book. Add ${count} more?\n\n` +
        `Click OK to proceed, or Cancel and call with { clear: true } to wipe first.`,
    )
    if (!ok) return { cancelled: true }
  }

  if (clear) {
    const ok = window.confirm('This will permanently DELETE all existing wins and people. Continue?')
    if (!ok) return { cancelled: true }
    await storage.deleteAllData()
    if (verbose) console.log('[seedSmallWins] existing data cleared')
  }

  running = true
  let added = 0
  try {
    for (let i = 0; i < count; i += 1) {
      const date = randomPastDate(days)
      const whoWith = generateWhoWith()
      const title = pick(TITLES)
      const description = Math.random() < 0.7 ? pick(DESCRIPTIONS) : ''

      // Create the row first (unique id + createdAt), then fill it in.
      const entry = await storage.createEntry({ date })
      await storage.saveEntry({ ...entry, title, description, whoWith, date })

      for (const name of whoWith) {
        await storage.upsertPerson(name)
      }

      added += 1
      if (verbose && (i + 1) % 10 === 0) {
        console.log(`[seedSmallWins] ${i + 1} / ${count}`)
      }
    }
  } finally {
    running = false
  }

  await useSmallWinsStore.getState().refresh()
  const summary = {
    requested: count,
    added,
    total: useSmallWinsStore.getState().entries.length,
  }
  if (verbose) console.log('[seedSmallWins] done:', summary)
  return summary
}

/**
 * Wipe every Small Wins entry and person. Useful before re-seeding.
 * @returns {Promise<{cancelled?:boolean, cleared?:boolean}>}
 */
export async function clearAllSmallWins({ verbose = true } = {}) {
  const store = useSmallWinsStore.getState()
  const count = store.entries.length
  const ok = window.confirm(`This will permanently DELETE all ${count} wins and any stored people. Continue?`)
  if (!ok) return { cancelled: true }

  await storage.deleteAllData()
  await useSmallWinsStore.getState().refresh()

  if (verbose) console.log('[clearAllSmallWins] cleared', count, 'wins')
  return { cleared: true }
}

/**
 * Expose the helpers on `window` so they can be re-run without pasting the
 * dynamic import each time. Safe to call more than once.
 */
export function attachToWindow() {
  if (typeof window === 'undefined') return
  window.seedSmallWins = seedSmallWins
  window.clearAllSmallWins = clearAllSmallWins
   
  console.log(
    '%c[Small Wins Seeder]%c ready — window.seedSmallWins({ count, days }) / window.clearAllSmallWins()',
    'color:#2f5fd0;font-weight:bold',
    'color:inherit',
  )
}
