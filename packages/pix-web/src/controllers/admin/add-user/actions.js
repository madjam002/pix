import {gql} from 'react-graphql'
import {runQuery, queryToCache} from 'core/api'

export const addUser = async data => {
  await runQuery(gql`
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
}
