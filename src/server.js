import express from 'express';
import http from "http";
import { WebSocketServer } from 'ws';

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + '/views');
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("listening on http://localhost:3000")

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sockets = []

wss.on("connection", (socket) => {
  sockets.push(socket)
  socket.on("close", () => console.log("Disconnected From Client 🚥"));
  socket.on("message", (message) => {
    const messageString = message.toString('utf8')
    sockets.forEach((aSocket) => aSocket.send(messageString))
  });
});
server.listen(3000, handleListen);
