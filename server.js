const fs = require('fs');
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;


const http = require('http');
var cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");


const User = require("./models/user.model");
// const routes = require("./src/App");

const dbConfig = require("./config/db.config");

const corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");



db.mongoose.connect(
    process.env.MONGODB_URI || `mongodb://${dbConfig.HOST}/${dbConfig.DB}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => {
    console.log("sucessfully connect to MongoDB");

    })
    .catch(err => {
    console.log("connection error", err);
     process.exit();

    });


// function initial() {
	
	
//   User.estimatedDocumentCount( (err, count) => {
//     if (!err && count === 0) {
//       new User({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//     }
//   });
// }

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/apiRoutes")(app);
// require("./src/App")(app);


// app.get("/", (req, res) => {
// 	res.json({ message: "Welcome Anthony" });
//   });

if(process.env.NODE_ENV==='production'){
	app.use(express.static(__dirname+"/build"))
	app.get("*", (req, res, next) => {
		res.sendFile(path.join(__dirname+"/build/index.html"))
	})
}
app.set('port', (process.env.PORT || 3001))


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
