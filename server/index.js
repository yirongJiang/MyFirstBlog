const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const clientRoutes = require('./route/client')
const adminRoutes = require('./route/admin')

const app = express()
const port = 3002

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


clientRoutes(app)
adminRoutes(app)

app.listen(port, async () => {
    console.log(`服务器已经成功启动在 localhsot:${port}`)
    try {
        await mongoose.connect('mongodb://localhost:27017/blog-server')
        console.log('数据库连接成功')
    } catch (e) {
        console.log('数据库连接失败', err)

    }
})