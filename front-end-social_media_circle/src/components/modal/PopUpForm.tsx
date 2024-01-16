import React, { useState } from "react";
import { Box, FormControl, Input, Flex, Button } from "@chakra-ui/react";
import axios from "axios";

interface postForm {
  content: string;
  image: string;
  userId: number;
}

const PopUpForm: React.FC = () => {
  const [postUser, setPostUser] = useState<postForm>({
    content: "",
    image: "",
    userId: 6,
  });

  const postForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("content", postUser.content);

      const imageFile = e.currentTarget["image"].files[0];
      formData.append("image", imageFile);
      const res = await axios.post(
        "http://localhost:3000/api/v1/threads",
        formData
      );
      setPostUser(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box bg={"white"} width={"500px"} padding={5} rounded={"md"}>
      <form onSubmit={postForm}>
        <FormControl>
          <Input
            placeholder="What is Happening?"
            value={postUser.content}
            height={"200px"}
            onChange={(e) =>
              setPostUser({ ...postUser, content: e.target.value })
            }
          />
        </FormControl>
        <Flex justifyContent={"space-between"} margin={"10px"}>
          <Input
            type="file"
            value={postUser.image}
            onChange={(e) =>
              setPostUser({ ...postUser, image: e.target.value })
            }
          />
          <Button
            type="submit"
            width={"20%"}
            className="border border-gray-300 mx-auto"
          >
            Kirim
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default PopUpForm;
