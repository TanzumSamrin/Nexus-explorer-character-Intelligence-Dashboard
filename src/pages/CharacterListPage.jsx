import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import CharacterCard from "../components/characters/CharacterCard";
import Pagination from "../components/ui/Pagination";

import ErrorBoundary from "../components/error/ErrorBoundary";

import useCharacters from "../hooks/useCharacters";
import useExpensiveCache from "../hooks/useExpensiveCache";


const STATUS_OPTIONS = [
  "Alive",
  "Dead",
  "unknown",
];

const SPECIES_OPTIONS = [
  "Human",
  "Alien",
  "Humanoid",
  "Animal",
  "Robot",
  "Cronenberg",
  "Mythological Creature",
  "Disease",
  "Poopybutthole",
  "Unknown",
];

const GENDER_OPTIONS = [
  "Female",
  "Male",
  "Genderless",
  "unknown",
];


function CharacterListPage() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const page = Math.max(
    1,
    Number(
      searchParams.get("page") || 1
    )
  );

  const filters = {
    name:
      searchParams.get("search") || "",

    status:
      searchParams.get("status") || "",

    species:
      searchParams.get("species") || "",

    gender:
      searchParams.get("gender") || "",
  };

  const [
    searchInput,
    setSearchInput,
  ] = useState(filters.name);

  // [REQ-2] useRef persists the debounce
  // timer without triggering a render.
  const debounceTimerRef =
    useRef(null);

  // [REQ-1] useRef gives direct access to
  // the search input DOM element.
  const searchInputRef =
    useRef(null);

  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useCharacters({
    page,
    name: filters.name,
    status: filters.status,
    species: filters.species,
    gender: filters.gender,
  });

  /*
   * [REQ-6] Real dependency-list useEffect.
   * The input is synchronized when the URL changes,
   * including browser Back/Forward navigation.
   */
  useEffect(() => {
    setSearchInput(filters.name);
  }, [filters.name]);

  /*
   * [REQ-2] 400ms search debounce using useRef.
   */
  useEffect(() => {
    clearTimeout(
      debounceTimerRef.current
    );

    debounceTimerRef.current =
      setTimeout(() => {
        const trimmedValue =
          searchInput.trim();

        const nextParams =
          new URLSearchParams(
            searchParams
          );

        if (trimmedValue) {
          nextParams.set(
            "search",
            trimmedValue
          );
        } else {
          nextParams.delete("search");
        }

        nextParams.set(
          "page",
          "1"
        );

        setSearchParams(
          nextParams
        );
      }, 400);

    return () => {
      clearTimeout(
        debounceTimerRef.current
      );
    };
  }, [
    searchInput,
    searchParams,
    setSearchParams,
  ]);

  /*
   * [REQ-1] Ctrl/Cmd + K focuses the search
   * input through a DOM ref.
   */
  useEffect(() => {
    function handleShortcut(event) {
      const isMac =
        navigator.platform
          .toLowerCase()
          .includes("mac");

      const modifierKey = isMac
        ? event.metaKey
        : event.ctrlKey;

      if (
        modifierKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        searchInputRef.current?.focus();
      }
    }

    window.addEventListener(
      "keydown",
      handleShortcut
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleShortcut
      );
    };
  }, []);

  function handleSearchChange(event) {
    setSearchInput(
      event.target.value
    );
  }

  function updateFilter(
    name,
    value
  ) {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    if (value) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }

    // Changing any filter resets page to 1.
    nextParams.set(
      "page",
      "1"
    );

    setSearchParams(
      nextParams
    );
  }

  function handleStatusChange(
    status
  ) {
    updateFilter(
      "status",
      status
    );
  }

  function handleSelectChange(
    event
  ) {
    updateFilter(
      event.target.name,
      event.target.value
    );
  }

  function handlePageChange(
    nextPage
  ) {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.set(
      "page",
      String(nextPage)
    );

    setSearchParams(
      nextParams
    );
  }

  const characters =
    data?.results || [];

  const totalPages =
    data?.info?.pages || 1;

  /*
   * [REQ-3] Cache the expensive derived
   * character grouping/sorting operation.
   *
   * The computation groups the current
   * character dataset by species and sorts
   * every group alphabetically.
   */
  const {
    value: groupedCharacters,
    hits: cacheHits,
    misses: cacheMisses,
    cacheSize,
  } = useExpensiveCache(
    characters,
    (items) => {
      const groups = {};

      items.forEach(
        (character) => {
          const species =
            character.species ||
            "Unknown";

          if (!groups[species]) {
            groups[species] = [];
          }

          groups[species] = [
            ...groups[species],
            character,
          ];
        }
      );

      Object.keys(groups).forEach(
        (species) => {
          groups[species] = [
            ...groups[species],
          ].sort((a, b) =>
            a.name.localeCompare(
              b.name
            )
          );
        }
      );

      return groups;
    },
    characters
      .map(
        (character) =>
          character.id
      )
      .join(",")
  );

  const hasCachedData =
    Boolean(data);

  if (
    isPending &&
    !hasCachedData
  ) {
    return (
      <section className="page">
        <h1>Characters</h1>

        <CharacterSkeletonGrid />
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Characters</h1>

          <p>
            Browse and filter the
            Rick and Morty character
            database.
          </p>
        </div>
      </div>

      <CharacterFilters
        searchInput={searchInput}
        searchInputRef={
          searchInputRef
        }
        onSearchChange={
          handleSearchChange
        }
        filters={filters}
        onStatusChange={
          handleStatusChange
        }
        onSelectChange={
          handleSelectChange
        }
      />

      {isError &&
        error?.status === 404 && (
          <div className="empty-state">
            <h2>
              No characters found
            </h2>

            <p>
              Try changing your
              search or filters.
            </p>
          </div>
        )}

      {isError &&
        error?.status !== 404 &&
        !hasCachedData && (
          <div className="error-state">
            <h2>
              Something went wrong
            </h2>

            <p>
              We could not load the
              characters.
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
        )}

      {hasCachedData && (
        <>
          {!navigator.onLine && (
            <div className="offline-banner">
              You are offline. Showing
              cached data.
            </div>
          )}

          <div className="results-header">
          <div>
            <h2>
              Results
            </h2>

            <p>
              {data.info.count}{" "}
              characters
            </p>
          </div>

          <div className="cache-debug-panel">
            <span>
              Cache hits: {cacheHits}
            </span>

            <span>
              Cache misses: {cacheMisses}
            </span>

            <span>
              Cached keys: {cacheSize}
            </span>

            <span>
              Species groups:{" "}
              {Object.keys(
                groupedCharacters
              ).length}
            </span>
          </div>

          {isFetching && (
            <span className="refetching-badge">
              Refetching…
            </span>
          )}
        </div>

          {/* 
            [REQ-22]
            Characters panel has its own ErrorBoundary.
            If a character card crashes, the entire
            application should not become blank.
          */}
          <ErrorBoundary>
            <div className="character-grid">
              {characters.map(
                (character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                  />
                )
              )}
            </div>
          </ErrorBoundary>

          <Pagination
            page={page}
            totalPages={totalPages}
            filters={filters}
            onPageChange={
              handlePageChange
            }
            isFetching={isFetching}
          />
        </>
      )}
    </section>
  );
}


function CharacterFilters({
  searchInput,
  searchInputRef,
  onSearchChange,
  filters,
  onStatusChange,
  onSelectChange,
}) {
  return (
    <div className="character-filters">
      <div className="search-control">
        <label htmlFor="character-search">
          Search characters
        </label>

        <input
          ref={searchInputRef}
          id="character-search"
          type="search"
          value={searchInput}
          onChange={onSearchChange}
          placeholder="Search by name..."
        />

        <small>
          Ctrl + K
        </small>
      </div>

      <div className="status-filters">
        <span className="filter-label">
          Status
        </span>

        <div className="status-chips">
          <button
            type="button"
            className={
              filters.status === ""
                ? "filter-chip active"
                : "filter-chip"
            }
            onClick={() =>
              onStatusChange("")
            }
          >
            All
          </button>

          {STATUS_OPTIONS.map(
            (status) => (
              <button
                key={status}
                type="button"
                className={
                  filters.status ===
                  status
                    ? "filter-chip active"
                    : "filter-chip"
                }
                onClick={() =>
                  onStatusChange(
                    status
                  )
                }
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      <div className="filter-selects">
        <label>
          Species

          <select
            name="species"
            value={filters.species}
            onChange={
              onSelectChange
            }
          >
            <option value="">
              All species
            </option>

            {SPECIES_OPTIONS.map(
              (species) => (
                <option
                  key={species}
                  value={species}
                >
                  {species}
                </option>
              )
            )}
          </select>
        </label>

        <label>
          Gender

          <select
            name="gender"
            value={filters.gender}
            onChange={
              onSelectChange
            }
          >
            <option value="">
              All genders
            </option>

            {GENDER_OPTIONS.map(
              (gender) => (
                <option
                  key={gender}
                  value={gender}
                >
                  {gender}
                </option>
              )
            )}
          </select>
        </label>
      </div>
    </div>
  );
}


function CharacterSkeletonGrid() {
  return (
    <div className="character-grid">
      {Array.from({
        length: 20,
      }).map((_, index) => (
        <div
          className="character-skeleton"
          key={index}
        >
          <div className="skeleton-image" />

          <div className="skeleton-line large" />

          <div className="skeleton-line" />

          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  );
}


export default CharacterListPage;