describe('Authentication module', () => {
  context('Login', () => {
    beforeEach(() => {
      // create test user for login purposes
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/auth/sign_up',
        body: {
          email: 'cypress@example.com',
          password: 'qwer1234',
          passwordConfirmation: 'qwer1234',
          firstName: 'Cypress',
        },
        failOnStatusCode: false,
      });
    });

    it('visits login form and signs in', () => {
      cy.visit('/');
      cy.root().should('not.contain', 'Sign out');
      cy.contains('Sign in').click();
      cy.url().should('include', '/signin');
      cy.get('input[name=email]').type('cypress@example.com');
      cy.get('input[name=password').type('qwer1234');
      cy.contains('Sign in').click().should(() => {
        expect(localStorage.getItem('uid')).to.eq('cypress@example.com');
        expect(localStorage.getItem('access-token')).not.to.eq(null);
        expect(localStorage.getItem('client')).not.to.eq(null);
      });
      cy.contains('Sign out');
    });

    it('renders proper error on invalid login', () => {
      cy.visit('/signin');
      cy.get('input[name=email]').type('fakeuperroruser@example.com');
      cy.get('input[name=password').type('qwer1234{enter}');
      cy.get('.negative.message').should('be.visible').and('contain', 'Login failed!');
      cy.url().should('include', '/signin');
    });

    it('prevents form submit on empty required fields', () => {
      cy.visit('/signin');
      cy.get('input[name=email]').type('cypress@example.com{enter}');
      cy.url().should('include', '/signin');
      cy.get('input[name=email]').clear();
      cy.get('input[name=password').type('qwer1234{enter}');
      cy.url().should('include', '/signin');
    });

    it('redirects to login form on unauthorized access', () => {
      cy.clearLocalStorage();
      cy.visit('/list/1/items');
      cy.url().should('include', '/signin');
    });

    it('user can move from login form to signup form via link', () => {
      cy.visit('/signin');
      cy.get('a[href="/signup"]').click();
      cy.url().should('include', '/signup');
    });
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
      cy.contains('Sign up').click().should(() => {
        expect(localStorage.getItem('uid')).to.eq('cypress@example.com');
        expect(localStorage.getItem('access-token')).not.to.eq(null);
        expect(localStorage.getItem('client')).not.to.eq(null);
      });
      cy.contains('Sign out');
    });

    it('renders proper error on trying to register on occupied email', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/auth/sign_up',
        body: {
          email: 'cypress@example.com',
          password: 'qwer1234',
          passwordConfirmation: 'qwer1234',
          firstName: 'Cypress',
        },
        failOnStatusCode: false,
      });
      cy.visit('/signup');
      cy.get('input[name=email]').type('cypress@example.com');
      cy.get('input[name=password').type('qwer1234');
      cy.get('input[name=passwordConfirmation]').type('qwer1234');
      cy.get('input[name=firstName]').type('First name{enter}');
      cy.contains('has already been taken');
      cy.url().should('include', '/signup');
    });

    it('prevents form submit on empty required fields', () => {
      cy.visit('/signup');
      cy.get('input[name=password').type('qwer1234');
      cy.get('input[name=passwordConfirmation]').type('qwer1234');
      cy.get('input[name=firstName]').type('First name{enter}');
      cy.url().should('contain', '/signup');
      cy.get('input[name=email]').type('random@example.com');
      cy.get('input[name=passwordConfirmation]').clear().type('notmatching{enter}');
      cy.contains('Passwords do not match');
      cy.url().should('contain', '/signup');
    });

    it('user can move from signup form to login form via link', () => {
      cy.visit('/signup');
      cy.get('a[href="/signin"]').click();
      cy.url().should('include', '/signin');
    });
  });

  context('Logout', () => {
    it('can logout and is returned to landing page', () => {
      cy.login();
      cy.contains('Sign out').click();
      cy.contains('Sign in');
      cy.should('not.contain', 'Sign out');
    });
  });
});