import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetOneFlight(id: string) {
  return useQuery({
    queryKey: ["flights", id],
    enabled: !!id,
    queryFn: async () =>
      (await axios.get("http://localhost:4000/flights/" + id)).data,
  });
}
