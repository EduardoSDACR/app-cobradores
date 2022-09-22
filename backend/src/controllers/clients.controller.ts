import { Request, Response } from "express";
import { CreateClientInput, VerifyClientInput } from "../schemas/client.schema";
import { ClientService } from "../services/clients.service";

export async function getClients(req: Request, res: Response): Promise<void> {
  const clients = await ClientService.list();
  res.status(200).json({ clients });
}

export async function getClient(req: Request<VerifyClientInput>, res: Response): Promise<void> {
  const id = req.params.client_id;
  const client = await ClientService.find(id);
  res.status(200).json(client);
}

export async function createClient(
  req: Request<{}, {}, CreateClientInput>,
  res: Response
): Promise<void> {
  const client = await ClientService.create(req.body);
  res.status(201).json(client);
}

export async function updateClient(req: Request, res: Response): Promise<void> {
  const { client_id } = req.params;
  const updatedClient = await ClientService.update(client_id, req.body);
  res.status(200).json(updatedClient);
}

export async function deleteClient(req: Request, res: Response): Promise<void> {
  const { client_id } = req.params;
  await ClientService.delete(client_id);
  res.status(204).send();
}
