var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success', (req, res) => {
  res.render('success');
});

router.get('/failure', (req, res) => {
  res.render('failure');
})

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
passport.authenticate('github', 
{ failureRedirect: '/failure', session: false }), (req, res) => {
  res.redirect('/success');
})

module.exports = router;
