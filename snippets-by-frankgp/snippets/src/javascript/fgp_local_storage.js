// Guardar en localStorage
localStorage.setItem("user", JSON.stringify({ name: "Frank", age: 30 }));

// Leer desde localStorage
const user = JSON.parse(localStorage.getItem("user"));
console.log("User:", user);

// Eliminar una clave
localStorage.removeItem("user");

// Limpiar todo el localStorage
localStorage.clear();
