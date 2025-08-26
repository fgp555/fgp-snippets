async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET", // GET, POST, PUT, DELETE
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_TOKEN'
      },
      // body: JSON.stringify({ key: 'value' })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("✅ Success:", data);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Ejecutar
getUsers();
