var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex.table('posts').select().then(function(posts) {
    res.render('gwall', {posts: posts});
  });
});

router.get('/post', function(request, response) {
  response.render('post');
});

router.post('/post', function(request, response) {
  // grab information from body
  var username = request.body.username;
  var image = request.body.image;
  var rant = request.body.rant;
  // insert into tables
  knex.table('posts').insert({
    username: username,
    image: image,
    rant: rant
  }).then(function() {
    // log to make sure we got here
    console.log('You did it!');
    response.redirect('/gwall');
  }).catch(function(error) {
    // catch error and if error direct to next middleware in app.js to send error page
    next(error);
  });
});

module.exports = router;
