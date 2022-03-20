import { PrismaClient } from '@prisma/client';

import { createServer } from './server';

const primsa = new PrismaClient({
  log: [{ level: "query", emit: "event" }],
});
primsa.$on("query", (e: any) => {
  console.log(e);
});

createServer(primsa).then((app) => app.listen(8080));
