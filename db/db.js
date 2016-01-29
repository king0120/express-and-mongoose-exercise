var mongoose = reqquire('mongoose');

var db = mongoose.connection;

db.on('error', function(err){
  console.log('Mongoose connection error:', err);
  mongoose.disconnect();
});

db.once('open', function(){
  console.log('Opened Mongoose connection.');
});

db.once('close', function(){
  console.log('Closed Mongoose connection.');
});

module.exports = db;
