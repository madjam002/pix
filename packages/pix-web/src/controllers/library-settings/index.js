import React from 'react'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
import {reduxForm, FieldArray} from 'redux-form'
import {gql, connectGraph} from 'react-graphql'
import {TextInputField, FormGroup, FormGroupField, TextInput, Page, PageHeader, Form, FormButton, Button, ContentWithRight, Stacked, FixedWidth} from 'ui'
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
  <Page title={`Edit ${library.name}`}>
    <PageHeader>Edit {library.name}</PageHeader>

    <EditLibraryForm initialValues={library} onSubmit={actions.editLibrary.bind(null, library.id, props.router)} />
  </Page>
))

const EditLibraryForm = reduxForm({
  form: 'editLibrary',
})(props => (
  <Form onSubmit={props.handleSubmit}>
    <FormGroupField
      label="Name"
      name="name"
      input={<TextInput size="large" />}
    />

    <FixedWidth width={300}>
      <FormGroup
        label="Ignore file regex patterns"
      >
        <FieldArray name="ignorePatterns" component={renderIgnorePatterns} />
      </FormGroup>
    </FixedWidth>

    <hr />

    <FormButton type="submit" className="pt-button pt-large pt-intent-primary" disabled={props.submitting}>Save</FormButton>
  </Form>
))

const renderIgnorePatterns = ({ fields }) => (
  <Stacked>
    {fields.map((pattern, index) => (
      <div key={index}>
        <ContentWithRight
          content={<TextInputField name={pattern} placeholder="some regex pattern" />}
          right={<Button onClick={() => fields.remove(index)} iconName="cross" />}
        />
      </div>
    ))}
    <Button onClick={() => fields.push('')} text="Add" iconName="plus" />
  </Stacked>
)
