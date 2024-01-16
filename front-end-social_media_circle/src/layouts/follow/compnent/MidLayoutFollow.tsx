import {
  Box,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import FollowList from "../../../components/FollowList/FollowList";
// import { useSearchParams } from "react-router-dom";
import { getFollower, getFollowing } from "../../../api/follow";
import { token } from "../../../types/token";
import { useQuery } from "react-query";
import { lisFollowerFollowingI } from "../../../types/follow";
import { useSearchParams } from "react-router-dom";
const Follower: React.FC = () => {
  const { data: followers, refetch } = useQuery<lisFollowerFollowingI[]>(
    "getFollowers",
    () => getFollower(token)
  );

  refetch();

  return (
    <>
      {followers?.map((f) => (
        <FollowList
          key={f.id}
          id={f.id}
          username={f.username}
          full_name={f.full_name}
          profile_picture={f.profile_picture}
          profile_description={f.profile_description}
          isFollowing={f.isFollowing}
        />
      ))}
    </>
  );
};

const Following: React.FC = () => {
  const { data: followings, refetch } = useQuery<lisFollowerFollowingI[]>(
    "getFollowings",
    () => getFollowing(token)
  );

  refetch();

  return (
    <>
      {followings?.map((f) => (
        <FollowList
          key={f.id}
          id={f.id}
          username={f.username}
          full_name={f.full_name}
          profile_picture={f.profile_picture}
          profile_description={f.profile_description}
          isFollowing={f.isFollowing}
        />
      ))}
    </>
  );
};

const MidLayoutFollow: React.FC = () => {
  const [searchParams] = useSearchParams();
  const d = searchParams.get("d");

  return (
    <Box
      width={"45%"}
      borderRight="1px"
      borderLeft={"1px"}
      borderColor="gray.200"
    >
      <Heading
        as={"h2"}
        size={"lg"}
        paddingTop={"59px"}
        paddingLeft={"45px"}
        color={"gray.200"}
      >
        <Text>Follows</Text>
      </Heading>
      <Tabs
        variant="enclosed"
        marginTop={"25px"}
        border={"none"}
        defaultIndex={d === "flr" ? 0 : 1}
      >
        <TabList paddingBottom={"20px"}>
          <Tab
            width={"50%"}
            color={"gray.200"}
            fontSize={"2xl"}
            fontWeight={"bold"}
            border={"none"}
          >
            Followers
          </Tab>
          <Tab
            width={"50%"}
            color={"gray.200"}
            fontSize={"2xl"}
            fontWeight={"bold"}
            border={"none"}
          >
            Following
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="green.400"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <Follower />
          </TabPanel>
          <TabPanel>
            <Following />
            {/* <p className="text-white">two!</p> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MidLayoutFollow;
