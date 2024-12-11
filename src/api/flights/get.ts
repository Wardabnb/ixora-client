import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetFlights(numPage: string) {
  return useQuery({
    queryKey: ["flight"],
    enabled: !!numPage,
    queryFn: async () =>
      (await axios.get("http://localhost:4000/flights?page=" + numPage)).data,
  });
}
