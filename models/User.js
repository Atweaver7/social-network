const { Schema, model, } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 12,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    userName: {
        type: String,
        required: true,
    },
    reactions: {reactionSchema}
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

reactionSchema.virtual('reactionCount').get(function() {
    return this.replies.length;
})


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
        thoughts: {thoughtSchema}


        // MISSING CODE HERE, DONT FORGET DUMB DUMB // 


});



const User = model('User', UserSchema)

module.exports = User;