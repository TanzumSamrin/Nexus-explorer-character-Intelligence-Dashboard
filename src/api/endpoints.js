// The Rick and Morty API base URL
export const BASE_URL = "https://rickandmortyapi.com/api";

// Character filter options
export const STATUS_OPTIONS = ["alive", "dead", "unknown"];

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

// Character list URL
export const characterListUrl = (params = {}) =>
  `${BASE_URL}/character?${new URLSearchParams(params).toString()}`;

// Single character URL
export const characterUrl = (id) =>
  `${BASE_URL}/character/${id}`;

// Multiple characters URL
export const charactersUrl = (ids) =>
  `${BASE_URL}/character/${ids.join(",")}`;

// Multiple episodes URL
export const episodesUrl = (ids) =>
  `${BASE_URL}/episode/${ids.join(",")}`;

// Episode list URL
export const episodeListUrl = (page = 1) =>
  `${BASE_URL}/episode?page=${page}`;

// Location list URL
export const locationListUrl = (page = 1) =>
  `${BASE_URL}/location?page=${page}`;