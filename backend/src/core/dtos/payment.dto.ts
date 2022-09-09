class PaymentDTO {
  amount: number;
  state: string;
  payment_date: Date;
  days_late: number;
  receipt: string;
}

export default PaymentDTO;
