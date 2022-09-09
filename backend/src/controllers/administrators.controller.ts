import { Response, Request } from "express";
import { AdministratorService } from "../services/administrators.service";

export async function getAdministrators(req: Request, res: Response): Promise<void> {
  const administrators = await AdministratorService.list();
  res.status(200).json(administrators);
}

export async function getAdministrator(req: Request, res: Response): Promise<void> {
  const { administrator_id } = req.params;
  const administrator = await AdministratorService.find(administrator_id);
  res.status(200).json(administrator);
}

export async function createAdministrator(req: Request, res: Response): Promise<void> {
  const administrator = await AdministratorService.create(req.body);
  res.status(201).json(administrator);
}

export async function updateAdministrator(req: Request, res: Response): Promise<void> {
  const { administrator_id } = req.params;
  const administrator = await AdministratorService.update(administrator_id, req.body);
  res.status(200).json(administrator);
}

export async function deleteAdministrator(req: Request, res: Response): Promise<void> {
  const { administrator_id } = req.params;
  await AdministratorService.delete(administrator_id);
  res.status(204).send();
}
