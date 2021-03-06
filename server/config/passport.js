var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var secrets = require('./keys')();

//For Testing purpose only
var HARDCODED_USERS = [
    {'username': 'tungpham31', 'password': 'tung'},
    {'username': 'james', 'password': 'james'},
    {'username': 'thai', 'password': 'thai'},
    {'username': 'freddy', 'password': 'freddy'},
    {'username': 'hugo', 'password': 'hugo'},
    {'username': 'andrew', 'password': 'andrewdes'},
    {'username': 'aidan', 'password': 'aidanw'},
    {'username': 'nathan', 'password': 'nathanf'},
    {'username': 'rob', 'password': 'robr'},
    {'username': 'jake', 'password': 'jakeb'},
    {'username': 'anand', 'password': 'anands'},
    {'username': 'ricki', 'password': 'rickic'},
    {'username': 'crisposity', 'password': 'kg'},
    {'username': 'hackny', 'password': 'iloveNYC'}
];

/* For Google/Facebook authentication */
//var configAuth = require('./auth');
var FACEBOOK_APP_ID = "1559394300974294";
var FACEBOOK_APP_SECRET = "50ff897b9bcece9393c233939ebc0e36";

module.exports = function (passport) {
    // Use the FacebookStrategy within Passport.
    // Strategies in Passport require a `verify` function, which accept
    // credentials (in this case, an accessToken, refreshToken, and Facebook
    // profile), and invoke a callback with a user object.
    passport.use(new FacebookStrategy(secrets.facebook.auth, function (accessToken, refreshToken, profile, done) {
            console.log(profile._json.email);
            return done(null, {
                'kind': 'facebook',
                'accessToken': accessToken,
                'refreshToken': refreshToken,
                'username': profile._json.email.substring(0, profile._json.email.indexOf('@'))
            });
        }
    ));

    passport.use(new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, username, password, done) {
                for (i = 0; i < HARDCODED_USERS.length; i++) {
                    if (HARDCODED_USERS[i].username === username && HARDCODED_USERS[i].password === password) {
                        return done(undefined, HARDCODED_USERS[i]);
                    }
                }
                console.log("User/Password does not match");
                return done(undefined, false, req.flash('loginMessage', 'Bad username/password'));
                // Temporarily disabled database for testing

                // Check whether or not user exists in userdb
                // userdb.authenticateUser(username, password, function(err, user) {
                //     if(err) {
                //         console.log('Error during login (potentially due to database error)');
                //         return done(err);
                //     } else if(!user) {
                //         console.log('Bad username/password during logon');
                //         return done(undefined, false, req.flash('loginMessage', 'Bad username/password'));
                //     } else return done(undefined, user);
                // });
            })
    );

    passport.use('local-signup', new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, username, password, done) {
                // Check for proper username and password input
                // var RFC822 = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                // if(username.search(RFC822) === -1 || password.length < 6 || password.length > 18)
                //     return done(undefined, false, req.flash('signupMessage', 'Fix issues below.'));
                // // Check whether or not user exists in userdb
                // userdb.createUser(username, password, db.GRP_UNVERIFIED, function(err, user) {
                //     if(err) {
                //         console.log('Username already taken.');
                //         return done(undefined, false, req.flash('signupMessage', 'Username already taken.'));
                //     } else {
                //         console.log(user);
                //         return done(undefined, user);
                //     }
                // });
            })
    );

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
}
