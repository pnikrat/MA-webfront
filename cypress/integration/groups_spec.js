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
  });
});
