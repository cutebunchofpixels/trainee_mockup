import React, { useState } from 'react'
import { ConfigProvider, Layout, Select, theme } from 'antd'
import Home from './components/pages/Home'
import variables from './sass/abstracts/_variables.scss'
import './styles.module.scss'
import { Provider } from 'react-redux'
import { store } from 'redux/app/store'
import ThemeSwitch from 'components/layout/ThemeSwitch'
import { ThemeContext } from 'utils/ThemeContext'
import { Theme } from 'types/Theme'
import heIL from 'antd/locale/he_IL'
import enUS from 'antd/locale/en_US'
import { Locale } from 'types/Locale'

const locales = {
  [Locale.English]: enUS,
  [Locale.Hebrew]: heIL,
}

const localeOptions = Object.values(Locale).map(locale => ({
  label: locale.toUpperCase(),
  value: locale,
}))

function App() {
  const [currentTheme, setTheme] = useState<Theme>(Theme.Light)
  const [currentLocale, setLocale] = useState<Locale>(Locale.English)

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
      locale={locales[currentLocale]}
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
              <Select
                defaultValue={Locale.English}
                options={localeOptions}
                onChange={locale => setLocale(locale)}
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
