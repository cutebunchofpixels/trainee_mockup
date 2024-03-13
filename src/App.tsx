import React from 'react'
import { ConfigProvider, Layout, theme } from 'antd'
import Home from './components/pages/Home'
import variables from './sass/abstracts/_variables.scss'
import './styles.module.scss'
import ThemeSwitch from 'components/layout/ThemeSwitch'
import { Theme } from 'types/Theme'
import { useAppSelector } from 'redux/app/hooks'
import LocaleSelect from 'components/layout/LocaleSelect'
import { locales } from 'utils/constants'
import { Locale } from 'types/Locale'
import { useTranslation } from 'react-i18next'

function App() {
  const { value: currentTheme } = useAppSelector(state => state.theme)
  const { i18n, t } = useTranslation()

  return (
    <ConfigProvider
      direction={i18n.dir()}
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
      locale={
        i18n.resolvedLanguage
          ? locales[i18n.resolvedLanguage as Locale]
          : locales[Locale.English]
      }
    >
      <Layout>
        <Layout.Header>
          <ThemeSwitch />
          <LocaleSelect />
        </Layout.Header>
        <Layout.Content>
          <Home />
        </Layout.Content>
        <Layout.Footer>{t('footer.caption')}</Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
