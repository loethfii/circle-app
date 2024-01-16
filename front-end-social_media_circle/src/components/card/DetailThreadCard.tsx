import React, { useEffect, useState } from "react";
import {
  Card,
  Flex,
  CardHeader,
  Text,
  CardBody,
  CardFooter,
  Image,
} from "@chakra-ui/react";
import { cardDetailI } from "../../types/card";
import ProfilePic from "../../components/profilePic/ProfilePic";
import { LiaComment } from "react-icons/lia";
import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { likeThread, isLikeThread, unLikeThread } from "../../api/thread";

const DetailThreadCard: React.FC<cardDetailI> = (props) => {
  //   const [isLike, setIsLike] = useState(false);

  //   const token = localStorage.getItem("token");

  //   useEffect(() => {
  //     const isLikeFunc = async () => {
  //       const data = await isLikeThread(props.threadId, token);
  //       setIsLike(data);
  //     };

  //     isLikeFunc();
  //   }, [props.threadId, token, isLike]);

  //   const likePost = async () => {
  //     try {
  //       setIsLike(true);
  //       await likeThread(props.threadId, token);
  //       props.refetch();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const unLike = async () => {
  //     try {
  //       setIsLike(false);
  //       await unLikeThread(props.threadId, token);
  //       props.refetch();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const {
    mt,
    imageUrl,
    profileName,
    taggedName,
    postAt,
    content,
    imagePost,
    like,
    replies,
  } = props;

  return (
    <Card marginTop={mt} textColor={"gray.200"} bg={"black"}>
      <CardHeader>
        <Flex gap={3}>
          <ProfilePic url={imageUrl} />
          <Text>{profileName}</Text>
          <Text>{taggedName}</Text>
          {"."}
          <Text>{postAt}</Text>
        </Flex>
      </CardHeader>
      <CardBody
        paddingLeft={"77px"}
        marginTop={"-50px"}
        // maxHeight={"100px"}
        overflow={"hidden"}
      >
        <Text>{content}</Text>

        {imagePost && (
          <Image marginTop={7} maxHeight={"400px"} src={imagePost}></Image>
        )}
      </CardBody>
      <CardFooter paddingLeft={"77px"}>
        <Flex gap={3}>
          <button>
            <FaHeart size={20} className="cursor-pointer" color="red" />
          </button>
          <Text>{like}</Text>
          <LiaComment size={25} className="-mt-[2px] cursor-pointer" />
          <Text>{replies}</Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default DetailThreadCard;
