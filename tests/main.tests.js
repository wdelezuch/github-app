'use strict';

describe('MainCtrl', function(){
    var scope, $httpBackend;

    beforeEach(angular.mock.module('github-app'));
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'https://api.github.com/users/userWithTwoRepos/repos').respond([
            {id: 1, name: 'name 1', description: 'desc 1', html_url: 'http://github.com'},
            {id:2, name: 'name 2', description: 'desc 2', html_url: 'http://github.com'}
        ]);
        $httpBackend.when('GET', 'https://api.github.com/users/userWithoutRepos/repos').respond([]);
        $httpBackend.when('GET', 'https://api.github.com/users/notExistsUser/repos').respond(404);
        $httpBackend.when('GET', 'https://api.github.com/users/wdelezuch/repos').respond(503);
        $httpBackend.whenGET('views/common/content.html').respond(200, '');
        $httpBackend.whenGET('views/main.html').respond(200, '');

        scope = $rootScope.$new();

        $controller('MainCtrl', {$scope: scope});
    }));

    // tests

    it('Github user has repos', function(){
        scope.username.val = 'userWithTwoRepos';
        scope.searchRepo();

        $httpBackend.flush();
        expect(scope.repositories.length).toBeGreaterThan(0);
    });

    it('Github user has no repos', function(){
        scope.username.val = 'userWithoutRepos';
        scope.searchRepo();

        spyOn(window, 'alert');

        $httpBackend.flush();
        expect(window.alert).toHaveBeenCalledWith('Github user has no repos');
    });

    it('The Github user does not exist', function(){
        scope.username.val = 'notExistsUser';
        scope.searchRepo();

        spyOn(window, 'alert');

        $httpBackend.flush();
        expect(window.alert).toHaveBeenCalledWith('The Github user does not exist');
    });

    it('Github API does not respond', function(){
        scope.username.val = 'wdelezuch';
        scope.searchRepo();

        spyOn(window, 'alert');

        $httpBackend.flush();
        expect(window.alert).toHaveBeenCalledWith('Github API does not respond');
    });

});