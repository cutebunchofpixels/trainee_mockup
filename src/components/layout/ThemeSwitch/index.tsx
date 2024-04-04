import React from 'react'
import { Switch } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'

import { Theme } from 'src/types/Theme'
import { themeStore } from 'src/mobx/theme'

function ThemeSwitch() {
  const currentTheme = themeStore.theme
  const isChecked = currentTheme === Theme.Dark

  return (
    <Switch
      checked={isChecked}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
      onChange={() => themeStore.toggleTheme()}
      style={{
        background: !isChecked ? '#A9A9A9' : undefined,
      }}
    />
  )
}

export default observer(ThemeSwitch)
