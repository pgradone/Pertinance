const apiUrl =
  'https://ui.boondmanager.com/api/candidates?maxResults=30&order=asc&page=1&saveSearch=true&viewMode=list';

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const candidatesDiv = document.getElementById('candidates');

    // Iterate through each candidate and create a new <div> element for each one
    data.candidates.forEach((candidate) => {
      const candidateDiv = document.createElement('div');
      candidateDiv.innerHTML = `<h2>${candidate.firstName} ${candidate.lastName}</h2><p>${candidate.email}</p>`;
      candidatesDiv.appendChild(candidateDiv);
    });
  })
  .catch((error) => {
    console.error(error);
  });
