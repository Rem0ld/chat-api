import React, { ReactElement, useEffect, useState } from "react";
import client from "../../api/socket";

export default function Chat(): ReactElement {
  const [socket, setSocket] = useState<any>();
  const [response, setResponse] = useState("");

  useEffect(() => {
    setSocket(client());
  }, []);

  return (
    <div>
      Hello les copains, en construction par 7Lieues... On n'est pas pret de le
      voir arriver
    </div>
  );
}
