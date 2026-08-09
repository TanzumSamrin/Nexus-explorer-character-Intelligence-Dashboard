import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  WatchlistStateContext,
  WatchlistActionsContext,
} from "./WatchlistContext";

const STORAGE_KEY =
  "nexus-explorer-watchlist";

function readStoredWatchlist() {
  try {
    const stored =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(Number)
      .filter(
        (id) =>
          Number.isInteger(id) &&
          id > 0
      );
  } catch {
    return [];
  }
}

export default function WatchlistProvider({
  children,
}) {
  const [
    ids,
    setIds,
  ] = useState(
    readStoredWatchlist
  );

  // [REQ-4] Immutable array update:
  // watchlist changes always create a new array.
  // No push(), splice(), or direct mutation.

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ids)
    );
  }, [ids]);

  const add = useCallback(
    (id) => {
      const numericId =
        Number(id);

      if (
        !Number.isInteger(
          numericId
        ) ||
        numericId <= 0
      ) {
        return;
      }

      setIds((currentIds) => {
        if (
          currentIds.includes(
            numericId
          )
        ) {
          return currentIds;
        }

        return [
          ...currentIds,
          numericId,
        ];
      });
    },
    []
  );

  const remove = useCallback(
    (id) => {
      const numericId =
        Number(id);

      setIds((currentIds) =>
        currentIds.filter(
          (currentId) =>
            currentId !==
            numericId
        )
      );
    },
    []
  );

  const toggle = useCallback(
    (id) => {
      const numericId =
        Number(id);

      setIds((currentIds) => {
        if (
          currentIds.includes(
            numericId
          )
        ) {
          return currentIds.filter(
            (currentId) =>
              currentId !==
              numericId
          );
        }

        return [
          ...currentIds,
          numericId,
        ];
      });
    },
    []
  );

  const clear = useCallback(() => {
    setIds([]);
  }, []);

  const stateValue = useMemo(
    () => ({
      ids,
    }),
    [ids]
  );

  const actionsValue =
    useMemo(
      () => ({
        add,
        remove,
        toggle,
        clear,
      }),
      [
        add,
        remove,
        toggle,
        clear,
      ]
    );

  return (
    <WatchlistStateContext.Provider
      value={stateValue}
    >
      <WatchlistActionsContext.Provider
        value={actionsValue}
      >
        {children}
      </WatchlistActionsContext.Provider>
    </WatchlistStateContext.Provider>
  );
}