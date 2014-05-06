var hapi = require('hapi');

var server = new hapi.Server(process.env.PORT);


server.route([
    { method: 'GET', path: '/test', config: { handler: doTest }}
]);

function doTest(req, res) {
    res("Something");
}



server.start(function() {
    console.log("Server started");
});