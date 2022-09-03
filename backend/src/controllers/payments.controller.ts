import { Request, Response } from "express";
import Client from "../models/Client";
import Payment from "../models/Payment";

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
  return res.json({ message: "Payment paid", payment });
}
/* 
export async function updatePayment(
  req: Request,
  res: Response
): Promise<Response> {
  const { payment_id } = req.params;
  const { amount, receipt } = req.body;
  const payment = await Payment.findByIdAndUpdate(
    payment_id,
    {
      amount,
      receipt,
    },
    { new: true }
  );
  return res.json({ message: "Payment updated", payment });
} 
*/
export async function deletePayment(
  req: Request,
  res: Response
): Promise<Response> {
  const { payment_id } = req.params;
  await Payment.findByIdAndDelete(payment_id);
  return res.json({ message: "Deleted" });
}
