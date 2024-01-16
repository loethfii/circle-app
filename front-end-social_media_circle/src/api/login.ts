import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/login";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await axios.post(BASE_URL, { email, password });
};
