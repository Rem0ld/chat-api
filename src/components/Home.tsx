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
    <div>
      <Login />
      <SignUp />
    </div>
  );
}
