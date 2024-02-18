import { createTheme, rem } from '@mantine/core'

const mantimeTheme = createTheme({
  /** Put your mantine theme override here */
  headings: {
    // properties for all headings

    // properties for individual headings, all of them are optional
    sizes: {
      h1: {
        fontSize: rem(40),
        lineHeight: '1.4',
      },
    },
  },
})

export default mantimeTheme
