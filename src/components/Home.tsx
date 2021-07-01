import React, { ReactElement, useEffect, useState } from "react";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";

export default function Home(): ReactElement {
  const [response, setResponse] = useState("");

  useEffect(() => {}, []);

  return (
    <div>
      <Login />
      <SignUp />
    </div>
  );
}
