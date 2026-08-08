export const BASE_URL =
  "https://rickandmortyapi.com/api";

export const STATUS_OPTIONS = [
  "alive",
  "dead",
  "unknown",
];

export const GENDER_OPTIONS = [
  "female",
  "male",
  "genderless",
  "unknown",
];

export const SPECIES_OPTIONS = [
  "Human",
  "Alien",
  "Humanoid",
  "Robot",
  "Animal",
  "Mythological Creature",
  "Poopybutthole",
  "Cronenberg",
  "Disease",
];

export const characterListUrl = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        searchParams.set(key, value);
      }
    }
  );

  return `${BASE_URL}/character?${searchParams.toString()}`;
};

export const characterUrl = (id) =>
  `${BASE_URL}/character/${id}`;

export const charactersUrl = (ids) =>
  `${BASE_URL}/character/${ids.join(",")}`;

export const episodesUrl = (ids) =>
  `${BASE_URL}/episode/${ids.join(",")}`;

export const episodeListUrl = (page = 1) =>
  `${BASE_URL}/episode?page=${page}`;

export const locationListUrl = (page = 1) =>
  `${BASE_URL}/location?page=${page}`;