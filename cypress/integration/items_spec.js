describe('Items module', () => {
  before(() => {
    cy.login();
    cy.freshItems();
  });

  beforeEach(() => {
    cy.login();
  });

  context('Accessing items overview', () => {
    it('can access items view by clicking on shopping list', () => {
      cy.contains('Lidl').click();
      cy.url().should('contain', '/items');
      cy.get('.ui.header').within(() => {
        cy.contains('Lidl');
        cy.contains('Add shopping items');
      });
    });

    it('can move back to lists overview by clicking Home button', () => {
      cy.contains('Lidl').click();
      cy.url().should('contain', '/items');
      cy.contains('Home').click();
      cy.url().should('equal', `${Cypress.env('baseUrl')}/`);
    });
  });

  context('Basic interactions', () => {
    beforeEach(() => {
      cy.contains('Lidl').click();
    });

    it('can add new item', () => {
      cy.get('[data-cy=item-name]').children('input').type('Water').blur();
      cy.get('input[name=quantity]').type('6');
      cy.get('input[name=unit]').type('bottles');
      cy.get('input[name=price]').type('3.40');
      cy.get('button[type=submit]').click();
      cy.contains('Water');
      cy.contains('Quantity: 6 bottles');
      cy.contains('3.4$');
    });

    it('can edit newly added item', () => {
      cy.get('div[role=listitem]').last().within(() => {
        cy.get('.ui.dropdown').click();
        cy.contains('Edit item').click();
      });
      cy.get('.modal').within(() => {
        cy.contains('Edit item');
        cy.get('input[name=name]').clear().type('Edited item');
        cy.get('input[name=quantity]').clear().type('7');
        cy.get('input[name=unit]').clear().type('units');
        cy.get('input[name=price]').clear().type('10.15');
        cy.get('button[type=submit]').click();
      });
      cy.get('div[role=listitem]').last().within(() => {
        cy.get('.header').should('contain', 'Edited item');
        cy.get('.header').should('not.contain', 'Water');
        cy.get('.description').should('contain', 'Quantity: 7 units');
        cy.get('.description').should('not.contain', '6 bottles');
        cy.get('.description').should('contain', '10.15$');
        cy.get('.description').should('not.contain', '3.4$');
      });
    });

    it('can add item by specifying just a name', () => {
      cy.get('div[role=listitem]').then(($el) => {
        const numberOfItems = $el.length;
        cy.get('[data-cy=item-name]').children('input').type('Apple{enter}');
        cy.get('div[role=listitem]').should('have.length', numberOfItems + 1);
      });
      cy.get('div[role=listitem]').last().within(() => {
        cy.get('.header').should('contain', 'Apple');
        cy.get('.description').should('not.contain', 'Quantity');
        cy.get('.description').should('not.contain', '$');
      });
    });

    it('cannot add item without specifying at least a name', () => {
      cy.get('[data-cy=item-name]').children('input').clear();
      cy.get('div[role=listitem]').then(($el) => {
        const numberOfItems = $el.length;
        cy.get('button[type=submit]').click();
        cy.get('div[role=listitem]').should('have.length', numberOfItems);
      });
    });

    it('can change item state to_buy to bought', () => {
      cy.get('div[role=listitem].to_buy').last().within(() => {
        cy.get('button.olive').click();
        cy.root().as('toggled');
      });
      cy.get('@toggled').should('have.class', 'bought');
    });

    it('can change item state from bought to to_buy', () => {
      cy.get('div[role=listitem].bought').last().within(() => {
        cy.get('button.grey').click();
        cy.root().as('untoggled');
      });
      cy.get('@untoggled').should('not.have.class', 'bought').should('have.class', 'to_buy');
    });

    it('can change item state from to_buy to missing', () => {
      cy.get('div[role=listitem].to_buy').last().within(() => {
        cy.get('button:not(.olive)').click();
      });
      cy.get('.second-sublist').should('exist');
      cy.get('div[role=listitem].missing').should('have.length', 1);
      cy.contains('Unavailable in shop');
    });

    it('can change item state from missing to to_buy', () => {
      cy.get('div[role=listitem].missing').last().within(() => {
        cy.get('button.grey').click();
      });
      cy.get('.second-sublist').should('not.exist');
      cy.get('div[role=listitem].missing').should('have.length', 0);
    });

    it('can remove an item', () => {
      cy.get('div[role=listitem]').then(($el) => {
        const numberOfItems = $el.length;
        cy.get('.ui.dropdown').first().click();
        cy.contains('Delete').click();
        cy.get('div[role=listitem]').should('have.length', numberOfItems - 1);
      });
    });
  });
});
