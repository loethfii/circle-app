// import {
//   QueryObserverResult,
//   RefetchOptions,
//   RefetchQueryFilters,
// } from "react-query";

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

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
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<void, unknown>>;
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
