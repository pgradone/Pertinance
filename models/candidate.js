const btoa = require('btoa');

const apiUrl = process.env.boond_url + '/candidates';
const authString = btoa(process.env.JFUser + ':' + process.env.JFAuth);
const options = {
  headers: {
    Authorization: 'Basic ' + authString,
  },
};

const getCandidates = async () => {
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  const candidates = data.data.map((candidate) => ({
    Candidate_ID: candidate.id,
    firstName: candidate.attributes.firstName,
    lastName: candidate.attributes.lastName,
    skills: candidate.attributes.skills,
    title: candidate.attributes.title,
    email1: candidate.attributes.email1,
  }));
  return candidates;
};

module.exports = { getCandidates };
