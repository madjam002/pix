import React from 'react'
import cx from 'classnames'
import {InputGroup} from '@blueprintjs/core'
import {Field} from 'redux-form'
import {Stacked} from '../layout'
import {ErrorText} from '../typography'

export const TextInput = props => (
  <InputGroup
    type="text"
    className={cx(props.size === 'large' && 'pt-large', 'pt-fill')}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
    leftIconName={props.leftIconName}
  />
)

export const PasswordInput = props => (
  <InputGroup
    type="password"
    className={cx(props.size === 'large' && 'pt-large', 'pt-fill')}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
    leftIconName={props.leftIconName}
  />
)

export const TextInputField = props => (
  <Field component={renderTextInput} {...props} />
)

export const PasswordInputField = props => (
  <Field component={renderPasswordInput} {...props} />
)

const renderTextInput = ({ input, meta, ...rest }) => (
  <Stacked>
    <TextInput {...input} {...rest} />
    {meta != null && meta.touched && meta.error != null && (
      <ErrorText>{meta.error}</ErrorText>
    )}
  </Stacked>
)

const renderPasswordInput = ({ input, meta, ...rest }) => (
  <PasswordInput {...input} {...rest} />
)
