import { user } from "./user";

export interface comentThread {
  content: string;
  username: string;
  full_name: string;
  profile_picture: string;
  repliesAt: string;
}

export interface repliesInterface {
  id: number;
  content: string;
  user: user;
  repliesAt: string;
}

export interface postAReplies {
  content: string;
  threadId: number;
}
