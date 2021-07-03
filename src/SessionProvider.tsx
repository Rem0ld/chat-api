import React, { ReactElement, useContext, useState } from "react";
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

  const signin = (newUser: any) => {
    console.log("new useR", newUser);
    setUser(newUser);
    return () => {};
  };

  const signout = () => {
    return () => {
      setUser(null);
    };
  };
  return {
    user,
    signin,
    signout,
  };
}

// export default function SessionProvider({
//   children,
// }: AppProperties): ReactElement {
//   const [user, setUser] = useState<Session | null>(null);

//   const login = (user: Session) => {
//     setUser(user);
//   };

//   const logout = () => {
//     setUser(null);
//   };
//   return (
//     <SessionContext.Provider value={{ user, login: login, logout: logout }}>
//       {children}
//     </SessionContext.Provider>
//   );
// }
