import { mutationField } from 'nexus';
import { userObject } from 'schemas/objects';

export const createUser = mutationField("createUser", {
  type: userObject,
  resolve(_root, _args, ctx) {
    return ctx.prisma.user.create({
      data: {
        name: "John Doe",
        email: "hoge@gmail.com",
        password: "hogehoge",
      },
    });
  },
});
