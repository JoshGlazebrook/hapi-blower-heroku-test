var hapi = require('hapi');

var server = new hapi.Server(process.env.PORT || 3000);
var request = require('request');


server.route([
    { method: 'GET', path: '/{path*}', config: { handler: { directory: { path: './public', listing: false, index: true }}}},
    { method: 'POST', path: '/send', config: { handler: sendMessage }}
]);


function sendMessage(req, res) {


    /*var message = "finish the fucking project";

    var numbers = [
        '4257738068',
        '3605562243',
        '2066975995',
        '2064035209'
    ];*/

    /*numbers.forEach(function(item) {
        request.post(process.env.BLOWERIO_URL + '/messages', { form: { to: item, message: message }, headers: { 'Accept': 'application/json' } }, function (err, res, body) {
            console.log(body);
        });

        res("messages sent");
    });*/

    var data = {
        to: req.payload.number,
        message: req.payload.message
    };

    request.post(process.env.BLOWERIO_URL + '/messages', { form: data, headers: { 'Accept': 'application/json' }}, function(err, response, body) {
        body = JSON.parse(body);

        if (body.message === "ok")
            res("Message sent!");
        else
            res("Error. Please try again later. (" + body.message  + ")");
    });

}

server.start(function() {
    console.log("Server started");
});