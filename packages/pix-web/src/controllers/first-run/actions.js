import {toastError} from 'core/toaster'
import {SubmissionError} from 'redux-form'

export async function createAdminAccount({ username, password, confirmPassword }) {
  if (password !== confirmPassword) {
    throw new SubmissionError({ confirmPassword: 'Passwords do not match' })
  }

  const res = await fetch('/api/create-admin-account', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })

  if (res.status === 401) {
    return toastError('Invalid username or password')
  }

  window.location.reload()
}
