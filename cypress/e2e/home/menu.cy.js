import MenuPage from '../../pages/MenuPage';
import HomePage from '../../pages/HomePage';

describe('Validação do Menu Principal', () => {

  beforeEach(() => {
    cy.visit('/');
    MenuPage.elements.mainMenu().should('be.visible');
  });

  context('Validação dos itens principais do menu', () => {
    
    it('Deve validar que todos os itens principais estão visíveis', () => {
      const itens = [
        'O Agibank',
        'Produtos',
        'Serviços',
        'Suas finanças',
        'Seus benefícios',
        'Sua segurança',
        'Stories'
      ];

      itens.forEach(item => {
        MenuPage.validateMenuItemVisible(item);
      });
    });
  });

  context('Validação dos submenus', () => {

    it('Deve exibir corretamente o submenu de O Agibank', () => {
      MenuPage.hoverMenuItem('O Agibank');
      MenuPage.validateSubmenuItems([
        'Colunas',
        'Notícias',
        'Carreira'
      ]);
    });

    it('Deve exibir corretamente o submenu de Produtos', () => {
      MenuPage.hoverMenuItem('Produtos');
      MenuPage.validateSubmenuItems([
        'Empréstimos',
        'Conta Corrente',
        'Cartões',
        'Seguros',
        'INSS',
        'Consórcios',
        'PIX'
      ]);
    });

    it('Deve exibir corretamente o submenu de Empréstimos', () => {
      MenuPage.hoverMenuItem('Produtos');
      MenuPage.hoverMenuItem('Empréstimos');

      MenuPage.validateSubmenuItems([
        'Empréstimos Consignados',
        'Empréstimos pessoal',
        'Empréstimos na conta de luz'
      ]);
    });

  });

  context('Validação de navegação via menu', () => {

    it('Deve navegar para Colunas', () => {
      MenuPage.navigateThroughMenu(['O Agibank', 'Colunas']);
      HomePage.validatePageLoaded('Colunas');
    });

    it('Deve navegar para Notícias', () => {
      MenuPage.navigateThroughMenu(['O Agibank', 'Notícias']);
      HomePage.validatePageLoaded('Notícias');
    });

    it('Deve navegar para Carreira', () => {
      MenuPage.navigateThroughMenu(['O Agibank', 'Carreira']);
      HomePage.validatePageLoaded('Carreira');
    });

    it('Deve navegar para Empréstimos Pessoal', () => {
      MenuPage.navigateThroughMenu(['Produtos', 'Empréstimos', 'Empréstimos pessoal']);
      HomePage.validatePageLoaded('Empréstimos pessoal');
    });

  });

});
