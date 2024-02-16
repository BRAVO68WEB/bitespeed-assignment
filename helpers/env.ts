import { z } from "zod";

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}

export const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const validateEnv = (env: Record<string, unknown>) => {
  envSchema.parse(env);
};