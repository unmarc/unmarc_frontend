import React from 'react'
import { Route } from 'react-router-dom'

import { Home } from '../common/components'

export function Routes() {
  return (
    <>
      <Route exact path='/' component={ Home }/>
    </>
  )
}
