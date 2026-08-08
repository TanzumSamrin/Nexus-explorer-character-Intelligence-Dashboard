import { useQueryClient } from "@tanstack/react-query";

import {
  fetchCharacters,
} from "../../api/characterQueries";

function Pagination({
  page,
  totalPages,
  filters,
  onPageChange,
  isFetching,
}) {
  const queryClient = useQueryClient();

  const isFirstPage = page === 1;
  const isLastPage =
    page === totalPages;

  function buildQueryParams(
    targetPage
  ) {
    return {
      page: targetPage,
      name: filters.name,
      status: filters.status,
      species: filters.species,
      gender: filters.gender,
    };
  }

  function prefetchPage(targetPage) {
    if (
      targetPage < 1 ||
      targetPage > totalPages
    ) {
      return;
    }

    const params =
      buildQueryParams(targetPage);

    queryClient.prefetchQuery({
      queryKey: [
        "characters",
        params,
      ],

      queryFn: () =>
        fetchCharacters(params),
    });
  }

  function handlePreviousHover() {
    prefetchPage(page - 1);
  }

  function handleNextHover() {
    prefetchPage(page + 1);
  }

  function handlePreviousClick() {
    if (!isFirstPage) {
      onPageChange(page - 1);
    }
  }

  function handleNextClick() {
    if (!isLastPage) {
      onPageChange(page + 1);
    }
  }

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={
          isFirstPage || isFetching
        }
        onClick={handlePreviousClick}
        onMouseEnter={
          handlePreviousHover
        }
      >
        ← Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={
          isLastPage || isFetching
        }
        onClick={handleNextClick}
        onMouseEnter={
          handleNextHover
        }
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;