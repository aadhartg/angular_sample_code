angular.module('MyApp')
  .controller('SignupCtrl', function($scope, toaster, CommonCollection ) {
    $scope.signup = function() {
         toaster.clear();
        CommonCollection.signup($scope.credentials).$promise.then(function (res) {
            
              toaster.success(res.msg);
          //  $state.go('login');
        }, function (error) {
            toaster.clear();
            toaster.error(error.msg);
            console.log(error.msg);
        });
    };

$scope.overwrite = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        
        $scope.Password = ' ';
    };


 $scope.valid=  function (){
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var email = $("#email").val();
        var contact = $("#contact").val();


        if( fname.indexOf(" ") !== -1)
        {
            $scope.modalvalue = "Spaces are not allowed";registermodal.show();
        }
        else if( lname.indexOf(" ") !== -1){
            $scope.modalvalue = "Spaces are not allowed";registermodal.show();
        }
        else if( lname.indexOf(" ") !== -1){
            $scope.modalvalue = "Spaces are not allowed";registermodal.show();
        }
        else if( contact.indexOf(" ") !== -1){
            $scope.modalvalue = "Spaces are not allowed";registermodal.show();
        }
    }




  });