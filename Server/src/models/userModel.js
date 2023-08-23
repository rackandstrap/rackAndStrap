const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
        trim: true,
        lowercase: true  
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        trim: true
    },
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    homebase: {
        type: String
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job' 
    }],
    rating: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
            }
        }
    }
)


module.exports = mongoose.model('User', userSchema);