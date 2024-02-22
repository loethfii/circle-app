// import {
//   QueryObserverResult,
//   RefetchOptions,
//   RefetchQueryFilters,
// } from "react-query";

export interface cardInterface {
  threadId: number;
  mt: string;
  imageUrl: string;
  profileName: string;
  taggedName: string;
  postAt: string;
  content: string;
  imagePost: string;
  timeAgo: string;
  like: number;
  replies: number;
  isLike: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: any;
}

export interface cardDetailI {
  mt: string;
  imageUrl: string;
  profileName: string;
  taggedName: string;
  postAt: string;
  content: string;
  imagePost: string;
  like: number;
  replies: number;
}
