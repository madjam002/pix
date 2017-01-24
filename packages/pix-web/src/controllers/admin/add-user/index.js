import React from 'react'
import {Page, PageHeader, Form, FormGroupField, TextInput, PasswordInput, FormButton} from 'ui'
import {reduxForm} from 'redux-form'
import * as actions from './actions'

export default props => (
  <Page title="Add new user">
    <PageHeader>Add new user</PageHeader>

    <AddNewUserForm onSubmit={actions.addUser.bind(null)} />
  </Page>
)

const AddNewUserForm = reduxForm({
  form: 'newUser',
})(props => (
  <Form onSubmit={props.handleSubmit}>
    <FormGroupField
      label="Username"
      name="username"
      input={
        <TextInput />
      }
    />

    <FormGroupField
      label="Password"
      name="password"
      input={
        <PasswordInput />
      }
    />

    <FormButton type="submit" className="pt-button pt-intent-primary" disabled={props.submitting}>Add user</FormButton>
  </Form>
))
