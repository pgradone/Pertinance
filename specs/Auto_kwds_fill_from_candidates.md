In my candidates model, which retrieves an array of candidates with an API, the 'attributes.skills' of every candidate contains a lot of keywords separated by commas.
This is my candidates model:

const btoa = require('btoa');
const Kwd = require('../models/kwd');

class Candidate {
  static candidates = null;

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
  static async findById(id) {
    const candidates = await Candidate.fetchCandidates();
    return candidates.find((c) => c.id === id) || null;
  }

  static async find(query) {
    const candidates = await Candidate.fetchCandidates();
    const keys = Object.keys(query);
    return candidates.filter((candidate) =>
      keys.every((key) =>
        key === 'id'
          ? candidate[key].includes(query[key])
          : candidate.attributes[key]
              .toLowerCase()
              .includes(query[key].toLowerCase())
      )
    );
  }

  static async matchedKwds(id) {
    const candidate = await Candidate.findById(id);
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
      }
    }

    return mainKeywords;
  }
}

module.exports = Candidate;


I would like these keywords to be added automativally to my kwds collection:

const mongoose = require('mongoose');

const kwdSchema = new mongoose.Schema({
  keyWord: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        const regex = new RegExp('^' + v + '$', 'i');
        return this.constructor
          .findOne({ keyWord: regex })
          .then((doc) => {
            const isDuplicate = doc && this.id !== doc.id;
            return !isDuplicate;
          })
          .catch((err) => {
            throw err;
          });
      },
      message: (props) =>
        `The keyword "${props.value}" already exists in the database.`,
    },
  },
  mainKwd: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kwd',
    default: null,
  },
  fld: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Fld',
  },
});

kwdSchema.pre('remove', function (next) {
  const Kwd = mongoose.model('Kwd'); // This line is added
  Kwd.find({ mainKwd: this._id }, (err, kwds) => {
    if (err) {
      next(err);
    } else if (kwds.length > 0) {
      next(
        new Error(
          'This keyWord is still being referenced somewhere else as main KeyWord'
        ),
        console.log(
          'This keyWord is still being referenced somewhere else as main KeyWord'
        )
      );
    } else {
      next();
    }
  });
});

module.exports = mongoose.model('Kwd', kwdSchema);

Note that the attribute 'fld' is mandatory, is of type ObjectId and can only be of these 5 values:
Areas
Technologies
Clients
Jobs
Skills

But more simply:
write a procedure to import a CSV file into my kwds collection.
The CSV file looks like this:

"keyWord";"mainKwd";"fld"
"Payment";"SWIFT";"Areas"
"Tax";"TVA";"Areas"
"_TA_";"Transfer_Agency";"Areas"
"Agent de Transfer";"Transfer_Agency";"Areas"
"BASEL";"Risk";"Areas"
"BCBS";"Risk";"Areas"
"comptabilité";"Accounting";"Areas"
"expert comptable";"Accounting";"Areas"
"fiscalité";"Tax";"Areas"
"fonds";"Funds_Investment";"Areas"
"fonds d’investissements";"Funds_Investment";"Areas"
"Fund Distribution";"Fund_Distribution";"Areas"
"Funds";"Funds_Investment";"Areas"
"CREDIT_SWISS";"CREDIT SUISSE";"Clients"
"SOGE_LIFE";"SOGE_LIFE";"Clients"
"SPUERKEESS";"BCEE";"Clients"
"SWISS_LIFE";"SWISS LIFE";"Clients"
"  BIL_";"Banque Internationale à Luxembourg";"Clients"
" ING Bank";" ING_";"Clients"
"AGRICOLE INSU";"CALI_";"Clients"
"BANK OF CA";"ROYAL_BANK_OF_CANADA";"Clients"
"Banque de Luxembourg";"BDL";"Clients"
"BNP Lux";"BGL";"Clients"
"BOURSE DE Lux";"BOURSE_DE_Luxembourg";"Clients"
"BPSS";"BP2S";"Clients"
"BRADESCO";"Banco BRADESCO";"Clients"
"CREDIT SWISS";"CREDIT SUISSE";"Clients"
"DEGROOF";"DEGROOF_PETERCAM";"Clients"
"EAST WEST";"EAST_WEST_United_Bank";"Clients"
"FORTUNA";"FORTUNA_BANQUE";"Clients"
"GAZPROM";"BANK_GPB_INTERNATIONAL_GAZPROMBANK";"Clients"
"JULIUS";"JULIUS_BÄR";"Clients"
"justice euro";"COUR_JUSTICE_EUROPEENNE_LUXEMBOURG";"Clients"
"LOMBARD IN";"LOMBARD_INTERNATIONAL";"Clients"
"MORGAN";"JP_MORGAN";"Clients"
"NORTHERN";"NORTHERN_TRUST";"Clients"