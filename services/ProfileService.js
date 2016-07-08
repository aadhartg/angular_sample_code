angular.module('MyApp')
  .factory('Profile', function($http) {
    return {
      getProfile: function() {
        return $http.get('/profile');
      },
      updateProfile: function(profileData) {
        return $http.post('/profile', profileData);
      }
    };
  });