import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { lisFollowerFollowingI } from "../../types/follow";
// import { useQuery } from "react-query";
import { token } from "../../types/token";
import { unFollowUser, followOneUser } from "../../api/follow";
import useDataUser from "@/hooks/useDataUser";
const FollowList: React.FC<lisFollowerFollowingI> = (props) => {
  const [isFollow, setIsFollow] = useState(false);
  const { refetchProfile } = useDataUser();

  useEffect(() => {
    if (props.isFollowing === true) {
      setIsFollow(true);
    } else if (props.isFollowing === false) {
      setIsFollow(false);
    }
  }, [props.isFollowing]);

  // checkIsFollowing();

  const handleFollow = () => {
    setIsFollow(true);
    followOneUser(props.id, token);
  };

  const handleUnfollow = () => {
    setIsFollow(false);
    unFollowUser(props.id, token);
  };

  return (
    <Box>
      <Flex justifyContent={"space-between"} marginX={3} marginTop={5}>
        <Box>
          <Flex>
            <Avatar
              name={props.full_name}
              bg={"gray.300"}
              src={props.profile_picture}
            />
            <Box marginLeft={"10px"}>
              <Text fontSize={19} color={"gray.200"} marginBottom={-1}>
                {props.full_name}
              </Text>
              <Text fontSize={15} color={"gray.500"}>
                @{props.username}
              </Text>
              <Text fontSize={17} color={"gray.200"} marginBottom={-1}>
                {props.profile_description}
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
            onClick={handleUnfollow}
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
            onClick={handleFollow}
          >
            Follow
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default FollowList;
