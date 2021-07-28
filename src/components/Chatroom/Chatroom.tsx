import sendIcon from "@iconify/icons-akar-icons/send";
import { Icon } from "@iconify/react";
import React, { ReactElement, useEffect, useState } from "react";
import { ICallbackJoin, IChatroom, TEntry, User } from "types";
import classes from "../Chat/styles";

interface AppProperties {
  user: User;
  socket: any;
  onLeave: any;
  chatroom: IChatroom;
  onSendMessage: any;
  registerHandler: any;
  onEnterChatroom: any;
  unregisterHandler: any;
}

export default function Chatroom({
  user,
  socket,
  chatroom,
  onEnterChatroom,
  registerHandler,
  unregisterHandler,
  onLeave,
  onSendMessage,
}: AppProperties): ReactElement {
  const [history, setHistory] = useState<TEntry[]>([]);
  const [input, setInput] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    registerHandler(onMessageReceived);

    onEnterChatroom(chatroom.name, user, (err: any, data: ICallbackJoin) => {
      // console.log("history chat", data.chat);
      // console.log("user Connected", data.listUserConnected);
      setUsers(data.listUserConnected);
      setHistory(data.chat);
    });

    socket.registerConnection(onStatusReceived);

    return () => {
      unregisterHandler(), onLeave();
    };
  }, []);

  const onStatusReceived = (data: User[]) => {
    setUsers(data);
    // console.log(data);
  };

  const onMessageReceived = (entry: TEntry) => {
    updateChatHistory(entry);
  };

  const updateChatHistory = (entry: TEntry) => {
    setHistory((previousState) => previousState.concat(entry));
  };

  const handleOnSendMessage = (event: any) => {
    if (event.key !== "Enter") return;
    if (input.length === 0) return;

    onSendMessage(input, (err: any) => {
      if (err) return console.error(err);

      return setInput("");
    });
  };

  const messages =
    history &&
    history.map((message, index, array) =>
      message.type !== "event" ? (
        <li className="px-4 hover:bg-primary rounded-md" key={index}>
          {index === 0 ||
          (index > 0 &&
            array[index - 1].user.username !== message.user.username) ? (
            <div className="pt-2">
              <span className="text-md text-white">
                {message.user.username} -{" "}
              </span>
              <span className="text-xs text-gray-300">
                {new Date(message.timestamp).toLocaleString().split(",")[0]}
              </span>
            </div>
          ) : (
            ""
          )}
          <p>{message.message}</p>
        </li>
      ) : (
        ""
      )
    );

  const owner = users
    .slice()
    .filter((user) => user.username === chatroom.owner);

  return (
    <div className="h-screen max-h-screen relative flex">
      <div className="w-full px-1">
        <ul className="h-[85%] list-none overflow-y-scroll">{messages}</ul>
        <div className="relative bottom-0 h-[15%]">
          <textarea
            name="input"
            id="input"
            placeholder="Write your message"
            className="h-full w-full rounded-md border-2 border-white"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyPress={handleOnSendMessage}
          ></textarea>
          <button
            onClick={handleOnSendMessage}
            className="absolute right-0 top-0 grid place-items-center h-full w-16 bg-primary rounded-r-md"
          >
            <Icon
              icon={sendIcon}
              style={{ color: "white", fontSize: "24px" }}
            />
          </button>
        </div>
      </div>
      <div className={classes.rightPanel}>
        <h2 className={classes.h2title}>Users:</h2>
        <div className="mt-4">
          <h3 className="text-gray-200">Owner:</h3>
          <span className="pl-4">{owner[0].username}</span>
          <h3 className="text-gray-300">Servants</h3>
          <ul className="pl-4">
            {users.length > 0 &&
              users.map((user) =>
                user.username !== owner[0].username ? (
                  <li key={user.id}>{user.username}</li>
                ) : (
                  ""
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
}
