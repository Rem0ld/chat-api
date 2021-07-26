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

export interface ChatroomType {
  name: string;
  owner: string;
  member: any[];
  chatHistory: string[];
  dateCreation: string;
}

export interface ICallbackJoin {
  chat: TEntry[];
  listUserConnected: User[];
}