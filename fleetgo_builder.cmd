@echo off
echo ===============================
echo FleetGo Flutter Rebuild System
echo ===============================

cd /d C:\Users\Asus\fleetgo

echo Creating folders...

mkdir lib\core\app 2>nul
mkdir lib\core\routes 2>nul
mkdir lib\features\auth 2>nul
mkdir lib\features\booking 2>nul
mkdir lib\features\driver 2>nul
mkdir lib\features\admin 2>nul

echo Creating main.dart

echo import 'package:flutter/material.dart'; > lib\main.dart
echo import 'core/app/fleet_go_app.dart'; >> lib\main.dart
echo void main() { >> lib\main.dart
echo WidgetsFlutterBinding.ensureInitialized(); >> lib\main.dart
echo runApp(const FleetGoApp()); >> lib\main.dart
echo } >> lib\main.dart


echo Creating FleetGoApp

echo import 'package:flutter/material.dart'; > lib\core\app\fleet_go_app.dart
echo import '../routes/app_routes.dart'; >> lib\core\app\fleet_go_app.dart
echo class FleetGoApp extends StatelessWidget { >> lib\core\app\fleet_go_app.dart
echo const FleetGoApp({super.key}); >> lib\core\app\fleet_go_app.dart
echo @override >> lib\core\app\fleet_go_app.dart
echo Widget build(BuildContext context) { >> lib\core\app\fleet_go_app.dart
echo return MaterialApp( >> lib\core\app\fleet_go_app.dart
echo title:'FleetGo', >> lib\core\app\fleet_go_app.dart
echo debugShowCheckedModeBanner:false, >> lib\core\app\fleet_go_app.dart
echo theme:ThemeData(primarySwatch:Colors.blue), >> lib\core\app\fleet_go_app.dart
echo initialRoute:'/', >> lib\core\app\fleet_go_app.dart
echo routes:AppRoutes.routes, >> lib\core\app\fleet_go_app.dart
echo ); >> lib\core\app\fleet_go_app.dart
echo } >> lib\core\app\fleet_go_app.dart
echo } >> lib\core\app\fleet_go_app.dart


echo Creating routes

echo import 'package:flutter/material.dart'; > lib\core\routes\app_routes.dart
echo import '../../features/auth/splash_screen.dart'; >> lib\core\routes\app_routes.dart
echo import '../../features/auth/login_screen.dart'; >> lib\core\routes\app_routes.dart
echo import '../../features/booking/customer_home_screen.dart'; >> lib\core\routes\app_routes.dart
echo class AppRoutes { >> lib\core\routes\app_routes.dart
echo static Map^<String,WidgetBuilder^> routes = { >> lib\core\routes\app_routes.dart
echo '/':(context)=^>const SplashScreen(), >> lib\core\routes\app_routes.dart
echo '/login':(context)=^>const LoginScreen(), >> lib\core\routes\app_routes.dart
echo '/home':(context)=^>const CustomerHomeScreen(), >> lib\core\routes\app_routes.dart
echo }; >> lib\core\routes\app_routes.dart
echo } >> lib\core\routes\app_routes.dart


echo Creating Splash Screen

echo import 'package:flutter/material.dart'; > lib\features\auth\splash_screen.dart
echo class SplashScreen extends StatelessWidget { >> lib\features\auth\splash_screen.dart
echo const SplashScreen({super.key}); >> lib\features\auth\splash_screen.dart
echo @override >> lib\features\auth\splash_screen.dart
echo Widget build(BuildContext context) { >> lib\features\auth\splash_screen.dart
echo Future.delayed(const Duration(seconds:2),(){ >> lib\features\auth\splash_screen.dart
echo Navigator.pushReplacementNamed(context,'/login'); >> lib\features\auth\splash_screen.dart
echo }); >> lib\features\auth\splash_screen.dart
echo return const Scaffold( >> lib\features\auth\splash_screen.dart
echo body:Center(child:Text('FleetGo')), >> lib\features\auth\splash_screen.dart
echo ); >> lib\features\auth\splash_screen.dart
echo } >> lib\features\auth\splash_screen.dart
echo } >> lib\features\auth\splash_screen.dart


echo Creating Login Screen

echo import 'package:flutter/material.dart'; > lib\features\auth\login_screen.dart
echo class LoginScreen extends StatelessWidget { >> lib\features\auth\login_screen.dart
echo const LoginScreen({super.key}); >> lib\features\auth\login_screen.dart
echo @override >> lib\features\auth\login_screen.dart
echo Widget build(BuildContext context) { >> lib\features\auth\login_screen.dart
echo return Scaffold( >> lib\features\auth\login_screen.dart
echo appBar:AppBar(title:const Text('Login')), >> lib\features\auth\login_screen.dart
echo body:Center( >> lib\features\auth\login_screen.dart
echo child:ElevatedButton( >> lib\features\auth\login_screen.dart
echo onPressed:(){ >> lib\features\auth\login_screen.dart
echo Navigator.pushReplacementNamed(context,'/home'); >> lib\features\auth\login_screen.dart
echo }, >> lib\features\auth\login_screen.dart
echo child:const Text('Login'), >> lib\features\auth\login_screen.dart
echo ), >> lib\features\auth\login_screen.dart
echo ), >> lib\features\auth\login_screen.dart
echo ); >> lib\features\auth\login_screen.dart
echo } >> lib\features\auth\login_screen.dart
echo } >> lib\features\auth\login_screen.dart


echo Creating Customer Home

echo import 'package:flutter/material.dart'; > lib\features\booking\customer_home_screen.dart
echo class CustomerHomeScreen extends StatelessWidget { >> lib\features\booking\customer_home_screen.dart
echo const CustomerHomeScreen({super.key}); >> lib\features\booking\customer_home_screen.dart
echo @override >> lib\features\booking\customer_home_screen.dart
echo Widget build(BuildContext context) { >> lib\features\booking\customer_home_screen.dart
echo return Scaffold( >> lib\features\booking\customer_home_screen.dart
echo appBar:AppBar(title:const Text('FleetGo Home')), >> lib\features\booking\customer_home_screen.dart
echo body:Center( >> lib\features\booking\customer_home_screen.dart
echo child:ElevatedButton( >> lib\features\booking\customer_home_screen.dart
echo onPressed:(){}, >> lib\features\booking\customer_home_screen.dart
echo child:const Text('Book Ride'), >> lib\features\booking\customer_home_screen.dart
echo ), >> lib\features\booking\customer_home_screen.dart
echo ), >> lib\features\booking\customer_home_screen.dart
echo ); >> lib\features\booking\customer_home_screen.dart
echo } >> lib\features\booking\customer_home_screen.dart
echo } >> lib\features\booking\customer_home_screen.dart


echo Creating Driver Home

echo import 'package:flutter/material.dart'; > lib\features\driver\driver_home_screen.dart
echo class DriverHomeScreen extends StatelessWidget { >> lib\features\driver\driver_home_screen.dart
echo const DriverHomeScreen({super.key}); >> lib\features\driver\driver_home_screen.dart
echo @override >> lib\features\driver\driver_home_screen.dart
echo Widget build(BuildContext context) { >> lib\features\driver\driver_home_screen.dart
echo return Scaffold( >> lib\features\driver\driver_home_screen.dart
echo appBar:AppBar(title:const Text('Driver Dashboard')), >> lib\features\driver\driver_home_screen.dart
echo body:const Center(child:Text('Driver Online')), >> lib\features\driver\driver_home_screen.dart
echo ); >> lib\features\driver\driver_home_screen.dart
echo } >> lib\features\driver\driver_home_screen.dart
echo } >> lib\features\driver\driver_home_screen.dart


echo Creating Admin Dashboard

echo import 'package:flutter/material.dart'; > lib\features\admin\admin_dashboard_screen.dart
echo class AdminDashboardScreen extends StatelessWidget { >> lib\features\admin\admin_dashboard_screen.dart
echo const AdminDashboardScreen({super.key}); >> lib\features\admin\admin_dashboard_screen.dart
echo @override >> lib\features\admin\admin_dashboard_screen.dart
echo Widget build(BuildContext context) { >> lib\features\admin\admin_dashboard_screen.dart
echo return Scaffold( >> lib\features\admin\admin_dashboard_screen.dart
echo appBar:AppBar(title:const Text('Admin Panel')), >> lib\features\admin\admin_dashboard_screen.dart
echo body:const Center(child:Text('FleetGo Admin')), >> lib\features\admin\admin_dashboard_screen.dart
echo ); >> lib\features\admin\admin_dashboard_screen.dart
echo } >> lib\features\admin\admin_dashboard_screen.dart
echo } >> lib\features\admin\admin_dashboard_screen.dart


echo =================================
echo FleetGo base app restored
echo =================================

flutter clean
flutter pub get

pause