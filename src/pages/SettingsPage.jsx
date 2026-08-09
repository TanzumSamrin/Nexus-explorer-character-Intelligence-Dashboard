
import {
  useState,
} from "react";

import {
  useQueryClient,
} from "@tanstack/react-query";

import {
  useTheme,
} from "../context/theme/ThemeContext";

import {
  useWatchlist,
} from "../context/watchlist/useWatchlist";

function SettingsPage() {
  const queryClient =
    useQueryClient();

  const {
    theme,
    toggleTheme,
  } = useTheme();

  const {
    clear: clearWatchlist,
  } = useWatchlist();

  const currentDefaults =
    queryClient.getDefaultOptions();

  const currentQueryDefaults =
    currentDefaults.queries || {};

  const [
    staleTime,
    setStaleTime,
  ] = useState(
    currentQueryDefaults.staleTime ??
      60 * 1000
  );

  const [
    refetchOnWindowFocus,
    setRefetchOnWindowFocus,
  ] = useState(
    currentQueryDefaults.refetchOnWindowFocus ??
      true
  );

  const [
    message,
    setMessage,
  ] = useState("");

  function handleStaleTimeChange(
    event
  ) {
    const value =
      Number(event.target.value);

    setStaleTime(value);

    queryClient.setDefaultOptions({
      queries: {
        ...queryClient.getDefaultOptions()
          .queries,

        staleTime: value,
      },
    });

    setMessage(
      `Stale time changed to ${value / 1000} seconds.`
    );
  }

  function handleRefetchChange(
    event
  ) {
    const value =
      event.target.checked;

    setRefetchOnWindowFocus(
      value
    );

    queryClient.setDefaultOptions({
      queries: {
        ...queryClient.getDefaultOptions()
          .queries,

        refetchOnWindowFocus:
          value,
      },
    });

    setMessage(
      value
        ? "Refetch on window focus enabled."
        : "Refetch on window focus disabled."
    );
  }

  function handleClearCache() {
    queryClient.clear();

    setMessage(
      "React Query cache cleared."
    );
  }

  function handleClearWatchlist() {
    clearWatchlist();

    setMessage(
      "Watchlist cleared."
    );
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>
            Settings
          </h1>

          <p>
            Manage theme and
            application behaviour.
          </p>
        </div>
      </header>

      <section className="settings-section">
        <h2>
          Appearance
        </h2>

        <div className="settings-row">
          <div>
            <h3>
              Theme
            </h3>

            <p>
              Current theme:{" "}
              {theme}
            </p>
          </div>

          <button
            type="button"
            onClick={
              toggleTheme
            }
          >
            {theme === "dark"
              ? "Switch to Light"
              : "Switch to Dark"}
          </button>
        </div>
      </section>

      <section className="settings-section">
        <h2>
          React Query
        </h2>

        <div className="settings-row">
          <div>
            <h3>
              Stale Time
            </h3>

            <p>
              Time before cached
              data becomes stale.
            </p>
          </div>

          <select
            value={staleTime}
            onChange={
              handleStaleTimeChange
            }
          >
            <option value={0}>
              0 seconds
            </option>

            <option value={30 * 1000}>
              30 seconds
            </option>

            <option value={60 * 1000}>
              1 minute
            </option>

            <option value={5 * 60 * 1000}>
              5 minutes
            </option>

            <option value={10 * 60 * 1000}>
              10 minutes
            </option>
          </select>
        </div>

        <div className="settings-row">
          <div>
            <h3>
              Refetch on Window Focus
            </h3>

            <p>
              Refetch stale queries when
              the browser window regains
              focus.
            </p>
          </div>

          <label>
            <input
              type="checkbox"
              checked={
                refetchOnWindowFocus
              }
              onChange={
                handleRefetchChange
              }
            />

            Enabled
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h2>
          Actions
        </h2>

        <div className="settings-actions">
          <button
            type="button"
            onClick={
              handleClearCache
            }
          >
            Clear Cache
          </button>

          <button
            type="button"
            onClick={
              handleClearWatchlist
            }
          >
            Clear Watchlist
          </button>
        </div>
      </section>

      {message && (
        <div className="success-state">
          {message}
        </div>
      )}
    </section>
  );
}

export default SettingsPage;
