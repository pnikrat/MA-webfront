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
      cy.contains('Stwórz listę zakupów');
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
        cy.contains('Edit').click();
      });
      cy.get('.modal').within(() => {
        cy.contains('Edit list');
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
          cy.contains('Delete shopping list');
          cy.contains('Yes').click();
        });
        cy.get('.list-segment').should('have.length', numberOfLists - 1);
      });
    });

    it('does not remove list after modal rejection', () => {
      cy.get('.list-segment').then(($el) => {
        const numberOfLists = $el.length;
        cy.get('[data-cy=delete-list-button]').first().click();
        cy.get('.modal').within(() => {
          cy.contains('No').click();
        });
        cy.get('.list-segment').should('have.length', numberOfLists);
      });
    });
  });
});
