import 'package:flutter/material.dart'; 
class CustomerHomeScreen extends StatelessWidget { 
const CustomerHomeScreen({super.key}); 
@override 
Widget build(BuildContext context) { 
return Scaffold( 
appBar:AppBar(title:const Text('FleetGo Home')), 
body:Center( 
child:ElevatedButton( 
onPressed:(){}, 
child:const Text('Book Ride'), 
), 
), 
); 
} 
} 
