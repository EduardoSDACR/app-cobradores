class Client {
  String firstname;
  String lastname;
  String dni;

  Client({
    required this.firstname,
    required this.lastname,
    required this.dni,
  });

  factory Client.fromJson(Map<String, dynamic> json) {
    return Client(
        firstname: json["firstname"],
        lastname: json["lastname"],
        dni: json["dni"]);
  }
}
