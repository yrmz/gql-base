import { objectType } from 'nexus';

export const viewerObject = objectType({
  name: "Viewer",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("email");
  },
});
