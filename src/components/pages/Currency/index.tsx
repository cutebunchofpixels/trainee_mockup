import React from 'react'
import { observer } from 'mobx-react-lite'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import PaymentsSection from 'src/components/layout/PaymentsSection'

function Currency() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('title', { page: t('pages.currency') })}</title>
      </Helmet>
      <PaymentsSection />
    </>
  )
}

export default observer(Currency)
