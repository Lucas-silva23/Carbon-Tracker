# Carbon Tracker

O Carbon Tracker é uma aplicação web desenvolvida para ajudar usuários a monitorar e reduzir sua pegada de carbono. Por meio de um painel intuitivo, é possível registrar hábitos diários, visualizar gráficos de consumo e definir metas sustentáveis.

## Funcionalidades

- Dashboard: Visão geral do consumo de carbono.
  
- Cadastro e Login: Autenticação de usuários.
  
- Registro de Hábitos: Adição de atividades diárias.
  
- Histórico de Hábitos: Acompanhamento de hábitos passados.
  
- Tipos de Hábitos: Classificação personalizada de atividades.

## Tecnologias Utilizadas

- Frontend: React, React Router, Axios

- Backend: Node.js, Express, PostgreSQL

- Autenticação: JWT (JSON Web Tokens)

- Hashing de Senhas: bcryptjs

## Capturas de Tela

![Descrição da imagem](/images/home.png)
![Descrição da imagem](/images/carbon-tracker.png)

## Como Rodar o Projeto

### Backend

1. Navegue até a pasta do backend:

```
cd backend
```

2. Instale as dependências:

```
npm install
```

3. Crie um arquivo .env com as variáveis necessárias:

```
JWT_SECRET=chave-jwt
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=carbon_tracker
```

4. Inicie o servidor:

```
npm run dev
```

### Frontend

1. Navegue até a pasta do frontend:

```
cd frontend
```

2. Instale as dependências:

```
npm install
```

3. Inicie o servidor:

```
npm start
```

