angular.module('MyApp')
  .factory('States', function($http) {
    return {
      getStates: function() {
        return $http.get('/api/states');
      }
    };
  });