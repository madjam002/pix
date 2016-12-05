import React from 'react'
import cx from 'classnames'
import {Field, reduxForm} from 'redux-form'
import {Form, formField} from 'ui'
import * as actions from './actions'

import styles from './index.less'

export default props => (
  <LoginForm onSubmit={actions.login} />
)

const LoginForm = reduxForm({
  form: 'login',
})(props => (
  <Form onSubmit={props.handleSubmit}>
    <div className={cx('pt-control-group pt-vertical', styles.login)}>
      <Field placeholder="Username" name="username" leftIconName="pt-icon-person" className="pt-large" component={formField} />
      <Field placeholder="Password" name="password" type="password" leftIconName="pt-icon-lock" className="pt-large" component={formField} />
      <button type="submit" className="pt-button pt-large pt-intent-primary" disabled={props.submitting}>Login</button>
    </div>
  </Form>
))
