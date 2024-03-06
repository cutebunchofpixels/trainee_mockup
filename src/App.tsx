import React from 'react'
import { ConfigProvider } from 'antd'
import Home from './components/pages/Home'
import variables from './sass/abstracts/_variables.scss'
import classNames from './styles.module.scss'
import { Provider } from 'react-redux'
import { store } from 'redux/app/store'

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
      <Provider store={store}>
        <div className={classNames['app-container']}>
          <Home />
        </div>
      </Provider>
    </ConfigProvider>
  )
}

export default App
