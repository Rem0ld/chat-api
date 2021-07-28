import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { IRoom, User } from "types";

interface AppProperties {
  socket: any;
  setChatrooms: any;
}

type Input = {
  chatroomName: string;
};

export default function FormCreateChatrooms({
  socket,
  setChatrooms,
}: AppProperties): ReactElement {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async ({
    chatroomName,
  }): Promise<void> => {
    if (chatroomName.length === 0) return;

    const user = JSON.parse(localStorage.getItem("user") as string);
    try {
      createChatrooms(chatroomName, user);
    } catch (error) {
      console.error("caught by catch", error);
    }
  };

  const createChatrooms = (name: string, userInfo: User) => {
    socket.createChatrooms(
      name,
      { socketId: socket.socket.id, user: userInfo },
      (err: undefined | string, chatrooms: IRoom[]) => {
        if (err) {
          if (err.includes("already exist!")) {
            setError(
              "chatroomName",
              { message: "Already exist!" },
              { shouldFocus: true }
            );
          }
          return;
        }

        setChatrooms(chatrooms);
        reset();
        history.push(`/chat/${name}`);
      }
    );
  };
  return (
    <form
      className="flex flex-col pt-2 space-y-2"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="chatroomName"
        className="rounded-md"
        defaultValue=""
        type="text"
        autoComplete="off"
        {...register("chatroomName", { required: "You need to enter a name" })}
      />
      {errors.chatroomName && (
        <span className="text-red-500 text-xs italic">
          {errors.chatroomName.message}
        </span>
      )}
      <button
        className="py-2 px-1 text-gray-700 rounded-md shadow-md bg-primary"
        type="submit"
      >
        Create Chatroom
      </button>
    </form>
  );
}
