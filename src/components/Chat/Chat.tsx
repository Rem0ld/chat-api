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
    // Creating chatroom for test purposes
    createChatrooms("test", user);
    getChatrooms();
  }, []);

  const getChatrooms = () => {
    socket.getChatrooms((err: any, chatrooms: any) => {
      if (err) {
        console.error("Error getting chatrooms", err);
        return;
      }
      console.log("getting chatrooms", chatrooms);
      setChatrooms(chatrooms);
    });
  };

  const createChatrooms = (name: string, userInfo: User) => {
    socket.createChatrooms(
      name,
      { socketId: socket.socket.id, user: userInfo },
      (err: any, chatroom: any) => {
        if (err) {
          console.error(err);
          return;
        }
        const newChatrooms = [...chatrooms, chatroom];
        setChatrooms(newChatrooms);
      }
    );
  };

  const onEnterChatroom = (
    chatroomName: string,
    user: User,
    onEnterSuccess: CallableFunction
  ) => {
    return socket.join(chatroomName, user, onEnterSuccess);
  };

  // At the moment there is no reason to use onLeaveSuccess
  // And it was causing memory leak
  const onLeaveChatroom = (
    chatroomName: string,
    user: User,
    onLeaveSuccess: any
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
        <div className="h-screen w-1/4 px-2 space-y-2 bg-tertiary">
          <FormCreateChatrooms createChatrooms={createChatrooms} />
          <h2 className="mb-2 text-white font-semibold">Channels:</h2>
          <ul className="flex flex-col h-[71%] p-4 space-y-2 rounded-md shadow-inner list-none overflow-y-scroll">
            {chatrooms &&
              chatrooms.map((chatroom) => (
                <Link
                  className="w-4/5 p-2 rounded-md bg-secondary text-center hover:bg-secondary-hover"
                  key={chatroom.name}
                  to={{
                    pathname: `/chat/${chatroom.name}`,
                  }}
                >
                  {chatroom.name}
                </Link>
              ))}
          </ul>
        </div>
        <div className="h-screen w-2/4 px-1 bg-secondary border-r border-l border-gray-400">
          <Switch>
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
          </Switch>
        </div>
        <div className="h-screen w-1/4 bg-tertiary text-white font-semibold">
          <div className="flex justify-between items-center h-auto p-2">
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
