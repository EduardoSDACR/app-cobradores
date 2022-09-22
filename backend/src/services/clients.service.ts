import ClientModel, { Client } from "../models/client.model";
import Administrator from "../models/administrator.model";
import ClientDTO from "../core/dtos/client.dto";

export class ClientService {
  static async list() {
    const clients = await ClientModel.find();
    return clients;
  }

  static async find(id: string) {
    const client = await ClientModel.findById(id);
    return client;
  }

  static async create(input: Partial<Client>) {
    const client = await ClientModel.create(input);
    await Administrator.findByIdAndUpdate("63168c1854a328126d26ff44", {
      $push: { clients: client._id },
    });
    return client;
  }

  static async update(id: string, input: ClientDTO) {
    const client = await ClientModel.findByIdAndUpdate(id, input, { new: true });
    return client;
  }

  static async delete(id: string) {
    await ClientModel.findByIdAndDelete(id);
  }
}
