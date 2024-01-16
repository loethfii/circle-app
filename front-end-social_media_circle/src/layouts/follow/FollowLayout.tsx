import React from "react";
import { LeftLayout } from "../HomeLayout/components/LeftLayout";
import RightLayout from "../HomeLayout/components/RightLayout";
import { Box, Flex } from "@chakra-ui/react";
import MidLayoutFollow from "./compnent/MidLayoutFollow";

const FollowLayout: React.FC = () => {
  return (
    <>
      <Box bg={"black"} minHeight={"100vh"}>
        <Flex gap={"1px"}>
          <LeftLayout />
          <MidLayoutFollow />
          <RightLayout />
        </Flex>
      </Box>
    </>
  );
};

export default FollowLayout;
