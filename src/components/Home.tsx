import React, { ReactElement, useEffect, useState } from "react";
import client from "../api/socket";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";

export default function Home(): ReactElement {
  const [socket, setSocket] = useState<any>();
  const [response, setResponse] = useState("");

  useEffect(() => {
    setSocket(client());
  }, []);

  return (
    <div className="mt-4">
      <div className=" grid place-items-center">
        <h1 className="px-10 py-6 border border-white font-bold text-center text-7xl text-white rounded-md box-border shadow-md">
          Slord
        </h1>
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:items-start justify-center items-center md:mt-10 mt-10 md:m-auto mx-2 md:w-3/5  bg-white rounded-md shadow-md">
        <SignUp />
        {/* <div className= "h-screen border-r-2 border-gray-300"></div> */}
        {/* <hr className="h-full w-full border border-gray-300 transform-gpu lg:rotate-90" /> */}
        <Login />
      </div>
    </div>
  );
}
