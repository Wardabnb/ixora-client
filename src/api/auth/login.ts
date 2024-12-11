import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Params = {
  email: string;
  password: string;
};

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: Params) => {
      const response = await axios.post(
        "http://localhost:4000/users/login",
        data
      );
      return response.data; // Données de l'utilisateur retournées après connexion réussie
    },
    onSuccess: (data) => {
      // Sauvegarder les données utilisateur dans localStorage après une connexion réussie
      localStorage.setItem("user", JSON.stringify(data.user)); // Data représente l'utilisateur
    },
    onError: (error) => {
      console.log("Login failed:", error);
    },
  });
}
