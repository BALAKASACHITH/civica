const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },

    imagePath: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        }
    },

    department: {
        type: String,
        default: null   // filled after Python classification
    },

    priorityScore: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        default: "Pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);