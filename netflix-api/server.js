const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/UserRoutes')
const app = express()

app.use(cors())
app.use(express.json())

const connectDB = async () => {
      try{
          await mongoose.connect("mongodb+srv://mehulshk:mehul501@kalaster.a7vrsl3.mongodb.net/Netflix")
          console.log("DB connected")
      } catch( err ){
          console.error( err )
      }
}

connectDB()


app.use('/api/user', userRoutes)

app.listen(5001, console.log('server started'))