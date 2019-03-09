import fetch from 'isomorphic-unfetch'

const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT}`

export const decodeUrl = async ({ s } = { s: '' }) => {
  const res = await fetch(`${BASE_URL}/api/url/decode/${s}`)
  return await res.json()
}

export const encodeUrl = async (payload) => {
  const res = await fetch('/api/url/encode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

export default {
  decodeUrl,
  encodeUrl
}
