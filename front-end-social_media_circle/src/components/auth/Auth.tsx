import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface authProps {
  children: ReactNode;
}

const Auth: React.FC<authProps> = (props) => {
  const { children } = props;
  return (
    <>
      <Text color={"green.400"} fontSize={50} fontWeight={"bold"}>
        Circle
      </Text>
      <Text marginY={3} color={"white"} fontSize={30} fontWeight={"bold"}>
        {children}
      </Text>
    </>
  );
};

export default Auth;
