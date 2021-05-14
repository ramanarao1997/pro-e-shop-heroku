import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import connectToDB from './config/db.js'

import { notFound, errorHandler } from './middleware/errorHandler.js'

import products from './routes/products.js'
import user from './routes/user.js'
import orders from './routes/orders.js'

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

connectToDB();

// API routes
app.use('/api/products', products)

app.use('/api/users', user)

app.use('/api/orders', orders)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running!')
    })
}

//  any non-existing route / for 404 errors
app.use(notFound)

// error handler middleware
app.use(errorHandler)


