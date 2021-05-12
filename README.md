# 🏠 desafio-growthhackers

Esse projeto foi criado com [Create React App](https://github.com/facebook/create-react-app).

## 👨🏾‍💻 Tecnologias utilizadas

### Produção

  #### Front end
  - [x] [React.JS](https://pt-br.reactjs.org/)
  - [x] [Material UI](https://material-ui.com/)
  - [x] [Styled Components](https://styled-components.com/)
  - [x] [Typescript](https://www.typescriptlang.org/)
  - [x] [Axios](https://github.com/axios/axios)


  #### Back end
  - [x] [Express](https://expressjs.com/pt-br/)
  - [x] [Typeorm](https://typeorm.io/#/)
  - [x] [JWT](https://jwt.io/)
  - [x] [TSyringe](https://www.npmjs.com/package/tsyringe)
  - [x] [PostgreSQL](https://www.postgresql.org/)
  - [x] [Docker](https://www.docker.com/)

### Desenvolvimento

- [x] [ESLint](https://eslint.org/)
- [x] [Prettier](https://prettier.io/)

## 🛠 Instalação

### Pré-requisitos

Você precisa ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)
- [Node.JS](https://nodejs.org/en/)

### 🎲 Clonando o repositório

```bash
# Clone este repositório
$ git clone https://github.com/mirandajunior10/desafio-growthhacker.git

# Acesse a pasta do projeto no terminal/cmd
$ cd desafio-growthhackers
```

### 🌐 Configurando e rodando

#### Servidor
```bash
# Crie um container com o docker, com o comando abaixo
docker run -d --name postgresql -e POSTGRESQL_PASSWORD=88ff5bd245b7c578272f849e937e3945 -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=growthdb -p 5432:5432 bitnami/postgresql:latest

# Acesse a pasta do servidor
cd backend

# Instale as dependências
$ npm install
ou
$ yarn install

# Crie o banco de dados
$ npm run typeorm migration:run
ou
$ yarn typeorm migration:run

# Execute o servidor
$ npm run dev:server
ou
$ yarn dev:server

# O servidor iniciará na porta:3333 - acesse http://localhost:3333
```

#### Cliente


```bash

# Acesse a pasta do cliente
cd web

# Instale as dependências
$ npm install
ou
$ yarn install

# Execute o servidor
$ npm start
ou
$ yarn start

# O servidor iniciará na porta:3000 - acesse http://localhost:3000
```


## Scripts

### Servidor

Na pasta do servidor, podem ser executados:

### `yarn dev:server` ou `npm run dev:server`

Executa o servidor em modo de desenvolvimento.\
Abre o [http://localhost:3000](http://localhost:3000) no seu browser.

A página ira recarregar quando for feita qualquer alteração no código.

### `yarn test` ou `npm run test`

Abre o executor de testes no terminal

### Cliente

Na pasta do cliente, podem ser executados:

### `yarn start` ou `npm run start`

Executa o app em modo de desenvolvimento.\
Abre o [http://localhost:3000](http://localhost:3000) no seu browser.

A página ira recarregar quando for feita qualquer alteração no código.

### `yarn test` ou `npm run test`

Abre o executor de testes em modo interativo, no terminal
Veja a seção [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `yarn build` ou `npm run build`

Executa a build do app para modo de produção na pasta `build` .\
Esse comando agrega todo o código React em modo de produção e optimiza para melhor performance.

Veja a seção de [deploy](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

