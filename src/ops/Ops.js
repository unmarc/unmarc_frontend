import React from 'react';
import { Link } from 'react-router-dom'

import { Auth } from '../auth/'


function Ops() {
  return (
    <Auth>
      <div>
        <h1>Staff Operations</h1>
        <Link to='/'>Home</Link>
      </div>
    </Auth>
  )
}

export default Ops
