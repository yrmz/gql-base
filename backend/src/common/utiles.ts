import { NexusGenAbstractTypeMembers } from '../../generated/nexus-typegen';

export const encode = (
  id: number,
  str: NexusGenAbstractTypeMembers["Node"]
) => {
  return Buffer.from(`${str}:${id}`).toString("base64");
};

export const decode = (str: string) => {
  const decoded = Buffer.from(str, "base64").toString().split(":");
  return {
    type: decoded[0],
    id: Number(decoded[1]),
  };
};
