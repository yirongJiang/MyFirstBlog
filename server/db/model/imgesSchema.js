const { Schema, model } = require('mongoose')
const imgesSchema = new Schema({
    imageUrl: {
      type:String,
      required:true   
    },
    imageName:{
        type:String,
        required:true
    }
},
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: true
    })
const imges = model('imges', imgesSchema)
module.exports = imges