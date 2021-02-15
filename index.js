const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config({ path: './env' })
const { say } = require('cowsay')

/**
 * Express
 */
const app = express()
app.disable('x-powered-by')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

/**
 * Cors
 */
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

/**
 * Routes
 */
app.use('/api/elastic/users', require('./routes/elasticsearch/users.route'))

/**
 * Port
 */
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.info(say({ text: `Server running on port: ${PORT}.` }));
})