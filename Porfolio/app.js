//Angular.js
var app = angular
.module("myApp", [ngRoute])
.controller("myCtrl", function($scope) {
            $scope.myfunction = function(){
                $scope.color = "green";
            }
             }
             );

//Jquery.js
$(document).ready(function()
{
$("nav li").not(".logo, .specialization").on("click", function(){
    $("nav li").removeClass("active");     //remove the active class from all div tags
    $("nav li").css("border-left","");   //remove the border-left fromm all div tags
    $(this).addClass("active");
    var id_value = $(this).attr("id");
    switch(id_value)
    {
        case "a":
         $(this).css("border-left","5px solid rgba(54, 170, 54, 0.897)");
         break;
         case "e":
         $(this).css("border-left","5px solid rgb(180, 61, 180)");
         break;
         case "s":
         $(this).css("border-left","5px solid rgb(214, 60, 60)");
         break;
         case "p":
         $(this).css("border-left","5px solid rgb(212, 212, 47)");
         break;
         case "c":
         $(this).css("border-left","5px solid rgb(69, 69, 209)");
         break;
         case "r":
         $(this).css("border-left","5px solid white");
         break;
         default:
         break;
    }
    
});

$(".menu").on("click",function(){
    $("ul").slideToggle("slow");
});
});


    

