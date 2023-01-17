var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

//GitUser
var gitUser = new Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    photo: {type: String}

}, {timestamps: true});


//userSchema
var userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type:String, minlength: 5},
    city: String,
}, {timestamps: true});



//user password hashing
userSchema.pre('save', function(next) {
    if(this.password && this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hased) => {
            if(err) return next(err);
            this.password = hased;
            next();
        })
    } else {
        next();
    }
})

//user password verification
userSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        return cb(err, result);
    })
}

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Gituser', gitUser);
