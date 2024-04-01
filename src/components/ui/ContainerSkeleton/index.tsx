import React from 'react'
import { Skeleton, SkeletonProps } from 'antd'

import styles from './styles.module.scss'

export default function ContainerSkeleton(props: SkeletonProps) {
  return <Skeleton.Node {...props} className={styles.containerSkeleton} />
}
