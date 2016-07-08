angular.module('MyApp')
  .factory('Countries', function($http) {
    return {
      getCountries: function() {
        return $http.get('/api/countries');
      }
    };
  });