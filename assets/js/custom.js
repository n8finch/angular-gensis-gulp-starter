(function (angular) {
  'use strict';

  angular.module('myApp', [])
    .controller('example', ['$scope', '$http', function ($scope, $http) {
      $http({
        url: 'https://n8finch.dev/wp-json/wp/v2/posts',
        cache: true
      }).success(function (res) {
        $scope.posts = res;
        console.log($scope.posts);
      });

    }])
    .filter('to_trusted', ['$sce', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(text);
      };
    }]);

})(window.angular);

//
// (function ($) {
//
//
// })(jQuery);


