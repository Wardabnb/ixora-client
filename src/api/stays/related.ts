import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetRelatedStay() {
  return useQuery({
    queryKey: ["relatedStay"],
    queryFn: async () =>
      (await axios.get("http://localhost:4000/stays/related/latest")).data,
  });
}
