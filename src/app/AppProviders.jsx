import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "./queryClient";
import ThemeProvider from "../context/theme/ThemeProvider";


import WatchlistProvider from "../context/watchlist/WatchlistProvider";


function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>

      <ReactQueryDevtools
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}

export default AppProviders;


