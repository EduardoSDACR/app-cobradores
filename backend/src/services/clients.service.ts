import Client from "../models/client.model";
import Administrator from "../models/administrator.model";
import ClientDTO from "../core/dtos/cliente.dto";

export class ClientService {
  static async list() {
    const clients = await Client.find();
    return clients;
  }

  static async find(id: string) {
    const client = await Client.findById(id);
    return client;
  }

  static async create(input: ClientDTO) {
    const client = await Client.create(input);
    await Administrator.findByIdAndUpdate("63168c1854a328126d26ff44", {
      $push: { clients: client._id },
    });
    return client;
  }

  static async update(id: string, input: ClientDTO) {
    const client = await Client.findByIdAndUpdate(id, input, { new: true });
    return client;
  }

  static async delete(id: string) {
    await Client.findByIdAndDelete(id);
  }
}
