import { PrismaClient } from '@prisma/client';

import { NexusGenObjects } from '../generated/nexus-typegen';

export type Context = {
  prisma: PrismaClient;
  viewer: NexusGenObjects["Viewer"] | null;
};

export const createContext = async (prisma: PrismaClient): Promise<Context> => {
  const user = await prisma.user.findFirst();

  return {
    prisma,
    viewer: user && {
      name: user.name,
      email: user.email,
    },
  };
};
