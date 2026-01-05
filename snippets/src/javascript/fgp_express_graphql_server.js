// npm install express apollo-server-express graphql

const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");

// Definición del esquema
const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(text: String!): Todo!
  }
`;

// Datos en memoria
let todos = [
  { id: "1", text: "Aprender GraphQL", completed: false },
  { id: "2", text: "Construir una API", completed: true },
];

// Resolvers
const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_, { text }) => {
      const newTodo = {
        id: String(todos.length + 1),
        text,
        completed: false,
      };
      todos.push(newTodo);
      return newTodo;
    },
  },
};

// Inicialización del servidor
async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => console.log(`🚀 Servidor listo en http://localhost:4000\${server.graphqlPath}`));
}

startServer();
