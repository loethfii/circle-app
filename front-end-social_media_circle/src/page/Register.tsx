import React from "react";
import RegisterLayout from "../layouts/Register/RegisterLayout";
import { Box } from "@chakra-ui/react";

const Register: React.FC = () => {
  return (
    <Box backgroundColor={"black"} height={"100vh"} paddingTop={"14vh"}>
      <RegisterLayout />
    </Box>
  );
};

export default Register;
