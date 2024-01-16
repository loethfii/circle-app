import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import ProfilePic from "../profilePic/ProfilePic";
import { FaRegHeart } from "react-icons/fa";
import { comentThread } from "../../types/replies";

const CardComentar: React.FC<comentThread> = (props) => {
  return (
    <>
      <Divider marginY={"30px"} marginLeft={"-20px"} width={"664px"} />
      <Box>
        <Flex gap={3} paddingLeft={"20px"}>
          <ProfilePic url={props.profile_picture} />
          <Text color={"gray.200"}>{props.full_name}</Text>
          <Text color={"gray.200"}>@{props.username}</Text>
          <Text color={"gray.200"}> • </Text>
          <Text color={"gray.200"}>{props.repliesAt}</Text>
        </Flex>
        <Box
          paddingLeft={"77px"}
          marginTop={"-10px"}
          // maxHeight={"100px"}
          overflow={"hidden"}
          color={"gray.200"}
        >
          <Text>{props.content}</Text>
          <Flex gap={3}>
            <FaRegHeart size={20} className="cursor-pointer mt-3" />
            <Text mt={3}>202</Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default CardComentar;
