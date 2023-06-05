const mongoose = require('mongoose');
/*
username
password
name
homebase
job [...]
provide [...]
*/

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
    },
    homebase: {
        type: String
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job' 
    }],
    provide: {
        type: Array,
        default: []
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