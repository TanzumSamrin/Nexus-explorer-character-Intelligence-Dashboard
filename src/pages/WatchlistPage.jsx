import {
  useMemo,
} from "react";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  charactersUrl,
} from "../api/endpoints";

import {
  useWatchlist,
} from "../contexts/watchlist/useWatchlist";

import CharacterCard from "../components/characters/CharacterCard";

function WatchlistPage() {
  const {
    ids,
  } = useWatchlist();

  const uniqueIds =
    useMemo(
      () => [...new Set(ids)],
      [ids]
    );

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "watchlist",
      uniqueIds,
    ],
    queryFn: async () => {
      if (
        uniqueIds.length === 0
      ) {
        return [];
      }

      const response =
        await fetch(
          charactersUrl(
            uniqueIds
          )
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load watchlist characters."
        );
      }

      const result =
        await response.json();

      return Array.isArray(
        result
      )
        ? result
        : [result];
    },
    enabled:
      uniqueIds.length > 0,
  });

  if (
    uniqueIds.length === 0
  ) {
    return (
      <section className="page">
        <header className="page-header">
          <div>
            <h1>
              Watchlist
            </h1>

            <p>
              Your saved characters
            </p>
          </div>
        </header>

        <div className="empty-state">
          <h2>
            Your watchlist is empty
          </h2>

          <p>
            Open any character and
            press ★ to save it here.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="page">
        <header className="page-header">
          <div>
            <h1>
              Watchlist
            </h1>
          </div>
        </header>

        <div className="loading-state">
          Loading your watchlist…
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="page">
        <header className="page-header">
          <div>
            <h1>
              Watchlist
            </h1>
          </div>
        </header>

        <div className="error-state">
          <h2>
            Unable to load watchlist
          </h2>

          <p>
            {error?.message ||
              "Something went wrong."}
          </p>

          <button
            type="button"
            onClick={() =>
              refetch()
            }
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>
            Watchlist
          </h1>

          <p>
            {data?.length || 0} saved
            character
            {data?.length === 1
              ? ""
              : "s"}
          </p>
        </div>
      </header>

      <div className="character-grid">
        {data?.map(
          (character) => (
            <CharacterCard
              key={character.id}
              character={character}
            />
          )
        )}
      </div>
    </section>
  );
}

export default WatchlistPage;