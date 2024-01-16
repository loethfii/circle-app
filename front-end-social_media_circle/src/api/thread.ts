import axios from "axios";
import { IthreadPost } from "../types/thread";
const BASE_URL_GET = "http://localhost:3000/api/v1/threads";
export const threadFetch = async (token: string | null) => {
  const response = await axios.get(BASE_URL_GET, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

const BASE_URL_POST = "http://localhost:3000/api/v1/post-thread";
export const postThread = async (
  dataPost: IthreadPost,
  token: string | null
) => {
  if (!token) {
    throw new Error("Token not available");
  }

  const formData = new FormData();
  formData.append("content", dataPost.content);
  formData.append("image", dataPost.image);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(BASE_URL_POST, formData, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const BASE_URL_LIKE_THREAD = "http://localhost:3000/api/v1/like";
export const likeThread = async (threadId: number, token: string | null) => {
  if (!token) {
    throw new Error("Token not available");
  }

  const data = { threadId };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(BASE_URL_LIKE_THREAD, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const isLikeThread = async (threadId: number, token: string | null) => {
  if (!token) {
    throw new Error("Token not available");
  }
  const BASE_URL_IsLike_Thread = `http://localhost:3000/api/v1/is-like-user-to-thread?threadId=${threadId}`;

  try {
    const response = await axios.get(BASE_URL_IsLike_Thread, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const unLikeThread = async (threadId: number, token: string | null) => {
  if (!token) {
    throw new Error("Token not available");
  }

  const Base_URL_Unlike = "http://localhost:3000/api/v1/remove-like";

  const data = { threadID: threadId };

  try {
    const response = await axios.post(Base_URL_Unlike, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const detailThread = async (threadId: number, token: string | null) => {
  if (!token) {
    throw new Error("Token not available");
  }
  const BASE_URL_DETAIL_THREAD = `http://localhost:3000/api/v1/detail-thread/${threadId}`;

  try {
    const response = await axios.get(BASE_URL_DETAIL_THREAD, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Kintillll   : ", error);
  }
};
