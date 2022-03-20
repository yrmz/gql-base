import { queryField } from 'nexus';
import { viewerObject } from 'schemas/objects';

export const viewerQuery = queryField("viewer", {
  type: viewerObject,
  resolve: (_root, _args, ctx) => ctx.viewer,
});