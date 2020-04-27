const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let validRole = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} is not valid'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name necesary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email necesary']
    },
    password: {
        type: String,
        required: [true, 'password necesary']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRole
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function (){

    let user = this;
    let userOBject = user.toObject();
    delete userOBject.password;

    return userOBject;

}

userSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' } );

module.exports = mongoose.model('User', userSchema);