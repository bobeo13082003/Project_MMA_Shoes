const mongoose = require('mongoose')
const vertifyEmailSchema = new mongoose.Schema({
    email: String,
    otp: String,
    "expireAt": {
        type: Date,
        expires: 300
    }

},
    {
        timestamps: true
    })

const VertifyEmail = mongoose.model('VertifyEmail', vertifyEmailSchema, 'vertify-email')

module.exports = VertifyEmail