const btoa = require('btoa');

class Candidate {
  static async fetchCandidates() {
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
    return candidates;
  }

  // static async addCandidates() {
  //   try {
  //     const candidatesData = await Candidate.fetchCandidates();
  //     const data = candidatesData.map((candidate) => ({
  //       Candidate_ID: candidate.id,
  //       firstName: candidate.attributes.firstName,
  //       lastName: candidate.attributes.lastName,
  //       skills: candidate.attributes.skills,
  //       title: candidate.attributes.title,
  //       email1: candidate.attributes.email1,
  //     }));
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  static async findById(id) {
    const candidates = await Candidate.fetchCandidates();
    return candidates.find((c) => c.id === id) || null;
  }

  static async find(query) {
    const candidates = await Candidate.fetchCandidates();
    const keys = Object.keys(query);
    console.log(query);
    return candidates.filter((candidate) => {
      for (const key of keys) {
        if (key !== 'id') {
          if (
            !candidate.attributes[key]
              .toLowerCase()
              .includes(query[key].toLowerCase())
          ) {
            return false;
          }
        } else {
          if (
            !candidate[key].includes(query[key])
            // candidate[key] != query[key]
          ) {
            return false;
          }
        }
      }
      return true;
    });
  }
}

module.exports = Candidate;
