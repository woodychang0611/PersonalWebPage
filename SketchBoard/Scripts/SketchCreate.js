var myApp = angular.module("myApp", []);
myApp.controller("myController",
    function ($scope) {
        $scope.password = "";
        $scope.repeatPassword = "";
        $scope.isPasswordRepeat = true;

        $scope.$watchCollection('[password,repeatPassword]',
            function () {
                if ($scope.password == $scope.repeatPassword) {
                    $("input[name$='repeatPassword']").removeClass('alert-danger');
                    $scope.isPasswordRepeat = true;
                } else {
                    $("input[name$='repeatPassword']").addClass('alert-danger');
                    $scope.isPasswordRepeat = false;
                }
            }
        )
    });