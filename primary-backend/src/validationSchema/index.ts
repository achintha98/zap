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

export {signInchema, signUpSchema};