var krelloApp = angular.module('krelloApp', ['ngResource', 'ngRoute']);

krelloApp.controller('boardController', ['$scope', '$resource', '$location', '$http', '$routeParams', 'BoardManipulator', 'Requests',
function($scope, $resource, $location, $http, $routeParams, BoardManipulator, Requests) {

  $scope.listRedirect = function(board) {$location.path('/lists/' + board.boardID)};
  $scope.user = Requests.User.get();
  $scope.boards = BoardManipulator.boards; // required for deleting boards
  $scope.allBoards = Requests.userBoards.get();

  $scope.deleteBoard = function(board) {BoardManipulator.deleteBoard(board);}
  $scope.addBoard = function(boards, boardDetails) {
    BoardManipulator.addBoard(boards, boardDetails);
    // reset defaults
    $scope.createBoardMode = !$scope.createBoardMode;
    $scope.boardDetails = {};
  };

}]);

krelloApp.controller('listController', ['$scope', '$resource', '$location', '$http', '$routeParams', 'Requests', 'ListManipulator', 'CardManipulator',
function($scope, $resource, $location, $http, $routeParams, Requests, ListManipulator, CardManipulator) {

  $scope.boardIDParam = $routeParams.boardID
  $scope.lists = Requests.userBoards.get({id: $scope.boardIDParam });
  $scope.listDetails = {};
  $scope.cardDetails = {};

  $scope.deleteList = function(list, lists, boardIDParam) {ListManipulator.deleteList(list, lists, boardIDParam)};
  $scope.addList = function(lists, boardIDParam, listDetails) {
    ListManipulator.addList(lists, boardIDParam, listDetails)
    $scope.createListMode = !$scope.createListMode;
    $scope.listDetails = {};
  }

  $scope.deleteCard = function(card, list, lists, boardIDParam, cardDetails) {CardManipulator.deleteCard(card, list, lists, boardIDParam)};
  $scope.addCard = function(list, lists, boardIDParam, cardDetails) {
    CardManipulator.addCard(list, lists, boardIDParam, cardDetails)
    $scope.createCardMode = !$scope.createCardMode;
    $scope.cardDetails = {};
  };

}]);

// weatherApp.directive("weatherReport", function() {
//   return {
//     restrict: 'E',
//     templateUrl: 'directives/weatherReport.html',
//     replace: true,
//     scope: {
//       weatherDay: "=",
//       convertToStandard: "&", //convert temperature
//       convertToDate: "&",
//       dateFormat: "@"
//     }
//   }
// });

krelloApp.config(function($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'static/scripts/pages/boards.html',
    controller: 'boardController'
  })

  .when('/lists/:boardID', {
    templateUrl: 'static/scripts/pages/lists.html',
    controller: 'listController'
  })
  // need routes with parameters. route --> list page with board ID.
  // extract url params with angular and make $resource get the lists from the board
});

krelloApp.factory('Requests', ['$resource', function($resource) {

  return {
    User: $resource('/api/user', {}, {}), // GET user
    userLists: $resource('/api/boards/lists/:cards/:boardID/:listID/:cardID', {}, {}), // PUT lists and cards of list
    userBoards: $resource('/api/boards/:id', {}, { // GET boards & lists
      get: { method: 'GET', isArray: true }
    }
  )};

}]);

krelloApp.service('BoardManipulator', ['$resource', 'Requests', function($resource, Requests) {
  // Creates and deletes boards

  self = this;

  this.boards = Requests.userBoards.get();
  this.addBoard = function(boards, createBoardDetails) {
    var board = {
      title: createBoardDetails.title,
      boardID: Math.floor((Math.random()*100000)+1),
      lists: []
    };
    boards.push(board);
    var newBoard = new Requests.userBoards(board);
    newBoard.$save();
  };
  
  this.deleteBoard = function(board) {
    var deletedBoard = new Requests.userBoards();
    pluckedBoard = _.find(self.boards, function(boardInArray) {
      return parseFloat(board.boardID) === parseFloat(boardInArray.boardID);
    });
    // remove board client side before removing it server side
    self.boards.splice(self.boards.indexOf(pluckedBoard), 1)
    deletedBoard.$delete({ id: board.boardID });
  };

}]);

krelloApp.service('ListManipulator', ['$resource', 'Requests', function($resource, Requests) {
  // Creates and deletes lists

  this.addList = function(lists, boardIDParam, listDetails) {
    var list = {
      title: listDetails.title,
      listID: Math.floor((Math.random()*100000)+1),
      cards: []
    };
    lists.push(list);
    var newList = new Requests.userLists(list);
    newList.$save({boardID: boardIDParam});
  };

  this.deleteList = function(list, lists, boardIDParam) {
    var pluckedList = _.find(lists, function(listInArray) {
      return parseFloat(list.listID) === parseFloat(listInArray.listID)
    });
    // remove list client side before removing it server side
    lists.splice(lists.indexOf(pluckedList), 1);
    var deletedList = new Requests.userLists();
    deletedList.$delete({boardID: boardIDParam, listID: list.listID});
  };

}]);

krelloApp.service('CardManipulator', ['$resource', 'Requests', function($resource, Requests) {
  // Creates and deletes cards

  this.addCard = function(list, lists, boardIDParam, cardDetails) {
    var card = {
      title: cardDetails.title,
      description: cardDetails.description,
      cardID: Math.floor((Math.random()*100000)+1)
    };
    list.cards.push(card);
    var listToAddCardTo = new Requests.userLists(card);
    listToAddCardTo.$save({cards: "cards", boardID: boardIDParam, listID: list.listID})
  }

  this.deleteCard = function(card, list, lists, boardIDParam) {
    var listToDeleteCardFrom = new Requests.userLists();
    // find list picked by user
    var pluckedList = _.find(lists, function(listInArray) {
      return parseFloat(list.listID) === parseFloat(listInArray.listID)
    });
    // remove card client side before removing it server side
    cards = list.cards;
    card = _.find(cards, function(cardInArray) {
      return parseFloat(cardInArray.cardID) === parseFloat(card.cardID)
    });
    cards.splice(_.indexOf(cards, card), 1)
    listToDeleteCardFrom.$delete({cards: "cards", boardID: boardIDParam, listID: list.listID, cardID: card.cardID});
  };

}]);
