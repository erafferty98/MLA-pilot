"use client";

import ContextProvider from "../context/contextProvider.js";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export function Providers({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ContextProvider>{children}</ContextProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
