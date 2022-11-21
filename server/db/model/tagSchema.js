const { Schema, model } = require('mongoose')
const moment = require('moment')
const TagSchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => moment(+new Date()).format('YYYY-MM-DD ') }
})
const Tag = model('Tag', TagSchema)
module.exports = Tag