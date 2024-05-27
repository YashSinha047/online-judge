require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const problemRoutes = require('./routes/problems')

const app = express()

app.use(express.json())

app.use((res, req, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/problems', problemRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`connected to db and app listening on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
