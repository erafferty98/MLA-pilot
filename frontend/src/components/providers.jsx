'use client'

import ContextProvider from '../context/AuthContextProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { createTheme, MantineProvider } from '@mantine/core'
import theme from '../theme'
import AuthContextProvider from '../context/AuthContextProvider'
import ErrorContextProvider from '../context/ErrorContextProvider'

export function Providers({ children }) {
  return (
    <AppRouterCacheProvider>
      <AuthContextProvider>
        <ErrorContextProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </ErrorContextProvider>
      </AuthContextProvider>
    </AppRouterCacheProvider>
  )
}
