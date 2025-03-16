import { Gender, Goal } from "@prisma/client";
import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "NewPassword.password.min",
  }),
});
export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;


export const ResetSchema = z.object({
  email: z.string().email({
    message: "Reset.email.required",
  }),
});
export type ResetSchemaType = z.infer<typeof ResetSchema>;


export const LoginSchema = z.object({
  email: z.string().email({
    message: "Login.email.required",
  }),
  password: z.string().min(1, {
    message: "Login.password.required",
  }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;


export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Register.email.required",
  }),
  password: z.string().min(6, {
    message: "Register.password.min",
  }),
  name: z.string().min(1, {
    message: "Register.name.required",
  }),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;


export const FillProfileSchema = z.object({
  weight: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "UpdateProfile.weight.required" })
      .positive({ message: "UpdateProfile.weight.positive" })
  ),
  height: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "UpdateProfile.height.required" })
      .positive({ message: "UpdateProfile.height.positive" })
  ),
  gender: z.enum(Object.values(Gender) as [Gender, ...Gender[]], {
    message: "UpdateProfile.gender.required",
  }),
  birthDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ message: 'UpdateProfile.birthDate.required' })
      .refine((date) => !isNaN(date.getTime()), { message: "UpdateProfile.birthDate.invalidFormat" })
  ),
  activityLevel: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "UpdateProfile.activityLevel.required" })
      .positive({ message: "UpdateProfile.activityLevel.positive" })
  ),
  goal: z.enum(Object.values(Goal) as [Goal, ...Goal[]], {
    message: "UpdateProfile.goal.required",
  }),
});
export type FillProfileSchemaType = z.infer<typeof FillProfileSchema>;


export const EditUserProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Register.name.required",
  }),
  birthDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ message: 'UpdateProfile.birthDate.required' })
      .refine((date) => !isNaN(date.getTime()), { message: "UpdateProfile.birthDate.invalidFormat" })
  ),
  gender: z.enum(Object.values(Gender) as [Gender, ...Gender[]], {
    message: "UpdateProfile.gender.required",
  }),
  height: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "UpdateProfile.height.required" })
      .positive({ message: "UpdateProfile.height.positive" })
  ),
  activityLevel: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "UpdateProfile.activityLevel.required" })
      .positive({ message: "UpdateProfile.activityLevel.positive" })
  ),
  goal: z.enum(Object.values(Goal) as [Goal, ...Goal[]], {
    message: "UpdateProfile.goal.required",
  }),
});
export type EditUserProfileSchemaType = z.infer<typeof EditUserProfileSchema>;


export const AddUserWeightSchema = z.object({
  weight: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "UpdateProfile.weight.required" })
      .positive({ message: "UpdateProfile.weight.positive" })
  ),
})
export type AddUserWeightSchemaType = z.infer<typeof AddUserWeightSchema>;


export const MealSchemaBasic = z.object({
  name: z.string().min(1, {
    message: "Meal.name.required",
  }),
  weight: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "Meal.weight.required" })
      .positive({ message: "Meal.weight.positive" })
      .min(1, { message: "Meal.weight.required" })
  ),
});
export type MealSchemaBasicType = z.infer<typeof MealSchemaBasic>;


export const MealSchemaFullInfo = z.object({
  time: z.string({
    message: "Meal.time.required"
  }).regex(
    /^(?:[01]\d|2[0-3]):[0-5]\d$/,
    "Meal.time.format"
  ),
  avgCalories: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "Meal.avgCalories.required" })
      .positive({ message: "Meal.avgCalories.positive" })
  ),
  proteins: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "Meal.proteins.required" })
      .positive({ message: "Meal.proteins.positive" })
  ),
  fats: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "Meal.fats.required" })
      .positive({ message: "Meal.fats.positive" })
  ),
  carbohydrates: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "Meal.carbohydrates.required" })
      .positive({ message: "Meal.carbohydrates.positive" })
  ),
});
export type MealSchemaFullInfoType = z.infer<typeof MealSchemaFullInfo>;


export const CaloriesResponseSchema = z.object({
  minCalories: z.number(),
  maxCalories: z.number(),
  avgCalories: z.number(),
  proteins: z.number(),
  fats: z.number(),
  carbohydrates: z.number(),
  comment: z.string(),
  error: z.string().optional(),
});
