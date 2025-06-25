// scripts/import-snippets.js

const fs = require("fs");
const path = require("path");

// 📁 Ruta base y carpeta compilada
const rootDir = path.resolve(__dirname, "..");
const compiledDir = path.join(rootDir, "snippets", "compiled");
const pkgPath = path.join(rootDir, "package.json");

// 📦 Leer archivos en snippets/compiled
if (!fs.existsSync(compiledDir)) {
  console.error("❌ No se encontró la carpeta snippets/compiled");
  process.exit(1);
}

const files = fs.readdirSync(compiledDir);
const snippets = [];

files.forEach((file) => {
  const ext = path.extname(file);
  if (ext === ".code-snippets" || ext === ".json") {
    const language = path.basename(file, ext);
    snippets.push({
      language,
      path: `./snippets/compiled/${file}`, // 🛠 Ruta que VS Code entiende
    });
  }
});

// 🔄 Actualizar package.json
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

pkg.contributes = pkg.contributes || {};
pkg.contributes.snippets = snippets;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log(`✅ package.json actualizado con ${snippets.length} snippets desde /compiled`);
