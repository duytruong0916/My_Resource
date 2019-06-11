var app = angular
.module("myApp", [])
.controller("myCtrl", function($scope) {
             var employees = [{name:"duy truong", address:"3018 gladiola ct"},{name:"hung nguyen", address:"3000 jupiter"}];
             $scope.employees =employees;
             $scope.change_name = function(){
                $scope.employees[0].name = "nhat duy";
             }
             });