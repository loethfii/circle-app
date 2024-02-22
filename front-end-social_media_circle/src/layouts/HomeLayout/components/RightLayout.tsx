/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ProfileCard from "../../../components/card/ProfileCard";
import FollowerCard from "../../../components/card/FollowerCard";
import { useQuery } from "react-query";
import { sugestedUser } from "../../../api/follow";
import { sugestedUserInterface } from "../../../types/follow";
import useDataUser from "@/hooks/useDataUser";
const ProfileRight: React.FC = () => {
  // const [profile, setProfile] = useState<profile>(Object);

  // const {
  //   data: profile,
  //   refetch: refetchProfile,
  //   isLoading,
  // } = useQuery<profile>("profile", () => profileData(token));
  const { profile, isLoading } = useDataUser();

  return (
    <Box>
      {isLoading && <>Loading...</>}
      <ProfileCard
        full_name={profile?.full_name || ""}
        email={profile?.email || ""}
        username={profile?.username || ""}
        profile_picture={profile?.profile_picture || ""}
        profile_description={profile?.profile_description || ""}
        following={profile?.following || 0}
        followers={profile?.followers || 0}
        id={profile?.id || 0}
      />
    </Box>
  );
};

const SuggestedUser: React.FC = () => {
  const token = localStorage.getItem("token") || "";
  const { data: suges, refetch } = useQuery<sugestedUserInterface[]>(
    "sugestedUser",
    () => sugestedUser(token)
  );

  return (
    <>
      {suges?.map((sugested) => (
        <FollowerCard
          key={sugested.id}
          profile_picture={sugested.profile_picture}
          full_name={sugested.full_name}
          username={sugested.username}
          id={sugested.id}
          refetch={refetch}
        />
      ))}
    </>
  );
};

const RightLayout: React.FC = () => {
  return (
    <Box
      paddingTop={"59px"}
      marginX={"20px"}
      sx={{
        "@media screen and (max-width: 900px)": {
          display: "none",
        },
      }}
    >
      <ProfileRight />
      <Box
        padding={5}
        bg={"#262626"}
        width={"400px"}
        className="rounded"
        position={"relative"}
        marginTop={3}
      >
        <Text color={"gray.200"}>Suggested for you</Text>
        <SuggestedUser />
      </Box>
      <Box
        padding={5}
        bg={"#262626"}
        width={"400px"}
        className="rounded"
        position={"relative"}
        marginTop={3}
      >
        <Text color={"gray.200"}>Develop By Luthfi Roma</Text>
      </Box>
    </Box>
  );
};

export default RightLayout;
