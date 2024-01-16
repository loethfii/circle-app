import { user } from "./user";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IThreads {
  id: number;
  full_name: string;
  username: string;
  content: string;
  image: string;
  replies: number;
  image_profile: string;
  like: number;
  posted_at: string;
  timeAgo: string;
  isLike: boolean;
}

export interface IthreadPost {
  content: string;
  image: any;
}

export interface detailThreadI {
  id: number;
  content: string;
  user: user;
  image: string;
  posted_at: string;
  countReplies: number;
  countLike: number;
}
