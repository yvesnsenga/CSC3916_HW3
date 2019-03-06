var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

// user schema
var MoviesSchema = new Schema({
    title: {
        type: String,
        require: true,
        index: {unique: true}
        },
    YearRelease: Number,
    genre: {type: String,
            enum: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western'],
            require: true,
            },
    Actors: {
        FirstActor: [{
            ActorName: String,
            CharacterName: String,
        }],
        SecondActor: [{
            ActorName: String,
            CharacterName: String,
        }],
        ThirdActor: [{
            ActorName: String,
            CharacterName: String,
        }],
    },
});

// hash the password before the user is saved
MoviesSchema.pre('save', function(next) {
    var movie = this;

    // hash the password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();

    // generate the hash
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);

        // change the password to the hashed version
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password, callback) {
    var user = this;

    bcrypt.compare(password, user.password, function(err, isMatch) {
        callback(isMatch) ;
    });
};

// return the model
module.exports = mongoose.model('User', UserSchema);