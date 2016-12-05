import React from 'react'
import {createGraphQLContext} from 'react-graphql'
import {print} from 'graphql-tag/printer'

const context = createGraphQLContext({
  defaultRenderLoading: props => <div>Loading</div>,
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

export async function queryToCache(query, variables) {
  return await context.runQuery(query, variables)
}
