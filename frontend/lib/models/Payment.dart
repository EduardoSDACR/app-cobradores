class Payment {
  final String state, paymentDate, receipt;
  Payment({
    required this.state,
    required this.paymentDate,
    required this.receipt,
  });
}

List<Payment> payments = [
  Payment(
      state: "Paid",
      paymentDate: "2022/05/15",
      receipt:
          "http://192.168.0.32:8000/receipts/6330651f771aac756ffdb621/2022-9-25.pdf"),
  Payment(
      state: "Paid",
      paymentDate: "2022/05/17",
      receipt:
          "http://192.168.0.32:8000/receipts/6330651f771aac756ffdb621/2022-9-25.pdf"),
  Payment(
      state: "Paid",
      paymentDate: "2022/05/20",
      receipt:
          "http://192.168.0.32:8000/receipts/6330651f771aac756ffdb621/2022-9-25.pdf")
];
