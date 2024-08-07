import { z } from "zod";

export const CumulativeForm = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  gpa: z.coerce.number({
    message: "GPA must be a number",
  }),
  credits: z.coerce.number({
    message: "Credits must be a number",
  }),
});

export type CumulativeForm = z.infer<typeof CumulativeForm>;
