import React from 'react'
import {compose} from 'recompose'
import {gql, connectGraph} from 'react-graphql'
import {reduxForm, Field} from 'redux-form'
import {withRouter} from 'react-router'
import {formField, Tree, Form, FormButton, SegmentedRows} from 'ui'
import * as actions from './actions'

import styles from './index.less'

export default compose(
  withRouter,
)(props => (
  <div className={styles.container}>
    <div className={styles.sidebar}>
      <h2>Admin</h2>

      <Tree
        contents={genSidebar(props)}
      />
    </div>

    <div className={styles.main}>
      <SegmentedRows>
        <div>
          <h3>Users</h3>
          <UsersList />
        </div>
        <div>
          <h4>Add a new user</h4>
          <AddNewUserForm onSubmit={actions.addUser} />
        </div>
      </SegmentedRows>
    </div>
  </div>
))

const genSidebar = props => [
  {
    label: 'Users',
    href: '/admin',
    isSelected: props.router.isActive('/admin', true),
  },
]

const UsersList = connectGraph({
  query: () => gql`
    query {
      users {
        id
        username
      }
    }
  `,
})(({ users }) => (
  <table className="pt-table pt-interactive">
    <thead>
      <tr>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.username}</td>
        </tr>
      ))}
    </tbody>
  </table>
))

const AddNewUserForm = reduxForm({
  form: 'newUser',
})(props => (
  <Form onSubmit={props.handleSubmit}>
    <Field label="Username" component={formField} type="text" name="username" />
    <Field label="Password" component={formField} type="password" name="password" />

    <FormButton type="submit" className="pt-button pt-intent-primary" disabled={props.submitting}>Add user</FormButton>
  </Form>
))
