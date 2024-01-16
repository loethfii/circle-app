import axios from "axios";

export const sugestedUser = async (token: string) => {
  if (!token) {
    console.error("Token not available");
  }

  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/sugested-user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// export const isFollowByYou = async (
//   anotherAccountId: number,
//   token: string
// ) => {
//   if (!token) {
//     console.error("Token not available");
//   }

//   const BASE_URL = `http://localhost:3000/api/v1/is-follow-by-you?anotherAcountId=${anotherAccountId}`;

//   try {
//     const response = await axios.get(BASE_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const followOneUser = async (userId: number, token: string) => {
  if (!token) {
    console.error("Token not available");
    return Promise.reject(new Error("Token not available"));
  }

  return axios
    .post(
      "http://localhost:3000/api/v1/follow",
      {
        anotherAccount: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const unFollowUser = async (userId: number, token: string) => {
  if (!token) {
    console.error("Token not available");
    return Promise.reject(new Error("Token not available"));
  }

  try {
    const response = await axios.delete(
      "http://localhost:3000/api/v1/unfollow",
      {
        data: {
          anotherAccount: userId,
        },
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

export const getFollower = async (token: string) => {
  if (!token) {
    console.error("Token not available");
    return Promise.reject(new Error("Token not available"));
  }

  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/list-follower",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFollowing = async (token: string) => {
  if (!token) {
    console.error("Token not available");
    return Promise.reject(new Error("Token not available"));
  }

  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/list-following",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const idUserFollowing = async (token: string) => {
  if (!token) {
    console.error("Token not available");
    return Promise.reject(new Error("Token not available"));
  }

  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/list-id-user-has-follow",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
