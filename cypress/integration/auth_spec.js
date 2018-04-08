describe('Authentication related functions test', () => {
  it('visits login form and signs in', () => {
    cy.visit('/');
    cy.root().should('not.contain', 'Sign out');
    cy.contains('Sign in').click();
    cy.url().should('include', '/signin');
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password').type('qwer1234');
    cy.contains('Sign in').click();
    cy.contains('Sign out');
  });

  context('Registration', () => {
    before(() => {
      // get access token and client headers if test user exists
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/auth/sign_in',
        body: { email: 'cypress@example.com', password: 'qwer1234' },
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status === 200) {
          const { headers } = response;
          // remove test user to prevent unique email validation fail
          cy.request({
            method: 'DELETE',
            url: 'http://localhost:4000/auth/',
            body: { uid: 'cypress@example.com' },
            headers: {
              'access-token': headers['access-token'],
              client: headers.client
            }
          });
        }
      });
    });

    it('visits register form and signs up', () => {
      cy.visit('/');
      cy.root().should('not.contain', 'Sign out');
      cy.contains('Sign up').click();
      cy.url().should('include', '/signup');
      cy.get('input[name=email]').type('cypress@example.com');
      cy.get('input[name=password').type('qwer1234');
      cy.get('input[name=passwordConfirmation]').type('qwer1234');
      cy.get('input[name=firstName]').type('First name');
      cy.get('input[name=lastName]').type('Last name');
      cy.contains('Sign up').click();
      cy.contains('Sign out');
    });
  });
});
