import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Input,
  FormLabel,
  FormControl,
  Avatar,
} from "@chakra-ui/react";

import { profile } from "../../types/profilePic";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { token } from "../../types/token";
import {
  editProfile,
  profileData,
  updateProfileImage,
} from "../../api/profile";
const ButtonEditProfile: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery<profile>("profile", () => profileData(token));

  useEffect(() => {
    if (data) {
      setUserName(data.username);
      setFullName(data.full_name);
      setProfileDescription(data.profile_description);
    }
  }, [data]);
  const { mutate } = useMutation(editProfile);
  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData = {
      token: token,
      newData: {
        username: userName,
        full_name: fullName,
        profile_description: profileDescription,
      },
    };

    mutate(updateData);
    onClose();
  };
  return (
    <>
      <Button
        size={"lg"}
        width={"100px"}
        rounded={"full"}
        mt={5}
        fontSize={16}
        colorScheme="gray"
        variant="outline"
        textColor={"gray.200"}
        _hover={{ bg: "#fff", textColor: "black" }}
        onClick={onOpen}
      >
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} size={"3xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdateProfile}>
              <FormControl marginBottom={5}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  placeholder="Basic usage"
                  value={userName}
                  height={"50px"}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>
              <FormControl marginBottom={5}>
                <FormLabel htmlFor="fn">Full Name</FormLabel>
                <Input
                  placeholder="Basic usage"
                  value={fullName}
                  id="fn"
                  height={"50px"}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>
              <FormControl marginBottom={5}>
                <FormLabel htmlFor="pd">Profile Description</FormLabel>
                <Input
                  placeholder="Basic usage"
                  value={profileDescription}
                  id="pd"
                  height={"50px"}
                  onChange={(e) => setProfileDescription(e.target.value)}
                />
              </FormControl>
              <Flex justifyContent={"end"} marginBottom={5}>
                <Button
                  colorScheme="blue"
                  width={"140px"}
                  mr={3}
                  onClick={onClose}
                  type="submit"
                >
                  Confirm
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

// const ModalChangeImage = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   return (
//     <>
//       <Button onClick={onOpen}>Open Modal</Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Modal Title</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <h1>Hello world</h1>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={onClose}>
//               Close
//             </Button>
//             <Button variant="ghost">Secondary Action</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

const ProfileCard: React.FC<profile> = (props) => {
  // const [imageFile, setImageFile] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = useMutation(updateProfileImage);
  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const fileImage = (e.target as HTMLFormElement).profile_picture.files[0];
    // const formData = new FormData(e.currentTarget);

    const updateData = {
      token: token,
      // profile_picture: formData.get("profile_picture"),
      profile_picture: (e.target as HTMLFormElement).profile_picture.files[0],
    };

    mutate(updateData);
    onClose();
  };

  return (
    <Box
      padding={5}
      bg={"#262626"}
      width={"400px"}
      className="rounded"
      position={"relative"}
    >
      <Text color={"gray.200"} fontSize={18} fontWeight={"bold"}>
        MY Profile
      </Text>

      <Box mt={3} height={"110px"} overflow={"hidden"} rounded={"10px"}>
        <Image src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></Image>
      </Box>
      <Avatar
        src={props.profile_picture}
        boxSize={"70px"}
        borderRadius={"full"}
        position={"absolute"}
        top={"130px"}
        left={"10"}
        zIndex={1000}
        name={props.full_name}
        onClick={onOpen}
        cursor="pointer"
      />
      <Flex justify={"end"}>
        <ButtonEditProfile />
      </Flex>
      <Text color="gray.200" fontSize={20}>
        {props.full_name}
      </Text>
      <Text color="gray.500" fontSize={15}>
        @{props.username}
      </Text>
      <Text fontSize={17} color="gray.200">
        {props.profile_description}
      </Text>

      <Text textColor={"gray.200"} fontSize={15}>
        <Link to={"/list-follow?d=flw"}>
          {props.following + " "}
          <Text as="span" textColor={"gray.500"}>
            Following
          </Text>
        </Link>{" "}
        <Link to={"/list-follow?d=flr"}>
          {props.followers}{" "}
          <Text as="span" textColor={"gray.500"}>
            Followers
          </Text>
        </Link>
      </Text>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdateProfile}>
              <FormControl>
                <Flex justifyContent={"center"}>
                  <FormLabel htmlFor="ui" cursor={"pointer"}>
                    <Box
                      width={"100px"}
                      height={"100px"}
                      bgColor={"gray.300"}
                      rounded={"full"}
                    >
                      <Text paddingTop={"36%"} textAlign={"center"}>
                        Pilih Gambar
                      </Text>
                    </Box>
                  </FormLabel>
                </Flex>

                <Input
                  placeholder="Basic usage"
                  id="ui"
                  height={"50px"}
                  type={"file"}
                  name="profile_picture"
                  hidden
                />
              </FormControl>
              <Flex justifyContent={"center"} marginY={5}>
                <Button
                  colorScheme="blue"
                  width={"140px"}
                  mr={3}
                  onClick={onClose}
                  type="submit"
                >
                  Confirm
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileCard;
