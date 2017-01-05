///////////////////////////////////////////////////////////////
// Boards =====================================================
///////////////////////////////////////////////////////////////

krelloApp.directive('boardDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/board-display.html',
    replace: true
  }
});

krelloApp.directive('boardAddButton', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/board-add-button.html',
    replace: true
  }
});

///////////////////////////////////////////////////////////////
// Lists =====================================================
//////////////////////////////////////////////////////////////

krelloApp.directive('listDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/list-display.html',
    replace: true
  }
});

krelloApp.directive('listDropdown', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/list-dropdown.html',
    replace: true
  }
});

krelloApp.directive('listAddButton', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/list-add-button.html',
    replace: true
  }
});

///////////////////////////////////////////////////////////////
// Cards ====================================================
//////////////////////////////////////////////////////////////

krelloApp.directive('cardDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/card-display.html',
    replace: true
  }
});

krelloApp.directive('cardAddButton', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/card-add-button.html',
    replace: true
  }
});

krelloApp.directive('cardModal', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/card-modal.html',
    replace: true
  }
});

krelloApp.directive('cardModalTitle', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/card-modal-title.html',
    replace: true
  }
});

krelloApp.directive('cardModalSidebar', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/card-modal-sidebar.html',
    replace: true
  }
});

krelloApp.directive('cardModalContent', function() {
  return {
    restrict: 'E',
    templateUrl: 'static/scripts/directives/card-modal-content.html',
    replace: true
  };
});
