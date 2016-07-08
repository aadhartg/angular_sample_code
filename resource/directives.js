function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}
"use strict";
frontAppSpto.directive('checkFileSize', function () {

    return {
        link: function (scope, elem, attr, ctrl) {
            function bindEvent(element, type, handler) {
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                } else {
                    element.attachEvent('on' + type, handler);
                }
            }
            bindEvent(elem[0], 'change', function () {
                alert('File size:' + this.files[0].size);
            });
        }
    }
}).directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };
            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
})
  .directive('noWhitespace', ['$parse', function($parse) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        /*
        scope.$watch(attrs.ngModel, function(value) {
          var getter = $parse(value);
          update(getter(scope));
        });
        */
        function update(viewValue) {
         
          if (viewValue.match(/\s/)) {
            ngModel.$setValidity('whitespace', false);
            return undefined;
          } else {
            ngModel.$setValidity('whitespace', true);
            return viewValue;
          }
        }
        ngModel.$parsers.unshift(update);
      }
    };
  }])
.directive('ngMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function (value) {
                var max = scope.$eval(attr.ngMax) || Infinity;
                if (!isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };
            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
}).directive("compareTo", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {
         
            element.val();
            ngModel.$validators.compareTo = function (modelValue) {
                         
                  if(modelValue){
                     return modelValue == scope.otherModelValue;
                  }
            };
            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
}).directive("feedbackRating", function () {
//var maxRating=3
    return {
        require: '^ng-status',
        scope: {
            ngStatus: '@',
            ngModel: '@'
        },
        restrict: 'A',
        template: '  <div class="radio-button-group" data-toggle="buttons">' +
                '<label class="btn btn-default" ng-class="{\'active\':ngStatus==0}">' +
                '<input type="radio" id="q156" ng-model="questions[$index].answers" name="quality[25]" ng-value="0" ng-checked="ngStatus==0"/> 0' +
                '</label>' +
                '<label class="btn btn-default"  ng-class="{\'active\':ngStatus==1}">' +
                '<input type="radio" id="q157" ng-model="questions[$index].answers" name="quality[25]" ng-value="1" ng-checked="ngStatus==1" /> 1' +
                '</label>' +
                '<label class="btn btn-default" ng-class="{\'active\':ngStatus==2}">' +
                '<input type="radio" id="q158" ng-model="questions[$index].answers" name="quality[25]" ng-value="2" ng-checked="ngStatus==2"/> 2' +
                '</label><label class="btn btn-default" ng-class="{\'active\':ngStatus==3}">' +
                '<input type="radio" id="q159" ng-model="questions[$index].answers" name="quality[25]" ng-value="3" ng-checked="ngStatus==0"/> 3' +
                '</div>'
    }
}).directive("timer", function () {
//var maxRating=3
    return {
        scope: {
            ngStatus: '@',
            ngModel: '@'
        },
        restrict: 'A',
        link: function (scope, element, attributes, ngModel) {
            var htm = "";
            for (var i = 9; i < 17; i++) {
                for (var j = 0; j < 60; j = j + 15) {
                    if (i < 10 && j < 10) {
                        htm += '<option>0' + i + ':0' + j + '</option>';
                    } else if (i < 10)
                    {
                        htm += '<option>0' + i + ':' + j + '</option>';
                    }
                    else if (j < 10)
                    {
                        htm += '<option>' + i + ':0' + j + '</option>';
                    } else {
                        htm += '<option>' + i + ':' + j + '</option>';
                    }
                }
            }
            element.html(element.html() + "<select class='form-control'>" + htm + "</select>");
        }
    }
}).directive('uniqueEmail', function (AuthCollection) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, el, attrs, ctrl) {



            //TODO: We need to check that the value is different to the original

            //using push() here to run it as the last parser, after we are sure that other validators were run

            ctrl.$parsers.push(function (viewValue) {

                if (viewValue) {
                    AuthCollection.checkEmail.get({email: viewValue}, function (users) {
                        if (users.data === 0) {
                            ctrl.$setValidity('uniqueEmail', true);
                        } else {
                            ctrl.$setValidity('uniqueEmail', false);
                        }
                    });
                    return viewValue;
                }
            });
        }
    };

}).directive('contactNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var view_value;
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined)
                    return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');

                transformedInput = transformedInput.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");


                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();

                }
                var return_value;
                if (transformedInput.length > 12) {

                    return_value = view_value;
                    modelCtrl.$setViewValue(view_value);
                    modelCtrl.$render();
                    modelCtrl.$setValidity('is_valid', true);
                } else {
                    return_value = transformedInput;


                    view_value = return_value;
                    if (transformedInput.length == 12) {
                        modelCtrl.$setValidity('is_valid', true);
                    } else {
                        modelCtrl.$setValidity('is_valid', false);
                    }
                }

                return return_value;

            });
        }
    };
}).directive('numbers', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
}).directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        scope: {
            numbersOnly: '@',
        },
        link: function (scope, element, attrs, modelCtrl) {
            var view_value;
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined)
                    return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();

                }
               // console.log(transformedInput);
                var max = scope.numbersOnly || Infinity;
                var return_value;
                if (transformedInput.length > max) {
                    return_value = view_value;
                    modelCtrl.$setViewValue(view_value);
                    modelCtrl.$render();
                    modelCtrl.$setValidity('is_valid', false);
                } else {
                    return_value = transformedInput;
                    view_value = return_value;
                    modelCtrl.$setValidity('is_valid', true);
                }

                return return_value;

            });
        }
    };
}).directive('onlyDigits', function () {

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$parsers.unshift(function (inputValue) {
                var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
                ngModel.$viewValue = digits;
                ngModel.$render();
                return digits;
            });
        }
    };
}).directive('ngConfirmBoxClick', [
    function () {

        return {
            link: function (scope, element, attr) {

                var msg = attr.ngConfirmBoxClick || "Are you sure want to delete?";

                var clickAction = attr.confirmedClick;

                element.bind('click', function (event) {

                    if (window.confirm(msg)) {

                        scope.$eval(clickAction)

                    }

                });

            }

        };

    }

]).directive('saveBtn', function ($compile) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            menu: '='
        },
        link: function (scope, element, attrs) {
            element.html('<a ng-click="menu.func(menu.add)" class="btn btn-primary" >{{menu.title}}</a>');
            $compile(element.contents())(scope);
        }
    };
}).directive("raty", function() {
    return {
        restrict: 'AE',
        link: function(scope, elem, attrs) {
            $(elem).raty({score: attrs.score,
                number: attrs.number, starType:'i',
                readOnly:attrs.ro,
                noRatedMsg  : 'Not rated yet!'
            });
            $(elem).bind("click", function(e){
                var score = $(elem).raty("score");
                scope.rating = score;
                
             });
        }
    }
}).directive('showonhoverparent',
   function() {
      return {
         link : function(scope, element, attrs) {
            element.parent().bind('mouseenter', function() {
                element.show();
            });
            element.parent().bind('mouseleave', function() {
                 element.hide();
            });
       }
   };
}).directive('showonclickparent',
   function() {
      return {
         link : function(scope, element, attrs) {
            element.parent().bind('click', function() {
                element.show();
            });
            element.parent().bind('mouseleave', function() {
                 element.hide();
            });
       }
   };
}).directive('imageonload', function() {
    return {
        restrict: 'A',
      
        link: function(scope, element) {
          element.on('load', function() {
            // Set visibility: true + remove spinner overlay
              element.removeClass('spinner-hide');
              element.addClass('spinner-show');
              element.parent().find('span.loading').remove();
          });
          scope.$watch('ngSrc', function() {
            // Set visibility: false + inject temporary spinner overlay
              element.addClass('spinner-hide');
              // element.parent().append('<span class="spinner"></span>');
          });
        }
    };
})
.directive("gotopdirective", function ($location,$anchorScroll) {
  return {
        restrict: 'A',
       link: function(scope, element, attrs) {
        element.bind("click", function(){
            $location.hash('page-top');
            $anchorScroll();
       });
    }
  };
})

.directive('passwordValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
                scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                if(scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);                    
                    return undefined;
                }

            });
        }
    };
})
.directive('bootstrapSwitch', [
        function() {
            return {
                restrict: 'C',
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {
                    element.bootstrapSwitch();

                    element.on('switchChange.bootstrapSwitch', function(event, state) {
                        if (ngModel) {
                            scope.$apply(function() {
                                ngModel.$setViewValue(state);
                            });
                        }
                    });

                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                        if (newValue) {
                            element.bootstrapSwitch('state', true, true);
                        } else {
                            element.bootstrapSwitch('state', false, true);
                        }
                    });
                }
            };
        }
    ])
.directive("homeHeader",["Config", function(Config,store) {
  return {
    controller: function($scope,store) {
        $scope.token=store.get('token');
    },      
    templateUrl: Config.httpBasePath +'tpl/homeheader.html',
    restrict: 'EA',
  };

}])
.directive("homeFooter",["Config","CommonCollection","toaster", function(Config,CommonCollection,toaster,store) {
  return {
    controller: function($scope,store) {
    $scope.token=store.get('token');    
    $scope.subscribe = function(email) {
        CommonCollection.subscribe({email:email}).$promise.then(function (res) {
            toaster.success(res.msg);
        },function (error) {           
            toaster.error(error.data.msg);
        });
      };
    },      
    templateUrl: Config.httpBasePath +'tpl/homefooter.html',
    restrict: 'EA',
  };

}])
.directive("userFooter",["Config","CommonCollection","toaster", function(Config,CommonCollection,toaster,store) {
  return {
    controller: function($scope, store) {
    $scope.token=store.get('token');
    $scope.subscribe = function(email) {
        CommonCollection.subscribe({email:email}).$promise.then(function (res) {
            toaster.success(res.msg);
        },function (error) {
             toaster.error(error.data.msg);
        });
      };
    },      
    templateUrl: Config.httpBasePath +'tpl/footer.html',
    restrict: 'EA',
  };

}])
.directive("userHeader",["Config","UserCollection", function(Config,UserCollection,store) {
  return {
    controller: function($scope,$localStorage,store) {
        $scope.token=store.get('token');
         $scope.followshow = false;       
         if ($scope.token) {        
            UserCollection.getProfile().$promise.then(function (res) {
                    $scope.userinfo = res.data;                    
                }, function (err) {
                   
                });
        } 

    },      
    templateUrl: Config.httpBasePath +'tpl/header.html',
    restrict: 'EA',
  };
}])
.directive("sidebarGuest",["Config","UserCollection", function(Config,GuestCollections,$localStorage) {
  return {
    controller: function($scope, $attrs,store) {
      
        GuestCollections.sidebarGuest().$promise.then(function (res) {
            $scope.token =  store.get('token');
            $scope.productslist = res.products;
            $scope.totalproducts = res.productsTotal;
            $scope.fourm = res.fourms;
            $scope.fourmtotal = res.fourmstotal;            
            $scope.reviews = res.reviews;
            $scope.totalreviews = res.reviewtotal;
            $scope.productimagepath = Config.httpUploadPath+'products/';
        });
    },  
    templateUrl:  Config.httpBasePath +'tpl/left_sidebar_guest.html',
    restrict: 'EA',
  };

}])
.directive("sidebaruserDashboardl",["Config","UserCollection", function(Config,UserCollection,$localStorage) {
  return {
    controller: function($scope, $attrs) {      
        UserCollection.sidebaruserDashboard().$promise.then(function (res) {
            $scope.productslist = res.products;
            $scope.totalproducts = res.productsTotal;
            $scope.fourm = res.fourms;
            $scope.fourmtotal = res.fourmstotal;
            $scope.favoriteCount = res.favProductCount;
            $scope.link1='favorite';
            $scope.shopinglistCount = res.SopingListCount;   
            $scope.link2='shoppinglist';
            $scope.reviews = res.reviews;
            $scope.totalreviews = res.reviewtotal;
            $scope.totalcommunities = res.communityCount;
            $scope.comunities = res.communities;
            $scope.productimagepath = Config.httpUploadPath+'products/';
        });
        
    },  
    templateUrl:  Config.httpBasePath +'tpl/left_sidebar.html',
    restrict: 'EA',
  };

}])
.directive("sidebarProduct",["Config","ProductCollection","toaster", function(Config,ProductCollection,toaster,$localStorage) {
  return {
    controller: function($scope, $attrs,$state,store) {      
       
        ProductCollection.getAlternateProduct({id:$state.params.id}).$promise.then(function (res) {
              $scope.alternateProduct = res.data;
        });
        $scope.productAsFav = function(pId,uId,action) {
               uId=store.get('id');
            $scope.favProduct = {product_id:pId,user_id:uId,action:action}
            ProductCollection.saveAsFav($scope.favProduct).$promise.then(function (res) {
                ProductCollection.getAlternateProduct({id:$state.params.id}).$promise.then(function (res) {
                    $scope.alternateProduct = res.data;
                }); 
               toaster.success(res.msg);
           }, function (err) {
               console.log(err);
           });            
      };
        $scope.productInShoppingList = function(pId,uId,action) {
              uId=store.get('id');
             $scope.shoppingListProduct = {product_id:pId,user_id:uId,action:action}
             ProductCollection.saveInShpngList($scope.shoppingListProduct).$promise.then(function (res) {
                ProductCollection.getAlternateProduct({id:$state.params.id}).$promise.then(function (res) {
                    $scope.alternateProduct = res.data;
                }); 
                toaster.success(res.msg);
            }, function (err) {
                console.log(err);
            });
        };
    },  
    templateUrl:  Config.httpBasePath +'tpl/product_left_bar.html',
    restrict: 'EA',
  };

}])
.directive("sidebarProductGuest",["Config","GuestCollections","toaster", function(Config,GuestCollections,toaster,$localStorage) {
  return {
    controller: function($scope, $attrs,$state) {      
        GuestCollections.getAlternateProduct({id:$state.params.id}).$promise.then(function (res) {
              $scope.alternateProduct = res.data;
        });
    },  
    templateUrl:  Config.httpBasePath +'tpl/product_left_bar_guest.html',
    restrict: 'EA',
  };

}])
//side bar profile view diractive login users or other
.directive("sidebaruserProfile",["Config","UserCollection", function(Config,UserCollection,$localStorage) {
  return {
    controller: function($scope, $attrs, $state,store) {      
        if($state.params.id){
            if ($state.params.id==store.get('id')) {
                $scope.isme=true;         
            }else{
                $scope.isme=false;  
            }
            var id= $state.params.id;
        }else{
            $scope.isme=true;
            var id ='me';
        }
        
        UserCollection.getusersidebar({id:id}).$promise.then(function (res) {
            $scope.profileinfo = res.profileinfo;
           if(res.profileinfo.image){
            $scope.user_image = Config.httpUploadPath+'users/small/'+res.profileinfo.image;
            }else{
                $scope.user_image = "uploads/noimage.png";
            }
            $scope.privacy = res.privacy;
            $scope.reviews = res.reviews;
            $scope.fourm = res.fourms;
            $scope.fourmtotal = res.fourmtotal;
            $scope.community = res.community;
            $scope.communityall = res.totalcomm;
            $scope.favoriteCount = res.favCount;
            $scope.link1='favorite';
            $scope.token= store.get('token');
            if(res.profileinfo.user_followers){
                angular.forEach(res.profileinfo.user_followers, function(value,key){
                    if(value.follow_id == store.get('id')){
                          $scope.followed = true;
                    }
                });
            }else{
              $scope.followed = false;
            }
        });
        
        $scope.dofollow = function (action) {
            if($state.params.id){
                followid = $state.params.id;
            }
            UserCollection.followUser({follow_id: followid,action:action}).$promise.then(function (res) {
                if(res.msg == "followed"){
                    $scope.followed = true;    
                }
                if(res.msg == "unfollowed"){
                    $scope.followed = false;    
                }
            }, function (err) {
               
            });
        };
    },  
    templateUrl:  Config.httpBasePath +'tpl/left_sidebar_user.html',
    restrict: 'EA',
  };

}])
.directive("communitiesSlider",["Config","GuestCollections","toaster", function(Config,GuestCollections,toaster,$localStorage) {
  return {
    controller: function($scope, $attrs,$state) {      
        GuestCollections.getRelatedComunities({id:$state.params.id}).$promise.then(function (res) {
              $scope.comm = res.communities;             
        });
    },  
    templateUrl:  Config.httpBasePath +'tpl/comminteis_slider.html',
    restrict: 'EA',
  };

}])
;
// starRating directive
frontAppSpto.directive('starRating', function() {
        return {
        restrict : 'A',
        template : '<ul class="rating">'
           + ' <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
           + ' ★ '
           + ' </li>'
           + '</ul>',
        scope : {
         ratingValue : '=',
         max : '=',
         isDisable:'=',
         onRatingSelected : '&'
        },
        link : function(scope, elem, attrs) {
            
         var updateStars = function() {
            
    
          scope.stars = [];
                
          for ( var i = 0; i < scope.max; i++) {
              if(scope.ratingValue){
                  scope.stars.push({ filled : i < scope.ratingValue });
              }else{
                  scope.stars.push({ filled : 0 });
              }
           
          }
         };

         scope.toggle = function(index) {
            if(scope.isDisable){
                 return false;
          } 
          scope.ratingValue = index + 1;
          scope.onRatingSelected({
           rating : index + 1
          });
         };

         scope.$watch('ratingValue',
          function(oldVal, newVal) {
             // if vaule is zero 
           //if (newVal) {
            updateStars();
           //}
          }
         );
        }
        };
 }); // directive end
 
 
 
 