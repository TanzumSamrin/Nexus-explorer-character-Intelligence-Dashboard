import {
  useMemo,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  fetchCharacter,
} from "../api/characterQueries";

function ComparePage() {
  const navigate =
    useNavigate();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const firstId =
    searchParams.get("a");

  const secondId =
    searchParams.get("b");

  const firstCharacterQuery =
    useQuery({
      queryKey: [
        "character",
        firstId,
      ],

      queryFn: () =>
        fetchCharacter(firstId),

      enabled:
        Boolean(firstId),
    });

  const secondCharacterQuery =
    useQuery({
      queryKey: [
        "character",
        secondId,
      ],

      queryFn: () =>
        fetchCharacter(secondId),

      enabled:
        Boolean(secondId),
    });

  const firstCharacter =
    firstCharacterQuery.data;

  const secondCharacter =
    secondCharacterQuery.data;

  const isLoading =
    firstCharacterQuery.isLoading ||
    secondCharacterQuery.isLoading;

  const hasError =
    firstCharacterQuery.isError ||
    secondCharacterQuery.isError;

  function handleBack() {
    navigate(-1);
  }

  function handleCharacterChange(
    key,
    value
  ) {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    if (value) {
      nextParams.set(
        key,
        value
      );
    } else {
      nextParams.delete(key);
    }

    setSearchParams(
      nextParams
    );
  }

  if (
    !firstId ||
    !secondId
  ) {
    return (
      <section className="page">
        <div className="page-header">
          <div>
            <h1>
              Compare
            </h1>

            <p>
              Select two characters
              to compare.
            </p>
          </div>
        </div>

        <div className="empty-state">
          <h2>
            Two characters are
            required
          </h2>

          <p>
            Open a comparison URL
            like /compare?a=1&b=2.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="page">
        <div className="page-header">
          <div>
            <h1>
              Compare
            </h1>

            <p>
              Loading characters...
            </p>
          </div>
        </div>

        <div className="loading-state">
          Loading comparison...
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className="page">
        <div className="page-header">
          <div>
            <h1>
              Compare
            </h1>
          </div>
        </div>

        <div className="error-state">
          <h2>
            Unable to load
            characters
          </h2>

          <p>
            One or both character
            IDs could not be loaded.
          </p>

          <button
            type="button"
            onClick={() => {
              firstCharacterQuery.refetch();
              secondCharacterQuery.refetch();
            }}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="detail-toolbar">
        <button
          type="button"
          className="back-button"
          onClick={handleBack}
        >
          ← Back
        </button>
      </div>

      <header className="page-header">
        <div>
          <h1>
            Compare
          </h1>

          <p>
            Compare two characters
            side by side.
          </p>
        </div>
      </header>

      <div className="compare-controls">
        <label>
          Character A

          <input
            type="number"
            min="1"
            value={firstId}
            onChange={(event) =>
              handleCharacterChange(
                "a",
                event.target.value
              )
            }
          />
        </label>

        <label>
          Character B

          <input
            type="number"
            min="1"
            value={secondId}
            onChange={(event) =>
              handleCharacterChange(
                "b",
                event.target.value
              )
            }
          />
        </label>
      </div>

      <div className="compare-grid">
        <CharacterComparisonCard
          character={
            firstCharacter
          }
        />

        <CharacterComparisonCard
          character={
            secondCharacter
          }
        />
      </div>

      <ComparisonTable
        firstCharacter={
          firstCharacter
        }
        secondCharacter={
          secondCharacter
        }
      />
    </section>
  );
}

function CharacterComparisonCard({
  character,
}) {
  return (
    <article className="compare-card">
      <img
        src={character.image}
        alt={character.name}
        className="compare-card-image"
      />

      <div className="compare-card-content">
        <h2>
          {character.name}
        </h2>

        <span
          className={`status-badge ${
            character.status
              .toLowerCase() ===
            "alive"
              ? "status-alive"
              : character.status
                  .toLowerCase() ===
                "dead"
              ? "status-dead"
              : "status-unknown"
          }`}
        >
          {character.status}
        </span>
      </div>
    </article>
  );
}

function ComparisonTable({
  firstCharacter,
  secondCharacter,
}) {
  const rows = useMemo(
    () => [
      {
        label: "Status",
        first:
          firstCharacter.status,
        second:
          secondCharacter.status,
      },
      {
        label: "Species",
        first:
          firstCharacter.species,
        second:
          secondCharacter.species,
      },
      {
        label: "Gender",
        first:
          firstCharacter.gender,
        second:
          secondCharacter.gender,
      },
      {
        label: "Origin",
        first:
          firstCharacter.origin
            ?.name,
        second:
          secondCharacter.origin
            ?.name,
      },
      {
        label: "Episode Count",
        first:
          firstCharacter.episode
            ?.length || 0,
        second:
          secondCharacter.episode
            ?.length || 0,
      },
    ],
    [
      firstCharacter,
      secondCharacter,
    ]
  );

  return (
    <section className="comparison-section">
      <h2>
        Comparison
      </h2>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>
                Property
              </th>

              <th>
                {firstCharacter.name}
              </th>

              <th>
                {secondCharacter.name}
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (row) => (
                <tr
                  key={row.label}
                >
                  <th>
                    {row.label}
                  </th>

                  <td>
                    {row.first ||
                      "Unknown"}
                  </td>

                  <td>
                    {row.second ||
                      "Unknown"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ComparePage;
