import { env } from '@/env';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const gemini = createGoogleGenerativeAI({
  apiKey: env().GOOGLE_GENERATIVE_AI_API_KEY,
});
