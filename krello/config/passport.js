var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {

  // Passport session setup ======================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local Signup ================================================
  // using named strategies since we have one for login and signup
  // by default, if there's no name, it'd be called 'local'
  // Passport uses concept of strategies to authenticate requests.
  // Before authenticating requests, strategies used must be configured
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows to pass the entire request to the callback
  },
  function(req, email, password, done) { // done is provided by passport
    if (email) {
      email = email.toLowerCase();
    }
    // asynchronous
    // User.findone wont fire unless data is sent back
    process.nextTick(function() {
      // find a user whose email is the same as form's email
      // checking to see if user trying to login already exists
      User.findOne({ 'local.email': email }, function(err, user) {
        // if there are any errors, return error
        if (err) {
          return done(err);
        }
        // check to see if there's already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'Email is already taken.'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // Create the boards, lists, and cards
          // newBoard = newUser.generateBoard('Initial Board');
          // newList = newUser.generateList('Initial List');
          // newCard = newUser.generateCard('Initial Card', 'Initial Description');

          // newList.cards.push(newCard);
          // newBoard.lists.push(newList);
          // newUser.boards.push(newBoard);

          // save the user
          newUser.save(function(err) {
            if (err) {
              throw err;
            };
            return done(null, newUser);
          });
        }

      });
      });
  }));

  // Local Login =============================================
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email': email }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }
      return done(null, user);
    });
  }));

};
