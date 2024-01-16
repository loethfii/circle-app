import React from "react";
import LoginLayout from "../layouts/Login/LoginLayout";
import { Box } from "@chakra-ui/react";

const Login: React.FC = () => {
  return (
    <>
      <Box backgroundColor={"black"} height={"100vh"} paddingTop={"14vh"}>
        <LoginLayout />
      </Box>
    </>
  );
};

export default Login;
