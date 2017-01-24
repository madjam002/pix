import React from 'react'
import cx from 'classnames'
import {reduxForm} from 'redux-form'
import {Form, TextInputField, PasswordInputField, Stacked} from 'ui'
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
      <Stacked>
        <TextInputField name="username" placeholder="Username" leftIconName="pt-icon-person" size="large" />
        <PasswordInputField name="password" placeholder="Password" leftIconName="pt-icon-lock" size="large" />
        <button type="submit" className="pt-button pt-large pt-intent-primary pt-fill" disabled={props.submitting}>Login</button>
      </Stacked>
    </div>
  </Form>
))
