import z from "zod";

const PatientRegistrationZodSchema = z.object(
	{
      name: z.string().min(3).max(10),
	  email:z.email(),
	  password: z.string()
	  .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
      .regex(/[a-z]/,"Password must contain at least one lowercase letter" )
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
	  patient:z.object({
          contactNumber:z.string(),
	  }).optional(),

	})

    const ResetPasswordZodSchema= z.object({
         email:z.email(),
	  newPassword: z.string()
	  .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
      .regex(/[a-z]/,"Password must contain at least one lowercase letter" )
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
	  patient:z.object({
          contactNumber:z.string(),
	  }).optional(),
      otp:z.string()

    })

    export const UserValidation = {
        PatientRegistrationZodSchema,
        ResetPasswordZodSchema
    }