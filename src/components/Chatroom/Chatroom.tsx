import sendIcon from "@iconify/icons-akar-icons/send";
import { Icon } from "@iconify/react";
import React, { ReactElement, useEffect, useState } from "react";
import { User } from "types";

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
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    registerHandler(onMessageReceived);

    onEnterChatroom(chatroom.name, user, (err: any, chat: any) => {
      console.log("history chat", chat);
      // setHistory(chat);
    });

    return () => {
      unregisterHandler(), onLeave();
    };
  }, []);

  const onMessageReceived = (entry: string) => {
    console.log("onMessageReceived:", entry);
    updateChatHistory(entry);
  };

  const updateChatHistory = (entry: string) => {
    setHistory((previousState) => previousState.concat(entry));
  };

  const handleOnSendMessage = () => {
    if (input.length === 0) return;

    console.log(input);

    onSendMessage(input, (err: any) => {
      if (err) return console.error(err);

      return setInput("");
    });
  };

  return (
    <div>
      {history &&
        history.map((element, index) => <li key={index}>{element.message}</li>)}
      <div className="absolute bottom-0">
        <textarea
          name="input"
          id="input"
          cols={83}
          rows={5}
          placeholder="Write your message"
          className="h-28 rounded-md border-2 border-white"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></textarea>
        <button
          onClick={handleOnSendMessage}
          className="absolute right-0 top-0 grid place-items-center h-28 w-16 bg-primary rounded-r-md"
        >
          <Icon icon={sendIcon} style={{ color: "white", fontSize: "24px" }} />
        </button>
      </div>
    </div>
  );
}
