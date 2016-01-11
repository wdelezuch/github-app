function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index/main");

    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html"
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html"
        })
}
angular
    .module('github-app')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
