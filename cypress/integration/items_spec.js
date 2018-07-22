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
        cy.contains('Dodaj rzeczy do kupienia');
      });
    });

    it('can move back to lists overview by clicking Home button', () => {
      cy.contains('Lidl').click();
      cy.url().should('contain', '/items');
      cy.contains('Strona główna').click();
      cy.url().should('equal', `${Cypress.env('baseUrl')}/`);
    });
  });

  context('Basic interactions', () => {
    beforeEach(() => {
      cy.contains('Lidl').click();
      cy.get('.ui.header').within(() => {
        cy.contains('Lidl');
        cy.contains('Dodaj rzeczy do kupienia');
      });
    });

    it('can add new item', () => {
      cy.get('[data-cy=item-name]').children('input').type('Water').blur();
      cy.get('input[name=quantity]').type('6');
      cy.get('input[name=unit]').type('bottles');
      cy.get('input[name=price]').type('3.40');
      cy.get('button[type=submit]').click();
      cy.contains('Water');
      cy.contains('Ilość: 6 bottles');
      // cy.contains('3,40 zł');
    });

    it('can edit newly added item', () => {
      cy.get('div[role=listitem]').last().within(() => {
        cy.get('.ui.dropdown').click();
        cy.contains('Edytuj').click();
      });
      cy.get('.modal').within(() => {
        cy.contains('Edytuj rzecz');
        cy.get('input[name=name]').clear().type('Edited item');
        cy.get('input[name=quantity]').clear().type('7');
        cy.get('input[name=unit]').clear().type('units');
        cy.get('input[name=price]').clear().type('10.15');
        cy.get('button[type=submit]').click();
      });
      cy.get('div[role=listitem]').last().within(() => {
        cy.get('.header').should('contain', 'Edited item');
        cy.get('.header').should('not.contain', 'Water');
        cy.get('.description').should('contain', 'Ilość: 7 units');
        cy.get('.description').should('not.contain', '6 bottles');
        // cy.get('.description').should('contain', '10,15 zł');
        // cy.get('.description').should('not.contain', '3,40 zł');
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
        cy.get('.description').should('not.contain', 'Ilość');
        // cy.get('.description').should('not.contain', 'zł');
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
      cy.contains('Brak w sklepie');
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
        cy.get('[data-cy=delete-item]').click();
        cy.get('div[role=listitem]').should('have.length', numberOfItems - 1);
      });
    });
  });

  context('Mass actions interactions', () => {
    beforeEach(() => {
      cy.contains('Lidl').click();
      cy.get('.ui.header').within(() => {
        cy.contains('Lidl');
        cy.contains('Dodaj rzeczy do kupienia');
      });
    });

    it('cannot use remove bought items button when there are no bought items', () => {
      cy.get('div[role=listitem].bought').should('have.length', 0);
      cy.get('[data-cy=remove-bought-items]').should('have.class', 'disabled');
    });

    it('can move items with state bought to state delete', () => {
      cy.get('[data-cy=item-name]').children('input').type('Tomato{enter}');
      cy.get('[data-cy=item-name]').children('input').type('Potato{enter}');
      cy.contains('Tomato');
      cy.contains('Potato');
      cy.get('div[role=listitem].to_buy').then(($item) => {
        const numberOfItems = $item.length;
        cy.get('[data-cy=mark-bought]').each(($el, i) => {
          if (i !== 0) {
            cy.wrap($el).click();
            cy.get('div[role=listitem].to_buy').should('have.length', numberOfItems - i);
          }
        });
      });
      cy.get('div[role=listitem].to_buy').should('have.length', 1);
      cy.get('div[role=listitem].bought').should('have.length', 2);
      cy.get('[data-cy=remove-bought-items]').click();
      cy.get('.first-sublist').should('not.contain', 'Tomato');
      cy.get('.first-sublist').should('not.contain', 'Potato');
      cy.get('[data-cy=item-name]').children('input').type('tom');
      cy.get('.search-absolute').contains('Tomato');
      cy.get('[data-cy=item-name]').children('input').clear().type('pot');
      cy.get('.search-absolute').contains('Potato');
      cy.get('[data-cy=remove-bought-items]').should('have.class', 'disabled');
    });

    it('cannot use move missing items button when there are no missing items', () => {
      cy.get('div[role=listitem].missing').should('have.length', 0);
      cy.get('[data-cy=move-missing-items').should('not.exist');
    });

    it('cannot use move missing items button when there are no other lists', () => {
      cy.get('div[role=listitem].to_buy').first().within(() => {
        cy.get('[data-cy=mark-missing]').click();
      });
      cy.get('div[role=listitem].to_buy').should('have.length', 0);
      cy.get('div[role=listitem].missing').should('have.length', 1);
      cy.contains('Strona główna').click();
      cy.get('.list-segment').should('have.length', 1);
      cy.contains('Lidl').click();
      cy.get('[data-cy=move-missing-items]').should('have.class', 'disabled');
    });

    it('can move items with state missing to another list. Items change state to to_buy', () => {
      cy.contains('Strona główna').click();
      cy.contains('Stwórz listę zakupów');
      cy.get('input[name=name]').type('Biedronka{enter}');
      cy.get('.list-segment').should('have.length', 2);
      cy.contains('Lidl').click();
      cy.contains('Dodaj rzeczy do kupienia');
      cy.get('[data-cy=item-name]').children('input').type('potato{enter}');
      cy.get('div[role=listitem].to_buy').first().within(() => {
        cy.get('[data-cy=mark-missing]').click();
      });
      cy.get('div[role=listitem].missing').should('have.length', 2);
      cy.get('[data-cy=move-missing-items]').click();
      cy.contains('Biedronka').click();
      cy.get('div[role=listitem].missing').should('have.length', 0);
      cy.contains('Strona główna').click();
      cy.contains('Biedronka').click();
      cy.get('div[role=listitem].to_buy').should('have.length', 2);
      cy.get('div[role=listitem].missing').should('have.length', 0);
    });

    it('cannot move single item that is not missing to another list', () => {
      cy.contains('Strona główna').click();
      cy.contains('Biedronka').click();
      cy.get('div[role=listitem].to_buy').first().within(() => {
        cy.get('.ui.dropdown').click();
        cy.contains('Edytuj').click();
      });
      cy.get('.modal').within(() => {
        cy.contains('Edytuj');
        cy.get('.content').should('not.contain', 'Przynależna lista');
        cy.get('select[name=list_id]').should('not.exist');
      });
    });

    it('can move single item with state missing to another list', () => {
      cy.contains('Strona główna').click();
      cy.contains('Biedronka').click();
      cy.get('div[role=listitem].to_buy').first().within(() => {
        cy.get('[data-cy=mark-missing]').click();
      });
      cy.get('div[role=listitem].missing').should('have.length', 1);
      cy.get('div[role=listitem].missing').first().within(() => {
        cy.get('.ui.dropdown').click();
        cy.contains('Edytuj').click();
      });
      cy.get('.modal').within(() => {
        cy.contains('Edytuj');
        cy.get('.content').should('contain', 'Przynależna lista');
        cy.get('input[name=name]').clear().type('my moved item');
        cy.get('select[name=list_id]').select('Lidl');
        cy.get('button[type=submit]').click();
      });
      cy.get('div[role=listitem].missing').should('have.length', 0);
      cy.root().should('not.contain', 'my moved item');
      cy.contains('Strona główna').click();
      cy.contains('Lidl').click();
      cy.contains('my moved item');
    });
  });

  context('Price calculations', () => {
    before(() => {
      cy.freshItems();
    });

    beforeEach(() => {
      cy.contains('Lidl').click();
    });

    it('calculates value of all products in list', () => {
      cy.get('[data-cy=item-name]').children('input').type('Water').blur();
      cy.get('input[name=quantity]').type('6');
      cy.get('input[name=price]').type('3.40');
      cy.get('button[type=submit]').click();
      cy.contains('Wartość listy: 20,40');
      cy.get('[data-cy=item-name]').children('input').type('Chicken').blur();
      cy.get('input[name=quantity]').type('0.45');
      cy.get('input[name=price]').type('10.20');
      cy.get('button[type=submit]').click();
      cy.contains('Wartość listy: 24,99');
      cy.get('[data-cy=item-name]').children('input').type('NukaCola').blur();
      cy.get('input[name=quantity]').type('0.20');
      cy.get('input[name=price]').type('30');
      cy.get('button[type=submit]').click();
      cy.contains('Wartość listy: 30,99');
    });

    it('items that have price without quantity are added to total multiplied by 1', () => {
      cy.get('[data-cy=item-name]').children('input').type('Singular').blur();
      cy.get('input[name=price]').type('5.01');
      cy.get('button[type=submit]').click();
      cy.contains('Wartość listy: 36,00');
    });

    it('items that have quantity without price are not added to total', () => {
      cy.get('[data-cy=item-name]').children('input').type('No price').blur();
      cy.get('input[name=quantity]').type('12');
      cy.get('button[type=submit]').click();
      cy.get('.first-sublist').within(() => {
        cy.contains('No price');
      });
      cy.contains('Wartość listy: 36,00');
    });

    it('items that are ticked off add to cart value and leave list value unchanged', () => {
      cy.contains('.item.to_buy', 'Water').within(() => {
        cy.get('[data-cy=mark-bought]').click();
      });
      cy.contains('Wartość koszyka: 20,40');
      cy.contains('Wartość listy: 36,00');
    });

    it('items that are moved from to buy to missing change list value', () => {
      cy.contains('.item.to_buy', 'Chicken').within(() => {
        cy.get('[data-cy=mark-missing]').click();
      });
      cy.contains('Wartość listy: 31,41');
      cy.contains('Wartość koszyka: 20,40');
    });
  });
});
