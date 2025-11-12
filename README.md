# Projeto de Automação de Testes E2E - Blog Agibank (Demonstração Técnica)

Este repositório contém a implementação de testes automatizados end-to-end do Blog Agibank utilizando **Cypress 15.5.0**, aplicando padrões profissionais de automação moderna:

- POM (Page Object Model)
- DRY (Don't Repeat Yourself)
- Clean Code aplicados a testes
- Cenários positivos, negativos, usabilidade e responsividade
- Validação funcional + validação mínima de estrutura de conteúdo

---

## Objetivo

Demonstrar senioridade técnica em automação de testes frontend, cobrindo os principais fluxos de navegação do Blog Agibank em ambiente de produção público.

Cobertura esperada: **>=80% dos fluxos essenciais**

---

## Tecnologias

| Componente | Versão |
|------------|--------|
| Cypress | 15.5.0 |
| Node | recomendado LTS >= 20.x |
| Package Manager | npm |

---

## Estrutura do Projeto

```
/cypress
  /e2e
    /home
    /search
    /article
    /responsiveness
  /fixtures
  /pages
  /support

/cypress.config.js
/README.md
```

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
