import Payment from "../models/payment.model";
import Client from "../models/client.model";
import PaymentDTO from "../core/dtos/payment.dto";
import { createInvoice } from "../lib/createInvoice";
import { NotFound } from "http-errors";
import ClientDTO from "../core/dtos/client.dto";

export class PaymentService {
  static async find(id: string) {
    const payment = await Payment.findById(id);
    payment!.receipt = payment!.getAbsoluteReceiptURL();
    return payment;
  }

  static async findClientPayments(id: string) {
    const clientPayments: ClientDTO | null = await Client.findById(id).populate("payments");
    const payments: PaymentDTO[] | undefined = clientPayments?.payments;
    if (payments === undefined) {
      return [];
    }
    const paymentsURL = payments.map((payment) => {
      payment.receipt = payment.getAbsoluteReceiptURL();
      return payment;
    });
    return paymentsURL;
  }

  static async create(id: string, input: PaymentDTO) {
    const payment = await Payment.create(input);
    const client = await Client.findByIdAndUpdate(
      id,
      {
        $push: { payments: payment._id },
      },
      { new: true }
    );
    return { payment, client };
  }

  static async pay(client_id: string, payment_id: string) {
    var client: ClientDTO | null;
    try {
      client = await Client.findOne({ _id: client_id, payments: payment_id });
    } catch {
      throw new NotFound("Payment not found for this user");
    }

    const fileName = createInvoice(client, client_id);
    const payment = await Payment.findByIdAndUpdate(payment_id, {
      state: "Paid",
      receipt: "/receipts/" + client_id + "/" + fileName,
    });
    return payment;
  }

  static async delete(id: string) {
    await Payment.findByIdAndDelete(id);
    await Client.findOneAndUpdate({ payments: id }, { $pull: { payments: id } }, { new: true });
  }
}
