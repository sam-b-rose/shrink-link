import fetch from 'isomorphic-unfetch'

interface EncodeUrlPayload {
  url: string
  duration?: number | string
  unit?: string
  passcode?: string
}

interface EncodeUrlResponse {
  hash: string
  expires?: number | null
}

interface DecodeUrlError {
  message?: string
  hasPasscode?: boolean
}

interface DecodeUrlResponse extends DecodeUrlError {
  id: number
  created: Date
  url: string
  expires: Date
  passcode: string
}

export const encodeUrl = async (
  payload: EncodeUrlPayload
): Promise<EncodeUrlResponse> => {
  const res = await fetch('/api/url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return res.json()
}

export const decodeUrl = async ({
  hash
}: {
  hash: string
}): Promise<DecodeUrlResponse> => {
  const res = await fetch(`/api/url/${hash}`)
  return res.json()
}

export const attemptPasscode = async ({
  hash,
  passcode
}: {
  hash: string
  passcode: string
}): Promise<DecodeUrlResponse> => {
  const res = await fetch(`/api/url/${hash}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode })
  })
  return res.json()
}

export const deleteUrl = async ({
  hash
}: {
  hash: string
}): Promise<{ message: string }> => {
  const res = await fetch(`/api/url/${hash}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  return res.json()
}

export default {
  encodeUrl,
  decodeUrl,
  deleteUrl,
  attemptPasscode
}
