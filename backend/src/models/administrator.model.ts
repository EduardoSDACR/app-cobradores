import { prop, Ref, getModelForClass, post } from "@typegoose/typegoose";
import { Client } from "./client.model";
import { NotFound } from "http-errors";

@post<Administrator>(["findOne", "findOneAndUpdate", "findOneAndDelete"], (administrator) => {
  if (administrator === null) {
    throw new NotFound("Administrator not found");
  }
})
class Administrator {
  @prop({ type: String, required: true })
  fullname: string;
  @prop({ type: String, required: true })
  username: string;
  @prop({ type: String, required: true })
  password: string;
  @prop({ type: String, required: true })
  company_name: string;
  @prop({ type: String })
  company_logo: string;
  @prop({ type: String, required: true })
  phone_number: string;
  @prop({ ref: () => Client })
  clients: Ref<Client>[];
}

const AdministratorModel = getModelForClass(Administrator);
export default AdministratorModel;
