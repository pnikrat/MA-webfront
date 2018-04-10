Cypress.Commands.add('login', () => {
  // command used to login via backend requests instead of UI
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/auth/',
    body: {
      email: 'cypressmain@example.com',
      password: 'qwer1234',
      password_confirmation: 'qwer1234',
      first_name: 'CypressMain',
    },
    failOnStatusCode: false,
  }).then(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/auth/sign_in',
      body: {
        email: 'cypressmain@example.com',
        password: 'qwer1234',
      },
    }).then((response) => {
      const { headers } = response;
      localStorage.setItem('access-token', headers['access-token']);
      localStorage.setItem('client', headers.client);
      localStorage.setItem('uid', headers.uid);
      cy.visit('/');
    });
  });
});
