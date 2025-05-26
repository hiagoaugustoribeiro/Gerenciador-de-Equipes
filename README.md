# Desafio Front-end - ChipInventor: Gerenciador de Equipes (Angular)

Este projeto é uma solução para o Desafio Front-end proposto pela ChipInventor, implementado com Angular 17+, Angular Material e TypeScript. A aplicação permite o gerenciamento de Empresas, Projetistas e Equipes através de uma interface web responsiva.

## Funcionalidades

*   **Módulo Admin:**
    *   Listagem de Empresas cadastradas.
    *   Criação, Edição e Exclusão (CRUD) de Empresas.
    *   Utiliza dados mockados através de um serviço Angular (`MockDataService`).
*   **Módulo Company:**
    *   Listagem de Projetistas cadastrados.
    *   Criação, Edição e Exclusão (CRUD) de Projetistas.
    *   Listagem de Equipes cadastradas.
    *   Criação, Edição e Exclusão (CRUD) de Equipes, permitindo a associação de Projetistas.
    *   Utiliza dados mockados através do mesmo serviço Angular (`MockDataService`).
*   **Layout Responsivo:**
    *   Interface adaptável a diferentes tamanhos de tela, utilizando Angular Material (Toolbar, Sidenav, Cards, Tabelas, Botões, Formulários, Diálogos).
*   **Navegação:**
    *   Menu lateral (Sidenav) para navegação entre os módulos Admin (Empresas) e Company (Projetistas, Equipes).

## Tecnologias Utilizadas

*   **Angular:** v17+
*   **Angular CLI:** v17+
*   **TypeScript:** v5+
*   **Angular Material:** v17+ (para componentes de UI)
*   **RxJS:** Para programação reativa e gerenciamento de estado simples (via `BehaviorSubject` no serviço mock).
*   **CSS:** Estilização básica e específica dos componentes.

## Estrutura do Projeto

```
chip-inventor-app/
├── src/
│   ├── app/
│   │   ├── admin/             # Módulo de Administração (Empresas)
│   │   │   ├── components/    # Componentes (List, Form)
│   │   │   ├── admin-routing.module.ts
│   │   │   └── admin.module.ts
│   │   ├── company/           # Módulo da Empresa (Projetistas, Equipes)
│   │   │   ├── components/    # Componentes (List, Form para Projetista e Equipe)
│   │   │   ├── company-routing.module.ts
│   │   │   └── company.module.ts
│   │   ├── core/              # Módulo Core (Layout: Header, Sidenav)
│   │   │   └── components/
│   │   ├── shared/            # Módulo Shared (Componentes, Modelos, Serviços)
│   │   │   ├── components/    # Componentes reutilizáveis (ConfirmationDialog)
│   │   │   ├── models/        # Interfaces (Empresa, Projetista, Equipe)
│   │   │   └── services/      # Serviços (MockDataService)
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/            # Arquivos estáticos (opcional)
│   ├── environments/      # Configurações de ambiente
│   ├── index.html         # Arquivo HTML principal
│   ├── main.ts            # Ponto de entrada da aplicação
│   └── styles.css         # Estilos globais
├── angular.json         # Configuração do Angular CLI
├── package.json         # Dependências e scripts NPM
├── tsconfig.json        # Configuração global do TypeScript
└── README.md            # Este arquivo
```

## Como Executar o Projeto

1.  **Pré-requisitos:**
    *   Node.js e npm (ou yarn) instalados.
    *   Angular CLI instalado globalmente (`npm install -g @angular/cli`).

2.  **Instalar Dependências:**
    ```bash
    cd chip-inventor-app
    npm install
    ```

3.  **Executar o Servidor de Desenvolvimento:**
    ```bash
    ng serve -o
    ```
    A aplicação estará disponível em `http://localhost:4200/` (ou outra porta, se a 4200 estiver ocupada).

## Próximos Passos 

*   Implementar persistência de dados real (backend em C# com API REST).
*   Adicionar autenticação e autorização.
*   Implementar testes unitários e de integração.
*   Melhorar a gestão de estado (ex: NgRx, NGXS).
*   Refinar a interface do usuário e a experiência do usuário (UX).

## 🔗 Acesse o Projeto Online

A aplicação está publicada via GitHub Pages e pode ser acessada aqui:

👉 [Clique para acessar o Gerenciador de Equipes](https://hiagoaugustoribeiro.github.io/Gerenciador-de-Equipes/)


## Interface da Aplicação
![Formulario de Cadastro](https://github.com/user-attachments/assets/ca525111-32db-46b4-883f-50ac58ffabbe)
![Tela de Listagem](https://github.com/user-attachments/assets/1a1a33f1-d0d9-4931-aefb-cf3a37505adc)


## Autor

*   Hiago Augusto Ribeiro
