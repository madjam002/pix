import React from 'react'
import {createGraphQLContext} from 'react-graphql'
import {SubmissionError} from 'redux-form'
import {print} from 'graphql-tag/printer'
import {LoadingScreen} from 'ui'
import {toastError} from 'core/toaster'

const context = createGraphQLContext({
  defaultRenderLoading: props => <LoadingScreen />,
  defaultRenderError: props => <div>An error has occurred</div>,
  async executeQuery(queryObj, variables) {
    return await runQuery(queryObj, variables)
  },
})

export default context

export async function runQuery(queryObj, variables) {
  const res = await fetch('/graph', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: print(queryObj),
      variables,
    }),
  })

  const result = await res.json()

  if (result.errors) {
    console.log('Got errors from graph', result.errors)
  }

  return result
}

export async function runMutation(queryObj, variables) {
  const res = await runQuery(queryObj, variables)

  if (res.errors && res.errors[0]) {
    if (res.errors[0].errors != null) {
      throw new SubmissionError(res.errors[0].errors)
    }

    if (res.errors[0].message != null) {
      return toastError(res.errors[0].message)
    }
  }
}

export async function queryToCache(query, variables) {
  return await context.runQuery(query, variables)
}
