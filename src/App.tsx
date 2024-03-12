import React from 'react'
import { ConfigProvider, Layout, theme } from 'antd'
import Home from './components/pages/Home'
import variables from './sass/abstracts/_variables.scss'
import './styles.module.scss'
import ThemeSwitch from 'components/layout/ThemeSwitch'
import { Theme } from 'types/Theme'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { toggleTheme } from 'redux/actions/theme'

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
              dispatch(toggleTheme())
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
