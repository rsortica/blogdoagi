class MenuPage {
  elements = {
    mainMenu: () => cy.get('nav'), // ajuste conforme o seletor real
    menuItem: (itemText) => cy.contains('a', itemText),
    submenuContainer: () => cy.get('.sub-menu, .dropdown, nav'), // ajustar conforme o site
    submenuItem: (itemText) => cy.contains('a', itemText)
  };

  validateMenuItemVisible(itemText) {
    this.elements.menuItem(itemText).should('be.visible');
  }

  hoverMenuItem(itemText) {
    this.elements.menuItem(itemText).trigger('mouseover');
  }

  validateSubmenuItems(list) {
    list.forEach(item => {
      this.elements.submenuItem(item).should('be.visible');
    });
  }

  navigateThroughMenu(pathArray) {
    pathArray.forEach((item, index) => {
      if (index === pathArray.length - 1) {
        this.elements.submenuItem(item).click({ force: true });
      } else {
        this.hoverMenuItem(item);
      }
    });
  }
}

export default new MenuPage();
