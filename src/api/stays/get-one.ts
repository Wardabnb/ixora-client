import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetOneStay(id: string) {
  return useQuery({
    queryKey: ["stays", id],
    enabled: !!id,
    queryFn: async () =>
      (await axios.get("http://localhost:4000/stays/" + id)).data,
  });
}
