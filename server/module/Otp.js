const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('Otp', otpSchema);