krelloApp.controller('boardController', ['$resource', '$location', '$http',
'$routeParams', 'BoardCreator', 'BoardDeleter', 'Requests', 'BoardEditor',
function($resource, $location, $http, $routeParams, BoardCreator, BoardDeleter,
Requests, BoardEditor) {

  self = this
  this.listRedirect = function(board) {$location.path('/lists/' + board.boardID)};
  this.user = Requests.User.get();
  this.boards = BoardCreator.boards; // required for deleting boards
  this.allBoards = Requests.userBoards.get();
  this.boardDetails = {}; // details for creating board
  this.boardEdits = {};   // details for editing board

  this.deleteBoard = function(board) {BoardDeleter.deleteBoard(board);}
  this.addBoard = function(boardCtrl) {BoardCreator.addBoard(boardCtrl)};
  this.editBoard = function(board, boardCtrl) {BoardEditor.editBoard(board, boardCtrl)};

}]);

krelloApp.controller('listController', ['SaveListPosition', 'CardEditor', 'ListEditor', '$resource', '$location',
'$http', '$routeParams', 'Requests', 'ListCreator', 'ListDeletor', 'CardCreator',
'CardDeletor',
function(SaveListPosition, CardEditor, ListEditor, $resource, $location, $http, $routeParams, Requests,
ListCreator, ListDeletor, CardCreator, CardDeletor) {

  self = this

  this.boardIDParam = $routeParams.boardID
  this.boards = Requests.userBoards.get();
  this.lists = Requests.userBoards.get({id: this.boardIDParam});
  this.listDetails = {};  // details for creation lists
  this.cardDetails = {};  // details for creation cards
  this.listEdits = {};    // details for editing lists
  this.cardEdits = {};    // details for editing cards
  this.sortableOptions = {'ui-floating': true, revert: true, update: function(e, ui) {
    SaveListPosition.savePosition(ui.item.sortable.sourceModel)
  }} // used for Angular-UI Sortable js
  this.labels = [{colour: 'red', on: true},
  {colour: 'orange', on: true},
  {colour: 'yellow', on: true},
  {colour: 'green', on: true},
  {colour: 'blue', on: true},
  {colour: 'violet', on: true}]

  this.deleteList = function(list, listCtrl) {ListDeletor.deleteList(list, listCtrl)};
  this.addList = function(listCtrl) {ListCreator.addList(listCtrl)}
  this.editList = function(list, listCtrl) {ListEditor.editList(list, listCtrl)}

  this.deleteCard = function(card, list, listCtrl) {CardDeletor.deleteCard(card, list, listCtrl)};
  this.addCard = function(list, listCtrl) {CardCreator.addCard(list, listCtrl)};
  this.editCard = function(card, list, listCtrl) {CardEditor.editCard(card, list, listCtrl)}

}]);
