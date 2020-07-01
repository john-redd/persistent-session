require('dotenv').config()

const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING }= process.env
const authCtrl = require('./controllers/auth')

app.use(express.json())

app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: SESSION_SECRET,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}))

// Auth Endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/getUser', authCtrl.getUser)
app.delete('/auth/logout', authCtrl.logout)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})
.then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
})
.catch(err => console.log(err))