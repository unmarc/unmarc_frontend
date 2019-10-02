
export const isDevEnv = process.env.NODE_ENV === 'development'
export const isTestEnv = process.env.NODE_ENV === 'test'

export const tokenExpiryNegativeOffset =
  parseInt(process.env.REACT_APP_TOKEN_EXPIRY_CHECK_NEGATIVE_OFFSET) || 360000 // 6 minutes before expiry

export const refreshTokenCheckInterval =
  parseInt(process.env.REACT_APP_REFRESH_TOKEN_CHECK_INTERVAL) || 300000 // every 5 minutes
