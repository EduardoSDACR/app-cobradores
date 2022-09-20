class PaymentDTO {
  readonly amount: number;
  readonly state: string;
  readonly payment_date: Date;
  readonly days_late: number;
  receipt: string;
  getAbsoluteReceiptURL(): string {
    return "";
  }
}

export default PaymentDTO;
