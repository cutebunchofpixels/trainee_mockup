import React from 'react'
import './App.css'
import { ConfigProvider } from 'antd'
import Home from './components/pages/Home'
import variables from './sass/abstracts/_variables.scss'

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
      <Home />
    </ConfigProvider>
  )
}

export default App
