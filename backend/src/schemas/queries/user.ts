import { decode, encode } from 'common/utils';
import { extendType } from 'nexus';
import { userObject } from 'schemas/objects/user';

import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { NexusGenRootTypes } from '../../../generated/nexus-typegen';

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.connectionField("users", {
      type: userObject,
      additionalArgs: {},
      resolve(_root, args, ctx) {
        return findManyCursorConnection<
          NexusGenRootTypes["User"],
          { userId: number }
        >(
          (_args) => ctx.prisma.user.findMany({ ..._args }),
          () => ctx.prisma.user.count(),
          { ...args },
          {
            getCursor: (record) => ({ userId: record.userId }),
            encodeCursor: (cursor) => encode(cursor.userId, "User"),
            decodeCursor: (cursor) => ({
              userId: decode(cursor).id,
            }),
          }
        );
      },
    });
  },
});
