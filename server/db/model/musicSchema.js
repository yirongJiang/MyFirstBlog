const { Schema, model } = require('mongoose')
const MusicSchema = new Schema({
    url: String,
    name: String
    },
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: true
    })
const Music = model('Music', MusicSchema)
module.exports = Music