import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/constants.dart';
import 'package:frontend/cubit/app_cubit.dart';
import 'package:frontend/cubit/app_cubit_logics.dart';
import 'package:frontend/screens/home/home_screen.dart';
import 'package:frontend/services/clients.service.dart';
//import 'package:frontend/screens/home/home_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        textTheme: Theme.of(context).textTheme.apply(bodyColor: kTextColor),
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: BlocProvider<AppCubits>(
        create: (context) => AppCubits(
          data: ClientService(),
        ),
        child: AppCubitLogics(),
      ),
    );
  }
}
