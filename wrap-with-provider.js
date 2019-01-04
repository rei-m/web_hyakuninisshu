import React from "react"
import { Provider } from "react-redux"

import { createStore } from "./src/state"

import { ThemeProvider } from "./src/styles/styled-components"
import { appTheme } from "./src/styles/theme"

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <ThemeProvider theme={appTheme}>
  <Provider store={createStore()}>{element}</Provider>
</ThemeProvider>
