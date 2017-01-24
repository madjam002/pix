import React from 'react'
import {Spinner} from '@blueprintjs/core'

import styles from './index.less'

export * from '@blueprintjs/core'
export * from './atom'
export * from './blueprints'
export * from './form'
export * from './layout'
export * from './typography'

export const FormButton = props => <button {...props} />

export const LoadingScreen = () => (
  <div className={styles.loading}>
    <Spinner />
  </div>
)

export const SideBySide = props => (
  <div className={styles.sideBySide} style={{ alignItems: props.align }}>
    {props.children}
  </div>
)

export const ContentWithRight = props => (
  <div className={styles.sideBySide} style={{ alignItems: props.align }}>
    <div className={styles.fill}>{props.content}</div>
    <div>{props.right}</div>
  </div>
)

export const FixedWidth = props => (
  <div style={{ width: props.width }}>
    {props.children}
  </div>
)
