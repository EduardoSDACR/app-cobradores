import { Request, Response } from "express";

// Models
import Client from "../models/Client";

export async function getClients(
  req: Request,
  res: Response
): Promise<Response> {
  const clients = await Client.find();
  return res.json({ clients });
}

export async function getClient(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const client = await Client.findById(id);
  return res.json(client);
}

export async function createClient(
  req: Request,
  res: Response
): Promise<Response> {
  const { firstname, lastname, dni } = req.body;
  const client = await Client.create({
    firstname,
    lastname,
    dni,
  });
  return res.json(client);
}

export async function updateClient(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { firstname, lastname, dni } = req.body;
  const updatedClient = await Client.findByIdAndUpdate(
    id,
    { firstname, lastname, dni },
    { new: true }
  );
  return res.json(updatedClient);
}

export async function deleteClient(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const deletedClient = await Client.findByIdAndDelete(id);
  return res.json({ message: "Client deleted" });
}
