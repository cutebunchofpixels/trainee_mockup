import React from 'react'
import { Switch } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

import { Theme } from 'src/types/Theme'

export default function ThemeSwitch() {
  const currentTheme = Theme.Light
  //eslint-disable-next-line
  //@ts-ignore
  const isChecked = currentTheme === Theme.Dark

  function handleThemeChange() {
    console.log('theme change')
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
