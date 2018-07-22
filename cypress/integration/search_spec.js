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
      // cy.get('.first-sublist').contains('10,00 zł');
      cy.get('.first-sublist').contains('Bread');
      // cy.get('.first-sublist').contains('4,45 zł');
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
      // cy.get('.first-sublist').contains('4,45 zł');
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
      // cy.get('.first-sublist').contains('3,45 zł');
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
});
