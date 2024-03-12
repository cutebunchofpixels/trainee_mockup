import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from 'redux/app/store'
import { setTheme } from 'redux/actions/theme'
import { ls } from 'utils/secureLS'
import { inferePreferredTheme } from 'utils/inferPreferredTheme'
import { PREFERED_THEME_KEY } from 'utils/constants'
import './i18n'

const preferredTheme = inferePreferredTheme()
store.dispatch(setTheme(preferredTheme))
ls.set(PREFERED_THEME_KEY, preferredTheme)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
