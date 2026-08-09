import {
  useContext,
} from "react";

import {
  WatchlistStateContext,
  WatchlistActionsContext,
} from "./WatchlistContext";

export function useWatchlistState() {
  const context =
    useContext(
      WatchlistStateContext
    );

  if (!context) {
    throw new Error(
      "useWatchlistState must be used inside WatchlistProvider."
    );
  }

  return context;
}

export function useWatchlistActions() {
  const context =
    useContext(
      WatchlistActionsContext
    );

  if (!context) {
    throw new Error(
      "useWatchlistActions must be used inside WatchlistProvider."
    );
  }

  return context;
}

export function useWatchlist() {
  const state =
    useWatchlistState();

  const actions =
    useWatchlistActions();

  return {
    ...state,
    ...actions,
  };
}