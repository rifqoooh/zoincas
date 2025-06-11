import { z } from 'zod';

export const requiredString = z.string().trim().min(1, 'Required');

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type zodObjType<K extends string> = z.ZodObject<Record<K, any>>;
type zodUnionLiteralType<K extends string> =
  | z.ZodLiteral<K>
  | z.ZodUnion<[z.ZodLiteral<K>, ...z.ZodLiteral<K>[]]>;

export const zodLiteralsFromZodObject = <K extends string>(
  zodObj: zodObjType<K>
): zodUnionLiteralType<K> => {
  const keys = Object.keys(zodObj.shape) as K[];

  if (keys.length === 0) {
    throw new Error('Cannot create union from empty object shape.');
  }

  // If there's only one key, return just that literal
  if (keys.length === 1) {
    return z.literal(keys[0]);
  }

  // If there are multiple keys, return a union of literals
  const literals = keys.map((key) => z.literal(key)) as [
    z.ZodLiteral<K>,
    z.ZodLiteral<K>,
    ...z.ZodLiteral<K>[],
  ];

  return z.union(literals);
};

export const zodEnumFromZodObject = <K extends string>(
  zodObj: zodObjType<K>
): z.ZodEnum<[K, ...K[]]> => {
  const keys = Object.keys(zodObj.shape) as K[];

  if (keys.length === 0) {
    throw new Error('Cannot create enum from empty object shape.');
  }

  return z.enum(keys as [K, ...K[]]);
};
