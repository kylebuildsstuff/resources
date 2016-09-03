var User = require('../app/models/user');
var _ = require('lodash');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

module.exports = function(app, passport) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // Home Page with Login Links
  app.get('/', hasActiveSession, function(req, res) {
    res.render('index');
  });

  // Login
  app.get('/login', hasActiveSession, function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  // Process login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // Signup
  app.get('/signup', hasActiveSession, function(req, res) {
    res.render('signup', { message: req.flash('signupMessage')})
  });

  // Process Signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // Profile
  app.get('/profile', isLoggedIn, function(req, res) {
    // Passport: If authenticated success, req.user is passed to next handler
    res.render('profile', {});
  });

  // Logout
  app.get('/logout', function(req, res) {
    req.logout(); //provided by passport
    res.redirect('/');
  });

  /////////////////////////////////////////////////////////////////////
  // GET API =========================================================
  /////////////////////////////////////////////////////////////////////

  app.get('/api/user/', isLoggedIn, function(req, res) {
    // Return user
    res.json(req.user);
  });

  app.get('/api/boards/', isLoggedIn, function(req, res) {
    // Return all boards of user
    res.json(req.user.boards);
  });

  app.get('/api/boards/:boardID', isLoggedIn, function(req, res) {
    // Return all lists of a board
    board = _.find(req.user.boards, function(boardInArray) {
      return parseFloat(req.params.boardID) === parseFloat(boardInArray.boardID);
    });
    res.json(board.lists);
  });

  /////////////////////////////////////////////////////////////////////
  // POST API =========================================================
  /////////////////////////////////////////////////////////////////////
  app.post('/api/boards', isLoggedIn, function(req, res) {
    // Add new board to user
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        res.send(err);
      };
      user.boards.push(req.body)
      user.save(function(err) {
        if (err) {
          res.status(404).send();
        } else {
        res.status(200).send();
        }
      });
    });
  });

  app.post('/api/boards/lists/:boardID', isLoggedIn, function(req, res) {
    // Post a new list to a board
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        res.send(err);
      };
      board = _.find(user.boards, function(boardInArray) {
        return parseFloat(boardInArray.boardID) === parseFloat(req.params.boardID)
      });
      user.boards[user.boards.indexOf(board)].lists.push(req.body)
      user.markModified('boards'); //notify database boards changed
      user.save(function(err) {
        if (err) {
          res.status(500).send();
        } else {
        res.status(200).send();
        }
      });
    });
  });

  app.post('/api/boards/lists/cards/:boardID/:listID', isLoggedIn, function(req, res) {
    // Add a card to a list of a board
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        res.send(err);
      };

      board = _.find(user.boards, function(boardInArray) {
        return parseFloat(boardInArray.boardID) === parseFloat(req.params.boardID);
      });
      list = _.find(board.lists, function(listInArray) {
        if (parseFloat(listInArray.listID) === parseFloat(req.params.listID)) {
          listInArray.cards.push(req.body);
        };
        return
      });
      user.markModified('boards');
      user.save(function(err) {
        if (err) {
          res.send(err);
        };
        res.status(200).send();
      });
    });
  });

  /////////////////////////////////////////////////////////////////////
  // PUT API =========================================================
  ///////////////////////////////////////////////////////////////////
  app.put('/api/boards/sort', isLoggedIn, function(req, res) {
    // Rearrange a board's lists according to sorted order
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        res.send(err);
      };
      //  ***** NOT WORKING RIGHT NOW ////

      // Search for the right board by using a 'bait' list to match
      baitList = _.sample(req.body)
      board = _.find(user.boards, function(boardInArray) {
        return _.find(boardInArray.lists, function(listInBoard) {
          return parseFloat(listInBoard.listID) === parseFloat(baitList.listID)
        })
      });

      // clear the lists of the board, and push the newly ordered lists
      board.lists = []
      _(req.body).forEach(function(editVal, editKey) {
        board.lists.push(editVal)
      })

      user.markModified('boards');
      user.save(function(err) {
        if (err) {
          res.send(err);
        };
        res.status(200).send();
      });

    });
  });

  app.put('/api/boards/:boardID', isLoggedIn, function(req, res) {
    //Edit a specific board
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        res.send(err);
      };

      board = _.find(user.boards, function(boardInArray) {
        return parseFloat(boardInArray.boardID) === parseFloat(req.params.boardID);
      });

      // parse through every field of req.body, compare against board in db
      // if true, change and save the edits
      _(req.body).forEach(function(editVal, editKey) {
        _(board).forEach(function(origVal, origKey) {
          if (editKey === origKey) {
            board[origKey] = editVal;
          };
        });
      });

      user.markModified('boards');
      user.save(function(err) {
        if (err) {
          res.send(err);
        };
        res.status(200).send();
      });

    });
  });

  app.put('/api/boards/lists/:boardID/:listID', isLoggedIn, function(req, res) {
    // Edit a list
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        res.send(err);
      };

      board = _.find(user.boards, function(boardInArray) {
        return parseFloat(boardInArray.boardID) === parseFloat(req.params.boardID);
      });
      list = _.find(board.lists, function(listInArray) {
        return parseFloat(listInArray.listID) === parseFloat(req.params.listID);
      });

      _(req.body).forEach(function(editVal, editKey) {
        _(list).forEach(function(origVal, origKey) {
          if (editKey === origKey) {
            list[origKey] = editVal;
          };
        });
      });

      user.markModified('boards');
      user.save(function(err) {
        if (err) {
          res.send(err);
        };
        res.status(200).send();
      });

    });
  });

  app.put('/api/boards/lists/cards/:boardID/:listID/:cardID', isLoggedIn, function(req, res) {
    // Edit a card
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        res.send(err);
      };

      // parse through database to locate the card to edit
      board = _.find(user.boards, function(boardInArray) {
        return parseFloat(boardInArray.boardID) === parseFloat(req.params.boardID);
      });
      list = _.find(board.lists, function(listInArray) {
        return parseFloat(listInArray.listID) === parseFloat(req.params.listID);
      });
      card = _.find(list.cards, function(cardInArray) {
        return parseFloat(cardInArray.cardID) === parseFloat(req.params.cardID);
      });

      // parse through the edit object and compare against card in db
      // if a key matches, change the original value to the editted value
      _(req.body).forEach(function(editVal, editKey) {
        _(card).forEach(function(origVal, origKey) {
          if (editKey === origKey) {
            card[origKey] = editVal;
          };
        });
      });

      // save changes to database
      user.markModified('boards');
      user.save(function(err) {
        if (err) {
          res.send(err);
        };
        res.status(200).send();
      });

    });
  });

  /////////////////////////////////////////////////////////////////////
  // DELETE API =========================================================
  /////////////////////////////////////////////////////////////////////
  app.delete('/api/boards/:id', isLoggedIn, function(req, res) {
    // Delete specific board
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        return res.send(err);
      };

      var board = _.find(user.boards, function(boardInArray) {
        return parseFloat(boardInArray.boardID) === parseFloat(req.params.id);
      });

      user.boards.splice(user.boards.indexOf(board), 1);
      user.save(function(err) {
        if (err) {
          res.send(err)
        } else {
        res.status(200).send();
        }
      });
    });
  });

  app.delete('/api/boards/lists/:boardID/:listID', isLoggedIn, function(req, res) {
    // Delete a List from a board
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        return res.send(err);
      };

      var board = _.find(user.boards, function(boardInArray) {
        return parseFloat(boardInArray.boardID) === parseFloat(req.params.boardID);
      });
      var list = _.find(board.lists, function(listInArray) {
        return parseFloat(listInArray.listID) === parseFloat(req.params.listID)
      });

      board.lists.splice(board.lists.indexOf(list), 1)
      user.markModified('boards')
      user.save(function(err) {
        if (err) {
          res.send(err);
        } else {
        res.status(200).send();
        };
      });
    });
  });

  app.delete('/api/boards/lists/cards/:boardID/:listID/:cardID', isLoggedIn, function(req, res) {
    // Delete a card from a list of a board
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (err) {
        return res.send(err);
      };

      board = _.find(user.boards, function(boardInArray) {
        return parseFloat(boardInArray.boardID) === parseFloat(req.params.boardID)
      });
      list = _.find(board.lists, function(listInArray) {
        return parseFloat(req.params.listID) === parseFloat(listInArray.listID)
      });
      pluckedCard = _.find(list.cards, function(cardInArray) {
        return parseFloat(req.params.cardID) === parseFloat(cardInArray.cardID)
      });
      list.cards.splice(_.indexOf(list.cards, pluckedCard), 1);

      user.markModified('boards');
      user.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.json(pluckedCard);
        };
      });

    });
  });

  // ///////////////////////////////////////////////////////////////
  // Route-level MIDDLEWARE =======================================
  /////////////////////////////////////////////////////////////////
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { // provided by passport
      return next();
    };
    res.redirect('/');
  };

  function hasActiveSession(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    };
    return next();
  };
};
