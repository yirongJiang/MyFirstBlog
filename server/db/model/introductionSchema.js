const { Schema, model } = require('mongoose')
const introductionSchema = new Schema({
    aboutEating: [{
        content: { type: String, required: true },
        name: { type: String, default: '吃吃喝喝' }
    }]
    ,
    aboutSkills: [{
        content: { type: String, required: true },
        name: { type: String, default: '技术栈' }
    }
    ],
    aboutSomethingILike: [{
        content: { type: String, required: true },
        name: { type: String, default: '爱好' }
    }
    ],
},
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: true
    })
const Introduction = model('Introduction', introductionSchema)
module.exports = Introduction