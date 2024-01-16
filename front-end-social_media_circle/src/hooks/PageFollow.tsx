import { useState } from "react";

const PageFollowGlobal = () => {
  const [isFollower, setIsFollower] = useState("");
  function handleFollower() {
    setIsFollower("followers");
  }

  function handleFollowing() {
    setIsFollower("following");
  }

  return {
    isFollower,
    handleFollower,
    handleFollowing,
  };
};

export default PageFollowGlobal;
