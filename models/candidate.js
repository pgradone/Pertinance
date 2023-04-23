// const mongoose = require('mongoose');
const btoa = require('btoa');

// const candidateSchema = new mongoose.Schema({
//   Candidate_ID: {
//     type: Number,
//     required: false,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: false,
//   },
//   skills: {
//     type: String,
//     required: false,
//   },
//   title: {
//     type: String,
//     required: false,
//   },
//   email1: {
//     type: String,
//     required: false,
//   },
// });

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
  // console.log(candidates);
  candidates.forEach((candidate) => {
    console.log(
      candidate.id +
        ' ' +
        candidate.attributes.firstName +
        ' ' +
        candidate.attributes.lastName +
        ' ' +
        candidate.attributes.skills +
        ' ' +
        candidate.attributes.title +
        ' ' +
        candidate.attributes.email1
    );
  });
  // return candidates;
  module.exports = candidates; // Export data directly
};

fetchCandidates();
// candidateSchema.statics.getCandidateData = async function () {
//   const candidatesData = await fetchCandidates();
//   const data = candidatesData.data.map((candidate) => ({
//     Candidate_ID: candidate.id,
//     firstName: candidate.attributes.firstName,
//     lastName: candidate.attributes.lastName,
//     skills: candidate.attributes.skills,
//     title: candidate.attributes.title,
//     email1: candidate.attributes.email1,
//   }));
//   return data;
// };

// module.exports = mongoose.model('Candidate', candidateSchema);
// module.exports = candidates;
