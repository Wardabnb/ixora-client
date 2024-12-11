import { useMutation } from "@tanstack/react-query";
import axios from "axios";
type Params = {
  name: string;
  email: string;
  password: string;
};
export function useSignup() {
  return useMutation({
    mutationKey: ["signup"],
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
    },
    mutationFn: async (data: Params) =>
      (await axios.post("http://localhost:4000/users/signup", data)).data,
  });
}
