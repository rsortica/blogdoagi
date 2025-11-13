# 🧪 Projeto de Automação de Testes E2E - Blog Agibank (Demonstração Técnica)

Este repositório contém a implementação de testes automatizados end-to-end do Blog Agibank utilizando **Cypress 15.5.0**, aplicando padrões profissionais de automação moderna:

- POM (Page Object Model)
- DRY (Don't Repeat Yourself)
- Clean Code aplicados a testes
- Cenários positivos, negativos, usabilidade e responsividade
- Validação funcional + validação mínima de estrutura de conteúdo
- Integração com **cypress-axe** para testes de acessibilidade.

---

## 🚀 Objetivo

Demonstrar senioridade técnica em automação de testes frontend, cobrindo os principais fluxos de navegação do Blog Agibank em ambiente de produção público.

- Cobertura esperada: **>=80% dos fluxos essenciais**
- Estrutura escalável baseada em **Page Objects**.
- **Validação funcional e estrutural** dos fluxos principais.
- Testes de **usabilidade e acessibilidade (WCAG)** automatizados.
- Execução contínua via **GitHub Actions**.
---

## 🧩 Tecnologias

| Componente | Versão |
|------------|--------|
| Cypress | 15.5.0 |
| Node | recomendado LTS >= 20.x |
| Package Manager | npm |


| Categoria | Ferramenta | Função |
|------------|-------------|--------|
| Test Runner | [Cypress](https://www.cypress.io/) | Execução de testes e2e |
| Accessibility | [cypress-axe](https://github.com/component-driven/cypress-axe) | Validação de acessibilidade (WCAG 2.1) |
| Reporter | [Mochawesome](https://github.com/adamgruber/mochawesome) | Relatórios em HTML/JSON |
| CI/CD | [GitHub Actions](https://docs.github.com/en/actions) | Execução automática em pipeline |
| Design Padrão | Page Object Model (POM) | Separação de responsabilidades e reuso de código |

---

## Estrutura do Projeto

## 🏗️ Arquitetura do Projeto de Automação — Blog do Agi (Cypress + POM + Acessibilidade)

Abaixo está a representação visual da estrutura do projeto, seguindo boas práticas de automação com **Cypress**, **Page Object Model (POM)** e integração com **cypress-axe** para testes de acessibilidade.

```bash
blogdoagi-cypress/
│
├── .github/
│   └── workflows/
│       └── cypress-ci.yml          # 🔁 Execução automática dos testes no GitHub Actions
│
├── cypress/
│   ├── e2e/                        # 🧪 Testes automatizados E2E
│   │   ├── blog/
│   │   │   ├── homepage.cy.js               # 🏠 Testes da página inicial
│   │   │   ├── search_and_article.cy.js     # 🔍 Testes de busca e leitura de artigos
│   │   │   ├── navigation.cy.js             # 🌐 Testes de navegação e menus
│   │   │   └── accessibility.cy.js          # ♿ Testes automáticos de acessibilidade
│   │   └── api/
│   │       └── example_api.cy.js            # ⚙️ (Opcional) Testes de API
│   │
│   ├── fixtures/                  # 📘 Dados estáticos e massas de teste
│   │   ├── searchTerms.json
│   │   └── accessibilityRules.json
│   │
│   ├── pages/                     # 🧩 Page Object Model (POM)
│   │   ├── BasePage.js            # ⚙️ Classe base com métodos comuns
│   │   ├── HomePage.js            # 🏠 Página inicial
│   │   ├── SearchResultsPage.js   # 🔍 Resultados da busca
│   │   └── ArticlePage.js         # 📄 Página de artigo
│   │
│   ├── support/                   # 🧠 Comandos customizados e utilitários
│   │   ├── commands.js            # ⚡ Cypress.Commands customizados
│   │   ├── e2e.js                 # 🧩 Configurações globais e imports
│   │   └── accessibility.js       # ♿ Integração com cypress-axe
│   │
│   └── downloads/                 # 📂 Diretório opcional para downloads
│
├── reports/
│   ├── mochawesome-report/        # 📊 Relatórios HTML e JSON
│   └── accessibility/             # ♿ Relatórios de acessibilidade
│
├── screenshots/                   # 📸 Screenshots automáticos de falhas
├── videos/                        # 🎥 Gravações automáticas dos testes
│
├── cypress.config.js              # ⚙️ Configuração principal (baseUrl, reporter, etc.)
├── package.json                   # 📦 Dependências e scripts npm
├── package-lock.json
├── README.md                      # 📖 Documentação principal
└── README_UPDATE.md               # 🧾 Histórico de alterações (ex: SearchPage → SearchResultsPage)


---

## Como executar

Instalar dependências:

```bash
npm install
```

Abrir Test Runner:

```bash
npx cypress open
```

Executar via CLI:

```bash
npx cypress run
```

---

## Estratégia de Teste Adotada

Optamos por validação:

- de **fluxo funcional**
- + **estrutura mínima** de página interna de artigo

Para evitar flakiness, não validamos textos específicos do conteúdo editorial.

---

## Escopos Principais Automatizados

- Navegação menu
- Lista de artigos
- Paginação
- Busca positiva / negativa
- Abertura de artigo
- Estrutura mínima do conteúdo
- Responsividade (Chrome / Mobile viewport)
- Links externos
- Usabilidade básica

---

## Licença / Uso

Repositório criado para demonstração técnica profissional. Pode ser utilizado como referência, estudo, treinamento ou avaliação de senioridade.
