import React from 'react'
import { wrapLayout } from './Layout'
import FullCenteredJumbo from './FullCenteredJumbo'


export function Home() {
    return wrapLayout(
      <FullCenteredJumbo>
          <h2>Home</h2>
      </FullCenteredJumbo>
    )
}
