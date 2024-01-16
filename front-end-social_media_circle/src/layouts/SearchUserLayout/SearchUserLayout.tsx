import React from "react";
import { LeftLayout } from "../HomeLayout/components/LeftLayout";
import { Box, Flex } from "@chakra-ui/react";
import RightLayout from "../HomeLayout/components/RightLayout";
import MiddleLayout from "@/layouts/SearchUserLayout/middleLayout/MiddleLayout";

const SearchUserLayout: React.FC = () => {
  return (
    <Box bg={"black"} minH={"100vh"}>
      <Flex gap={"1px"}>
        <LeftLayout />
        <MiddleLayout />
        <RightLayout />
      </Flex>
    </Box>
  );
};

export default SearchUserLayout;
