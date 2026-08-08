import Button from "./Button";

function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
}) {
  return (
    <nav
      className="ui-pagination"
      aria-label="Pagination"
    >
      <Button
        variant="secondary"
        size="small"
        disabled={previousDisabled || page <= 1}
        onClick={onPrevious}
      >
        ← Prev
      </Button>

      <span className="ui-pagination__status">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="secondary"
        size="small"
        disabled={
          nextDisabled ||
          page >= totalPages
        }
        onClick={onNext}
      >
        Next →
      </Button>
    </nav>
  );
}

export default Pagination;