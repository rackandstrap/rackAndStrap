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
    title: {
        type: String,
        required: [true, "Please enter a title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter a description"],
    },
    from: {
        type: String,
        required: [true, "Please enter location you're departing from"]
    },
    to: {
        type: String,
        required: [true, "Please enter destination"]
    }
},
    {
        timestamps: true
    }
)


// module.exports = mongoose.model('Job', jobSchema);