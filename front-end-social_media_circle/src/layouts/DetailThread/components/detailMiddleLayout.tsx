/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Button, Divider, Input } from "@chakra-ui/react";
import { MdAddPhotoAlternate } from "react-icons/md";
import ProfilePic from "../../../components/profilePic/ProfilePic";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import CardComentar from "../../../components/card/CardComentar";
import { detailThread } from "../../../api/thread";
import { useQuery } from "react-query";
import { detailThreadI } from "../../../types/thread";
import DetailThreadCard from "../../../components/card/DetailThreadCard";
import { RepliesThreadList, posReplies } from "../../../api/replies";
import { postAReplies, repliesInterface } from "../../../types/replies";
const DetailPost: React.FC = () => {
  const [detailThreadNew, setDetailThreadNew] = useState<detailThreadI>();

  const { threadId } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    detailThread(Number(threadId), token)
      .then((res) => {
        setDetailThreadNew(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [threadId, token]);

  return (
    <>
      <DetailThreadCard
        mt={"10px"}
        imageUrl={detailThreadNew?.user.profile_picture || ""}
        profileName={detailThreadNew?.user.full_name || ""}
        taggedName={"@" + detailThreadNew?.user.username || ""}
        postAt={detailThreadNew?.posted_at || ""}
        content={detailThreadNew?.content || ""}
        imagePost={detailThreadNew?.image || ""}
        like={detailThreadNew?.countLike || 0}
        replies={detailThreadNew?.countReplies || 0}
      />
    </>
  );
};

const ComentThread: React.FC = () => {
  // const [replies, setReplies] = useState<repliesInterface[]>();
  const { threadId } = useParams();

  const token = localStorage.getItem("token") || "";
  const { data: replies, refetch } = useQuery<repliesInterface[]>(
    "repliesTHread",
    () => RepliesThreadList(Number(threadId), token)
  );

  refetch();

  return (
    <>
      {replies?.map((reply) => (
        <CardComentar
          key={reply.id}
          content={reply.content}
          username={reply.user.username}
          full_name={reply.user.full_name}
          profile_picture={reply.user.profile_picture}
          repliesAt={reply.repliesAt}
        />
      ))}
    </>
  );
};

const ThreadReplyPost: React.FC = () => {
  const { threadId } = useParams();
  const handlePostReply = (event: React.FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();

    const content = (event.target as HTMLFormElement).content.value;

    const token = localStorage.getItem("token") || "";

    const newData: postAReplies = {
      content,
      threadId: Number(threadId),
    };

    posReplies(newData, token);
  };

  return (
    <>
      <Flex gap={3} paddingLeft={"20px"}>
        <ProfilePic url="https://source.unsplash.com/300x300/?guy=1" />
        <form onSubmit={handlePostReply}>
          <Flex paddingTop={1}>
            <Input
              type="text"
              placeholder="Type Your reply"
              color={"gray.200"}
              width={"400px"}
              name="content"
            />
            <MdAddPhotoAlternate color="green" size="50" className="-mt-2" />

            <input type="file" className="bg-green-400 hidden" />
            <Button rounded={"full"} width={"100px"} type="submit">
              Reply
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export const DetailMiddleLayout: React.FC = () => {
  return (
    <Box
      bg={"black"}
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
        <Flex>
          <Link to="/">
            <IoArrowBackOutline className="mt-[5px]  text-slate-200 mr-3" />{" "}
          </Link>
          Status
        </Flex>
      </Heading>
      <Box padding={"20px"} marginBottom={"20px"}>
        <DetailPost />

        <Divider marginBottom={"30px"} marginLeft={"-20px"} width={"670px"} />
        <Box>
          <ThreadReplyPost />
        </Box>

        {/* ssss */}
        <ComentThread />
      </Box>
    </Box>
  );
};
