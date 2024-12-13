import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetStays() {
  return useQuery({
    queryKey: ["stays"],
    // enabled: !!numPage,
    queryFn: async () =>
      (await axios.get("http://localhost:4000/stays?page=")).data,
  });
}
