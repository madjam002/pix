import React from 'react'
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
