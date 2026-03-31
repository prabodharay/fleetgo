import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';

void main() {
  testWidgets('FleetGo basic test', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: Center(child: Text('FleetGo Test')),
        ),
      ),
    );

    expect(find.text('FleetGo Test'), findsOneWidget);
  });
}