const mongoose = require('mongoose');

// fetchCandidates();

// get ALL data from BOOND
async function fetchCandidates() {
  const apiUrl = process.env.boond_url + '/candidates';
  console.log(apiUrl);
  const authString = btoa(process.env.JFUser + ':' + process.env.JFAuth);
  console.log(authString);
  const options = {
    headers: {
      Authorization: 'Basic ' + authString,
    },
  };
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  console.log(data);

  return data;
}

const candidateSchema = new mongoose.Schema({
  Candidate_ID: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  skills: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  email1: {
    type: String,
    required: false,
  },
});

// candidateSchema.virtual('candidateData').get(function () {
const candidatesData = await fetchCandidates();
// create and return an array of candidate data
const candidates = candidatesData.data.map((candidate) => ({
  Candidate_ID: candidate.id,
  firstName: candidate.attributes.firstName,
  lastName: candidate.attributes.lastName,
  skills: candidate.attributes.skills,
  title: candidate.attributes.title,
  email1: candidate.attributes.email1,
}));
//   return data;
// });

// Insert candidates into the database
candidates.insertMany(candidates);

module.exports = mongoose.model('Candidate', candidateSchema);
