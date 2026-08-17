# Publish to Visual Studio Marketplace

```sh
npm install -g vsce
vsce --version

# https://dev.azure.com/frankgp/_usersSettings/tokens
vsce login frankgp
vsce ls-publishers

# npm version patch --no-git-tag-version
npm version 2026.8.16 --no-git-tag-version
npm run build
vsce package
vsce publish
# https://marketplace.visualstudio.com/manage/publishers
```

https://chatgpt.com/c/68575091-fbac-8006-a6b7-af401ddd807e

```tsx
$1

${1:name_text}

use${1:MyHook}

${TM_FILENAME_BASE}

 ${1:${TM_FILENAME_BASE}}

 `\${day}/\${month}/\${year}`;

${3:${1:${TM_FILENAME_BASE}}}
```
