const { Schema, model } = require('mongoose')
const moment = require('moment')
const BlogSchema = new Schema({
    createTime: {
        type: String,
        required: false,
        default: moment(+new Date()).format('YYYY-MM-DD')
    },
    content: String,
    author: String,
    title: String,
    visit: { type: Number, default: 0 },
    like: Number,
    comments: [String],
    tags: [String]
},
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: { currentTime: () => moment(+new Date()).format('YYYY-MM-DD') }
    })
const Blog = model('Blog', BlogSchema)
module.exports = Blog