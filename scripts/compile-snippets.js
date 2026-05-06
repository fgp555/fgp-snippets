// scripts/compile-snippets.js

const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "../snippets/src");
const outDir = path.resolve(__dirname, "../snippets/compiled");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const extensionsMap = {
  css: [".css"],
  dart: [".dart"],
  html: [".html"],
  http: [".http"],
  ignore: [".ignore"],
  javascript: [".js"],
  javascriptreact: [".jsx"],
  json: [".json"],
  markdown: [".md"],
  python: [".py"],
  scss: [".scss"],
  sql: [".sql"],
  typescript: [".ts"],
  typescriptreact: [".tsx"],
  csharp: [".cs", ".csx"],
  json: [".json"],
};

function toSnippetObject(filename, content) {
  const name = path.basename(filename, path.extname(filename));

  let body;

  try {
    // Si es JSON válido → lo formatea bonito
    const parsed = JSON.parse(content);
    body = JSON.stringify(parsed, null, 2).split("\n");
  } catch {
    // Si no es JSON válido → texto plano
    body = content.split(/\r?\n/);
  }

  return {
    [name]: {
      prefix: name,
      body,
      description: `${name} snippet`,
    },
  };
}

function collectSnippetsForLang(lang, exts) {
  const langDir = path.join(srcDir, lang);
  if (!fs.existsSync(langDir)) return;

  const snippets = {};

  fs.readdirSync(langDir).forEach((file) => {
    const ext = path.extname(file);
    if (!exts.includes(ext)) return;

    const fullPath = path.join(langDir, file);
    const content = fs.readFileSync(fullPath, "utf-8").trim();
    Object.assign(snippets, toSnippetObject(file, content));
  });

  if (Object.keys(snippets).length > 0) {
    const outFile = path.join(outDir, `${lang}.code-snippets`);
    fs.writeFileSync(outFile, JSON.stringify(snippets, null, 2));
    console.log(`✅ ${lang}.code-snippets generado con ${Object.keys(snippets).length} snippet(s)`);
  }
}

// Procesar todos los lenguajes definidos
Object.entries(extensionsMap).forEach(([lang, exts]) => {
  collectSnippetsForLang(lang, exts);
});

// También copia directamente cualquier .json o .code-snippets suelto en src
const copyLooseSnippets = () => {
  const looseFiles = fs.readdirSync(srcDir);

  looseFiles.forEach((file) => {
    const ext = path.extname(file);

    // ❗ Solo copiar .code-snippets (no JSON ya procesado)
    if (ext === ".code-snippets") {
      const srcFile = path.join(srcDir, file);
      const dstFile = path.join(outDir, file);

      fs.copyFileSync(srcFile, dstFile);
      console.log(`📦 Copiado: ${file}`);
    }
  });
};

copyLooseSnippets();
