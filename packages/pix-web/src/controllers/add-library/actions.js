import {gql} from 'react-graphql'
import {runQuery, queryToCache} from 'core/api'

export const addLibrary = async data => {
  await runQuery(gql`
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
}
