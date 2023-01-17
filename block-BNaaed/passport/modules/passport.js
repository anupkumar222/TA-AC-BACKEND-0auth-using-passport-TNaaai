var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy; 
var User = require('../models/User');

passport.use(new GitHubStrategy({
    clientID : process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    var profileData = {
        name : profile.displayName,
        username: profile.username,
        email : profile._json.email,
        photo: profile._json.avatar_url
    }
console.log(profile._json.email);
    User.findOne({ email: profile._json.email }, (error, user) => {
        if(error) return done(error);
        if(!user) {
            User.create(profileData, (err, addedUser) => {
                if(err) done(err);
                return done(null, addedUser);
            })
        }
        return done(null, user);
    })
}))


