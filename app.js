var hapi = require('hapi');

var server = new hapi.Server(process.env.PORT || 3000);
var request = require('request');


server.route([
    { method: 'GET', path: '/{path*}', config: { handler: { directory: { path: './public', listing: false, index: true }}}},
    { method: 'POST', path: '/send', config: { handler: sendMessage }}
]);


function sendMessage(req, res) {

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