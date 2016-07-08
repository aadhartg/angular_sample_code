angular.module('MyApp')
  .factory('StoreType', function($http) {
    return {
      getStoreType: function() {
        return $http.get('/api/storetype');
      }
    };
  });