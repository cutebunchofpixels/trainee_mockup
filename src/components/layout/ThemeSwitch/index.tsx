import React from 'react'
import { Switch } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

import { Theme } from 'src/types/Theme'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { toggleTheme } from 'src/redux/thunks/theme'

export default function ThemeSwitch() {
  const { value: currentTheme } = useAppSelector(state => state.theme)
  const isChecked = currentTheme === Theme.Dark
  const dispatch = useAppDispatch()

  function handleThemeChange() {
    dispatch(toggleTheme())
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
