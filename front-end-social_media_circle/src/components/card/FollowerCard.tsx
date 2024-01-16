import { Avatar, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { userIsFollower } from "../../types/follow";
import { followOneUser } from "../../api/follow";
import useDataUser from "@/hooks/useDataUser";

const FollowerCard: React.FC<userIsFollower> = (props) => {
  const [isFollow, setIsFollow] = useState(false);
  const token = localStorage.getItem("token") || "";
  const { refetchProfile } = useDataUser();

  const doFollow = (id: number) => {
    followOneUser(id, token)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });

    props.refetch();
  };

  const doUnfollow = (id: number) => {
    followOneUser(id, token)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFollow = (userIdC: number) => {
    setIsFollow(true);
    doFollow(userIdC);
    refetchProfile();
  };

  const handleUnfollow = (userIdU: number) => {
    setIsFollow(false);
    doUnfollow(userIdU);
    refetchProfile();
  };

  return (
    <Box>
      <Flex gap={3} justifyContent={"space-between"} marginTop={5}>
        <Box>
          <Flex>
            <Avatar
              src={props.profile_picture}
              boxSize={"34px"}
              borderRadius={"full"}
              name={props.full_name}
            />
            <Box marginLeft={"10px"}>
              <Text fontSize={12} color={"gray.200"} marginBottom={-1}>
                {props.full_name}
              </Text>
              <Text fontSize={12} color={"gray.500"}>
                @{props.username}
              </Text>
            </Box>
          </Flex>
        </Box>
        {isFollow ? (
          <Button
            rounded={"full"}
            colorScheme="gray"
            variant="outline"
            textColor={"gray.200"}
            height={"30px"}
            _hover={{ bg: "#fff", textColor: "black" }}
            onClick={() => handleUnfollow(props.id)}
          >
            Following
          </Button>
        ) : (
          <Button
            rounded={"full"}
            colorScheme="gray"
            variant="outline"
            textColor={"gray.200"}
            height={"30px"}
            _hover={{ bg: "#fff", textColor: "black" }}
            onClick={() => handleFollow(props.id)}
          >
            Follow
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default FollowerCard;
