import React, { useEffect } from "react";
import { LeftLayout } from "./components/LeftLayout";
import { MiddleLayout } from "./components/MiddleLayout";
import { Box, Flex } from "@chakra-ui/react";
import RightLayout from "./components/RightLayout";
import { jwtDecode } from "jwt-decode";

const HomeLayout: React.FC = () => {
  const [payload, setPayload] = React.useState({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const payload: Headers = jwtDecode(token);
      setPayload(payload);
    }
  }, [token]);

  return (
    <Box bg={"black"}>
      <Flex gap={"1px"}>
        <LeftLayout />
        <MiddleLayout obj={payload} />
        <RightLayout />
      </Flex>
    </Box>
  );
};

export default HomeLayout;
