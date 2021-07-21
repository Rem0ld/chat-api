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
    if (input.length === 0) return;

    const user = JSON.parse(localStorage.getItem("user") as string);
    createChatrooms(input, user);
    setInput("");
  };
  return (
    <form className="space-y-2" method="post" onSubmit={handleSubmit}>
      <input
        className="rounded-md"
        type="text"
        value={input}
        onChange={(event) => handleOnChange(event)}
      />
      <button
        className="py-2 px-1 text-gray-700 rounded-md shadow-md bg-primary"
        type="submit"
      >
        Create Chatroom
      </button>
    </form>
  );
}
