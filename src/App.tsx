import React from 'react'
import './App.css'
import { ConfigProvider } from 'antd'
import Home from './components/pages/Home'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 3,
          colorBorder: '#EBEFF1',
          colorPrimary: '#01B466',
        },
      }}
    >
      <Home />
    </ConfigProvider>
  )
}

export default App
