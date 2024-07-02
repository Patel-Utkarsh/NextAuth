
"use server"
import userSchema from '@/models/user';
import {z} from 'Zod'

const signUpValidation = z.object({
    name : z.string().min(2,{message : 'Name must be at least 2 characters long.'}),
    email : z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})


export async function createEntry(formData) {

  const validatedFields = signUpValidation.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // create =await userSchema.create({name : validatedFields.name,email : validatedFields.email,password  : validatedFields.password});

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    try {
      console.log(validatedFields);
      await userSchema.create({name : validatedFields.data.name,email : validatedFields.data.email,password  : validatedFields.data.password});
      return 1;

      
    } catch (error) {
      console.log(error)
      return 0;
      
    }
  }
}

