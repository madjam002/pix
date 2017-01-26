import {gql} from 'react-graphql'
import {browserHistory} from 'react-router'
import {runMutation, queryToCache} from 'core/api'

export const addUser = async data => {
  const res = await runMutation(gql`
    mutation ($user: CreateUserInput!) {
      createUser(user: $user) {
        user { id }
      }
    }
  `, {
    user: data,
  })

  await queryToCache(gql`
    query {
      users {
        id
        username
      }
    }
  `)

  if (res.data.createUser.user != null) {
    browserHistory.push('/admin')
  }
}
