import React from 'react'
import { ConfigProvider } from 'antd'
import Home from './components/pages/Home'
import variables from './sass/abstracts/_variables.scss'
import classNames from './styles.module.scss'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 3,
          colorBorder: variables.colorGray,
          colorPrimary: variables.colorPrimary,
        },
      }}
    >
      <div className={classNames['app-container']}>
        <Home />
      </div>
    </ConfigProvider>
  )
}

export default App
