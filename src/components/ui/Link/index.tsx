import React from 'react'
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom'

import styles from './styles.module.scss'

export default function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'>
) {
  return <ReactRouterLink className={styles.link} {...props} />
}
