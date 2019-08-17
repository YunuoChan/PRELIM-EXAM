var JOKE_SERVICE = {
    get: function(){
            return $.ajax({
                type: 'get',
                url: JOKES_API
            });
        },
}

