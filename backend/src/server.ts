import { ApolloServer } from 'apollo-server-express';
import { authApplicationService } from 'applicationService/auth';
import { createContext } from 'context';
import express from 'express';

import { PrismaClient } from '@prisma/client';

import { schema } from './schema';

export const createServer = async (prisma: PrismaClient) => {
  const context = await createContext(prisma);
  const server = new ApolloServer({
    schema,
    context,
  });
  await server.start();
  const app = express();
  app.get("/health", (_, res) => res.send("OK"));
  app.post("/auth", authApplicationService);
  server.applyMiddleware({ app });

  console.log(`🚀 Server ready at http://127.0.0.1:8080${server.graphqlPath}`);
  return app;
};
