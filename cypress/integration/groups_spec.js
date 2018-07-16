describe('Groups module', () => {
  before(() => {
    cy.freshGroups();
  });

  context('Basic interactions', () => {
    beforeEach(() => {
      cy.login();
      cy.contains('Groups').click();
    });

    it('visits groups subpage and can see own groups and member groups', () => {
      cy.url().should('contain', '/groups');
      cy.contains('Groups');
      cy.contains('Cypress main group');
      cy.contains('Cypress secondary group');
    });

    it('can see members of any group', () => {
      cy.contains('Cypress main group').click();
      cy.contains('Invite new member');
      cy.url().should('match', /groups\/\d+/);
      cy.contains('CypressMain');
      cy.visit('/groups');
      cy.contains('Cypress secondary group').click();
      cy.contains('CypressMain');
      cy.contains('Cypress Secondary');
    });

    it('explains your role in group on icon hover', () => {
      cy.get('[data-cy=creator-icon]').trigger('mouseover');
      cy.contains('You are group creator');
      cy.get('[data-cy=member-icon]').trigger('mouseover');
      cy.contains('You are group member');
    });

    it('can create new group and see self as its member', () => {
      cy.contains('Create new group').click();
      cy.contains('Group name');
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
        cy.contains('Delete group');
        cy.contains('.button', 'Yes').click();
      });
      cy.root().should('not.contain', 'My new test group');
    });

    it('can edit own group', () => {
      cy.contains('Cypress secondary group').click();
      cy.get('[data-cy=members-list]').contains('Cypress Secondary');
      cy.get('.custom-menu.menu').within(() => {
        cy.contains('Groups').click();
      });
      cy.contains('.list-segment', 'Cypress main group').within(() => {
        cy.get('[data-cy=edit-group-button]').click();
      });
      cy.contains('Edit Cypress main group');
      cy.url().should('match', /groups\/\d+\/edit/);
      cy.get('input[name=name]').should('have.value', 'Cypress main group');
      cy.get('input[name=name]').clear().type('Cypress edited group');
      cy.get('button[type=submit]').click();
      cy.contains('Create new group');
      cy.root().should('not.contain', 'Cypress main group');
      cy.contains('Cypress edited group');
    });
  });

  context('Invitations', () => {
    beforeEach(() => {
      cy.login();
      cy.contains('Groups').click();
    });

    it('can send an invite to non existing user for his own group. Sees appropriate flash', () => {
      cy.contains('Cypress edited group').click();
      cy.contains('Invite new member').click();
      cy.contains('Invite new user to Cypress edited group');
      cy.url().should('match', /groups\/\d+\/invite/);
      cy.get('input[name=email]').type('newtestuser@example.com');
      cy.get('button[type=submit]').click();
      cy.contains('Success');
      cy.contains('Invitation successfully sent');
      cy.url().should('match', /groups\/\d+/);
    });

    it('can send an invite to existing user. Sees flash and user is added', () => {
      cy.contains('Cypress edited group').click();
      cy.contains('CypressMain');
      cy.root().should('not.contain', 'Cypress Secondary');
      cy.contains('Invite new member').click();
      cy.get('input[name=email]').type('cypress@example.com');
      cy.get('button[type=submit]').click();
      cy.contains('Success');
      cy.contains('User has been added to group');
      cy.contains('CypressMain');
      cy.contains('Cypress Secondary');
    });

    it('can send an invite to user already in group. Sees proper error message', () => {
      cy.contains('Cypress edited group').click();
      cy.contains('Invite new member').click();
      cy.get('input[name=email]').type('cypress@example.com');
      cy.get('button[type=submit]').click();
      cy.contains('Something went wrong');
      cy.contains('User already in group');
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
      cy.contains('Create shopping list');
      cy.get('input[name=name]').type('Secondary Alma');
      cy.get('button[type=submit]').click();
      cy.get('[data-cy=lists-container]').within(() => {
        cy.contains('Lidl');
        cy.contains('Secondary Alma');
      });
      cy.contains('Sign out').click();
      cy.login();
      cy.contains('Create shopping list');
      cy.get('[data-cy=lists-container]').within(() => {
        cy.contains('Lidl');
        cy.contains('Secondary Alma');
      });
    });

    it('can edit other group members list name', () => {
      cy.contains('.list-segment', 'Lidl').within(() => {
        cy.contains('Edit').click();
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
      cy.contains('Sign out').click();
      cy.login();
      cy.get('[data-cy=lists-container]').within(() => {
        cy.contains('Primary Selgros');
        cy.root().should('not.contain', 'Lidl');
      });
    });

    it('cannot delete other group members list', () => {
      cy.contains('.list-segment', 'Primary Selgros').within(() => {
        cy.root().should('not.contain', 'Delete');
      });
      cy.contains('.list-segment', 'Secondary Alma').last().within(() => {
        cy.contains('Delete').click();
      });
      cy.get('.modal').within(() => {
        cy.contains('Yes').click();
      });
    });

    it('can add and tick off items on other group member list', () => {
      cy.contains('Primary Selgros').click();
      cy.contains('Add shopping items');
      cy.get('[data-cy=item-name]').children('input').type('Other user item{enter}');
      cy.get('.first-sublist').within(() => {
        cy.contains('.item.to_buy', 'Other user item').within(() => {
          cy.get('[data-cy=mark-bought]').click();
        });
        cy.contains('.item.bought', 'Other user item');
      });
      cy.contains('Sign out').click();
      cy.login();
      cy.contains('Primary Selgros').click();
      cy.get('.first-sublist').within(() => {
        cy.contains('.item.bought', 'Other user item');
      });
    });
  });
});
