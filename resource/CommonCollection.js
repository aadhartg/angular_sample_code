"use strict";
frontAppSpto
    .factory('CommonCollection', function ($resource,Config,store) {
        return $resource({}, {}, {            
               signup: {
                method: 'POST',
                url: Config.httpBasePath + 'auth/signup'                      
            }
        });
    });