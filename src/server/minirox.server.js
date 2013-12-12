
var util = require('util');

var nodeStatic = require('node-static');

var fileServer = new nodeStatic.Server('./public');

function handler (request, response) {
	request.on('data', function() {});
	request.on('end', function() {
		try {
			fileServer.serve(request, response, function (e, res) {
				if (e && (e.status === 404)) {
					fileServer.serveFile('minirox.html', 200, {}, request, response);
				}
			});
		}
		catch (err) {
			console.log(err);
		}
	});
}

var app = require('http').createServer(handler);

var filters = {filters: []};

var io = require('socket.io').listen(app);

var payload;

io.sockets.on('connection', function (socket) {
	socket.on('run:start', function(data) {
		socket.broadcast.emit('run:start', data);
	});

	socket.on('run:test:result', function(data) {
		socket.broadcast.emit('run:test:result', data);
	});

	socket.on('run:end', function(data) {
		socket.broadcast.emit('run:end', data);
	});

  socket.on('payload', function(data) {
		payload = data;
    socket.broadcast.emit('payload', data);
  });

	socket.on('filters:set', function(data) {
		util.log(util.inspect(data));
		filters.filters = data.filters;
	});

	socket.on('filters:reset', function() {
		filters.filters = [];
	});

	socket.on('filters:get', function(callback) {
		callback(filters);
	});

	socket.on('payload:get', function(callback) {
		callback(payload);
	});
});

app.listen(1337);
