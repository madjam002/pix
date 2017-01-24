import React from 'react'
import {gql, connectGraph} from 'react-graphql'
import {Link} from 'react-router'
import {Button, Page, PageHeader} from 'ui'

export default props => (
  <Page title="Users">
    <PageHeader
      buttons={<Link to="/admin/users/add-user"><Button>Add new user</Button></Link>}
    >
      Users
    </PageHeader>

    <UsersList />
  </Page>
)

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
