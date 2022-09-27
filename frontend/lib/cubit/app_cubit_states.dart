import 'package:equatable/equatable.dart';
import 'package:frontend/models/Client.dart';

abstract class CubitStates extends Equatable {}

class InitialState extends CubitStates {
  @override
  // TODO: implement props
  List<Object> get props => [];
}

class WelcomeState extends CubitStates {
  @override
  // TODO: implement props
  List<Object> get props => [];
}

class LoadingState extends CubitStates {
  @override
  // TODO: implement props
  List<Object?> get props => [];
}

class LoadedState extends CubitStates {
  LoadedState(this.clients);
  final List<Client> clients;
  @override
  // TODO: implement props
  List<Object?> get props => [clients];
}
