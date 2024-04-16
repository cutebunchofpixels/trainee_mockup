import React from 'react'
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom'
import classNames from 'classnames'

import styles from './styles.module.scss'

export default function Link({
  className,
  ...rest
}: LinkProps & React.ComponentPropsWithoutRef<'a'>) {
  className && console.log(classNames(className, styles.link))

  return (
    <ReactRouterLink className={classNames(className, styles.link)} {...rest} />
  )
}
