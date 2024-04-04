import React, { useEffect } from 'react'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Theme } from 'src/types/Theme'
import { locales } from 'src/utils/constants'
import { Locale } from 'src/types/Locale'
import { auth } from 'src/fb'
import { authStore } from 'src/mobx/auth'
import { themeStore } from './mobx/theme'

import colorVariables from './sass/abstracts/_variables.scss'
import './styles.module.scss'

function App() {
  const currentTheme = themeStore.theme
  const { i18n } = useTranslation()

  useEffect(() => {
    auth.authStateReady().then(() => authStore.setReady(true))
  }, [])

  return (
    <ConfigProvider
      direction={i18n.dir()}
      theme={{
        algorithm:
          currentTheme === Theme.Dark
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          colorPrimary: colorVariables.colorPrimary,
          colorBorder: colorVariables.colorGray,
        },
      }}
      locale={
        i18n.resolvedLanguage
          ? locales[i18n.resolvedLanguage as Locale]
          : locales[Locale.English]
      }
    >
      <AntdApp>
        <Outlet />
      </AntdApp>
    </ConfigProvider>
  )
}

export default observer(App)
