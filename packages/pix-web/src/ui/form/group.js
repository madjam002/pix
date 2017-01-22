import React from 'react'
import {omit} from 'lodash'
import {Field} from 'redux-form'
import {Stacked} from '../layout'

export const FormGroup = ({ meta, ...props }) => (
  props.input != null
  ? (
    <label className="pt-label">
      <Stacked spaceBetween={0.5}>
        {props.label}
        {props.input}
        {meta != null && meta.touched && ((meta.error && <span className="pt-intent-danger">{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
      </Stacked>
    </label>
  )
  : (
    <Stacked spaceBetween={0.5}>
      {props.label}
      {props.children}
      {meta != null && meta.touched && ((meta.error && <span className="pt-intent-danger">{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
    </Stacked>
  )
)

export const FormGroupField = props => (
  <Field component={renderFormGroupField} {...omit(props, ['input'])} inputElement={props.input} />
)

export const renderFormGroupField = ({ input, meta, inputElement, ...rest }) => (
  <FormGroup
    {...rest}
    meta={meta}
    input={React.cloneElement(inputElement, input)}
  />
)
