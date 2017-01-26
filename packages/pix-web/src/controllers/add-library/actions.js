import {gql} from 'react-graphql'
import {browserHistory} from 'react-router'
import {runMutation, queryToCache} from 'core/api'

export const addLibrary = async data => {
  const res = await runMutation(gql`
    mutation ($library: CreateLibraryInput!) {
      createLibrary(library: $library) {
        library { id }
      }
    }
  `, {
    library: data,
  })

  await queryToCache(gql`
    query {
      viewer {
        libraries {
          id
          name
        }
      }
    }
  `)

  if (res.data.createLibrary.library != null) {
    browserHistory.push(`/libraries/${res.data.createLibrary.library.id}`)
  }
}
