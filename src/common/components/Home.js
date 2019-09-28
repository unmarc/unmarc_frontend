import React from 'react'
import { Link } from 'react-router-dom'


export function Home() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>UNMARC</h1>
        <Link to='/op'>Staff</Link>
      </div>
    </div>
  )
}