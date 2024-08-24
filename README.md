# Golden Raspberry Awards

Este projeto consiste em uma aplicação que lê um arquivo CSV com dados dos prêmios Golden Raspberry Awards, armazena esses dados em um banco de dados relacional e fornece uma API REST para retornar os produtores com os menores e maiores intervalos entre vitórias.

## Índice

-   [Stack Utilizada](#stack-utilizada)
-   [Instalação](#instalação)
-   [Uso](#uso)
-   [API Endpoints](#api-endpoints)

## Stack Utilizada

-   **Linguagem:** TypeScript / NodeJS v20.17.0
-   **Framework:** Express
-   **Banco de Dados:** SQLite (em memória)
-   **ORM:** Knex
-   **Testes:** Jest

## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente:

1. Clone este repositório:

    ```bash
    git clone https://github.com/felipebrandes/gr-awards.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd gr-awards
    ```

3. Instale as dependências:

    ```bash
    npm i
    ```

4. Inicie o servidor:

    ```bash
    npm run start
    ```

5. Para rodar os testes:

    ```bash
    npm run test
    ```

## Uso

Após iniciar o servidor, a API estará disponível em `http://localhost:3000` (porta padrão).

## API Endpoints

#### `GET /winners/min-max-interval`

Retorna os produtores com os menores e maiores intervalos entre vitórias no Golden Raspberry Awards.

-   **URL:** `/winners/min-max-interval`
-   **Method:** `GET`
-   **Response:**

    ```json
    {
        "min": [
            {
                "producer": "Produtor 1",
                "interval": 1,
                "previousWin": 2000,
                "followingWin": 2001
            }
        ],
        "max": [
            {
                "producer": "Produtor 2",
                "interval": 10,
                "previousWin": 1980,
                "followingWin": 1990
            }
        ]
    }
    ```
