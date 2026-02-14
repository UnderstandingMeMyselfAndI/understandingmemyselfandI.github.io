const express = require('express')
const admin = require('firebase-admin')
const sqlite3 = require('sqlite3').verbose()
const cron = require('node-cron')
const cors = require('cors')

// 1. Initialize Firebase (Download your serviceAccountKey.json from Firebase Console)
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// 2. Setup SQLite Database
const db = new sqlite3.Database('./alarms.db')
db.run(
  'CREATE TABLE IF NOT EXISTS users (token TEXT PRIMARY KEY, alarm_time TEXT)',
)

const app = express()
app.use(cors())
app.use(express.json())

// 3. API to save user alarm time
app.post('/set-alarm', (req, res) => {
  const { token, time } = req.body // time format: "HH:mm"
  db.run(
    'INSERT OR REPLACE INTO users (token, alarm_time) VALUES (?, ?)',
    [token, time],
    (err) => {
      if (err) return res.status(500).send(err)
      res.send({ status: 'Alarm set!' })
    },
  )
})

// 4. The Scheduler (Runs every minute)
cron.schedule('* * * * *', () => {
  const now = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  db.all('SELECT token FROM users WHERE alarm_time = ?', [now], (err, rows) => {
    if (rows && rows.length > 0) {
      rows.forEach((user) => {
        admin.messaging().send({
          token: user.token,
          data: { trigger_local_image: 'true' }, // Minimal data payload
          android: { priority: 'high' },
          apns: { payload: { aps: { 'content-available': 1 } } }, // Wakes up iOS
        })
      })
      console.log(`Sent ${rows.length} wake-up calls at ${now}`)
    }
  })
})

app.listen(3001, () => console.log('Alarm Server running on port 3001'))
