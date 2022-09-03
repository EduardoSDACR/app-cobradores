import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

enum States {
  paid = "Paid",
  pending = "Pending",
  delayed = "Delayed",
}

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
