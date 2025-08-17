const GRAPHQL_ENDPOINT = "\${1:http://localhost:4000/graphql}";

export async function fetchGraphQL(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer \${2:your_token}`
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("❌ GraphQL errors:", result.errors);
      throw new Error("GraphQL query failed");
    }

    console.log("✅ GraphQL data:", result.data);
    return result.data;
  } catch (error) {
    console.error("❌ Fetch error:", error);
    throw error;
  }
}

// Ejemplo de uso:
// const query = `
//   query GetUser(\$id: ID!) {
//     user(id: \$id) {
//       id
//       name
//       email
//     }
//   }
// `;

// fetchGraphQL(query, { id: "1" }).then(data => console.log(data));
