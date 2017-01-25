import React from 'react'
import {Field} from 'redux-form'
import {Stacked} from '../layout'
import {ErrorText} from '../typography'

export const FormGroup = ({ meta, ...props }) => (
  props.input != null
  ? (
    <label className="pt-label">
      <Stacked spaceBetween={0.5}>
        {props.label}
        {props.input}
        {props.error != null && (
          <ErrorText>{props.error}</ErrorText>
        )}
      </Stacked>
    </label>
  )
  : (
    <Stacked spaceBetween={0.5}>
      {props.label}
      {props.children}
      {props.error != null && (
        <ErrorText>{props.error}</ErrorText>
      )}
    </Stacked>
  )
)

export const FormGroupField = ({ input, ...props }) => (
  <Field component={renderFormGroupField} {...props} inputElement={input} />
)

export const renderFormGroupField = ({ input, meta, inputElement, ...rest }) => (
  <FormGroup
    {...rest}
    error={meta != null && meta.touched && meta.error != null ? meta.error : null}
    input={React.cloneElement(inputElement, input)}
  />
)
