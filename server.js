const express = require("express");
const app = express();
const server = require("http").Server(app);
const {v4: uuidv4} = require("uuid");
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get("/:groupId", (req, res) => {
    res.render("index", {groupId: req.params.groupId});
});

io.on("connection", (socket) => {
    // console.log("new user connected successfuly");
    socket.on("join-group", (groupId, userId, userName) => {
        socket.join(groupId);
        socket.to(groupId).emit("user-connected", userId);
        socket.on("message", (message) => {
            io.to(groupId).emit("create-message", message, userId, userName);
        });
    });
});

server.listen(process.env.PORT || 3000);
