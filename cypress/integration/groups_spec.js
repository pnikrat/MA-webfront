describe('Groups module', () => {
  before(() => {
    cy.freshGroups();
  });

  context('Basic interactions', () => {
    beforeEach(() => {
      cy.login();
      cy.get('[data-cy=groups-button]').click();
    });

    it('visits groups subpage and can see own groups and member groups', () => {
      cy.url().should('contain', '/groups');
      cy.get('[data-cy=groups-container-header]');
      cy.contains('Cypress main group');
      cy.contains('Cypress secondary group');
    });

    it('can see members of any group', () => {
      cy.contains('Cypress main group').click();
      cy.get('[data-cy=to-invite-form-button]');
      cy.url().should('match', /groups\/\d+/);
      cy.contains('CypressMain');
      cy.visit('/groups');
      cy.contains('Cypress secondary group').click();
      cy.contains('CypressMain');
      cy.contains('Cypress Secondary');
    });

    it('explains your role in group on icon hover', () => {
      cy.get('[data-cy=creator-icon]').trigger('mouseover');
      cy.contains('Jesteś właścicielem grupy');
      cy.get('[data-cy=member-icon]').trigger('mouseover');
      cy.contains('Jesteś członkiem grupy');
    });

    it('can create new group and see self as its member', () => {
      cy.get('[data-cy=to-new-group-form-button]').click();
      cy.get('[data-cy=group-name-input]');
      cy.url().should('contain', '/groups/new');
      cy.get('input[name=name]').type('My new test group');
      cy.get('button[type=submit]').click();
      cy.contains('Cypress main group');
      cy.contains('My new test group').click();
      cy.contains('CypressMain');
    });

    it('can delete only own groups. Performs the delete', () => {
      cy.contains('.list-segment', 'Cypress secondary group').within(() => {
        cy.get('[data-cy=delete-group-button]').should('not.exist');
        cy.get('[data-cy=edit-group-button]').should('not.exist');
      });
      cy.contains('.list-segment', 'My new test group').within(() => {
        cy.get('[data-cy=edit-group-button]').should('exist');
        cy.get('[data-cy=delete-group-button]').click();
      });
      cy.get('.modal').within(() => {
        cy.contains('[data-cy=modal-header]', 'Usuń grupę');
        cy.get('[data-cy=accept-modal]').click();
      });
      cy.root().should('not.contain', 'My new test group');
    });

    it('can edit own group', () => {
      cy.contains('Cypress secondary group').click();
      cy.get('[data-cy=members-list]').contains('Cypress Secondary');
      cy.get('[data-cy=groups-button]').click();
      cy.contains('.list-segment', 'Cypress main group').within(() => {
        cy.get('[data-cy=edit-group-button]').click();
      });
      cy.get('[data-cy=edit-group-form-header]');
      cy.url().should('match', /groups\/\d+\/edit/);
      cy.get('input[name=name]').should('have.value', 'Cypress main group');
      cy.get('input[name=name]').clear().type('Cypress edited group');
      cy.get('button[type=submit]').click();
      cy.get('[data-cy=to-new-group-form-button]');
      cy.root().should('not.contain', 'Cypress main group');
      cy.contains('Cypress edited group');
    });
  });

  context('Invitations', () => {
    beforeEach(() => {
      cy.login();
      cy.get('[data-cy=groups-button]').click();
    });

    it('can send an invite to non existing user for his own group. Sees appropriate flash', () => {
      cy.contains('Cypress edited group').click();
      cy.get('[data-cy=to-invite-form-button]').click();
      cy.get('[data-cy=invite-form-header]');
      cy.url().should('match', /groups\/\d+\/invite/);
      cy.get('input[name=email]').type('newtestuser@example.com');
      cy.get('button[type=submit]').click();
      cy.contains('Sukces');
      cy.contains('Wysłano zaproszenie na adres email użytkownika');
      cy.url().should('match', /groups\/\d+/);
    });

    it('can send an invite to existing user. Sees flash and user is added', () => {
      cy.contains('Cypress edited group').click();
      cy.contains('CypressMain');
      cy.root().should('not.contain', 'Cypress Secondary');
      cy.get('[data-cy=to-invite-form-button]').click();
      cy.get('input[name=email]').type('cypress@example.com');
      cy.get('button[type=submit]').click();
      cy.contains('Sukces');
      cy.contains('Użytkownik został dodany do grupy');
      cy.contains('CypressMain');
      cy.contains('Cypress Secondary');
    });

    it('can send an invite to user already in group. Sees proper error message', () => {
      cy.contains('Cypress edited group').click();
      cy.get('[data-cy=to-invite-form-button]').click();
      cy.get('input[name=email]').type('cypress@example.com');
      cy.get('button[type=submit]').click();
      cy.contains('Coś poszło nie tak');
      cy.contains('Użytkownik należy już do grupy');
      cy.get('input[name=email]').should('have.value', '');
      cy.url().should('match', /groups\/\d+\/invite/);
    });
  });

  context('Interactions with lists of other group members', () => {
    before(() => {
      cy.freshItems();
    });

    beforeEach(() => {
      cy.login('secondary');
    });

    it('can see lists of other group members', () => {
      cy.get('[data-cy=new-list-form-header]');
      cy.get('input[name=name]').type('Secondary Alma');
      cy.get('button[type=submit]').click();
      cy.get('[data-cy=lists-container]').within(() => {
        cy.contains('Lidl');
        cy.contains('Secondary Alma');
      });
      cy.get('[data-cy=logout-button]').click();
      cy.login();
      cy.get('[data-cy=new-list-form-header]');
      cy.get('[data-cy=lists-container]').within(() => {
        cy.contains('Lidl');
        cy.contains('Secondary Alma');
      });
    });

    it('can edit other group members list name', () => {
      cy.contains('.list-segment', 'Lidl').within(() => {
        cy.get('[data-cy=list-edit-button]').click();
      });
      cy.get('.modal').within(() => {
        cy.get('input[name=name]').clear().type('Primary Selgros');
        cy.get('button[type=submit]').click();
      });
      cy.get('[data-cy=lists-container').within(() => {
        cy.contains('Secondary Alma');
        cy.contains('Primary Selgros');
        cy.root().should('not.contain', 'Lidl');
      });
      cy.get('[data-cy=logout-button]').click();
      cy.login();
      cy.get('[data-cy=lists-container]').within(() => {
        cy.contains('Primary Selgros');
        cy.root().should('not.contain', 'Lidl');
      });
    });

    it('cannot delete other group members list', () => {
      cy.contains('.list-segment', 'Primary Selgros').within(() => {
        cy.get('[data-cy=delete-list-button]').should('not.exist');
      });
      cy.contains('.list-segment', 'Secondary Alma').last().within(() => {
        cy.get('[data-cy=delete-list-button]').click();
      });
      cy.get('.modal').within(() => {
        cy.get('[data-cy=accept-modal]').click();
      });
    });

    it('can add and tick off items on other group member list', () => {
      cy.contains('Primary Selgros').click();
      cy.get('[data-cy=add-item-form-header]');
      cy.get('[data-cy=item-name]').children('input').type('Other user item{enter}');
      cy.get('.first-sublist').within(() => {
        cy.contains('.item.to_buy', 'Other user item').within(() => {
          cy.get('[data-cy=mark-bought]').click();
        });
        cy.contains('.item.bought', 'Other user item');
      });
      cy.get('[data-cy=logout-button]').click();
      cy.login();
      cy.contains('Primary Selgros').click();
      cy.get('.first-sublist').within(() => {
        cy.contains('.item.bought', 'Other user item');
      });
    });
  });
});
