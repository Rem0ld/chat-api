import Chatroom from "components/Chatroom/Chatroom";
import React, { ReactElement, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { IRoom } from "types";
import { default as client } from "../../api/socket";
import LeftPanel from "./LeftPanel";
import classes from "./styles";
interface User {
  id: string;
  username: string;
  email: string;
}

export default function Chat(): ReactElement {
  const history = useHistory();
  const [socket, setSocket] = useState<any>(client());
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") as string)
  );
  const [chatrooms, setChatrooms] = useState<IRoom[]>([]);

  useEffect(() => {
    socket.register(
      { socketId: socket.id, user: user },
      (err: any, responseUser: any) => {
        if (err) console.error(err);
        // console.log(responseUser);
      }
    );
  }, []);

  const onEnterChatroom = (
    chatroomName: string,
    user: User,
    onEnterSuccess: CallableFunction
  ) => {
    return socket.join(chatroomName, user, onEnterSuccess);
  };

  const onLeaveChatroom = (
    chatroomName: string,
    user: User,
    onLeaveSuccess: CallableFunction
  ) => {
    socket.leave(chatroomName, user, (err: any) => {
      if (err) return console.error(err);
      // return onLeaveSuccess();
    });
  };

  const renderChatroom = (chatroom: any) => {
    return (
      <Chatroom
        user={user}
        socket={socket}
        chatroom={chatroom}
        onEnterChatroom={onEnterChatroom}
        onLeave={() =>
          onLeaveChatroom(chatroom.name, user, () => history.push("/"))
        }
        onSendMessage={(message: string, cb: any) =>
          socket.message(chatroom.name, message, cb)
        }
        registerHandler={socket.registerHandler}
        unregisterHandler={socket.unregisterHandler}
      />
    );
  };

  return (
    <BrowserRouter>
      <div className="flex">
        <div className={classes.leftPanel}>
          <LeftPanel
            user={user}
            socket={socket}
            chatrooms={chatrooms}
            setChatrooms={setChatrooms}
          />
        </div>
        <div className={classes.chat}>
          <Switch>
            {chatrooms.length > 0 &&
              chatrooms.map((chatroom) => (
                <Route
                  key={chatroom.name}
                  exact
                  path={`/chat/${chatroom.name}`}
                  render={() => {
                    return renderChatroom(chatroom);
                  }}
                />
              ))}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
