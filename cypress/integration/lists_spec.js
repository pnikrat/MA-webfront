describe('Lists module', () => {
  before(() => {
    cy.login();
    cy.freshItems();
  });

  context('Basic interactions', () => {
    beforeEach(() => {
      cy.login();
    });

    it('shows shopping lists dashboard on home page with new list form', () => {
      cy.get('[data-cy=new-list-form-header]');
      cy.url().should('equal', `${Cypress.env('baseUrl')}/`);
    });

    it('can add new shopping list', () => {
      cy.get('input[name=name]').type('Lidl');
      cy.get('button[type=submit]').click();
      cy.get('input[name=name]').should('have.value', '');
      cy.get('.list-segment').within(() => {
        cy.contains('Lidl');
      });
    });

    it('can edit newly added shopping list', () => {
      cy.get('.list-segment').last().within(() => {
        cy.get('[data-cy=list-edit-button]').click();
      });
      cy.get('.modal').within(() => {
        cy.contains('[data-cy=modal-header]', 'Edytuj listę zakupów');
        cy.get('input[name=name]').should('have.value', 'Lidl');
        cy.get('input[name=name]').clear().type('Piotr i Pawel');
        cy.get('button[type=submit]').click();
      });
      cy.get('.list-segment').last().within(() => {
        cy.contains('Piotr i Pawel');
      });
    });

    it('cannot add new shopping list without specyfing name', () => {
      cy.get('input[name=name]').clear();
      cy.get('.list-segment').then(($el) => {
        const numberOfLists = $el.length;
        cy.get('button[type=submit]').click();
        cy.get('.list-segment').should('have.length', numberOfLists);
      });
    });

    it('removes list after modal confirmation', () => {
      cy.get('.list-segment').then(($el) => {
        const numberOfLists = $el.length;
        cy.get('[data-cy=delete-list-button]').first().click();
        cy.get('.modal').within(() => {
          cy.contains('[data-cy=modal-header]', 'Usuń listę zakupów');
          cy.get('[data-cy=accept-modal]').click();
        });
        cy.get('.list-segment').should('have.length', numberOfLists - 1);
      });
    });

    it('does not remove list after modal rejection', () => {
      cy.get('.list-segment').then(($el) => {
        const numberOfLists = $el.length;
        cy.get('[data-cy=delete-list-button]').first().click();
        cy.get('.modal').within(() => {
          cy.get('[data-cy=dismiss-modal]').click();
        });
        cy.get('.list-segment').should('have.length', numberOfLists);
      });
    });
  });
});
