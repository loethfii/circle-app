import React, { useState } from "react";
import { Alert, AlertIcon, Box, Text } from "@chakra-ui/react";
import { Input, Button, Flex } from "@chakra-ui/react";
import Auth from "../../components/auth/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { loginUser } from "../../api/login";

const LoginLayout: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState();
  useMutation((loginData: { email: string; password: string }) =>
    loginUser(loginData)
  );

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await loginUser({ email, password })
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          // Redirect or do something else upon successful login
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <Box margin={"auto"} width={"500px"} padding={5}>
      <Auth>Login to Circle</Auth>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          marginY={3}
          color={"gray.200"}
          fontWeight={"bold"}
          placeholder="Enter Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          marginY={3}
          color={"gray.200"}
          fontWeight={"bold"}
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Flex justifyContent={"end"}>
          <Text color={"white"} marginY={1}>
            Forgot Password?
          </Text>
        </Flex>

        <Button type="submit" marginY={3} colorScheme="green" width={"100%"}>
          Login
        </Button>
        <Text color={"gray.200"}>
          Don't have an account ?{" "}
          <Link to="/register" className="text-green-500">
            Register
          </Link>
          .
        </Text>
      </form>
    </Box>
  );
};

export default LoginLayout;
