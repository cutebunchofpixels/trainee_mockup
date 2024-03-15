import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'redux/app/store'
import { setTheme } from 'redux/actions/theme'
import { ls } from 'utils/secureLS'
import { inferePreferredTheme } from 'utils/inferPreferredTheme'
import { PREFERED_THEME_KEY } from 'utils/constants'
import './i18n'
import { RouterProvider } from 'react-router-dom'
import { router } from 'utils/router'
import './normalize.css'

const preferredTheme = inferePreferredTheme()
store.dispatch(setTheme(preferredTheme))
ls.set(PREFERED_THEME_KEY, preferredTheme)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
