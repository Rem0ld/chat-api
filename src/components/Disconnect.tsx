import React, { ReactElement } from "react";
import { useAuth } from "SessionProvider";
import { User } from "types";

export default function Disconnect({ user }: { user: User }): ReactElement {
  const auth = useAuth();
  return (
    <div className="h-screen w-1/4 bg-tertiary text-white font-semibold">
      <div className="flex justify-between items-center h-auto p-2">
        {user && user.username}
        <button
          className="py-2 px-1 text-gray-700 rounded-md shadow-md bg-primary"
          type="button"
          onClick={() => {
            auth.signout();
          }}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
