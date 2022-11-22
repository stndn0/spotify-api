const { application } = require('express')
const express = require('express')
const app = express()
// const cors = require('cors')
const router = require('./src/routes/router')

// app.use(cors())
app.use(router)

// Return test data
// app.get('/api', (req, res) => {
//     res.json({'users': ["user1", "user2", "user3"]})
// })


app.get('/', (req, res) => {
    console.log("SERVER: /")
})

// Start back-end on port 5000
app.listen(5000, () => {console.log("Server started on port 5000.")})