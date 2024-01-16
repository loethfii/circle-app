import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import FollowList from "@/components/FollowList/FollowList";
import { useQuery } from "react-query";
import { searchData } from "@/api/profile";
import { token } from "@/types/token";
import { lisFollowerFollowingI } from "@/types/follow";

const DataNotFound = () => {
  return (
    <>
      <Text
        color={"gray.200"}
        marginTop={"30px"}
        fontWeight={"bold"}
        fontSize={18}
        textAlign={"center"}
      >
        No data found
      </Text>
    </>
  );
};

const MiddleLayout: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const sendToApi = {
    token: token,
    searchData: searchText,
  };
  const {
    data: allProfile,
    refetch,
    isLoading,
  } = useQuery<lisFollowerFollowingI[]>("searchUser", () =>
    searchData(sendToApi)
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTextInput = event.target.value;
    if (searchTextInput === "") {
      setSearchText("");
      refetch;
    } else {
      setSearchText(searchTextInput);
      refetch();
    }
  };
  return (
    <Box
      bg={"black"}
      width={"45%"}
      borderRight="1px"
      borderLeft={"1px"}
      borderColor="gray.200"
      paddingTop={"59px"}
    >
      {isLoading && <>Loading...</>}
      <Box marginX={"20px"}>
        <Flex position={"relative"}>
          <Input
            type="text"
            height={"40px"}
            bgColor={"gray.700"}
            color={"gray.300"}
            fontSize={"19px"}
            rounded={"full"}
            paddingLeft={16}
            onChange={handleSearch}
          />
          <MdPersonSearch
            color="#CBD5E0"
            size="35"
            className="absolute top-1 left-3 z-50"
          />
        </Flex>
        <Box>
          {!isLoading && allProfile?.length === 0 && <DataNotFound />}
          {allProfile?.map((prof) => (
            <FollowList
              key={prof.id}
              id={prof.id}
              username={prof.username}
              full_name={prof.full_name}
              profile_picture={prof.profile_picture}
              profile_description={prof.profile_description}
              isFollowing={prof.isFollowing}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MiddleLayout;
