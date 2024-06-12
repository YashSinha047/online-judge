require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const problemRoutes = require('./routes/problems')
const userRoutes = require('./routes/user')

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/problems', problemRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`connected to db and app listening on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
