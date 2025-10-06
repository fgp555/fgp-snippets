<!-- https://chatgpt.com/c/68575091-fbac-8006-a6b7-af401ddd807e -->

# Publish to Visual Studio Marketplace

To publish your extension to the Visual Studio Marketplace, you need to follow these steps:

```sh
npm install -g vsce

# https://marketplace.visualstudio.com/manage/publishers
# https://dev.azure.com/frankgp/_usersSettings/tokens
vsce login frankgp

npm version patch
npm run build && vsce package && vsce publish

```
<!-- 
para probar
fgp_r_taildwind_test
fgp_rn_taildwind_test
fgp_r_pre_json
fgp_rn_pre_json
 -->
# Variable for Snippet Filename

When defining snippets, you can use the `${TM_FILENAME_BASE}` variable to automatically insert the base name of the current file. This is particularly useful for creating snippets that are context-aware and relevant to the file being edited.

```tsx
$1

${1:progresar_document_types}

use${1:MyHook}

${TM_FILENAME_BASE}

 ${1:${TM_FILENAME_BASE}}

 `\${day}/\${month}/\${year}`;

${3:${1:${TM_FILENAME_BASE}}}
```
