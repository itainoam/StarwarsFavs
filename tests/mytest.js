describe('Hello World example', function() {

    beforeEach(module('app'));

    var HelloWorldController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        HelloWorldController = $controller('HelloWorldController', {
            $scope: scope
        });
    }));
    it('says hello world!', function () {
        expect(scope.greeting).toEqual("Hello world!”);
    });

});
