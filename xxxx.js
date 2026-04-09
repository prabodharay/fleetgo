const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/Asus/fleetgo/lib";

// ============================
// TEMPLATE GENERATORS
// ============================

function screenTemplate(name) {
  return `
import 'package:flutter/material.dart';

class ${name} extends StatelessWidget {
  const ${name}({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('${name}')),
      body: const Center(child: Text('${name} Screen')),
    );
  }
}
`;
}

function serviceTemplate(name) {
  return `
class ${name} {
  void init() {
    print("${name} initialized");
  }
}
`;
}

function modelTemplate(name) {
  return `
class ${name} {
  final String id;

  ${name}({required this.id});

  factory ${name}.fromMap(Map<String, dynamic> map) {
    return ${name}(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
`;
}

// ============================
// FILE TYPE DETECTOR
// ============================

function getTemplate(filePath) {
  const fileName = path.basename(filePath, ".dart");

  if (filePath.includes("screen") || filePath.includes("page")) {
    return screenTemplate(toClassName(fileName));
  }

  if (filePath.includes("service")) {
    return serviceTemplate(toClassName(fileName));
  }

  if (filePath.includes("model") || filePath.includes("entity")) {
    return modelTemplate(toClassName(fileName));
  }

  return `// ${fileName} initialized\n`;
}

// ============================
// UTIL
// ============================

function toClassName(name) {
  return name
    .split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

// ============================
// MAIN SCAN FUNCTION
// ============================

function scanDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".dart")) {

      const content = fs.readFileSync(fullPath, "utf8");

      if (!content || content.trim().length < 50) {

        console.log("⚠️ Fixing:", fullPath);

        const template = getTemplate(fullPath);

        fs.writeFileSync(fullPath, template);
      }
    }
  });
}

// ============================
// RUN
// ============================

console.log("🚀 FleetGo Empty Dart Fix Started...");
scanDir(ROOT);
console.log("✅ All empty/missing Dart files fixed!");