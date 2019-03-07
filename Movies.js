var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

mongoose.connection.once('open', function () {
    console.log('Connection have been made');
});
// movie schema
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

// return the model
module.exports = mongoose.model('Movies', MoviesSchema);