// import 'package:dio/dio.dart';
// import 'dart:developer';

final _nameController = TextEditingController(text: '');
final _formKey = GlobalKey<FormState>();

Future<void> _handleSubmit() async {
  if (!_formKey.currentState!.validate()) return;

  log("name: ${_nameController.text}");

  final dio = Dio();

  try {
    final response = await dio.post(
      "https://jsonplaceholder.typicode.com/users",
      data: {'name': _nameController.text},
    );

    log("✅ Registration successful. Response: ${response.data}");
  } on DioException catch (e) {
    log("❌ Network error (Dio): ${e.message}");
  } catch (e) {
    log("❌ Unexpected error: e");
  }
}

@override
void dispose() {
  _nameController.dispose();
  super.dispose();
}
