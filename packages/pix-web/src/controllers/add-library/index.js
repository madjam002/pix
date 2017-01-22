import React from 'react'
import {reduxForm} from 'redux-form'
import {Page, PageHeader, Form, FormGroupField, TextInput, FormButton} from 'ui'
import * as actions from './actions'

export default props => (
  <Page title="Add new library">
    <PageHeader>Add new library</PageHeader>

    <AddLibraryForm onSubmit={actions.addLibrary} />
  </Page>
)

const AddLibraryForm = reduxForm({
  form: 'login',
})(props => (
  <Form onSubmit={props.handleSubmit}>
    <FormGroupField
      label="Name"
      name="name"
      input={
        <TextInput placeholder="My new photo library" size="large" />
      }
    />

    <FormGroupField
      label="Photo directory"
      name="path"
      input={
        <TextInput placeholder="/mnt/photos" />
      }
    />

    <FormButton type="submit" className="pt-button pt-large pt-intent-primary" disabled={props.submitting}>Add library</FormButton>
  </Form>
))
