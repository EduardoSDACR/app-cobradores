import { Request, Response } from "express";
import { PaymentService } from "../services/payments.service";

export async function getPayment(req: Request, res: Response): Promise<void> {
  const { payment_id } = req.params;
  const payment = await PaymentService.find(payment_id);
  res.status(200).json(payment);
}

export async function getClientPayments(req: Request, res: Response): Promise<void> {
  const { client_id } = req.params;
  const payments = await PaymentService.findClientPayments(client_id);
  res.status(200).json(payments);
}

export async function createPayment(req: Request, res: Response): Promise<void> {
  const { client_id } = req.params;
  const result = await PaymentService.create(client_id, req.body);
  res.status(201).json({ message: "Payment created", result });
}

export async function payPayment(req: Request, res: Response): Promise<void> {
  const { payment_id } = req.params;
  const payment = await PaymentService.pay(payment_id);
  res.status(200).json({ message: "Payment paid", payment });
}

export async function deletePayment(req: Request, res: Response): Promise<void> {
  const { payment_id } = req.params;
  await PaymentService.delete(payment_id);
  res.status(204).send();
}
