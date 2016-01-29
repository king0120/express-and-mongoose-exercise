var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Game = require("../models/games");

//middleware for request

/* GET home page. */

// title: {type: String, required: true},
// genre: {type: String, required: true},
// platforms: {type: String, required: true},
// publisher: String,
// releaseYear: String,

router.route('/')
  .get(function(req, res, next) {
    Game.find({}, function(err, games) {
      if (err) return console.error(err);
      res.format({
        json: function() {
          res.json(games);
        }
      });
    });
    //res.json({message: 'GREAT SCOTT! It Works!'});
  })
  .post(function(req, res) {
    Game.create(req.body, function (err, game) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                console.log('POST creating new game: ' + game);
                res.format({
                  json: function(){
                      res.json(game);
                  }
              });
            }
      });
  });

router.route('/:id')
  .get(function(req, res){
    Game.findById(req.params.id, function(err, game){
      if (err) return res.send(err);
      res.json(game);
    });
  })
  .delete(function(req, res){
    Game.findById(req.params.id, function(err, game){
      if (err) return console.error(err);
      game.remove(function(err, game){
        if (err) return console.error(err);
        console.log('Delete removing ID: ' + game._id);
        res.format({
          json: function(){
            res.json({
              message: 'deleted',
              item: game
            });
          }
        });
      });
    });
  });


  // .put(function(req, res){
  //   Game.findById(req.params.id, function(err, game){
  //     if (err) return res.send(err);

  //   })
  // });

module.exports = router;
