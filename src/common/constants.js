
export const isDevEnv = process.env.NODE_ENV === 'development'
export const isTestEnv = process.env.NODE_ENV === 'test'

/* -----------------------------------------------------/
 * Check every 5 minutes if token will expire
 * and set expiry offset to (minus) 6 minutes so that
 * expiry check always returns true in the last 5 minutes
 */
export const refreshTokenCheckInterval =
  parseInt(process.env.REACT_APP_REFRESH_TOKEN_CHECK_INTERVAL) || 300000 // every 5 minutes

export const tokenExpiryNegativeOffset =
  parseInt(process.env.REACT_APP_TOKEN_EXPIRY_CHECK_NEGATIVE_OFFSET) || 360000 // 6 minutes before expiry

/*-----------------------------------------------------------------------------*/