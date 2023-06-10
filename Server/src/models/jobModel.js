const mongoose = require('mongoose');
/*
createdBy: 
*/

const jobSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    type: {
        type: String,
        required: true,
        required: [true, "Please enter a type (request || provide)"]
    },
    title: {
        type: String,
        required: [true, "Please enter a title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter a description"],
    },
    bid: {
        type: Number
    },
    from: {
        type: Object,
        required: [true, "Please enter location you're departing from"]
    },
    destination: {
        type: Object,
        required: [true, "Please enter destination"]
    },
    leaveDate: {
        type: Date
    },
    arrivalDate: {
        type: Date
    },
    status: {
        type: String,
        default: 'open'
    }
},
    {
        timestamps: true
    }
)


// module.exports = mongoose.model('Job', jobSchema);