import React from 'react'
import { Button, Result } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>{t('title', { page: t('pages.notFound') })}</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle={t('notFoundPage.caption')}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('notFoundPage.goBackButton')}
          </Button>
        }
      />
    </>
  )
}
