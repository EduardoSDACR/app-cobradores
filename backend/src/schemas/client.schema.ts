import { object, string, TypeOf, z } from "zod";
import mongoose from "mongoose";

export const createClientSchema = object({
  body: object({
    firstname: string({
      required_error: "firstname is required",
    }),
    lastname: string({
      required_error: "lastname is required",
    }),
    dni: string({
      required_error: "dni is required",
    }),
    phone_number: string({
      required_error: "phone number is required",
    }),
  }),
});

export const verifyClientSchema = object({
  params: object({
    client_id: string(),
  }).refine((data) => mongoose.Types.ObjectId.isValid(data.client_id), {
    message: "id invalid",
    path: ["client_id"],
  }),
});

export type CreateClientInput = TypeOf<typeof createClientSchema>["body"];

export type VerifyClientInput = TypeOf<typeof verifyClientSchema>["params"];
