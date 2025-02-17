import {z} from "zod";

const signUpSchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5),
  });
  
const signInchema = z.object({
email: z.string(),
password: z.string(),
});

const zapSchema = z.object({
  zap: z.object({
    trigger: z.object({
      triggerId: z.string()
    }),
    action: z.object({
      actionId: z.string()
    })

  })})

export {signInchema, signUpSchema, zapSchema};