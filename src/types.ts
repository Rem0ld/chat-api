export type User = {
  id: string;
  username: string;
  email: string;
}

export type TEntry = {
  user: User;
  message: string;
  type: string;
  timestamp: string;
}

export interface IChatroom {
  name: string;
  owner: string;
  member: any[];
  chatHistory: string[];
  dateCreation: string;
}

export interface IRoom {
  name: string;
  size: number;
  owner: string;
}

export interface ICallbackJoin {
  chat: TEntry[];
  listUserConnected: User[];
}