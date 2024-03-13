import React from 'react'
import { ConfigProvider, theme } from 'antd'
import variables from './sass/abstracts/_variables.scss'
import './styles.module.scss'
import { Theme } from 'types/Theme'
import { useAppSelector } from 'redux/app/hooks'
import { locales } from 'utils/constants'
import { Locale } from 'types/Locale'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

export function App() {
  const { value: currentTheme } = useAppSelector(state => state.theme)
  const { i18n } = useTranslation()

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
      <Outlet />
    </ConfigProvider>
  )
}

export default App
