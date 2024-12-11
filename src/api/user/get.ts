import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export function useGetUser() {
  const searchParams = useSearchParams(); // Récupère les paramètres de l'URL

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const userId = searchParams.get("userId"); // Obtient le paramètre "userId"
      console.log("userId", userId);

      if (!userId) {
        throw new Error("User ID is missing");
      }

      const response = await axios.get(`http://localhost:4000/users/${userId}`);
      console.log("response", response);

      localStorage.setItem("user", JSON.stringify(response));
      return response.data; // Retourne les données de l'API
    },
  });
}
