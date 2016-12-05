import {toastError} from 'core/toaster'

export async function login({ username, password}) {
  const res = await fetch('/api/login', {
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
