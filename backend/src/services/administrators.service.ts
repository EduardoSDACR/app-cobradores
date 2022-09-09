import Administrator from "../models/administrator.model";
import AdministratorDto from "../core/dtos/administrator.dto";

export class AdministratorService {
  static async list() {
    const administrators = Administrator.find();
    return administrators;
  }

  static async find(id: string) {
    const administrator = await Administrator.findById(id);
    return administrator;
  }

  static async create(input: AdministratorDto) {
    input.password = "para hashear mas tarde";
    const administrator = await Administrator.create(input);
    return administrator;
  }

  static async update(id: string, input: AdministratorDto) {
    const administrator = await Administrator.findByIdAndUpdate(id, input, {
      new: true,
    });
    return administrator;
  }

  static async delete(id: string) {
    await Administrator.findByIdAndDelete(id);
  }
}
