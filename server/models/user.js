const bcrypt = require('bcrypt'); //for encryption of password..
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        min: [4, 'Too short min character is 4 charcter'],
        max: [32, 'Too long max character is 32 charcter']
//        required: 'User name is required',
    },
    email:{
        type:String,
        min: [4, 'Too short min character is 4 charcter'],
        max: [32, 'Too long max character is 32 charcter'],
        unique:true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min: [4, 'Too short min character is 4 charcter'],
        max: [32, 'Too long max character is 32 charcter'],
        required: 'Password is required'
    },
    stripeCustomerId: String,
    revenue: Number,
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}],
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
});

//check if password is the same as password on file
userSchema.methods.hasSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword, this.password);
}

//encrypt password..
userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model('User', userSchema);


