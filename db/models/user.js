const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {type: String, maxLength: 50},
        lastName: {type: String, maxLength: 50},
        username: {type: String, minLength: 1, maxLength: 50, required: true},
        password: {type: String, minLength: 5, required: true},
        memberStatus: {type: String, required: true}
    }
);

UserSchema
    .virtual('fullName')
    .get(function() {
        if (!this.firstName) {
            this.firstName = '';
        }

        if (!this.lastName) {
            this.lastName = '';
        }
        return `${this.firstName} ${this.lastName}`;
    });

module.exports = mongoose.model('User', UserSchema);