import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'


export function JumbotronXYCentered({ children }) {
  return (
    <Jumbotron className="full-viewport-height full-centered-parent">
      { children }
    </Jumbotron>
  )
}
