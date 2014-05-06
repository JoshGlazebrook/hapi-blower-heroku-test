var hapi = require('hapi');

var server = new hapi.Server(process.env.PORT);


server.route([
    { method: 'GET', path: '/test', config: { handler: doTest }},
    { method: 'GET', path: '/names', config: { handler: listofcrap }}
]);

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