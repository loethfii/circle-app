export interface ProfilePicture {
  url: string;
}

export interface profile {
  id: number;
  email: string;
  username: string;
  profile_description: string;
  profile_picture: string;
  full_name: string;
  following: number;
  followers: number;
}
