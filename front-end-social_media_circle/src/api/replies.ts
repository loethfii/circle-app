import axios from "axios";
import { postAReplies } from "../types/replies";

export const RepliesThreadList = async (threadId: number, token: string) => {
  if (!token) {
    throw new Error("Token not available");
  }

  const BASE_URL_REPLIES_THREAD = `http://localhost:3000/api/v1/replies?threadId=${threadId}`;

  try {
    const response = await axios.get(BASE_URL_REPLIES_THREAD, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const posReplies = async (newData: postAReplies, token: string) => {
  if (!token) {
    throw new Error("Token not available");
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/post-replies",
      {
        content: newData.content,
        threadId: newData.threadId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
