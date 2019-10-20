export interface UrlResponse {
  message?: string
  hasPasscode?: boolean
  url?: string
  hash: string
  expires: string
  passcode: string
}

export interface NotificationData {
  type?: 'error' | 'success'
  message?: string
}
