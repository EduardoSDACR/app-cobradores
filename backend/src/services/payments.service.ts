import Payment from "../models/payment.model";
import Client from "../models/client.model";
import PaymentDTO from "../core/dtos/payment.dto";
import { createInvoice } from "../lib/createInvoice";
import path from "path";
import fs from "fs";

export class PaymentService {
  static async find(id: string) {
    const payment = await Payment.findById(id);
    return payment;
  }

  static async findClientPayments(id: string) {
    const clientPayments = await Client.findById(id).populate("payments");
    return clientPayments?.payments;
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

  static async pay(id: string) {
    const payment = await Payment.findById(id);
    payment!.state = "Paid";
    payment!.receipt = "new_url";
    await payment!.save();

    const invoice = {
      shipping: {
        name: "John Doe",
        address: "1234 Main Street",
        city: "San Francisco",
        state: "CA",
        country: "US",
        postal_code: 94111,
      },
      items: [
        {
          item: "TC 100",
          description: "Toner Cartridge",
          quantity: 2,
          amount: 6000,
        },
        {
          item: "USB_EXT",
          description: "USB Cable Extender",
          quantity: 1,
          amount: 2000,
        },
      ],
      subtotal: 8000,
      paid: 0,
      invoice_nr: 1234,
    };

    const dir = path.resolve("docs");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    createInvoice(invoice, path.join(dir, "example.pdf"));
    return payment;
  }

  static async delete(id: string) {
    await Payment.findByIdAndDelete(id);
    await Client.findOneAndUpdate({ payments: id }, { $pull: { payments: id } }, { new: true });
  }
}
