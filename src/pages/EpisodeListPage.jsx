import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

const API_BASE_URL =
  "https://rickandmortyapi.com/api";

// [REQ-7] Episodes deliberately uses the Promise API.
// Unlike Characters, React Query does not provide caching,
// loading, error, retry, pagination and request cleanup
// automatically here, so they are implemented manually.

function EpisodeListPage() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const pageParam =
    Number(
      searchParams.get("page")
    ) || 1;

  const [
    episodes,
    setEpisodes,
  ] = useState([]);

  const [
    info,
    setInfo,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const [
    hasLoaded,
    setHasLoaded,
  ] = useState(false);

  useEffect(() => {
    // [REQ-6] Real dependency-array useEffect.
    // [REQ-7] Promise-based .then/.catch/.finally.
    // AbortController prevents an old request from
    // updating state after the page changes.

    const controller =
      new AbortController();

    setLoading(true);
    setError(null);

    fetch(
      `${API_BASE_URL}/episode?page=${pageParam}`,
      {
        signal:
          controller.signal,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load episodes (${response.status})`
          );
        }

        return response.json();
      })
      .then((data) => {
        setEpisodes(
          data.results || []
        );

        setInfo(
          data.info || null
        );

        setHasLoaded(true);
      })
      .catch((fetchError) => {
        if (
          fetchError.name ===
          "AbortError"
        ) {
          return;
        }

        setError(
          fetchError
        );

        setEpisodes([]);
        setInfo(null);
      })
      .finally(() => {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [pageParam]);

  function goToPage(
    nextPage
  ) {
    if (
      !info ||
      nextPage < 1 ||
      nextPage > info.pages
    ) {
      return;
    }

    setSearchParams({
      page: String(nextPage),
    });
  }

  function handlePrevious() {
    goToPage(
      pageParam - 1
    );
  }

  function handleNext() {
    goToPage(
      pageParam + 1
    );
  }

  function handleRetry() {
    setSearchParams({
      page: String(pageParam),
    });
  }

  if (
    loading &&
    !hasLoaded
  ) {
    return (
      <section className="page">
        <PageHeader />

        <EpisodeSkeleton />
      </section>
    );
  }

  if (
    error &&
    !episodes.length
  ) {
    return (
      <section className="page">
        <PageHeader />

        <div className="error-state">
          <h2>
            Unable to load episodes
          </h2>

          <p>
            Something went wrong
            while loading the
            episode list.
          </p>

          <button
            type="button"
            onClick={
              handleRetry
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
      <PageHeader />

      {loading && (
        <div
          className="refetching-badge"
          role="status"
        >
          Refetching…
        </div>
      )}

      {error && (
        <div
          className="error-banner"
          role="alert"
        >
          <span>
            Unable to refresh this
            page.
          </span>

          <button
            type="button"
            onClick={
              handleRetry
            }
          >
            Retry
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        episodes.length ===
          0 && (
          <div className="empty-state">
            <h2>
              No episodes found
            </h2>

            <p>
              There are no episodes
              available for this
              page.
            </p>
          </div>
        )}

      {episodes.length > 0 && (
        <>
          <div className="episode-list">
            {episodes.map(
              (episode) => (
                <article
                  className="episode-card"
                  key={episode.id}
                >
                  <div className="episode-card-main">
                    <span className="episode-code">
                      {episode.episode}
                    </span>

                    <h2>
                      {episode.name}
                    </h2>

                    <p>
                      Air date:{" "}
                      {
                        episode.air_date
                      }
                    </p>
                  </div>

                  <div className="episode-card-number">
                    #{episode.id}
                  </div>
                </article>
              )
            )}
          </div>

          <EpisodePagination
            currentPage={
              pageParam
            }
            totalPages={
              info?.pages || 1
            }
            onPrevious={
              handlePrevious
            }
            onNext={
              handleNext
            }
          />
        </>
      )}
    </section>
  );
}

function PageHeader() {
  return (
    <header className="page-header">
      <div>
        <h1>
          Episodes
        </h1>

        <p>
          Browse all episodes from
          the Rick and Morty
          universe.
        </p>
      </div>
    </header>
  );
}

function EpisodePagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  const isFirstPage =
    currentPage === 1;

  const isLastPage =
    currentPage === totalPages;

  return (
    <nav
      className="pagination"
      aria-label="Episode pagination"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstPage}
        className="pagination-button"
      >
        ← Previous
      </button>

      <span className="pagination-info">
        Page {currentPage} of{" "}
        {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={isLastPage}
        className="pagination-button"
      >
        Next →
      </button>
    </nav>
  );
}

function EpisodeSkeleton() {
  return (
    <div className="episode-list">
      {Array.from({
        length: 8,
      }).map((_, index) => (
        <div
          className="episode-card"
          key={index}
        >
          <div>
            <div className="skeleton-line small" />
            <div className="skeleton-line large" />
            <div className="skeleton-line" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EpisodeListPage;