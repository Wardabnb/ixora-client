import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetRelatedFlights() {
  return useQuery({
    queryKey: ["relatedFlight"],
    queryFn: async () =>
      (await axios.get("http://localhost:4000/flights/related/latest")).data,
  });
}
