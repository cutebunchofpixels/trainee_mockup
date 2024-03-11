import React from 'react'
import { Switch } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Theme } from 'types/Theme'

interface ThemeSwitchProps {
  currentTheme: Theme
  onChange: () => void
}

export default function ThemeSwitch({
  currentTheme,
  onChange,
}: ThemeSwitchProps) {
  const isChecked = currentTheme === Theme.Dark

  return (
    <Switch
      checked={isChecked}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
      onChange={onChange}
      style={{
        background: !isChecked ? '#A9A9A9' : undefined,
      }}
    />
  )
}
