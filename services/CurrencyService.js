angular.module('MyApp')
  .factory('Currency', function($http) {
    return {
      getCurrencies: function() {
        return $http.get('/api/currencies');
      }
    };
  });