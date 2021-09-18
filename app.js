const express = require("express");
const app = express();
const http = require("http");
var serv = http.Server(app);
var SOCKET_LIST = [];

const {Server} =require("socket.io");

var io = new Server(serv);
serv.listen(3000,()=>{

  console.log("server started at port 3000");
});

app.use(express.static("client"));

app.get("/",(req,res)=>{
  res.sendFile("/index.html");
});



io.on("connection",(Serversocket)=>{
    Serversocket.id = Math.random();
    var number = Math.floor(Math.random()*10);
    Serversocket.x=0;
    Serversocket.y = 0;
    Serversocket.number=number;
    SOCKET_LIST[Serversocket.id]=Serversocket;
    Serversocket.on("disconnect",()=>{
      delete SOCKET_LIST[Serversocket.id];


    });

    });

setInterval(function(){
  var pack = [];


  for(var i in SOCKET_LIST)
  {
    Socket = SOCKET_LIST[i];

    Socket.x++;
    Socket.y++;
    pack.push({x:Socket.x,
    y:Socket.y,
    value: Socket.number

  });

  }

  for(var i in SOCKET_LIST)
  {
    var Socket =SOCKET_LIST[i];
    Socket.emit("newPostion",pack);
  }

},1000/25);
