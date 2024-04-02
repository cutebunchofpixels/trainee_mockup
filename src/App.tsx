import React, { useEffect } from 'react'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import { Theme } from 'src/types/Theme'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { locales } from 'src/utils/constants'
import { Locale } from 'src/types/Locale'
import { auth } from 'src/fb'
import { setAuthReady } from 'src/redux/actions/auth'

import colorVariables from './sass/abstracts/_variables.scss'
import './styles.module.scss'

export function App() {
  const { value: currentTheme } = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  useEffect(() => {
    auth.authStateReady().then(() => dispatch(setAuthReady(true)))
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
          borderRadius: 3,
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

export default App
