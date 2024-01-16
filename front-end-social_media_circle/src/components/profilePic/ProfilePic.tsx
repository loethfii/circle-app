import React from "react";
import { ProfilePicture } from "../../types/profilePic";
import { Image } from "@chakra-ui/react";

const ProfilePic: React.FC<ProfilePicture> = (props) => {
  const { url } = props;

  return (
    <>
      <Image src={url} boxSize={"45px"} borderRadius={"full"} alt="profile" />
    </>
  );
};

export default ProfilePic;
