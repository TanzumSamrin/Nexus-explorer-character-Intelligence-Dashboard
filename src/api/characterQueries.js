import {
  characterListUrl,
  characterUrl,
} from "./endpoints";

import { getJson } from "./http";



export async function fetchCharacters({
  page = 1,
  name = "",
  status = "",
  species = "",
  gender = "",
}) {
  const url = characterListUrl({
    page,
    name,
    status,
    species,
    gender,
  });

  return getJson(url);
}

export async function fetchCharacter(
  characterId
) {
  return getJson(
    characterUrl(characterId)
  );
}





export async function fetchEpisodes(
  episodeUrls
) {
  if (!episodeUrls.length) {
    return [];
  }

  const responses =
    await Promise.all(
      episodeUrls.map((url) =>
        fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch episode: ${response.status}`
            );
          }

          return response.json();
        })
      )
    );

  return responses;
}

