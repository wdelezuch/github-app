var githubApp = angular.module('github-app.controllers', []);

/**
 * MainCtrl - controller
 */
githubApp.controller('MainCtrl', ['$scope', 'Repository', function ($scope, Repository) {
    $scope.repositories = [];
    $scope.username = {val: ''};

    $scope.searchRepo = function () {
        Repository.query({username: $scope.username.val},
            function (response) {
                $scope.repositories = response;
                if ($scope.repositories.length == 0) {
                    window.alert('Github user has no repos');
                }
            },
            function (error) {
                $scope.repositories = [];
                var errorMsg = '';
                switch (error.status) {
                    case 404:
                        errorMsg = 'The Github user does not exist';
                        break;
                    case 503:
                        errorMsg = 'Github API does not respond';
                        break;
                    default:
                        errorMsg = 'Unexpected API error';
                }
                window.alert(errorMsg);
            }
        );
    }
}]);
