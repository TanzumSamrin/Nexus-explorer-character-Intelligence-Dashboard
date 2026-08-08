import { useQuery } from "@tanstack/react-query";

import { fetchCharacters } from "../api/characterQueries";

function useCharacters({
  page = 1,
  name = "",
  status = "",
  species = "",
  gender = "",
} = {}) {
  return useQuery({
    queryKey: [
      "characters",
      {
        page,
        name,
        status,
        species,
        gender,
      },
    ],

    queryFn: () =>
      fetchCharacters({
        page,
        name,
        status,
        species,
        gender,
      }),

    placeholderData: (
      previousData
    ) => previousData,
  });
}

export default useCharacters;




