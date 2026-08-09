import { memo } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import WatchlistButton from "../watchlist/WatchlistButton";

import {
  fetchCharacter,
} from "../../api/characterQueries";

function CharacterCard({ character }) {
  const queryClient = useQueryClient();

  function handleMouseEnter() {
    queryClient.prefetchQuery({
      queryKey: [
        "character",
        character.id,
      ],

      queryFn: () =>
        fetchCharacter(character.id),
    });
  }

  function getStatusClass(status) {
    const normalizedStatus =
      status.toLowerCase();

    if (normalizedStatus === "alive") {
      return "status-badge status-alive";
    }

    if (normalizedStatus === "dead") {
      return "status-badge status-dead";
    }

    return "status-badge status-unknown";
  }

  return (
    <article
      className="character-card"
      onMouseEnter={handleMouseEnter}
    >
      <div className="character-card-image">
        <img
          src={character.image}
          alt={character.name}
          loading="lazy"
        />
      </div>

      <div className="character-card-body">
        <div className="character-card-header">
          <h3>{character.name}</h3>

          <span
            className={getStatusClass(
              character.status
            )}
          >
            {character.status}
          </span>
        </div>

        <p>
          <strong>Species:</strong>{" "}
          {character.species}
        </p>

        <p>
          <strong>Gender:</strong>{" "}
          {character.gender}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {character.location?.name}
        </p>

        {/* Watchlist Button */}
        <div className="character-card-watchlist">
          <WatchlistButton
            characterId={character.id}
          />
        </div>

        <Link
          to={`/characters/${character.id}`}
          className="character-details-link"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}

export default memo(CharacterCard);