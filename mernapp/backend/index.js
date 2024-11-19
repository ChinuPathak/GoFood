const mongoDb = require('./db')
const express = require('express')

const app = express()
mongoDb()
const PORT = 5000
// React ka port aur node ka port alg rkhna 

app.use((req, resp, next) => {
    resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    resp.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With , Content-Type , Accept"
    )
    next()
})

app.use(express.json())
app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/DisplayData'))
app.use('/api', require('./Routes/OrderData'))

app.listen(PORT, () => {
    console.log(`Server is started at port ${PORT}`)
})