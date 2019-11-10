
const authStatusUrl = '/auth-status/'
const returnUserNotLoggedIn = () => ({ userIsLoggedIn: false })
const returnUserISLoggedIn = () => ({ userIsLoggedIn: true })


context('App', () => {
    beforeEach(() => {
        cy.server()
        cy.route('HEAD', '/_h/', () => ({}))
    })

    context('On startup', () => {

        it("should render Login page if previous session doesn't exist", () => {
            cy.route(authStatusUrl, returnUserNotLoggedIn)
              .as('getAuthStatus')

            cy.visit('/')
            cy.wait('@getAuthStatus')
            cy.get('button[type="submit"]').should('have.text', 'Login')
        })

        it("should render Private page if previous session exists", () => {
            cy.route(authStatusUrl, returnUserISLoggedIn)
              .as('getAuthStatus')

            cy.visit('/')
            cy.wait('@getAuthStatus')
            cy.get('nav').should('contain', 'logout')
        })

        it("shows loading indicator initially", () => {
            cy.route({
                url: authStatusUrl,
                delay: 1000,
                response: {}
            }).as('delayedResponse')
            cy.visit('/')
            cy.get('body').should('contain', 'Starting...')
        })

        it("shows appropriate message on fetch/network error", () => {
            cy.route({
                url: authStatusUrl,
                status: 500,
                response: {}
            }).as('errorResponse')
            cy.visit('/')
            cy.get('body').should('contain', 'Could not connect to server')
        })

    })

    context('Authentication', () => {

        it('shows appropriate error if wrong credentials', () => {
            cy.route(authStatusUrl, returnUserNotLoggedIn)
              .as('getAuthStatus')

            cy.route({
                method: 'POST',
                url: '/login/',
                status: 401,
                response: {}
            }).as('invalidLogin')

            cy.visit('/')
            cy.get('input[name=username]').type('foo')
            cy.get('input[name=password]').type('bar')
            cy.get('form').submit()
            cy.wait('@invalidLogin')
            cy.get('form').should('contain', 'Invalid username/password')
        })

        it('shows appropriate error if network/fetch error', () => {
            cy.route(authStatusUrl, returnUserNotLoggedIn)
              .as('getAuthStatus')

            cy.route({
                method: 'POST',
                url: '/login/',
                status: 500,
                response: {}
            }).as('failedLogin')

            cy.visit('/')
            cy.get('input[name=username]').type('foo')
            cy.get('input[name=password]').type('bar')
            cy.get('form').submit()
            cy.wait('@failedLogin')
            cy.get('form').should('contain', 'Oops... something didn\'t go as expected')
        })

        it('should login successfully with correct credentials', () => {
            cy.route(authStatusUrl, returnUserNotLoggedIn)
              .as('getAuthStatus')

            cy.route({
                method: 'POST',
                url: '/login/',
                status: 200,
                response: {}
            }).as('postLogin')

            cy.visit('/')
            cy.get('input[name=username]').type('foo')
            cy.get('input[name=password]').type('bar')
            cy.get('form').submit()
            cy.wait('@postLogin')
            cy.get('nav').should('contain', 'logout')
        })

    })
})
