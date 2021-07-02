import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

export default function () {
  const socket = io(ENDPOINT);
  socket.on("connect", () => {
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  });

  function registerHandler(onMessageReceived: any) {
    socket.on("message", onMessageReceived)
  }

  function unregisterHandler() {
    socket.off("message")
  }

  socket.on("error", (err) => {
    console.log("error ", err);
  });

  function register(socketId: string, cb: any) {
    socket.emit("register", socketId, cb);
  }

  function join(chatroomName: string, cb: any) {
    socket.emit("join", chatroomName, cb);
  }

  function leave(chatroomName: string, cb: any) {
    socket.emit("leave", chatroomName, cb);
  }

  function message(chatroomName: string, message: string, cb: any) {
    socket.emit("message", { chatroomName, message }, cb);
  }

  function getChatrooms(cb: any) {
    socket.emit("chatrooms", null, cb)
  }

  return {
    socket,
    registerHandler,
    unregisterHandler,
    register,
    join,
    leave,
    message,
    getChatrooms
  }
}
