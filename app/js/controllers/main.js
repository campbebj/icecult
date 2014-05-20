'use strict';

EiskaltApp.controller('MainCtrl', function ($scope, $location, $interval, EiskaltRPC) {
    EiskaltRPC.ShowVersion().success(function (data) {
        $scope.version = data;
    });

    var refreshData = function () {
        EiskaltRPC.GetHashStatus().success(function (data) {
            $scope.hashing = data;
        });
        EiskaltRPC.ShowRatio().success(function (data) {
            $scope.ratio = data;
        });
    }
    refreshData();
    var refreshDataTimer = $interval(refreshData, REFRESH['hash_ratio']);
    $scope.$on("$destroy", function(event) {
        $interval.cancel(refreshDataTimer);
    });

    $scope.isActive = function (route) {
        return route === $location.path();
    }

    $scope.refreshShare = function () {
        EiskaltRPC.RefreshShare().success(refreshData);
    }
});