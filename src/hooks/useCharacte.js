import { useQuery } from "@tanstack/react-query";

import {
  fetchCharacter,
} from "../api/characterQueries";

function useCharacter(id) {
  return useQuery({
    queryKey: [
      "character",
      Number(id),
    ],

    queryFn: () =>
      fetchCharacter(id),

    enabled: Boolean(id),
  });
}

export default useCharacter;