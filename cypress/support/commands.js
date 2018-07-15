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

Cypress.Commands.add('freshItems', () => {
  // command used to delete all user lists and create one new to get a fresh items state
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/auth/sign_in',
    body: {
      email: 'cypressmain@example.com',
      password: 'qwer1234',
    },
  }).then((response) => {
    const { headers } = response;
    cy.request({
      method: 'GET',
      url: 'http://localhost:4000/lists/',
      headers,
    }).then((responseIndex) => {
      if (responseIndex.body.length > 0) {
        responseIndex.body.forEach((list) => {
          cy.request({
            method: 'DELETE',
            url: `http://localhost:4000/lists/${list.id}`,
            headers,
          });
        });
      }
    });
    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/lists/',
      body: {
        name: 'Lidl',
      },
      headers,
    });
  });
});

Cypress.Commands.add('freshGroups', () => {
  // command used to delete all user groups and create new ones for fresh state
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/auth/sign_in',
    body: {
      email: 'cypressmain@example.com',
      password: 'qwer1234',
    },
  }).then((response) => {
    const { headers } = response;
    cy.request({
      method: 'GET',
      url: 'http://localhost:4000/groups/',
      headers,
    }).then((responseIndex) => {
      if (responseIndex.body.length > 0) {
        responseIndex.body.forEach((group) => {
          cy.request({
            method: 'DELETE',
            url: `http://localhost:4000/groups/${group.id}`,
            headers,
          });
        });
      }
    });
    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/groups/',
      body: {
        name: 'Cypress main group',
      },
      headers,
    });
  });

  cy.registerTestUser();
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/auth/sign_in',
    body: {
      email: 'cypress@example.com',
      password: 'qwer1234',
    },
  }).then((response) => {
    const { headers } = response;
    cy.request({
      method: 'GET',
      url: 'http://localhost:4000/groups/',
      headers,
    }).then((responseIndex) => {
      if (responseIndex.body.length > 0) {
        responseIndex.body.forEach((group) => {
          cy.request({
            method: 'DELETE',
            url: `http://localhost:4000/groups/${group.id}`,
            headers,
          });
        });
      }
    });
    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/groups/',
      body: {
        name: 'Cypress secondary group',
      },
      headers,
    }).then((responseGroupCreation) => {
      const { id: groupId } = responseGroupCreation.body;
      headers.Accept = 'application/json';
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/invites',
        body: {
          email: 'cypressmain@example.com',
          invitable_id: groupId,
          invitable_type: 'Group',
        },
        headers,
      });
    });
  });
});

Cypress.Commands.add('registerTestUser', () => {
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

Cypress.Commands.add('destroyTestUser', () => {
  // get access token and client headers required for delete if test user exists
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/auth/sign_in',
    body: { email: 'cypress@example.com', password: 'qwer1234' },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      const { headers } = response;
      // remove test user groups to prevent foreign key violation
      cy.request({
        method: 'GET',
        url: 'http://localhost:4000/groups/',
        headers,
      }).then((responseIndex) => {
        if (responseIndex.body.length > 0) {
          responseIndex.body.forEach((group) => {
            cy.request({
              method: 'DELETE',
              url: `http://localhost:4000/groups/${group.id}`,
              headers,
            });
          });
        }
      });
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
