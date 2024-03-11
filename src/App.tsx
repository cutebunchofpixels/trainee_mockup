import React, { useState } from 'react'
import { ConfigProvider, Layout, theme } from 'antd'
import Home from './components/pages/Home'
import variables from './sass/abstracts/_variables.scss'
import './styles.module.scss'
import { Provider } from 'react-redux'
import { store } from 'redux/app/store'
import ThemeSwitch from 'components/layout/ThemeSwitch'
import { ThemeContext } from 'utils/ThemeContext'
import { Theme } from 'types/Theme'

function App() {
  const [currentTheme, setTheme] = useState<Theme>(Theme.Light)

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
      <ThemeContext.Provider value={{ currentTheme, setTheme }}>
        <Provider store={store}>
          <Layout>
            <Layout.Header>
              <ThemeSwitch
                currentTheme={currentTheme}
                onChange={() => {
                  if (currentTheme === Theme.Light) {
                    setTheme(Theme.Dark)
                  } else {
                    setTheme(Theme.Light)
                  }
                }}
              />
            </Layout.Header>
            <Layout.Content>
              <Home />
            </Layout.Content>
            <Layout.Footer>Footer</Layout.Footer>
          </Layout>
        </Provider>
      </ThemeContext.Provider>
    </ConfigProvider>
  )
}

export default App
