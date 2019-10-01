import { assert } from "chai"
import { authContext } from "./authService"

describe("authContext", () => {
  it("hasTokens returns correct status", function() {
    assert.isFalse(authContext.hasTokens, 'returns false when tokens are unset')
    authContext.setTokens('abcd', 'efgh')
    assert.isTrue(authContext.hasTokens, 'returns true after tokens are set')
  });
});