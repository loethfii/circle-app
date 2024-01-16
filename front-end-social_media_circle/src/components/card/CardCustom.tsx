import React, { useEffect, useState } from "react";
import {
  Card,
  Flex,
  CardHeader,
  Text,
  CardBody,
  CardFooter,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { cardInterface } from "../../types/card";
import { LiaComment } from "react-icons/lia";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { likeThread, unLikeThread } from "../../api/thread";
// import { FaHeart } from "react-icons/fa";

// interface like {
//   userId: number;
//   threadId: number;
// }

const CardCustom: React.FC<cardInterface> = (props) => {
  const [isLikeCard, setIsLikeCard] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (props.isLike === true) {
      setIsLikeCard(true);
    } else {
      setIsLikeCard(false);
    }
  }, [props.isLike]);

  const likePost = async () => {
    try {
      setIsLikeCard(true);
      await likeThread(props.threadId, token);
      props.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const unLike = async () => {
    try {
      setIsLikeCard(false);
      await unLikeThread(props.threadId, token);
      props.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const {
    mt,
    imageUrl,
    profileName,
    taggedName,
    // postAt,
    content,
    imagePost,
    like,
    replies,
  } = props;

  return (
    <Card marginTop={mt} textColor={"gray.200"} bg={"black"}>
      <CardHeader>
        <Flex gap={3}>
          <Avatar name={profileName} src={imageUrl} />
          <Text>{profileName}</Text>
          <Text>{taggedName}</Text>
          {"."}
          <Text>{props.timeAgo}</Text>
        </Flex>
      </CardHeader>
      <CardBody
        paddingLeft={"77px"}
        marginTop={"-50px"}
        // maxHeight={"100px"}
        overflow={"hidden"}
      >
        <Link
          to={`/detail-thread/${props.threadId}`}
          style={{ textDecoration: "none" }}
        >
          <Text>{content}</Text>
        </Link>

        {imagePost && (
          <Image marginTop={7} maxHeight={"400px"} src={imagePost}></Image>
        )}
      </CardBody>
      <CardFooter paddingLeft={"77px"}>
        <Flex gap={3}>
          <button onClick={isLikeCard ? unLike : likePost}>
            {isLikeCard ? (
              <FaHeart size={20} className="cursor-pointer" color="red" />
            ) : (
              <FaRegHeart size={20} className="cursor-pointer" />
            )}
            {/* <FaRegHeart size={20} className="cursor-pointer" /> */}
          </button>
          <Text>{like}</Text>
          <LiaComment size={25} className="-mt-[2px] cursor-pointer" />
          <Text>{replies}</Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CardCustom;
