import ROUTES, { CrudRouteType, CRUD_ROUTES } from '~/routes'

const APP_URL = 'http://localhost:3000'

const INDEX_ROUTES = Object.keys(ROUTES)
  .map(route => {
    if (!CRUD_ROUTES.includes(route)) return
    return ROUTES[route].index
  })
  .filter(Boolean) as Array<string>

const API_URL = 'http://localhost:5333/'

describe('app', () => {
  it('end-to-end-app', () => {
    // auth
    cy.visit(APP_URL + '/')
    cy.get('input#email').type('marcelo.fatasy@hotmail.com')
    cy.get('input#password').type('admin123')
    cy.get('button[type*="submit"]').click()

    // The new url should include "/dashboard"
    cy.url().should('include', '/dashboard')

    // CRUDS
    console.log({ INDEX_ROUTES })
    INDEX_ROUTES.map(route => {
      const name = (route as string).split('/').pop() as string
      const { add, edit } = ROUTES[name] as CrudRouteType

      cy.intercept(API_URL + name + '/?').as('get' + name) // index
      cy.intercept(API_URL + name + '/add').as('post' + name) // add
      cy.intercept(API_URL + name + '/edit').as('put' + name) // edit

      // index
      cy.visit(APP_URL + route)
      cy.url().should('include', name)

      cy.wait('@get' + name)
        .its('response.statusCode')
        .should('eq', 200)

      // add
      cy.get('button#add').click()
      cy.url().should('include', '/add')
    })
  })
})

export {}
