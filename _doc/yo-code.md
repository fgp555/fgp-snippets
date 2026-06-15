# vscode-extensions

```sh
# Instalar Yeoman y Generator de VS Code:
npm install -g yo generator-code
# Paso 2: Crear la extensión
yo code
# Paso 3: Definir los snippets
# Paso 4: Probar la extensión
# Presiona F5 para abrir una nueva ventana de VSCode con tu extensión cargada.
# Paso 5: Empaquetar y publicar la extensión
# Instalar vsce (Visual Studio Code Extension Manager):
npm install -g vsce
# Empaquetar la extensión:
npm version patch && vsce package

vsce publish

# Publicar la extensión:
# https://marketplace.visualstudio.com/
# https://marketplace.visualstudio.com/items/?itemName=frankgp.frankgp
# https://dev.azure.com/frankgp/_usersSettings/tokens

# Manage Publishers & Extensions
# https://marketplace.visualstudio.com/manage/publishers/frankgp?auth_redirect=True
# https://marketplace.visualstudio.com/manage/publishers/frankgp/extensions/frankgp/hub
```

# Developer: Show Running Extensions

> Developer: Show Running Extensions

```sh
# Compile the extension
npm run compile
```
