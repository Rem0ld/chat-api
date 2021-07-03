import React, { ReactElement, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "SessionProvider";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";

export default function Home(): ReactElement {
  const auth = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    if (user) {
      auth.signin(user);
    }
  }, []);

  if (auth.user) {
    return <Redirect to="/chat" />;
  }

  return (
    <div className="mt-4">
      <div className=" grid place-items-center">
        <h1 className="px-10 py-6 border border-white font-bold text-center text-7xl text-white rounded-md box-border shadow-md">
          Slord
        </h1>
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:items-start justify-center items-center md:mt-10 mt-10 md:m-auto mx-2 md:w-3/5  bg-white rounded-md shadow-md">
        <SignUp />
        <Login />
      </div>
    </div>
  );
}
