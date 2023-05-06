const btoa = require('btoa');
const Kwd = require('../models/kwd');
const mongoose = require('mongoose');
const { query } = require('express');

<<<<<<< HEAD
const candidateSchema = new mongoose.Schema();
class Candi {
=======
class Candidate {
  static candidates = null;

>>>>>>> 2e400e0c97b8a4094f915678d90a4b5fcf174d24
  static async fetchCandidates() {
    if (this.candidates !== null) {
      return this.candidates;
    }

    const apiUrl = process.env.boond_url + '/candidates';
    const authString = btoa(process.env.JFUser + ':' + process.env.JFAuth);
    const options = {
      headers: {
        Authorization: 'Basic ' + authString,
      },
    };
    const response = await fetch(apiUrl, options);
    const { data } = await response.json();
    this.candidates = data;
    return data;
  }
<<<<<<< HEAD

=======
>>>>>>> 2e400e0c97b8a4094f915678d90a4b5fcf174d24
  static async findById(id) {
    const candidates = await Candi.fetchCandidates();
    return candidates.find((c) => c.id === id) || null;
  }

  static async find(query) {
    const candidates = await Candi.fetchCandidates();
    const keys = Object.keys(query);
<<<<<<< HEAD
    // console.log(query);
    return candidates.filter((candidate) => {
      for (const key of keys) {
        if (key !== 'id') {
          if (
            !candidate.attributes[key]
=======
    return candidates.filter((candidate) =>
      keys.every((key) =>
        key === 'id'
          ? candidate[key].includes(query[key])
          : candidate.attributes[key]
>>>>>>> 2e400e0c97b8a4094f915678d90a4b5fcf174d24
              .toLowerCase()
              .includes(query[key].toLowerCase())
      )
    );
  }

  static async matchedKwds(id) {
    const candidate = await Candi.findById(id);
    const skills = candidate.attributes.skills.toLowerCase();
    const keywords = await Kwd.find().populate('mainKwd').lean();
    // const result = {};
    const result = [];
    for (const kwd of keywords) {
      const regex = new RegExp(kwd.keyWord.toLowerCase(), 'g');
      const matches = skills.match(regex);
      if (matches && matches.length > 0) {
        // result[kwd.keyWord] = matches.length;
        kwd.wordCount = matches.length;
        result.push(kwd);
      }
    }
    return result;
  }

  static async matchedMainKwds(id) {
    const matchedKwds = await this.matchedKwds(id);
<<<<<<< HEAD
    const result = [];
    for (const mKwd of matchedKwds) {
      if (!mKwd.mainKwd) {
        result.push(mKwd);
      } else {
        console.log(mKwd._id + ' - ' + mKwd.mainKwd._id);
        const secondaryKwds = matchedKwds;
        secondaryKwds.forEach((wd) => {
          if (mKwd._id == wd._id) mKwd.wordCount += wd.wordCount;
        });
=======
    const mainKeywords = [];
    const secondaryKwds = [];

    for (const kw of matchedKwds) {
      !kw.mainKwd ? mainKeywords.push(kw) : secondaryKwds.push(kw);
    }

    for (const mKwd of mainKeywords) {
      for (const sKwd of secondaryKwds) {
        mKwd._id.toString() === sKwd.mainKwd._id.toString()
          ? (mKwd.wordCount += sKwd.wordCount)
          : null;
>>>>>>> 2e400e0c97b8a4094f915678d90a4b5fcf174d24
      }
    }

    return mainKeywords;
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
}

candidateSchema.statics.injectInMongoDB = async function () {
  try {
    const candi = await Candi.fetchCandidates();
    const Candidate = mongoose.model('Candidate');
    const insertedCandidates = await Candidate.insertMany(candi);
    console.log(`Inserted ${insertedCandidates.length} candidates`);
  } catch (err) {
    console.error(err);
  }
};

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = {
  Candi,
  Candidate,
};
