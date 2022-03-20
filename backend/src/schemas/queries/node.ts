import { UserInputError } from 'apollo-server-express';
import { decode } from 'common/utiles';
import { node } from 'interface/node';
import { idArg, nonNull, queryType } from 'nexus';

export const nodeQuery = queryType({
  definition(t) {
    t.field("node", {
      type: node,
      args: {
        id: nonNull(idArg()),
      },
      async resolve(_root, args, ctx) {
        const { type, id } = decode(args.id);
        switch (type) {
          case "User":
            const res = await ctx.prisma.user.findUnique({
              where: { userId: id },
            });
            return res && { ...res, __typename: "User" as const };
          default:
            throw new UserInputError(`Unsupported type: ${type}`);
        }
      },
    });
  },
});
