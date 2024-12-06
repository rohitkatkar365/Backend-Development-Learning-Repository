const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false,
    },
    cpassword: {
        type: String,
        required: [true, 'Please enter confirm password'],
        minlength: 8,
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords do not match',
        },
    },
    passwordChangedAt :Date,
    role:{
        type:String,
        enum:['user','admin'],
        default : 'user'
    },passwordResetToken : String,
    passwordRestExpire : Date
});

userSchema.pre('save', async function(next) {
    if (!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password, 2);
    this.cpassword = undefined;
    next();
});

userSchema.methods.comparePassword = async function(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.isPasswordChanged = async function(JWTTimeStamp){
    if (this.passwordChangedAt) {
        const passChangedAt = parseInt(this.passwordChangedAt.getTime()/1000,10);
        console.log(passChangedAt,JWTTimeStamp);
        return JWTTimeStamp < passChangedAt;
    }
    return false;
}
userSchema.methods.createRestPassword = function(){
    const rsettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken =crypto.createHash("sha256").update(rsettoken).digest('hex');
    this.passwordRestExpire = Date.now()*10*60*1000;
    console.log(rsettoken);
    
    return rsettoken;
}
const User = mongoose.model('User', userSchema);
module.exports = User;
