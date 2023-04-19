// const { response } = require('express');

const apiUrl = process.env.boond_url + '/candidates';
const authString = process.env.JFUser + ':' + process.env.JFAuth;
const options = {
  headers: {
    Authorization: 'Basic' + btoa(authString),
  },
};
fetch(apiUrl)
  .then((response) => response.json())
  .then(console.log(response))
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
