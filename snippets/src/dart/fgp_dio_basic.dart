// import 'package:dio/dio.dart';
// import 'dart:developer';

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
      log("❌ Unexpected error: ${e}");
    }