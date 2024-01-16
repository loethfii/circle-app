import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

export interface sugestedUserInterface {
  id: number;
  username: string;
  full_name: string;
  profile_picture: string;
}

export interface isFollowByYou {
  data: boolean;
}

export interface userIsFollower {
  id: number;
  username: string;
  full_name: string;
  profile_picture: string;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<sugestedUserInterface[], unknown>>;
}

export interface lisFollowerFollowingI {
  id: number;
  username: string;
  full_name: string;
  profile_picture: string;
  profile_description: string;
  isFollowing: boolean;
}
