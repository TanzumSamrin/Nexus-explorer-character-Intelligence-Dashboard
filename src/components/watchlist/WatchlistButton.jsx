import {
  useWatchlistActions,
  useWatchlistState,
} from "../../contexts/watchlist/useWatchlist";

function WatchlistButton({
  characterId,
}) {
  const {
    ids,
  } = useWatchlistState();

  const {
    toggle,
  } = useWatchlistActions();

  const isSaved =
    ids.includes(
      Number(characterId)
    );

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    toggle(characterId);
  }

  return (
    <button
      type="button"
      className={`watchlist-button ${
        isSaved
          ? "is-active"
          : ""
      }`}
      onClick={handleClick}
      aria-label={
        isSaved
          ? "Remove from watchlist"
          : "Add to watchlist"
      }
      aria-pressed={isSaved}
    >
      {isSaved
        ? "★"
        : "☆"}
    </button>
  );
}

export default WatchlistButton;