import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

import { wrapLayout } from '../common/components/Layout'
import './Admin.css'


export default function Admin() {
    return wrapLayout(
      <Container className="full-viewport-height">
          <br />
          <br />
          <br />
          <br />
          <br />
          <Row className="height-60p">
              <Col xs={ { span: 6, order: 1 } }>
                  <div className="full-centered-parent border grid-box">
                      <Link to="/admin/staff">Manage Staff Accounts</Link>
                  </div>
              </Col>
              <Col xs={ { span: 6, order: 2 } }>
                  <div className="full-centered-parent border grid-box">
                      Library Settings
                  </div>
              </Col>
          </Row>
      </Container>
    )
}
