import React from 'react'
import { Route } from 'react-router-dom'

import { Home } from '../common/components'
import Ops from "../ops"

export function Routes() {
  return (
    <>
      <Route exact path='/' component={ Home }/>
      <Route path='/op' component={ Ops }/>
    </>
  )
}
