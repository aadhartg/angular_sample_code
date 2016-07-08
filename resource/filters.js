frontAppSpto
        .filter('dateFormat', function ()
        {
            return function (input)
            {
                if (input == null) {
                    return "";
                }
                return moment(input, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MMM-DD hh:mm A');
            };
        })

        .filter('capitalize', function() {
            return function(input, all) {
              var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
              return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
            }
          })
        .filter('AMPM', function () {
            return function (input) {
                console.log(input);
                if (input !== null)
                    return moment(input, 'YYYY-MM-DD HH:mm:ss').format('hh:mm A');
            };

        })
        .filter('cut', function () {
            return function (value, wordwise, max, tail) {
                if (!value)
                    return '';
                max = parseInt(max, 10);
                if (!max)
                    return value;
                if (value.length <= max)
                    return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace != -1) {
                        value = value.substr(0, lastspace);
                    }
                }

                return value + (tail || ' …');
            };
        })
        .filter('slice', function () {
            return function (arr, start, end) {
                return (arr || []).slice(start, end);
            };
        })
        .filter('dateOnlyFormat', function ()
        {

            return function (input)
            {
                if (input == null) {
                    return "";
                }
                return moment(input, 'YYYY-MM-DD HH:mm:ss').format('ddd, MMMM, D, YYYY');
            };
        }).filter('timeOnlyFormat', function ()
{
    return function (input)
    {
        if (input == null) {
            return "";
        }
        return moment(input, 'YYYY-MM-DD HH:mm:ss').format('hh:mm A');
    };
})

        .filter('n_timeAddInterval', function ($filter)
            {
                return function (input)
                {
                    var twentyMinutesLater = new Date();
                    twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
                    return $filter('date')(appDate.getTime(), 'h:mm a');

                };
            })

        .filter('moment', function () {
            return function (dateString, current_format, format) {
                return moment(dateString, current_format).format(format);
            };
        }).filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
                keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});
