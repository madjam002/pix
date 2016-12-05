import React from 'react'
import {Form, FormGroup, formField, FormButton} from 'ui'
import {reduxForm, Field} from 'redux-form'
import * as actions from './actions'

import styles from './index.less'

export default props => (
  <div className={styles.container}>
    <div className={styles.content}>
      <h1>Welcome to Pix</h1>

      <p>
        Pix is a new way to view and manage your photos. Get started by entering a username and password for the admin account.
      </p>

      <AdminAccountForm onSubmit={actions.createAdminAccount} />
    </div>
  </div>
)

const AdminAccountForm = reduxForm({
  form: 'login',
})(props => (
  <Form onSubmit={props.handleSubmit}>
    <Field label="Username" component={formField} type="text" name="username" placeholder="Admin username" className="pt-large" />
    <Field label="Password" component={formField} type="password" name="password" placeholder="Admin password" className="pt-large" />
    <Field label="Confirm password" component={formField} type="password" name="confirmPassword" placeholder="Re-type admin password" className="pt-large" />

    <FormButton type="submit" className="pt-button pt-large pt-intent-primary" disabled={props.submitting}>Get started</FormButton>
  </Form>
))
