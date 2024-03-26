import React, { useEffect } from 'react'
import { ConfigProvider, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import { Theme } from 'types/Theme'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { locales } from 'utils/constants'
import { Locale } from 'types/Locale'
import { auth } from 'fb'
import { setAuthReady } from 'redux/actions/auth'

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
      <Outlet />
    </ConfigProvider>
  )
}

export default App
