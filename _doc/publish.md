# Publish to Visual Studio Marketplace

To publish your extension to the Visual Studio Marketplace, you need to follow these steps:

```sh
npm run build
npm version patch && vsce package
vsce publish

```
