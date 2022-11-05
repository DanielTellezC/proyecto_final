const mongoose = require('mongoose');
const users = require('./user');
const { Schema } = mongoose;

const taskSchema = new Schema({
    title:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    description:{
        type: String,
        unique: false,
        require: false,
        trim: true
    },
    done:{
        type: Boolean,
        default: false
    },
    cuenta:[{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
},  
    {
        timestamps:true,
        versionKey: false
    }
);

module.exports = mongoose.model('task', taskSchema);