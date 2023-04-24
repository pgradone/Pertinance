const mongoose = require('mongoose');
const btoa = require('btoa');

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

const fetchCandidates = async () => {
  const apiUrl = process.env.boond_url + '/candidates';
  const authString = btoa(process.env.JFUser + ':' + process.env.JFAuth);
  const options = {
    headers: {
      Authorization: 'Basic ' + authString,
    },
  };
  const response = await fetch(apiUrl, options);
  const candi = await response.json();
  const candidates = candi.data;
  return candidates; // Return the array of candidate objects
};

// Define a static method on the candidateSchema that maps the data to the schema
//  and creates new objects in the database
candidateSchema.statics.addCandidates = async function () {
  try {
    const candidatesData = await fetchCandidates();
    const data = candidatesData.map((candidate) => ({
      Candidate_ID: candidate.id,
      firstName: candidate.attributes.firstName,
      lastName: candidate.attributes.lastName,
      skills: candidate.attributes.skills,
      title: candidate.attributes.title,
      email1: candidate.attributes.email1,
    }));
    await this.create(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model('Candidate', candidateSchema);
// module.exports = fetchCandidates;
