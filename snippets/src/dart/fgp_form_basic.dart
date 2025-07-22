Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Form(
              key: _formKey,
              child: Column(
                children: [
                  const Text(
                    "Register",
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: _nameController,
                    decoration: const InputDecoration(
                      labelText: "Name",
                      border: OutlineInputBorder(),
                    ),
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return "Name is required";
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: _handleSubmit,
                    label: const Text("Submit"),
                    icon: const Icon(Icons.app_registration),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );