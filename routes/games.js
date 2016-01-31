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
  //INDEX
  .get(function(req, res, next) {
    Game.find(function(err, games) {
      if (err) return console.error(err);
      console.log(games);
      res.render('./games/index', {
        games: games
      });
    });
  })
  //POST
  .post(function(req, res) {
    Game.create(req.body, function(err, game) {
      if (err) {
        res.send("There was a problem adding the information to the database.");
      } else {
        console.log('POST creating new game: ' + game);
        res.redirect('games');
      }
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Game.findById(req.params.id, function(err, game) {
      if (err) return res.send(err);
      res.render('./games/show');
    });
  });
router.delete('/:id', function(req, res, next) {
  Game.findByIdAndRemove(req.params.id, function(err, game) {
    if (err) throw err;
    console.log('Delete removing ID: ' + game._id);
    res.redirect('./');
  });
});

router.put('/:id/edit', function(req, res) {
  Game.findOneAndUpdate(req.params.id,
    req.body, {
      new: true
    },
    function(err, game) {
      if (err) res.send('There was a problem.  ' + err);
      else
        res.format({
          json: function() {
            res.json(game);
          }
        });
    }
  );
});

module.exports = router;
