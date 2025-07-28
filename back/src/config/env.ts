import dotenv from "dotenv";
import { z } from "zod";

dotenv.config(); // <-- Cargar el archivo .env

// Valida las variables con Zod
const safeEnvSchema = z.object({
    PORT: z.string().transform(Number).default(3000),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
});

const parsed = safeEnvSchema.safeParse(process.env);

if (!parsed.success){
    console.error('Error al enviar las variables de entorno', parsed.error.format());
    process.exit(1);
}

export const env = parsed.data