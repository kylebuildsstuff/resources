krelloApp.config(function($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'static/scripts/pages/boards.html',
    controller: 'boardController as boardCtrl'
  })

  .when('/lists/:boardID', {
    templateUrl: 'static/scripts/pages/lists.html',
    controller: 'listController as listCtrl'
  })
  // need routes with parameters. route --> list page with board ID.
  // extract url params with angular and make $resource get the lists from the board
});
