import { prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { Payment } from "./Payment";

class Client {
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
