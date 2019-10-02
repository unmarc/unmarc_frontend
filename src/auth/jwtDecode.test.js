import { assert } from "chai"

import { parseJwt } from './jwtDecode'


describe("jwtDecode", () => {
  it("decodes jwt", () => {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImtvbW8iLCJleHAiOjE1NzAwMjU3NDgsIm9yaWdJYXQiOjE1NzAwMjU2ODh9.fy14raVPh1RgBhD9vTrNNTMPoG0YMioSJC1k-cahQ4M'
    let payload = parseJwt(token)
    assert.strictEqual(payload.username, "komo", 'username')
    assert.strictEqual(payload.exp, 1570025748, 'expiry')
  })

  it("decodes jwt with unicode", () => {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVcdTBlMjBpY1x1ZDgwMFx1ZGY0OWRlIiwiZXhwIjoxNTcwMDI1MTA1LCJvcmlnSWF0IjoxNTcwMDI1MDQ1fQ.whQaSW-1mW6cFUHdRezt8xebO8R3UmE-H2he7alptRQ'
    let payload = parseJwt(token)
    assert.strictEqual(payload.username, "uภic𐍉de", 'username')
    assert.strictEqual(payload.exp, 1570025105, 'expiry')
  })
})
