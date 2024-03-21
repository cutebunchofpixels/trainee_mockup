import React from 'react'
import { Switch } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

import { Theme } from 'src/types/Theme'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { setTheme } from 'src/redux/actions/theme'
import { ls } from 'src/utils/secureLS'
import { PREFERED_THEME_KEY } from 'src/utils/constants'

export default function ThemeSwitch() {
  const { value: currentTheme } = useAppSelector(state => state.theme)
  const isChecked = currentTheme === Theme.Dark
  const dispatch = useAppDispatch()

  function handleThemeChange() {
    const newTheme = currentTheme === Theme.Dark ? Theme.Light : Theme.Dark
    dispatch(setTheme(newTheme))
    ls.set(PREFERED_THEME_KEY, newTheme)
  }

  return (
    <Switch
      checked={isChecked}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
      onChange={handleThemeChange}
      style={{
        background: !isChecked ? '#A9A9A9' : undefined,
      }}
    />
  )
}
