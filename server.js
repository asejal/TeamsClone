//include modules using require
const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketio = require("socket.io");
const io = socketio(server);
const { v4: uuidv4 } = require("uuid");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
const formatMessage = require("./utils/messages");
const sendGmail = require("./utils/invite");
const { userJoined, userLeaving, getRoomUsers } = require("./utils/users");

app.use("/peerjs", peerServer);

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.redirect(`/${uuidv4()}`);
});

app.get("/:room", (request, response) => {
  response.render("room", { roomID: request.params.room });
});

//on socket connection
io.on("connection", (socket) => {
  socket.on("join-room", (roomID, userID, userName) => {
    const user = userJoined(userID, userName, roomID);

    socket.join(roomID);

    //send welcome message on joining room
    setTimeout(() => {
      socket.emit("mssg", "Welcome!");
    }, 2000);

    setTimeout(() => {
      socket.emit("roomUsers", {
        roomID: user.roomID,
        users: getRoomUsers(user.roomID),
      });
    }, 2000);

    //inform other users in room roomID when new user joins
    socket.broadcast
      .to(roomID)
      .emit("mssg", `${user.userName} has joined the call`);

    //send users info
    socket.broadcast.to(user.roomID).emit("roomUsers", {
      roomID: user.roomID,
      users: getRoomUsers(user.roomID),
    });

    socket.broadcast.to(roomID).emit("user-connected", {
      userID: user.userID,
      users: getRoomUsers(user.roomID),
    });

    //
    socket.on("message", (message) => {
      io.to(roomID).emit("createMessage", formatMessage(userName, message));
    });

    //sendInvite by calling sendGmail function in invite.js
    socket.on("sendInvite", (receiverGmail, room_url, senderName) => {
      if (receiverGmail === null || receiverGmail.length === 0) {
        sendGmail(receiverGmail, false, room_url, senderName);
      } else {
        sendGmail(receiverGmail, true, room_url, senderName);
      }
    });

    //specify actions to do on disconnect
    socket.on("disconnect", () => {
      //inform other users in room roomID when new user joins
      io.to(roomID).emit("mssg", `${user.userName} has left the call`);

      //delete user who left from current users
      userLeaving(user.userID);

      //send users info
      socket.broadcast.to(user.roomID).emit("roomUsers", {
        roomID: user.roomID,
        users: getRoomUsers(user.roomID),
      });

      socket.broadcast.to(roomID).emit("user-disconnected", userID);
    });
  });
});

server.listen(process.env.PORT || 3030);
