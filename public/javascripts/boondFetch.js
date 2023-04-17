fetch(
  'https://ui.boondmanager.com/api/candidates?maxResults=30&order=asc&page=1&saveSearch=true&viewMode=list'
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // or do something else with the data
  })
  .catch((error) => {
    console.error(error);
  });
