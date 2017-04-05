krelloApp.factory('Requests', ['$resource', function($resource) {

  return {
    User: $resource('/api/user', {}, {}), // GET user
    userLists: $resource('/api/boards/lists/:cards/:boardID/:listID/:cardID', {}, {
      put: { method: 'PUT'}
    }), // PUT lists and cards of list
    userBoards: $resource('/api/boards/:sort/:id', {}, { // GET boards & lists
      get: { method: 'GET', isArray: true },
      put: { method: 'PUT'}
    }
  )};

}]);

/////////////////////////////////////////////////////////////////////////////
// Sortable UI ============================================================
/////////////////////////////////////////////////////////////////////////////

// Save position of lists sorted in db
krelloApp.service('SaveListPosition', ['$resource', 'Requests',
function($resource, Requests) {

  this.savePosition = function(lists) {
    // send a API request to save the board's lists in the new sorted position
    var listSorter = new Requests.userBoards(lists);
    listSorter.$put({sort: "sort"});
  };

}]);

///////////////////////////////////////////////////////////////////////////////
// CREATE Services ===========================================================
//////////////////////////////////////////////////////////////////////////////

// Create a Board
krelloApp.service('BoardCreator', ['$resource', 'Requests',
function($resource, Requests) {

  self = this;

  this.boards = Requests.userBoards.get();
  this.addBoard = function(boardCtrl) {
    var board = {
      title: boardCtrl.boardDetails.title,
      boardID: Math.floor((Math.random()*100000)+1),
      lists: []
    };
    boardCtrl.boards.push(board);
    boardCtrl.createBoardMode = !boardCtrl.createBoardMode;
    boardCtrl.boardDetails = {};

    var newBoard = new Requests.userBoards(board);
    newBoard.$save();
  };

}]);

// Create a List
krelloApp.service('ListCreator', ['$resource', 'Requests', function($resource, Requests) {

  this.addList = function(listCtrl) {
    var list = {
      title: listCtrl.listDetails.title,
      listID: Math.floor((Math.random()*100000)+1),
      cards: []
    };
    listCtrl.lists.push(list);
    listCtrl.createListMode = !listCtrl.createListMode;
    listCtrl.listDetails = {};

    var newList = new Requests.userLists(list);
    newList.$save({boardID: listCtrl.boardIDParam});
  };

}]);

// Create a Card
krelloApp.service('CardCreator', ['$resource', 'Requests',
function($resource, Requests) {

  this.addCard = function(list, listCtrl) {
    var card = {
      title: listCtrl.cardDetails.title,
      description: "Description",
      labels: [],
      cardID: Math.floor((Math.random()*100000)+1)
    };
    list.cards.push(card);
    listCtrl.cardDetails = {};

    var listToAddCardTo = new Requests.userLists(card);
    listToAddCardTo.$save({cards: "cards", boardID: listCtrl.boardIDParam, listID: list.listID})
  }

}]);

///////////////////////////////////////////////////////////////////////////////
// EDIT Services ===========================================================
//////////////////////////////////////////////////////////////////////////////

// Edit a board
krelloApp.service('BoardEditor', ['$resource', 'Requests', 'BoardCreator',
function($resource, Requests, BoardCreator) {

  // parse through each key in edits, and compare with original board keys.
  // if different, then change the value
  this.editBoard = function(board, boardCtrl) {
    _(boardCtrl.boardEdits).forEach(function(editVal, editKey) {
      _(board).forEach(function(origVal, origKey) {
        if (editKey === origKey) {
          board[origKey] = editVal;
        };
      })
    });

    // AJAX to the backend
    var boardEdits = new Requests.userBoards(boardCtrl.boardEdits);
    boardEdits.$put({id:board.boardID});

    // Reset Defaults
    board.boardOptionMode=false;
    board.editBoardMode=false;
    boardCtrl.boardEdits = {};
  };

}]);

// Edit a List
krelloApp.service('ListEditor', ['$resource', 'Requests',
function($resource, Requests) {

  this.editList = function(list, listCtrl) {
    _(listCtrl.listEdits).forEach(function(editVal, editKey) {
      _(list).forEach(function(origVal, origKey) {
        if (editKey === origKey) {
          list[origKey] = editVal;
        };
      });
    });

    var listEdits = new Requests.userLists(listCtrl.listEdits);
    listEdits.$put({boardID: listCtrl.boardIDParam, listID: list.listID})

    list.listOptionMode = false;
    list.editListMode = false;
    listCtrl.listEdits = {};
  };

}]);

// Edit a Card
krelloApp.service('CardEditor', ['$resource', 'Requests',
function($resource, Requests) {

  // parse through list of edits and compare vs card fields.
  // if fields match, change the original value to the edited
  this.editCard = function(card, list, listCtrl) {
   _(listCtrl.cardEdits).forEach(function(editVal, editKey) {
     _(card).forEach(function(origVal, origKey) {
       // Edit front end models before editting db models
       if (editKey === origKey) {
         card[origKey] = editVal;
       };
     });
   });
   console.log(listCtrl.cardEdits)

   // parse through the default labels and see if picked = true
   // if (picked) { ...add to cardEdits }
   //
  //  _(listCtrl.labels).forEach(function(label, labelKey) {
  //    if (label.picked) {
  //      listCtrl.cardEdits.labels.push(label.colour);
  //    }
  //  })

   var cardEdits = new Requests.userLists(listCtrl.cardEdits);
   cardEdits.$put({cards: "cards", boardID: listCtrl.boardIDParam, listID: list.listID, cardID: card.cardID})

   card.editCardModeTitle = false;
   card.editCardModeDescription = false;
   listCtrl.cardEdits = {};
  };

}]);

///////////////////////////////////////////////////////////////////////////////
// DELETE Services ===========================================================
//////////////////////////////////////////////////////////////////////////////

// Delete a Board
krelloApp.service('BoardDeleter', ['$resource', 'Requests', 'BoardCreator',
function($resource, Requests, BoardCreator) {

  this.deleteBoard = function(board) {
    var deletedBoard = new Requests.userBoards();
    pluckedBoard = _.find(BoardCreator.boards, function(boardInArray) {
      return parseFloat(board.boardID) === parseFloat(boardInArray.boardID);
    });
    // remove board client side before removing it server side
    self.boards.splice(BoardCreator.boards.indexOf(pluckedBoard), 1)
    deletedBoard.$delete({id:board.boardID});
  };

}]);

// Delete a List
krelloApp.service('ListDeletor', ['$resource', 'Requests',
function($resource, Requests) {

  this.deleteList = function(list, listCtrl) {
    var pluckedList = _.find(listCtrl.lists, function(listInArray) {
      return parseFloat(list.listID) === parseFloat(listInArray.listID)
    });
    // remove list client side before removing it server side
    listCtrl.lists.splice(listCtrl.lists.indexOf(pluckedList), 1);
    var deletedList = new Requests.userLists();
    deletedList.$delete({boardID: listCtrl.boardIDParam, listID: list.listID});
  };

}]);

// Delete a card
krelloApp.service('CardDeletor', ['$resource', 'Requests',
function($resource, Requests) {

  this.deleteCard = function(card, list, listCtrl) {
    var listToDeleteCardFrom = new Requests.userLists();
    // find list picked by user
    var pluckedList = _.find(listCtrl.lists, function(listInArray) {
      return parseFloat(list.listID) === parseFloat(listInArray.listID)
    });
    // remove card client side before removing it server side
    cards = list.cards;
    card = _.find(cards, function(cardInArray) {
      return parseFloat(cardInArray.cardID) === parseFloat(card.cardID)
    });
    cards.splice(_.indexOf(cards, card), 1)
    listToDeleteCardFrom.$delete({cards: "cards", boardID: listCtrl.boardIDParam, listID: list.listID, cardID: card.cardID});
  };

}])
