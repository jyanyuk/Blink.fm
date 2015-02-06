/**
 * Created by tungpham31 on 1/21/15.
 *
 * A module for the navigation bar.
 */

angular.module('navBar', ['auth'])
  .controller('NavBarCtrl', ['authSrv', '$scope', '$rootScope', '$location',
    function(authSrv, $scope, $rootScope, $location) {
      $scope.hasCurrentUser = false;
      $scope.showSearchBar = $location.path() !== '/';

      $scope.$on('$locationChangeSuccess', function (event) {
        $scope.showSearchBar = $location.path() !== '/';
      });

      authSrv.getCurrentUser(function (currentUser) {
        if (currentUser && currentUser.username) {
          $scope.hasCurrentUser = true;
        }
      });

      $rootScope.$on('/auth/login', function(event) {
        $scope.hasCurrentUser = true;
      });

      $rootScope.$on('/auth/logout', function(event) {
        $scope.hasCurrentUser = false;
      });

      $scope.logout = function() {
        authSrv.logout();
      }
    }])
  .directive('navBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'modules/navBar/navBar.html'
    };
  });
