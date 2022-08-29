import { prop, getModelForClass } from "@typegoose/typegoose";

class Client {
  @prop({ type: String, required: true })
  firstname: string;
  @prop({ type: String, required: true })
  lastname: string;
  @prop({ type: String, required: true, minlength: 8, maxlength: 8 })
  dni: string;
}

const ClientModel = getModelForClass(Client);
export default ClientModel;
