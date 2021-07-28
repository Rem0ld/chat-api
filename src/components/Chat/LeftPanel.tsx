import FormCreateChatrooms from "components/FormCreateChatrooms";
import Disconnect from "components/Login/Disconnect";
import React, { ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import { IRoom, User } from "types";
import classes from "./styles";

interface AppProperties {
  user: User;
  socket: any;
  chatrooms: IRoom[];
  setChatrooms: any;
}

export default function LeftPanel({
  user,
  socket,
  chatrooms,
  setChatrooms,
}: AppProperties): ReactElement {
  const getChatrooms = () => {
    socket.getChatrooms((err: Error | string, chatrooms: IRoom[]) => {
      if (err) {
        console.error("Error getting chatrooms", err);
        return;
      }
      // console.log("getting chatrooms", chatrooms);
      setChatrooms(chatrooms);
    });
  };

  useEffect(() => {
    getChatrooms();
  }, []);
  return (
    <>
      <FormCreateChatrooms socket={socket} setChatrooms={setChatrooms} />
      <h2 className={`${classes.h2title} border-t-2 border-white`}>
        Channels:
      </h2>
      <ul className={classes.listChatrooms}>
        {chatrooms.length > 0 &&
          chatrooms.map((chatroom) => (
            <li className="flex" key={chatroom.name}>
              <Link
                className={classes.linksChatrooms}
                to={{
                  pathname: `/chat/${chatroom.name}`,
                }}
              >
                {chatroom.name}
              </Link>
              {chatroom.owner === user.username ? (
                <button
                  className="w-1/5 py-2 px-1 text-gray-700 rounded-md shadow-md bg-primary"
                  type="button"
                  onClick={() => {}}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </li>
          ))}
      </ul>
      <Disconnect user={user} />
    </>
  );
}
