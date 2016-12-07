import React from 'react'
import cx from 'classnames'
import {InputGroup, Spinner} from '@blueprintjs/core'

import styles from './index.less'

export * from '@blueprintjs/core'

export const Form = props => <form {...props} className={styles.form} />
export const FormButton = props => <button {...props} />

export const formField = ({ input, meta, label, ...rest }) => (
  <FormGroup label={label} meta={meta} input={
    <InputGroup {...input} {...rest} />
  } />
)

export const formInput = ({ input, meta, ...rest }) => (
  <InputGroup {...input} {...rest} />
)

export const FormGroup = ({ meta, ...props }) => (
  <label className="pt-label">
    {props.label}
    {props.input}
    {meta.touched && ((meta.error && <span className="pt-intent-danger">{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
  </label>
)

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

export const SegmentedRows = props => (
  <div className={cx(styles.segmentedRows, props.pad && styles.padVertical)}>
    {props.children}
  </div>
)

export const FixedWidth = props => (
  <div style={{ width: props.width }}>
    {props.children}
  </div>
)
