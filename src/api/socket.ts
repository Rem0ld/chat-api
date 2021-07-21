import io from "socket.io-client";
import { User } from "types";
const ENDPOINT = "http://localhost:3000";

export default function () {
  const socket = io(ENDPOINT);

  socket.on("connect", () => {
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

  function join(chatroomName: string, user: User, cb: any) {
    socket.emit("join", chatroomName, user, cb);
  }

  function leave(chatroomName: string, user: User, cb: any) {
    socket.emit("leave", chatroomName, user, cb);
  }

  function message(chatroomName: string, message: string, cb: any) {
    socket.emit("message", { chatroomName, message }, cb);
  }

  function getChatrooms(cb: any) {
    socket.emit("chatrooms", null, cb)
  }

  function createChatrooms(name: string, user: any, cb: any) {
    socket.emit("create_chatrooms", name, user, cb);
  }

  return {
    socket,
    registerHandler,
    unregisterHandler,
    register,
    join,
    leave,
    message,
    getChatrooms,
    createChatrooms,
  }
}
