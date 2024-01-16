/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { threadFetch } from "../../../api/thread";
import {
  Box,
  Heading,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Avatar,
  Image,
} from "@chakra-ui/react";
import {
  MdAddPhotoAlternate,
  MdOutlineAddPhotoAlternate,
} from "react-icons/md";
import CardCustom from "../../../components/card/CardCustom";
import { useQuery } from "react-query";
import { postThread } from "../../../api/thread";
import { IThreads, IthreadPost } from "../../../types/thread";
import { useNavigate } from "react-router-dom";
import { profileData } from "../../../api/profile";
import { profile } from "../../../types/profilePic";
interface payload {
  obj: any;
}

interface refresh {
  refatch: any;
}
const HandleFormThread: React.FC<refresh> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pvImage, setPvImage] = useState<string>("");

  const navigate = useNavigate();

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const preImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    const preImage = URL.createObjectURL(image as any);
    setPvImage(preImage);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const content = (event.target as HTMLFormElement).content.value;
    const image = (event.target as HTMLFormElement).image.files[0];
    setPvImage("");

    const objPost: IthreadPost = {
      content: content,
      image: image,
    };

    await postThread(objPost, token);
    props.refatch();
    navigate("/");
  };

  return (
    <>
      <Button
        cursor={"text"}
        textColor={"gray.200"}
        bgColor={"black"}
        onClick={handleOpen}
        size={"xl"}
        width={"30rem"}
        justifyContent={"flex-start"}
        _hover={{ bgColor: "black" }}
      >
        What is happening?!
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What is happening?!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleFormSubmit}>
              <Textarea
                size={"lg"}
                // type="text"
                placeholder="What's on your mind?"
                name="content"
              />
              <Input
                type="file"
                hidden
                id="addImage"
                name="image"
                onChange={preImage}
              />
              <label htmlFor="addImage">
                <MdAddPhotoAlternate size="50px" className="cursor-pointer" />
              </label>
              <Image
                maxWidth={"200px"}
                maxHeight={"200px"}
                src={pvImage}
              ></Image>
              <Flex justifyContent={"end"}>
                <Button type="submit" onClick={handleClose}>
                  Post thread
                </Button>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            {/* Tombol atau elemen lainnya di bagian footer modal */}
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Tutup
            </Button>
            {/* Tombol lainnya atau aksi lainnya di bagian footer modal */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const MiddleLayout: React.FC<payload> = () => {
  const [profile, setProfile] = useState<profile>(Object);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchProfile = async () => {
        try {
          const res = await profileData(token);
          setProfile(res);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProfile();
    }
  }, []);
  // const [thread, setThread] = React.useState<threadType[]>([]);
  const token = localStorage.getItem("token");

  const {
    data: threads,
    isLoading,
    refetch,
  } = useQuery<IThreads[]>("threads", () => threadFetch(token));

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <Box
      bg={"black"}
      width={"45%"}
      borderRight="1px"
      borderLeft={"1px"}
      borderColor="gray.200"
      sx={{
        "@media screen and (max-width: 900px)": {
          width: "100%",
        },
      }}
    >
      {isLoading && <p className="text-white">Loading...</p>}
      <Heading
        as={"h2"}
        size={"lg"}
        paddingTop={"59px"}
        paddingLeft={"45px"}
        color={"gray.200"}
      >
        Home
      </Heading>

      <Box padding={"20px"} marginBottom={"20px"}>
        <Flex gap={3} paddingLeft={"20px"}>
          <Avatar name={profile.full_name} src={profile.profile_picture} />
          <HandleFormThread refatch={refetch} />
          <MdOutlineAddPhotoAlternate
            size={33}
            className="mt-1  text-green-600"
          />
          <Button cursor={"not-allowed"} rounded={"full"} bgColor={"green.600"}>
            Post
          </Button>
        </Flex>
        {threads?.map((thread: any) => (
          <CardCustom
            key={thread.id}
            threadId={thread.id}
            mt={"10px"}
            imageUrl={thread.image_profile}
            profileName={thread.full_name}
            taggedName={`@${thread.username}`}
            postAt={thread.timeAgo}
            content={thread.content.slice(0, 200)}
            imagePost={thread.image}
            like={thread.like}
            replies={thread.replies}
            refetch={refetch}
            timeAgo={thread.timeAgo}
            isLike={thread.isLike}
          />
        ))}
      </Box>
    </Box>
  );
};
