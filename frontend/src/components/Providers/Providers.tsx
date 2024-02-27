import { ReactNode } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { MantineProvider } from '@mantine/core'
import theme from '../../theme'
import AuthContextProvider from '../../context/AuthContextProvider'
import ErrorContextProvider from '../../context/ErrorContextProvider'
import UpdateContextProvider from '../../context/UpdateContextProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <AuthContextProvider>
        <ErrorContextProvider>
          <UpdateContextProvider>
            <MantineProvider theme={theme}>{children}</MantineProvider>
          </UpdateContextProvider>
        </ErrorContextProvider>
      </AuthContextProvider>
    </AppRouterCacheProvider>
  )
}
