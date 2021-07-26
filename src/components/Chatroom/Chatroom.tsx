import sendIcon from "@iconify/icons-akar-icons/send";
import { Icon } from "@iconify/react";
import React, { ReactElement, useEffect, useState } from "react";
import { ICallbackJoin, TEntry, User } from "types";

interface AppProperties {
  registerHandler: any;
  unregisterHandler: any;
  user: User;
  chatroom: any;
  onLeave: any;
  onEnterChatroom: any;
  onSendMessage: any;
}

export default function Chatroom({
  user,
  chatroom,
  onEnterChatroom,
  registerHandler,
  unregisterHandler,
  onLeave,
  onSendMessage,
}: AppProperties): ReactElement {
  const [history, setHistory] = useState<TEntry[]>([]);
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    registerHandler(onMessageReceived);

    onEnterChatroom(chatroom.name, user, (err: any, data: ICallbackJoin) => {
      console.log("history chat", data.chat);
      console.log("user Connected", data.listUserConnected);
      setListUsers(data.listUserConnected);
      setHistory(data.chat);
    });

    return () => {
      unregisterHandler(), onLeave();
    };
  }, []);

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
    history.map((element, index, array) =>
      element.type !== "event" ? (
        <li className="px-4 hover:bg-primary rounded-md" key={index}>
          {index === 0 ||
          (index > 0 &&
            array[index - 1].user.username !== element.user.username) ? (
            <div className="pt-2">
              <span className="text-md text-white">
                {element.user.username} -{" "}
              </span>
              <span className="text-xs text-gray-300">
                {new Date(element.timestamp).toLocaleString().split(",")[0]}
              </span>
            </div>
          ) : (
            ""
          )}
          <p>{element.message}</p>
        </li>
      ) : (
        ""
      )
    );

  return (
    <div className="h-screen max-h-screen relative">
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
          <Icon icon={sendIcon} style={{ color: "white", fontSize: "24px" }} />
        </button>
      </div>
    </div>
  );
}
