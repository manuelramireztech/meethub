const fs = require('fs');
const http = require('http');
const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");

var server = http.createServer(app);
var io = require('socket.io')(server);
const User = require("./src/models/user.model");

const corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./src/models");
const Role = db.role;


db.mongoose
  .connect(`mongodb://localhost/meetHubUsers_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


function initial() {
	console.log(Role);
	
  Role.estimatedDocumentCount( (err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);


app.get("/", (req, res) => {
	res.json({ message: "Welcome to bezkoder application." });
  });

if(process.env.NODE_ENV==='production'){
	app.use(express.static(__dirname+"/build"))
	app.get("*", (req, res, next) => {
		res.sendFile(path.join(__dirname+"/build/index.html"))
	})
}
app.set('port', (process.env.PORT || 3000))


connections = {}
messages = {}
timeOnline = {}

io.on('connection', function(socket){

	socket.on('join-call', (path) => {
		if(connections[path] === undefined){
			connections[path] = []
		}
		connections[path].push(socket.id);

		timeOnline[socket.id] = new Date();

		for(let a = 0; a < connections[path].length; ++a){
			io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
		}

		if(messages[path] !== undefined){
			for(let a = 0; a < messages[path].length; ++a){
				io.to(socket.id).emit("chat-message", messages[path][a]['data'], messages[path][a]['sender']);
			}
		}

		console.log(path, connections[path])
	});

	socket.on('signal', (toId, message) => {
		io.to(toId).emit('signal', socket.id, message);
	});

	// socket.on("message", function(data){
	// 	io.sockets.emit("broadcast-message", socket.id, data);
	// })

	socket.on('chat-message', function(data) {
		var key;
		var ok = false
		for (const [k, v] of Object.entries(connections)) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k
					ok = true
				}
			}
		}

		if(ok === true){
			if(messages[key] === undefined){
				messages[key] = []
			}
			messages[key].push({"sender": socket.id, "data": data})
			console.log("message", key, data)

			for(let a = 0; a < connections[key].length; ++a){
				io.to(connections[key][a]).emit("chat-message", data, socket.id);
			}
		}
	})

	socket.on('disconnect', function() {
		var diffTime = Math.abs(timeOnline[socket.id] - new Date());
		var key;
		for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k

					for(let a = 0; a < connections[key].length; ++a){
						io.to(connections[key][a]).emit("user-left", socket.id);
					}
			
					var index = connections[key].indexOf(socket.id);
					connections[key].splice(index, 1);

					console.log(key, socket.id, Math.ceil(diffTime / 1000));

					if(connections[key].length === 0){
						delete connections[key]
					}
				}
			}
		}
	})
});


server.listen(app.get('port'), () => {
	console.log("listening on", app.get('port'))
})