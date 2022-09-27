import 'dart:convert';

import "package:http/http.dart" as http;
import 'package:frontend/models/Client.dart';

class ClientService {
  String baseUrl = "http://localhost:8000";
  Future<List<Client>> getInfo() async {
    var apiUrl = '/clients';
    http.Response res = await http.get(Uri.parse(baseUrl + apiUrl));
    try {
      print(json.decode(res.body));
      if (res.statusCode == 200) {
        List<dynamic> list = json.decode(res.body);
        print(list);
        return list.map((e) => Client.fromJson(e)).toList();
      } else {
        return <Client>[];
      }
    } catch (e) {
      print(e);
      return <Client>[];
    }
  }
}
