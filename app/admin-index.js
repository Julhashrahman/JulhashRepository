//admin-index.js

var adminIndexModule = angular.module('adminIndex', ['ngRoute']);

adminIndexModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/", {redirectTo: '/portfolio/0/e-commerce'}).
        when("/portfolio/:page/:category", {
        controller: "portfoliosController",
        templateUrl: "/templates/admin/portfolioView.html"
    });

    $routeProvider.when("/newportfolio", {
        controller: "newPortfolioController",
        templateUrl: "/templates/admin/newPortfolioView.html"
    });


    $routeProvider.otherwise({ redirectTo: "/" });

}]);

adminIndexModule.factory("dataService",['$http', '$q', function ($http, $q) {
    var _paginatedPortfolio = [];
    var _isInit = false;
    var _isReady = function () {
        return _isInit;
    }

    var _getPortfolios = function (page, category) {
        var deferred = $q.defer();
        $http.get("/api/adminapi?page=" + page + "&category=" + category)
            .then(function (result) {
                //success
                angular.copy(result.data, _paginatedPortfolio);

                _isInit = true;
                deferred.resolve();
            },
            function () {
                //Error
                deferred.reject();
            });

        return deferred.promise;
    } //_getPortfolios


    var _addPortfolio = function (newPortfolio) {
        var deferred = $q.defer();

        $http.post("/api/adminapi", newPortfolio)
            .then(function (result) {
                //success
                var newlyCreatedPortfolio = result.data;

                _paginatedPortfolio.portfolios.splice(0, 0, newlyCreatedPortfolio);

                deferred.resolve(newlyCreatedPortfolio);
            }, function () {
                //error
                deferred.reject();
            });

        return deferred.promise;
    }


    var _updatePortfolio = function (id, portfolio) {
        var deferred = $q.defer();

        $http.put("/api/adminapi/" + id, portfolio)
            .success(function (data) {
                alert("saved successfully");
                deferred.resolve(portfolio);
            })
            .error(function () {
                alert("Something went wrong!");
                deferred.reject();
            });
        return deferred.promise;
    }


    return {
        paginatedPortfolio: _paginatedPortfolio,
        getPortfolios: _getPortfolios,
        isReady: _isReady,
        addPortfolio: _addPortfolio,
        updatePortfolio: _updatePortfolio
    };

}]);



adminIndexModule.controller('portfoliosController',['$scope', '$http', 'dataService', '$routeParams', function portfoliosController($scope, $http, dataService, $routeParams) {

    //$scope.portfolio = {};

    $scope.data = dataService;

    $scope.isBusy = false;

    //if (dataService.isReady() == false) {
    //    $scope.isBusy = true;

    dataService.getPortfolios($routeParams.page, $routeParams.category)
        .then(function () {
            //success
        },
            function () {
                //error
                alert("could not load portfolios");
            })
        .then(function () {
            $scope.isBusy = false;
        });

    // }

        $scope.editMode = false;

        //by pressing toggleEdit button ng-click in html, this method will be hit
        $scope.toggleEdit = function (portfolio) {
        //$scope.editMode = !$scope.editMode; //this is for all
        $scope.editMode = portfolio;
    }

    //update
    $scope.update = function (portfolio) {

        dataService.updatePortfolio(portfolio.ID, portfolio);
        $scope.editMode = false;
    }
}]);



adminIndexModule.controller("newPortfolioController",['$scope', '$http', '$window', 'dataService', 'fileUpload', function newPortfolioController($scope, $http, $window, dataService, fileUpload) {
    $scope.newPortfolio = {};

    $scope.save = function () {
        dataService.addPortfolio($scope.newPortfolio)
            .then(function () {
                //success
                $window.location = "#/";
            }, function () {
                //error
                alert("could not save the new portfolio");
            });
    }
    
    $scope.uploadImage = function () {

        var file = $scope.myFile;
        
        var uploadUrl = "/api/v1/portfolios/PostImageUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    }

}]);


adminIndexModule.filter('range',[ function range() {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 1; i <= total; i++)
            input.push(i);
        return input;
    };
}]);


//-------------------------------- Directive for file upload ---------------------------------------------------//

adminIndexModule.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);



adminIndexModule.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function () {
        })
        .error(function () {
        });
    }
}]);

//--------------------------------End of directive for file upload ---------------------------------------------------//