import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {formField, Form, FormButton} from 'ui'
import * as actions from './actions'

export default props => (
  <div>
    <h1>Add new library</h1>

    <AddLibraryForm onSubmit={actions.addLibrary} />
  </div>
)

const AddLibraryForm = reduxForm({
  form: 'login',
})(props => (
  <Form onSubmit={props.handleSubmit}>
    <Field label="Name" component={formField} type="text" name="name" placeholder="My new photo library" className="pt-large" />
    <Field label="Photo directory" component={formField} type="text" name="path" placeholder="/mnt/photos" />

    <FormButton type="submit" className="pt-button pt-large pt-intent-primary" disabled={props.submitting}>Add library</FormButton>
  </Form>
))
