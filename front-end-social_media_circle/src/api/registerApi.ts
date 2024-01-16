/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/post-user";

export const registerUser = async (userData: {
  username: string;
  full_name: string;
  email: string;
  password: string;
}) => {
  const formData = new FormData();
  formData.append("username", userData.username);
  formData.append("full_name", userData.full_name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);

  return await axios.post(BASE_URL, formData);
};

// export const usePostUser = () => {
//   const navigate = useNavigate();
//   return useMutation((userData: any) => axios.post(BASE_URL, userData), {
//     onSuccess: () => {
//       console.info("berhasil di register");
//       navigate("/login");
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//   });
// };

// export function handleErrorRegister(error: any): any {
//   return {
//     message: error,
//   };
// }
