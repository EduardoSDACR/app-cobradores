import { prop, Ref, getModelForClass, post } from "@typegoose/typegoose";
import { Payment } from "./payment.model";
import { NotFound } from "http-errors";

@post<Client>(["findOne", "findOneAndUpdate", "findOneAndDelete"], (client) => {
  if (client === null) {
    throw new NotFound("Client not found");
  }
})
export class Client {
  @prop({ type: String, required: true })
  firstname: string;
  @prop({ type: String, required: true })
  lastname: string;
  @prop({ type: String, required: true, minlength: 8, maxlength: 8 })
  dni: string;
  @prop({ type: String })
  phone_number: string;
  @prop({ ref: () => Payment })
  payments: Ref<Payment>[];
}

const ClientModel = getModelForClass(Client);
export default ClientModel;
