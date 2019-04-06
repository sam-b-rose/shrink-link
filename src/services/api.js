import fetch from 'isomorphic-unfetch'

export const encodeUrl = async (payload) => {
  const res = await fetch('/api/url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

export const decodeUrl = async ({ hash }) => {
  const res = await fetch(`/api/url/${hash}`)
  return await res.json()
}

export const attemptPasscode = async ({ hash, passcode }) => {
  const res = await fetch(`/api/url/${hash}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({ passcode })
  })
  return await res.json()
}

export default {
  encodeUrl,
  decodeUrl,
  attemptPasscode
}
