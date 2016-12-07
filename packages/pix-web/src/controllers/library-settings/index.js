import React from 'react'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
import {reduxForm, Field, FieldArray} from 'redux-form'
import {gql, connectGraph} from 'react-graphql'
import {formField, formInput, Form, FormButton, Button, ContentWithRight, SegmentedRows, FixedWidth} from 'ui'
import * as actions from './actions'

export default compose(
  connectGraph({
    query: () => gql`
      query($libraryId: ID!) {
        library(id: $libraryId) {
          id
          name
          ignorePatterns
        }
      }
    `,
    variables: props => ({
      libraryId: props.params.libraryId,
    }),
    refetchOnMount: true,
  }),
  withRouter,
)(({ library, ...props }) => (
  <div>
    <h1>Edit {library.name}</h1>

    <EditLibraryForm initialValues={library} onSubmit={actions.editLibrary.bind(null, library.id, props.router)} />
  </div>
))

const EditLibraryForm = reduxForm({
  form: 'editLibrary',
})(props => (
  <Form onSubmit={props.handleSubmit}>
    <Field label="Name" component={formField} type="text" name="name" className="pt-large" />

    <label>Ignore file regex patterns</label>
    <FixedWidth width={300}><FieldArray name="ignorePatterns" component={renderIgnorePatterns} /></FixedWidth>

    <hr />

    <FormButton type="submit" className="pt-button pt-large pt-intent-primary" disabled={props.submitting}>Save</FormButton>
  </Form>
))

const renderIgnorePatterns = ({ fields }) => (
  <SegmentedRows pad>
    {fields.map((pattern, index) => (
      <div key={index}>
        <ContentWithRight
          content={<Field component={formInput} type="text" name={pattern} placeholder="some regex pattern" className="pt-fill" />}
          right={<Button onClick={() => fields.remove(index)} iconName="cross" />}
        />
      </div>
    ))}
    <Button onClick={() => fields.push('')} text="Add" iconName="plus" />
  </SegmentedRows>
)
