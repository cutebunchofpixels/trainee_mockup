import React from 'react'
import { ConfigProvider, Layout, theme } from 'antd'
import Home from './components/pages/Home'
import variables from './sass/abstracts/_variables.scss'
import './styles.module.scss'
import ThemeSwitch from 'components/layout/ThemeSwitch'
import { Theme } from 'types/Theme'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setTheme } from 'redux/actions/theme'
import { ls } from 'utils/secureLS'
import { PREFERED_THEME_KEY } from 'utils/constants'

function App() {
  const { value: currentTheme } = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === Theme.Dark
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          borderRadius: 3,
          colorPrimary: variables.colorPrimary,
          colorBorder: variables.colorGray,
        },
      }}
    >
      <Layout>
        <Layout.Header>
          <ThemeSwitch
            currentTheme={currentTheme}
            onChange={() => {
              const newTheme =
                currentTheme === Theme.Dark ? Theme.Light : Theme.Dark
              dispatch(setTheme(newTheme))
              ls.set(PREFERED_THEME_KEY, newTheme)
            }}
          />
        </Layout.Header>
        <Layout.Content>
          <Home />
        </Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
