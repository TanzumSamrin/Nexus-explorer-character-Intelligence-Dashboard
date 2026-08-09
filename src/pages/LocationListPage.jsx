import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

const API_BASE_URL =
  "https://rickandmortyapi.com/api";

function LocationListPage() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const pageParam =
    Number(
      searchParams.get("page")
    ) || 1;

  const [
    locations,
    setLocations,
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
    const controller =
      new AbortController();

    async function loadLocations() {
      setLoading(true);
      setError(null);

      try {
        const response =
          await fetch(
            `${API_BASE_URL}/location?page=${pageParam}`,
            {
              signal:
                controller.signal,
            }
          );

        if (!response.ok) {
          throw new Error(
            `Failed to load locations (${response.status})`
          );
        }

        const data =
          await response.json();

        setLocations(
          data.results || []
        );

        setInfo(
          data.info || null
        );

        setHasLoaded(true);
      } catch (
        fetchError
      ) {
        if (
          fetchError.name ===
          "AbortError"
        ) {
          return;
        }

        setError(
          fetchError
        );

        setLocations([]);
        setInfo(null);
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }

    loadLocations();

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
        <LocationHeader />

        <LocationSkeleton />
      </section>
    );
  }

  if (
    error &&
    locations.length === 0
  ) {
    return (
      <section className="page">
        <LocationHeader />

        <div className="error-state">
          <h2>
            Unable to load locations
          </h2>

          <p>
            Something went wrong
            while loading the
            location list.
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
      <LocationHeader />

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
        locations.length ===
          0 && (
          <div className="empty-state">
            <h2>
              No locations found
            </h2>

            <p>
              There are no locations
              available for this
              page.
            </p>
          </div>
        )}

      {locations.length > 0 && (
        <>
          <div className="location-grid">
            {locations.map(
              (location) => (
                <article
                  className="location-card"
                  key={location.id}
                >
                  <div className="location-card-number">
                    #{location.id}
                  </div>

                  <h2>
                    {location.name}
                  </h2>

                  <div className="location-details">
                    <div>
                      <span>
                        Type
                      </span>

                      <strong>
                        {location.type ||
                          "Unknown"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Dimension
                      </span>

                      <strong>
                        {location.dimension ||
                          "Unknown"}
                      </strong>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
          <LocationPagination
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

function LocationHeader() {
  return (
    <header className="page-header">
      <div>
        <h1>
          Locations
        </h1>

        <p>
          Explore locations and
          dimensions from the Rick
          and Morty universe.
        </p>
      </div>
    </header>
  );
}

function LocationPagination({
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
      aria-label="Location pagination"
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

function LocationSkeleton() {
  return (
    <div className="location-grid">
      {Array.from({
        length: 8,
      }).map((_, index) => (
        <div
          className="location-card"
          key={index}
        >
          <div className="skeleton-line small" />
          <div className="skeleton-line large" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  );
}

export default LocationListPage;