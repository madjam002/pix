import {gql} from 'react-graphql'
import {SubmissionError} from 'redux-form'
import {browserHistory} from 'react-router'
import {runQuery, queryToCache} from 'core/api'

export const addLibrary = async data => {
  const res = await runQuery(gql`
    mutation ($library: CreateLibraryInput!) {
      createLibrary(library: $library) {
        library { id }
      }
    }
  `, {
    library: data,
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

  if (res.data.createLibrary.library != null) {
    browserHistory.push(`/libraries/${res.data.createLibrary.library.id}`)
  }
}
