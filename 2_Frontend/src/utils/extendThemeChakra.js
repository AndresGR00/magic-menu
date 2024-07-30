import { extendTheme } from '@chakra-ui/react'

const colors = {
    white: {
        50: "#ffffff",
        100: "#f7f7f7",
        200: "#efefef",
        300: "#e7e7e7",
        400: "#dfdfdf",
        500: "#ffffff", //Original: d7d7d7
        600: "#cfcfcf",
        700: "#c7c7c7",
        800: "#bfbfbf",
        900: "#b7b7b7",
    },
  }
  
  export const theme = extendTheme({ colors })