// api/schema.ts
import { GraphQLDateTime } from 'graphql-scalars';
import { asNexusMethod, connectionPlugin, makeSchema } from 'nexus';
import { join } from 'path';

import * as AllTypes from './schemas';

export const schema = makeSchema({
  types: [AllTypes, asNexusMethod(GraphQLDateTime, "datetime", "Date")],
  contextType: {
    module: join(__dirname, "./context.ts"),
    export: "Context",
  },
  outputs: {
    typegen: join(__dirname, "..", "generated/nexus-typegen.ts"),
    schema: join(__dirname, "..", "generated/schema.graphql"),
  },
  plugins: [
    connectionPlugin({
      extendConnection: {
        totalCount: { type: "Int", requireResolver: false },
      },
    }),
  ],
  features: {
    abstractTypeStrategies: {
      resolveType: true,
      __typename: true,
    },
  },
});
