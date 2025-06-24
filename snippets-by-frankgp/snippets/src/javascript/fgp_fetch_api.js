fetch('${1:https://api.example.com/data}', {
    method: '${2:GET}', // GET, POST, PUT, DELETE
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer YOUR_TOKEN'
    },
    ${3:// body: JSON.stringify({ key: 'value' })}
  })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      console.log('✅ Success:', data);
    })
    .catch(error => {
      console.error('❌ Error:', error);
    });
  