const express   = require('express');
const app = require("./server/routes/routes");;
const debug     = require("debug")("node-angular");
const path      = require('path');
const http      = require("http");
const mongoose  = require("mongoose");
// const logger    = require("./logger")
const swaggerUI  = require('swagger-ui-express');
const swaggerJsDoc  =require('swagger-jsdoc');
// const options = require('./swagger.js')

// MongoDB connection
mongoose.connect("mongodb+srv://cluster0.0eab8.mongodb.net/enercent", 
{ useNewUrlParser: true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true
}).then(() => {
    console.log("Connected to  ENERCENT database");
}).catch(err => {
    console.log("Error connecting to ENERCENT database",err.message);
});



// Connection Port setup
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// Connection port exception handling

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Swagger docs
// const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Serving the frontend pages from the dist folder
// app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use(express.static(__dirname + '/dist/nftready'));


app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/nftready/index.html'));
});


// Server setup

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "4001");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port, () => {
  // logger.log('info',"Server started on port 4001")
  console.log("Server started on port 4001");
});




// testnet Net
// MY_ACCOUNT_ID=0.0.160564
// MY_PUBLIC_KEY=302a300506032b6570032100cbf8ac055c64b76f4dfe5e84822684e57fdb15d6f642babf5bfd317f2d502e52
// MY_PRIVATE_KEY=302e020100300506032b6570042204203415c1d06ee786a5eab1ff95989e425b13f1a2995e7b574d7d00488bf007553b
// 0.0.381123

// Main Net
// MY_ACCOUNT_ID=0.0.149036
// MY_PUBLIC_KEY=29000d5103e6703d429f70063cd4ef75963365062fd657192e0cb618f81bed35
// MY_PRIVATE_KEY=e7f46ea6068df4852aa598f1cda0192adaacb79875c6d02bf35fedf1b6e8d5d8
// 0.0.285722


// Admin
// x-api-key: 2dggf6df8jnvju9377jdjgjfdgdfn74ennjjruufnvnj525234gh

// normal user
// x-api-key: $2a$08$KQtWLVEUszI3CpdXZHlbOuMf6.qERtnBl8Qi/SFqVl3TyK2.dXuDW