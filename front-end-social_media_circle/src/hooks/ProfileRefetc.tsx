/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ProfRefetch: React.Dispatch<React.SetStateAction<any>> = () => {
  const [refetchProfile, setRefetchProfile] = React.useState<
    () => void | Promise<any>
  >(() => {});
  return {
    refetchProfile,
    setRefetchProfile,
  };
};

export default ProfRefetch;
