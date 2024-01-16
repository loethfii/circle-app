import React from "react";
import { LeftLayout } from "../HomeLayout/components/LeftLayout";
import RightLayout from "../HomeLayout/components/RightLayout";
// import { MiddleLayout } from "../HomeLayout/components/MiddleLayout"
import { DetailMiddleLayout } from "./components/detailMiddleLayout";
import { Box, Flex } from "@chakra-ui/react";

const DetailThreadLayout: React.FC = () => {
  return (
    <div>
      <Box bg={"black"} minH={"100vh"}>
        <Flex gap={"1px"}>
          <LeftLayout />
          <DetailMiddleLayout />
          <RightLayout />
        </Flex>
      </Box>
    </div>
  );
};

export default DetailThreadLayout;
