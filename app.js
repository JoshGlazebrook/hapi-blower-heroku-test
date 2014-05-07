var hapi = require('hapi');

var server = new hapi.Server(process.env.PORT || 3000);
var request = require('request');


server.route([
    { method: 'GET', path: '/test', config: { handler: doTest }},
    { method: 'GET', path: '/names', config: { handler: listofcrap }},
    { method: 'GET', path: '/send', config: { handler: sendMessage }}
]);


function sendMessage(req, res) {


    var message = "finish the fucking project";

    var numbers = [
        '4257738068',
        '3605562243',
        '2066975995',
        '2064035209'
    ];

    numbers.forEach(function(item) {
        request.post(process.env.BLOWERIO_URL + '/messages', { form: { to: item, message: message }, headers: { 'Accept': 'application/json' } }, function (err, res, body) {
            console.log(body);
        });

        res("messages sent");
    });

}

function doTest(req, res) {
    res("Something");
}

function listofcrap(req, res) {
    var crap = [
        {name: "Josh", age: 22},
        {name: "Bob", age: 40},
        {name: "whatever", age: 19}
    ];

    res(crap);
}

server.start(function() {
    console.log("Server started");
});