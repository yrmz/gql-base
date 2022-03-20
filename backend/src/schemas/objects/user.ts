import { node } from 'interface/node';
import { objectType } from 'nexus';
import { User } from 'nexus-prisma';

export const userObject = objectType({
  name: User.$name,
  definition(t) {
    t.implements(node);
    t.field(User.userId);
    t.field(User.name);
    t.field(User.email);
    t.field(User.password);
    t.field(User.createdAt);
    t.field(User.updatedAt);

    t.nonNull.id("id", {
      resolve(root, _args, _ctx) {
        return Buffer.from("User:" + root.userId).toString("base64");
      },
    });
  },
});
