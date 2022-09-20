import PaymentDTO from "./payment.dto";

class ClientDTO {
  readonly firstname: string;
  readonly lastname: string;
  readonly dni: string;
  readonly phone_number: string;
  readonly payments: PaymentDTO[];
}

export default ClientDTO;
