<!-- https://chatgpt.com/c/68575091-fbac-8006-a6b7-af401ddd807e -->

# Publish to Visual Studio Marketplace

To publish your extension to the Visual Studio Marketplace, you need to follow these steps:

```sh
npm install -g vsce

# https://marketplace.visualstudio.com/manage/publishers
# https://dev.azure.com/frankgp/_usersSettings/tokens
vsce login frankgp

# npm version patch
npm run build
vsce package
vsce publish

```

```tsx
$1

${1:name_text}

use${1:MyHook}

${TM_FILENAME_BASE}

 ${1:${TM_FILENAME_BASE}}

 `\${day}/\${month}/\${year}`;

${3:${1:${TM_FILENAME_BASE}}}
```
