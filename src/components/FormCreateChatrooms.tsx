import React, { ReactElement, useState } from "react";

export default function FormCreateChatrooms({
  createChatrooms,
}: any): ReactElement {
  const [input, setInput] = useState("");

  const handleOnChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") as string);
    createChatrooms(input, user, (err: any, chatroom: any) => {
      if (err) console.error(err);
      console.log(chatroom);
    });
    setInput("");
  };
  return (
    <form method="post" onSubmit={handleSubmit}>
      <input type="text" onChange={(event) => handleOnChange(event)} />
      <button type="submit" className="text-white pl-2">
        Create Chatroom
      </button>
    </form>
  );
}
