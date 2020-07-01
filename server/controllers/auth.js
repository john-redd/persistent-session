const bycrypt = require("bcryptjs")

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const { email, password} = req.body

    try {
      const existingUser = await db.users.findOne({ email })
      
      if(existingUser) {
        return res.status(409).send('Email already in use!')
      }

      const salt = bycrypt.genSaltSync(10)
      const hash = bycrypt.hashSync(password, salt)

      const newUser = await db.users.save({
        email,
        hash
      })

      delete newUser.hash
      req.session.user = newUser
      res.status(201).send(newUser)
    } catch (err) {
      console.log(err)
      res.status(500).send('An error was encountered while processing your registration request. Please try again later.')
    }
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const { email, password }= req.body

    try {
      const user = await db.users.findOne({ email })

      if(!user){
        return res.status(404).send('No account is associated with that email')
      }

      const isAuthenticated = bycrypt.compareSync(password, user.hash)

      if(isAuthenticated){
        delete user.hash
        req.session.user = user
        return res.status(200).send(user)
      }

      res.status(409).send('Incorrect password.')
    } catch (err) {
      console.log(err)
      res.status(500).send('An error was encountered while processing your login request. Please try again later.')
    }
  },
  getUser: (req, res) => {
    // Only works in node v14 +
    // if(req?.session?.user){
    //   return res.status(200).send(req.session.user)
    // }
    if(req && req.session && req.session.user){
      return res.status(200).send(req.session.user)
    }

    res.status(404).send('No user currently logged in.')
  },
  logout: (req, res) => {
    if(req?.session?.user){
      req.session.destroy()
      return res.sendStatus(200)
    }

    res.status(404).send('No user currently logged in.')
  },
}