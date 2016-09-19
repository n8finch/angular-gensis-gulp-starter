(function (angular) {
  'use strict';


  angular.module('myApp', ['ngResource', 'ui.router'])
    //CONTROLLERS
    .controller('Posts', ['$scope', '$http', function ($scope, $http) {
      $http({
        url: 'https://n8finch.dev/wp-json/wp/v2/posts',
        cache: true
      }).success(function (res) {
        $scope.posts = res;
      });

    }])
    .controller('singleView', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
      console.log('singleview running');
      $http({
        url: 'https://n8finch.dev/wp-json/wp/v2/posts?filter[name]=' + $stateParams.slug,
        cache: true
      }).success(function (res) {
        $scope.post = res[0];
      });
    }])
    .controller('pageView', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
      console.log('pageView running');
      $http({
        url: 'https://n8finch.dev/wp-json/wp/v2/pages?filter[name]=' + $stateParams.slug,
        cache: true
      }).success(function (res) {
        $scope.post = res[0];
      });
    }])
    //ROUTES
    .config([ '$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('posts', {
          url: '/',
          controller: 'Posts',
          templateUrl: ajaxInfo.template_directory + 'assets/templates/app-index.html'
        })
        .state('single', {
          url: '/posts/:slug/',
          controller: 'singleView',
          templateUrl: ajaxInfo.template_directory + 'assets/templates/single.html'
        })
        .state('page', {
          url: '/pages/:slug/',
          controller: 'pageView',
          templateUrl: ajaxInfo.template_directory + 'assets/templates/page.html'
        });

      //Enable pretty permalinks, sans the #
      $locationProvider.html5Mode(true);
    }])
    .filter('to_trusted', ['$sce', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(text);
      };
    }]);


})(window.angular);


