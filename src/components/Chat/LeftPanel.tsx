import FormCreateChatrooms from "components/FormCreateChatrooms";
import React, { ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import { IRoom } from "types";
import classes from "./styles";

interface AppProperties {
  socket: any;
  chatrooms: IRoom[];
  setChatrooms: any;
}

export default function LeftPanel({
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
      <h2 className={classes.h2title}>Channels:</h2>
      <ul className={classes.listChatrooms}>
        {chatrooms.length > 0 &&
          chatrooms.map((chatroom) => (
            <Link
              className={classes.linksChatrooms}
              key={chatroom.name}
              to={{
                pathname: `/chat/${chatroom.name}`,
              }}
            >
              {chatroom.name}
            </Link>
          ))}
      </ul>
    </>
  );
}
