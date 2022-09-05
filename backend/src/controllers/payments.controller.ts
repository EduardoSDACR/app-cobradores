import { Request, Response } from "express";
import Client from "../models/Client";
import Payment from "../models/Payment";
import { createInvoice } from "../services/createInvoice";
import path from "path";

export async function getPayment(
  req: Request,
  res: Response
): Promise<Response> {
  const { payment_id } = req.params;
  const payment = await Payment.findById(payment_id);
  return res.json(payment);
}

export async function getClientPayments(
  req: Request,
  res: Response
): Promise<Response> {
  const { client_id } = req.params;
  const clientPayments = await Client.findById(client_id).populate("payments");
  return res.json(clientPayments?.payments);
}

export async function createPayment(
  req: Request,
  res: Response
): Promise<Response> {
  const { client_id } = req.params;
  const payment = await Payment.create(req.body);
  const client = await Client.findByIdAndUpdate(
    client_id,
    {
      $push: { payments: payment._id },
    },
    { new: true }
  );
  return res.json({ message: "Payment created", payment, client });
}

export async function payPayment(
  req: Request,
  res: Response
): Promise<Response> {
  const { payment_id } = req.params;
  const payment = await Payment.findById(payment_id);
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

  createInvoice(invoice, path.resolve("docs/example.pdf"));

  return res.json({ message: "Payment paid", payment });
}

export async function deletePayment(
  req: Request,
  res: Response
): Promise<Response> {
  const { payment_id } = req.params;
  await Payment.findByIdAndDelete(payment_id);
  await Client.findOneAndUpdate(
    { payments: payment_id },
    { $pull: { payments: payment_id } },
    { new: true }
  );
  return res.json({ message: "Deleted" });
}
