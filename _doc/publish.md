# Publish to Visual Studio Marketplace

To publish your extension to the Visual Studio Marketplace, you need to follow these steps:

```sh
npm run build
npm version patch 
vsce package
vsce publish

```

# Variable for Snippet Filename

When defining snippets, you can use the `${TM_FILENAME_BASE}` variable to automatically insert the base name of the current file. This is particularly useful for creating snippets that are context-aware and relevant to the file being edited.

```tsx
$1

use${1:CustomHook}

${1:userID}

${TM_FILENAME_BASE}

 ${1:${TM_FILENAME_BASE}}
```
