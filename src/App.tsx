import React from 'react'
import { ConfigProvider, Layout } from 'antd'
import Home from './components/pages/Home'
import variables from './sass/abstracts/_variables.scss'
import './styles.module.scss'
import { Provider } from 'react-redux'
import { store } from 'redux/app/store'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 3,
          colorPrimary: variables.colorPrimary,
          colorBorder: variables.colorGray,
        },
      }}
    >
      <Provider store={store}>
        <Layout>
          <Layout.Content>
            <Home />
          </Layout.Content>
        </Layout>
      </Provider>
    </ConfigProvider>
  )
}

export default App
