var services = angular.module('github-app.services', ['ngResource']);

services.factory('Repository', ['$resource', function($resource){
    return $resource('https://api.github.com/users/:username/repos', {},
        {
            'get': {method: 'GET'}
        });
}]);
