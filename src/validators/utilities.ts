import { z } from 'zod';

export const requiredString = z.string().trim().min(1, 'Required');

const MB_BYTES = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const imageSchema = z.instanceof(File).superRefine((f, ctx) => {
  if (!ACCEPTED_IMAGE_MIME_TYPES.includes(f.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `File must be one of [${ACCEPTED_IMAGE_MIME_TYPES.join(
        ', '
      )}] but was ${f.type}`,
    });
  }
  if (f.size > MB_BYTES) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: 'array',
      message: `The file must not be larger than ${MB_BYTES} bytes: ${f.size}`,
      maximum: MB_BYTES,
      inclusive: true,
    });
  }
});

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
