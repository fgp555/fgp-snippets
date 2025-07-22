import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const Placeholder(),
      debugShowCheckedModeBanner: false,
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark(),
      themeMode: ThemeMode.system,
      // initialRoute: '/login',
      // routes: {
      // '/login': (context) => const LoginScreen(),
      // '/register': (context) => const RegisterScreen(),
      // },
    );
  }
}
