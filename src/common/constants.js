
export const isDevEnv = process.env.NODE_ENV === 'development'
export const isTestEnv = process.env.NODE_ENV === 'test'

export const tokenRefreshDelta =
  parseInt(process.env.REACT_APP_TOKEN_REFRESH_DELTA) || 1200000 // 20 minutes
