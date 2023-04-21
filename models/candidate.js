const mongoose = require('mongoose');

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
    type: Number,
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

candidateSchema.virtual('candidateData').get(async function () {
  const candidatesData = await fetchCandidates();
  // create and return an array of candidate data
  const data = candidatesData.data.map((candidate) => ({
    Candidate_ID: candidate.id,
    firstName: candidate.attributes.firstName,
    lastName: candidate.attributes.lastName,
    skills: candidate.attributes.skills,
    title: candidate.attributes.title,
    email1: candidate.attributes.email1,
  }));
  return data;
});

module.exports = mongoose.model('Candidate', candidateSchema);
