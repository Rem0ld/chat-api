import Chatroom from "components/Chatroom/Chatroom";
import FormCreateChatrooms from "components/FormCreateChatrooms";
import React, { ReactElement, useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { useAuth } from "SessionProvider";
import { ChatroomType } from "types";
import { default as client } from "../../api/socket";

interface User {
  id: string;
  username: string;
  email: string;
}

export default function Chat(): ReactElement {
  const auth = useAuth();
  const history = useHistory();
  const [socket, setSocket] = useState<any>(client());
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") as string)
  );
  const [chatrooms, setChatrooms] = useState<ChatroomType[]>([]);

  useEffect(() => {
    socket.register(
      { socketId: socket.id, user: user },
      (err: any, responseUser: any) => {
        if (err) console.error(err);
        console.log(responseUser);
      }
    );
    getChatrooms();
  }, []);

  const getChatrooms = () => {
    socket.getChatrooms((err: any, chatrooms: any) => {
      setChatrooms(chatrooms);
    });
  };

  const createChatrooms = (name: string, userInfo: User) => {
    socket.createChatrooms(
      name,
      { socketId: socket.socket.id, user: userInfo },
      (err: any, chatroom: any) => {
        if (err) console.error(err);
        const newChatrooms = [...chatrooms, chatroom];
        setChatrooms(newChatrooms);
      }
    );
  };

  const onEnterChatroom = (
    chatroomName: string,
    onNoUserSelected: any,
    onEnterSuccess: CallableFunction
  ) => {
    return socket.join(
      chatroomName,
      user,
      (err: any, chatHistory: string[]) => {
        if (err) return console.error(err);
        console.log("in the function onEnter", chatHistory);
        return onEnterSuccess(chatHistory);
      }
    );
  };

  const onLeaveChatroom = (chatroomName: string, onLeaveSuccess: any) => {
    socket.leave(chatroomName, (err: any) => {
      if (err) return console.error(err);
      return onLeaveSuccess();
    });
  };

  const renderChatroom = (chatroom: any) => {
    return (
      <Chatroom
        chatroom={chatroom}
        user={user}
        onEnterChatroom={onEnterChatroom}
        onLeave={() => onLeaveChatroom(chatroom.name, () => history.push("/"))}
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
        <div className="h-screen w-1/4 bg-tertiary">
          <FormCreateChatrooms createChatrooms={createChatrooms} />
          <div className="flex flex-col mt-2 pl-2 text-white font-semibold">
            <h2>Channels:</h2>
            {chatrooms &&
              chatrooms.map((chatroom) => (
                <Link
                  key={chatroom.name}
                  to={{
                    pathname: `/chat/${chatroom.name}`,
                  }}
                  // key={chatroom.name}
                  // onClick={() => {
                  //   onEnterChatroom(chatroom.name, user, (chatHistory: any) =>
                  //     history.push({
                  //       pathname: `/chat/${chatroom.name}`,
                  //       state: { chatHistory },
                  //     })
                  //   );
                  // }}
                >
                  {chatroom.name}
                </Link>
              ))}
          </div>
        </div>
        <Switch>
          <div className="h-screen w-2/4 px-1 bg-secondary border-r border-l border-gray-400">
            {chatrooms.map((chatroom) => (
              <Route
                key={chatroom.name}
                exact
                path={`/chat/${chatroom.name}`}
                render={() => {
                  return renderChatroom(chatroom);
                }}
              />
            ))}
          </div>
        </Switch>
        <div className="h-screen w-1/4 bg-tertiary text-white font-semibold">
          <div className="flex justify-between items-center h-auto">
            {user && user.username}
            <button
              className="py-2 px-1 text-gray-700 rounded-md shadow-md bg-primary"
              type="button"
              onClick={() => {
                auth.signout();
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
