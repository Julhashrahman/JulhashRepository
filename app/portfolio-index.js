//portfolio-index.js

var portfolioIndexModule = angular.module('portfolioIndex', ['ngRoute', 'ngAnimate', 'cfp.loadingBarInterceptor', 'angular-loading-bar', 'bootstrapLightbox']);

portfolioIndexModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { redirectTo: '/portfolio/All/0' }).
        when('/portfolio', { redirectTo: '/portfolio/All/0' }).
        when("/portfolio/:category/:page", {
            controller: "portfoliosController",
            templateUrl: "/templates/portfolio/portfolioView.html"
        });

    $routeProvider.when("/newportfolio", {
        controller: "newPortfolioController",
        templateUrl: "/templates/portfolio/newPortfolioView.html"
    });


    $routeProvider.otherwise({ redirectTo: "/" });

}]);

portfolioIndexModule.factory("dataService", ['$http', '$q', function ($http, $q) {
    var _portfolioViewModel = [];
    var _isInit = false;
    var _isReady = function () {
        return _isInit;
    }

    var _getPortfolios = function (searchCriteria) {

        var deferred = $q.defer();
        //$http.get("/api/v1/portfolios?category=" + category + "&page=" + page)
        $http({
            method: 'Get',
            url: '/api/v1/portfolios/GetPortfolios',
            params: searchCriteria
        })
            .then(function (result) {
                //success
                console.log(result);

                angular.copy(result.data, _portfolioViewModel);


                console.log(_portfolioViewModel);

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

        $http.post("/api/v1/portfolios", newPortfolio)
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

        $http.put("/api/v1/portfolios/" + id, portfolio)
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
        portfolioViewModel: _portfolioViewModel,
        getPortfolios: _getPortfolios,
        isReady: _isReady,
        addPortfolio: _addPortfolio,
        updatePortfolio: _updatePortfolio
    };

}]);

portfolioIndexModule.controller('portfoliosController', ['$scope', '$http', 'dataService', '$routeParams', 'Lightbox', function portfoliosController($scope, $http, dataService, $routeParams, Lightbox) {

    $scope.data = dataService;

    $scope.portfolio = {};
    $scope.showProject = false;


    $scope.togglePrject = function (currentPortfolio) {
        $scope.portfolio = currentPortfolio;

        console.log($scope.project);

        $scope.showProject = !$scope.showProject;
    }


    $scope.isBusy = false;

    $scope.slideDown = function (currentPortfolio) {
        //this.portfolio.className = "slide-up";
        currentPortfolio.className = "slide-up";
    };

    $scope.slideUp = function (currentPortfolio) {
        //this.portfolio.className = "slide-down";
        currentPortfolio.className = "slide-down";
    };

    //if (dataService.isReady() == false) {
    //    $scope.isBusy = true;


    $scope.searchCriteria = {
        SelectedCategory: $routeParams.category || "All",
        PageIndex: $routeParams.page || 0,
        PageSize: "2"
    };

    //console.log($scope.searchCriteria);

    $scope.isBusy = true;
    dataService.getPortfolios($scope.searchCriteria)
    .then(function () {          //success
       // console.log($scope.data);
    },
        function () {           //error
            alert("could not load portfolios");
        })
    .then(function () {         //finally
        $scope.isBusy = false;
    });




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


    $scope.openLightboxModal = function (images, index) {
        Lightbox.openModal(images, index);
    }

}]);


//portfolioIndexModule.animation('cover-enter', function () {

//    console.log('I am in');

//    $('#projects-list .project').find(".cover")
//        .stop().animate({
//            top: "133"
//        }, "fast")
//        .stop().animate({
//            top: "0"
//    }, "fast");

//});



portfolioIndexModule.controller("newPortfolioController", ['$scope', '$http', '$window', 'dataService', 'fileUpload', function newPortfolioController($scope, $http, $window, dataService, fileUpload) {
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


portfolioIndexModule.filter('range', [function range() {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 1; i <= total; i++)
            input.push(i);
        return input;
    };
}]);


//-------------------------------- Directive for file upload ---------------------------------------------------//

portfolioIndexModule.directive('fileModel', ['$parse', function ($parse) {
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



portfolioIndexModule.service('fileUpload', ['$http', function ($http) {
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