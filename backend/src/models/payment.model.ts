import { getModelForClass, modelOptions, prop, post } from "@typegoose/typegoose";
import { NotFound } from "http-errors";

enum States {
  paid = "Paid",
  pending = "Pending",
  delayed = "Delayed",
}

@post<Payment>(["findOne", "findOneAndUpdate", "findOneAndDelete"], (payment) => {
  if (payment === null) {
    throw new NotFound("Payment not found");
  }
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Payment {
  @prop({ type: Number, required: true })
  amount: number;
  @prop({ type: String, required: true, enum: States, default: "Pending" })
  state: string;
  @prop({ type: Date, required: true })
  payment_date: Date;
  @prop({ type: Number })
  days_late: number;
  @prop({ type: String })
  receipt: string;
}

const PaymentModel = getModelForClass(Payment);
export default PaymentModel;
