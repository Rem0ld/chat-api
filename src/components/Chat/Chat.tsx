import Chatroom from "components/Chatroom/Chatroom";
import Disconnect from "components/Login/Disconnect";
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
  const [listUsers, setListUsers] = useState<User[]>([]);
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
    socket.registerConnection(onStatusReceived);
  }, []);

  const onStatusReceived = (data: User[]) => {
    setListUsers(data);
    // console.log(data);
  };

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
        chatroom={chatroom}
        user={user}
        setListUsers={setListUsers}
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

  console.log(chatrooms);
  return (
    <BrowserRouter>
      <div className="flex">
        <div className={classes.leftPanel}>
          <LeftPanel
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
        <div className={classes.rightPanel}>
          <Disconnect user={user} />
          <h2 className={classes.h2title}>Users connected:</h2>
          <ul className="pl-4">
            {listUsers.length > 0 &&
              listUsers.map((element) => (
                <li key={element.id}>{element.username}</li>
              ))}
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
}
