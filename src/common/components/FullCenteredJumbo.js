import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'


export function FullCenteredJumbo({ children }) {
    return (
      <Jumbotron className="full-viewport-height full-centered-parent">
          { children }
      </Jumbotron>
    )
}

export function inCenteredJumbo(element) {
    return <FullCenteredJumbo children={element} />
}
