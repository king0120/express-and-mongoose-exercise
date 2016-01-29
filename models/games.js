var mongoose = require('mongoose');

var GamesSchema = new mongoose.Schema({
  title: {type: String}, //, required: true},
  genre: {type: String}, //, required: true},
  platforms: {type: Array}, //, required: true},
  publisher: String,
  releaseYear: Number
});

GamesSchema.method.print = function(){
  console.log('Title: %s ---- Genre: %s ---- Platforms: %s----Publisher: %s----Release Year: %s',this.title, this.genre, this.platforms, this.publisher, this.releaseYear);
};

module.exports = mongoose.model('Game', GamesSchema);
