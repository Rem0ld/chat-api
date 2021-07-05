import React, { ReactElement, useContext, useEffect, useState } from "react";
import { User } from "types";

interface AppProperties {
  children: React.ReactNode;
}

export interface Session {
  user: User;
  token: string;
  login: () => void;
  logout: () => void;
}

export const SessionContext = React.createContext<any>(null);

export function ProvideAuth({ children }: AppProperties): ReactElement {
  const auth = useProvideAuth();

  return (
    <SessionContext.Provider value={auth}>{children}</SessionContext.Provider>
  );
}

export function useAuth() {
  return useContext(SessionContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("user") as string);
    if (storage && storage.user) {
      setUser(storage);
    }
  }, []);

  const signin = (newUser: any) => {
    setUser(newUser);
  };

  const signout = () => {
    setUser(null);
  };

  return {
    user,
    signin,
    signout,
  };
}
