import {gql} from 'react-graphql'
import {SubmissionError} from 'redux-form'
import {runQuery, queryToCache} from 'core/api'

export const editLibrary = async (id, router, data) => {
  const res = await runQuery(gql`
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

  if (res.errors && res.errors[0].errors != null) {
    throw new SubmissionError(res.errors[0].errors)
  }

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
