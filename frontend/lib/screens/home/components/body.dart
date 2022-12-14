import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:frontend/constants.dart';
import 'package:frontend/models/Payment.dart';
import 'package:http/http.dart' as http;
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart';

import 'package:frontend/screens/home/components/item_card.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin),
          child: Text(
            "Recibos",
            style: Theme.of(context)
                .textTheme
                .headline5!
                .copyWith(fontWeight: FontWeight.bold),
          ),
        ),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(
                horizontal: kDefaultPaddin, vertical: kDefaultPaddin),
            child: GridView.builder(
              itemCount: payments.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                mainAxisSpacing: kDefaultPaddin - 10,
                crossAxisSpacing: 0,
                childAspectRatio: 0.78,
              ),
              itemBuilder: (context, index) =>
                  ItemCard(product: payments[index], press: () async {}),
            ),
          ),
        )
      ],
    );
  }
}
