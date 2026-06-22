import { defineAction, type SafeResult } from "astro:actions";
import { z, type ZodObject } from "astro/zod";
import { getActionState } from "@astrojs/react/actions";

// export const activeSchemaPick = <S extends ZodObject<any>, E>(
//   schema: S,
//   entity: E,
// ) =>
//   Object.entries(schema.shape).reduce((acc, [key]) => {
//     if (get(entity, key)) {
//       return {
//         ...acc,
//         [key]: true,
//       };
//     }

//     return acc;
//   }, {});

// export const activeDefaultValues = <S extends ZodObject<any>, E>(
//   schema: S,
//   entity: E,
// ): Partial<E> =>
//   Object.keys(schema.shape).reduce((acc, key) => {
//     if (get(entity, key)) {
//       return {
//         ...acc,
//         [key]: entity[key as keyof E],
//       };
//     }

//     return acc;
//   }, {});

//   const schema = z
//     .object({
//     })
//     .strict();

  // const activeSchema = schema.required(activeSchemaPick(schema, payloadForm));

export const server = {
  submitForm: defineAction({
    accept: "form",
    input: z
      .object({
        key: z.unknown(),
      })
      .transform(({ key }) => ({ key })),
    handler: async (input, ctx) => {
      const { data, error } = await getActionState<SafeResult<Error, unknown>>(ctx);

      if (error) throw error;

      return "success";
    },
  }),
};
