# Python API Basic

## Installation

**VSCode Plugins**:

- **REST Client** by Huachao Mao  
  [Install here](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

- **Snippets** by Frank GP  
  [Install here](https://marketplace.visualstudio.com/items?itemName=frankgp.frankgp)

---

```sh
# Check Python version
python --version

# List installed packages
pip list

# Install Flask
pip install flask

# Run the application
python app.py

# List all installed packages in the current environment
pip freeze

# Save current dependencies to a requirements file
pip freeze > requirements.txt

# Install dependencies from the requirements file
pip install -r requirements.txt

# Uninstall Flask
pip uninstall flask

# Uninstall all packages in the environment
pip freeze | xargs pip uninstall -y
```
