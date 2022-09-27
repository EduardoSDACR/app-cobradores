import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/cubit/app_cubit.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Text("siu"),
          GestureDetector(
            onTap: () {
              BlocProvider.of<AppCubits>(context).getData();
            },
            child: Container(
              width: 200,
              height: 200,
              color: Colors.red,
            ),
          )
        ],
      ),
    );
  }
}
