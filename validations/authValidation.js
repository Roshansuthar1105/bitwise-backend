import { z } from "zod";
const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, "password must be of length 8"),
});
const signUpSchema = loginSchema.extend({
  username: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, "name must be of min length 3 ")
    .max(255, "name must not be of 255 length"),
  phone: z
    .string({ required_error: "Phone no is required" })
    .min(10, "invalid phone no"),
});
const contactSchema = z.object({
  username: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, "name must be of min length 3 ")
    .max(255, "name must not be of 255 length"),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" }),
  message: z
    .string({ required_error: "please enter some message" })
    .min(3, "message must be of min 3 characters"),
});
export { signUpSchema ,loginSchema , contactSchema };
