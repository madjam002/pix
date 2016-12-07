import {gql} from 'react-graphql'
import {runQuery, queryToCache} from 'core/api'

export const editLibrary = async (id, router, data) => {
  await runQuery(gql`
    mutation ($libraryId: ID!, $library: EditLibraryInput!) {
      editLibrary(libraryId: $libraryId, library: $library) {
        library { id }
      }
    }
  `, {
    libraryId: id,
    library: {
      name: data.name,
      ignorePatterns: data.ignorePatterns,
    },
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

  router.push(`/libraries/${id}`)
}
