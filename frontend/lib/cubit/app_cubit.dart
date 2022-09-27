import 'package:bloc/bloc.dart';
import 'package:frontend/cubit/app_cubit_states.dart';
import 'package:frontend/services/clients.service.dart';

class AppCubits extends Cubit<CubitStates> {
  AppCubits({required this.data}) : super(InitialState()) {
    emit(WelcomeState());
  }
  final ClientService data;
  late final clients;
  void getData() async {
    try {
      emit(LoadingState());
      clients = await data.getInfo();
      emit(LoadedState(clients));
    } catch (e) {}
  }
}
