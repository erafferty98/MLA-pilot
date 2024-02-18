import { ReactNode } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { MantineProvider } from '@mantine/core'
import theme from '../../theme'
import AuthContextProvider from '../../context/AuthContextProvider'
import ErrorContextProvider from '../../context/ErrorContextProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
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
