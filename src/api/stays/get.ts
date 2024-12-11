import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetStays(numPage: string) {
  return useQuery({
    queryKey: ["stays"],
    enabled: !!numPage,
    queryFn: async () =>
      (await axios.get("http://localhost:4000/stays?page=" + numPage)).data,
  });
}
