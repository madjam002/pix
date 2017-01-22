import React from 'react'
import {Form, PageHeader, FormGroupField, TextInput, PasswordInput, FormButton, Stacked} from 'ui'
import {reduxForm} from 'redux-form'
import * as actions from './actions'

import styles from './index.less'

export default props => (
  <div className={styles.container}>
    <div className={styles.content}>
      <Stacked spaceBetween={2}>
        <PageHeader>Welcome to Pix</PageHeader>

        <p>
          Pix is a new way to view and manage your photos. Get started by entering a username and password for the admin account.
        </p>

        <AdminAccountForm onSubmit={actions.createAdminAccount} />
      </Stacked>
    </div>
  </div>
)

const AdminAccountForm = reduxForm({
  form: 'login',
})(props => (
  <Form onSubmit={props.handleSubmit} spaceBetween={1}>
    <FormGroupField
      label="Username"
      name="username"
      input={
        <TextInput placeholder="Admin username" size="large" />
      }
    />

    <FormGroupField
      label="Password"
      name="password"
      input={
        <PasswordInput placeholder="Admin password" size="large" />
      }
    />

    <FormGroupField
      label="Confirm Password"
      name="confirmPassword"
      input={
        <PasswordInput placeholder="Re-type admin password" size="large" />
      }
    />

    <FormButton type="submit" className="pt-button pt-large pt-intent-primary" disabled={props.submitting}>Get started</FormButton>
  </Form>
))
