import express from "express";
import http from "http"; // Import http module for creating the server
import { Server as SocketIOServer } from "socket.io"; // Import Server from socket.io, not default export
import mongoose from "./config/mongodb.js"; // Assuming this is your MongoDB setup
import { ExpressPeerServer } from "peer";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import { Authenticate_APIs } from "./route/authenticate/index.js";
import { USER_APIs } from "./route/users/index.js";
import { CONNECTION_APIs } from "./route/connection/index.js";
import { POST_APIs } from "./route/post/index.js";
import { MESSAGE_APIs } from "./route/message/index.js";
// import User from "./models/User.js"; // Assuming this is your User model
import User from "./models/users.js"; // Assuming this is your User model

const app = express();
const port = 3000;

const server = http.createServer(app); // Create an HTTP server using Express app
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes setup
app.use("/", Authenticate_APIs);
app.use("/", USER_APIs);
app.use("/", CONNECTION_APIs);
app.use("/", POST_APIs);
app.use("/", MESSAGE_APIs);

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("Hello world");
});

// Socket.IO setup
const io = new SocketIOServer(server);

io.on("connection", (socket) => {
  socket.on("join-general-room", ({ roomID }) => {
    socket.join(roomID);
  });

  socket.on("user-exists", ({ user, socketID }) => {
    // Check if the new user exists in User chat
    User.findOne({ email: user.email }).then((foundUser) => {
      // Emit found user to last connected user
      io.to(socketID).emit("user-found", foundUser);
    });

    // Update user if found
    socket.on("update-user", ({ user, socketID, allUserRoomID }) => {
      socket.join(allUserRoomID);

      User.findOneAndUpdate(
        { email: user.email },
        { $set: { socketID } },
        { new: true },
        (err, doc) => {
          if (doc) {
            // Send User users to the last connected user
            User.find({}).then((allUsers) => {
              // Filter out other users except the current user
              const otherUsers = allUsers.filter(
                ({ email: otherEmails }) => otherEmails !== user.email
              );
              // Emit 'UserUsers' event to the socket identified by socketID
              io.to(socketID).emit("UserUsers", otherUsers);
            });
          }
        }
      );
      // Notify other users about updated or joined user
      socket
        .to(allUserRoomID)
        .broadcast.emit("new-user-join", { user, socketID });

      socket.on("user-join", ({ allUserRoomID, user, socketID }) => {
        socket.join(allUserRoomID);

        const User = new User({
          ...user,
          socketID,
        });
        // Find/add User document to MongoDB
        User.findOne({ email: user.email })
          .then((user) => {
            if (!user) {
              // Assuming `User` is a model or an object with a `save` method
              User.save()
                .then((email) => {
                  User.find({}).then((users) => {
                    const otherUsers = users.filter(
                      ({ email: otherEmail }) => otherEmail !== email
                    );
                    // Assuming `io` is your socket.io instance
                    io.in(socketID).emit("UserUsers", otherUsers);
                  });
                })
                .catch((error) => {
                  console.error("Error saving User user:", error);
                });
            } else {
              io.to(allUserRoomID).broadcast.emit("new-user-json", user);
            }
          })
          .catch((error) => {
            console.error("Error finding user:", error);
          });
      });
    });
  });
});

// Peer server setup
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  generateClientId: () =>
    (Math.random().toString(36) + "0000000000000000000").substr(2, 16),
});
app.use("/mypeer", peerServer);

// Start server listening on port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
