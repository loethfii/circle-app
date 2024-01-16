/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const profileData = async (token: string) => {
  const response = await axios.get("http://localhost:3000/api/v1/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const profileUpdate = async (token: string) => {
  if (!token) {
    throw new Error("Token not available");
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

export const editProfile = (data: { token: string; newData: any }) => {
  if (!data.token) {
    throw new Error("Token not available");
  }

  return axios.put(
    "http://localhost:3000/api/v1/update-profile",
    data.newData,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
};

export const updateProfileImage = (data: {
  token: string;
  profile_picture: File | null;
}) => {
  if (!data.token) {
    throw new Error("Token not available");
  }
  const formData = new FormData();
  formData.append("profile_picture", data.profile_picture || "");

  return axios
    .put("http://localhost:3000/api/v1/update-foto", formData, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .catch((error) => {
      throw new Error(`Failed to update profile image: ${error}`);
    });
};

export const searchData = async (data: {
  token: string;
  searchData: string;
}) => {
  if (!data.token) {
    throw new Error("Token not available");
  }
  try {
    const searchQuery =
      data.searchData === ""
        ? "?searchData="
        : `?searchData=${encodeURIComponent(data.searchData)}`;
    const response = await axios.get(
      `http://localhost:3000/api/v1/search-user${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to search data: ${error}`);
  }
};
