import 'package:flutter/material.dart';
import 'package:frontend/models/Payment.dart';

import '../../../constants.dart';

class ItemCard extends StatelessWidget {
  final Payment? product;
  final VoidCallback? press;
  const ItemCard({
    Key? key,
    this.product,
    this.press,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: press,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Expanded(
            child: Container(
              padding: EdgeInsets.all(kDefaultPaddin),
              // For  demo we use fixed height  and width
              // Now we dont need them
              // height: 180,
              // width: 160,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(16),
              ),
              child: Hero(
                tag: product!.paymentDate,
                child: Image.asset("assets/icons/client_icon.png"),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: kDefaultPaddin / 4),
            child: Text(
              // products is out demo list
              product!.state,
              style: TextStyle(color: kTextLightColor),
            ),
          ),
          Text(
            "${product!.paymentDate}",
            style: TextStyle(fontWeight: FontWeight.bold),
          )
        ],
      ),
    );
  }
}
