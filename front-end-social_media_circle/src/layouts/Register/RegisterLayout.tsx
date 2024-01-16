/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Auth from "../../components/auth/Auth";
import { registerUser } from "../../api/registerApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const RegisterLayout: React.FC = () => {
  const [errRegister, setErrRegister] = React.useState("");
  const navigate = useNavigate();

  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: any) => {
      setErrRegister(error.response.data.message);
    },
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      username: event.currentTarget.username.value,
      full_name: event.currentTarget.full_name.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    mutation.mutate(data);
  };

  return (
    <Box margin={"auto"} width={"500px"} padding={5}>
      <Auth>Create account Circle</Auth>
      {errRegister && (
        <Alert status="error">
          <AlertIcon />
          {errRegister}
        </Alert>
      )}
      <form onSubmit={handleRegister}>
        <Input
          type="text"
          marginY={3}
          color={"gray.200"}
          fontWeight={"bold"}
          placeholder="Username"
          name="username"
        />
        <Input
          type="text"
          marginY={3}
          color={"gray.200"}
          fontWeight={"bold"}
          placeholder="Full Name"
          name="full_name"
        />
        <Input
          type="email"
          marginY={3}
          color={"gray.200"}
          fontWeight={"bold"}
          placeholder="Email"
          name="email"
        />
        <Input
          type="password"
          marginY={3}
          color={"gray.200"}
          fontWeight={"bold"}
          placeholder="Password"
          name="password"
        />
        <Flex justifyContent={"end"}>
          <Text color={"white"} marginY={1}>
            Forgot Password?
          </Text>
        </Flex>

        <Button type="submit" marginY={3} colorScheme="green" width={"100%"}>
          Register
        </Button>
        <Text color={"gray.200"}>
          Alredy Have Token ?{" "}
          <Link to="/login" className="text-green-500">
            Login
          </Link>
        </Text>
      </form>
    </Box>
  );
};

export default RegisterLayout;
