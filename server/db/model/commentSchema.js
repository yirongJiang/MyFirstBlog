const { Schema, model } = require('mongoose')
const moment = require('moment')
const { default: mongoose } = require('mongoose')

const CommentSchema = new Schema({
  blogId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  commentContent: {
    type: String,
    required: true
  },
  /* 二级评论 */
  replys: [{
    to: {
      required: false,
      type: String
    },
    username: {
      required: true,
      type: String
    },
    createTime: {
      default: () => +new Date(),
      type: Number
    },
    commentContent: {
      type: String,
      required: true
    }
  }]
},
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true
  }
)
const Comment = model('Comment', CommentSchema)
module.exports = Comment