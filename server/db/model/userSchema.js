const { Schema, model } = require('mongoose')
const moment = require('moment')
const UserSchema = new Schema({
    createTime: {
        type: String,
        default: moment(+new Date()).format('YYYY-MM-DD HH:mm:ss'),
        required: false
    },
    password: String,
    username: String
})

const User = model('User', UserSchema)
module.exports = User   