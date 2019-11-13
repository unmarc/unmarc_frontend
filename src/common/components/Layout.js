import React from 'react'
import TopNav from './TopNav'
import Container from 'react-bootstrap/Container'


export default function Layout({ children }) {
    return (
      <Container fluid>
          <TopNav />
          <Container>
              { children }
          </Container>
      </Container>
    )
}
