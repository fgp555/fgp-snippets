import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.7/+esm";

const apiURL = "https://jsonplaceholder.typicode.com/users";
const out = document.getElementById("out");

function main() {
  axios
    .get(apiURL)
    .then((resp) => {
      out.textContent = JSON.stringify(resp.data, null, 2);
    })
    .catch((err) => {
      out.textContent = `Error al obtener los datos: ${err.message}`;
    });
}

document.addEventListener("DOMContentLoaded", main);
