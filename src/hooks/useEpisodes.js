import { useQuery } from "@tanstack/react-query";

import {
  fetchEpisodes,
} from "../api/characterQueries";

function useEpisodes(
  episodeUrls = []
) {
  return useQuery({
    queryKey: [
      "episodes",
      episodeUrls,
    ],

    queryFn: () =>
      fetchEpisodes(episodeUrls),

    enabled:
      episodeUrls.length > 0,

    staleTime:
      5 * 60 * 1000,
  });
}

export default useEpisodes;