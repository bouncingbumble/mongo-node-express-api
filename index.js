require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { v4: uuid } = require('uuid')
const cors = require('cors')
const port = process.env.PORT || 9000
const bodyParser = require('body-parser')
const schedule = require('node-schedule')
const axios = require('axios')

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.post('/', (req, res, next) => {
    const { timeToSend, url, data } = req.body
    data.CRON_SECRET_KEY = process.env.SECRET_KEY
    console.log('starting timer')
    console.log(timeToSend)

    const jobName = uuid()

    const job = schedule.scheduleJob(
        jobName,
        new Date(timeToSend),
        async function () {
            try {
                console.log('timer done')
                console.log('hitting endpoint')
                console.log(url)
                console.log('sending back data')
                console.log(data)
                try {
                    await axios.post(url, data)
                } catch (error) {
                    next(error)
                }
            } catch (err) {
                return next(err)
            }
        }
    )
})

app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    console.log(err)
})

server.listen(port, () => {
    console.log('App is running on port ' + port)
})
