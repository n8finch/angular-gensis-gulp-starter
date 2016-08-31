(function (angular) {
  'use strict';


  angular.module('myApp', ['ngResource', 'ui.router'])
    .controller('Posts', ['$scope', '$http', function ($scope, $http) {
      $http({
        url: 'https://n8finch.dev/wp-json/wp/v2/posts',
        cache: true
      }).success(function (res) {
        $scope.posts = res;
      });

    }])
    //FACTORIES

    .factory('PostsBySlug', function ($resource) {
      return $resource(ajaxInfo.api_url + 'posts/this/:id', {
        id: '@id'
      });
    })
    .controller('singleView', ['$scope', '$http', 'PostsBySlug', '$stateParams', function ($scope, $http, PostsBySlug, $stateParams) {

      // console.log(
      //   PostsBySlug.get($stateParams, function (res) {
      //     console.log($stateParams);
      //     $scope.post = res;
      //   })
      // );

      console.log($stateParams.slug);

      $http({
        url: 'https://n8finch.dev/wp-json/wp/v2/posts?filter[name]=' + $stateParams.slug,
        cache: true
      }).success(function (res) {
        console.log(res[0]);
        $scope.post = res[0];
      });

      //TODO: read and understand all of this.
      //TODO: figure out commenting, or just add that in at the bottom??
      // $scope.savecomment = function(){
      //   $scope.openComment.post = $scope.post.ID;
      //   Comments.save($scope.openComment,function(res){
      //     if( res.id ) {
      //       $scope.openComment = {};
      //       $scope.openComment.post = $scope.post.ID;
      //       PostsBySlug.get($stateParams,function(res){
      //         $scope.post = res.post;
      //       });
      //     }
      //   });
      // }

    }])
    //ROUTES
    .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('post', {
          url: '/',
          controller: 'Posts',
          templateUrl: ajaxInfo.template_directory + 'assets/templates/app-index.html'
        })
        .state('single', {
          url: '/post/:slug',
          controller: 'singleView',
          templateUrl: ajaxInfo.template_directory + 'assets/templates/single.html'
        })
    })
    .filter('to_trusted', ['$sce', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(text);
      };
    }]);


})(window.angular);


