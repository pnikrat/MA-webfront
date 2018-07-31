describe('Search module', () => {
  before(() => {
    cy.login();
    cy.freshItems();
  });

  beforeEach(() => {
    cy.login();
    cy.contains('Lidl').click();
    cy.get('[data-cy=add-item-form-header]');
    cy.contains('Lidl');
  });

  context('Searching previous items', () => {
    it('can create brand new items from search input', () => {
      cy.get('[data-cy=item-name]').children('input').type('Brand new item');
      cy.get('input[name=price]').type('10');
      cy.get('button[type=submit]').click();
      cy.get('[data-cy=item-name]').children('input').type('Bread');
      cy.get('input[name=price]').type('4.45');
      cy.get('button[type=submit]').click();
      cy.get('.first-sublist').contains('Brand new item');
      cy.get('.first-sublist').contains(/10,00\szł/);
      cy.get('.first-sublist').contains('Bread');
      cy.get('.first-sublist').contains(/4,45\szł/);
    });

    it('can mark just added items as deleted', () => {
      cy.get('div[role=listitem]').then(($item) => {
        const numberOfItems = $item.length;
        cy.get('.item.to_buy').each(($el) => {
          cy.wrap($el).find('.ui.dropdown').click();
          cy.get('[data-cy=delete-item]').first().click();
          cy.get('div[role=listitem]').should('have.length', numberOfItems - 1);
        });
      });
      cy.get('.first-sublist').should('not.contain', 'Brand new item');
      cy.get('.first-sublist').should('not.contain', 'Bread');
    });

    it('can search through previous items', () => {
      cy.get('[data-cy=item-name]').children('input').type('Br');
      cy.get('.search-absolute').contains('Brand new item');
      cy.get('.search-absolute').contains('Bread');
      cy.get('[data-cy=item-name]').children('input').type('ea');
      cy.get('.search-absolute').contains('Bread');
      cy.get('.search-absolute').should('not.contain', 'Brand new item');
      cy.get('[data-cy=item-name]').children('input').clear().type('Bran');
      cy.get('.search-absolute').contains('Brand new item');
      cy.get('.search-absolute').should('not.contain', 'Bread');
    });

    it('can click on search result to add an item. Search doesnt show already added item', () => {
      cy.get('[data-cy=item-name]').children('input').type('Brea');
      cy.get('.search-absolute').contains('Bread').click();
      cy.get('[data-cy=item-name]').children('input').should('be.empty');
      cy.get('.first-sublist').contains('Bread');
      cy.get('.first-sublist').contains(/4,45\szł/);
      cy.get('[data-cy=item-name]').children('input').type('Brea');
      cy.get('.search-absolute').should('not.contain', 'Bread');
    });

    it('can type item present in list to search and confirm, will perform edit', () => {
      cy.get('div[role=listitem]').then(($el) => {
        const numberOfItems = $el.length;
        cy.get('[data-cy=item-name]').children('input').type('bReAD'); // case insensitive uniqueness
        cy.get('input[name=price]').type('3.45');
        cy.get('input[name=quantity]').type('2');
        cy.get('button[type=submit]').click();
        cy.get('div[role=listitem]').should('have.length', numberOfItems); // edit instead of add
      });
      cy.get('.first-sublist').contains('bReAD');
      cy.get('.first-sublist').contains(/3,45\szł/);
      cy.get('.first-sublist').contains('Ilość: 2');
    });

    it('can remove item from search results for good', () => {
      cy.get('[data-cy=item-name]').children('input').type('brand');
      cy.get('.search-result').first().find('.circular.button').click();
      cy.get('.search-absolute').should('not.be.visible');
      cy.get('.first-sublist').should('not.contain', 'brand new item');
      cy.get('[data-cy=item-name]').children('input').type('bran');
      cy.get('.search-absolute').should('not.be.visible');
    });
  });

  context('Searching through items from other lists', () => {
    it('adds deleted item to other list. Searches in first one show item from other one', () => {
      cy.get('[data-cy=lists-button]').click();
      cy.get('[data-cy=new-list-form-header]');
      cy.get('input[name=name]').type('Biedronka');
      cy.get('button[type=submit]').click();
      cy.contains('.list-segment', 'Biedronka').click();
      cy.get('[data-cy=add-item-form-header]');
      cy.get('[data-cy=item-name]').children('input').type('Brocolli');
      cy.get('input[name=quantity]').type(5);
      cy.get('input[name=unit]').type('flowers');
      cy.get('button[type=submit]').click();
      cy.contains('.item.to_buy', 'Brocolli').within(() => {
        cy.get('.ui.dropdown').first().click();
        cy.get('[data-cy=delete-item]').first().click();
      });
      cy.get('[data-cy=lists-button]').click();
      cy.contains('Lidl').click();
      cy.get('[data-cy=add-item-form-header]');
      cy.contains('.item.to_buy', 'bReAD').within(() => {
        cy.get('.ui.dropdown').first().click();
        cy.get('[data-cy=delete-item]').first().click();
      });
      cy.get('.first-sublist').should('not.contain', 'bReAD');
      cy.get('[data-cy=item-name]').children('input').type('Br');
      cy.get('.search-absolute').contains('Brocolli');
      cy.get('.search-absolute').contains('bReAD');
      cy.get('.search-absolute').contains('Ilość: 2');
      cy.get('.search-absolute').should('not.contain', 'flowers');
    });

    it('can click item from another list to add it to current one', () => {
      cy.get('[data-cy=item-name]').children('input').type('Br');
      cy.get('.search-absolute').contains('Brocolli').click();
      cy.get('.first-sublist').contains('Brocolli');
      cy.get('.first-sublist').should('not.contain', 'flowers');
      cy.get('[data-cy=item-name]').children('input').type('Br');
      // uncomment when search has its bug fixed
      // cy.get('.search-absolute').should('not.contain', 'Brocolli');
    });

    it('added item is still present on another list', () => {
      cy.get('[data-cy=lists-button]').click();
      cy.contains('.list-segment', 'Biedronka').click();
      cy.get('[data-cy=add-item-form-header]');
      cy.get('[data-cy=item-name]').children('input').type('Br');
      cy.get('.search-absolute').contains('Brocolli').click();
      cy.get('.first-sublist').should('contain', 'flowers');
    });
  });
});
