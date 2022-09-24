import 'package:flutter/material.dart';

class Payment {
  final String? state, paymentDate, receipt;
  Payment({
    this.state,
    this.paymentDate,
    this.receipt,
  });
}

List<Payment> payments = [
  Payment(
      state: "Paid",
      paymentDate: "2022/05/12",
      receipt:
          "http://localhost:8000/receipts/6314be252bd5ea3ee5516047/2022-9-16.pdf")
];
