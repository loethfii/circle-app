import { profile } from "@/types/profilePic";
import { profileData } from "@/api/profile";
import { useQuery } from "react-query";
import { token } from "@/types/token";
const useDataUser = () => {
  const {
    data: profile,
    refetch: refetchProfile,
    isLoading,
  } = useQuery<profile>("profile", () => profileData(token));
  return {
    profile,
    refetchProfile,
    isLoading,
  };
};

export default useDataUser;
