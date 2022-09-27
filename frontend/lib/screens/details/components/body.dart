import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:frontend/constants.dart';
import 'package:frontend/models/Payment.dart';
import 'package:http/http.dart' as http;
import 'package:frontend/screens/details/components/pdf_viewer_page.dart';
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
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                mainAxisSpacing: kDefaultPaddin - 10,
                crossAxisSpacing: 0,
                childAspectRatio: 0.78,
              ),
              itemBuilder: (context, index) => ItemCard(
                  product: payments[index],
                  press: () async {
                    const url =
                        "http://192.168.0.32:8000/receipts/6330651f771aac756ffdb621/2022-9-25.pdf";
                    final file = await loadPdfFromNetwork(url);
                    openPdf(context, file, url);
                  }),
            ),
          ),
        )
      ],
    );
  }

  Future<File> loadPdfFromNetwork(String url) async {
    final response = await http.get(Uri.parse(url));
    final bytes = response.bodyBytes;
    return _storeFile(url, bytes);
  }

  Future<File> _storeFile(String url, List<int> bytes) async {
    final filename = basename(url);
    final dir = await getApplicationDocumentsDirectory();
    final file = File('${dir.path}/$filename');
    await file.writeAsBytes(bytes, flush: true);
    if (kDebugMode) {
      print('$file');
    }
    return file;
  }

  void openPdf(BuildContext context, File file, String url) =>
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => PdfViewerPage(
            file: file,
            url: url,
          ),
        ),
      );
}
