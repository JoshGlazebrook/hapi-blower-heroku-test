var hapi = require('hapi');

var server = new hapi.Server(process.env.PORT || 3000);
var request = require('request');


server.route([
    { method: 'GET', path: '/test', config: { handler: doTest }},
    { method: 'GET', path: '/names', config: { handler: listofcrap }},
    { method: 'GET', path: '/send', config: { handler: sendMessage }}
]);


function sendMessage(req, res) {
// curl -X POST -d "to=+14155550000&message=This is a test from Blower.io" -H "Accept: application/json" https://0e4fbd3a-37d3-4639-86d6-17920cf903f5:Tt8pSc7CbgHul3aPgCLevg@api.blower.io/messages
    console.log(process.env);
    res(process.env);
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